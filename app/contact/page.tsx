import type { Metadata } from "next";
import { ContactPage } from "@/components/contact/ContactPage";
import { contact, contactRoute } from "@/content/contact";

/** Page « Contact », texte client (lignes 781 à 800 de `content/source/textes-client.md`). */
export const metadata: Metadata = {
  // Titre SEO du client, repris tel quel : pas de suffixe de gabarit.
  title: { absolute: contact.meta.title },
  description: contact.meta.description,
  keywords: [...contact.keywords],
  alternates: { canonical: contactRoute },
  openGraph: { title: contact.meta.title, description: contact.meta.description, url: contactRoute },
};

export default function Page() {
  return <ContactPage />;
}
