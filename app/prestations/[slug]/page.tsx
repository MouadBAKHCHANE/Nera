import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PrestationPage } from "@/components/prestations/PrestationPage";
import { prestationPageBySlug, prestationPages, prestationRoute } from "@/content/prestation-pages";

/**
 * Les six pages prestation, rendues par un gabarit unique à partir de
 * `content/prestation-pages.ts`. Les slugs sont ceux de `content/footer.ts`.
 */
export function generateStaticParams() {
  return prestationPages.map((p) => ({ slug: p.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const page = prestationPageBySlug.get(slug);
  if (!page) return {};

  const route = prestationRoute(page.slug);
  return {
    // Titre SEO du client, repris tel quel : pas de suffixe de gabarit.
    title: { absolute: page.meta.title },
    description: page.meta.description,
    keywords: page.keywords,
    alternates: { canonical: route },
    openGraph: { title: page.meta.title, description: page.meta.description, url: route },
  };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = prestationPageBySlug.get(slug);
  if (!page) notFound();
  return <PrestationPage page={page} />;
}
