import { footerPrestations } from "./footer";

export type NavChild = { label: string; href: string; external?: boolean };
export type NavItem = {
  label: string;
  href: string;
  children?: NavChild[];
};

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
