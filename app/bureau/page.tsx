import type { Metadata } from "next";
import { BureauPage } from "@/components/bureau/BureauPage";
import { bureau, bureauRoute } from "@/content/bureau";
import { pageMetadata } from "@/lib/seo/metadata";

/** Page « Le bureau » (À propos), texte client (lignes 694 à 772 de `content/source/textes-client.md`). */
export const metadata: Metadata = pageMetadata({
  title: bureau.meta.title,
  description: bureau.meta.description,
  keywords: bureau.keywords,
  route: bureauRoute,
});

export default function Page() {
  return <BureauPage />;
}
