import type { PrestationBlock } from "../../content/prestation-pages";

/**
 * Passage entre les blocs des pages prestation (`content/prestation-pages.ts`) et le texte riche
 * du Studio (type « prestationBody »), dans les deux sens :
 * - `blocksToPortable` : migration vers Sanity (`studio/scripts/import-prestations.ts`) ;
 * - `portableToBlocks` : lecture sur le site, pour garder le rendu de `Blocks.tsx` inchangé.
 *
 * Correspondance : paragraphe ↔ bloc « normal », liste ↔ blocs à puce consécutifs, frise et
 * cartes ↔ objets `steps` et `cards`, sous-section ↔ bloc « h3 » suivi de ses blocs, jusqu'au
 * sous-titre suivant ou la fin de la section.
 *
 * Sans dépendance : importé aussi par le script de migration du Studio.
 */

type Span = { _type: "span"; _key: string; text: string; marks: string[] };
export type PortableTextBlock = {
  _type: "block";
  _key: string;
  style: "normal" | "h3";
  listItem?: "bullet";
  level?: number;
  markDefs: never[];
  children: Span[];
};
type TitledItem = { _type: "titledItem"; _key: string; title: string; text: string };
export type PrestationPortable =
  | PortableTextBlock
  | { _type: "steps"; _key: string; items: TitledItem[] }
  | { _type: "cards"; _key: string; items: TitledItem[] };

/** Clés stables, pour qu'une migration relancée ne produise pas de différence inutile. */
function keyMaker(prefix: string) {
  let n = 0;
  return () => `${prefix}${(n++).toString(36)}`;
}

export function blocksToPortable(blocks: PrestationBlock[], prefix = "b"): PrestationPortable[] {
  const key = keyMaker(prefix);
  const text = (t: string, style: "normal" | "h3" = "normal", bullet = false): PortableTextBlock => ({
    _type: "block",
    _key: key(),
    style,
    ...(bullet ? { listItem: "bullet" as const, level: 1 } : {}),
    markDefs: [],
    children: [{ _type: "span", _key: key(), text: t, marks: [] }],
  });
  const items = (list: { title: string; text: string }[]): TitledItem[] =>
    list.map((i) => ({ _type: "titledItem", _key: key(), title: i.title, text: i.text }));

  const out: PrestationPortable[] = [];
  const push = (bs: PrestationBlock[]) => {
    for (const b of bs) {
      switch (b.t) {
        case "p":
          out.push(text(b.text));
          break;
        case "ul":
          b.items.forEach((i) => out.push(text(i, "normal", true)));
          break;
        case "steps":
          out.push({ _type: "steps", _key: key(), items: items(b.items) });
          break;
        case "cards":
          out.push({ _type: "cards", _key: key(), items: items(b.items) });
          break;
        case "sub":
          out.push(text(b.title, "h3"));
          push(b.blocks);
          break;
      }
    }
  };
  push(blocks);
  return out;
}

export function portableToBlocks(nodes: PrestationPortable[] | null | undefined): PrestationBlock[] {
  const top: PrestationBlock[] = [];
  let target = top;
  for (const n of nodes ?? []) {
    if (n._type === "steps" || n._type === "cards") {
      const list = (n.items ?? []).filter((i) => i.title && i.text).map((i) => ({ title: i.title, text: i.text }));
      if (list.length) target.push({ t: n._type, items: list });
      continue;
    }
    if (n._type !== "block") continue;
    const t = (n.children ?? []).map((c) => c.text ?? "").join("").trim();
    // Paragraphe vide : un retour à la ligne de trop dans le Studio, sans rien à afficher.
    if (!t) continue;
    if (n.style === "h3") {
      const sub: PrestationBlock = { t: "sub", title: t, blocks: [] };
      top.push(sub);
      target = sub.blocks;
    } else if (n.listItem) {
      const last = target[target.length - 1];
      if (last?.t === "ul") last.items.push(t);
      else target.push({ t: "ul", items: [t] });
    } else {
      target.push({ t: "p", text: t });
    }
  }
  return top;
}
