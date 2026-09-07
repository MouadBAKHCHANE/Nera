"use client";

/**
 * « Gérer mes cookies » : déclenche l'événement que le gestionnaire de consentement
 * écoutera (à brancher avec les pages légales). Sans gestionnaire, renvoie vers /cookies.
 */
export function CookiePrefsButton({ className = "" }: { className?: string }) {
  return (
    <button
      type="button"
      className={className}
      onClick={() => {
        const ev = new CustomEvent("nera:open-cookie-preferences", { cancelable: true });
        const handled = !window.dispatchEvent(ev);
        if (!handled) window.location.href = "/cookies";
      }}
    >
      Gérer mes cookies
    </button>
  );
}
