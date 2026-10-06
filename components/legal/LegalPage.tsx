import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { HeaderDark } from "@/components/home2/HeaderDark";
import { FooterDark } from "@/components/home2/FooterDark";
import { Container } from "@/components/ui/Container";
import { PortableText, type PortableTextComponents } from "@portabletext/react";
import { CookieChoice } from "./CookieChoice";
import type { LegalPortable, PtBlock, PtNote, PtTable } from "@/lib/legal/portable";
import type { LegalPageView } from "@/lib/sanity/legal";
import { seo } from "@/content/seo";
import { getSiteSettings } from "@/lib/sanity/settings";

/** Numéro du document source, formaté pour le titre de section. */
const label = (num: number | undefined, title: string) => (num ? `${num}. ${title}` : title);

const linkStyle = "underline underline-offset-2 decoration-hairline transition-colors hover:text-accent-deep";

/** Liens du texte : internes par `next/link`, e-mail, téléphone et externes par une ancre simple. */
const marks: PortableTextComponents["marks"] = {
  link: ({ value, children }) => {
    const href: string = value?.href ?? "#";
    return href.startsWith("/") ? (
      <Link href={href} className={linkStyle}>
        {children}
      </Link>
    ) : (
      <a
        href={href}
        className={linkStyle}
        {...(href.startsWith("https://") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {children}
      </a>
    );
  },
};

/** Texte d'un encadré : paragraphes plus petits, comme dans le document source. */
const noteComponents: PortableTextComponents = {
  block: { normal: ({ children }) => <p className="mt-2 text-body-sm leading-[1.7] text-body">{children}</p> },
  marks,
};

/**
 * Rendu du texte riche de Sanity. Mêmes classes que l'ancien rendu du code, bloc pour bloc :
 * la migration vers Sanity ne change rien à l'affichage.
 */
const components: PortableTextComponents = {
  block: {
    normal: ({ children }) => <p className="mt-4 text-body-md leading-[1.75] text-body first:mt-0">{children}</p>,
    // Bloc d'adresse : les retours à la ligne du Studio deviennent des <br>.
    lines: ({ children }) => <p className="mt-4 text-body-md leading-[1.9] text-body first:mt-0">{children}</p>,
  },
  list: { bullet: ({ children }) => <ul className="mt-4 space-y-2 first:mt-0">{children}</ul> },
  listItem: {
    bullet: ({ children }) => (
      <li className="flex gap-3 text-body-md leading-[1.75] text-body">
        <span className="mt-[0.7em] size-1.5 shrink-0 bg-accent" aria-hidden />
        <span>{children}</span>
      </li>
    ),
  },
  marks,
  types: {
    legalTable: ({ value }: { value: PtTable }) => (
      <div className="mt-6 overflow-x-auto">
        <table className="w-full min-w-[32rem] border-collapse text-left text-body-sm">
          <thead>
            <tr className="border-b border-nera-navy/25">
              {(value.head ?? []).map((h, k) => (
                <th key={k} className="py-2.5 pr-6 text-[12px] font-medium uppercase tracking-[0.14em] text-nera-navy">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {(value.rows ?? []).map((row) => (
              <tr key={row._key} className="border-b border-hairline">
                {(row.cells ?? []).map((cell, k) => (
                  <td key={k} className="py-3 pr-6 align-top text-body">
                    {k === 0 ? <code className="text-nera-navy">{cell}</code> : cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    ),
    legalNote: ({ value }: { value: PtNote }) => (
      <div className="mt-6 border-l-2 border-accent bg-nera-green-soft/50 px-5 py-4">
        <p className="text-body-sm font-medium text-nera-navy">{value.title}</p>
        <PortableText value={(value.body ?? []) as PtBlock[]} components={noteComponents} />
      </div>
    ),
    consentReminder: () => <CookieChoice />,
  },
};

function Body({ value }: { value: LegalPortable[] }) {
  return <PortableText value={value} components={components} />;
}

/**
 * Gabarit partagé des trois pages légales : bandeau marine (fil d'Ariane, H1, date de
 * mise à jour), sommaire, puis prose sur fond crème. Le contenu vient du Studio Sanity
 * (`lib/sanity/legal.ts`) et n'est jamais reformulé ici.
 */
export async function LegalPage({ page: doc }: { page: LegalPageView }) {
  const { company } = await getSiteSettings();
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Accueil", item: `${seo.siteUrl}/` },
      { "@type": "ListItem", position: 2, name: doc.shortTitle, item: `${seo.siteUrl}${doc.route}` },
    ],
  };

  return (
    <>
      <HeaderDark />
      <main>
        <header className="bg-nera-navy-deep bg-blueprint pb-14 pt-[104px] text-nera-cream lg:pb-20 lg:pt-[132px]">
          <Container wide className="mx-auto max-w-3xl">
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
                  {doc.shortTitle}
                </li>
              </ol>
            </nav>

            <p className="mt-6 flex items-center gap-4 text-[13px] font-medium uppercase tracking-[0.25em] text-nera-cream/80">
              <span className="h-2 w-7 shrink-0 bg-accent" aria-hidden />
              Informations légales
            </p>

            <h1 className="mt-6 font-display text-[1.75rem] font-light leading-[1.2] text-nera-cream md:text-[2.5rem]">
              {doc.title}
            </h1>

            {doc.lead && <p className="mt-5 max-w-[52ch] text-body-md font-light text-nera-cream/80">{doc.lead}</p>}

            <p className="mt-6 text-body-sm font-light text-nera-cream/60">
              Dernière mise à jour : <time dateTime={doc.updatedIso}>{doc.updatedLabel}</time>
            </p>
          </Container>
        </header>

        <div className="py-section-sm lg:py-section">
          <Container wide className="mx-auto max-w-3xl">
            <nav aria-labelledby="sommaire" className="border-y border-hairline py-6">
              <h2 id="sommaire" className="text-[12px] font-medium uppercase tracking-[0.2em] text-nera-navy">
                Sommaire
              </h2>
              <ol className="mt-4 grid gap-x-8 gap-y-1.5 sm:grid-cols-2">
                {doc.sections.map((s) => (
                  <li key={s.key}>
                    <a href={`#${s.id}`} className="text-body-sm text-body transition-colors hover:text-accent-deep">
                      {label(s.num, s.title)}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>

            {doc.sections.map((s) => (
              <section key={s.key} id={s.id} className="mt-12 scroll-mt-28 first:mt-10">
                <h2 className="font-display text-display-sm text-nera-navy">{label(s.num, s.title)}</h2>
                <div className="mt-4">
                  <Body value={s.body} />
                </div>
              </section>
            ))}

            <p className="mt-14 border-t border-hairline pt-6 text-body-sm text-mute">
              Une question sur ce document ? Écrivez-nous à{" "}
              <a
                href={`mailto:${company.email}`}
                className="underline underline-offset-2 transition-colors hover:text-accent-deep"
              >
                {company.email}
              </a>
              .
            </p>
          </Container>
        </div>
      </main>
      <FooterDark />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
    </>
  );
}
