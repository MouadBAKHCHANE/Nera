import { Fragment, type CSSProperties, type ElementType } from "react";

/**
 * Titre révélé lettre par lettre, direction hestera.ch (« anim-txt ») :
 * chaque mot est un bloc `overflow:hidden`, chaque lettre part de translateY(150%)
 * et remonte en 1,4 s (cubic-bezier .5,0,0,1) avec un décalage par lettre.
 * `accent` : sous-chaîne à colorer en vert (ex. « performance énergétique »).
 *
 * Réécrit le 30 septembre 2026 en animation CSS pure, rendue côté serveur (keyframes
 * `rv-letter` dans `globals.css`) : elle démarre à la première peinture au lieu d'attendre le
 * JavaScript, ce qui avançait l'affichage du héro. Plus de `will-change` par lettre, qui créait
 * une soixantaine de calques de composition. « Réduire les animations » est traité en CSS.
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
  const accentStart = accent ? text.indexOf(accent) : -1;
  const accentEnd = accentStart >= 0 ? accentStart + (accent as string).length : -1;
  const words = text.split(" ");
  // Pour chaque mot : position de son premier caractère dans le texte, et rang de sa première
  // lettre pour le décalage de l'animation. Calculés d'avance, sans compteur modifié au rendu.
  const starts = words.map((_, i) => words.slice(0, i).reduce((n, w) => n + w.length + 1, 0));
  const ranks = words.map((_, i) => words.slice(0, i).reduce((n, w) => n + Array.from(w).length, 0));

  return (
    <Tag className={className} aria-label={text}>
      {words.map((word, wi) => (
        <Fragment key={wi}>
        <span className="inline-block overflow-hidden align-bottom" aria-hidden>
          {Array.from(word).map((ch, ci) => {
            const pos = starts[wi] + ci;
            const inAccent = pos >= accentStart && pos < accentEnd;
            const style = { animationDelay: `${delay + (ranks[wi] + ci) * stagger}s` } as CSSProperties;
            return (
              <span key={ci} className={`split-letter inline-block ${inAccent ? "font-medium text-accent" : ""}`} style={style}>
                {ch}
              </span>
            );
          })}
        </span>
        {/*
          L'espace entre les mots, hors du bloc du mot : placée à la fin d'un `inline-block`,
          elle pouvait être supprimée par le navigateur, et les mots se collaient.
        */}
        {wi < words.length - 1 ? " " : null}
        </Fragment>
      ))}
    </Tag>
  );
}
