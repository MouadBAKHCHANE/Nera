import Link from "next/link";
import { ChevronRight, Mail, MapPin, Phone } from "lucide-react";
import { HeaderDark } from "@/components/home2/HeaderDark";
import { FooterDark } from "@/components/home2/FooterDark";
import { Ruler } from "@/components/home2/Logomark";
import { LinkedInIcon } from "@/components/ui/LinkedInIcon";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { aosBlock, aosCard } from "@/components/ui/aos";
import { ContactForm } from "./ContactForm";
import { ContactMap } from "./ContactMap";
import { contact, contactRoute } from "@/content/contact";
import { company } from "@/content/prestations";
import { mapsHref } from "@/content/footer";
import { seo } from "@/content/seo";

/**
 * Page « Contact » : en-tête sombre, puis le formulaire simple (le même que la section contact
 * de l'accueil) à gauche et les coordonnées à droite, enfin la carte. Le contenu vient de
 * `content/contact.ts` et n'est jamais reformulé ici. Apparitions calées sur hestera.ch
 * (`components/ui/aos.ts`).
 */
export function ContactPage() {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Accueil", item: `${seo.siteUrl}/` },
        { "@type": "ListItem", position: 2, name: "Contact", item: `${seo.siteUrl}${contactRoute}` },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "ContactPage",
      name: contact.meta.title,
      description: contact.meta.description,
      url: `${seo.siteUrl}${contactRoute}`,
      mainEntity: {
        "@type": "ProfessionalService",
        name: company.name,
        telephone: company.phone,
        email: company.email,
        url: seo.siteUrl,
        address: {
          "@type": "PostalAddress",
          streetAddress: company.street,
          postalCode: company.zip,
          addressLocality: company.city,
          addressCountry: company.country,
        },
        geo: { "@type": "GeoCoordinates", latitude: contact.map.lat, longitude: contact.map.lon },
        hasMap: company.googleBusiness,
        sameAs: [company.linkedin, company.socials.facebook, company.socials.instagram],
      },
    },
  ];

  return (
    <>
      <HeaderDark solidOnScroll />
      <main>
        {/* En-tête sombre : fil d'Ariane, H1 et les trois paragraphes du client. */}
        <header className="relative overflow-hidden bg-nera-navy-deep bg-blueprint pb-16 pt-[120px] text-nera-cream lg:pb-24 lg:pt-[180px]">
          <Container wide className="relative">
            <nav aria-label="Fil d'Ariane">
              <ol className="flex flex-wrap items-center gap-1 text-[12px] font-light text-nera-cream/70">
                <li>
                  <Link href="/" className="transition-colors hover:text-accent">
                    Accueil
                  </Link>
                </li>
                <li aria-hidden className="flex items-center">
                  <ChevronRight className="size-3.5 text-nera-cream/40" strokeWidth={1.5} />
                </li>
                <li aria-current="page" className="text-nera-cream">
                  Contact
                </li>
              </ol>
            </nav>

            {/* Le titre a gauche, la carte des coordonnees a droite, des le hero. */}
            <div className="mt-10 grid gap-12 lg:grid-cols-[7fr_5fr] lg:items-start lg:gap-16">
              <div>
                <p className="flex items-center gap-4 text-[12px] font-medium uppercase tracking-[0.25em] text-nera-cream/80">
                  <span className="h-2 w-7 shrink-0 bg-accent" aria-hidden />
                  Contact
                </p>
                <h1 className="mt-6 font-display text-[1.875rem] font-light leading-[1.15] text-nera-cream md:text-[3rem]">
                  {contact.h1}
                </h1>
                {contact.lead.map((text, i) => (
                  <p key={i} className="mt-5 max-w-[56ch] text-body-md font-light leading-[1.75] text-nera-cream/85 md:text-body-lg">
                    {text}
                  </p>
                ))}
                <Ruler className="mt-12 w-56 text-nera-cream" ticks={30} />
              </div>

              <Reveal {...aosCard}>
                <div className="border border-nera-cream/20 bg-nera-navy/40 p-8">
                  <h2 className="text-[12px] font-medium uppercase tracking-[0.25em] text-nera-cream/80">
                    {contact.coordonnees.title}
                  </h2>

                  <address className="mt-6 not-italic">
                    <p className="font-display text-[1.0625rem] font-medium leading-[1.35] text-nera-cream">
                      {company.name}
                    </p>
                    <a
                      href={mapsHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-3 flex gap-3 text-body-md font-light leading-[1.7] text-nera-cream/85 transition-colors hover:text-accent"
                    >
                      <MapPin className="mt-1 size-4 shrink-0 text-accent" strokeWidth={1.5} aria-hidden />
                      <span>
                        {company.street}
                        <br />
                        {company.zip} {company.city}
                        <br />
                        Suisse
                      </span>
                    </a>
                  </address>

                  {/*
                    Les deux boutons et le lien LinkedIn du document client. Le numero et
                    l'adresse s'affichent sur les boutons eux-memes, a la demande du client ;
                    les libelles du document restent en `aria-label`, sinon un lecteur d'ecran
                    n'annoncerait qu'une suite de chiffres.
                  */}
                  <div className="mt-8 flex flex-col gap-3 border-t border-nera-cream/20 pt-8">
                    <a
                      href={company.phoneHref}
                      aria-label={contact.coordonnees.callCta}
                      className="inline-flex h-12 items-center justify-center gap-2 rounded-sm bg-accent px-[22px] text-[15px] font-medium text-white transition-colors hover:bg-accent-deep"
                    >
                      <Phone className="size-4 shrink-0" strokeWidth={1.75} aria-hidden />
                      {company.phone}
                    </a>
                    <a
                      href={`mailto:${company.email}`}
                      aria-label={contact.coordonnees.mailCta}
                      className="inline-flex h-12 items-center justify-center gap-2 rounded-sm border border-nera-cream/60 px-[22px] text-[15px] font-medium text-nera-cream transition-colors hover:border-nera-cream hover:bg-nera-cream/10"
                    >
                      <Mail className="size-4 shrink-0" strokeWidth={1.75} aria-hidden />
                      {company.email}
                    </a>
                    <a
                      href={company.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 pt-1 text-body-sm font-medium text-nera-cream/85 transition-colors hover:text-accent"
                    >
                      <LinkedInIcon className="size-4" />
                      {contact.coordonnees.linkedinCta}
                    </a>
                  </div>
                </div>
              </Reveal>
            </div>
          </Container>
        </header>

        {/*
          Section coupée en deux moitiés d'écran : le formulaire à gauche, la carte à droite et
          à fond perdu, sur toute la hauteur. La carte occupait auparavant une bande sous le
          formulaire, et une photo tenait cette moitié droite : la carte y est plus utile.
          Pas de `Container` ici — la moitié droite doit toucher le bord de l'écran, donc la
          gouttière de gauche est reprise à la main, aux valeurs du reste du site.
          « Carte localisation », le titre du client, sert de nom accessible à la moitié droite.
        */}
        <section className="bg-canvas">
          <div className="grid lg:grid-cols-2">
            <Reveal {...aosBlock} className="px-6 py-section-sm md:px-10 lg:py-section lg:pl-[120px] lg:pr-16">
              <h2 className="font-display text-[1.5rem] font-light leading-[1.2] text-nera-navy md:text-[2rem]">
                {contact.form.title}
              </h2>
              <p className="mt-5 max-w-[52ch] text-body-md font-light leading-[1.75] text-body">{contact.form.text}</p>
              <ContactForm tone="light" className="mt-10" />
            </Reveal>

            <div aria-label={contact.map.title} className="min-h-[360px] md:min-h-[440px] lg:min-h-full">
              <ContactMap />
            </div>
          </div>
        </section>
      </main>
      <FooterDark />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  );
}
