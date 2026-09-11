import Image from "next/image";
import Link from "next/link";
import { ChevronRight, Mail, Phone } from "lucide-react";
import { HeaderDark } from "@/components/home2/HeaderDark";
import { FooterDark } from "@/components/home2/FooterDark";
import { ArrowQuoteButton } from "@/components/home2/ArrowQuoteButton";
import { DiamondOutline, LogomarkOutline, Ruler } from "@/components/home2/Logomark";
import { Stats } from "@/components/home2/Stats";
import { Territory } from "@/components/home2/Territory";
import { Container } from "@/components/ui/Container";
import { PartnerLogos } from "@/components/ui/PartnerLogos";
import { Reveal } from "@/components/ui/Reveal";
import { ImageWipe } from "@/components/ui/ImageWipe";
import { SplitReveal } from "@/components/ui/SplitReveal";
import { aosBlock, aosCard, aosItem } from "@/components/ui/aos";
import { bureau, bureauRoute } from "@/content/bureau";
import { company } from "@/content/prestations";
import { seo } from "@/content/seo";
import { QualificationIconsList } from "@/components/bureau/QualificationIcons";
import { PrincipeIconsList } from "@/components/bureau/PrincipeIcons";

/** Une icône flat sur-mesure par qualification, dans l'ordre du contenu : CECB, Minergie, REG B, MPQ. */
const qualificationIcons = QualificationIconsList;

/**
 * Une icône flat sur-mesure par ligne de « L'équilibre comme principe », dans l'ordre du texte client :
 * performance et faisabilité, ambition énergétique, investissement et exploitation, technique
 * et confort, transformation du bâti, humain et environnement.
 */
const equilibreIcons = PrincipeIconsList;

/**
 * Les cinq rectangles de « Nos valeurs », du plus foncé au plus clair — la progression des
 * `value-item` de hestera, portée sur la palette NERA. Uniquement des tons de la charte :
 * ni vert en aplat, ni teinte inventée. Le texte est en crème sur les deux premiers.
 */
const valeurPanels = [
  { bg: "bg-nera-navy-deep", title: "text-nera-cream", text: "text-nera-cream/85" },
  { bg: "bg-nera-navy", title: "text-nera-cream", text: "text-nera-cream/85" },
  { bg: "bg-nera-navy-soft", title: "text-nera-navy", text: "text-body" },
  { bg: "bg-nera-cream-deep", title: "text-nera-navy", text: "text-body" },
  { bg: "bg-nera-white", title: "text-nera-navy", text: "text-body" },
];

const pad = (n: number) => String(n).padStart(2, "0");

/**
 * Bandeau de section : étiquette verte, puis H2 suivi d'un filet qui file jusqu'au bord de la
 * colonne — le `header.title-w-hr` de hestera.ch/a-propos (H2 à gauche, `<hr>` sur toute la
 * largeur restante, alignés au centre). Le filet est masqué sous `md`, où il ne reste plus
 * assez de place pour qu'il veuille dire quelque chose.
 */
function SectionHeading({
  eyebrow,
  title,
  tone = "dark",
  as: Tag = "h2",
}: {
  eyebrow: string;
  title: string;
  tone?: "dark" | "light";
  as?: "h2" | "h3";
}) {
  const light = tone === "light";
  return (
    <>
      <p
        className={`flex items-center gap-4 text-[12px] font-medium uppercase tracking-[0.25em] ${
          light ? "text-nera-cream/80" : "text-nera-navy/70"
        }`}
      >
        <span className="h-2 w-7 shrink-0 bg-accent" aria-hidden />
        {eyebrow}
      </p>
      <div className="mt-6 flex items-center gap-8">
        <Tag
          className={`font-display text-[1.75rem] font-light leading-[1.15] md:text-[2.5rem] ${
            light ? "text-nera-cream" : "text-nera-navy"
          }`}
        >
          {title}
        </Tag>
        <hr
          className={`hidden h-px flex-1 border-0 md:block ${light ? "bg-nera-cream/25" : "bg-hairline"}`}
          aria-hidden
        />
      </div>
    </>
  );
}

/**
 * Page « Le bureau » : en-tête sombre, puis les H2 du texte client dans l'ordre du document,
 * en alternant les fonds (crème, blanc, marine) sans deux sections marine consécutives.
 * Le contenu vient de `content/bureau.ts` et n'est jamais reformulé ici.
 */
export function BureauPage() {
  const founder = company.founder;
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Accueil", item: `${seo.siteUrl}/` },
        { "@type": "ListItem", position: 2, name: "Le bureau", item: `${seo.siteUrl}${bureauRoute}` },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "AboutPage",
      name: bureau.meta.title,
      description: bureau.meta.description,
      url: `${seo.siteUrl}${bureauRoute}`,
      mainEntity: {
        "@type": "ProfessionalService",
        name: company.name,
        foundingDate: String(company.founded),
        founder: {
          "@type": "Person",
          name: founder.name,
          jobTitle: founder.role,
          telephone: founder.phone,
          email: founder.email,
        },
        address: {
          "@type": "PostalAddress",
          streetAddress: company.street,
          postalCode: company.zip,
          addressLocality: company.city,
          addressCountry: company.country,
        },
        telephone: company.phone,
        email: company.email,
      },
    },
  ];

  return (
    <>
      <HeaderDark solidOnScroll />
      <main>
        {/*
          En-tête : photo assombrie, fil d'Ariane, H1 et les trois paragraphes d'introduction.
          L'enchaînement d'apparition est celui du héro de l'accueil (`components/home2/HeroDark.tsx`) :
          étiquette en fondu, titre lettre par lettre (`SplitReveal`), chapô à 1,6 s, règle graduée
          à 2,4 s. Le fil d'Ariane reste immédiat, c'est un repère de navigation. Les autres
          sections gardent les réglages hestera de `components/ui/aos.ts`.
        */}
        <header className="relative overflow-hidden bg-nera-navy-deep pb-16 pt-[120px] text-nera-cream lg:pb-24 lg:pt-[180px]">
          <Image
            src="/img/bureau-batiment-clair-moderne.webp"
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
                  Le bureau
                </li>
              </ol>
            </nav>

            <div className="mt-10 max-w-3xl">
              <Reveal
                as="p"
                effect="fade"
                className="flex items-center gap-4 text-[12px] font-medium uppercase tracking-[0.25em] text-nera-cream/80"
              >
                <span className="h-2 w-7 shrink-0 bg-accent" aria-hidden />
                Le bureau
              </Reveal>
              <SplitReveal
                as="h1"
                text={bureau.h1}
                delay={0.2}
                className="mt-6 font-display text-[1.875rem] font-light leading-[1.15] text-nera-cream md:text-[3rem]"
              />
              <Reveal delay={1.6}>
                {bureau.lead.map((text, i) => (
                  <p key={i} className="mt-5 text-body-md font-light leading-[1.75] text-nera-cream/85 md:text-body-lg">
                    {text}
                  </p>
                ))}
              </Reveal>
              <Reveal delay={2.4}>
                <Ruler className="mt-12 w-56 text-nera-cream" ticks={30} />
              </Reveal>
            </div>
          </Container>
        </header>

        {/* 1. L'équilibre comme principe — crème. Les six « entre… », une icône plate par ligne. */}
        <section id={bureau.equilibre.id} className="scroll-mt-24 bg-canvas bg-blueprint-light py-20 lg:py-28">
          <Container wide>
            <div className="grid gap-12 lg:grid-cols-[5fr_7fr] lg:gap-20">
              <Reveal {...aosBlock}>
                <SectionHeading eyebrow="Principe" title={bureau.equilibre.title} />
                <p className="mt-6 max-w-lg text-body-md font-light leading-[1.75] text-body md:text-body-lg">
                  {bureau.equilibre.intro}
                </p>
              </Reveal>
              <ul className="grid gap-4 sm:grid-cols-2 lg:pt-2">
                {bureau.equilibre.items.map((item, i) => {
                  const Icon = equilibreIcons[i % equilibreIcons.length];
                  return (
                    <Reveal
                      as="li"
                      key={item}
                      {...aosItem}
                      className="group relative flex items-center gap-5 overflow-hidden rounded-md border border-hairline bg-canvas-alt p-5 transition-all duration-300 hover:border-accent hover:shadow-md lg:p-6"
                    >
                      <div className="shrink-0 transition-transform duration-300 ease-out group-hover:scale-115 group-hover:-translate-y-1 group-hover:rotate-2">
                        <Icon className="size-13 lg:size-14" />
                      </div>
                      <p className="text-body-md font-medium leading-[1.6] text-nera-navy transition-colors duration-300 group-hover:text-accent">
                        {item}
                      </p>
                    </Reveal>
                  );
                })}
              </ul>
            </div>
          </Container>
        </section>

        {/*
          2. Notre mission — blanc. Phrase de mission, puis les sept verbes en cartes à numéro.
          Filigrane du logomark débordant du bord droit, comme le `.fili-right` de hestera
          (leur icône en filigrane sort de 50 % hors du cadre).
        */}
        <section
          id={bureau.mission.id}
          className="relative scroll-mt-24 overflow-hidden border-t border-hairline bg-canvas-alt py-20 lg:py-28"
        >
          <LogomarkOutline
            className="pointer-events-none absolute -right-[12vw] top-0 hidden w-[38vw] text-nera-navy/[0.06] lg:block"
            strokeWidth={1}
          />
          <Container wide className="relative">
            <Reveal {...aosBlock} className="max-w-3xl">
              <SectionHeading eyebrow="Mission" title={bureau.mission.title} />
              <p className="mt-8 font-display text-[1.25rem] font-light leading-[1.4] text-nera-navy md:text-[1.625rem]">
                {bureau.mission.intro}
              </p>
              <p className="mt-8 text-body-md text-body">{bureau.mission.lead}</p>
            </Reveal>
            <ol className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {bureau.mission.items.map((item, i) => (
                <Reveal
                  as="li"
                  key={item}
                  {...aosItem}
                  className="flex items-center gap-5 border border-hairline bg-canvas p-5"
                >
                  <span className="relative flex size-12 shrink-0 items-center justify-center">
                    <DiamondOutline className="absolute inset-0 text-accent" strokeWidth={1} />
                    <span className="font-display text-[13px] font-medium text-nera-navy">{pad(i + 1)}</span>
                  </span>
                  <p className="text-body-md leading-[1.6] text-nera-navy">{item}</p>
                </Reveal>
              ))}
            </ol>
          </Container>
        </section>

        {/* 3. Le fondateur — marine. Cartouche client à gauche, texte et contact à droite. */}
        <section id={bureau.fondateur.id} className="relative scroll-mt-24 overflow-hidden bg-nera-navy bg-blueprint py-20 text-nera-cream lg:py-28">
          <LogomarkOutline
            className="pointer-events-none absolute -right-[6vw] top-1/2 hidden w-[30vw] -translate-y-1/2 text-nera-cream/10 lg:block"
            strokeWidth={1}
          />
          <Container wide className="relative">
            <Reveal {...aosBlock} className="max-w-3xl">
              <SectionHeading eyebrow="Fondateur" title={bureau.fondateur.title} tone="light" />
            </Reveal>
            <div className="mt-12 grid gap-10 lg:grid-cols-[4fr_8fr] lg:gap-20">
              <Reveal {...aosCard}>
                <div className="border border-nera-cream/20 p-8">
                  <span className="block h-6 w-px bg-accent" aria-hidden />
                  <p className="mt-5 font-display text-[1.625rem] font-medium leading-[1.15] text-nera-cream">
                    {bureau.fondateur.card.name}
                  </p>
                  <p className="mt-2 text-[12px] font-medium uppercase tracking-[0.2em] text-accent">{bureau.fondateur.card.role}</p>
                  <p className="mt-5 text-body-sm font-light text-nera-cream/85">{bureau.fondateur.card.titles}</p>
                  <p className="mt-1 text-body-sm font-light text-nera-cream/85">{bureau.fondateur.card.field}</p>
                </div>
              </Reveal>
              <Reveal {...aosBlock} className="max-w-2xl">
                {bureau.fondateur.paragraphs.map((text) => (
                  <p key={text} className="mt-6 text-body-md font-light leading-[1.75] text-nera-cream/85 first:mt-0 md:text-body-lg">
                    {text}
                  </p>
                ))}
                <ul className="mt-8 space-y-3 border-t border-nera-cream/15 pt-8 text-body-md font-light">
                  <li className="flex items-center gap-3">
                    <Phone className="size-4 shrink-0 text-accent" strokeWidth={1.5} aria-hidden />
                    <span className="text-nera-cream/70">{bureau.fondateur.phoneLabel} :</span>
                    <a href={founder.phoneHref} className="transition-colors hover:text-accent">
                      {founder.phone}
                    </a>
                  </li>
                  <li className="flex items-center gap-3">
                    <Mail className="size-4 shrink-0 text-accent" strokeWidth={1.5} aria-hidden />
                    <span className="text-nera-cream/70">{bureau.fondateur.emailLabel} :</span>
                    <a href={`mailto:${founder.email}`} className="transition-colors hover:text-accent">
                      {founder.email}
                    </a>
                  </li>
                </ul>
              </Reveal>
            </div>
          </Container>
        </section>

        {/* 4. L'équipe — crème. Photo à gauche, texte et huit domaines à droite. */}
        <section id={bureau.equipe.id} className="scroll-mt-24 bg-canvas py-20 lg:py-28">
          <Container wide>
            <div className="grid gap-12 lg:grid-cols-[5fr_7fr] lg:items-center lg:gap-20">
              <ImageWipe curtain="bg-canvas" className="aspect-[4/3] rounded-md lg:aspect-[4/5]">
                <Image
                  src={bureau.equipe.image}
                  alt="Trois personnes réunies autour d’un plan d’étage lors d’une séance de travail"
                  fill
                  quality={90}
                  sizes="(min-width: 1024px) 40vw, 100vw"
                  className="object-cover saturate-[0.85]"
                />
              </ImageWipe>
              <Reveal {...aosBlock}>
                <SectionHeading eyebrow="Équipe" title={bureau.equipe.title} />
                <p className="mt-6 text-body-md font-light leading-[1.75] text-body md:text-body-lg">{bureau.equipe.intro}</p>
                <p className="mt-6 text-body-md text-body">{bureau.equipe.lead}</p>
                <ul className="mt-5 grid gap-x-8 gap-y-2.5 sm:grid-cols-2">
                  {bureau.equipe.items.map((item) => (
                    <li key={item} className="flex gap-3 text-body-md leading-[1.6] text-body">
                      <span className="mt-[0.65em] size-1.5 shrink-0 bg-accent" aria-hidden />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-8 border-l-2 border-accent pl-5 text-body-md leading-[1.7] text-nera-navy">{bureau.equipe.outro}</p>
              </Reveal>
            </div>
          </Container>
        </section>

        {/* 5. Les procédures — blanc. */}
        <section id={bureau.procedures.id} className="scroll-mt-24 border-t border-hairline bg-canvas-alt py-20 lg:py-28">
          <Container wide>
            <div className="grid gap-12 lg:grid-cols-[5fr_7fr] lg:gap-20">
              <Reveal {...aosBlock}>
                <SectionHeading eyebrow="Procédures" title={bureau.procedures.title} />
              </Reveal>
              <Reveal {...aosBlock} className="max-w-2xl lg:pt-2">
                <p className="text-body-md font-light leading-[1.75] text-body md:text-body-lg">{bureau.procedures.intro}</p>
                <ol className="mt-8">
                  {bureau.procedures.items.map((item, i, all) => (
                    <li key={item} className="relative flex gap-5 pb-6 last:pb-0">
                      {i < all.length - 1 && <span className="absolute bottom-0 left-[15px] top-9 w-px bg-hairline" aria-hidden />}
                      <span className="relative z-10 flex size-8 shrink-0 items-center justify-center border border-nera-navy/25 bg-canvas-alt font-display text-[13px] font-medium text-nera-navy">
                        {i + 1}
                      </span>
                      <p className="pt-1.5 text-body-md leading-[1.6] text-body">{item}</p>
                    </li>
                  ))}
                </ol>
              </Reveal>
            </div>
          </Container>
        </section>

        {/*
          6. Les qualifications — creme. Le titre et les logos officiels restent epingles a
          gauche pendant que les quatre cartes defilent a droite, comme le panneau collant de
          `/prestations`. `position: sticky` suffit ici : rien a calculer en JS, le bloc se
          decroche tout seul quand la colonne de droite est epuisee. Sous `lg`, pas de colonne
          collante : tout s'empile dans l'ordre de lecture.
          L'icone passe en haut a droite de chaque carte, a la taille d'un reperage, pas d'une
          puce.
        */}
        <section id={bureau.qualifications.id} className="scroll-mt-24 bg-canvas py-20 lg:py-28">
          <Container wide>
            <div className="grid gap-10 lg:grid-cols-[5fr_7fr] lg:items-start lg:gap-16">
              <div className="lg:sticky lg:top-28">
                <Reveal {...aosBlock}>
                  <SectionHeading eyebrow="Qualifications" title={bureau.qualifications.title} />
                </Reveal>
                {/* Les logos officiels accompagnent le titre : ils restent en vue pendant le defile. */}
                <Reveal {...aosItem} className="mt-10 border-t border-hairline pt-10">
                  {/* Centrés tant que la colonne occupe toute la largeur ; alignés sur le titre dès que la colonne devient collante. */}
                  <PartnerLogos justify="justify-center lg:justify-start" />
                </Reveal>
              </div>

              <ul className="grid gap-4 lg:gap-5">
                {bureau.qualifications.items.map((q, i) => {
                  const Icon = qualificationIcons[i % qualificationIcons.length];
                  return (
                    <Reveal
                      as="li"
                      key={q.title}
                      {...aosItem}
                      className="group relative overflow-hidden rounded-md border border-hairline bg-canvas-alt p-7 transition-all duration-300 hover:border-accent hover:shadow-md lg:p-8"
                    >
                      <div className="flex items-start justify-between gap-6">
                        <div className="min-w-0 flex-1">
                          <h3 className="font-display text-[1.1875rem] font-medium leading-[1.25] text-nera-navy transition-colors duration-300 group-hover:text-accent">
                            {q.title}
                          </h3>
                          {q.text.map((t) => (
                            <p key={t} className="mt-3 text-body-sm leading-[1.7] text-body">
                              {t}
                            </p>
                          ))}
                        </div>
                        <div className="shrink-0 transition-transform duration-300 ease-out group-hover:scale-115 group-hover:-translate-y-1.5 group-hover:rotate-2">
                          <Icon className="size-14 lg:size-16" />
                        </div>
                      </div>
                    </Reveal>
                  );
                })}
              </ul>
            </div>
          </Container>
        </section>

        {/*
          7. Les valeurs — la bande touche les deux bords de l'ecran et le bas de la section :
          le titre reste dans le conteneur, mais la liste en sort et ne porte ni gouttiere, ni
          bordure, ni arrondi. Le fond s'eclaircit de gauche a droite, du marine fonce au blanc.
          Les cellules d'une grille s'etirent a la hauteur de la plus haute : les cinq
          rectangles restent donc de meme hauteur sans hauteur fixe. Sous `lg`, ils s'empilent.
          Seule cascade du site, demandee par le client : 120 ms d'ecart entre les panneaux, qui
          apparaissent donc de gauche a droite. Ailleurs, les elements d'un meme groupe
          apparaissent ensemble, comme chez hestera.
          Les intitules sont en capitales espacees, comme la reference — seul endroit du site
          ou un titre est en capitales, ce que `DESIGN.md` proscrit ailleurs.
        */}
        <section
          id={bureau.valeurs.id}
          className="scroll-mt-24 border-t border-hairline bg-canvas-alt pt-20 lg:pt-28"
        >
          <Container wide>
            <Reveal {...aosBlock} className="max-w-3xl">
              <SectionHeading eyebrow="Valeurs" title={bureau.valeurs.title} />
            </Reveal>
          </Container>

          <ul className="mt-12 grid lg:mt-16 lg:grid-cols-5">
            {bureau.valeurs.items.map((v, i) => {
              const panel = valeurPanels[i];
              return (
                <Reveal
                  as="li"
                  key={v.title}
                  {...aosItem}
                  delay={i * 0.12}
                  className={`flex min-h-[15rem] flex-col justify-center px-6 py-14 text-center lg:min-h-[19rem] lg:px-8 ${panel.bg}`}
                >
                  <h3
                    className={`font-display text-[1.0625rem] font-medium uppercase leading-[1.25] tracking-[0.2em] ${panel.title}`}
                  >
                    {v.title}
                  </h3>
                  <p className={`mx-auto mt-6 max-w-[28ch] text-body-sm leading-[1.8] ${panel.text}`}>{v.text}</p>
                </Reveal>
              );
            })}
          </ul>
        </section>

        {/* 8. NERA en chiffres — marine, section de l'accueil avec les libellés de cette page. */}
        <Stats id={bureau.chiffres.id} items={bureau.chiffres.items} />

        {/* 9. Six cantons — crème, section de l'accueil avec le H2 de cette page. */}
        <Territory
          id={bureau.cantons.id}
          title={
            <>
              Une présence dans <span className="font-medium text-accent-deep">six cantons romands</span>
            </>
          }
          text={bureau.cantons.text}
        />

        {/* 10. Rencontrons-nous — marine, deux CTA du client. */}
        <section className="bg-nera-navy-deep bg-blueprint py-20 text-nera-cream lg:py-28">
          <Container wide>
            <Reveal className="max-w-3xl">
              <h2 className="font-display text-[1.75rem] font-light leading-[1.2] text-nera-cream md:text-[2.5rem]">
                {bureau.closing.title}
              </h2>
              <ArrowQuoteButton className="mt-10">{bureau.closing.secondary}</ArrowQuoteButton>
            </Reveal>
          </Container>
        </section>
      </main>
      <FooterDark />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  );
}
