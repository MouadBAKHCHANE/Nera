import Image from "next/image";
import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { company } from "@/content/prestations";
import { footerTagline, footerPrestations, footerBureau, footerLegal, mapsHref } from "@/content/footer";
import { prestationsIndexRoute } from "@/content/prestation-pages";
import { CookiePrefsButton } from "@/components/ui/CookiePrefsButton";
import { SocialLinks } from "@/components/ui/SocialLinks";
import { PartnerLogos } from "@/components/ui/PartnerLogos";

const link = "text-body-sm text-nera-ink transition-colors hover:text-accent-deep";
const head = "text-eyebrow font-medium uppercase text-mute";
const row = "flex items-center justify-center gap-3 transition-colors hover:text-accent-deep lg:justify-start";

/**
 * Pied de page clair (variante d'accueil claire).
 * Mobile : tout centré. Tablette : marque + coordonnées centrées, menus à gauche et à droite,
 * icônes sociales centrées, liens légaux puis copyright. Desktop : trois colonnes, icônes sous Contact.
 */
export function Footer() {
  return (
    <footer className="border-t border-hairline bg-canvas">
      <Container wide className="grid gap-10 py-14 text-center md:grid-cols-[auto_auto] md:justify-center md:gap-x-24 lg:grid-cols-[6fr_3fr_3fr] lg:py-20 lg:text-left">
        <div className="flex flex-col items-center md:col-span-2 lg:col-span-1 lg:items-start">
          <Image src="/logos/nera-tagline-navy-green.svg" alt={company.shortName} width={220} height={57} style={{ height: 52, width: "auto" }} />
          <p className="mt-6 max-w-xs text-body-sm text-body">{footerTagline}</p>
          <address className="mt-6 space-y-3 not-italic text-body-sm text-nera-ink">
            <a href={mapsHref} target="_blank" rel="noopener noreferrer" className={`${row} items-start`}>
              <MapPin className="mt-0.5 size-4 shrink-0 text-accent" strokeWidth={1.5} />
              <span className="text-left">
                {company.street}
                <br />
                {company.zip} {company.city}
              </span>
            </a>
            <a href={company.phoneHref} className={row}>
              <Phone className="size-4 shrink-0 text-accent" strokeWidth={1.5} />
              {company.phone}
            </a>
            <a href={`mailto:${company.email}`} className={row}>
              <Mail className="size-4 shrink-0 text-accent" strokeWidth={1.5} />
              {company.email}
            </a>
          </address>
        </div>

        <div className="md:text-left">
          <p className={head}>Prestations</p>
          <ul className="mt-4 space-y-2.5">
            {/* L'index en tête de liste, au même style que les six prestations. */}
            <li>
              <Link href={prestationsIndexRoute} className={link}>Toutes les prestations</Link>
            </li>
            {footerPrestations.map((p) => (
              <li key={p.href}>
                <Link href={p.href} className={link}>{p.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:text-right lg:text-left">
          <p className={head}>Le bureau</p>
          <ul className="mt-4 space-y-2.5">
            {footerBureau.map((b) => (
              <li key={b.href}>
                <Link href={b.href} className={link}>{b.label}</Link>
              </li>
            ))}
          </ul>
          <SocialLinks tone="dark" className="mt-4 hidden md:flex md:justify-end lg:-ml-2.5 lg:justify-start" />
        </div>

        <div className="flex justify-center md:hidden">
          <SocialLinks tone="dark" />
        </div>
      </Container>

      <div className="border-t border-hairline">
        <Container wide className="py-8">
          <p className="text-center text-eyebrow font-medium uppercase text-mute">Certifications et partenaires</p>
          <PartnerLogos className="mt-5" />
        </Container>
      </div>

      <div className="border-t border-hairline">
        <Container wide className="flex flex-col items-center gap-3 py-5 text-center text-body-sm text-mute lg:flex-row lg:justify-between lg:text-left">
          <ul className="order-1 flex flex-wrap justify-center gap-x-5 gap-y-2 lg:order-2">
            {footerLegal.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="transition-colors hover:text-nera-navy">{l.label}</Link>
              </li>
            ))}
            <li>
              <CookiePrefsButton className="cursor-pointer transition-colors hover:text-nera-navy" />
            </li>
          </ul>
          <p className="order-2 lg:order-1">© {new Date().getFullYear()} {company.name}. Tous droits réservés.</p>
        </Container>
      </div>
    </footer>
  );
}
