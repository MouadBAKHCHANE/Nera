"use client";

import { useSyncExternalStore } from "react";
import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

type Effect = "fade" | "fade-right" | "fade-up" | "slide-up";

/**
 * Reveal au scroll, calé sur hestera.ch (AOS) :
 * - `fade` (défaut) : opacité seule, 1,4 s, easing « ease ».
 * - `fade-right` : arrive de la gauche (−100 px), 1 s.
 * - `fade-up` : arrive du bas (+100 px), 1 s.
 * - `slide-up` : cartes, 0,6 s, cubic-bezier(0,0,0,1) (panneaux prestations).
 * `delay` en secondes, `duration` en millisecondes.
 */
const effects: Record<Effect, { from: Record<string, number>; duration: number; ease: [number, number, number, number] }> = {
  fade: { from: { opacity: 0 }, duration: 1400, ease: [0.25, 0.1, 0.25, 1] },
  "fade-right": { from: { opacity: 0, x: -100 }, duration: 1400, ease: [0.25, 0.1, 0.25, 1] },
  "fade-up": { from: { opacity: 0, y: 100 }, duration: 1400, ease: [0.25, 0.1, 0.25, 1] },
  "slide-up": { from: { opacity: 0, y: 80 }, duration: 900, ease: [0, 0, 0, 1] },
};

/** Sous `lg` : le point de rupture de Tailwind, 1024 px. */
const MOBILE = "(max-width: 1023.98px)";

const subscribeMobile = (onChange: () => void) => {
  const mq = window.matchMedia(MOBILE);
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
};

export function Reveal({
  children,
  delay = 0,
  duration,
  effect = "fade",
  desktopOnly = false,
  className = "",
  as = "div",
}: {
  children: ReactNode;
  delay?: number;
  duration?: number;
  effect?: Effect;
  /** N'anime qu'à partir de `lg` : sous ce seuil, le contenu est posé sans apparition. */
  desktopOnly?: boolean;
  className?: string;
  as?: "div" | "li" | "section" | "p" | "h1" | "h2";
}) {
  const reduce = useReducedMotion();
  // Le serveur ne connaît pas la largeur de l'écran : il rend comme un desktop, et
  // l'hydratation retire l'apparition sur mobile. L'inverse ferait clignoter le desktop.
  const isMobile = useSyncExternalStore(
    subscribeMobile,
    () => window.matchMedia(MOBILE).matches,
    () => false,
  );
  const off = reduce || (desktopOnly && isMobile);
  const Tag = motion[as];
  const e = effects[effect];
  /**
   * L'état d'arrivée ne reprend que les propriétés réellement décalées au départ. Il valait
   * auparavant `{ opacity: 1, x: 0, y: 0 }` pour tous les effets : même un simple fondu posait
   * donc un `transform` sur l'élément, ce qui le promeut en calque et fait re-tramer le texte.
   * Sur mobile, cela se voyait — les cartes du principe d'équilibre sautaient à l'apparition.
   */
  const to = Object.fromEntries(Object.keys(e.from).map((k) => [k, k === "opacity" ? 1 : 0]));
  return (
    <Tag
      className={className}
      initial={off ? false : e.from}
      whileInView={off ? undefined : to}
      viewport={{ once: true, margin: "-8% 0px" }}
      transition={{ duration: (duration ?? e.duration) / 1000, delay, ease: e.ease }}
    >
      {children}
    </Tag>
  );
}
