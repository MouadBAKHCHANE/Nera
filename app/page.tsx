import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo/metadata";
import { Accent } from "@/components/ui/Accent";
import { getHomePage } from "@/lib/sanity/pages";
import { HeaderDark } from "@/components/home2/HeaderDark";
import { HeroDark } from "@/components/home2/HeroDark";
import { ServicePanels } from "@/components/home2/ServicePanels";
import { RenovationAZ } from "@/components/home2/RenovationAZ";
import { Audience2 } from "@/components/home2/Audience2";
import { Approach } from "@/components/home2/Approach";
import { Stats } from "@/components/home2/Stats";
import { Territory } from "@/components/home2/Territory";
import { PartnerStrip } from "@/components/home2/PartnerStrip";
import { ContactDark } from "@/components/home2/ContactDark";
import { FooterDark } from "@/components/home2/FooterDark";
import { getSiteSettings } from "@/lib/sanity/settings";

/** Accueil officiel : direction sombre et cinématographique, géométrie NERA. Sections et textes du client. */
export async function generateMetadata(): Promise<Metadata> {
  const home = await getHomePage();
  return pageMetadata({
    title: home.meta.title,
    description: home.meta.description,
    keywords: home.keywords,
    route: "/",
    image: home.shareImage,
    noIndex: home.noIndex,
  });
}

export default async function Home() {
  // Chiffres saisis dans le Studio ; sans saisie, `Stats` garde ses valeurs par défaut.
  const [{ stats }, home] = await Promise.all([getSiteSettings(), getHomePage()]);
  return (
    <>
      <HeaderDark />
      <main>
        <HeroDark hero={home.hero} />
        <ServicePanels services={home.services} />
        <RenovationAZ renovation={home.renovation} />
        <Audience2 audiences={home.audiences} />
        <Approach approach={home.approach} />
        <Stats items={stats.length ? stats : undefined} />
        <Territory
          title={<Accent text={home.territory.title} accent={home.territory.accent} className="font-medium text-accent-deep" />}
          text={home.territory.text}
        />
        <PartnerStrip />
        <ContactDark contact={home.contact} />
      </main>
      <FooterDark />
    </>
  );
}
