import { company } from "./prestations";

/** Contenu du pied de page, partagé par les deux variantes d'accueil. */
export const footerTagline =
  "Bureau d'ingénieurs en énergétique et physique du bâtiment, basé à Genève et actif en Suisse romande.";

export const footerPrestations = [
  { label: "CECB et CECB Plus", href: "/prestations/audit-cecb" },
  { label: "Physique du bâtiment", href: "/prestations/modelisation-thermique" },
  { label: "Ingénierie CVC", href: "/prestations/installations-cvc" },
  { label: "Autorisations de construire", href: "/prestations/autorisation-de-construire" },
  { label: "Subventions", href: "/prestations/subventions" },
  { label: "Rénovation énergétique globale", href: "/prestations/renovation-energetique" },
];

export const footerBureau = [
  { label: "À propos", href: "/bureau" },
  { label: "Nos références", href: "/references" },
  { label: "Contact", href: "/contact" },
  { label: "LinkedIn", href: company.linkedin, external: true },
];

export const footerLegal = [
  { label: "Mentions légales", href: "/mentions-legales" },
  { label: "Politique de confidentialité", href: "/confidentialite" },
  { label: "Politique relative aux cookies", href: "/cookies" },
];

/** Lien Google Maps vers l'adresse (recherche par adresse, sans clé API). */
export const mapsHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  `${company.name}, ${company.street}, ${company.zip} ${company.city}`,
)}`;
