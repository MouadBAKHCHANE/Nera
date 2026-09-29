"use client";

import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";
import { X } from "lucide-react";
import { QuoteForm } from "./QuoteForm";

type Ctx = { open: (prestation?: string) => void; close: () => void };
const QuoteContext = createContext<Ctx>({ open: () => {}, close: () => {} });

export const useQuote = () => useContext(QuoteContext);

/**
 * Pop-up « Devis gratuit » (direction i-neea.ch) : dialogue centré 576px, fond assombri,
 * fermeture par croix, Échap ou clic hors du dialogue. Un seul provider dans le layout,
 * tout bouton « Devis gratuit » appelle `useQuote().open(prestation?)`.
 */
export function QuoteProvider({ children }: { children: ReactNode }) {
  const [isOpen, setOpen] = useState(false);
  const [prestation, setPrestation] = useState("");

  const open = useCallback((p?: string) => {
    setPrestation(p ?? "");
    setOpen(true);
  }, []);
  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!isOpen) return;
    document.documentElement.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    window.addEventListener("keydown", onKey);
    return () => {
      document.documentElement.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [isOpen, close]);

  return (
    <QuoteContext.Provider value={{ open, close }}>
      {children}
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-nera-navy-deep/70 p-4 backdrop-blur-sm" onClick={close}>
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="quote-title"
            onClick={(e) => e.stopPropagation()}
            /*
              Hauteur fixe, identique à toutes les étapes : la modale ne saute plus d'une étape à
              l'autre et ne dépasse jamais l'écran. 740 px au plus, l'écran moins une marge sinon.
              `dvh` suit la barre d'adresse mobile qui apparaît et disparaît.
            */
            className="relative flex h-[calc(100dvh-2rem)] w-full max-w-[576px] flex-col rounded-md border border-hairline bg-canvas p-4 shadow-[0_24px_80px_rgba(10,36,64,0.35)] sm:h-[min(740px,calc(100dvh-4rem))] sm:p-8"
          >
            <button type="button" onClick={close} aria-label="Fermer" className="absolute right-3 top-3 inline-flex size-10 items-center justify-center rounded-sm text-mute transition-colors hover:bg-canvas-alt hover:text-nera-navy">
              <X className="size-5" strokeWidth={1.75} />
            </button>
            <p className="flex shrink-0 items-center gap-3 text-[11px] font-medium uppercase tracking-[0.2em] text-accent-deep">
              <span className="h-2 w-7 bg-accent" aria-hidden />
              Devis gratuit
            </p>
            <h2 id="quote-title" className="mt-2 shrink-0 font-display text-[1.25rem] text-nera-navy sm:mt-3 sm:text-display-sm md:text-display-md">
              Votre devis gratuit
            </h2>
            {/* Sous-titre masqué sur les écrans bas (portables 768 px) : la place va aux champs. */}
            <p className="mt-1 hidden shrink-0 text-body-sm text-body sm:block [@media(max-height:820px)]:hidden">Bureau d&apos;ingénieurs en énergie et physique du bâtiment.</p>
            <div className="mt-4 flex min-h-0 flex-1 flex-col sm:mt-6 [@media(max-height:820px)]:sm:mt-4">
              <QuoteForm key={prestation} initialPrestation={prestation} onDone={close} fit />
            </div>
          </div>
        </div>
      )}
    </QuoteContext.Provider>
  );
}

/** Bouton qui ouvre le pop-up. Reprend les classes passées pour s'adapter à chaque header. */
export function QuoteButton({ className = "", children = "Devis gratuit", prestation }: { className?: string; children?: ReactNode; prestation?: string }) {
  const { open } = useQuote();
  return (
    <button type="button" onClick={() => open(prestation)} className={className}>
      {children}
    </button>
  );
}
