import { Container } from "@/components/ui/Container";
import { company } from "@/content/prestations";

/**
 * Bandeau de confiance sous le héro. Texte seul tant que les logos officiels
 * CECB Expert et Minergie Partenaire spécialiste ne sont pas fournis par le client.
 */
export function Credentials() {
  return (
    <div className="border-b border-hairline bg-canvas-alt">
      <Container className="flex flex-wrap items-center gap-x-10 gap-y-3 py-5">
        <span className="text-eyebrow font-medium uppercase text-mute">Certifications</span>
        <ul className="flex flex-wrap items-center gap-x-8 gap-y-2">
          {company.credentials.map((c) => (
            <li key={c} className="flex items-center gap-2.5 text-body-sm font-medium text-nera-navy">
              <span className="size-1.5 rounded-full bg-accent" aria-hidden />
              {c}
            </li>
          ))}
        </ul>
      </Container>
    </div>
  );
}
