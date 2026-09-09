"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import { useQuote } from "@/components/quote/QuoteModal";

/**
 * Éléments flottants, téléphone et tablette seulement :
 * - onglet vertical « Devis gratuit » à mi-hauteur sur le bord droit, ouvre le pop-up ;
 * - bouton « retour en haut » carré en bas à droite, visible après un défilement.
 */
export function CallButton() {
  const { open } = useQuote();
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <button
        type="button"
        onClick={() => open()}
        className="fixed right-0 top-1/2 z-[80] rounded-l-sm bg-accent px-2.5 py-4 text-[12px] font-medium uppercase tracking-[0.18em] text-white shadow-[0_8px_24px_rgba(10,36,64,0.35)] transition-colors hover:bg-accent-deep lg:hidden [writing-mode:vertical-rl] [transform:translateY(-50%)_rotate(180deg)]"
      >
        Devis gratuit
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
