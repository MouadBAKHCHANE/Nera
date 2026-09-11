import Image from "next/image";

/**
 * Logos officiels (Assets/Logos officiels), posés sur des tuiles blanches pour respecter
 * leurs couleurs d'origine sur fond sombre. Largeurs proportionnelles aux fichiers exportés (hauteur 160 px).
 */
const partners = [
  { src: "/logos/partenaires/cecb-expert.png", alt: "CECB Expert", w: 873, href: "https://www.cecb.ch" },
  { src: "/logos/partenaires/minergie.png", alt: "Minergie", w: 595, href: "https://www.minergie.ch" },
  { src: "/logos/partenaires/reg.png", alt: "REG, Registre suisse des professionnels de l'ingénierie, de l'architecture et de l'environnement", w: 694, href: "https://www.reg.ch" },
  { src: "/logos/partenaires/programme-batiments.png", alt: "Le Programme Bâtiments", w: 677, href: "https://www.leprogrammebatiments.ch" },
  { src: "/logos/partenaires/epiqr.png", alt: "EPIQR", w: 377, href: "https://www.epiqr.ch" },
];

/**
 * `align` plutôt qu'une classe `justify-*` passée dans `className` : deux utilitaires
 * `justify-*` dans la même chaîne se départagent par l'ordre de la feuille de style, pas par
 * celui de la chaîne — le résultat serait imprévisible.
 */
export function PartnerLogos({
  className = "",
  align = "center",
}: {
  className?: string;
  align?: "center" | "start";
}) {
  return (
    <ul
      className={`flex flex-wrap items-center gap-3 md:gap-7 ${align === "start" ? "justify-start" : "justify-center"} ${className}`}
      aria-label="Certifications et partenaires"
    >
      {partners.map((p) => (
        <li key={p.src}>
          <a
            href={p.href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-10 items-center rounded-sm bg-white px-2.5 transition-opacity hover:opacity-90 md:h-14 md:px-4"
            title={p.alt}
          >
            <Image src={p.src} alt={p.alt} width={p.w} height={160} className="h-5 w-auto md:h-8" />
          </a>
        </li>
      ))}
    </ul>
  );
}
