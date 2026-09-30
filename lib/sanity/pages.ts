import { cache } from "react";
import type { SanityImageSource } from "@sanity/image-url";
import { bureau as codeBureau, type BureauContent } from "@/content/bureau";
import { contact as codeContact, type ContactContent } from "@/content/contact";
import { home as codeHome, type HomeContent } from "@/content/home";
import { seo as codeSeo } from "@/content/seo";
import { sanityFetch } from "./fetch";
import { urlFor } from "./image";

/**
 * Accueil, bureau et contact, saisis dans le Studio (documents uniques « homePage »,
 * « bureauPage », « contactPage »).
 *
 * Le document du Studio a la même forme que le contenu du code (`content/home.ts`,
 * `content/bureau.ts`, `content/contact.ts`) : `fill` le reprend champ par champ et comble tout
 * champ vide par la valeur du code. Sanity en panne ou document absent : contenu du code en
 * entier. Une fois NERA à l'œuvre dans le Studio, ce repli n'est plus à jour ; il ne sert qu'à ne
 * jamais afficher une page vide. Les ancres (`id`) viennent toujours du code.
 */

/** Réglages SEO propres à la page. */
export type PageSeo = {
  meta: { title: string; description: string };
  keywords: readonly string[];
  noIndex: boolean;
  shareImage?: string;
};

type Raw = Record<string, unknown>;
type SanityImage = SanityImageSource & { asset?: unknown; hotspot?: { x: number; y: number } };

const isImage = (v: unknown): v is SanityImage => !!v && typeof v === "object" && "asset" in v;

/**
 * Photos du Studio → URL (l'optimisation est faite par `next/image`) et point focal en position
 * CSS, rangé à côté sous `<champ>Position`, comme dans le contenu du code.
 */
function images(v: unknown): unknown {
  if (Array.isArray(v)) return v.map(images);
  if (!v || typeof v !== "object") return v;
  const out: Raw = {};
  for (const [k, val] of Object.entries(v)) {
    if (isImage(val)) {
      out[k] = urlFor(val).url();
      if (val.hotspot) out[`${k}Position`] = `${Math.round(val.hotspot.x * 100)}% ${Math.round(val.hotspot.y * 100)}%`;
    } else {
      out[k] = images(val);
    }
  }
  return out;
}

/**
 * Valeur du Studio à la forme du code, champ vide comblé par le code. Une liste vide du Studio
 * reprend celle du code ; les éléments ajoutés dans le Studio suivent le modèle du premier.
 */
function fill<T>(code: T, raw: unknown): T {
  if (typeof code === "string") return (typeof raw === "string" && raw.trim() ? raw : code) as T;
  if (Array.isArray(code)) {
    if (!Array.isArray(raw) || raw.length === 0) return code;
    return raw.map((r, i) => fill(code[i] ?? code[0], r)) as T;
  }
  if (code && typeof code === "object") {
    const r = (raw && typeof raw === "object" ? raw : {}) as Raw;
    const out: Raw = {};
    for (const [k, v] of Object.entries(code)) {
      // Mot mis en avant vidé dans le Studio : aucune mise en avant, sans repli sur le code.
      out[k] = k === "accent" && raw && typeof raw === "object" ? ((r[k] as string | undefined) ?? "") : fill(v, r[k]);
    }
    // Point focal des photos : absent du code quand la photo est centrée.
    for (const k of Object.keys(r)) if (k.endsWith("Position") && typeof r[k] === "string") out[k] = r[k];
    return out as T;
  }
  return (raw ?? code) as T;
}

function pageSeo(raw: Raw | null, code: { title: string; description: string }, keywords: readonly string[]): PageSeo {
  const seo = (raw?.seo ?? {}) as { title?: string; description?: string; noIndex?: boolean; image?: unknown };
  const kw = Array.isArray(raw?.keywords) ? (raw.keywords as string[]).filter(Boolean) : [];
  return {
    meta: { title: seo.title || code.title, description: seo.description || code.description },
    keywords: raw ? kw : keywords,
    noIndex: seo.noIndex === true,
    shareImage: isImage(seo.image) ? urlFor(seo.image).width(1200).height(630).fit("crop").auto("format").url() : undefined,
  };
}

async function read(id: string): Promise<Raw | null> {
  try {
    return await sanityFetch<Raw | null>({ query: `*[_id == $id][0]`, params: { id }, tags: [id] });
  } catch (err) {
    console.error("[sanity] page", id, err);
    return null;
  }
}

export const getHomePage = cache(async (): Promise<HomeContent & PageSeo> => {
  const raw = await read("homePage");
  let content = codeHome;
  if (raw) {
    const r = images(raw) as Raw;
    // Cartes : le lien vient de la page prestation choisie (`prestation-<slug>`).
    const services = (r.services ?? {}) as Raw;
    if (Array.isArray(services.cards)) {
      services.cards = (services.cards as Raw[]).map((c) => ({
        ...c,
        slug: ((c.prestation as { _ref?: string } | undefined)?._ref ?? "").replace(/^prestation-/, ""),
      }));
    }
    content = fill(codeHome, r);
  }
  return { ...content, ...pageSeo(raw, codeSeo, codeSeo.keywords) };
});

export const getBureauPage = cache(async (): Promise<BureauContent & PageSeo> => {
  const raw = await read("bureauPage");
  const content = raw ? fill<BureauContent>(codeBureau, images(raw)) : codeBureau;
  return { ...content, ...pageSeo(raw, codeBureau.meta, codeBureau.keywords) };
});

export const getContactPage = cache(async (): Promise<ContactContent & PageSeo> => {
  const raw = await read("contactPage");
  let content: ContactContent = codeContact;
  if (raw) {
    // Titres rangés à plat dans le Studio ; le code les range par bloc.
    content = fill<ContactContent>(codeContact, {
      h1: raw.h1,
      lead: raw.lead,
      form: { title: raw.formTitle, text: raw.formText },
      coordonnees: { title: raw.coordinatesTitle },
    });
  }
  return { ...content, ...pageSeo(raw, codeContact.meta, codeContact.keywords) };
});
