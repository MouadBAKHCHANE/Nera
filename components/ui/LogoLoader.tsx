/**
 * Indicateur de chargement : le logomark NERA se dessine en boucle, au trait vert,
 * pendant que son losange intérieur respire. Géométrie reprise du SVG officiel
 * (`public/logos/nera-mark-green.svg`, viewBox 256×297), tracé et non rempli.
 *
 * Animation en CSS pure (`app/globals.css`) : ce composant sert de repli Suspense,
 * il ne doit donc dépendre d'aucun JavaScript pour s'afficher.
 */
export function LogoLoader({ className = "", size = 72 }: { className?: string; size?: number }) {
  return (
    <span role="status" className={`inline-flex flex-col items-center gap-4 ${className}`}>
      <svg
        viewBox="0 0 256 297"
        width={size}
        height={(size * 297) / 256}
        fill="none"
        stroke="currentColor"
        strokeWidth={6}
        strokeLinejoin="round"
        className="text-accent"
        aria-hidden
      >
        {/* Contour du logomark : dessiné puis effacé, en continu */}
        <path
          pathLength={1}
          className="animate-trace"
          d="M256 128L128 0L0 128L112.74 240.74H29.113V296.103H226.863V240.74H143.236L255.976 128H256Z"
        />
        {/* Losange intérieur : respiration décalée, il donne le pouls */}
        <path className="animate-breathe" d="M177.177 128L128 177.177L78.8234 128L128 78.8234L177.177 128Z" />
      </svg>
      <span className="sr-only">Chargement en cours</span>
    </span>
  );
}
