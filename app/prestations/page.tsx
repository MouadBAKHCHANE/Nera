import type { Metadata } from "next";
import { PrestationsIndexPage } from "@/components/prestations/PrestationsIndexPage";
import { prestationsIndex, prestationsIndexRoute } from "@/content/prestation-pages";

/** Index « Nos prestations », texte client (lignes 92 à 175 de `content/source/textes-client.md`). */
export const metadata: Metadata = {
  // Titre SEO du client, repris tel quel : pas de suffixe de gabarit.
  title: { absolute: prestationsIndex.meta.title },
  description: prestationsIndex.meta.description,
  keywords: prestationsIndex.keywords,
  alternates: { canonical: prestationsIndexRoute },
  openGraph: {
    title: prestationsIndex.meta.title,
    description: prestationsIndex.meta.description,
    url: prestationsIndexRoute,
  },
};

export default function Page() {
  return <PrestationsIndexPage />;
}
