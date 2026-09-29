import type { MetadataRoute } from "next";
import { seo } from "@/content/seo";
import { prestationPages, prestationRoute, prestationsIndexRoute } from "@/content/prestation-pages";
import { legalDocs } from "@/content/legal-pages";
import { bureauRoute } from "@/content/bureau";
import { referencesRoute } from "@/content/references";
import { getRealisationsCount } from "@/lib/sanity/realisations";
import { contactRoute } from "@/content/contact";

/**
 * Plan du site : accueil, devis, prestations, bureau, contact, références (dès qu'une référence
 * est publiée dans Sanity) et pages légales. Les autres s'ajoutent au fur et à mesure.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const hasReferences = (await getRealisationsCount()) > 0;
  return [
    { url: `${seo.siteUrl}/`, lastModified: now, changeFrequency: "monthly", priority: 1 },
    { url: `${seo.siteUrl}/devis`, lastModified: now, changeFrequency: "yearly", priority: 0.6 },
    { url: `${seo.siteUrl}${prestationsIndexRoute}`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    ...prestationPages.map((p) => ({
      url: `${seo.siteUrl}${prestationRoute(p.slug)}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    { url: `${seo.siteUrl}${bureauRoute}`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${seo.siteUrl}${contactRoute}`, lastModified: now, changeFrequency: "yearly", priority: 0.7 },
    // `/references` n'existe qu'une fois une référence publiée dans Sanity.
    ...(hasReferences
      ? [{ url: `${seo.siteUrl}${referencesRoute}`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.7 }]
      : []),
    ...legalDocs.map((d) => ({
      url: `${seo.siteUrl}${d.route}`,
      lastModified: new Date(d.updatedIso),
      changeFrequency: "yearly" as const,
      priority: 0.3,
    })),
  ];
}
