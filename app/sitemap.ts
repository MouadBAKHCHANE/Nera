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
import { getPublishedDates } from "@/lib/sanity/sitemap";
import { contactRoute } from "@/content/contact";

type Entry = MetadataRoute.Sitemap[number];

/**
 * Plan du site : accueil, devis, prestations, bureau, contact, références (dès qu'une référence
 * est publiée dans Sanity) et pages légales. Les pages cochées « Masquer cette page de Google »
 * dans le Studio en sont exclues.
 *
 * `lastmod` : date de la dernière publication du document dans le Studio (`getPublishedDates`),
 * et pour les pages légales leur date de mise à jour affichée. `/devis`, dont le texte est dans
 * le code, n'en a pas : une date absente vaut mieux qu'une date fausse.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [hasReferences, legal, index, homePage, bureauPage, contactPage, dates] = await Promise.all([
    getRealisationsCount().then((n) => n > 0),
    Promise.all(LEGAL_PAGES.map((p) => getLegalPage(p.id))),
    getPrestationsIndex(),
    getHomePage(),
    getBureauPage(),
    getContactPage(),
    getPublishedDates(),
  ]);
  const pages = (await Promise.all(prestationPages.map((p) => getPrestationPage(p.slug)))).filter(
    (p) => p !== null && !p.noIndex,
  );

  const entry = (
    path: string,
    docId: string | null,
    changeFrequency: Entry["changeFrequency"],
    priority: number,
  ): Entry => {
    const lastModified = docId ? dates.get(docId) : undefined;
    return { url: `${seo.siteUrl}${path}`, ...(lastModified ? { lastModified } : {}), changeFrequency, priority };
  };

  return [
    ...(homePage.noIndex ? [] : [entry("/", "homePage", "monthly", 1)]),
    entry("/devis", null, "yearly", 0.6),
    ...(index.noIndex ? [] : [entry(prestationsIndexRoute, "prestationsPage", "monthly", 0.9)]),
    ...pages.map((p) => entry(prestationRoute(p!.slug), `prestation-${p!.slug}`, "monthly", 0.8)),
    ...(bureauPage.noIndex ? [] : [entry(bureauRoute, "bureauPage", "monthly", 0.7)]),
    ...(contactPage.noIndex ? [] : [entry(contactRoute, "contactPage", "yearly", 0.7)]),
    // `/references` n'existe qu'une fois une référence publiée dans Sanity.
    ...(hasReferences ? [entry(referencesRoute, "realisation", "monthly", 0.7)] : []),
    ...legal.map((d) => ({
      url: `${seo.siteUrl}${d.route}`,
      lastModified: new Date(d.updatedIso),
      changeFrequency: "yearly" as const,
      priority: 0.3,
    })),
  ];
}
