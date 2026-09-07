import { footerPrestations, footerBureau } from "./footer";

export type NavChild = { label: string; href: string; external?: boolean };
export type NavItem = {
  label: string;
  href: string;
  children?: NavChild[];
};

/** Menu principal, identique au pied de page : Prestations, Le bureau (déroulants), Actualités. */
export const navigation: NavItem[] = [
  { label: "Prestations", href: "/prestations", children: footerPrestations },
  { label: "Le bureau", href: "/bureau", children: footerBureau },
  { label: "Actualités", href: "/actualites" },
];

export const contactCta = { label: "Nous contacter", href: "/contact" };
