/**
 * Logomark NERA redessiné au trait (losange évidé sur son socle), pour les
 * grands motifs décoratifs. Géométrie reprise du SVG officiel (viewBox 256×297).
 */
export function LogomarkOutline({ className = "", strokeWidth = 1 }: { className?: string; strokeWidth?: number }) {
  return (
    <svg viewBox="0 0 256 297" fill="none" stroke="currentColor" strokeWidth={strokeWidth} className={className} aria-hidden>
      <path d="M256 128L128 0L0 128L112.74 240.74H29.113V296.103H226.863V240.74H143.236L255.976 128H256Z" vectorEffect="non-scaling-stroke" />
      <path d="M177.177 128L128 177.177L78.8234 128L128 78.8234L177.177 128Z" vectorEffect="non-scaling-stroke" />
    </svg>
  );
}

/** Losange seul, au trait, pour les anneaux tournants et les pastilles. */
export function DiamondOutline({ className = "", strokeWidth = 1 }: { className?: string; strokeWidth?: number }) {
  return (
    <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth={strokeWidth} className={className} aria-hidden>
      <path d="M50 2L98 50L50 98L2 50Z" vectorEffect="non-scaling-stroke" />
    </svg>
  );
}

/** Règle graduée horizontale : rappel de « mesure et justesse ». */
export function Ruler({ className = "", ticks = 24 }: { className?: string; ticks?: number }) {
  return (
    <div className={`flex items-end justify-between ${className}`} aria-hidden>
      {Array.from({ length: ticks }).map((_, i) => (
        <span
          key={i}
          className={`block w-px shrink-0 ${i % 6 === 0 ? "h-4 bg-accent" : i % 3 === 0 ? "h-2.5 bg-current opacity-60" : "h-1.5 bg-current opacity-30"}`}
        />
      ))}
    </div>
  );
}
