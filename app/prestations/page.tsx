import type { Metadata } from "next";
import { PrestationsIndexPage } from "@/components/prestations/PrestationsIndexPage";
import { prestationsIndexRoute } from "@/content/prestation-pages";
import { getPrestationsIndex } from "@/lib/sanity/prestations";
import { pageMetadata } from "@/lib/seo/metadata";

/** Index « Nos prestations », saisi dans le Studio Sanity (`lib/sanity/prestations.ts`). */
export async function generateMetadata(): Promise<Metadata> {
  const index = await getPrestationsIndex();
  return pageMetadata({
    title: index.meta.title,
    description: index.meta.description,
    keywords: index.keywords,
    route: prestationsIndexRoute,
    image: index.shareImage,
    noIndex: index.noIndex,
  });
}

export default async function Page() {
  return <PrestationsIndexPage index={await getPrestationsIndex()} />;
}
