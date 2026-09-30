import { cache } from "react";
import { legalDocs } from "@/content/legal-pages";
import { LEGAL_PAGES, legalDocToSanity, type LegalPageId, type LegalPortable } from "@/lib/legal/portable";
import { sanityFetch } from "./fetch";

/**
 * Pages légales saisies dans le Studio (type « legalPage », trois documents à identifiant fixe).
 *
 * Si Sanity ne répond pas, ou si un document manque, le texte du code (`content/legal-pages.ts`,
 * celui de la migration du 30 septembre 2026) est converti à la volée et affiché par le même
 * rendu. Attention : une fois NERA à l'œuvre dans le Studio, ce repli n'est plus à jour. Il ne
 * sert qu'à ne jamais afficher une page vide.
 */

export type LegalSectionView = { key: string; id: string; num?: number; title: string; body: LegalPortable[] };

export type LegalPageView = {
  route: string;
  shortTitle: string;
  title: string;
  lead?: string;
  updatedIso: string;
  /** « 3 septembre 2026 » : la date telle qu'on l'écrit en Suisse romande. */
  updatedLabel: string;
  seo: { title: string; description: string };
  sections: LegalSectionView[];
};

type RawLegal = {
  route?: string;
  shortTitle?: string;
  title?: string;
  lead?: string;
  updatedAt?: string;
  seo?: { title?: string; description?: string };
  sections?: { _key: string; anchor?: string; number?: number; title?: string; body?: LegalPortable[] }[];
} | null;

export const LEGAL_TAG = "legalPage";

const LEGAL_QUERY = /* groq */ `
  *[_id == $id][0] {
    route,
    shortTitle,
    title,
    lead,
    updatedAt,
    seo { title, description },
    sections[] { _key, anchor, number, title, body }
  }
`;

const dateLabel = (iso: string) =>
  new Intl.DateTimeFormat("fr-CH", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" }).format(
    new Date(`${iso}T00:00:00Z`),
  );

function toView(raw: NonNullable<RawLegal>, route: string): LegalPageView {
  const updatedIso = raw.updatedAt ?? "2026-09-03";
  return {
    route,
    shortTitle: raw.shortTitle ?? raw.title ?? "",
    title: raw.title ?? "",
    lead: raw.lead || undefined,
    updatedIso,
    updatedLabel: dateLabel(updatedIso),
    seo: { title: raw.seo?.title ?? raw.shortTitle ?? "", description: raw.seo?.description ?? "" },
    sections: (raw.sections ?? [])
      .filter((s) => s.title && s.anchor)
      .map((s) => ({ key: s._key, id: s.anchor!, num: s.number, title: s.title!, body: s.body ?? [] })),
  };
}

function fallback(route: string): LegalPageView {
  const doc = legalDocs.find((d) => d.route === route);
  if (!doc) throw new Error(`Page légale inconnue : ${route}`);
  return toView(legalDocToSanity(doc), route);
}

export const getLegalPage = cache(async (id: LegalPageId): Promise<LegalPageView> => {
  const route = LEGAL_PAGES.find((p) => p.id === id)!.route;
  try {
    const raw = await sanityFetch<RawLegal>({ query: LEGAL_QUERY, params: { id }, tags: [LEGAL_TAG] });
    return raw?.sections?.length ? toView(raw, route) : fallback(route);
  } catch (err) {
    console.error("[sanity] page légale", id, err);
    return fallback(route);
  }
});
