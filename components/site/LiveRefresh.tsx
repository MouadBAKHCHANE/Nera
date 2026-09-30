"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { apiVersion, dataset, projectId } from "@/lib/sanity/env";

/**
 * Mise à jour instantanée des pages ouvertes, à chaque publication dans le Studio.
 *
 * Écoute le flux public de la Live Content API de Sanity (Server-Sent Events, sans jeton :
 * le dataset est public, seules les publications y passent). À chaque événement, les
 * composants serveur de la page sont recalculés par `router.refresh()`, sans rechargement,
 * sans perdre le défilement ni l'état des composants client.
 *
 * Ce composant ne vide aucun cache : c'est le webhook `/api/revalidate` qui le fait, déclenché
 * par la même publication. D'où les deux rafraîchissements : le premier suffit presque
 * toujours, le second rattrape un webhook plus lent.
 *
 * Choisi plutôt que `<SanityLive>` de next-sanity : celui-ci impose tout le paquet `sanity` au
 * site, et ne garantit la mise à jour de tous les visiteurs qu'avec une Sanity Function en plus.
 * Ici, le webhook joue déjà ce rôle. L'origine du site doit figurer dans les CORS du projet.
 */
const LIVE_URL = `https://${projectId}.api.sanity.io/v${apiVersion}/data/live/events/${dataset}`;
const REFRESH_DELAYS_MS = [1200, 4000];

export function LiveRefresh() {
  const router = useRouter();

  useEffect(() => {
    let source: EventSource | null = null;
    let timers: ReturnType<typeof setTimeout>[] = [];
    let stopped = false;

    const refreshSoon = () => {
      timers.forEach(clearTimeout);
      timers = REFRESH_DELAYS_MS.map((ms) => setTimeout(() => router.refresh(), ms));
    };

    const open = () => {
      if (stopped || source) return;
      source = new EventSource(LIVE_URL);
      source.addEventListener("message", refreshSoon);
      // Position perdue dans le flux : on ne sait pas ce qui a changé, on rafraîchit.
      source.addEventListener("restart", refreshSoon);
      // Limite de connexions atteinte côté Sanity : on n'insiste pas.
      source.addEventListener("goaway", () => {
        stopped = true;
        close();
      });
    };

    const close = () => {
      source?.close();
      source = null;
    };

    // Une connexion seulement quand l'onglet est visible : pas de flux ouvert pour rien. Au
    // retour sur l'onglet, un rafraîchissement rattrape ce qui a pu être publié entre-temps.
    const onVisibility = () => {
      if (document.visibilityState === "visible") {
        open();
        router.refresh();
      } else {
        close();
      }
    };

    if (document.visibilityState === "visible") open();
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      stopped = true;
      document.removeEventListener("visibilitychange", onVisibility);
      timers.forEach(clearTimeout);
      close();
    };
  }, [router]);

  return null;
}
