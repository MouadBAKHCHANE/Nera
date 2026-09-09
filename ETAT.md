# État du projet

Mis à jour le 9 septembre 2026. Tenir ce fichier à jour en fin de session.

## Fait

- Page d'accueil `/` (variante sombre), complète et conforme aux textes client.
- En-tête, méga-menu Prestations, menu sandwich, pied de page, bandeau cookies.
- Pop-up « Devis gratuit » en 4 étapes + page `/devis`.
- Textes juridiques client intégrés : bandeau cookies, mentions sous les deux formulaires.
- SEO accueil, `sitemap.ts`, `robots.ts`, images OG/Twitter, JSON-LD `ProfessionalService`.
- Déployé sur Vercel : https://nera-roan.vercel.app/

## À faire

Par ordre de priorité.

1. **Pages légales** — `/mentions-legales`, `/confidentialite`, `/cookies`.
   Contenu prêt dans `content/source/legal-*.md`. Déjà liées depuis le pied de page et
   les mentions sous formulaires : ces liens sont en 404 tant que les pages n'existent pas.
2. **Prestations** — `/prestations` + les 6 pages prestation. Un seul gabarit partagé,
   alimenté par un fichier de contenu unique. Chaque page : ses propres Titre SEO et
   méta-description, les liens du maillage interne, et un CTA devis en bas de page.
3. **`/bureau`** et **`/references`** — visuels dans `../Assets/Visuels/`.
4. **`/contact`** — le formulaire simple, identique à la section contact de l'accueil.
5. **Envoi des e-mails** — passer de Resend à Microsoft Graph (`sendMail`). En attente du
   tenant ID, client ID et client secret ; à recevoir par canal sécurisé, pas par e-mail.
6. **DNS chez Infomaniak** — A `128.65.195.180` → `76.76.21.21`, www A → CNAME
   `cname.vercel-dns.com`. Ne pas toucher NS/MX/SPF/DKIM/DMARC/autodiscover (Microsoft 365).
7. **Nettoyage** — supprimer `/home-2` et les composants clairs une fois la variante validée,
   ajouter la page 404, soumettre à la Search Console.

## Décisions ouvertes

- Le plan de site client ne mentionne aucune page Actualités, alors que le module CMS
  (Sanity) est au devis. À trancher avec le client.
- Le formulaire de la section contact n'est pas encore relié (`action="#"`) ; il le sera
  avec le point 4.
