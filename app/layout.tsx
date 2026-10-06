import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { QuoteProvider } from "@/components/quote/QuoteModal";
import { CookieBanner } from "@/components/ui/CookieBanner";
import { CallButton } from "@/components/ui/CallButton";
import { SiteProvider } from "@/components/site/SiteProvider";
import { LiveRefresh } from "@/components/site/LiveRefresh";
import { Tracking } from "@/components/site/Tracking";
import { getMarketingSettings } from "@/lib/sanity/marketing";
import { getRealisationsCount } from "@/lib/sanity/realisations";
import { getSiteSettings } from "@/lib/sanity/settings";
import { JsonLd } from "@/components/seo/JsonLd";
import { seo } from "@/content/seo";
import { baseOpenGraph, DEFAULT_SHARE_IMAGE } from "@/lib/seo/metadata";

const clash = localFont({
  src: [
    { path: "../public/fonts/ClashDisplay-Light.woff2", weight: "300", style: "normal" },
    { path: "../public/fonts/ClashDisplay-Regular.woff2", weight: "400", style: "normal" },
    { path: "../public/fonts/ClashDisplay-Medium.woff2", weight: "500", style: "normal" },
    { path: "../public/fonts/ClashDisplay-Semibold.woff2", weight: "600", style: "normal" },
  ],
  variable: "--font-clash",
  display: "swap",
  preload: true,
});

const satoshi = localFont({
  src: [
    { path: "../public/fonts/Satoshi-Regular.woff2", weight: "400", style: "normal" },
    { path: "../public/fonts/Satoshi-Medium.woff2", weight: "500", style: "normal" },
    { path: "../public/fonts/Satoshi-Bold.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-satoshi",
  display: "swap",
  preload: true,
});

const SITE_URL = seo.siteUrl;

/**
 * Titre et description par défaut : ceux saisis dans le Studio (« Réglages du site », onglet
 * SEO par défaut), sinon ceux du document SEO du client. Chaque page garde les siens.
 */
export async function generateMetadata(): Promise<Metadata> {
  const [{ seo: defaults }, marketing] = await Promise.all([getSiteSettings(), getMarketingSettings()]);
  return {
  metadataBase: new URL(SITE_URL),
  title: {
    default: defaults.title ?? seo.title,
    template: "%s | NERA",
  },
  description: defaults.description ?? seo.description,
  keywords: seo.keywords,
  // Pas d'adresse canonique par défaut : héritée par une page sans la sienne, elle désignait
  // l'accueil (relevé sur /devis, pourtant au plan du site). Chaque page déclare la sienne par
  // `pageMetadata` ; la page 404 n'en a pas.
  // Pages sans métadonnées propres (devis, 404) : image de partage par défaut. Les autres passent
  // par `pageMetadata` (lib/seo/metadata.ts).
  openGraph: { ...baseOpenGraph, url: SITE_URL },
  twitter: { card: "summary_large_image", images: [DEFAULT_SHARE_IMAGE] },
  robots: { index: true, follow: true },
  // Balises de vérification saisies dans le Studio (« Marketing & Analytics »).
  verification: {
    google: marketing.googleSiteVerification,
    other: marketing.metaDomainVerification
      ? { "facebook-domain-verification": marketing.metaDomainVerification }
      : undefined,
  },
  };
}

export default async function RootLayout({ children }: LayoutProps<"/">) {
  // Lu une fois ici, puis transmis aux composants client (menus, onglets, formulaires) par le
  // contexte du site. Les composants serveur relisent Sanity eux-mêmes, sans coût : même cache.
  const [count, settings, marketing] = await Promise.all([getRealisationsCount(), getSiteSettings(), getMarketingSettings()]);
  const site = { showReferences: count > 0, company: settings.company };
  return (
    // data-scroll-behavior : Next 16 ne neutralise plus `scroll-behavior: smooth` pendant les
    // transitions de route sans cet attribut. Sans lui, un lien du pied de page fait défiler
    // en douceur jusqu'en haut de la nouvelle page au lieu de l'ouvrir directement en haut.
    // suppressHydrationWarning : `data-consent` est posé par le script ci-dessous, avant React.
    <html
      lang="fr-CH"
      data-scroll-behavior="smooth"
      className={`${clash.variable} ${satoshi.variable} h-full`}
      suppressHydrationWarning
    >
      <head>
        {/*
          Avant la première peinture : `data-js` autorise les apparitions (Reveal) à masquer le
          contenu au départ, sans quoi tout reste visible ; si le visiteur a déjà fait son choix
          de cookies, le bandeau (présent dans le HTML initial) est masqué, sans clignotement.
        */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "document.documentElement.setAttribute('data-js','');try{if(localStorage.getItem('nera-cookie-consent'))document.documentElement.setAttribute('data-consent','')}catch(e){}",
          }}
        />
      </head>
      <body className="min-h-full flex flex-col">
        <JsonLd />
        <SiteProvider value={site}>
          <QuoteProvider>
            {children}
            <CookieBanner />
            <CallButton />
          </QuoteProvider>
          {/* Publications du Studio répercutées sur les pages ouvertes, sans rechargement. */}
          <LiveRefresh />
          {/* Outils de mesure, chargés seulement après le consentement correspondant. */}
          <Tracking
            ids={{
              googleTagManagerId: marketing.googleTagManagerId,
              googleAnalyticsId: marketing.googleAnalyticsId,
              googleAdsId: marketing.googleAdsId,
              googleAdsQuoteLabel: marketing.googleAdsQuoteLabel,
              googleAdsContactLabel: marketing.googleAdsContactLabel,
              metaPixelId: marketing.metaPixelId,
            }}
          />
        </SiteProvider>
      </body>
    </html>
  );
}
