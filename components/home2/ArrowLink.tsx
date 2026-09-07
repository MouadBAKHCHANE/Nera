import Link from "next/link";
import { ArrowRight } from "lucide-react";

/**
 * Lien fléché hestera : texte 16px Medium, filet fin au-dessus, flèche à droite qui glisse au survol.
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
    light: "border-nera-cream/50 text-nera-cream hover:border-nera-cream",
    dark: "border-nera-navy/40 text-nera-navy hover:border-nera-navy",
  };
  return (
    <Link
      href={href}
      className={`group inline-flex min-w-[220px] items-center justify-between gap-6 border-t pt-4 text-[15px] font-medium transition-colors duration-base ${tones[tone]} ${className}`}
    >
      {children}
      <ArrowRight className="size-4 transition-transform duration-base group-hover:translate-x-1.5" strokeWidth={1.75} />
    </Link>
  );
}
