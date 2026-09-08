import { footerPrestations } from "./footer";

export type NavChild = { label: string; href: string; external?: boolean };
export type NavItem = {
  label: string;
  href: string;
  children?: NavChild[];
};

/** Prestations du méga-menu, avec une ligne de description (dérivée des textes du client). */
export const navPrestations: { label: string; href: string; desc: string }[] = [
  { label: "CECB et CECB Plus", href: "/prestations/audit-cecb", desc: "Certificat énergétique et scénarios de rénovation hiérarchisés." },
  { label: "Physique du bâtiment", href: "/prestations/modelisation-thermique", desc: "Calculs thermiques, enveloppe, labels Minergie, HPE, THPE." },
  { label: "Ingénierie CVC", href: "/prestations/installations-cvc", desc: "Chauffage, ventilation, climatisation et énergies renouvelables." },
  { label: "Autorisations de construire", href: "/prestations/autorisation-de-construire", desc: "Volet énergétique des dossiers et échanges avec les services." },
  { label: "Subventions", href: "/prestations/subventions", desc: "Aides mobilisables, demandes et suivi jusqu'aux justificatifs." },
  { label: "Rénovation énergétique globale", href: "/prestations/renovation-energetique", desc: "Un interlocuteur technique unique, du diagnostic à la réception." },
];

/** Menu principal : Accueil, Prestations (déroulant), Le bureau, Nos références, Contact. */
export const navigation: NavItem[] = [
  { label: "Accueil", href: "/" },
  { label: "Prestations", href: "/prestations", children: footerPrestations },
  { label: "Le bureau", href: "/bureau" },
  { label: "Nos références", href: "/references" },
  { label: "Contact", href: "/contact" },
];

/** Bouton d'action du header : ouvre le formulaire de devis gratuit (pop-up). */
export const contactCta = { label: "Devis gratuit", href: "/devis" };
