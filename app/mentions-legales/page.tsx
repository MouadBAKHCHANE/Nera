import type { Metadata } from "next";
import { LegalPage } from "@/components/legal/LegalPage";
import { mentionsLegales as doc } from "@/content/legal-pages";

/** Mentions légales et conditions d’utilisation, texte client du 3 septembre 2026. Page indexable : pas de noindex. */
export const metadata: Metadata = {
  title: doc.meta.title,
  description: doc.meta.description,
  alternates: { canonical: doc.route },
  openGraph: { title: `${doc.meta.title} | NERA`, description: doc.meta.description, url: doc.route },
};

export default function Page() {
  return <LegalPage doc={doc} />;
}
