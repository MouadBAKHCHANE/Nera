"use client";

import { useEffect, useRef, type CSSProperties, type ElementType, type ReactNode } from "react";

type Effect = "fade" | "fade-right" | "fade-up" | "slide-up";

/**
 * Apparition, calée sur hestera.ch (AOS) :
 * - `fade` (défaut) : opacité seule, 1,4 s, easing « ease ».
 * - `fade-right` : arrive de la gauche (−100 px), 1,4 s.
 * - `fade-up` : arrive du bas (+100 px), 1,4 s.
 * - `slide-up` : cartes, 0,9 s, cubic-bezier(0,0,0,1) (panneaux prestations).
 * `delay` en secondes, `duration` en millisecondes.
 *
 * Réécrit le 30 septembre 2026 en CSS pur, sans framer-motion (38 Ko de JavaScript en moins
 * sur chaque page, pour la note PageSpeed). Mêmes effets, mêmes durées :
 * - animations CSS (`globals.css`, « Reveal »), avec remplissage `backwards` : l'état de départ
 *   ne vaut que pendant le délai, puis l'élément retrouve ses propres styles, survols compris ;
 * - un seul IntersectionObserver pour toute la page, qui pose `data-shown` à l'entrée dans
 *   l'écran puis cesse d'observer (une seule fois, comme avant) ;
 * - `load` : joue dès la première peinture, sans attendre le JavaScript (héro, au-dessus de la
 *   ligne de flottaison) ;
 * - le contenu n'est masqué au départ que si le JavaScript tourne (`html[data-js]`) : sans lui,
 *   tout reste visible ;
 * - « réduire les animations » et `desktopOnly` sont traités en CSS, sans calcul au rendu.
 */
const effects: Record<Effect, { name: string; duration: number; ease: string }> = {
  fade: { name: "rv-fade", duration: 1400, ease: "cubic-bezier(0.25, 0.1, 0.25, 1)" },
  "fade-right": { name: "rv-fade-right", duration: 1400, ease: "cubic-bezier(0.25, 0.1, 0.25, 1)" },
  "fade-up": { name: "rv-fade-up", duration: 1400, ease: "cubic-bezier(0.25, 0.1, 0.25, 1)" },
  "slide-up": { name: "rv-slide-up", duration: 900, ease: "cubic-bezier(0, 0, 0, 1)" },
};

let observer: IntersectionObserver | null = null;

/** Observateur partagé : entrée dans l'écran à 8 % du bord, comme la marge d'avant. */
function observe(el: Element) {
  observer ??= new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.setAttribute("data-shown", "");
        observer?.unobserve(entry.target);
      }
    },
    { rootMargin: "-8% 0px" },
  );
  observer.observe(el);
  return () => observer?.unobserve(el);
}

export function Reveal({
  children,
  delay = 0,
  duration,
  effect = "fade",
  desktopOnly = false,
  load = false,
  className = "",
  as = "div",
}: {
  children: ReactNode;
  delay?: number;
  duration?: number;
  effect?: Effect;
  /** N'anime qu'à partir de `lg` : sous ce seuil, le contenu est posé sans apparition. */
  desktopOnly?: boolean;
  /** Joue dès le chargement, sans attendre d'entrer dans l'écran (haut de page). */
  load?: boolean;
  className?: string;
  as?: "div" | "li" | "section" | "p" | "h1" | "h2";
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (load || !ref.current) return;
    return observe(ref.current);
  }, [load]);

  const Tag = as as ElementType;
  const e = effects[effect];
  const style = {
    "--rv-name": e.name,
    "--rv-dur": `${duration ?? e.duration}ms`,
    "--rv-ease": e.ease,
    "--rv-delay": `${delay}s`,
  } as CSSProperties;

  return (
    <Tag
      ref={ref}
      className={className}
      style={style}
      data-reveal={load ? "load" : "scroll"}
      data-reveal-desktop={desktopOnly ? "" : undefined}
    >
      {children}
    </Tag>
  );
}
