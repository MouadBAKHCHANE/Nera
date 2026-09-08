import { company, cantons } from "@/content/prestations";
import { footerPrestations } from "@/content/footer";
import { seo } from "@/content/seo";

/**
 * Données structurées ProfessionalService pour l'organisation (adresse, contact,
 * fondateur, zone desservie, prestations). Injectées une fois dans le layout racine.
 */
export function JsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${seo.siteUrl}/#organization`,
    name: company.name,
    alternateName: "NERA",
    url: seo.siteUrl,
    logo: `${seo.siteUrl}/logos/nera-horizontal-navy-green.svg`,
    image: `${seo.siteUrl}/opengraph-image`,
    description: seo.description,
    foundingDate: String(company.founded),
    founder: { "@type": "Person", name: company.founder.name, jobTitle: company.founder.role },
    telephone: company.phone,
    email: company.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: company.street,
      postalCode: company.zip,
      addressLocality: company.city,
      addressRegion: company.canton,
      addressCountry: company.country,
    },
    areaServed: cantons.map((c) => ({ "@type": "AdministrativeArea", name: c })),
    sameAs: [company.linkedin],
    knowsAbout: seo.keywords,
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Prestations",
      itemListElement: footerPrestations.map((p) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: p.label, url: `${seo.siteUrl}${p.href}` },
      })),
    },
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}
