import type { MetadataRoute } from "next";
import { seo } from "@/content/seo";
import { footerPrestations } from "@/content/footer";

/** Plan du site : accueil, devis et prestations. Les autres pages s'ajoutent au fur et à mesure. */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: `${seo.siteUrl}/`, lastModified: now, changeFrequency: "monthly", priority: 1 },
    { url: `${seo.siteUrl}/devis`, lastModified: now, changeFrequency: "yearly", priority: 0.6 },
    ...footerPrestations.map((p) => ({ url: `${seo.siteUrl}${p.href}`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.8 })),
  ];
}
