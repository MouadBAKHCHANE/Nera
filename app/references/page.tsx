import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ReferencesPage } from "@/components/references/ReferencesPage";
import { references, referencesRoute } from "@/content/references";
import { getRealisations } from "@/lib/sanity/realisations";
import { pageMetadata } from "@/lib/seo/metadata";

/**
 * Page « Nos références ». Textes fixes du client (lignes 686 à 693 de
 * `content/source/textes-client.md`) ; les projets viennent du Studio Sanity.
 */
export const metadata: Metadata = pageMetadata({
  title: references.meta.title,
  description: references.meta.description,
  route: referencesRoute,
});

export default async function Page() {
  const items = await getRealisations();
  // Aucun projet publié : la page n'existe pas. Le vrai statut 404 vient de `proxy.ts` ;
  // ceci n'est qu'un filet, car servi depuis la page le 404 partirait avec un statut 200.
  if (items.length === 0) notFound();
  return <ReferencesPage items={items} />;
}
