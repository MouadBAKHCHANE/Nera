"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { useConsent, type Consent } from "@/lib/consent";
import { TRACK_EVENT, trackEvent, type ConversionEvent } from "@/lib/analytics";
import type { MarketingIds } from "@/lib/sanity/marketing";

/**
 * Chargement des outils de mesure selon le choix du visiteur, identifiants lus dans le Studio.
 *
 * - Google Analytics 4 : seulement après « Mesure d'audience ».
 * - Google Ads et Meta Pixel : seulement après « Publicité ».
 * - Google Tag Manager : seulement après l'une des deux. Il reçoit d'abord le consentement Google
 *   (tout refusé par défaut, puis le choix du visiteur), que ses balises Google respectent
 *   d'elles-mêmes, puis un événement `consent_update` avec `analytics_consent` et
 *   `marketing_consent` (« granted » ou « denied ») pour déclencher les autres (Meta Pixel…).
 *   Les conversions lui parviennent aussi, en événements du même nom (`devis_envoye`…).
 *   C'est au conteneur de respecter ces signaux : voir la politique de confidentialité, § 8.
 *
 * Mode de consentement Google « de base » : aucun script Google n'est chargé avant l'accord,
 * et tous les stockages partent refusés, puis sont accordés un à un. Le mode « avancé »
 * enverrait des signaux sans cookie avant l'accord, ce que la politique de cookies exclut
 * (« avec votre accord »).
 *
 * Retrait du consentement en cours de visite : Google Analytics est coupé par son drapeau
 * officiel `ga-disable-<ID>`, le Meta Pixel reçoit `revoke`, les stockages Google repassent à
 * « refusé » et les cookies concernés sont effacés. Au chargement suivant, rien n'est chargé.
 */

type Gtag = (...args: unknown[]) => void;
type Fbq = ((...args: unknown[]) => void) & {
  callMethod?: (...args: unknown[]) => void;
  queue: unknown[];
  push: unknown;
  loaded: boolean;
  version: string;
};

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: Gtag;
    fbq?: Fbq;
    _fbq?: Fbq;
    [gaDisable: `ga-disable-${string}`]: boolean | undefined;
  }
}

/** Identifiants déjà configurés, pour ne pas les configurer deux fois dans la même visite. */
const configured = new Set<string>();

function loadScript(src: string) {
  if (document.querySelector(`script[src="${src}"]`)) return;
  const s = document.createElement("script");
  s.async = true;
  s.src = src;
  document.head.appendChild(s);
}

/** `dataLayer` et `gtag`, consentement Google refusé par défaut : avant tout script Google. */
function ensureDataLayer(): Gtag {
  if (!window.gtag) {
    window.dataLayer = window.dataLayer || [];
    window.gtag = function gtag() {
      // gtag.js attend l'objet `arguments` lui-même, pas un tableau.
      // eslint-disable-next-line prefer-rest-params
      window.dataLayer!.push(arguments);
    };
    window.gtag("consent", "default", {
      analytics_storage: "denied",
      ad_storage: "denied",
      ad_user_data: "denied",
      ad_personalization: "denied",
    });
  }
  return window.gtag;
}

/** gtag.js, pour Google Analytics et Google Ads configurés directement (hors Tag Manager). */
function ensureGtag(firstId: string): Gtag {
  const gtag = ensureDataLayer();
  if (!document.querySelector('script[src^="https://www.googletagmanager.com/gtag/js"]')) {
    gtag("js", new Date());
    loadScript(`https://www.googletagmanager.com/gtag/js?id=${firstId}`);
  }
  return gtag;
}

/** Tag Manager chargé pendant cette visite : seul cas où lui transmettre choix et conversions. */
let gtmLoaded = false;

/** Conteneur Google Tag Manager, après le consentement Google qui le précède dans `dataLayer`. */
function ensureGtm(id: string) {
  if (gtmLoaded) return;
  ensureDataLayer();
  window.dataLayer!.push({ "gtm.start": Date.now(), event: "gtm.js" });
  loadScript(`https://www.googletagmanager.com/gtm.js?id=${id}`);
  gtmLoaded = true;
}

function ensurePixel(id: string): Fbq {
  if (!window.fbq) {
    // Amorce officielle du Meta Pixel, réécrite sans code injecté sous forme de texte.
    const n = function (...args: unknown[]) {
      if (n.callMethod) n.callMethod(...args);
      else n.queue.push(args);
    } as Fbq;
    n.push = n;
    n.loaded = true;
    n.version = "2.0";
    n.queue = [];
    window.fbq = n;
    window._fbq = n;
    loadScript("https://connect.facebook.net/en_US/fbevents.js");
    n("init", id);
    n("track", "PageView");
  }
  return window.fbq;
}

/** Efface les cookies dont le nom commence par l'un des préfixes, sur l'hôte et le domaine. */
function deleteCookies(prefixes: string[]) {
  const host = location.hostname;
  const domains = ["", host, `.${host.replace(/^www\./, "")}`];
  document.cookie
    .split(";")
    .map((c) => c.split("=")[0].trim())
    .filter((name) => prefixes.some((p) => name.startsWith(p)))
    .forEach((name) => {
      for (const d of domains) {
        document.cookie = `${name}=; Max-Age=0; path=/${d ? `; domain=${d}` : ""}`;
      }
    });
}

export function Tracking({ ids }: { ids: MarketingIds }) {
  const consent = useConsent();
  const pathname = usePathname();
  const latest = useRef<{ consent: Consent | null | undefined; ids: MarketingIds }>({ consent, ids });
  const firstPath = useRef(true);

  const { googleTagManagerId: gtm, googleAnalyticsId: ga, googleAdsId: ads, metaPixelId: pixel } = ids;

  // Chargement, accord et retrait, à chaque changement du choix ou des identifiants.
  useEffect(() => {
    latest.current = { consent, ids };
    if (consent === undefined) return; // choix pas encore lu (hydratation)
    const analytics = !!consent?.analytics;
    const marketing = !!consent?.marketing;

    if (ga) window[`ga-disable-${ga}`] = !analytics;

    const direct = (analytics && !!ga) || (marketing && !!ads);
    const tagManager = (analytics || marketing) && !!gtm;
    if (direct || tagManager) {
      const gtag = direct ? ensureGtag(analytics && ga ? ga : ads!) : ensureDataLayer();
      gtag("consent", "update", {
        analytics_storage: analytics ? "granted" : "denied",
        ad_storage: marketing ? "granted" : "denied",
        ad_user_data: marketing ? "granted" : "denied",
        ad_personalization: marketing ? "granted" : "denied",
      });
      if (analytics && ga && !configured.has(ga)) {
        gtag("config", ga);
        configured.add(ga);
      }
      if (marketing && ads && !configured.has(ads)) {
        gtag("config", ads);
        configured.add(ads);
      }
      // Après la mise à jour du consentement : le conteneur la trouve déjà dans `dataLayer`.
      if (tagManager) ensureGtm(gtm!);
    } else if (window.gtag) {
      window.gtag("consent", "update", {
        analytics_storage: "denied",
        ad_storage: "denied",
        ad_user_data: "denied",
        ad_personalization: "denied",
      });
    }

    // Choix transmis à Tag Manager, à chaque changement, pour les balises qui ne lisent pas le
    // consentement Google. Une balise déjà déclenchée ne se retire pas : au chargement suivant,
    // si tout est refusé, le conteneur n'est plus chargé du tout.
    if (gtmLoaded) {
      window.dataLayer!.push({
        event: "consent_update",
        analytics_consent: analytics ? "granted" : "denied",
        marketing_consent: marketing ? "granted" : "denied",
      });
    }

    if (marketing && pixel) ensurePixel(pixel)("consent", "grant");
    else if (window.fbq) window.fbq("consent", "revoke");

    if (!analytics) deleteCookies(["_ga", "_gid"]);
    if (!marketing) deleteCookies(["_gcl", "_fbp", "_fbc"]);
  }, [consent, ids, gtm, ga, ads, pixel]);

  // Page vue pour le Meta Pixel à chaque navigation (Google Analytics 4 la mesure seul).
  useEffect(() => {
    if (firstPath.current) {
      firstPath.current = false;
      return;
    }
    const { consent: c, ids: i } = latest.current;
    if (c?.marketing && i.metaPixelId && window.fbq) window.fbq("track", "PageView");
  }, [pathname]);

  // Conversions : formulaires envoyés, clics sur un numéro ou une adresse e-mail.
  useEffect(() => {
    const onTrack = (e: Event) => {
      const name = (e as CustomEvent<ConversionEvent>).detail;
      const { consent: c, ids: i } = latest.current;
      if ((c?.analytics || c?.marketing) && gtmLoaded) window.dataLayer!.push({ event: name });
      if (c?.analytics && i.googleAnalyticsId && window.gtag) window.gtag("event", name);
      if (c?.marketing && i.googleAdsId && window.gtag) {
        const label =
          name === "devis_envoye" ? i.googleAdsQuoteLabel : name === "contact_envoye" ? i.googleAdsContactLabel : undefined;
        if (label) window.gtag("event", "conversion", { send_to: `${i.googleAdsId}/${label}` });
      }
      if (c?.marketing && i.metaPixelId && window.fbq) {
        window.fbq("track", name === "devis_envoye" || name === "contact_envoye" ? "Lead" : "Contact");
      }
    };
    const onClick = (e: MouseEvent) => {
      const link = (e.target as Element | null)?.closest?.('a[href^="tel:"], a[href^="mailto:"]');
      if (link) trackEvent(link.getAttribute("href")!.startsWith("tel:") ? "clic_telephone" : "clic_email");
    };
    window.addEventListener(TRACK_EVENT, onTrack);
    document.addEventListener("click", onClick, true);
    return () => {
      window.removeEventListener(TRACK_EVENT, onTrack);
      document.removeEventListener("click", onClick, true);
    };
  }, []);

  return null;
}
