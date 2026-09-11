"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * Découvre une image par la gauche quand elle entre dans la fenêtre, direction hestera.ch
 * (`.img-onscroll` : `width: 0` → `100%`, 1 s, `cubic-bezier(.5, 0, 0, 1)`).
 *
 * Chez eux, c'est le conteneur de l'image qui s'élargit, l'image étant en position absolue
 * pour ne pas se déformer. Ici l'image reste en place et c'est un rideau, à la couleur du fond
 * de section, qui se retire vers la droite : même rendu, sans risque d'écrasement de la photo.
 * `curtain` doit donc porter la couleur de fond de la section (`bg-canvas`, `bg-canvas-alt`…).
 *
 * Le rideau est posé par `data-shown` depuis l'observateur, pas par un état React : cela évite
 * un `setState` dans un effet, que le lint refuse, et un rendu de plus.
 */
export function ImageWipe({
  children,
  curtain = "bg-canvas",
  className = "",
}: {
  children: ReactNode;
  curtain?: string;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.dataset.shown = "true";
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        el.dataset.shown = "true";
      },
      { rootMargin: "0px 0px -12% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className={`group/wipe relative overflow-hidden ${className}`}>
      {children}
      <span
        aria-hidden
        className={`pointer-events-none absolute inset-y-0 right-0 w-full transition-[width] duration-1000 ease-[cubic-bezier(0.5,0,0,1)] group-data-[shown=true]/wipe:w-0 ${curtain}`}
      />
    </div>
  );
}
