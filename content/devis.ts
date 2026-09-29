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
/**
 * Plafond **total** des pièces jointes, en Mo. Ce n'est pas un choix : Microsoft Graph refuse un
 * e-mail de plus de 4 Mo, et le base64 gonfle les fichiers d'un tiers (voir `lib/mail.ts`).
 * L'ancien plafond, 5 fichiers de 8 Mo, dépassait aussi la limite de 4,5 Mo que Vercel impose
 * au corps de chaque requête : un envoi lourd aurait échoué avant même d'atteindre la route.
 */
export const devisMaxTotalMb = 3;

export type DevisPayload = {
  prestation: string;
  batiment: string;
  codePostal: string;
  canton: string;
  annee: string;
  surface: string;
  objectif: string;
  nom: string;
  email: string;
  telephone: string;
  message: string;
};
