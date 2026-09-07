import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { company } from "@/content/prestations";

const audiences = [
  { title: "Architectes", text: "Justificatifs thermiques, conception CVC, labels : un partenaire technique dès l'esquisse." },
  { title: "Promoteurs et régies", text: "Audits de parc, stratégies de rénovation, subventions et pilotage des travaux." },
  { title: "Installateurs", text: "Dimensionnement, dossiers d'autorisation et appui technique sur vos chantiers." },
  { title: "Collectivités et fondations", text: "Expertise indépendante pour les bâtiments publics et le patrimoine." },
  { title: "Particuliers", text: "CECB, rénovation énergétique et subventions pour votre maison ou votre immeuble." },
];

/**
 * Cibles B2B du cahier des charges + bandeau certifications (texte tant que
 * les logos officiels CECB Expert et Minergie ne sont pas fournis).
 */
export function Audience() {
  return (
    <section className="bg-canvas-alt py-section-sm lg:py-section">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[4fr_8fr] lg:gap-16">
          <Reveal>
            <Eyebrow>Pour qui</Eyebrow>
            <h2 className="mt-6 text-display-md md:text-display-lg">Un interlocuteur fiable pour chaque acteur du bâtiment</h2>
            <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2">
              {company.credentials.map((c) => (
                <li key={c} className="flex items-center gap-2 text-body-sm font-medium text-nera-navy">
                  <span className="size-1.5 rounded-full bg-accent" aria-hidden />
                  {c}
                </li>
              ))}
            </ul>
          </Reveal>
          <ul className="divide-y divide-hairline border-y border-hairline">
            {audiences.map((a, i) => (
              <Reveal as="li" key={a.title} delay={i * 0.05} className="grid gap-2 py-6 md:grid-cols-[minmax(0,240px)_1fr] md:gap-8">
                <h3 className="text-display-sm">{a.title}</h3>
                <p className="text-body-md text-body">{a.text}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
