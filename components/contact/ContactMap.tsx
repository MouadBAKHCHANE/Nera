"use client";

import { useSyncExternalStore } from "react";
import { ExternalLink, MapPin } from "lucide-react";
import { CONSENT_SAVED, openConsentManager, readConsent, writeConsent } from "@/lib/consent";
import { company } from "@/content/prestations";
import { mapsHref } from "@/content/footer";
import { contact } from "@/content/contact";

/** Le consentement vit hors de React (localStorage + évènement) : on s'y abonne. */
const subscribe = (onChange: () => void) => {
  window.addEventListener(CONSENT_SAVED, onChange);
  return () => window.removeEventListener(CONSENT_SAVED, onChange);
};

/**
 * « Carte localisation » du document client. Google Maps dépose des cookies : l'iframe n'est
 * montée qu'une fois la catégorie `maps` acceptée (`lib/consent.ts`), jamais avant. Sans
 * consentement, on affiche l'adresse, la raison de l'absence de carte, un bouton qui l'autorise
 * et un lien vers Google Maps pour qui préfère ne rien accepter.
 *
 * Le composant écoute `nera:cookie-consent` : accepter les cartes depuis le bandeau ou depuis
 * `/cookies` affiche la carte sans recharger la page, et la retirer la démonte.
 */
export function ContactMap() {
  const allowed = useSyncExternalStore(
    subscribe,
    () => readConsent()?.maps ?? false,
    // Au rendu serveur, aucun consentement n'est lisible : on ne monte jamais l'iframe.
    () => false,
  );

  /** Ouvre le gestionnaire de cookies ; si aucun bandeau n'écoute, accepte la seule catégorie cartes. */
  const allow = () => {
    if (openConsentManager()) return;
    const current = readConsent();
    writeConsent({
      necessary: true,
      analytics: current?.analytics ?? false,
      marketing: current?.marketing ?? false,
      maps: true,
      date: new Date().toISOString(),
    });
  };

  /**
   * Le repère doit correspondre à la fiche d'établissement Google, pas à un point brut :
   * un `q=<latitude>,<longitude>` pose une épingle sans fiche, et le clic répond alors
   * « Impossible de charger les informations sur le lieu ». Avec la raison sociale et
   * l'adresse, Google retrouve l'établissement et le clic ouvre sa fiche, avec l'itinéraire.
   * Les coordonnées de `content/contact.ts` restent la source du `geo` des données
   * structurées.
   */
  const query = encodeURIComponent(`${company.name}, ${company.street}, ${company.zip} ${company.city}`);

  return (
    <div className="relative h-[340px] overflow-hidden bg-nera-navy-soft md:h-[420px] lg:h-[500px]">
      {allowed ? (
        <iframe
          src={`https://www.google.com/maps?q=${query}&z=${contact.map.zoom}&output=embed&hl=fr`}
          title={`${company.shortName} — ${company.street}, ${company.zip} ${company.city}`}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="absolute inset-0 size-full border-0"
        />
      ) : (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-blueprint-light px-6 text-center">
          <MapPin className="size-7 text-accent-deep" strokeWidth={1.5} aria-hidden />
          <p className="font-display text-[1.0625rem] font-medium text-nera-navy">
            {company.street}, {company.zip} {company.city}
          </p>
          <p className="max-w-[46ch] text-body-sm leading-[1.7] text-body">{contact.map.consentText}</p>
          <div className="mt-2 flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
            <button
              type="button"
              onClick={allow}
              className="inline-flex h-11 items-center rounded-sm bg-nera-navy px-5 text-[15px] font-medium text-nera-cream transition-colors hover:bg-nera-navy-deep"
            >
              {contact.map.consentCta}
            </button>
            <a
              href={mapsHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-body-sm font-medium text-nera-navy underline underline-offset-4 transition-colors hover:text-accent-deep"
            >
              {contact.map.fallbackCta}
              <ExternalLink className="size-3.5" strokeWidth={1.5} aria-hidden />
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
