import type { QueryParams } from "@sanity/client";
import { client } from "./client";

/**
 * Lecture Sanity mise en cache par Next, et étiquetée par type de document.
 *
 * Quand un document est publié dans le Studio, un webhook Sanity appelle `/api/revalidate`,
 * qui invalide l'étiquette de son type : la page suivante relit Sanity. Les visiteurs ne
 * sollicitent donc jamais Sanity directement.
 * Filet de sécurité d'un jour, au cas où un webhook se perdrait (Sanity relance d'ailleurs un
 * webhook en échec). Il était d'une heure : chaque page était alors reconstruite toutes les
 * heures dès qu'un visiteur ou un robot passait, soit 1 000 à 1 700 écritures ISR par jour
 * sans aucune publication (relevé Vercel du 8 octobre 2026, environ 20 % du forfait gratuit
 * partagé avec les autres sites du compte). Les publications restent visibles en quelques
 * secondes : c'est le webhook qui les rafraîchit, pas ce délai.
 *
 * Lecture sur l'API en direct, pas sur le CDN de Sanity : testé le 29 septembre, le CDN
 * renvoyait encore l'ancienne liste plus de trois secondes après le webhook, et Next mettait
 * cette version périmée en cache pour une heure. Le coût est faible : Next garde le résultat,
 * l'API n'est sollicitée qu'à la publication ou une fois par jour, jamais par visite.
 */
/** Délai de rafraîchissement de secours : un jour. */
const REVALIDATE_SECONDS = 86_400;

export async function sanityFetch<T>({
  query,
  params = {},
  tags,
}: {
  query: string;
  params?: QueryParams;
  tags: string[];
}): Promise<T> {
  return client.withConfig({ useCdn: false }).fetch<T>(query, params, { next: { tags, revalidate: REVALIDATE_SECONDS } });
}
