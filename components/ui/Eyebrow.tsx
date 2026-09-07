/**
 * Étiquette de section (direction For Future) : petite pilule à filet, capitales espacées.
 * `tone="light"` sur fond marine.
 */
export function Eyebrow({
  children,
  tone = "dark",
  className = "",
}: {
  children: React.ReactNode;
  tone?: "dark" | "light";
  className?: string;
}) {
  const tones = {
    dark: "border-nera-navy/30 text-nera-navy",
    light: "border-nera-cream/40 text-nera-cream",
  };
  return (
    <span
      className={`inline-flex h-8 items-center rounded-full border px-4 text-eyebrow font-medium uppercase ${tones[tone]} ${className}`}
    >
      {children}
    </span>
  );
}
