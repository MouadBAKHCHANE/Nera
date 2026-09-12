/**
 * Source unique des 7 prestations NERA (ordre du cahier des charges).
 * Consommée par : cartes accueil, sous-menu header, /prestations, /prestations/[slug],
 * sitemap et JSON-LD. Ne pas dupliquer ces données ailleurs.
 */
export type Prestation = {
  slug: string;
  title: string;
  short: string;
  /** Mot-clé SEO principal (title, H1). */
  keyword: string;
  /** Pour qui, en une ligne. */
  audience: string;
  /** Icône Lucide (nom), à mapper dans le composant. */
  icon: "gauge" | "thermometer" | "wind" | "house" | "award" | "file-check" | "coins";
};

export const prestations: Prestation[] = [
  {
    slug: "audit-cecb",
    title: "Audits énergétiques CECB et CECB Plus",
    short: "Diagnostic officiel de la performance énergétique de votre bâtiment, avec scénarios de rénovation chiffrés.",
    keyword: "Audit CECB en Suisse romande",
    audience: "Propriétaires, régies, promoteurs, collectivités",
    icon: "gauge",
  },
  {
    slug: "modelisation-thermique",
    title: "Modélisation thermique des bâtiments",
    short: "Simulation Lesosai de l'enveloppe et des besoins : justificatifs thermiques, bilans, optimisation avant travaux.",
    keyword: "Modélisation thermique Lesosai",
    audience: "Architectes, maîtres d'ouvrage",
    icon: "thermometer",
  },
  {
    slug: "installations-cvc",
    title: "Études et conception d'installations CVC",
    short: "Chauffage, ventilation, climatisation : dimensionnement, choix des systèmes, énergies renouvelables, soumissions.",
    keyword: "Ingénieur CVC en Suisse romande",
    audience: "Architectes, installateurs, promoteurs",
    icon: "wind",
  },
  {
    slug: "renovation-energetique",
    title: "Conception et suivi de rénovations énergétiques",
    short: "De l'étude à la réception : enveloppe, systèmes techniques, appels d'offres et suivi d'exécution.",
    keyword: "Rénovation énergétique en Suisse romande",
    audience: "Propriétaires, régies, fondations",
    icon: "house",
  },
  {
    slug: "labels-minergie-hpe-thpe",
    title: "Labels et standards de performance",
    short: "Minergie, HPE, THPE : conseil, constitution du dossier et accompagnement jusqu'à la certification.",
    keyword: "Certification Minergie en Suisse romande",
    audience: "Architectes, promoteurs",
    icon: "award",
  },
  {
    slug: "autorisation-de-construire",
    title: "Dépôt d'autorisations de construire",
    short: "Volet énergétique et technique des dossiers d'autorisation, conformité réglementaire cantonale.",
    keyword: "Autorisation de construire volet énergétique",
    audience: "Architectes, maîtres d'ouvrage",
    icon: "file-check",
  },
  {
    slug: "subventions",
    title: "Montage et gestion des subventions",
    short: "Programme Bâtiments et aides communales : éligibilité, constitution des demandes, suivi jusqu'au versement.",
    keyword: "Subventions rénovation énergétique Suisse romande",
    audience: "Propriétaires, régies, collectivités",
    icon: "coins",
  },
];

export const cantons = ["Genève", "Vaud", "Valais", "Neuchâtel", "Fribourg"] as const;

export const company = {
  name: "NERA Ingénieurs Conseils Sàrl",
  shortName: "NERA Ingénieurs Conseils",
  street: "Ch. J.-Ph.-de-Sauvage 37",
  zip: "1219",
  city: "Châtelaine",
  canton: "Genève",
  country: "CH",
  phone: "+41 22 313 73 54",
  phoneHref: "tel:+41223137354",
  email: "info@nera-ing.ch",
  linkedin: "https://www.linkedin.com/company/nera-ingenieurs-conseils/",
  socials: {
    facebook: "https://www.facebook.com/profile.php?id=61593837668290&locale=fr_FR",
    instagram: "https://www.instagram.com/nera.ingenieurs.conseils/",
  },
  googleBusiness: "https://share.google/fQDYbp8M5fQtVEoow",
  founded: 2025,
  founder: {
    name: "Akram Draidj",
    role: "Directeur",
    titles: "Ingénieur HES · REG B · MPQ",
    phone: "+41 78 325 99 14",
    phoneHref: "tel:+41783259914",
    email: "a.draidj@nera-ing.ch",
  },
  /** Seules certifications autorisées à l'affichage. Ne rien ajouter sans preuve. */
  credentials: ["Expert CECB certifié", "REG B", "MPQ", "Minergie Partenaire spécialiste"],
} as const;
