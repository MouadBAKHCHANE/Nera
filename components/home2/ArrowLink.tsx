import Link from "next/link";
import { ArrowRight } from "lucide-react";

/**
 * Lien fléché, direction hestera.ch : filet au-dessus qui, au survol, se retire vers la
 * droite puis revient depuis la gauche (1 s), pendant que le lien s'allonge et que la flèche glisse.
 * Styles `.arrow-link` dans globals.css.
 */
export function ArrowLink({
  href,
  children,
  tone = "light",
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  tone?: "light" | "dark";
  className?: string;
}) {
  const tones = {
    light: "arrow-link--light text-nera-cream hover:text-accent",
    dark: "arrow-link--dark text-nera-navy hover:text-accent-deep",
  };
  return (
    <Link
      href={href}
      className={`arrow-link group relative inline-flex min-w-[220px] items-center justify-between gap-6 pt-4 text-[15px] font-medium transition-[color,padding] duration-300 hover:pr-3 ${tones[tone]} ${className}`}
    >
      {children}
      <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1.5" strokeWidth={1.75} />
    </Link>
  );
}
