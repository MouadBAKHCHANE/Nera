import { useSyncExternalStore } from "react";

/**
 * Préférence « réduire les animations » du système, à jour en direct, sans framer-motion.
 * Faux au rendu serveur, qui ne la connaît pas.
 */
const QUERY = "(prefers-reduced-motion: reduce)";

function subscribe(onChange: () => void) {
  const mq = window.matchMedia(QUERY);
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
}

export function usePrefersReducedMotion(): boolean {
  return useSyncExternalStore(subscribe, () => window.matchMedia(QUERY).matches, () => false);
}
