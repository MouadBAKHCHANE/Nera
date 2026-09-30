import type { Metadata } from "next";
import { ContactPage } from "@/components/contact/ContactPage";
import { contact, contactRoute } from "@/content/contact";
import { pageMetadata } from "@/lib/seo/metadata";

/** Page « Contact », texte client (lignes 781 à 800 de `content/source/textes-client.md`). */
export const metadata: Metadata = pageMetadata({
  title: contact.meta.title,
  description: contact.meta.description,
  keywords: contact.keywords,
  route: contactRoute,
});

export default function Page() {
  return <ContactPage />;
}
