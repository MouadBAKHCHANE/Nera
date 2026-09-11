import Link from "next/link";
import { navPrestations } from "@/content/navigation";
import { PrestationIcon } from "@/components/ui/PrestationIcon";

/**
 * Méga-menu « Prestations » : les six prestations sur deux colonnes, chacune avec son icône et
 * une ligne de description. `tone` : sombre (accueil) ou clair.
 *
 * La carte de gauche — logo vertical et lien « Toutes les prestations » — a été retirée à la
 * demande du client, qui la jugeait inutile. Le lien vers `/prestations` reste dans le menu
 * sandwich et dans les deux pieds de page.
 */
export function PrestationsMenu({ tone = "dark" }: { tone?: "dark" | "light" }) {
  const dark = tone === "dark";
  const panel = dark ? "border-nera-cream/10 bg-nera-navy-deep text-nera-cream" : "border-hairline bg-canvas-alt text-nera-ink";
  const title = dark ? "text-nera-cream" : "text-nera-navy";
  const desc = dark ? "text-nera-cream/65" : "text-body";
  const hover = dark ? "hover:bg-nera-navy/60" : "hover:bg-canvas";
  const frame = dark ? "border-nera-cream/20 group-hover:border-accent" : "border-hairline group-hover:border-accent";

  return (
    // Le panneau est centré sous l'entrée de menu, qui n'est pas au centre de la page :
    // il reste plus étroit tant que la fenêtre ne dépasse pas 1280 px, sans quoi il touche
    // le bord gauche.
    <div className={`w-[min(88vw,720px)] rounded-md border p-3 shadow-[0_24px_60px_rgba(10,36,64,0.35)] xl:w-[780px] ${panel}`}>
      <ul className="grid grid-cols-2 gap-x-2 gap-y-1">
        {navPrestations.map((p) => (
          <li key={p.href}>
            <Link href={p.href} className={`group flex items-start gap-4 rounded-sm px-4 py-3.5 transition-colors ${hover}`}>
              <span
                className={`mt-0.5 flex size-11 shrink-0 items-center justify-center rounded-sm border text-accent transition-colors duration-base ${frame}`}
              >
                <PrestationIcon of={p.href} className="size-[22px]" />
              </span>
              <span className="min-w-0">
                <span className={`block text-[16px] font-semibold leading-snug ${title}`}>{p.label}</span>
                <span className={`mt-1.5 block text-[14px] font-light leading-[1.5] ${desc}`}>{p.desc}</span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
