/**
 * Conversion des pages légales du format du code (`content/legal-pages.ts`) vers le texte riche
 * de Sanity (Portable Text).
 *
 * Deux usages, une seule fonction :
 * - la migration initiale vers Sanity (`studio/scripts/import-legal.ts`) ;
 * - le repli du site si Sanity ne répond pas : le texte du code est converti à la volée et
 *   affiché par le même rendu que le contenu de Sanity.
 *
 * Aucun import avec l'alias `@/` : le script du Studio importe ce fichier par chemin relatif.
 * Chaque mot est conservé : seul le balisage `[libellé](cible)` devient une annotation de lien.
 */

import type { LegalBlock, LegalDoc } from "../../content/legal-pages";

export type PtSpan = { _type: "span"; _key: string; text: string; marks: string[] };
export type PtLink = { _type: "link"; _key: string; href: string };
export type PtBlock = {
  _type: "block";
  _key: string;
  style: "normal" | "lines";
  markDefs: PtLink[];
  children: PtSpan[];
  listItem?: "bullet";
  level?: number;
};
export type PtTable = { _type: "legalTable"; _key: string; head: string[]; rows: { _type: "row"; _key: string; cells: string[] }[] };
export type PtNote = { _type: "legalNote"; _key: string; title: string; body: PtBlock[] };
export type PtConsent = { _type: "consentReminder"; _key: string; label: string };
export type LegalPortable = PtBlock | PtTable | PtNote | PtConsent;

export type LegalSectionData = {
  _key: string;
  _type: "legalSection";
  anchor: string;
  number?: number;
  title: string;
  body: LegalPortable[];
};

/** Forme d'une page légale dans Sanity, hors champs système. */
export type LegalPageData = {
  route: string;
  shortTitle: string;
  title: string;
  lead?: string;
  updatedAt: string;
  seo: { _type: "seo"; title: string; description: string };
  sections: LegalSectionData[];
};

const LINK = /\[([^\]]+)\]\(([^)]+)\)/g;

/** Clés stables et lisibles : même entrée, mêmes clés, d'une conversion à l'autre. */
function keyGen(prefix: string) {
  let n = 0;
  return () => `${prefix}${(n++).toString(36)}`;
}

/** Découpe une ligne balisée en fragments de texte et liens. */
function spansOf(text: string, key: () => string, markDefs: PtLink[]): PtSpan[] {
  const spans: PtSpan[] = [];
  let last = 0;
  let m: RegExpExecArray | null;
  LINK.lastIndex = 0;
  while ((m = LINK.exec(text)) !== null) {
    if (m.index > last) spans.push({ _type: "span", _key: key(), text: text.slice(last, m.index), marks: [] });
    const link: PtLink = { _type: "link", _key: key(), href: m[2] };
    markDefs.push(link);
    spans.push({ _type: "span", _key: key(), text: m[1], marks: [link._key] });
    last = m.index + m[0].length;
  }
  if (last < text.length) spans.push({ _type: "span", _key: key(), text: text.slice(last), marks: [] });
  return spans.length ? spans : [{ _type: "span", _key: key(), text: "", marks: [] }];
}

function paragraph(text: string, key: () => string, extra: Partial<PtBlock> = {}): PtBlock {
  const markDefs: PtLink[] = [];
  return { _type: "block", _key: key(), style: "normal", markDefs, children: spansOf(text, key, markDefs), ...extra };
}

/** Bloc d'adresse : une seule entrée de texte riche, lignes séparées par des retours à la ligne. */
function linesBlock(lines: string[], key: () => string): PtBlock {
  const markDefs: PtLink[] = [];
  const children: PtSpan[] = [];
  lines.forEach((line, i) => {
    if (i > 0) children.push({ _type: "span", _key: key(), text: "\n", marks: [] });
    children.push(...spansOf(line, key, markDefs));
  });
  return { _type: "block", _key: key(), style: "lines", markDefs, children };
}

function blockToPortable(b: LegalBlock, key: () => string): LegalPortable[] {
  switch (b.t) {
    case "p":
      return [paragraph(b.text, key)];
    case "lines":
      return [linesBlock(b.lines, key)];
    case "ul":
      return b.items.map((item) => paragraph(item, key, { listItem: "bullet", level: 1 }));
    case "table":
      return [
        {
          _type: "legalTable",
          _key: key(),
          head: b.head,
          rows: b.rows.map((cells) => ({ _type: "row", _key: key(), cells })),
        },
      ];
    case "note":
      return [{ _type: "legalNote", _key: key(), title: b.title, body: b.body.map((t) => paragraph(t, key)) }];
    case "consent":
      return [{ _type: "consentReminder", _key: key(), label: "Rappel du choix de cookies et bouton « Gérer mes cookies »" }];
  }
}

export function legalDocToSanity(doc: LegalDoc): LegalPageData {
  return {
    route: doc.route,
    shortTitle: doc.shortTitle,
    title: doc.title,
    ...(doc.lead ? { lead: doc.lead } : {}),
    updatedAt: doc.updatedIso,
    seo: { _type: "seo", title: doc.meta.title, description: doc.meta.description },
    sections: doc.sections.map((s) => {
      const key = keyGen(`${s.id}-`);
      return {
        _key: s.id,
        _type: "legalSection",
        anchor: s.id,
        ...(s.num ? { number: s.num } : {}),
        title: s.title,
        body: s.blocks.flatMap((b) => blockToPortable(b, key)),
      };
    }),
  };
}

/** Les trois pages légales : identifiant du document Sanity, adresse sur le site. */
export const LEGAL_PAGES = [
  { id: "legal-mentions-legales", route: "/mentions-legales" },
  { id: "legal-confidentialite", route: "/confidentialite" },
  { id: "legal-cookies", route: "/cookies" },
] as const;

export type LegalPageId = (typeof LEGAL_PAGES)[number]["id"];
