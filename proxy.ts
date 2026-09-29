import { NextResponse, type NextRequest } from "next/server";
import { client } from "@/lib/sanity/client";
import { REALISATIONS_COUNT_QUERY } from "@/lib/sanity/queries";

/**
 * `/references` répond 404 tant qu'aucune référence n'est publiée dans le Studio Sanity.
 *
 * Pourquoi ici et pas seulement dans la page : `app/loading.tsx` ouvre une frontière de
 * streaming, donc l'en-tête 200 est déjà parti quand la page appelle `notFound()`. Réécrire
 * vers une route inexistante, avant tout rendu, donne un vrai 404.
 *
 * Une requête de comptage par visite de `/references` seulement, le cache de Next n'existant
 * pas dans le proxy. Sur l'API en direct, comme la page : lue sur le CDN, elle retardait de
 * quelques secondes et laissait passer une page déjà vide (testé le 29 septembre).
 * Si Sanity ne répond pas, on laisse passer : la page gère elle-même une liste vide.
 */
export async function proxy(request: NextRequest) {
  try {
    const count = await client.withConfig({ useCdn: false }).fetch<number>(REALISATIONS_COUNT_QUERY);
    if (count > 0) return NextResponse.next();
    return NextResponse.rewrite(new URL("/_page-masquee", request.url), { status: 404 });
  } catch {
    return NextResponse.next();
  }
}

export const config = { matcher: ["/references", "/references/:path*"] };
