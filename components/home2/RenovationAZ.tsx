import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";
import { ArrowLink } from "./ArrowLink";
import { DiamondOutline } from "./Logomark";

/**
 * Section 2a : « Votre rénovation énergétique, de A à Z ». Texte du client,
 * image au coin entaillé dans un cadre vert décalé, médaillon losange.
 */
export function RenovationAZ() {
  return (
    <section className="relative overflow-hidden bg-nera-navy-deep py-24 text-nera-cream lg:py-[130px]">
      <div className="grid gap-16 px-6 md:px-10 lg:grid-cols-2 lg:gap-24 lg:px-[120px]">
        <Reveal delay={0.05} className="relative order-2 min-h-[360px] lg:order-1 lg:min-h-[520px]">
          <div className="absolute inset-y-6 left-6 right-0 border border-accent/60" aria-hidden />
          <div className="absolute inset-y-0 left-0 right-6 overflow-hidden clip-notch">
            <Image
              src="/img/accompagnement-suivi-chantier.webp"
              alt="Un ingénieur et un conducteur de travaux consultent les plans sur le chantier"
              fill
              quality={90}
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="object-cover"
            />
            {/* Voile bleu clair permanent */}
            <div className="absolute inset-0 bg-nera-navy/25" aria-hidden />
          </div>
          <div className="absolute -bottom-6 right-2 flex size-28 items-center justify-center text-accent lg:size-36">
            <DiamondOutline className="absolute inset-0 animate-spin-slow drop-shadow-[0_1px_3px_rgba(10,36,64,0.7)]" strokeWidth={1} />
            <span className="relative text-center text-[11px] font-semibold uppercase leading-[1.4] tracking-[0.2em] text-accent [text-shadow:0_1px_2px_rgba(10,36,64,0.9),0_0_12px_rgba(10,36,64,0.7)]">
              De A
              <br />à Z
            </span>
          </div>
        </Reveal>

        <Reveal effect="fade-right" className="order-1 max-w-xl lg:order-2">
          <p className="flex items-center gap-4 text-[12px] font-medium uppercase tracking-[0.25em] text-nera-cream/80">
            <span className="h-2 w-7 shrink-0 bg-accent" aria-hidden />
            Accompagnement global
          </p>
          <h2 className="mt-8 font-display text-[1.75rem] font-light leading-[1.2] text-nera-cream md:text-[2.5rem]">
            Votre rénovation énergétique, <span className="font-medium text-accent">de A à Z</span>
          </h2>
          <p className="mt-8 text-body-md font-light leading-[1.75] text-nera-cream/85 lg:text-body-lg">
            Vous souhaitez rénover sans devoir coordonner vous-même les experts, l&apos;ingénieur, l&apos;administration et
            les entreprises ?
          </p>
          <p className="mt-5 text-body-md font-light leading-[1.75] text-nera-cream/85 lg:text-body-lg">
            NERA prend en charge l&apos;ensemble du projet et intervient comme interlocuteur technique unique, du premier
            diagnostic à la réception des travaux.
          </p>
          <ArrowLink href="/prestations/renovation-energetique" className="mt-10">
            Découvrir notre accompagnement global
          </ArrowLink>
        </Reveal>
      </div>
    </section>
  );
}
