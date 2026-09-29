import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";
import { isValidSignature, SIGNATURE_HEADER_NAME } from "@sanity/webhook";

export const runtime = "nodejs";

/**
 * Appelé par le webhook de Sanity à chaque publication, modification ou suppression.
 * Invalide l'étiquette de cache du type de document concerné (`settings`, `realisation`…).
 *
 * Configuration du webhook dans Sanity (Manage > API > Webhooks) :
 * - URL : https://www.nera-ing.ch/api/revalidate, méthode POST ;
 * - filtre : _type in ["settings", "realisation", "redirect"] ;
 * - projection : {_type} ;
 * - secret : la même valeur que SANITY_REVALIDATE_SECRET dans Vercel.
 *
 * La signature est vérifiée sur le corps brut, avant toute lecture JSON : c'est ce qui empêche
 * n'importe qui de vider le cache du site.
 */
export async function POST(req: Request) {
  const secret = process.env.SANITY_REVALIDATE_SECRET;
  if (!secret) return new NextResponse("SANITY_REVALIDATE_SECRET manquant.", { status: 500 });

  const body = await req.text();
  const signature = req.headers.get(SIGNATURE_HEADER_NAME);
  if (!signature || !(await isValidSignature(body, signature, secret))) {
    return new NextResponse("Signature invalide.", { status: 401 });
  }

  let type: string | undefined;
  try {
    type = (JSON.parse(body) as { _type?: string })._type;
  } catch {
    return new NextResponse("Corps illisible.", { status: 400 });
  }
  if (!type) return new NextResponse("Type de document manquant.", { status: 400 });

  // Le webhook part avant que le CDN de Sanity ne soit à jour : sans ce délai, la page
  // relirait l'ancienne version (règle Sanity « Stale Data After Webhook »).
  await new Promise((resolve) => setTimeout(resolve, 3000));

  // `expire: 0` : la visite suivante relit Sanity tout de suite. Avec le profil « max »
  // conseillé par Next, la première visite après publication montrerait encore l'ancienne
  // version, ce qui déroute qui vient de publier.
  revalidateTag(type, { expire: 0 });
  return NextResponse.json({ revalidated: type });
}
