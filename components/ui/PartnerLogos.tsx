import Image from "next/image";

/**
 * Logos officiels, ré-exportés depuis `Assets/Logos officiels` à 160 px de haut, **fond
 * transparent**. Trois des cinq originaux avaient déjà un canal alpha ; le blanc de Minergie
 * et de REG a été retiré par remplissage depuis les bords, ce qui préserve le blanc intérieur
 * (contre-formes du sigle CECB, croix suisse de REG). Largeurs proportionnelles aux fichiers.
 *
 * Ils étaient posés sur des tuiles blanches, seul moyen de respecter leurs couleurs sur le
 * marine du pied de page. Plus de tuile ni de fond propre : **tous les emplacements doivent
 * rester sur fond clair** — sur du marine, ces logos en quadrichromie seraient illisibles.
 */
const partners = [
  { src: "/logos/partenaires/cecb-expert.png", alt: "CECB Expert", w: 874, href: "https://www.cecb.ch" },
  { src: "/logos/partenaires/minergie.png", alt: "Minergie", w: 595, href: "https://www.minergie.ch" },
  { src: "/logos/partenaires/reg.png", alt: "REG, Registre suisse des professionnels de l'ingénierie, de l'architecture et de l'environnement", w: 694, href: "https://www.reg.ch" },
  { src: "/logos/partenaires/programme-batiments.png", alt: "Le Programme Bâtiments", w: 678, href: "https://www.leprogrammebatiments.ch" },
  { src: "/logos/partenaires/epiqr.png", alt: "EPIQR", w: 378, href: "https://www.epiqr.ch" },
];

/**
 * L'alignement passe par `justify`, jamais par `className` : la classe de base n'en contient
 * aucun, sinon deux utilitaires `justify-*` sur le même élément se départageraient par l'ordre
 * de la feuille de style et non par celui de la chaîne. Les variantes de point de rupture sont
 * admises (`"justify-center lg:justify-start"`) : elles vivent dans des media queries
 * distinctes et ne se contredisent donc pas.
 */
export function PartnerLogos({
  className = "",
  justify = "justify-center",
}: {
  className?: string;
  justify?: string;
}) {
  return (
    <ul
      className={`flex flex-wrap items-center gap-3 md:gap-7 ${justify} ${className}`}
      aria-label="Certifications et partenaires"
    >
      {partners.map((p) => (
        <li key={p.src}>
          <a
            href={p.href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-10 items-center transition-opacity hover:opacity-80 md:h-14"
            title={p.alt}
          >
            <Image src={p.src} alt={p.alt} width={p.w} height={160} className="h-5 w-auto md:h-8" />
          </a>
        </li>
      ))}
    </ul>
  );
}
