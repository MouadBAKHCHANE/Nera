import Image from "next/image";
import Link from "next/link";
import { ChevronRight, ClipboardCheck, Layers, Target } from "lucide-react";
import { HeaderDark } from "@/components/home2/HeaderDark";
import { FooterDark } from "@/components/home2/FooterDark";
import { ArrowQuoteButton } from "@/components/home2/ArrowQuoteButton";
import { Ruler } from "@/components/home2/Logomark";
import { Container } from "@/components/ui/Container";
import { PrestationsScrolly } from "./PrestationsScrolly";
import { seo } from "@/content/seo";
import {
  prestationPageBySlug,
  prestationRoute,
  prestationsIndex as index,
  prestationsIndexRoute,
} from "@/content/prestation-pages";

/**
 * Index « Nos prestations » : en-tête sombre, puis les six domaines en défilement à
 * visuel collant (`PrestationsScrolly`), les H2 de fin et le CTA devis final. Le contenu vient de
 * `content/prestation-pages.ts` et n'est jamais reformulé ici.
 */
/** Une icône Lucide par carte de fin, dans l'ordre du contenu : ciblée, complète, périmètre. */
const outroIcons = [Target, Layers, ClipboardCheck];

export function PrestationsIndexPage() {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Accueil", item: `${seo.siteUrl}/` },
        { "@type": "ListItem", position: 2, name: "Prestations", item: `${seo.siteUrl}${prestationsIndexRoute}` },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      itemListElement: index.entries.map((e, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: e.title,
        url: `${seo.siteUrl}${prestationRoute(e.slug)}`,
      })),
    },
  ];

  return (
    <>
      <HeaderDark solidOnScroll />
      <main>
        <header className="relative overflow-hidden bg-nera-navy-deep pb-16 pt-[120px] text-nera-cream lg:pb-24 lg:pt-[180px]">
          <Image
            src="/img/process-panneaux-solaires-immeuble.webp"
            alt=""
            fill
            priority
            quality={90}
            sizes="100vw"
            className="object-cover opacity-30"
          />
          <div
            className="absolute inset-0 bg-gradient-to-r from-nera-navy-deep via-nera-navy-deep/90 to-nera-navy-deep/40"
            aria-hidden
          />
          <div className="absolute inset-0 bg-blueprint opacity-60" aria-hidden />

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
                  Prestations
                </li>
              </ol>
            </nav>

            <div className="mt-10 max-w-3xl">
              <p className="flex items-center gap-4 text-[12px] font-medium uppercase tracking-[0.25em] text-nera-cream/80">
                <span className="h-2 w-7 shrink-0 bg-accent" aria-hidden />
                Prestations
              </p>
              <h1 className="mt-6 font-display text-[1.875rem] font-light leading-[1.15] text-nera-cream md:text-[3rem]">
                {index.h1}
              </h1>
              {index.lead.map((text, i) => (
                <p key={i} className="mt-5 text-body-md font-light leading-[1.75] text-nera-cream/85 md:text-body-lg">
                  {text}
                </p>
              ))}
              <ArrowQuoteButton className="mt-10">{index.heroCta}</ArrowQuoteButton>
              <Ruler className="mt-12 w-56 text-nera-cream" ticks={30} />
            </div>
          </Container>
        </header>

        {/* Sommaire des six domaines, pour atteindre une prestation sans défiler. */}
        <nav aria-label="Les six prestations" className="border-b border-hairline bg-canvas-alt py-8 lg:py-10">
          <Container wide>
            <ol className="grid gap-x-8 gap-y-3.5 sm:grid-cols-2 lg:grid-cols-3">
              {index.entries.map((e, i) => (
                <li key={e.slug}>
                  <a
                    href={`#${e.slug}`}
                    className="group flex items-baseline gap-3 text-body-md text-body transition-colors hover:text-accent-deep lg:text-body-lg"
                  >
                    <span className="font-display text-[15px] text-mute lg:text-[17px]">{String(i + 1).padStart(2, "0")}</span>
                    <span>{e.title}</span>
                  </a>
                </li>
              ))}
            </ol>
          </Container>
        </nav>

        {/* Les six domaines : texte à gauche, visuel collant à droite qui change à chaque prestation. */}
        <div className="bg-canvas">
          <Container wide>
            <PrestationsScrolly
              entries={index.entries.map((e) => {
                const page = prestationPageBySlug.get(e.slug);
                return { ...e, image: page?.image ?? "", imagePosition: page?.imagePosition };
              })}
            />
          </Container>
        </div>

        {/* Derniers H2 du document client, en cartes : blanches à filet, la conclusion en marine. */}
        {index.outro.map((s) => (
          <section key={s.id} id={s.id} className="scroll-mt-24 border-t border-hairline bg-canvas py-section-sm lg:py-section">
            <Container wide>
              <h2 className="max-w-3xl font-display text-[1.5rem] font-light leading-[1.25] text-nera-navy md:text-[1.875rem]">
                {s.title}
              </h2>
              <ul className="mt-10 grid gap-4 md:grid-cols-3 lg:gap-5">
                {s.cards.map((c, i) => {
                  const Icon = outroIcons[i % outroIcons.length];
                  return (
                    <li
                      key={c.title}
                      className={`flex flex-col rounded-md p-8 ${
                        c.highlight ? "bg-nera-navy text-nera-cream" : "border border-hairline bg-canvas-alt"
                      }`}
                    >
                      <Icon className={`size-6 ${c.highlight ? "text-accent" : "text-accent-deep"}`} strokeWidth={1.5} aria-hidden />
                      <h3 className={`mt-6 font-display text-[1.25rem] font-medium leading-[1.25] ${c.highlight ? "text-nera-cream" : "text-nera-navy"}`}>
                        {c.title}
                      </h3>
                      <p className={`mt-3 text-body-md leading-[1.7] ${c.highlight ? "text-nera-cream/85" : "text-body"}`}>{c.text}</p>
                    </li>
                  );
                })}
              </ul>
            </Container>
          </section>
        ))}

        <section className="bg-nera-navy-deep bg-blueprint py-section-sm text-nera-cream lg:py-section">
          <Container wide>
            <div className="max-w-3xl">
              <h2 className="font-display text-[1.75rem] font-light leading-[1.2] text-nera-cream md:text-[2.5rem]">
                {index.closing.title}
              </h2>
              <p className="mt-5 text-body-md font-light leading-[1.75] text-nera-cream/85 md:text-body-lg">
                {index.closing.text}
              </p>
              <ArrowQuoteButton className="mt-10">Demander un devis gratuit</ArrowQuoteButton>
            </div>
          </Container>
        </section>
      </main>
      <FooterDark />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  );
}
