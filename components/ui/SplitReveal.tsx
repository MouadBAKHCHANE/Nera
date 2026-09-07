"use client";

import { useEffect, useState, type ElementType } from "react";
import { useReducedMotion } from "framer-motion";

/**
 * Titre révélé lettre par lettre, direction hestera.ch (« anim-txt ») :
 * chaque mot est un bloc `overflow:hidden`, chaque lettre part de translateY(150%)
 * et remonte en 1 s (cubic-bezier .5,0,0,1) avec un décalage par lettre.
 * `accent` : sous-chaîne à colorer en vert (ex. « performance énergétique »).
 */
export function SplitReveal({
  text,
  accent,
  as: Tag = "h1",
  className = "",
  delay = 0,
  stagger = 0.035,
}: {
  text: string;
  accent?: string;
  as?: ElementType;
  className?: string;
  delay?: number;
  stagger?: number;
}) {
  const [on, setOn] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    const t = setTimeout(() => setOn(true), 60);
    return () => clearTimeout(t);
  }, []);

  const accentStart = accent ? text.indexOf(accent) : -1;
  const accentEnd = accentStart >= 0 ? accentStart + (accent as string).length : -1;
  const words = text.split(" ");
  let index = 0; // position du caractère dans le texte complet
  let count = 0; // rang de la lettre pour le décalage

  return (
    <Tag className={className} aria-label={text}>
      {words.map((word, wi) => {
        const start = index;
        index += word.length + 1;
        return (
          <span key={wi} className="inline-block overflow-hidden align-bottom" aria-hidden>
            {Array.from(word).map((ch, ci) => {
              const pos = start + ci;
              const inAccent = pos >= accentStart && pos < accentEnd;
              const d = delay + count++ * stagger;
              return (
                <span
                  key={ci}
                  className={`inline-block will-change-transform ${inAccent ? "font-medium text-accent" : ""}`}
                  style={{
                    transform: on || reduce ? "translateY(0)" : "translateY(150%)",
                    transition: reduce ? "none" : "transform 1.4s cubic-bezier(0.5, 0, 0, 1)",
                    transitionDelay: `${d}s`,
                  }}
                >
                  {ch}
                </span>
              );
            })}
            {wi < words.length - 1 ? " " : ""}
          </span>
        );
      })}
    </Tag>
  );
}
