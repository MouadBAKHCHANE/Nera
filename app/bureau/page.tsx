import type { Metadata } from "next";
import { BureauPage } from "@/components/bureau/BureauPage";
import { bureau, bureauRoute } from "@/content/bureau";

/** Page « Le bureau » (À propos), texte client (lignes 694 à 772 de `content/source/textes-client.md`). */
export const metadata: Metadata = {
  // Titre SEO du client, repris tel quel : pas de suffixe de gabarit.
  title: { absolute: bureau.meta.title },
  description: bureau.meta.description,
  keywords: [...bureau.keywords],
  alternates: { canonical: bureauRoute },
  openGraph: { title: bureau.meta.title, description: bureau.meta.description, url: bureauRoute },
};

export default function Page() {
  return <BureauPage />;
}
