import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { ServicesList } from "@/components/sections/ServicesList";
import { Mission } from "@/components/sections/Mission";
import { Process } from "@/components/sections/Process";
import { Audience } from "@/components/sections/Audience";
import { CtaBand } from "@/components/sections/CtaBand";

/** Variante claire de l'accueil (direction For Future), conservée pour comparaison. Non indexée. */
export const metadata: Metadata = {
  title: "Accueil, variante claire",
  robots: { index: false, follow: false },
};

export default function HomeLight() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <ServicesList />
        <Mission />
        <Process />
        <Audience />
        <CtaBand />
      </main>
      <Footer />
    </>
  );
}
