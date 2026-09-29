import { sanityFetch } from "./fetch";
import { REALISATIONS_COUNT_QUERY, REALISATIONS_QUERY } from "./queries";

export type SanityImage = {
  asset?: { _id: string; url: string; metadata?: { lqip?: string; dimensions?: { width: number; height: number } } };
  alt?: string;
  hotspot?: unknown;
  crop?: unknown;
};

export type Realisation = {
  _id: string;
  title: string;
  place: string;
  year?: number;
  prestations?: string[];
  text: string;
  image?: SanityImage;
};

/** Étiquette de cache : le webhook de Sanity l'invalide à chaque publication d'une référence. */
export const REALISATION_TAG = "realisation";

/**
 * Les références publiées. En cas d'erreur de Sanity, une liste vide plutôt qu'une page en
 * erreur : la page Références reste simplement masquée, le reste du site n'est pas touché.
 */
export async function getRealisations(): Promise<Realisation[]> {
  try {
    return (await sanityFetch<Realisation[]>({ query: REALISATIONS_QUERY, tags: [REALISATION_TAG] })) ?? [];
  } catch (err) {
    console.error("[sanity] références", err);
    return [];
  }
}

/** Nombre de références publiées : la page et ses liens n'existent que s'il y en a au moins une. */
export async function getRealisationsCount(): Promise<number> {
  try {
    return (await sanityFetch<number>({ query: REALISATIONS_COUNT_QUERY, tags: [REALISATION_TAG] })) ?? 0;
  } catch (err) {
    console.error("[sanity] nombre de références", err);
    return 0;
  }
}
