import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { ServicesList } from "@/components/sections/ServicesList";
import { Mission } from "@/components/sections/Mission";
import { Process } from "@/components/sections/Process";
import { Audience } from "@/components/sections/Audience";
import { CtaBand } from "@/components/sections/CtaBand";

export default function Home() {
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
