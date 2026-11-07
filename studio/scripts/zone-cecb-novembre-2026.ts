/**
 * Page CECB : section « zone d'intervention » (proposition M3 du bilan Search Console du
 * 7 novembre 2026, voir ETAT.md), insérée après « Dans quels cas établir un CECB ? ».
 *
 *   cd studio
 *   npx sanity exec scripts/zone-cecb-novembre-2026.ts --with-user-token            # simulation
 *   npx sanity exec scripts/zone-cecb-novembre-2026.ts --with-user-token -- --write # écriture
 *
 * Communes : celles que les internautes ont associées à « expert CECB » dans la Search Console,
 * retenues par Mouad. Mêmes garde-fous que `seo-cecb-novembre-2026.ts` : sauvegarde imprimée,
 * refus s'il existe un brouillon, écriture liée à la révision lue. Refuse aussi si la section
 * existe déjà : le script ne s'applique qu'une fois.
 */
import {getCliClient} from 'sanity/cli'

const write = process.argv.includes('--write')
const client = getCliClient({apiVersion: '2026-09-29'})

const ID = 'prestation-audit-cecb'
const AFTER = 'dans-quels-cas-etablir-un-cecb'
const ANCHOR = 'zone-d-intervention'
const TITLE = 'Expert CECB à Genève et dans le canton de Vaud'
const PARAGRAPHS = [
  'Basés à Châtelaine, nos experts CECB interviennent dans l’ensemble du canton de Genève, notamment à Genève, Carouge, Lancy et Vernier, ainsi que dans le canton de Vaud, notamment à Nyon, Renens, Pully, Payerne et Villeneuve.',
  'Pour un bâtiment situé ailleurs en Suisse romande, contactez-nous : nous vous indiquons si nous pouvons intervenir.',
]

type Section = {_key: string; anchor?: string; title?: string}
type Doc = {_id: string; _rev: string; sections?: Section[]}

const section = {
  _key: 'zone',
  _type: 'prestationSection',
  title: TITLE,
  anchor: ANCHOR,
  body: PARAGRAPHS.map((text, i) => ({
    _key: `zoneb${i}`,
    _type: 'block',
    style: 'normal',
    markDefs: [],
    children: [{_key: `zones${i}`, _type: 'span', marks: [], text}],
  })),
}

async function main() {
  const doc = await client.getDocument<Doc>(ID)
  if (!doc) throw new Error(`${ID} introuvable`)
  console.log('--- SAUVEGARDE (document publié) ---')
  console.log(JSON.stringify(doc, null, 2))

  const pending = await client.fetch<string[]>(`*[_id == "drafts.${ID}" || _id in path("versions.**.${ID}")]._id`)
  if (pending.length) throw new Error(`Brouillon ou version en cours, rien n'est écrit : ${pending.join(', ')}`)

  const sections = doc.sections ?? []
  if (sections.some((s) => s.anchor === ANCHOR)) throw new Error(`La section « ${ANCHOR} » existe déjà`)
  const after = sections.find((s) => s.anchor === AFTER)
  if (!after) throw new Error(`Section « ${AFTER} » introuvable`)

  console.log('--- CHANGEMENT ---')
  console.log(`Après « ${after.title} », nouvelle section :`)
  console.log(`  H2 : ${TITLE}  (#${ANCHOR})`)
  for (const p of PARAGRAPHS) console.log(`  ${p}`)

  if (!write) {
    console.log('\nSimulation : rien n’est écrit. Relancer avec -- --write.')
    return
  }

  await client
    .patch(ID)
    .ifRevisionId(doc._rev)
    .insert('after', `sections[_key=="${after._key}"]`, [section])
    .commit()

  const check = await client.getDocument<Doc>(ID)
  const order = (check?.sections ?? []).map((s) => s.anchor)
  if (order[order.indexOf(AFTER) + 1] !== ANCHOR) throw new Error(`Relecture : ordre inattendu ${order.join(', ')}`)
  console.log('\nÉcrit et relu : conforme.', order.join(' → '))
}

main().catch((err) => {
  console.error(err instanceof Error ? err.message : err)
  process.exit(1)
})
