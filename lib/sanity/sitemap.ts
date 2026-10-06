import { cache } from "react";
import { sanityFetch } from "./fetch";

/**
 * Date de dernière publication de chaque document du Studio, pour le `lastmod` du plan du site.
 *
 * `_updatedAt` d'un document publié change à chaque publication, et seulement à ce moment-là :
 * Google peut s'y fier pour repasser sur les pages modifiées. Avant, le plan du site donnait
 * l'heure de sa propre lecture, une date fausse que Google finit par ignorer.
 * Clé : identifiant du document ; `realisation` : la plus récente des références.
 * Sanity injoignable : aucune date, plutôt qu'une date inventée.
 */
const QUERY = /* groq */ `{
  "docs": *[_id in ["homePage", "bureauPage", "contactPage", "prestationsPage"] || _id match "prestation-*"]{ _id, _updatedAt },
  "realisation": *[_type == "realisation"] | order(_updatedAt desc)[0]._updatedAt
}`;

type Raw = { docs: { _id: string; _updatedAt: string }[]; realisation: string | null };

export const getPublishedDates = cache(async (): Promise<Map<string, Date>> => {
  try {
    const raw = await sanityFetch<Raw>({
      query: QUERY,
      tags: ["homePage", "bureauPage", "contactPage", "prestationsPage", "prestationPage", "realisation"],
    });
    const dates = new Map(raw.docs.map((d) => [d._id, new Date(d._updatedAt)]));
    if (raw.realisation) dates.set("realisation", new Date(raw.realisation));
    return dates;
  } catch (err) {
    console.error("[sanity] dates du plan du site", err);
    return new Map();
  }
});
