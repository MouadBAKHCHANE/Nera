import { createClient } from "@sanity/client";
import { apiVersion, dataset, projectId } from "./env";

/**
 * Client en lecture seule, sans jeton : le dataset est public, seul le contenu publié est lu.
 * Les lectures du site passent par l'API en direct (`useCdn: false` à l'appel), voir
 * `fetch.ts` et `proxy.ts` : le CDN de Sanity retarde de quelques secondes après publication.
 */
export const client = createClient({ projectId, dataset, apiVersion, useCdn: true, perspective: "published" });
