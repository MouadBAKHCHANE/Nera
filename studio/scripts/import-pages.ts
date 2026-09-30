/**
 * Migration de l'accueil, du bureau et du contact du code vers Sanity, mot pour mot.
 *
 *   cd studio
 *   npx sanity exec scripts/import-pages.ts --with-user-token            # simulation
 *   npx sanity exec scripts/import-pages.ts --with-user-token -- --write # écriture
 *
 * Envoie les photos de `public/img/`, puis crée ou remplace les documents publiés `homePage`,
 * `bureauPage` et `contactPage`. Après écriture, relit chaque document et le compare, clés
 * techniques et photos mises à part, à ce qui a été envoyé : le script échoue à la première
 * différence. La vérification de bout en bout est la comparaison des pages rendues avec le site.
 * À ne relancer qu'en connaissance de cause : il écraserait les modifications faites dans le
 * Studio depuis la migration.
 */
import {createReadStream} from 'node:fs'
import {basename, join} from 'node:path'
import {getCliClient} from 'sanity/cli'
import {bureau} from '../../content/bureau'
import {contact} from '../../content/contact'
import {home} from '../../content/home'
import {seo} from '../../content/seo'

const write = process.argv.includes('--write')
const client = getCliClient({apiVersion: '2026-09-29'})
const uploaded = new Map<string, string>()

/** Champ image Sanity pour `/img/…` de `public/` (envoi à l'écriture seulement). */
async function image(src: string) {
  if (!write) return {_type: 'image', asset: {_type: 'reference', _ref: `(simulation) ${src}`}}
  let ref = uploaded.get(src)
  if (!ref) {
    const asset = await client.assets.upload('image', createReadStream(join(process.cwd(), '..', 'public', src)), {
      filename: basename(src),
    })
    ref = asset._id
    uploaded.set(src, ref)
  }
  return {_type: 'image', asset: {_type: 'reference', _ref: ref}}
}

const keyed = <T extends object>(type: string, prefix: string, list: readonly T[]) =>
  list.map((item, i) => ({_key: `${prefix}${i}`, _type: type, ...item}))

const seoOf = (meta: {title: string; description: string}) => ({_type: 'seo', title: meta.title, description: meta.description})

/** Retire clés techniques et photos, pour comparer ce qui a été envoyé à ce qui a été relu. */
function strip(v: unknown): unknown {
  if (Array.isArray(v)) return v.map(strip)
  if (!v || typeof v !== 'object') return v
  if ('asset' in v) return '[photo]'
  return Object.fromEntries(
    Object.entries(v)
      .filter(([k]) => !k.startsWith('_'))
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([k, val]) => [k, strip(val)]),
  )
}

async function main() {
  const {cards, ...services} = home.services
  const docs: {_id: string; _type: string; [field: string]: unknown}[] = [
    {
      _id: 'homePage',
      _type: 'homePage',
      hero: {
        eyebrow: home.hero.eyebrow,
        h1: home.hero.h1,
        accent: home.hero.accent,
        lead: home.hero.lead,
        image: await image(home.hero.image),
      },
      services: {
        ...services,
        cards: await Promise.all(
          cards.map(async (c, i) => ({
            _key: `c${i}`,
            _type: 'homeCard',
            prestation: {_type: 'reference', _ref: `prestation-${c.slug}`},
            title: c.title,
            text: c.text,
            cta: c.cta,
            image: await image(c.image),
          })),
        ),
      },
      renovation: {
        title: home.renovation.title,
        accent: home.renovation.accent,
        paragraphs: home.renovation.paragraphs,
        cta: home.renovation.cta,
        image: await image(home.renovation.image),
        imageAlt: home.renovation.imageAlt,
      },
      audiences: {title: home.audiences.title, items: keyed('audience', 'a', home.audiences.items)},
      approach: home.approach,
      territory: home.territory,
      contact: home.contact,
      seo: seoOf(seo),
      keywords: seo.keywords,
    },
    {
      _id: 'bureauPage',
      _type: 'bureauPage',
      h1: bureau.h1,
      lead: bureau.lead,
      image: await image(bureau.image),
      equilibre: {title: bureau.equilibre.title, intro: bureau.equilibre.intro, items: bureau.equilibre.items},
      mission: {
        title: bureau.mission.title,
        intro: bureau.mission.intro,
        lead: bureau.mission.lead,
        items: bureau.mission.items,
      },
      fondateur: {
        title: bureau.fondateur.title,
        card: bureau.fondateur.card,
        paragraphs: bureau.fondateur.paragraphs,
        phoneLabel: bureau.fondateur.phoneLabel,
        emailLabel: bureau.fondateur.emailLabel,
      },
      equipe: {
        title: bureau.equipe.title,
        intro: bureau.equipe.intro,
        lead: bureau.equipe.lead,
        items: bureau.equipe.items,
        outro: bureau.equipe.outro,
        image: await image(bureau.equipe.image),
        imageAlt: bureau.equipe.imageAlt,
      },
      procedures: {title: bureau.procedures.title, intro: bureau.procedures.intro, items: bureau.procedures.items},
      qualifications: {
        title: bureau.qualifications.title,
        items: keyed('qualification', 'q', bureau.qualifications.items),
      },
      valeurs: {title: bureau.valeurs.title, items: keyed('valeur', 'v', bureau.valeurs.items)},
      cantons: {title: bureau.cantons.title, accent: bureau.cantons.accent, text: bureau.cantons.text},
      closing: bureau.closing,
      seo: seoOf(bureau.meta),
      keywords: bureau.keywords,
    },
    {
      _id: 'contactPage',
      _type: 'contactPage',
      h1: contact.h1,
      lead: contact.lead,
      coordinatesTitle: contact.coordonnees.title,
      formTitle: contact.form.title,
      formText: contact.form.text,
      seo: seoOf(contact.meta),
      keywords: contact.keywords,
    },
  ]

  for (const doc of docs) {
    console.log(`${doc._id} : ${JSON.stringify(strip(doc)).length} caractères de contenu`)
    if (!write) continue
    await client.createOrReplace(doc)
    const saved = await client.getDocument(doc._id)
    const got = JSON.stringify(strip(saved))
    const want = JSON.stringify(strip(doc))
    if (got !== want) {
      const i = [...got].findIndex((c, k) => c !== want[k])
      throw new Error(`${doc._id} : différent de l'envoi vers « ${want.slice(Math.max(0, i - 60), i + 60)} »`)
    }
    console.log('  écrit et vérifié')
  }
  if (write) console.log(`${uploaded.size} photos envoyées`)
  else console.log('Simulation seulement. Relancer avec « -- --write » pour écrire.')
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
