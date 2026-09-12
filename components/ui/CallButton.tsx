"use client";

import { useEffect, useState } from "react";
import { ArrowUp, FileText } from "lucide-react";
import { useQuote } from "@/components/quote/QuoteModal";

/**
 * Éléments flottants :
 * - onglet « Devis gratuit » à mi-hauteur sur le bord droit, sur tous les formats, qui
 *   apparaît une fois le héro passé et déplie son libellé au survol ;
 * - bouton « retour en haut » carré en bas à droite, sur tous les formats, visible après
 *   un défilement.
 */
export function CallButton() {
  const { open } = useQuote();
  const [showQuote, setShowQuote] = useState(false);
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      // les deux boutons apparaissent une fois le héro passé
      const past = window.scrollY > window.innerHeight * 0.8;
      setShowQuote(past);
      setShowTop(past);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/*
        L'onglet ne montre que son icône au repos et déplie « Devis gratuit » au survol ou à la
        prise de focus au clavier. Le libellé est animé en largeur maximale plutôt qu'en
        largeur : `max-width` se transitionne, `width: auto` non. Sur un écran tactile, où le
        survol n'existe pas, l'onglet reste à l'icône seule — d'où l'`aria-label`, qui sert
        aussi de nom accessible constant.
      */}
      <button
        type="button"
        onClick={() => open()}
        aria-label="Demander un devis gratuit"
        className={`group fixed right-0 top-1/2 z-[80] inline-flex h-11 -translate-y-1/2 items-center rounded-l-sm bg-accent px-3 text-white shadow-[0_8px_24px_rgba(10,36,64,0.35)] transition-all duration-300 hover:bg-accent-deep lg:h-12 ${
          showQuote ? "translate-x-0 opacity-100" : "pointer-events-none translate-x-4 opacity-0"
        }`}
      >
        <FileText className="size-5 shrink-0" strokeWidth={1.75} />
        <span className="max-w-0 overflow-hidden whitespace-nowrap text-[14px] font-medium transition-all duration-300 group-hover:max-w-[10rem] group-hover:pl-2 group-focus-visible:max-w-[10rem] group-focus-visible:pl-2">
          Devis gratuit
        </span>
      </button>

      <button
        type="button"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="Retour en haut"
        className={`fixed bottom-4 right-3 z-[80] inline-flex size-10 items-center justify-center rounded-sm bg-nera-navy text-nera-cream shadow-[0_8px_24px_rgba(10,36,64,0.35)] transition-all duration-300 hover:bg-nera-navy-deep lg:bottom-6 lg:right-6 lg:size-11 ${
          showTop ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0"
        }`}
      >
        <ArrowUp className="size-4" strokeWidth={1.75} />
      </button>
    </>
  );
}
