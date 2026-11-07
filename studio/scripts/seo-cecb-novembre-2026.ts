/**
 * Page CECB : titre et description Google, expressions visées (propositions M1, M2 et M5 du
 * bilan Search Console du 7 novembre 2026, voir ETAT.md).
 *
 *   cd studio
 *   npx sanity exec scripts/seo-cecb-novembre-2026.ts --with-user-token            # simulation
 *   npx sanity exec scripts/seo-cecb-novembre-2026.ts --with-user-token -- --write # écriture
 *
 * Imprime d'abord le document publié en entier (à rediriger vers un fichier : c'est la
 * sauvegarde). Refuse d'écrire si un brouillon ou une version de publication existe, pour ne pas
 * être écrasé par une publication depuis le Studio. L'écriture porte la révision lue : si le
 * document a changé entre-temps, elle échoue au lieu d'écraser.
 * Ne touche ni au corps de la page, ni à la FAQ, ni à l'image de partage.
 */
import {getCliClient} from 'sanity/cli'

const write = process.argv.includes('--write')
const client = getCliClient({apiVersion: '2026-09-29'})

const ID = 'prestation-audit-cecb'
const TITLE = 'Expert CECB et CECB Plus à Genève et Vaud | NERA'
const DESCRIPTION =
  'Experts CECB à Genève et dans le canton de Vaud : CECB, CECB Plus, calcul de l’IDC et diagnostics EPIQR+. Visite, rapport et conseil. Devis gratuit.'
const ADD_KEYWORDS = ['expert CECB Vaud', 'certificat CECB Genève', 'CECB Plus']

type Doc = {
  _id: string
  _rev: string
  seo?: {title?: string; description?: string}
  keywords?: string[]
}

async function main() {
  const doc = await client.getDocument<Doc>(ID)
  if (!doc) throw new Error(`${ID} introuvable`)
  console.log('--- SAUVEGARDE (document publié) ---')
  console.log(JSON.stringify(doc, null, 2))

  const pending = await client.fetch<string[]>(
    `*[_id in path("drafts.${ID}") || _id in path("versions.**.${ID}") || _id == "drafts.${ID}"]._id`,
  )
  if (pending.length) throw new Error(`Brouillon ou version en cours, rien n'est écrit : ${pending.join(', ')}`)

  const current = doc.keywords ?? []
  const known = new Set(current.map((k) => k.toLocaleLowerCase('fr-CH')))
  const keywords = [...current, ...ADD_KEYWORDS.filter((k) => !known.has(k.toLocaleLowerCase('fr-CH')))]

  console.log('--- CHANGEMENTS ---')
  console.log('Titre        :', doc.seo?.title ?? '(vide)', '→', TITLE, `(${TITLE.length} car.)`)
  console.log('Description  :', doc.seo?.description ?? '(vide)')
  console.log('            →', DESCRIPTION, `(${DESCRIPTION.length} car.)`)
  console.log('Expressions  :', current.join(' · '))
  console.log('            →', keywords.join(' · '))

  if (!write) {
    console.log('\nSimulation : rien n’est écrit. Relancer avec -- --write.')
    return
  }

  await client
    .patch(ID)
    .ifRevisionId(doc._rev)
    .setIfMissing({seo: {_type: 'seo'}})
    .set({'seo.title': TITLE, 'seo.description': DESCRIPTION, keywords})
    .commit()

  const after = await client.getDocument<Doc>(ID)
  const ok =
    after?.seo?.title === TITLE &&
    after?.seo?.description === DESCRIPTION &&
    JSON.stringify(after?.keywords) === JSON.stringify(keywords)
  if (!ok) throw new Error('Relecture : le document ne correspond pas à ce qui devait être écrit')
  console.log('\nÉcrit et relu : conforme.')
}

main().catch((err) => {
  console.error(err instanceof Error ? err.message : err)
  process.exit(1)
})
