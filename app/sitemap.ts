import type { MetadataRoute } from "next";
import { seo } from "@/content/seo";
import { prestationPages, prestationRoute, prestationsIndexRoute } from "@/content/prestation-pages";
import { legalDocs } from "@/content/legal-pages";

/** Plan du site : accueil, devis, prestations et pages légales. Les autres s'ajoutent au fur et à mesure. */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
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
    ...legalDocs.map((d) => ({
      url: `${seo.siteUrl}${d.route}`,
      lastModified: new Date(d.updatedIso),
      changeFrequency: "yearly" as const,
      priority: 0.3,
    })),
  ];
}
