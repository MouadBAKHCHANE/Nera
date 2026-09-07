import Link from "next/link";
import type { ReactNode } from "react";

type Variant = "primary" | "accent" | "secondary" | "ghost-light";

const base =
  "inline-flex h-12 items-center justify-center gap-2 rounded-sm px-[22px] text-[15px] font-medium leading-none transition-colors duration-base ease-out-quart";

const variants: Record<Variant, string> = {
  primary: "bg-nera-navy text-nera-cream hover:bg-nera-navy-deep",
  accent: "bg-accent text-white hover:bg-accent-deep",
  secondary: "border border-nera-navy text-nera-navy hover:bg-nera-navy-soft",
  "ghost-light": "border border-nera-cream/40 text-nera-cream hover:border-nera-cream hover:bg-nera-cream/10",
};

export function Button({
  href,
  children,
  variant = "primary",
  className = "",
}: {
  href: string;
  children: ReactNode;
  variant?: Variant;
  className?: string;
}) {
  return (
    <Link href={href} className={`${base} ${variants[variant]} ${className}`}>
      {children}
    </Link>
  );
}
