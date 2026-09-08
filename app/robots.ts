import type { MetadataRoute } from "next";
import { seo } from "@/content/seo";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/home-2", "/api/"] },
    sitemap: `${seo.siteUrl}/sitemap.xml`,
  };
}
