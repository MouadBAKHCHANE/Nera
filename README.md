# NERA Ingénieurs Conseils · site vitrine

Site vitrine de [NERA Ingénieurs Conseils](https://www.nera-ing.ch), bureau d'ingénieurs en énergie, physique du bâtiment et CVC basé à Genève, actif en Suisse romande.

Next.js 16 (App Router), Tailwind CSS 4, Sanity (actualités), Resend (formulaires), Vercel.

## Démarrer

```bash
npm install
cp .env.example .env.local   # puis renseigner les clés
npm run dev                  # http://localhost:3000
```

Routes utiles en développement :

| Route | Contenu |
|---|---|
| `/` | Accueil, variante claire (direction For Future) |
| `/home-2` | Accueil, variante sombre (géométrie NERA), non indexée |
| `/devis` | Formulaire de devis gratuit hors pop-up |
| `/api/devis` | Réception du formulaire de devis (POST multipart) |

## Structure

```
app/                 pages (App Router), route API devis, layout avec polices locales
components/
  layout/            header, menu mobile, footer de l'accueil principal
  home2/             composants de la variante sombre (header, héro, prestations, …)
  quote/             pop-up et formulaire « Devis gratuit » en 4 étapes
  sections/, ui/     sections de l'accueil principal et primitives (Button, Reveal, …)
content/             données typées : prestations, navigation, footer, formulaire devis
public/fonts         Clash Display et Satoshi (woff2, auto-hébergées)
public/logos         logos SVG NERA (déclinaisons couleur)
public/img           visuels du client, optimisés
DESIGN.md            système de design (palette, typographie, règles)
PRODUCT.md           contexte produit et contraintes
```

## Variables d'environnement

| Variable | Rôle |
|---|---|
| `RESEND_API_KEY` | envoi des e-mails du formulaire de devis. Sans clé, la demande est journalisée (développement). |
| `CONTACT_TO` | destinataire des demandes (défaut : info@nera-ing.ch) |
| `CONTACT_FROM` | expéditeur vérifié sur le domaine nera-ing.ch |
| `NEXT_PUBLIC_SANITY_PROJECT_ID`, `NEXT_PUBLIC_SANITY_DATASET`, `SANITY_API_READ_TOKEN` | actualités (à venir) |

## Règles de contenu

- Palette et polices uniquement via les tokens de `app/globals.css`, jamais de couleur en dur.
- Les prestations, coordonnées et menus vivent dans `content/` et sont consommés partout.
- Aucun chiffre, certification ou logo partenaire qui ne soit fourni par le client.
- Chaque composant est vérifié à 1440×900 et 390×844 : zéro erreur console, pas de débordement horizontal.

## Déploiement

Vercel, déploiement automatique à chaque push sur `main`. Domaine nera-ing.ch (DNS chez Infomaniak, enregistrements fournis par Vercel).

© NERA Ingénieurs Conseils Sàrl. Développement : MouaDev.
