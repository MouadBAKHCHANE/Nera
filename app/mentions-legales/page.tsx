import type { Metadata } from "next";
import { LegalPage } from "@/components/legal/LegalPage";
import { getLegalPage } from "@/lib/sanity/legal";

/** Mentions légales et conditions d’utilisation, texte client du 3 septembre 2026, modifiable dans le Studio Sanity. Page indexable : pas de noindex. */
export async function generateMetadata(): Promise<Metadata> {
  const page = await getLegalPage("legal-mentions-legales");
  return {
    title: page.seo.title,
    description: page.seo.description,
    alternates: { canonical: page.route },
    openGraph: { title: `${page.seo.title} | NERA`, description: page.seo.description, url: page.route },
  };
}

export default async function Page() {
  return <LegalPage page={await getLegalPage("legal-mentions-legales")} />;
}
