import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { navPrestations } from "@/content/navigation";
import { PrestationIcon } from "@/components/ui/PrestationIcon";

/**
 * Méga-menu « Prestations » (direction i-neea.ch) : panneau avec, à gauche, une carte de
 * présentation du bureau et, à droite, les six prestations avec leur icône et une ligne de
 * description, puis le lien « Toutes les prestations ». `tone` : sombre (accueil) ou clair.
 */
export function PrestationsMenu({ tone = "dark" }: { tone?: "dark" | "light" }) {
  const dark = tone === "dark";
  const panel = dark ? "border-nera-cream/10 bg-nera-navy-deep text-nera-cream" : "border-hairline bg-canvas-alt text-nera-ink";
  const card = dark ? "bg-nera-navy/70" : "bg-canvas";
  const title = dark ? "text-nera-cream" : "text-nera-navy";
  const desc = dark ? "text-nera-cream/65" : "text-body";
  const hover = dark ? "hover:bg-nera-navy/60" : "hover:bg-canvas";
  const frame = dark ? "border-nera-cream/20 group-hover:border-accent" : "border-hairline group-hover:border-accent";

  return (
    // Le panneau est centré sous l'entrée de menu, qui n'est pas au centre de la page :
    // il reste plus étroit tant que la fenêtre ne dépasse pas 1280 px, sans quoi il touche
    // le bord gauche.
    <div className={`w-[min(88vw,780px)] rounded-md border p-4 shadow-[0_24px_60px_rgba(10,36,64,0.35)] xl:w-[880px] ${panel}`}>
      <div className="grid grid-cols-[200px_1fr] gap-4 xl:grid-cols-[224px_1fr]">
        {/* Carte de gauche : logo vertical en haut à gauche, lien « Toutes les prestations » en bas à gauche */}
        <div className={`flex flex-col justify-between rounded-sm p-5 ${card}`}>
          <Image
            src={dark ? "/logos/nera-vertical-cream-green.svg" : "/logos/nera-mark-green.svg"}
            alt="NERA"
            width={120}
            height={120}
            style={{ height: 72, width: "auto" }}
          />
          <Link
            href="/prestations"
            className={`group mt-8 inline-flex items-center gap-2 whitespace-nowrap text-[15px] font-semibold transition-colors hover:text-accent ${title}`}
          >
            Toutes les prestations
            <ArrowRight className="size-4 shrink-0 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={1.75} />
          </Link>
        </div>

        <ul className="grid grid-cols-2 gap-x-2 gap-y-1">
          {navPrestations.map((p) => (
            <li key={p.href}>
              <Link href={p.href} className={`group flex items-start gap-3.5 rounded-sm px-3.5 py-3 transition-colors ${hover}`}>
                <span
                  className={`mt-0.5 flex size-10 shrink-0 items-center justify-center rounded-sm border text-accent transition-colors duration-base ${frame}`}
                >
                  <PrestationIcon of={p.href} className="size-5" />
                </span>
                <span className="min-w-0">
                  <span className={`block text-[14.5px] font-semibold leading-snug ${title}`}>{p.label}</span>
                  <span className={`mt-1 block text-[13px] font-light leading-[1.45] ${desc}`}>{p.desc}</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
