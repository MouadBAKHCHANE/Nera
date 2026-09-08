"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * Sur les écrans tactiles (pas de survol), pose `data-active` sur l'élément quand il est
 * majoritairement visible dans la fenêtre, et le retire quand il en sort. Les composants
 * utilisent `group-data-active:` en plus de `group-hover:` pour rejouer l'état de survol.
 * Sur desktop (survol disponible), ne fait rien.
 */
export function ActiveOnView({ children, className = "", threshold = 0.6 }: { children: ReactNode; className?: string; threshold?: number }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !window.matchMedia("(hover: none)").matches) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) el.setAttribute("data-active", "");
        else el.removeAttribute("data-active");
      },
      { threshold, rootMargin: "-10% 0px -10% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
