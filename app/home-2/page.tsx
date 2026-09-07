import type { Metadata } from "next";
import { HeaderDark } from "@/components/home2/HeaderDark";
import { HeroDark } from "@/components/home2/HeroDark";
import { ServicePanels } from "@/components/home2/ServicePanels";
import { AboutDark } from "@/components/home2/AboutDark";
import { Values } from "@/components/home2/Values";
import { Certifications } from "@/components/home2/Certifications";
import { ContactDark } from "@/components/home2/ContactDark";
import { FooterDark } from "@/components/home2/FooterDark";

/**
 * Variante d'accueil « Home 2 », direction hestera.ch : plein écran sombre,
 * capitales espacées, panneaux de prestations, valeurs en damier, contact intégré.
 * Route de comparaison pour le client. Non indexée.
 */
export const metadata: Metadata = {
  title: "Accueil, variante 2",
  robots: { index: false, follow: false },
};

export default function Home2() {
  return (
    <>
      <HeaderDark />
      <main>
        <HeroDark />
        <ServicePanels />
        <AboutDark />
        <Values />
        <Certifications />
        <ContactDark />
      </main>
      <FooterDark />
    </>
  );
}
