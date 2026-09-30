/**
 * Événements de conversion du site, envoyés par les formulaires et les liens d'appel.
 *
 * Les composants ne connaissent aucun outil ni identifiant : ils émettent un événement du
 * navigateur, que `Tracking` relaie vers les outils effectivement chargés, donc acceptés par
 * le visiteur. Sans consentement, l'événement se perd, et c'est voulu.
 */

export type ConversionEvent = "devis_envoye" | "contact_envoye" | "clic_telephone" | "clic_email";

export const TRACK_EVENT = "nera:track";

export function trackEvent(name: ConversionEvent) {
  window.dispatchEvent(new CustomEvent<ConversionEvent>(TRACK_EVENT, { detail: name }));
}
