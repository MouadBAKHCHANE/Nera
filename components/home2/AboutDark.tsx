import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";
import { ArrowLink } from "./ArrowLink";
import { DiamondOutline } from "./Logomark";
import { company } from "@/content/prestations";

/**
 * « Le bureau » : image entaillée dans un cadre à filet vert décalé, losange
 * tournant en médaillon, texte à gauche. Contenu issu du cahier des charges.
 */
export function AboutDark() {
  return (
    <section className="relative overflow-hidden bg-nera-navy-deep py-24 text-nera-cream lg:py-[140px]">
      <div className="grid gap-16 px-6 md:px-10 lg:grid-cols-[6fr_6fr] lg:gap-24 lg:px-[120px]">
        <Reveal delay={0.05} className="relative order-2 min-h-[380px] lg:order-1 lg:min-h-[560px]">
          <div className="absolute inset-y-6 left-6 right-0 border border-accent/60" aria-hidden />
          <div className="absolute inset-y-0 left-0 right-6 overflow-hidden clip-notch">
            <Image
              src="/img/bureau-batiment-clair-moderne.jpg"
              alt="Façade d'un immeuble contemporain à Genève"
              fill
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="object-cover"
            />
          </div>
          <div className="absolute -bottom-6 right-2 flex size-28 items-center justify-center text-accent lg:size-36">
            <DiamondOutline className="absolute inset-0 animate-spin-slow" strokeWidth={1} />
            <span className="text-center text-[11px] font-medium uppercase leading-[1.4] tracking-[0.2em]">
              Fondé
              <br />
              {company.founded}
            </span>
          </div>
        </Reveal>

        <Reveal className="order-1 max-w-xl lg:order-2">
          <p className="flex items-center gap-4 text-[13px] font-medium uppercase tracking-[0.25em] text-nera-cream/80">
            <span className="h-px w-10 bg-accent" aria-hidden />
            Le bureau
          </p>
          <h2 className="mt-8 font-display text-[1.75rem] font-light leading-[1.2] text-nera-cream md:text-[2.5rem]">
            NERA vient du mot <span className="font-medium text-accent">équilibre</span>. C&apos;est aussi notre méthode.
          </h2>
          <p className="mt-8 text-body-md font-light leading-[1.75] text-nera-cream/85">
            Un bureau d&apos;ingénierie à taille humaine, indépendant, centré sur l&apos;expertise technique et la
            durabilité. Nous accompagnons maîtres d&apos;ouvrage, architectes et institutions publiques avec une approche
            pragmatique et claire, de la phase d&apos;étude à la réalisation.
          </p>
          <p className="mt-5 text-body-md font-light leading-[1.75] text-nera-cream/85">
            Fondé à Genève par {company.founder.name}, {company.founder.titles}, expert CECB, après plusieurs années au
            sein de bureaux genevois actifs dans l&apos;énergie et la technique du bâtiment.
          </p>
          <ArrowLink href="/bureau" className="mt-10">
            À propos de nous
          </ArrowLink>
        </Reveal>
      </div>
    </section>
  );
}
