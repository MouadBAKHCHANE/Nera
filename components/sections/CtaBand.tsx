import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { company } from "@/content/prestations";

export function CtaBand() {
  return (
    <section className="bg-canvas py-section-sm lg:py-section">
      <Container>
        <Reveal className="mx-auto max-w-3xl text-center">
          <h2 className="text-display-md md:text-display-lg">Parlons de votre bâtiment avec un ingénieur</h2>
          <p className="mt-5 text-body-lg text-body">
            {company.founder.name}, {company.founder.titles}, vous répond directement.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button href="/contact" variant="accent">Nous contacter</Button>
            <Button href={company.phoneHref} variant="secondary">{company.phone}</Button>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
