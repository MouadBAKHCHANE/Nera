import Image from "next/image";
import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { company } from "@/content/prestations";
import { footerTagline, footerPrestations, footerBureau, footerLegal, mapsHref } from "@/content/footer";
import { CookiePrefsButton } from "@/components/ui/CookiePrefsButton";
import { SocialLinks } from "@/components/ui/SocialLinks";

const link = "text-body-sm text-nera-ink transition-colors hover:text-accent-deep";
const head = "text-eyebrow font-medium uppercase text-mute";

/**
 * Pied de page clair (accueil principal) : marque + accroche + réseaux + coordonnées cliquables,
 * prestations, le bureau, mentions légales.
 */
export function Footer() {
  return (
    <footer className="border-t border-hairline bg-canvas">
      <Container className="grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-[6fr_3fr_3fr] lg:py-20">
        <div>
          <Image src="/logos/nera-tagline-navy-green.svg" alt={company.shortName} width={220} height={57} style={{ height: 52, width: "auto" }} />
          <p className="mt-6 max-w-xs text-body-sm text-body">{footerTagline}</p>


          <address className="mt-6 space-y-3 not-italic text-body-sm text-nera-ink">
            <a href={mapsHref} target="_blank" rel="noopener noreferrer" className="flex items-start gap-3 transition-colors hover:text-accent-deep">
              <MapPin className="mt-0.5 size-4 shrink-0 text-accent" strokeWidth={1.5} />
              <span>
                {company.street}
                <br />
                {company.zip} {company.city}
              </span>
            </a>
            <a href={company.phoneHref} className="flex items-center gap-3 transition-colors hover:text-accent-deep">
              <Phone className="size-4 shrink-0 text-accent" strokeWidth={1.5} />
              {company.phone}
            </a>
            <a href={`mailto:${company.email}`} className="flex items-center gap-3 transition-colors hover:text-accent-deep">
              <Mail className="size-4 shrink-0 text-accent" strokeWidth={1.5} />
              {company.email}
            </a>
          </address>
        </div>

        <div>
          <p className={head}>Prestations</p>
          <ul className="mt-4 space-y-2.5">
            {footerPrestations.map((p) => (
              <li key={p.href}>
                <Link href={p.href} className={link}>{p.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className={head}>Le bureau</p>
          <ul className="mt-4 space-y-2.5">
            {footerBureau.map((b) =>
              b.external ? (
                <li key={b.href}>
                  <a href={b.href} target="_blank" rel="noopener noreferrer" className={link}>{b.label}</a>
                </li>
              ) : (
                <li key={b.href}>
                  <Link href={b.href} className={link}>{b.label}</Link>
                </li>
              ),
            )}
          </ul>
          <SocialLinks tone="dark" className="mt-4 -ml-2.5" />
        </div>

      </Container>

      <div className="border-t border-hairline">
        <Container className="flex flex-col items-center gap-3 py-5 text-body-sm text-mute md:flex-row md:justify-between">
          <p>© {new Date().getFullYear()} {company.name}. Tous droits réservés.</p>
          <ul className="flex flex-wrap justify-center gap-x-5 gap-y-2">
            {footerLegal.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="transition-colors hover:text-nera-navy">{l.label}</Link>
              </li>
            ))}
            <li>
              <CookiePrefsButton className="cursor-pointer transition-colors hover:text-nera-navy" />
            </li>
          </ul>
        </Container>
      </div>
    </footer>
  );
}
