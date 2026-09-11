import { company } from "@/content/prestations";
import { contact } from "@/content/contact";

/**
 * « Carte localisation » du document client, chargée sans condition.
 *
 * Elle était auparavant bloquée jusqu'à l'acceptation d'une catégorie « Google Maps » du
 * gestionnaire de cookies ; le client a demandé qu'elle s'affiche d'emblée et que la catégorie
 * disparaisse du bandeau. **Les textes juridiques du site n'ont pas suivi** : la politique de
 * cookies et les mentions légales promettent encore un emplacement neutre tant que le visiteur
 * n'a pas accepté (`content/legal-pages.ts`, sections « Google Maps » et « Contenus externes »).
 * À faire corriger par le client, ou revenir au blocage.
 *
 * La recherche porte sur la raison sociale et l'adresse, jamais sur des coordonnées : un
 * `q=<latitude>,<longitude>` pose une épingle sans fiche, et le clic répond alors
 * « Impossible de charger les informations sur le lieu ». Avec la raison sociale, Google
 * retrouve l'établissement et le clic ouvre sa fiche, avec l'itinéraire.
 */
export function ContactMap() {
  const query = encodeURIComponent(`${company.name}, ${company.street}, ${company.zip} ${company.city}`);

  return (
    <div className="relative h-[340px] overflow-hidden bg-nera-navy-soft md:h-[420px] lg:h-[500px]">
      <iframe
        src={`https://www.google.com/maps?q=${query}&z=${contact.map.zoom}&output=embed&hl=fr`}
        title={`${company.shortName} — ${company.street}, ${company.zip} ${company.city}`}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen
        className="absolute inset-0 size-full border-0"
      />
    </div>
  );
}
