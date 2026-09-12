import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { HeaderDark } from "@/components/home2/HeaderDark";
import { FooterDark } from "@/components/home2/FooterDark";
import { ArrowQuoteButton } from "@/components/home2/ArrowQuoteButton";
import { Ruler } from "@/components/home2/Logomark";
import { Container } from "@/components/ui/Container";
import { PartnerLogos } from "@/components/ui/PartnerLogos";
import { Reveal } from "@/components/ui/Reveal";
import { aosItem } from "@/components/ui/aos";
import { references, referencesRoute } from "@/content/references";
import { seo } from "@/content/seo";

/**
 * Page « Nos références » : en-tête sombre, la grille des projets quand le client les aura
 * fournis (`references.projects`, vide pour l'instant), puis le H2 de fin et son CTA.
 * Aucun texte n'est ajouté au-delà du document client.
 */
export function ReferencesPage() {
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Accueil", item: `${seo.siteUrl}/` },
      { "@type": "ListItem", position: 2, name: references.h1, item: `${seo.siteUrl}${referencesRoute}` },
    ],
  };

  return (
    <>
      <HeaderDark solidOnScroll />
      <main>
        <header className="relative overflow-hidden bg-nera-navy-deep pb-16 pt-[120px] text-nera-cream lg:pb-24 lg:pt-[180px]">
          <Image
            src={references.image}
            alt=""
            fill
            priority
            quality={90}
            sizes="100vw"
            className="object-cover object-[50%_35%] opacity-70"
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
                <li aria-current="page" className="text-nera-cream">
                  {references.h1}
                </li>
              </ol>
            </nav>

            <div className="mt-10 max-w-3xl">
              <p className="flex items-center gap-4 text-[12px] font-medium uppercase tracking-[0.25em] text-nera-cream/80">
                <span className="h-2 w-7 shrink-0 bg-accent" aria-hidden />
                Références
              </p>
              <h1 className="mt-6 font-display text-[1.875rem] font-light leading-[1.15] text-nera-cream md:text-[3rem]">
                {references.h1}
              </h1>
              <Ruler className="mt-12 w-56 text-nera-cream" ticks={30} />
            </div>
          </Container>
        </header>

        {/* Projets du client : la grille n'apparaît que lorsqu'ils ont été fournis. */}
        {references.projects.length > 0 && (
          <section className="bg-canvas py-section-sm lg:py-section">
            <Container wide>
              <ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                {references.projects.map((p) => (
                  <Reveal
                    as="li"
                    key={p.title}
                    {...aosItem}
                    className="flex flex-col overflow-hidden rounded-md border border-hairline bg-canvas-alt transition-colors hover:border-accent"
                  >
                    {p.image && (
                      <div className="relative aspect-[4/3]">
                        <Image src={p.image} alt={p.title} fill sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw" className="object-cover" />
                      </div>
                    )}
                    <div className="p-7">
                      <p className="text-[12px] font-medium uppercase tracking-[0.2em] text-mute">{p.place}</p>
                      <h2 className="mt-3 font-display text-[1.1875rem] font-medium leading-[1.25] text-nera-navy">{p.title}</h2>
                      <p className="mt-3 text-body-sm leading-[1.7] text-body">{p.text}</p>
                    </div>
                  </Reveal>
                ))}
              </ul>
            </Container>
          </section>
        )}

        {/* Logos officiels, seuls éléments de référence disponibles en attendant les projets. */}
        <section className="border-b border-hairline bg-canvas py-14 lg:py-20">
          <Container wide>
            <Reveal {...aosItem}>
              <PartnerLogos />
            </Reveal>
          </Container>
        </section>

        <section className="bg-nera-navy-deep bg-blueprint py-section-sm text-nera-cream lg:py-section">
          <Container wide>
            <Reveal className="max-w-3xl">
              <h2 className="font-display text-[1.75rem] font-light leading-[1.2] text-nera-cream md:text-[2.5rem]">
                {references.closing.title}
              </h2>
              <ArrowQuoteButton className="mt-10">{references.closing.cta}</ArrowQuoteButton>
            </Reveal>
          </Container>
        </section>
      </main>
      <FooterDark />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
    </>
  );
}
