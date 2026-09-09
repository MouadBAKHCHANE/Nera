# État du projet

Mis à jour le 9 septembre 2026. Tenir ce fichier à jour en fin de session.

## Fait

- Page d'accueil `/` (variante sombre), complète et conforme aux textes client.
- En-tête, méga-menu Prestations, menu sandwich, pied de page, bandeau cookies.
- Pop-up « Devis gratuit » en 4 étapes + page `/devis`.
- Textes juridiques client intégrés : bandeau cookies, mentions sous les deux formulaires.
- Pages légales `/mentions-legales`, `/confidentialite`, `/cookies` : gabarit partagé
  `components/legal/LegalPage.tsx`, contenu dans `content/legal-pages.ts` (texte client mot pour
  mot). Les liens du pied de page et des mentions sous formulaires ne sont plus en 404.
- SEO accueil, `sitemap.ts`, `robots.ts`, images OG/Twitter, JSON-LD `ProfessionalService`.
- Déployé sur Vercel : https://nera-roan.vercel.app/

## À faire

Par ordre de priorité.

1. **Prestations** — `/prestations` + les 6 pages prestation. Un seul gabarit partagé,
   alimenté par un fichier de contenu unique. Chaque page : ses propres Titre SEO et
   méta-description, les liens du maillage interne, et un CTA devis en bas de page.
2. **`/bureau`** et **`/references`** — visuels dans `../Assets/Visuels/`.
3. **`/contact`** — le formulaire simple, identique à la section contact de l'accueil.
4. **Envoi des e-mails** — passer de Resend à Microsoft Graph (`sendMail`). En attente du
   tenant ID, client ID et client secret ; à recevoir par canal sécurisé, pas par e-mail.
5. **DNS chez Infomaniak** — A `128.65.195.180` → `76.76.21.21`, www A → CNAME
   `cname.vercel-dns.com`. Ne pas toucher NS/MX/SPF/DKIM/DMARC/autodiscover (Microsoft 365).
6. **Nettoyage** — supprimer `/home-2` et les composants clairs une fois la variante validée,
   ajouter la page 404, soumettre à la Search Console.

## Gestionnaire de cookies

Le choix vit en localStorage sous `nera-cookie-consent`. `lib/consent.ts` est la source unique
de la clé, du type et des deux évènements : `nera:cookie-consent` (choix enregistré) et
`nera:open-cookie-preferences` (demande d'ouverture, que le bandeau annule pour signaler qu'il a
répondu). Le rappel de choix de `/cookies` et le lien « Gérer mes cookies » du pied de page
passent tous deux par là. Aucun traceur n'est encore chargé : GA4, Google Ads, Meta Pixel et
Google Maps restent à brancher sur ces catégories.

## Décisions ouvertes

- Le plan de site client ne mentionne aucune page Actualités, alors que le module CMS
  (Sanity) est au devis. À trancher avec le client.
- Le formulaire de la section contact n'est pas encore relié (`action="#"`) ; il le sera
  avec le point 3.
