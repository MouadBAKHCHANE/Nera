/**
 * Formulaire de demande de devis gratuit (Assets/Formulaires/Instructions formulaires.docx).
 * Listes déroulantes partagées par le formulaire, la page /devis et la route d'envoi.
 */
export const devisPrestations = [
  "CECB et CECB Plus",
  "Physique du bâtiment et labels énergétiques",
  "Ingénierie CVC et énergies renouvelables",
  "Autorisations de construire",
  "Subventions",
  "Rénovation énergétique globale",
  "Je ne sais pas encore",
] as const;

export const devisBatiments = ["Villa", "Immeuble", "PPE", "Bâtiment administratif ou commercial", "Autre"] as const;

export const devisCantons = ["Genève", "Vaud", "Valais", "Fribourg", "Neuchâtel", "Jura", "Autre"] as const;

export const devisObjectifs = ["Vente", "Subvention", "Rénovation", "Obligation légale", "Autre"] as const;

export const devisNote = "Réponse sous 48 heures ouvrées. Le devis est gratuit et sans engagement.";

/** Types de fichiers acceptés en pièce jointe (plans, factures d'énergie, photos). */
export const devisAccept = ".pdf,.jpg,.jpeg,.png,.heic,.webp";
export const devisMaxFiles = 5;
export const devisMaxFileMb = 8;

export type DevisPayload = {
  prestation: string;
  batiment: string;
  commune: string;
  canton: string;
  annee: string;
  surface: string;
  objectif: string;
  nom: string;
  email: string;
  telephone: string;
  message: string;
};
