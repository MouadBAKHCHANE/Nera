import { NextResponse, type NextRequest } from "next/server";
import { referencesVisible } from "@/content/references";

/**
 * Masque `/references` tant que le client n'a pas fourni ses projets (voir `referencesVisible`).
 *
 * Pourquoi ici et pas seulement dans la page : `app/loading.tsx` ouvre une frontière de
 * streaming, donc l'en-tête 200 est déjà parti quand la page appelle `notFound()`. Le visiteur
 * voyait bien le contenu 404, mais avec un statut 200 et le titre de la page masquée.
 * Réécrire vers une route inexistante, avant tout rendu, donne un vrai 404.
 *
 * Quand les projets arrivent, `referencesVisible` passe à vrai et ce proxy laisse tout passer.
 * On pourra alors le supprimer.
 */
export function proxy(request: NextRequest) {
  if (referencesVisible) return NextResponse.next();
  return NextResponse.rewrite(new URL("/_page-masquee", request.url), { status: 404 });
}

export const config = { matcher: ["/references", "/references/:path*"] };
