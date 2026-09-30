/**
 * Migration des pages prestation du code vers Sanity, mot pour mot.
 *
 *   cd studio
 *   npx sanity exec scripts/import-prestations.ts --with-user-token            # simulation
 *   npx sanity exec scripts/import-prestations.ts --with-user-token -- --write # écriture
 *
 * Envoie les photos de `public/img/` (Sanity ne garde qu'un exemplaire d'un même fichier), puis
 * crée ou remplace les documents publiés `prestation-<slug>` (six pages) et `prestationsPage`
 * (index). Après écriture, relit chaque document, le reconvertit comme le fait le site
 * (`portableToBlocks`) et le compare à la source : le script échoue à la première différence.
 * À ne relancer qu'en connaissance de cause : il écraserait les modifications faites dans le
 * Studio depuis la migration.
 */
import {createReadStream} from 'node:fs'
import {basename, join} from 'node:path'
import {getCliClient} from 'sanity/cli'
import {prestationPages, prestationsIndex} from '../../content/prestation-pages'
import {blocksToPortable, portableToBlocks, type PrestationPortable} from '../../lib/prestations/portable'

const write = process.argv.includes('--write')
const client = getCliClient({apiVersion: '2026-09-29'})

/** Photo d'en-tête de l'index, écrite en dur dans `PrestationsIndexPage.tsx` avant la migration. */
const INDEX_IMAGE = '/img/process-panneaux-solaires-immeuble.webp'

const uploaded = new Map<string, string>()

/** Envoie `/img/…` de `public/` et renvoie le champ image Sanity, point focal compris. */
async function image(src: string, position?: string) {
  let ref = uploaded.get(src)
  if (!ref) {
    const file = join(process.cwd(), '..', 'public', src)
    const asset = await client.assets.upload('image', createReadStream(file), {filename: basename(src)})
    ref = asset._id
    uploaded.set(src, ref)
  }
  // « 50% 70% » (position CSS de l'ancien code) devient le point focal équivalent.
  const m = position?.match(/^(\d+)% (\d+)%$/)
  return {
    _type: 'image',
    asset: {_type: 'reference', _ref: ref},
    ...(m
      ? {
          hotspot: {_type: 'sanity.imageHotspot', x: +m[1] / 100, y: +m[2] / 100, width: 1, height: 1},
          crop: {_type: 'sanity.imageCrop', top: 0, bottom: 0, left: 0, right: 0},
        }
      : {}),
  }
}

const seo = (meta: {title: string; description: string}) => ({_type: 'seo', title: meta.title, description: meta.description})

/** Échoue si deux valeurs diffèrent, en nommant le champ. */
function same(where: string, got: unknown, want: unknown) {
  const a = JSON.stringify(got)
  const b = JSON.stringify(want)
  if (a !== b) throw new Error(`${where} : différent de la source\n  lu     ${a.slice(0, 300)}\n  source ${b.slice(0, 300)}`)
}

async function main() {
  for (const p of prestationPages) {
    const id = `prestation-${p.slug}`
    const doc = {
      _id: id,
      _type: 'prestationPage',
      route: `/prestations/${p.slug}`,
      shortTitle: p.shortTitle,
      h1: p.h1,
      lead: p.lead,
      heroCta: p.heroCta,
      image: write ? await image(p.image, p.imagePosition) : undefined,
      acronyms: (p.acronyms ?? []).map((a, i) => ({_key: `a${i}`, _type: 'acronym', short: a.short, long: a.long})),
      sections: p.sections.map((s, i) => ({
        _key: `s${i}`,
        _type: 'prestationSection',
        title: s.title,
        anchor: s.id,
        body: blocksToPortable(s.blocks, `s${i}b`),
      })),
      faq: p.faq.map((f, i) => ({_key: `f${i}`, _type: 'faqItem', question: f.q, answer: f.a})),
      band: write && p.band ? await image(p.band) : undefined,
      closing: p.closing,
      seo: seo(p.meta),
      keywords: p.keywords,
    }
    console.log(`${id} : ${doc.sections.length} sections, ${doc.faq.length} questions`)
    if (!write) continue
    await client.createOrReplace(doc)

    const saved = await client.getDocument<typeof doc & {sections: {anchor: string; title: string; body: PrestationPortable[]}[]}>(id)
    if (!saved) throw new Error(`${id} introuvable après écriture`)
    same(`${id} en-tête`, [saved.shortTitle, saved.h1, saved.lead, saved.heroCta, saved.closing], [p.shortTitle, p.h1, p.lead, p.heroCta, p.closing])
    same(`${id} sigles`, saved.acronyms.map((a) => ({short: a.short, long: a.long})), p.acronyms ?? [])
    same(
      `${id} sections`,
      saved.sections.map((s) => ({id: s.anchor, title: s.title, blocks: portableToBlocks(s.body)})),
      p.sections,
    )
    same(`${id} FAQ`, saved.faq.map((f) => ({q: f.question, a: f.answer})), p.faq)
    same(`${id} SEO`, [saved.seo.title, saved.seo.description, saved.keywords], [p.meta.title, p.meta.description, p.keywords])
    console.log('  écrit et vérifié')
  }

  const ix = prestationsIndex
  const index = {
    _id: 'prestationsPage',
    _type: 'prestationsPage',
    h1: ix.h1,
    lead: ix.lead,
    heroCta: ix.heroCta,
    image: write ? await image(INDEX_IMAGE) : undefined,
    entries: ix.entries.map((e, i) => ({
      _key: `e${i}`,
      _type: 'prestationEntry',
      prestation: {_type: 'reference', _ref: `prestation-${e.slug}`},
      title: e.title,
      subtitle: e.subtitle,
      body: blocksToPortable(e.blocks, `e${i}b`),
      cta: e.cta,
    })),
    outro: ix.outro.map((o, i) => ({
      _key: `o${i}`,
      _type: 'outroSection',
      title: o.title,
      anchor: o.id,
      cards: o.cards.map((c, j) => ({_key: `o${i}c${j}`, _type: 'outroCard', title: c.title, text: c.text, highlight: !!c.highlight})),
    })),
    closingTitle: ix.closing.title,
    closingText: ix.closing.text,
    seo: seo(ix.meta),
    keywords: ix.keywords,
  }
  console.log(`prestationsPage : ${index.entries.length} blocs, ${index.outro.length} section(s) en cartes`)
  if (write) {
    await client.createOrReplace(index)
    const saved = await client.fetch(
      `*[_id == "prestationsPage"][0]{h1, lead, heroCta, "entries": entries[]{"slug": string::split(prestation->route, "/")[2], title, subtitle, body, cta}, outro, closingTitle, closingText, seo, keywords}`,
    )
    same('index en-tête', [saved.h1, saved.lead, saved.heroCta], [ix.h1, ix.lead, ix.heroCta])
    same(
      'index blocs',
      saved.entries.map((e: {slug: string; title: string; subtitle: string; body: PrestationPortable[]; cta: string}) => ({
        slug: e.slug,
        title: e.title,
        subtitle: e.subtitle,
        cta: e.cta,
        blocks: portableToBlocks(e.body),
      })),
      ix.entries.map((e) => ({slug: e.slug, title: e.title, subtitle: e.subtitle, cta: e.cta, blocks: e.blocks})),
    )
    same(
      'index cartes',
      saved.outro.map((o: {anchor: string; title: string; cards: {title: string; text: string; highlight: boolean}[]}) => ({
        id: o.anchor,
        title: o.title,
        cards: o.cards.map((c) => ({title: c.title, text: c.text, ...(c.highlight ? {highlight: true} : {})})),
      })),
      ix.outro,
    )
    same('index fin et SEO', [saved.closingTitle, saved.closingText, saved.seo.title, saved.seo.description, saved.keywords], [
      ix.closing.title,
      ix.closing.text,
      ix.meta.title,
      ix.meta.description,
      ix.keywords,
    ])
    console.log('  écrit et vérifié')
    console.log(`${uploaded.size} photos envoyées`)
  }
  if (!write) console.log('Simulation seulement. Relancer avec « -- --write » pour écrire.')
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
