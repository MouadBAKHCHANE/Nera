import { PartnerLogos } from "@/components/ui/PartnerLogos";

/**
 * Bandeau « Certifications et partenaires », sur fond blanc : les logos officiels y posent
 * directement, sans la tuile blanche qu'il fallait leur mettre sur le marine du pied de page.
 *
 * Il vivait dans `FooterDark` ; le client l'a voulu juste apres la section « Territoire » de
 * l'accueil. Il a donc quitte le pied de page de toutes les pages : sur `/bureau` les memes
 * logos figurent deja dans « Nos qualifications », et sur `/references` dans leur propre
 * bandeau.
 */
export function PartnerStrip() {
  return (
    <section className="bg-nera-white px-6 py-10 md:px-10 lg:px-[120px] lg:py-12">
      <p className="text-center text-[12px] font-medium uppercase tracking-[0.3em] text-mute">
        Certifications et partenaires
      </p>
      <PartnerLogos className="mt-6" />
    </section>
  );
}
