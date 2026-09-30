import type { MetadataRoute } from "next";
import { seo } from "@/content/seo";
import { prestationPages, prestationRoute, prestationsIndexRoute } from "@/content/prestation-pages";
import { LEGAL_PAGES } from "@/lib/legal/portable";
import { getLegalPage } from "@/lib/sanity/legal";
import { bureauRoute } from "@/content/bureau";
import { referencesRoute } from "@/content/references";
import { getRealisationsCount } from "@/lib/sanity/realisations";
import { getPrestationPage, getPrestationsIndex } from "@/lib/sanity/prestations";
import { getBureauPage, getContactPage, getHomePage } from "@/lib/sanity/pages";
import { contactRoute } from "@/content/contact";

/**
 * Plan du site : accueil, devis, prestations, bureau, contact, références (dès qu'une référence
 * est publiée dans Sanity) et pages légales. Les autres s'ajoutent au fur et à mesure.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const hasReferences = (await getRealisationsCount()) > 0;
  const legal = await Promise.all(LEGAL_PAGES.map((p) => getLegalPage(p.id)));
  // Pages cochées « Masquer cette page de Google » dans le Studio : hors du plan du site.
  const [index, homePage, bureauPage, contactPage] = await Promise.all([
    getPrestationsIndex(),
    getHomePage(),
    getBureauPage(),
    getContactPage(),
  ]);
  const pages = (await Promise.all(prestationPages.map((p) => getPrestationPage(p.slug)))).filter(
    (p) => p !== null && !p.noIndex,
  );
  return [
    ...(homePage.noIndex ? [] : [{ url: `${seo.siteUrl}/`, lastModified: now, changeFrequency: "monthly" as const, priority: 1 }]),
    { url: `${seo.siteUrl}/devis`, lastModified: now, changeFrequency: "yearly", priority: 0.6 },
    ...(index.noIndex
      ? []
      : [{ url: `${seo.siteUrl}${prestationsIndexRoute}`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.9 }]),
    ...pages.map((p) => ({
      url: `${seo.siteUrl}${prestationRoute(p!.slug)}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...(bureauPage.noIndex
      ? []
      : [{ url: `${seo.siteUrl}${bureauRoute}`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.7 }]),
    ...(contactPage.noIndex
      ? []
      : [{ url: `${seo.siteUrl}${contactRoute}`, lastModified: now, changeFrequency: "yearly" as const, priority: 0.7 }]),
    // `/references` n'existe qu'une fois une référence publiée dans Sanity.
    ...(hasReferences
      ? [{ url: `${seo.siteUrl}${referencesRoute}`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.7 }]
      : []),
    ...legal.map((d) => ({
      url: `${seo.siteUrl}${d.route}`,
      lastModified: new Date(d.updatedIso),
      changeFrequency: "yearly" as const,
      priority: 0.3,
    })),
  ];
}
