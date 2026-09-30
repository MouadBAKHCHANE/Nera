import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PrestationPage } from "@/components/prestations/PrestationPage";
import { prestationPages, prestationRoute } from "@/content/prestation-pages";
import { getPrestationPage } from "@/lib/sanity/prestations";
import { pageMetadata } from "@/lib/seo/metadata";

/**
 * Les six pages prestation, rendues par un gabarit unique. Contenu saisi dans le Studio Sanity
 * (`lib/sanity/prestations.ts`). Les adresses restent celles du code (`content/footer.ts`) :
 * les documents du Studio sont fixes, on n'en crée ni n'en supprime.
 */
export function generateStaticParams() {
  return prestationPages.map((p) => ({ slug: p.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: PageProps<"/prestations/[slug]">): Promise<Metadata> {
  const page = await getPrestationPage((await params).slug);
  if (!page) return {};
  return pageMetadata({
    title: page.meta.title,
    description: page.meta.description,
    keywords: page.keywords,
    route: prestationRoute(page.slug),
    image: page.shareImage,
    noIndex: page.noIndex,
  });
}

export default async function Page({ params }: PageProps<"/prestations/[slug]">) {
  const page = await getPrestationPage((await params).slug);
  if (!page) notFound();
  return <PrestationPage page={page} />;
}
