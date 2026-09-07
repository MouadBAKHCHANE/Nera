"use client";

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

export function Reveal({
  children,
  delay = 0,
  duration,
  effect = "fade",
  className = "",
  as = "div",
}: {
  children: ReactNode;
  delay?: number;
  duration?: number;
  effect?: Effect;
  className?: string;
  as?: "div" | "li" | "section" | "p" | "h1" | "h2";
}) {
  const reduce = useReducedMotion();
  const Tag = motion[as];
  const e = effects[effect];
  return (
    <Tag
      className={className}
      initial={reduce ? false : e.from}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "-8% 0px" }}
      transition={{ duration: (duration ?? e.duration) / 1000, delay, ease: e.ease }}
    >
      {children}
    </Tag>
  );
}
