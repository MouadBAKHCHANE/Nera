import type { Metadata } from "next";
import { seo } from "@/content/seo";
import { HeaderDark } from "@/components/home2/HeaderDark";
import { HeroDark } from "@/components/home2/HeroDark";
import { ServicePanels } from "@/components/home2/ServicePanels";
import { RenovationAZ } from "@/components/home2/RenovationAZ";
import { Audience2 } from "@/components/home2/Audience2";
import { Approach } from "@/components/home2/Approach";
import { Stats } from "@/components/home2/Stats";
import { Territory } from "@/components/home2/Territory";
import { ContactDark } from "@/components/home2/ContactDark";
import { FooterDark } from "@/components/home2/FooterDark";

/** Accueil officiel : direction sombre et cinématographique, géométrie NERA. Sections et textes du client. */
export const metadata: Metadata = {
  title: { absolute: seo.title },
  description: seo.description,
  alternates: { canonical: "/" },
  openGraph: { title: seo.title, description: seo.description, url: "/" },
};

export default function Home() {
  return (
    <>
      <HeaderDark />
      <main>
        <HeroDark />
        <ServicePanels />
        <RenovationAZ />
        <Audience2 />
        <Approach />
        <Stats />
        <Territory />
        <ContactDark />
      </main>
      <FooterDark />
    </>
  );
}
