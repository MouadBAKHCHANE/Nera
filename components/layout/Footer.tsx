import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { navigation } from "@/content/navigation";
import { prestations, company } from "@/content/prestations";

const legal = [
  { label: "Mentions légales", href: "/mentions-legales" },
  { label: "Confidentialité", href: "/confidentialite" },
  { label: "Cookies", href: "/cookies" },
];

export function Footer() {
  return (
    <footer className="border-t border-hairline bg-canvas">
      <Container className="grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-[5fr_2fr_3fr_3fr] lg:py-20">
        <div>
          <Image src="/logos/nera-tagline-navy-green.svg" alt={company.shortName} width={220} height={57} style={{ height: 52, width: "auto" }} />
          <p className="mt-6 max-w-xs text-body-sm text-body">
            Bureau d&apos;ingénieurs conseils en énergie, physique du bâtiment et CVC. Genève et Suisse romande.
          </p>
        </div>

        <div>
          <p className="text-eyebrow font-medium uppercase text-mute">Navigation</p>
          <ul className="mt-4 space-y-2.5">
            {navigation.map((n) => (
              <li key={n.href}>
                <Link href={n.href} className="text-body-sm text-nera-ink transition-colors hover:text-accent-deep">{n.label}</Link>
              </li>
            ))}
            <li>
              <Link href="/contact" className="text-body-sm text-nera-ink transition-colors hover:text-accent-deep">Contact</Link>
            </li>
          </ul>
        </div>

        <div>
          <p className="text-eyebrow font-medium uppercase text-mute">Prestations</p>
          <ul className="mt-4 space-y-2.5">
            {prestations.map((p) => (
              <li key={p.slug}>
                <Link href={`/prestations/${p.slug}`} className="text-body-sm text-nera-ink transition-colors hover:text-accent-deep">{p.title}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-eyebrow font-medium uppercase text-mute">Contact</p>
          <address className="mt-4 space-y-2.5 not-italic text-body-sm text-nera-ink">
            <p>{company.name}<br />{company.street}<br />{company.zip} {company.city}</p>
            <p><a href={company.phoneHref} className="transition-colors hover:text-accent-deep">{company.phone}</a></p>
            <p><a href={`mailto:${company.email}`} className="transition-colors hover:text-accent-deep">{company.email}</a></p>
            <p><a href={company.linkedin} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-accent-deep">LinkedIn</a></p>
          </address>
        </div>
      </Container>

      <div className="border-t border-hairline">
        <Container className="flex flex-wrap items-center justify-between gap-3 py-5 text-body-sm text-mute">
          <span>© {new Date().getFullYear()} {company.name}</span>
          <ul className="flex flex-wrap gap-5">
            {legal.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="transition-colors hover:text-nera-navy">{l.label}</Link>
              </li>
            ))}
          </ul>
        </Container>
      </div>
    </footer>
  );
}
