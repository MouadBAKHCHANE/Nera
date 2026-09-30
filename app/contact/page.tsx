import type { Metadata } from "next";
import { ContactPage } from "@/components/contact/ContactPage";
import { contactRoute } from "@/content/contact";
import { getContactPage } from "@/lib/sanity/pages";
import { pageMetadata } from "@/lib/seo/metadata";

/** Page « Contact », texte client modifiable dans le Studio Sanity (`lib/sanity/pages.ts`). */
export async function generateMetadata(): Promise<Metadata> {
  const page = await getContactPage();
  return pageMetadata({
    title: page.meta.title,
    description: page.meta.description,
    keywords: page.keywords,
    route: contactRoute,
    image: page.shareImage,
    noIndex: page.noIndex,
  });
}

export default async function Page() {
  return <ContactPage contact={await getContactPage()} />;
}
