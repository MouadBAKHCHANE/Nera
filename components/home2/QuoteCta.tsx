"use client";

import { useQuote } from "@/components/quote/QuoteModal";

/**
 * Bouton « Devis gratuit », action principale du site : un contour qui se remplit de vert au
 * survol. C'est le bouton de l'en-tête, dont l'en-tête lui-même se sert désormais : une seule
 * définition pour tous les appels à l'action de devis, de l'accueil au 404.
 *
 * `tone` selon le fond : `light` sur marine (contour et texte crème), `dark` sur crème ou blanc
 * (contour et texte marine). Les deux se remplissent de vert au survol, texte en blanc.
 *
 * Les autres appels à l'action — « Découvrir… », « Contacter NERA » — restent des liens fléchés
 * (`ArrowLink`) : le contour est réservé à la demande de devis, qui est l'action recherchée.
 *
 * Remplace `ArrowQuoteButton`, qui reprenait l'apparence du lien fléché.
 */
const tones = {
  light: "border-nera-cream/60 text-nera-cream hover:border-accent hover:bg-accent hover:text-white",
  dark: "border-nera-navy text-nera-navy hover:border-accent hover:bg-accent hover:text-white",
};

export type QuoteTone = keyof typeof tones;

export function QuoteCta({
  children = "Demander un devis gratuit",
  tone = "light",
  className = "",
  prestation,
}: {
  children?: React.ReactNode;
  tone?: QuoteTone;
  className?: string;
  /** Pré-remplit la prestation dans le pop-up, depuis une page prestation. */
  prestation?: string;
}) {
  const { open } = useQuote();
  return (
    <button
      type="button"
      onClick={() => open(prestation)}
      className={`inline-flex h-12 items-center rounded-sm border px-6 text-[15px] font-medium transition-colors duration-base ${tones[tone]} ${className}`}
    >
      {children}
    </button>
  );
}
