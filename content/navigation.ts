import { prestations } from "./prestations";

export type NavItem = {
  label: string;
  href: string;
  children?: { label: string; href: string }[];
};

export const navigation: NavItem[] = [
  { label: "Le bureau", href: "/bureau" },
  {
    label: "Prestations",
    href: "/prestations",
    children: prestations.map((p) => ({ label: p.title, href: `/prestations/${p.slug}` })),
  },
  { label: "Références", href: "/references" },
  { label: "Actualités", href: "/actualites" },
];

export const contactCta = { label: "Nous contacter", href: "/contact" };
