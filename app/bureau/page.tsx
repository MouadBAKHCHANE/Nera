import type { Metadata } from "next";
import { BureauPage } from "@/components/bureau/BureauPage";
import { bureauRoute } from "@/content/bureau";
import { getBureauPage } from "@/lib/sanity/pages";
import { pageMetadata } from "@/lib/seo/metadata";

/** Page « Le bureau » (À propos), texte client modifiable dans le Studio Sanity (`lib/sanity/pages.ts`). */
export async function generateMetadata(): Promise<Metadata> {
  const page = await getBureauPage();
  return pageMetadata({
    title: page.meta.title,
    description: page.meta.description,
    keywords: page.keywords,
    route: bureauRoute,
    image: page.shareImage,
    noIndex: page.noIndex,
  });
}

export default async function Page() {
  return <BureauPage bureau={await getBureauPage()} />;
}
