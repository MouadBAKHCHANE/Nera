import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { HeaderDark } from "@/components/home2/HeaderDark";
import { FooterDark } from "@/components/home2/FooterDark";
import { QuoteCta } from "@/components/home2/QuoteCta";
import { Ruler } from "@/components/home2/Logomark";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Blocks } from "./Blocks";
import { seo } from "@/content/seo";
import {
  prestationRoute,
  prestationsIndexRoute,
  type PrestationPage as Page,
} from "@/content/prestation-pages";

/**
 * Gabarit unique des six pages prestation : en-tête sombre avec image, corps sur crème
 * avec sommaire collant, FAQ dépliable, maillage interne et CTA devis final. Le contenu
 * vient de `content/prestation-pages.ts` et n'est jamais reformulé ici.
 */
export function PrestationPage({ page }: { page: Page }) {
  const route = prestationRoute(page.slug);
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Accueil", item: `${seo.siteUrl}/` },
        { "@type": "ListItem", position: 2, name: "Prestations", item: `${seo.siteUrl}${prestationsIndexRoute}` },
        { "@type": "ListItem", position: 3, name: page.shortTitle, item: `${seo.siteUrl}${route}` },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: page.faq.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  ];

  return (
    <>
      <HeaderDark solidOnScroll />
      <main>
        {/* En-tête : image du bâtiment, fil d'Ariane, H1 et chapô du client. */}
        <header className="relative overflow-hidden bg-nera-navy-deep pb-16 pt-[120px] text-nera-cream lg:pb-24 lg:pt-[180px]">
          <Image
            src={page.image}
            alt=""
            fill
            priority
            quality={90}
            sizes="100vw"
            className={`object-cover opacity-70 ${page.imagePosition ?? ""}`}
          />
          {/*
            Trois voiles au lieu d'un seul aplat. L'ancien montait à 100 % de marine sur toute
            la moitié gauche : la photo, déjà à 30 % d'opacité, disparaissait complètement.
            - vertical, en haut : garde le logo et le menu lisibles sur la photo ;
            - latéral, bien plus léger qu'avant et transparent à droite : le texte reste lisible
              à gauche, la photo se découvre vers la droite ;
            - grille de plan, discrète.
            Le texte porte en plus une ombre portée (voir le conteneur), comme le héro de
            l'accueil : c'est elle qui tient la lisibilité là où le voile a été allégé.
          */}
          <div
            className="absolute inset-x-0 top-0 h-2/5 bg-gradient-to-b from-nera-navy-deep/80 to-transparent"
            aria-hidden
          />
          <div
            className="absolute inset-0 bg-gradient-to-r from-nera-navy-deep/70 via-nera-navy-deep/30 to-transparent"
            aria-hidden
          />
          <div className="absolute inset-0 bg-blueprint opacity-30" aria-hidden />

          <Container wide className="relative [text-shadow:0_1px_18px_rgba(10,36,64,0.55)]">
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
                <li>
                  <Link href={prestationsIndexRoute} className="transition-colors hover:text-accent">
                    Prestations
                  </Link>
                </li>
                <li aria-hidden className="flex items-center">
                  <ChevronRight className="size-3.5 text-nera-cream/40" strokeWidth={1.5} />
                </li>
                <li aria-current="page" className="text-nera-cream">
                  {page.shortTitle}
                </li>
              </ol>
            </nav>

            <div className="mt-10 max-w-3xl">
              <p className="flex items-center gap-4 text-[12px] font-medium uppercase tracking-[0.25em] text-nera-cream/80">
                <span className="h-2 w-7 shrink-0 bg-accent" aria-hidden />
                Prestations
              </p>
              <h1 className="mt-6 font-display text-[1.875rem] font-light leading-[1.15] text-nera-cream md:text-[3rem]">
                {page.h1}
              </h1>
              {page.lead.map((text, i) => (
                <p key={i} className="mt-5 text-body-md font-light leading-[1.75] text-nera-cream/85 md:text-body-lg">
                  {text}
                </p>
              ))}
              <QuoteCta prestation={page.shortTitle} className="mt-10">
                {page.heroCta}
              </QuoteCta>
              <Ruler className="mt-12 w-56 text-nera-cream" ticks={30} />
            </div>
          </Container>
        </header>

        {/* Corps : sommaire collant à gauche, sections du client à droite. */}
        <div className="py-section-sm lg:py-section">
          <Container wide>
            <div className="grid gap-12 lg:grid-cols-[minmax(0,15rem)_minmax(0,1fr)] lg:gap-20">
              {/*
                Colonne de gauche : sommaire puis sigles, réunis dans un seul enfant de la
                grille, qui n'a que deux colonnes — deux enfants séparés passeraient à la ligne.
                C'est ce bloc qui colle, et non le sommaire seul.
              */}
              <div className="lg:sticky lg:top-28 lg:self-start">
                <nav aria-labelledby="sommaire">
                <h2 id="sommaire" className="text-[12px] font-medium uppercase tracking-[0.2em] text-nera-navy">
                  Sur cette page
                </h2>
                <ol className="mt-4 space-y-2 border-l border-hairline pl-4">
                  {page.sections.map((s) => (
                    <li key={s.id}>
                      <a
                        href={`#${s.id}`}
                        className="text-body-md leading-[1.5] text-body transition-colors hover:text-accent-deep"
                      >
                        {s.title}
                      </a>
                    </li>
                  ))}
                  <li>
                    <a href="#faq" className="text-body-md text-body transition-colors hover:text-accent-deep">
                      Questions fréquentes
                    </a>
                  </li>
                </ol>
                </nav>

                {/*
                  Sigles de la page, sous le sommaire : la colonne étant collante, la liste
                  reste sous les yeux pendant toute la lecture. Hors du `<nav>`, une liste de
                  définitions n'étant pas de la navigation.
                */}
                {page.acronyms && (
                  <div className="mt-10">
                    <h2 className="text-[12px] font-medium uppercase tracking-[0.2em] text-nera-navy">Sigles</h2>
                    <dl className="mt-4 space-y-2 border-l border-hairline pl-4 text-body-sm leading-[1.5]">
                      {page.acronyms.map((a) => (
                        <div key={a.short}>
                          <dt className="inline font-medium text-nera-navy">{a.short}</dt>
                          <dd className="inline text-body"> : {a.long}</dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                )}
              </div>

              <div className="max-w-3xl">
                {page.sections.map((s) => (
                  <Reveal key={s.id} as="section" className="mt-14 scroll-mt-28 first:mt-0">
                    <div id={s.id} className="scroll-mt-28">
                      <h2 className="font-display text-[1.5rem] font-light leading-[1.25] text-nera-navy md:text-[1.875rem]">
                        {s.title}
                      </h2>
                      <div className="mt-5">
                        <Blocks blocks={s.blocks} />
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </Container>
        </div>

        {/*
          Bande photo pleine largeur, sur les pages les plus longues seulement : une respiration
          entre le corps de texte et la FAQ. Aucun texte par-dessus, donc aucun voile — et un
          `alt` vide, l'image n'apportant pas d'information.
        */}
        {page.band && (
          <div className="relative aspect-[21/9] max-h-[420px] w-full overflow-hidden">
            <Image src={page.band} alt="" fill quality={88} sizes="100vw" className="object-cover" />
          </div>
        )}

        {/* FAQ du document client, dépliable sans JavaScript. */}
        <section id="faq" className="scroll-mt-28 bg-canvas-alt py-section-sm lg:py-section">
          <Container wide className="mx-auto max-w-3xl">
            <p className="flex items-center gap-4 text-[12px] font-medium uppercase tracking-[0.25em] text-accent-deep">
              <span className="h-2 w-7 shrink-0 bg-accent" aria-hidden />
              FAQ
            </p>
            <h2 className="mt-6 font-display text-[1.75rem] font-light leading-[1.2] text-nera-navy md:text-[2.25rem]">
              Questions fréquentes
            </h2>
            <div className="mt-10 border-t border-hairline">
              {page.faq.map((f) => (
                <details key={f.q} className="group border-b border-hairline py-5">
                  <summary className="flex cursor-pointer list-none items-start justify-between gap-6 text-body-md font-medium text-nera-navy transition-colors hover:text-accent-deep">
                    {f.q}
                    <ChevronRight
                      className="mt-1 size-4 shrink-0 text-accent-deep transition-transform duration-300 group-open:rotate-90"
                      strokeWidth={1.75}
                      aria-hidden
                    />
                  </summary>
                  <p className="mt-3 max-w-[62ch] text-body-md leading-[1.75] text-body lg:text-body-lg">{f.a}</p>
                </details>
              ))}
            </div>
          </Container>
        </section>

        {/* Dernier H2 du document client et CTA devis. */}
        <section className="bg-nera-navy-deep bg-blueprint py-section-sm text-nera-cream lg:py-section">
          <Container wide>
            <div className="max-w-3xl">
              <h2 className="font-display text-[1.75rem] font-light leading-[1.2] text-nera-cream md:text-[2.5rem]">
                {page.closing}
              </h2>
              <QuoteCta prestation={page.shortTitle} className="mt-10">
                Demander un devis gratuit
              </QuoteCta>
            </div>
          </Container>
        </section>
      </main>
      <FooterDark />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  );
}
