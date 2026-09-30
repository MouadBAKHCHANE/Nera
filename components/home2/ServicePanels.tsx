import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";
import { ArrowLink } from "./ArrowLink";
import { Ruler } from "./Logomark";
import { ActiveOnView } from "@/components/ui/ActiveOnView";
import { Accent } from "@/components/ui/Accent";
import { prestationRoute } from "@/content/prestation-pages";
import type { HomeContent } from "@/content/home";

/**
 * Prestations sous le héro : H2 + introduction du client, puis six cartes au coin
 * entaillé (rappel du losange) sur grille de plan, une par prestation du pied de page.
 * Textes et liens fournis par le client, saisis dans le Studio Sanity (« Page d'accueil »).
 *
 * Les photos des cartes sont **en portrait** (`card-*.webp`), et non celles des en-têtes de pages
 * prestation, en paysage. La carte fait environ 475 × 560 px : servie à 33vw, une image en 1,9:1
 * n'arrivait qu'à 337 px de haut et le navigateur l'étirait, d'où un rendu flou. Un cadrage 4:5
 * donne plus de hauteur que la carte n'en demande.
 */
export function ServicePanels({ services }: { services: HomeContent["services"] }) {
  const panels = services.cards.map((c, i) => ({
    ...c,
    n: String(i + 1).padStart(2, "0"),
    href: prestationRoute(c.slug),
  }));
  return (
    <section id="prestations" className="relative bg-nera-navy bg-blueprint py-20 text-nera-cream lg:py-28">
      <div className="px-5 md:px-8 lg:px-12">
        <Reveal className="grid gap-8 border-b border-nera-cream/15 pb-10 lg:grid-cols-[7fr_5fr] lg:items-end lg:gap-16">
          <div>
            <h2 className="font-display text-[1.75rem] font-light leading-[1.15] text-nera-cream md:text-[2.5rem]">
              <Accent text={services.title} accent={services.accent} className="text-accent" />
            </h2>
          </div>
          <div className="space-y-3 text-body-sm font-light leading-[1.7] text-nera-cream/85 md:text-body-md lg:text-body-lg">
            {services.intro.map((text, i) => (
              <p key={i}>{text}</p>
            ))}
            <Ruler className="mt-4 w-48 text-nera-cream" ticks={30} />
          </div>
        </Reveal>

        <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-5">
          {panels.map((p, i) => (
            <Reveal key={p.href} effect="slide-up" delay={(i % 3) * 0.1} className={i % 3 === 1 ? "lg:mt-12" : ""}>
              <ActiveOnView className="group">
              <article className="relative flex min-h-[520px] flex-col justify-end overflow-hidden clip-notch bg-nera-navy-deep lg:min-h-[560px]">
                <Image
                  src={p.image}
                  alt=""
                  fill
                  quality={90}
                  sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                  className={`object-cover transition-transform duration-700 ease-out-quart group-hover:scale-[1.06] group-data-active:scale-[1.06]`}
                  style={p.imagePosition ? { objectPosition: p.imagePosition } : undefined}
                />
                {/*
                  Voile cantonné au bas de la carte : la photo se voit en entier, le titre, le
                  texte et le lien restent lisibles. Il couvrait auparavant toute la carte et
                  s'allégeait au survol, si bien que l'image n'apparaissait vraiment qu'à ce
                  moment-là. Il ne s'allège plus : le texte repose dessus en permanence.
                */}
                <div
                  className="absolute inset-x-0 bottom-0 h-3/5 bg-gradient-to-t from-nera-navy via-nera-navy/85 to-transparent"
                  aria-hidden
                />
                {/* Le numéro n'a plus de voile derrière lui : une ombre portée le détache de la photo. */}
                <span className="absolute left-7 top-7 font-display text-[3rem] font-light leading-none text-nera-cream/70 transition-colors duration-base [text-shadow:0_2px_14px_rgba(10,36,64,0.85)] group-hover:text-accent group-data-active:text-accent">
                  {p.n}
                </span>
                <div className="relative p-8">
                  <h3 className="font-display text-[1.375rem] font-medium leading-[1.25] text-nera-cream md:text-[1.5rem]">{p.title}</h3>
                  <p className="mt-4 text-body-sm font-light leading-[1.7] text-nera-cream/80 md:text-body-md">{p.text}</p>
                  <ArrowLink href={p.href} className="mt-6 min-w-0 w-full">
                    {p.cta}
                  </ArrowLink>
                </div>
              </article>
              </ActiveOnView>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
