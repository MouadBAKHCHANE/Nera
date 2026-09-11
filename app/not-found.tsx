import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { HeaderDark } from "@/components/home2/HeaderDark";
import { FooterDark } from "@/components/home2/FooterDark";
import { ArrowLink } from "@/components/home2/ArrowLink";
import { ArrowQuoteButton } from "@/components/home2/ArrowQuoteButton";
import { DiamondOutline, LogomarkOutline, Ruler } from "@/components/home2/Logomark";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { aosBlock, aosItem } from "@/components/ui/aos";
import { notFound } from "@/content/not-found";

/** Page 404 : jamais indexée, et `title` absolu pour ne pas hériter du gabarit « … | NERA ». */
export const metadata: Metadata = {
  title: { absolute: notFound.meta.title },
  description: notFound.meta.description,
  robots: { index: false, follow: true },
};

/**
 * Page servie par Next pour toute adresse inconnue (`app/not-found.tsx`).
 *
 * Écran marine plein format, dans la continuité des en-têtes de page : logomark au trait
 * débordant du bord droit, grille de plan en fond. Le « 404 » est composé avec le losange de
 * la charte à la place du zéro — le motif existe déjà (`DiamondOutline`, employé dans le héro
 * et pour les cantons), rien n'est inventé pour l'occasion. Il est purement décoratif, donc
 * masqué aux lecteurs d'écran : le titre de la page porte l'information.
 *
 * À droite, les quatre destinations du menu principal, pour repartir en un clic plutôt que de
 * renvoyer le visiteur vers le seul accueil.
 */
export default function NotFound() {
  return (
    <>
      <HeaderDark solidOnScroll />
      <main>
        <section className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden bg-nera-navy-deep bg-blueprint pb-20 pt-[140px] text-nera-cream lg:pb-28 lg:pt-[180px]">
          <LogomarkOutline
            className="pointer-events-none absolute -right-[10vw] top-1/2 hidden w-[42vw] -translate-y-1/2 text-nera-cream/10 lg:block"
            strokeWidth={1}
          />

          <Container className="relative">
            <div className="grid gap-14 lg:grid-cols-[6fr_5fr] lg:items-center lg:gap-20">
              {/* Colonne de gauche : le nombre, le titre, le chapô, le retour à l'accueil. */}
              <Reveal {...aosBlock}>
                <p
                  aria-hidden
                  className="flex items-center gap-4 font-display text-[4.5rem] font-light leading-none text-nera-cream/30 md:text-[6.5rem]"
                >
                  <span>4</span>
                  <DiamondOutline className="size-[0.62em] text-accent" strokeWidth={1.5} />
                  <span>4</span>
                </p>

                <p className="mt-10 flex items-center gap-4 text-[12px] font-medium uppercase tracking-[0.25em] text-nera-cream/80">
                  <span className="h-2 w-7 shrink-0 bg-accent" aria-hidden />
                  {notFound.eyebrow}
                </p>
                <h1 className="mt-6 font-display text-[1.875rem] font-light leading-[1.15] text-nera-cream md:text-[3rem]">
                  {notFound.h1}
                </h1>
                {notFound.lead.map((text) => (
                  <p key={text} className="mt-5 max-w-[52ch] text-body-md font-light leading-[1.75] text-nera-cream/85">
                    {text}
                  </p>
                ))}

                <Ruler className="mt-10 w-56 text-nera-cream" ticks={30} />

                <div className="mt-8 flex flex-wrap items-center gap-x-12 gap-y-4">
                  <ArrowLink href="/">{notFound.homeCta}</ArrowLink>
                  <ArrowQuoteButton />
                </div>
              </Reveal>

              {/* Colonne de droite : les destinations du menu principal, en lignes à filet. */}
              <div>
                <Reveal {...aosBlock}>
                  <h2 className="text-[12px] font-medium uppercase tracking-[0.25em] text-nera-cream/60">
                    {notFound.linksTitle}
                  </h2>
                </Reveal>
                <ul className="mt-6 border-t border-nera-cream/15">
                  {notFound.links.map((l) => (
                    <Reveal as="li" key={l.href} {...aosItem} className="border-b border-nera-cream/15">
                      <Link
                        href={l.href}
                        className="group flex items-center gap-6 py-5 transition-colors hover:text-accent"
                      >
                        <span className="flex-1">
                          <span className="block font-display text-[1.125rem] font-medium leading-[1.3]">{l.label}</span>
                          <span className="mt-1 block text-body-sm font-light leading-[1.6] text-nera-cream/65">
                            {l.desc}
                          </span>
                        </span>
                        <ArrowRight
                          className="size-4 shrink-0 transition-transform duration-300 group-hover:translate-x-1.5"
                          strokeWidth={1.75}
                          aria-hidden
                        />
                      </Link>
                    </Reveal>
                  ))}
                </ul>
              </div>
            </div>
          </Container>
        </section>
      </main>
      <FooterDark />
    </>
  );
}
