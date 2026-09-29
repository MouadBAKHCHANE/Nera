import type { QueryParams } from "@sanity/client";
import { client } from "./client";

/**
 * Lecture Sanity mise en cache par Next, et étiquetée par type de document.
 *
 * Quand un document est publié dans le Studio, un webhook Sanity appelle `/api/revalidate`,
 * qui invalide l'étiquette de son type : la page suivante relit Sanity. Les visiteurs ne
 * sollicitent donc jamais Sanity directement.
 * Filet de sécurité d'une heure, au cas où un webhook se perdrait.
 *
 * Lecture sur l'API en direct, pas sur le CDN de Sanity : testé le 29 septembre, le CDN
 * renvoyait encore l'ancienne liste plus de trois secondes après le webhook, et Next mettait
 * cette version périmée en cache pour une heure. Le coût est faible : Next garde le résultat,
 * l'API n'est sollicitée qu'à la publication ou une fois par heure, jamais par visite.
 */
export async function sanityFetch<T>({
  query,
  params = {},
  tags,
}: {
  query: string;
  params?: QueryParams;
  tags: string[];
}): Promise<T> {
  return client.withConfig({ useCdn: false }).fetch<T>(query, params, { next: { tags, revalidate: 3600 } });
}
