/**
 * Icônes flat sur-mesure pour la section « Nos qualifications » de la page /bureau.
 * Conçues selon la charte graphique NERA : minimalisme suisse, précision d'ingénieur,
 * traits nets (marine #0F3557) et accents verts (#28AC75) avec des aplats doux (#E3F4EC).
 */

interface IconProps {
  className?: string;
}

/**
 * 1. Experts CECB
 * Silhouette de bâtiment avec échelle de performance énergétique (barres A-G)
 * et sceau d'expert certifié vert avec coche de validation.
 */
export function CecbQualificationIcon({ className = "size-10" }: IconProps) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Fond de pastille doux */}
      <rect x="4" y="4" width="40" height="40" rx="8" className="fill-nera-green-soft/50" />

      {/* Silhouette du bâtiment / maison */}
      <path
        d="M9 22L21 12L33 22V40H9V22Z"
        className="stroke-nera-navy"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Échelle de performance énergétique CECB (barres de classe A, B, C) */}
      <path
        d="M14 24H21"
        className="stroke-accent"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M14 28H24"
        className="stroke-nera-navy/80"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M14 32H27"
        className="stroke-nera-navy/50"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M14 36H24"
        className="stroke-nera-navy/30"
        strokeWidth="2"
        strokeLinecap="round"
      />

      {/* Sceau officiel d'expert CECB certifié */}
      <circle
        cx="34"
        cy="14"
        r="9"
        className="fill-nera-white stroke-accent"
        strokeWidth="1.75"
      />
      {/* Checkmark vert dans le sceau */}
      <path
        d="M30.5 14L33 16.5L37.5 11.5"
        className="stroke-accent"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/**
 * 2. Minergie Partenaire spécialiste
 * Façade de bâtiment à haute efficacité énergétique associée à l'étoile/soleil
 * et à la feuille de durabilité Minergie.
 */
export function MinergieQualificationIcon({ className = "size-10" }: IconProps) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Fond de pastille doux */}
      <rect x="4" y="4" width="40" height="40" rx="8" className="fill-nera-green-soft/50" />

      {/* Structure du bâtiment à haute enveloppe thermique */}
      <rect
        x="9"
        y="16"
        width="22"
        height="24"
        rx="2"
        className="stroke-nera-navy"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Trame de vitrage / enveloppe performante */}
      <path d="M15 22H25" className="stroke-nera-navy/60" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M15 28H25" className="stroke-nera-navy/60" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M15 34H25" className="stroke-nera-navy/60" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M20 16V40" className="stroke-nera-navy/40" strokeWidth="1.5" strokeLinecap="round" />

      {/* Étoile de certification / Rayons solaires Minergie */}
      <circle cx="34" cy="14" r="7" className="fill-nera-white stroke-accent" strokeWidth="1.5" />
      <path d="M34 4V8" className="stroke-accent" strokeWidth="1.75" strokeLinecap="round" />
      <path d="M44 14H40" className="stroke-accent" strokeWidth="1.75" strokeLinecap="round" />
      <path d="M41 7L38 10" className="stroke-accent" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M27 21L30 18" className="stroke-accent" strokeWidth="1.5" strokeLinecap="round" />

      {/* Feuille de développement durable au cœur de l'étoile */}
      <path
        d="M32 16.5C32 13.5 35 12 36 12C36 14.5 35 16.5 32 16.5Z"
        className="fill-accent stroke-accent"
        strokeWidth="1"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/**
 * 3. REG B (Registre suisse des ingénieurs)
 * Compas de précision d'ingénieur HES superposé sur le sceau du Registre suisse REG.
 */
export function RegBQualificationIcon({ className = "size-10" }: IconProps) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Fond de pastille doux */}
      <rect x="4" y="4" width="40" height="40" rx="8" className="fill-nera-green-soft/50" />

      {/* Sceau circulaire du registre d'ingénieurs */}
      <circle
        cx="28"
        cy="28"
        r="13"
        className="stroke-nera-navy/40 fill-nera-white"
        strokeWidth="1.5"
        strokeDasharray="3 2"
      />

      {/* Compas d'architecte / ingénieur HES */}
      {/* Tête de molette du compas */}
      <circle cx="21" cy="9" r="2.5" className="fill-accent stroke-accent" strokeWidth="1" />
      <path d="M21 11.5V14" className="stroke-nera-navy" strokeWidth="1.75" strokeLinecap="round" />

      {/* Molette de réglage micrométrique */}
      <path d="M14 20H28" className="stroke-accent" strokeWidth="1.75" strokeLinecap="round" />

      {/* Branche gauche du compas */}
      <path
        d="M21 14L10 39"
        className="stroke-nera-navy"
        strokeWidth="2"
        strokeLinecap="round"
      />

      {/* Branche droite du compas avec pointe de traçage */}
      <path
        d="M21 14L32 39"
        className="stroke-nera-navy"
        strokeWidth="2"
        strokeLinecap="round"
      />

      {/* Arc de mesure / graduation */}
      <path
        d="M15 29C18 31 24 31 27 29"
        className="stroke-accent"
        strokeWidth="1.5"
        strokeLinecap="round"
      />

      {/* Badge de certification REG B (lettre B symbolisée par un insigne vert) */}
      <rect x="30" y="8" width="11" height="11" rx="3" className="fill-accent stroke-accent" strokeWidth="1" />
      <path d="M33.5 11H36.5C37.5 11 38 11.5 38 12.25C38 13 37.3 13.5 36.5 13.5H33.5V11Z" className="stroke-nera-white" strokeWidth="1.25" />
      <path d="M33.5 13.5H37C38 13.5 38.5 14 38.5 14.75C38.5 15.5 37.8 16 37 16H33.5V13.5Z" className="stroke-nera-white" strokeWidth="1.25" />
    </svg>
  );
}

/**
 * 4. MPQ (Mandataire Professionnellement Qualifié)
 * Équerre d'ingénieur & règle graduée associées au bouclier d'habilitation cantonale.
 */
export function MpqQualificationIcon({ className = "size-10" }: IconProps) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Fond de pastille doux */}
      <rect x="4" y="4" width="40" height="40" rx="8" className="fill-nera-green-soft/50" />

      {/* Équerre technique d'ingénieur à 90° */}
      <path
        d="M9 10V38H37L28 29H18V19L9 10Z"
        className="fill-nera-white stroke-nera-navy"
        strokeWidth="1.75"
        strokeLinejoin="round"
      />

      {/* Graduation de l'équerre / règle */}
      <path d="M12 16H9" className="stroke-nera-navy/70" strokeWidth="1.25" />
      <path d="M12 22H9" className="stroke-nera-navy/70" strokeWidth="1.25" />
      <path d="M12 28H9" className="stroke-nera-navy/70" strokeWidth="1.25" />
      <path d="M12 34H9" className="stroke-nera-navy/70" strokeWidth="1.25" />

      <path d="M16 35V38" className="stroke-nera-navy/70" strokeWidth="1.25" />
      <path d="M22 35V38" className="stroke-nera-navy/70" strokeWidth="1.25" />
      <path d="M28 35V38" className="stroke-nera-navy/70" strokeWidth="1.25" />
      <path d="M34 35V38" className="stroke-nera-navy/70" strokeWidth="1.25" />

      {/* Bouclier d'habilitation / sceau de Mandataire Qualifié MPQ */}
      <path
        d="M34 10C34 10 39 9 41 7V17C41 22 34 26 34 26C34 26 27 22 27 17V7C29 9 34 10 34 10Z"
        className="fill-nera-white stroke-accent"
        strokeWidth="1.75"
        strokeLinejoin="round"
      />

      {/* Sceau de qualification MPQ (coche de validation professionnelle) */}
      <path
        d="M30.5 16L33 18.5L37.5 13.5"
        className="stroke-accent"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Tableau ordonné correspondant exactement aux 4 qualifications du fichier bureau.ts */
export const QualificationIconsList = [
  CecbQualificationIcon,
  MinergieQualificationIcon,
  RegBQualificationIcon,
  MpqQualificationIcon,
];
