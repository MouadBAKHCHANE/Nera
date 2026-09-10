import type { Metadata } from "next";
import { ReferencesPage } from "@/components/references/ReferencesPage";
import { references, referencesRoute } from "@/content/references";

/**
 * Page « Nos références », texte client (lignes 686 à 693 de `content/source/textes-client.md`).
 * Tant que le client n'a pas fourni ses projets (`references.projects` vide), la page reste
 * accessible mais n'est pas indexée : une page sans contenu nuirait au référencement.
 */
const hasProjects = references.projects.length > 0;

export const metadata: Metadata = {
  // Titre SEO du client, repris tel quel : pas de suffixe de gabarit.
  title: { absolute: references.meta.title },
  description: references.meta.description,
  alternates: { canonical: referencesRoute },
  openGraph: { title: references.meta.title, description: references.meta.description, url: referencesRoute },
  robots: hasProjects ? undefined : { index: false, follow: true },
};

export default function Page() {
  return <ReferencesPage />;
}
