"use client";

import { useState } from "react";
import { ArrowUpRight, MapPin } from "lucide-react";
import { openConsentManager, useConsent } from "@/lib/consent";

/**
 * Carte Google Maps soumise au choix du visiteur.
 *
 * Tant que la catégorie « Contenus externes » n'est pas acceptée, aucune requête ne part
 * vers Google : l'iframe n'existe pas dans la page, un emplacement neutre la remplace.
 * « Afficher la carte » la charge pour cette visite seulement, sans enregistrer de choix :
 * c'est l'« action explicite de l'utilisateur » prévue par la politique de confidentialité.
 * Pour l'afficher à chaque visite, le lien ouvre le gestionnaire de cookies.
 *
 * Au rendu serveur, le choix est inconnu : l'emplacement neutre s'affiche, puis la carte le
 * remplace dès l'hydratation si la catégorie est acceptée.
 */
export function ConsentMap({
  src,
  title,
  address,
  mapsHref,
}: {
  src: string;
  title: string;
  address: string;
  mapsHref: string;
}) {
  const consent = useConsent();
  const [shown, setShown] = useState(false);

  if (shown || consent?.external === true) {
    return (
      // La hauteur vient du conteneur : la carte occupe une moitié d'écran à côté du formulaire.
      <div className="relative size-full overflow-hidden bg-nera-navy-soft">
        <iframe
          src={src}
          title={title}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
          className="absolute inset-0 size-full border-0"
        />
      </div>
    );
  }

  return (
    <div className="relative flex size-full items-center justify-center overflow-hidden bg-nera-navy-deep bg-blueprint px-6 py-12 text-center text-nera-cream">
      <div className="max-w-sm">
        <span className="mx-auto flex size-12 items-center justify-center rounded-full border border-nera-cream/25">
          <MapPin className="size-5 text-accent" strokeWidth={1.75} aria-hidden />
        </span>
        <p className="mt-5 font-display text-[1.25rem] font-light leading-snug text-nera-cream">{address}</p>
        <p className="mt-3 text-body-sm font-light leading-[1.6] text-nera-cream/75">
          La carte est fournie par Google. L’afficher établit une connexion à ses serveurs.
        </p>
        <button
          type="button"
          onClick={() => setShown(true)}
          className="mt-6 inline-flex h-11 items-center justify-center rounded-sm bg-accent-deep px-5 text-[14px] font-medium text-white transition-colors hover:bg-accent-darker"
        >
          Afficher la carte
        </button>
        <div className="mt-4 flex flex-col items-center gap-2 text-body-sm">
          <a
            href={mapsHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-nera-cream/85 underline underline-offset-2 transition-colors hover:text-accent"
          >
            Ouvrir l’itinéraire dans Google Maps
            <ArrowUpRight className="size-3.5" strokeWidth={1.75} aria-hidden />
          </a>
          <button
            type="button"
            onClick={() => openConsentManager()}
            className="text-[13px] text-nera-cream/60 underline underline-offset-2 transition-colors hover:text-nera-cream"
          >
            Toujours afficher les cartes
          </button>
        </div>
      </div>
    </div>
  );
}
