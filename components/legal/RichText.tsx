import Link from "next/link";
import type { ReactNode } from "react";

const PATTERN = /\[([^\]]+)\]\(([^)]+)\)/g;

/**
 * Rend le texte source en conservant chaque mot, en transformant seulement le balisage
 * `[libellé](cible)` en lien. Les cibles internes passent par `next/link`, les autres
 * (mailto:, tel:, http) par une ancre simple.
 */
export function RichText({ text, className = "" }: { text: string; className?: string }) {
  const nodes: ReactNode[] = [];
  let last = 0;
  let match: RegExpExecArray | null;

  PATTERN.lastIndex = 0;
  while ((match = PATTERN.exec(text)) !== null) {
    if (match.index > last) nodes.push(text.slice(last, match.index));
    const [, label, href] = match;
    const style = `underline underline-offset-2 decoration-hairline transition-colors hover:text-accent-deep ${className}`;
    nodes.push(
      href.startsWith("/") ? (
        <Link key={match.index} href={href} className={style}>
          {label}
        </Link>
      ) : (
        <a key={match.index} href={href} className={style}>
          {label}
        </a>
      ),
    );
    last = match.index + match[0].length;
  }
  if (last < text.length) nodes.push(text.slice(last));

  return <>{nodes}</>;
}
