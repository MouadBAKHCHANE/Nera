/**
 * Consentement cookies : source unique de la clé de stockage, du type et des évènements.
 * Utilisé par le bandeau (CookieBanner) et par le rappel de choix de la page /cookies.
 */

export type Consent = {
  necessary: true;
  analytics: boolean;
  marketing: boolean;
  /** ISO 8601, date à laquelle le choix a été enregistré. */
  date: string;
};

export const CONSENT_KEY = "nera-cookie-consent";

/** Émis après chaque enregistrement d'un choix, avec le consentement en `detail`. */
export const CONSENT_SAVED = "nera:cookie-consent";

/** Demande l'ouverture du gestionnaire ; le bandeau l'annule pour signaler qu'il a répondu. */
export const CONSENT_OPEN = "nera:open-cookie-preferences";

export function readConsent(): Consent | null {
  try {
    const raw = localStorage.getItem(CONSENT_KEY);
    return raw ? (JSON.parse(raw) as Consent) : null;
  } catch {
    return null;
  }
}

export function writeConsent(c: Consent) {
  try {
    localStorage.setItem(CONSENT_KEY, JSON.stringify(c));
  } catch {}
  window.dispatchEvent(new CustomEvent<Consent>(CONSENT_SAVED, { detail: c }));
}

/**
 * Ouvre le gestionnaire de cookies. Renvoie `false` si aucun bandeau n'écoute
 * (l'appelant décide alors du repli).
 */
export function openConsentManager(): boolean {
  return !window.dispatchEvent(new CustomEvent(CONSENT_OPEN, { cancelable: true }));
}
