import { cache } from "react";
import { fallbackCompany, telHref, type SiteCompany } from "@/lib/site-company";
import { sanityFetch } from "./fetch";
import { SETTINGS_QUERY } from "./queries";

/**
 * Réglages du site saisis dans le Studio (document unique « settings ») : coordonnées,
 * réseaux, chiffres clés, SEO par défaut.
 *
 * Les valeurs de Sanity se posent **par-dessus** celles de `content/prestations.ts` : un champ
 * vidé dans le Studio, ou Sanity injoignable, et le site retombe sur les coordonnées connues au
 * lieu d'afficher un trou. Le fondateur et les certifications restent dans le code.
 */

export type { SiteCompany };

export type SiteStat = { value: number; prefix?: string; suffix?: string; label: string };

export type SiteSettings = {
  company: SiteCompany;
  /** Vide si rien n'est saisi dans le Studio : le composant garde alors ses chiffres par défaut. */
  stats: SiteStat[];
  seo: { title?: string; description?: string };
};

type RawSettings = {
  companyName?: string;
  shortName?: string;
  phone?: string;
  email?: string;
  street?: string;
  zip?: string;
  city?: string;
  canton?: string;
  linkedin?: string;
  facebook?: string;
  instagram?: string;
  googleBusiness?: string;
  stats?: { prefix?: string; value?: number; suffix?: string; label?: string }[];
  defaultSeoTitle?: string;
  defaultSeoDescription?: string;
} | null;

export const SETTINGS_TAG = "settings";

const pick = (value: string | undefined, fallback: string) => (value && value.trim() ? value.trim() : fallback);

function toSettings(raw: RawSettings): SiteSettings {
  const f = fallbackCompany;
  const phone = pick(raw?.phone, f.phone);
  return {
    company: {
      ...f,
      name: pick(raw?.companyName, f.name),
      shortName: pick(raw?.shortName, f.shortName),
      street: pick(raw?.street, f.street),
      zip: pick(raw?.zip, f.zip),
      city: pick(raw?.city, f.city),
      canton: pick(raw?.canton, f.canton),
      phone,
      phoneHref: telHref(phone),
      email: pick(raw?.email, f.email),
      linkedin: pick(raw?.linkedin, f.linkedin),
      socials: {
        facebook: pick(raw?.facebook, f.socials.facebook),
        instagram: pick(raw?.instagram, f.socials.instagram),
      },
      googleBusiness: pick(raw?.googleBusiness, f.googleBusiness),
    },
    stats: (raw?.stats ?? []).flatMap((s) =>
      typeof s.value === "number" && s.label
        ? [
            {
              value: s.value,
              prefix: s.prefix?.trim() || undefined,
              // Le Studio saisit « ans » ; le compteur l'accole au chiffre, d'où l'espace ajoutée.
              suffix: s.suffix?.trim() ? ` ${s.suffix.trim()}` : undefined,
              label: s.label,
            },
          ]
        : [],
    ),
    seo: {
      title: raw?.defaultSeoTitle?.trim() || undefined,
      description: raw?.defaultSeoDescription?.trim() || undefined,
    },
  };
}

/**
 * Réglages du site, une seule lecture par requête (`cache` de React) et mise en cache par Next
 * sous l'étiquette « settings », invalidée par le webhook à chaque publication.
 */
export const getSiteSettings = cache(async (): Promise<SiteSettings> => {
  try {
    return toSettings(await sanityFetch<RawSettings>({ query: SETTINGS_QUERY, tags: [SETTINGS_TAG] }));
  } catch (err) {
    console.error("[sanity] réglages du site", err);
    return toSettings(null);
  }
});
