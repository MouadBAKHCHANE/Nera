import { company as staticCompany } from "@/content/prestations";

/**
 * Coordonnées du bureau au format du site, sans dépendance à Sanity : importable depuis un
 * composant client sans y embarquer le client Sanity. Les valeurs saisies dans le Studio
 * viennent s'y superposer, voir `lib/sanity/settings.ts`.
 */
export type SiteCompany = {
  name: string;
  shortName: string;
  street: string;
  zip: string;
  city: string;
  canton: string;
  country: string;
  phone: string;
  phoneHref: string;
  email: string;
  linkedin: string;
  socials: { facebook: string; instagram: string };
  googleBusiness: string;
  founded: number;
  founder: typeof staticCompany.founder;
  credentials: readonly string[];
};

/** Lien d'appel à partir du numéro affiché : « +41 22 313 73 54 » donne « tel:+41223137354 ». */
export const telHref = (phone: string) => `tel:${phone.replace(/[^+0-9]/g, "")}`;

/** Itinéraire Google Maps vers l'adresse du bureau. */
export const mapsHrefFor = (c: Pick<SiteCompany, "name" | "street" | "zip" | "city">) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${c.name}, ${c.street}, ${c.zip} ${c.city}`)}`;

/** Les coordonnées du code, au format du site : valeur par défaut et repli en cas de panne. */
export const fallbackCompany: SiteCompany = {
  ...staticCompany,
  socials: { ...staticCompany.socials },
  credentials: [...staticCompany.credentials],
};
