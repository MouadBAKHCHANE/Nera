import { getSiteSettings } from "@/lib/sanity/settings";
import { mapsHrefFor } from "@/lib/site-company";
import { contact } from "@/content/contact";
import { ConsentMap } from "./ConsentMap";

/**
 * « Carte localisation » du document client, **bloquée par défaut** (depuis le 30 septembre
 * 2026), comme l'annoncent la politique de cookies (« Contenus externes - Google Maps ») et
 * la politique de confidentialité (« Google Maps ») : emplacement neutre tant que le visiteur
 * n'a pas accepté la catégorie « Contenus externes » ou cliqué sur « Afficher la carte ».
 * Elle avait été affichée d'emblée à une demande antérieure du client, ce qui contredisait
 * ces deux textes.
 *
 * La recherche porte sur la raison sociale et l'adresse, jamais sur des coordonnées : un
 * `q=<latitude>,<longitude>` pose une épingle sans fiche, et le clic répond alors
 * « Impossible de charger les informations sur le lieu ». Avec la raison sociale, Google
 * retrouve l'établissement et le clic ouvre sa fiche, avec l'itinéraire.
 */
export async function ContactMap() {
  const { company } = await getSiteSettings();
  const query = encodeURIComponent(`${company.name}, ${company.street}, ${company.zip} ${company.city}`);

  return (
    <ConsentMap
      src={`https://www.google.com/maps?q=${query}&z=${contact.map.zoom}&output=embed&hl=fr`}
      title={`${company.shortName} — ${company.street}, ${company.zip} ${company.city}`}
      address={`${company.street}, ${company.zip} ${company.city}`}
      mapsHref={mapsHrefFor(company)}
    />
  );
}
