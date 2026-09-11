import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Container } from "@/components/ui/Container";
import { QuoteForm } from "@/components/quote/QuoteForm";

/** Page de repli du formulaire de devis (lien direct, sans JavaScript du pop-up). */
export const metadata: Metadata = {
  title: "Demander un devis gratuit",
  description: "Demande de devis gratuit et sans engagement : CECB, physique du bâtiment, CVC, autorisations, subventions, rénovation énergétique. Réponse sous 48 heures ouvrées.",
};

export default function DevisPage() {
  return (
    <>
      <Header />
      <main className="py-section-sm lg:py-section">
        <Container wide className="mx-auto max-w-3xl">
          <p className="flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.2em] text-accent-deep">
            <span className="h-2 w-7 bg-accent" aria-hidden />
            Devis gratuit
          </p>
          <h1 className="mt-4 text-display-md md:text-display-lg">Votre devis gratuit</h1>
          <p className="mt-4 max-w-xl text-body-lg text-body">
            Quelques informations sur votre bâtiment et votre projet suffisent. Nous revenons vers vous avec une proposition
            adaptée.
          </p>
          <div className="mt-10 rounded-md border border-hairline bg-canvas-alt p-6 sm:p-8">
            <QuoteForm />
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
}
