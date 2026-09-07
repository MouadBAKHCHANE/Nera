"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

/**
 * Reveal au scroll unique du site : opacité 0→1, translation 16px, 320ms, out-quart.
 * `delay` en secondes pour décaler les éléments d'une même grille (0.06 par item).
 */
export function Reveal({
  children,
  delay = 0,
  className = "",
  as = "div",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "li" | "section" | "p" | "h1" | "h2";
}) {
  const reduce = useReducedMotion();
  const Tag = motion[as];
  return (
    <Tag
      className={className}
      initial={reduce ? false : { opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 0.32, delay, ease: [0.25, 1, 0.5, 1] }}
    >
      {children}
    </Tag>
  );
}
