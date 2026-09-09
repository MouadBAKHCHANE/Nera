"use client";

import { useEffect, useState } from "react";
import { ArrowUp, FileText } from "lucide-react";
import { useQuote } from "@/components/quote/QuoteModal";

/**
 * Éléments flottants, téléphone et tablette seulement :
 * - petit bouton icône « Devis gratuit » à mi-hauteur sur le bord droit, apparaît après le héro ;
 * - bouton « retour en haut » carré en bas à droite, visible après un défilement.
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
      <button
        type="button"
        onClick={() => open()}
        aria-label="Demander un devis gratuit"
        title="Devis gratuit"
        className={`fixed right-0 top-1/2 z-[80] inline-flex size-11 -translate-y-1/2 items-center justify-center rounded-l-sm bg-accent text-white shadow-[0_8px_24px_rgba(10,36,64,0.35)] transition-all duration-300 hover:bg-accent-deep lg:hidden ${
          showQuote ? "translate-x-0 opacity-100" : "pointer-events-none translate-x-4 opacity-0"
        }`}
      >
        <FileText className="size-5" strokeWidth={1.75} />
      </button>

      <button
        type="button"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="Retour en haut"
        className={`fixed bottom-4 right-3 z-[80] inline-flex size-10 items-center justify-center rounded-sm bg-nera-navy text-nera-cream shadow-[0_8px_24px_rgba(10,36,64,0.35)] transition-all duration-300 hover:bg-nera-navy-deep lg:hidden ${
          showTop ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0"
        }`}
      >
        <ArrowUp className="size-4" strokeWidth={1.75} />
      </button>
    </>
  );
}
