/**
 * Contenu de la page « Contact » (`/contact`), repris mot pour mot de
 * `content/source/textes-client.md` (lignes 781 à 800). Ne jamais reformuler : seules les
 * mentions de mise en page du document client (« H1 », « Bouton : », « Formulaire devis ? »)
 * ont été retirées, le texte restant intact.
 *
 * Consommé par `components/contact/ContactPage.tsx` et `app/contact/page.tsx`.
 */

export const contactRoute = "/contact";

export const contact = {
  meta: {
    title: "Contact NERA | Bureau d’ingénieurs à Genève",
    description:
      "Contactez NERA à Genève pour un CECB, une étude CVC, un dossier énergétique, des subventions ou une rénovation globale.",
  },
  /** Expression principale en tête, puis expressions secondaires. */
  keywords: [
    "contact bureau ingénieurs énergie Genève",
    "Devis CECB Genève",
    "Ingénieur bâtiment Genève",
    "bureau études CVC Genève",
    "rénovation énergétique devis",
  ],
  h1: "Contactez NERA Ingénieurs Conseils",
  lead: [
    "Vous avez besoin d’un CECB, d’une étude énergétique, d’un dossier d’autorisation, d’un accompagnement pour les subventions ou d’un pilotage global de rénovation ?",
    "Présentez-nous votre bâtiment et votre objectif.",
    "Nous vous répondrons sous 48 heures ouvrées afin de préciser la prestation adaptée et les informations nécessaires à l’établissement d’une offre.",
  ],
  /** Bloc « Formulaire devis ? » du document client : titre, phrase d'accompagnement. */
  form: {
    title: "Demandez un devis gratuit",
    text: "Décrivez votre bâtiment, la prestation recherchée et le stade d’avancement du projet.",
  },
  coordonnees: {
    title: "Nos coordonnées",
    phoneLabel: "Téléphone",
    emailLabel: "E-mail",
    /** Libellés exacts des deux boutons et du lien du document client. */
    callCta: "Appeler NERA",
    mailCta: "Envoyer un e-mail",
    linkedinCta: "LinkedIn",
  },
  map: {
    title: "Carte localisation",
    /** Affiché tant que le consentement « cartes » n'est pas donné. */
    consentText:
      "La carte est fournie par Google Maps. Elle se charge une fois les cookies de cartographie acceptés.",
    consentCta: "Autoriser et afficher la carte",
    fallbackCta: "Ouvrir dans Google Maps",
  },
} as const;
