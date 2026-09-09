import type { MetadataRoute } from "next";
import { seo } from "@/content/seo";
import { footerPrestations } from "@/content/footer";
import { legalDocs } from "@/content/legal-pages";

/** Plan du site : accueil, devis, prestations et pages légales. Les autres s'ajoutent au fur et à mesure. */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: `${seo.siteUrl}/`, lastModified: now, changeFrequency: "monthly", priority: 1 },
    { url: `${seo.siteUrl}/devis`, lastModified: now, changeFrequency: "yearly", priority: 0.6 },
    ...footerPrestations.map((p) => ({ url: `${seo.siteUrl}${p.href}`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.8 })),
    ...legalDocs.map((d) => ({
      url: `${seo.siteUrl}${d.route}`,
      lastModified: new Date(d.updatedIso),
      changeFrequency: "yearly" as const,
      priority: 0.3,
    })),
  ];
}
