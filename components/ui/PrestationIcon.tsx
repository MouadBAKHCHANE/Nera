import { Gauge, Thermometer, Wind, House, Award, FileCheck, Coins, type LucideIcon } from "lucide-react";
import { prestations, type Prestation } from "@/content/prestations";

/**
 * Table unique nom d'icône → composant Lucide. Le nom vient de `content/prestations.ts`,
 * qui reste la source des sept prestations. Charte : Lucide, trait 1.5, vert ou marine.
 */
const icons: Record<Prestation["icon"], LucideIcon> = {
  gauge: Gauge,
  thermometer: Thermometer,
  wind: Wind,
  house: House,
  award: Award,
  "file-check": FileCheck,
  coins: Coins,
};

/** Composant d'icône d'une prestation désignée par son slug ou par sa route. */
export function iconFor(slugOrHref: string): LucideIcon | null {
  const slug = slugOrHref.replace(/^\/prestations\//, "");
  const p = prestations.find((x) => x.slug === slug);
  return p ? icons[p.icon] : null;
}

/**
 * Icône d'une prestation. `of` accepte le slug (`subventions`) ou la route
 * (`/prestations/subventions`), pour être utilisable depuis les menus comme depuis
 * les listes de prestations.
 */
export function PrestationIcon({
  of,
  className = "size-6",
  strokeWidth = 1.5,
}: {
  of: string;
  className?: string;
  strokeWidth?: number;
}) {
  const Icon = iconFor(of);
  return Icon ? <Icon className={className} strokeWidth={strokeWidth} aria-hidden /> : null;
}
