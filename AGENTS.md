# nera-ing — instructions agent

Site vitrine de NERA Ingénieurs Conseils (Genève). Lire dans l'ordre : `ETAT.md` (où en est le projet), `content/source/README.md` (textes client), `PRODUCT.md`, `DESIGN.md`, puis `../GUIDE-SITE-VITRINE-AVEC-CLAUDE.md` pour la méthode complète.

## Règles non négociables

- Français de Suisse romande partout (UI, code commenté, commits en anglais acceptés).
- Palette et polices : uniquement les tokens de `app/globals.css`. Aucun hex en dur dans un composant.
- Les 7 prestations et les coordonnées vivent dans `content/prestations.ts`. Ne jamais les dupliquer.
- Aucun chiffre, avis, certification ou logo partenaire qui ne soit fourni par le client.
- Périmètre : ~10 pages. Ne pas créer de page hors arborescence sans accord explicite.
- Motion : Framer Motion seulement. Pas de GSAP, Lenis, Three.js sauf demande explicite.
- Ne jamais `git push` sans accord explicite. Committer localement librement.
- Vérifier chaque composant à 1440×900 et 390×844 avant de rendre la main : zéro erreur console, pas de débordement horizontal. Voir « Vérification » ci-dessous pour la méthode la moins coûteuse.

## Textes client

Tous les textes fournis par NERA sont déjà extraits dans `content/source/`. **Partir de là**,
jamais des `.docx`/`.pdf` d'origine. Lire `content/source/README.md` en premier : il contient
l'index par ligne des 11 pages, le maillage interne et l'identité légale (IDE, RC).

Lire une seule page : `sed -n '<début>,<fin>p' content/source/textes-client.md`.
Ne jamais charger le fichier entier (800 lignes).

## Vérification

Par ordre de coût croissant, s'arrêter au premier niveau qui répond à la question :

1. `npx tsc --noEmit` puis `npm run build` — attrape la majorité des régressions.
2. `curl -s localhost:3000/<route> | grep` — présence d'un texte, d'une balise, d'un lien.
3. Playwright `browser_evaluate` renvoyant un objet — mesures, classes, comportement au clic.
4. Capture d'écran — **uniquement** quand le rendu visuel est le sujet, et une seule fois
   à la fin plutôt qu'à chaque itération. Les images restent en contexte pour toute la session.

## Stack

Next.js 16 (App Router, TypeScript), Tailwind 4 (config CSS-first dans `globals.css`), Sanity (actualités uniquement), Vercel. Polices locales via `next/font/local`.

## Assets

Les sources client (logos SVG complets, polices, CDC, devis) sont dans le dossier parent `../Charte graphique/`. Seules les versions utilisées sont copiées dans `public/`.

Logos disponibles dans `public/logos/` : `nera-horizontal-navy-green.svg` (header sur crème), `nera-horizontal-cream-green.svg` (footer sur marine), `nera-mark-green.svg` (favicon, icône), `nera-tagline-*.svg` (OG image, pied de page).

## Skills installés

- `.claude/skills/impeccable` : `/impeccable shape|craft|critique|audit|quieter|typeset|layout|polish`. Éviter `overdrive`, `delight`, `bolder`.
- `.claude/skills/design-taste-frontend` (taste-skill) : dials VARIANCE 3, MOTION 3, DENSITY 4.
- `~/.claude/skills/img2threejs` : optionnel, hors forfait.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
