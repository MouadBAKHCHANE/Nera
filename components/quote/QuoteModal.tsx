"use client";

import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";
import { X } from "lucide-react";
import dynamic from "next/dynamic";

/**
 * Le formulaire (quatre étapes, listes, pièces jointes) n'est chargé qu'au besoin : il n'entre
 * plus dans le JavaScript de chaque page, qui retardait le premier affichage (PageSpeed,
 * 30 septembre 2026). Son fichier est préchargé à la première interaction du visiteur
 * (voir plus bas) : la pop-up s'ouvre donc sans attente perceptible.
 */
const loadQuoteForm = () => import("./QuoteForm");
const QuoteForm = dynamic(() => loadQuoteForm().then((m) => m.QuoteForm), {
  ssr: false,
  loading: () => <p className="py-10 text-center text-body-sm text-mute">Chargement du formulaire…</p>,
});

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

  // Précharge le formulaire à la première interaction (toucher, clic, touche, défilement),
  // bien après le premier affichage : la pop-up n'attend plus son code à l'ouverture.
  useEffect(() => {
    const events = ["pointerdown", "keydown", "scroll", "touchstart"] as const;
    const preload = () => {
      events.forEach((e) => window.removeEventListener(e, preload));
      void loadQuoteForm();
    };
    events.forEach((e) => window.addEventListener(e, preload, { once: true, passive: true }));
    return () => events.forEach((e) => window.removeEventListener(e, preload));
  }, []);

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
        <div className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto bg-nera-navy-deep/70 p-4 backdrop-blur-sm sm:items-center sm:overflow-hidden [@media(max-height:820px)]:sm:p-3" onClick={close}>
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="quote-title"
            onClick={(e) => e.stopPropagation()}
            /*
              Dès `sm`, hauteur fixe, identique à toutes les étapes : la modale ne saute plus d'une
              étape à l'autre et ne dépasse jamais l'écran. 740 px au plus, l'écran moins une marge
              sinon. Sur téléphone, à la demande du client, la modale reprend sa hauteur naturelle
              et c'est la page qui défile : les boutons viennent après les champs, ce qui invite à
              faire défiler pour tout voir avant de continuer.
            */
            className="relative my-4 flex w-full scroll-mt-4 max-w-[576px] flex-col rounded-md border border-hairline bg-canvas p-4 shadow-[0_24px_80px_rgba(10,36,64,0.35)] sm:my-0 sm:h-[min(740px,calc(100dvh-4rem))] [@media(max-height:820px)]:sm:h-[min(740px,calc(100dvh-1.5rem))] sm:p-8 [@media(max-height:820px)]:sm:p-6"
          >
            <button type="button" onClick={close} aria-label="Fermer" className="absolute right-3 top-3 inline-flex size-10 items-center justify-center rounded-sm text-mute transition-colors hover:bg-canvas-alt hover:text-nera-navy">
              <X className="size-5" strokeWidth={1.75} />
            </button>
            <p className="flex shrink-0 items-center gap-3 text-[11px] font-medium uppercase tracking-[0.2em] text-accent-deep">
              <span className="h-2 w-7 bg-accent" aria-hidden />
              Devis gratuit
            </p>
            <h2 id="quote-title" className="mt-2 shrink-0 font-display text-[1.25rem] text-nera-navy sm:mt-3 sm:text-display-sm md:text-display-md [@media(max-height:820px)]:md:text-display-sm">
              Votre devis gratuit
            </h2>
            {/* Sous-titre masqué sur les écrans bas (portables 768 px) : la place va aux champs. */}
            <p className="mt-1 hidden shrink-0 text-body-sm text-body sm:block [@media(max-height:820px)]:hidden">Bureau d&apos;ingénieurs en énergie et physique du bâtiment.</p>
            <div className="mt-4 flex flex-col sm:mt-6 sm:min-h-0 sm:flex-1 [@media(max-height:820px)]:sm:mt-4">
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
