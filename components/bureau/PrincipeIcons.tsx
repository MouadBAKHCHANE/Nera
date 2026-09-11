/**
 * Icônes flat sur-mesure pour la section « L'équilibre comme principe » (/bureau).
 * Style minimaliste suisse, précision d'ingénieur NERA, fond vert doux (#E3F4EC),
 * traits marine (#0F3557) et accents vert NERA (#28AC75).
 */

interface IconProps {
  className?: string;
}

/**
 * 1. Performance et Faisabilité
 * Balance de précision équilibrant la haute performance énergétique et la réalité du chantier.
 */
export function PerformanceFaisabiliteIcon({ className = "size-12" }: IconProps) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Pastille de fond douce */}
      <rect x="4" y="4" width="40" height="40" rx="8" className="fill-nera-green-soft/50" />

      {/* Socle et axe central de la balance */}
      <path d="M16 40H32" className="stroke-nera-navy" strokeWidth="1.75" strokeLinecap="round" />
      <path d="M24 40V14" className="stroke-nera-navy" strokeWidth="1.75" strokeLinecap="round" />

      {/* Pivot central avec losange NERA */}
      <polygon points="24,10 28,14 24,18 20,14" className="fill-accent stroke-accent" strokeWidth="1" />

      {/* Fléau principal horizontal */}
      <path d="M10 18H38" className="stroke-nera-navy" strokeWidth="2" strokeLinecap="round" />

      {/* Plateau gauche (Performance - indicateur énergie vert) */}
      <path d="M10 18L6 28H14L10 18Z" className="stroke-accent fill-nera-white" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M10 31V34" className="stroke-accent" strokeWidth="2" strokeLinecap="round" />
      <circle cx="10" cy="34" r="2" className="fill-accent" />

      {/* Plateau droit (Faisabilité - bloc constructif) */}
      <path d="M38 18L34 28H42L38 18Z" className="stroke-nera-navy fill-nera-white" strokeWidth="1.5" strokeLinejoin="round" />
      <rect x="35" y="30" width="6" height="5" rx="1" className="fill-nera-navy stroke-nera-navy" />
    </svg>
  );
}

/**
 * 2. Ambition Énergétique et Réalité Constructive
 * Rayon d'énergie renouvelable croisant la structure porteuse d'un bâtiment.
 */
export function AmbitionRealiteIcon({ className = "size-12" }: IconProps) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Pastille de fond douce */}
      <rect x="4" y="4" width="40" height="40" rx="8" className="fill-nera-green-soft/50" />

      {/* Structure porteuse en Poutrelles / IPN (Réalité constructive) */}
      <path d="M10 38V18H30V38" className="stroke-nera-navy" strokeWidth="1.75" strokeLinejoin="round" />
      <path d="M10 26H30" className="stroke-nera-navy/60" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M10 32H30" className="stroke-nera-navy/60" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M20 18V38" className="stroke-nera-navy/40" strokeWidth="1.5" strokeLinecap="round" />

      {/* Éclair d'ambition énergétique dynamisant la structure */}
      <path
        d="M38 8L22 24H32L18 42L34 24H25L38 8Z"
        className="fill-accent stroke-accent"
        strokeWidth="1"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/**
 * 3. Investissement et Coûts d'Exploitation
 * Courbe d'optimisation financière et médaille de rentabilité à long terme.
 */
export function InvestissementExploitationIcon({ className = "size-12" }: IconProps) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Pastille de fond douce */}
      <rect x="4" y="4" width="40" height="40" rx="8" className="fill-nera-green-soft/50" />

      {/* Graphique de coûts / rentabilité */}
      <path d="M10 38H38" className="stroke-nera-navy" strokeWidth="1.75" strokeLinecap="round" />
      <path d="M10 38V12" className="stroke-nera-navy" strokeWidth="1.75" strokeLinecap="round" />

      {/* Barres d'investissement initial -> économies d'exploitation */}
      <rect x="14" y="26" width="5" height="12" rx="1" className="fill-nera-navy/30 stroke-nera-navy" strokeWidth="1" />
      <rect x="22" y="20" width="5" height="18" rx="1" className="fill-nera-navy/60 stroke-nera-navy" strokeWidth="1" />

      {/* Courbe ascendante d'efficience financière avec flèche verte */}
      <path
        d="M12 32C18 30 22 22 34 14"
        className="stroke-accent"
        strokeWidth="2.25"
        strokeLinecap="round"
      />
      <path d="M29 14H34V19" className="stroke-accent" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round" />

      {/* Pièce de monnaie / symbole CHF durable */}
      <circle cx="36" cy="28" r="6" className="fill-nera-white stroke-accent" strokeWidth="1.5" />
      <path d="M34 28H38" className="stroke-accent" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M36 26V30" className="stroke-accent" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

/**
 * 4. Technique et Confort
 * Régulation thermique et flux d'air ambiant dans l'habitat.
 */
export function TechniqueConfortIcon({ className = "size-12" }: IconProps) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Pastille de fond douce */}
      <rect x="4" y="4" width="40" height="40" rx="8" className="fill-nera-green-soft/50" />

      {/* Thermomètre de précision technique CVC */}
      <path
        d="M18 24.5V12C18 10 19.5 8.5 21.5 8.5C23.5 8.5 25 10 25 12V24.5C27 26 28 28.5 28 31C28 34.5 25 37.5 21.5 37.5C18 37.5 15 34.5 15 31C15 28.5 16 26 18 24.5Z"
        className="fill-nera-white stroke-nera-navy"
        strokeWidth="1.75"
        strokeLinejoin="round"
      />
      {/* Colonne de fluide thermique vert */}
      <path d="M21.5 16V32" className="stroke-accent" strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="21.5" cy="31" r="3" className="fill-accent" />

      {/* Odes de confort ambiant / flux d'air tempéré */}
      <path d="M31 16C34 16 36 18 39 18" className="stroke-accent" strokeWidth="1.75" strokeLinecap="round" />
      <path d="M30 22C33 22 35 24 38 24" className="stroke-accent" strokeWidth="1.75" strokeLinecap="round" />
      <path d="M31 28C34 28 36 30 39 30" className="stroke-accent" strokeWidth="1.75" strokeLinecap="round" />
    </svg>
  );
}

/**
 * 5. Transformation et Préservation du Bâti
 * Rénovation énergétique du patrimoine (bâtiment traditionnel vers efficacité moderne).
 */
export function TransformationPreservationIcon({ className = "size-12" }: IconProps) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Pastille de fond douce */}
      <rect x="4" y="4" width="40" height="40" rx="8" className="fill-nera-green-soft/50" />

      {/* Bâtiment existant à préserver (façade à arches traditionnelles) */}
      <path d="M8 40V22L20 12L32 22V40H8Z" className="stroke-nera-navy" strokeWidth="1.75" strokeLinejoin="round" />
      <path d="M14 40V32C14 30 16 28 18 28C20 28 22 30 22 32V40" className="stroke-nera-navy/70" strokeWidth="1.5" />

      {/* Arc de transformation vert reliant l'existant au moderne */}
      <path
        d="M26 16C32 16 38 20 40 26"
        className="stroke-accent"
        strokeWidth="2"
        strokeLinecap="round"
        strokeDasharray="3 2"
      />

      {/* Panneau solaire / rénovation moderne intégrée */}
      <rect x="28" y="24" width="14" height="14" rx="2" className="fill-nera-white stroke-accent" strokeWidth="1.5" />
      <path d="M28 31H42" className="stroke-accent" strokeWidth="1.25" />
      <path d="M35 24V38" className="stroke-accent" strokeWidth="1.25" />
    </svg>
  );
}

/**
 * 6. L'Humain et l'Environnement
 * Synergie entre les usagers du bâtiment et l'écosystème environnemental.
 */
export function HumainEnvironnementIcon({ className = "size-12" }: IconProps) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Pastille de fond douce */}
      <rect x="4" y="4" width="40" height="40" rx="8" className="fill-nera-green-soft/50" />

      {/* Habitat humain (silhouettes de vie & bâtiment) */}
      <path d="M10 38V24L22 14L34 24V38H10Z" className="stroke-nera-navy fill-nera-white" strokeWidth="1.75" strokeLinejoin="round" />
      
      {/* Silhouette humaine centrale */}
      <circle cx="22" cy="23" r="2.5" className="fill-nera-navy" />
      <path d="M17 33C17 29.5 19 28 22 28C25 28 27 29.5 27 33" className="stroke-nera-navy" strokeWidth="1.5" strokeLinecap="round" />

      {/* Grande feuille protectrice environnementale englobant la structure */}
      <path
        d="M22 10C32 10 40 18 40 30C36 30 28 28 22 38"
        className="stroke-accent"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M34 18C28 22 26 28 26 34"
        className="stroke-accent"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

/** Liste des 6 icônes ordonnées pour les 6 items du principe dans bureau.ts */
export const PrincipeIconsList = [
  PerformanceFaisabiliteIcon,
  AmbitionRealiteIcon,
  InvestissementExploitationIcon,
  TechniqueConfortIcon,
  TransformationPreservationIcon,
  HumainEnvironnementIcon,
];
