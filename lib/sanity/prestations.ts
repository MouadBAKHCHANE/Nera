import { cache } from "react";
import type { SanityImageSource } from "@sanity/image-url";
import {
  prestationPageBySlug,
  prestationsIndex as codeIndex,
  type PrestationPage,
  type PrestationsIndex,
} from "@/content/prestation-pages";
import { portableToBlocks, type PrestationPortable } from "@/lib/prestations/portable";
import { sanityFetch } from "./fetch";
import { urlFor } from "./image";

/**
 * Pages prestation et page « Nos prestations », saisies dans le Studio (types « prestationPage »,
 * six documents `prestation-<slug>`, et « prestationsPage »).
 *
 * Le texte est converti vers les blocs du code (`portableToBlocks`) : les gabarits n'ont pas
 * changé. Si Sanity ne répond pas, ou si un document manque, le contenu du code
 * (`content/prestation-pages.ts`, celui de la migration du 30 septembre 2026) est affiché. Une
 * fois NERA à l'œuvre dans le Studio, ce repli n'est plus à jour : il ne sert qu'à ne jamais
 * afficher une page vide.
 */

export const PRESTATION_TAG = "prestationPage";
export const PRESTATIONS_INDEX_TAG = "prestationsPage";

/** Réglages SEO propres à la page, en plus du titre et de la description. */
type PageSeo = { noIndex: boolean; shareImage?: string };

export type PrestationView = PrestationPage & PageSeo;
export type PrestationsIndexView = PrestationsIndex & PageSeo & { image: string; imagePosition?: string };

type SanityImage = (SanityImageSource & { asset?: unknown; hotspot?: { x: number; y: number } }) | null | undefined;
type RawSeo = { title?: string; description?: string; noIndex?: boolean; image?: SanityImage } | null;

type RawPage = {
  shortTitle?: string;
  h1?: string;
  lead?: string[];
  heroCta?: string;
  image?: SanityImage;
  acronyms?: { short?: string; long?: string }[] | null;
  sections?: { anchor?: string; title?: string; body?: PrestationPortable[] }[] | null;
  faq?: { question?: string; answer?: string }[] | null;
  band?: SanityImage;
  closing?: string;
  seo?: RawSeo;
  keywords?: string[] | null;
} | null;

type RawIndex = {
  h1?: string;
  lead?: string[];
  heroCta?: string;
  image?: SanityImage;
  entries?: { route?: string; title?: string; subtitle?: string; body?: PrestationPortable[]; cta?: string }[] | null;
  outro?: { anchor?: string; title?: string; cards?: { title?: string; text?: string; highlight?: boolean }[] }[] | null;
  closingTitle?: string;
  closingText?: string;
  seo?: RawSeo;
  keywords?: string[] | null;
} | null;

const IMAGE = /* groq */ `{ asset, hotspot, crop }`;
const SEO = /* groq */ `seo { title, description, noIndex, image ${IMAGE} }`;

const PAGE_QUERY = /* groq */ `
  *[_id == $id][0] {
    shortTitle, h1, lead, heroCta,
    image ${IMAGE},
    acronyms[] { short, long },
    sections[] { anchor, title, body },
    faq[] { question, answer },
    band ${IMAGE},
    closing,
    ${SEO},
    keywords
  }
`;

const INDEX_QUERY = /* groq */ `
  *[_id == "prestationsPage"][0] {
    h1, lead, heroCta,
    image ${IMAGE},
    entries[] { "route": prestation->route, title, subtitle, body, cta },
    outro[] { anchor, title, cards[] { title, text, highlight } },
    closingTitle, closingText,
    ${SEO},
    keywords
  }
`;

/** URL de la photo : l'optimisation (taille, format) est faite ensuite par `next/image`. */
const imageUrl = (img: SanityImage) => (img?.asset ? urlFor(img).url() : undefined);

/** Point focal choisi dans le Studio, en position CSS (`object-position`). */
const focal = (img: SanityImage) =>
  img?.hotspot ? `${Math.round(img.hotspot.x * 100)}% ${Math.round(img.hotspot.y * 100)}%` : undefined;

/** Image de partage au format attendu par LinkedIn, WhatsApp, Facebook : 1200 × 630. */
const shareImage = (img: SanityImage) =>
  img?.asset ? urlFor(img).width(1200).height(630).fit("crop").auto("format").url() : undefined;

const texts = (list: (string | undefined)[] | null | undefined) =>
  (list ?? []).map((t) => t?.trim() ?? "").filter(Boolean);

function toPage(raw: NonNullable<RawPage>, code: PrestationPage): PrestationView {
  const sections = (raw.sections ?? [])
    .filter((s) => s.anchor && s.title)
    .map((s) => ({ id: s.anchor!, title: s.title!, blocks: portableToBlocks(s.body) }));
  const image = imageUrl(raw.image);
  return {
    slug: code.slug,
    shortTitle: raw.shortTitle || code.shortTitle,
    h1: raw.h1 || code.h1,
    lead: texts(raw.lead).length ? texts(raw.lead) : code.lead,
    heroCta: raw.heroCta || code.heroCta,
    image: image ?? code.image,
    imagePosition: image ? focal(raw.image) : code.imagePosition,
    acronyms: (raw.acronyms ?? [])
      .filter((a) => a.short && a.long)
      .map((a) => ({ short: a.short!, long: a.long! })),
    band: imageUrl(raw.band),
    bandPosition: focal(raw.band),
    meta: {
      title: raw.seo?.title || code.meta.title,
      description: raw.seo?.description || code.meta.description,
    },
    keywords: texts(raw.keywords),
    sections: sections.length ? sections : code.sections,
    closing: raw.closing || code.closing,
    faq: (raw.faq ?? []).filter((f) => f.question && f.answer).map((f) => ({ q: f.question!, a: f.answer! })),
    related: code.related,
    noIndex: raw.seo?.noIndex === true,
    shareImage: shareImage(raw.seo?.image),
  };
}

export const getPrestationPage = cache(async (slug: string): Promise<PrestationView | null> => {
  const code = prestationPageBySlug.get(slug);
  if (!code) return null;
  try {
    const raw = await sanityFetch<RawPage>({
      query: PAGE_QUERY,
      params: { id: `prestation-${slug}` },
      tags: [PRESTATION_TAG],
    });
    return raw?.h1 ? toPage(raw, code) : { ...code, noIndex: false };
  } catch (err) {
    console.error("[sanity] page prestation", slug, err);
    return { ...code, noIndex: false };
  }
});

const codeIndexView = (): PrestationsIndexView => ({
  ...codeIndex,
  image: "/img/process-panneaux-solaires-immeuble.webp",
  noIndex: false,
});

function toIndex(raw: NonNullable<RawIndex>): PrestationsIndexView {
  const code = codeIndexView();
  // Bloc sans page prestation valide : ignoré (lien, icône et illustration dépendent du slug).
  const entries = (raw.entries ?? [])
    .map((e) => ({ ...e, slug: e.route?.split("/")[2] ?? "" }))
    .filter((e) => prestationPageBySlug.has(e.slug) && e.title && e.cta)
    .map((e) => ({
      slug: e.slug,
      title: e.title!,
      subtitle: e.subtitle ?? "",
      blocks: portableToBlocks(e.body),
      cta: e.cta!,
    }));
  const image = imageUrl(raw.image);
  return {
    h1: raw.h1 || code.h1,
    lead: texts(raw.lead).length ? texts(raw.lead) : code.lead,
    heroCta: raw.heroCta || code.heroCta,
    image: image ?? code.image,
    imagePosition: image ? focal(raw.image) : undefined,
    meta: {
      title: raw.seo?.title || code.meta.title,
      description: raw.seo?.description || code.meta.description,
    },
    keywords: texts(raw.keywords),
    entries: entries.length ? entries : code.entries,
    outro: (raw.outro ?? [])
      .filter((o) => o.anchor && o.title)
      .map((o) => ({
        id: o.anchor!,
        title: o.title!,
        cards: (o.cards ?? [])
          .filter((c) => c.title && c.text)
          .map((c) => ({ title: c.title!, text: c.text!, ...(c.highlight ? { highlight: true } : {}) })),
      })),
    closing: { title: raw.closingTitle || code.closing.title, text: raw.closingText ?? "" },
    noIndex: raw.seo?.noIndex === true,
    shareImage: shareImage(raw.seo?.image),
  };
}

export const getPrestationsIndex = cache(async (): Promise<PrestationsIndexView> => {
  try {
    // Étiquette des pages prestation aussi : les blocs reprennent leur adresse.
    const raw = await sanityFetch<RawIndex>({ query: INDEX_QUERY, tags: [PRESTATIONS_INDEX_TAG, PRESTATION_TAG] });
    return raw?.h1 ? toIndex(raw) : codeIndexView();
  } catch (err) {
    console.error("[sanity] page Nos prestations", err);
    return codeIndexView();
  }
});
