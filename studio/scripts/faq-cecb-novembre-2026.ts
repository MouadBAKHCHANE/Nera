/**
 * Page CECB : cinq questions ajoutées à la FAQ (proposition M4 du bilan Search Console du
 * 7 novembre 2026, voir ETAT.md). Réponses de NERA (e-mail de Charline Fabbro du
 * 9 novembre 2026), mises en forme sans en changer les faits.
 *
 *   cd studio
 *   npx sanity exec scripts/faq-cecb-novembre-2026.ts --with-user-token            # simulation
 *   npx sanity exec scripts/faq-cecb-novembre-2026.ts --with-user-token -- --write # écriture
 *
 * Ajoute à la suite des questions existantes, qui ne sont pas touchées (NERA les a retouchées
 * dans le Studio). Mêmes garde-fous que `seo-cecb-novembre-2026.ts` : sauvegarde imprimée,
 * refus s'il existe un brouillon, écriture liée à la révision lue. Refuse aussi si l'une des
 * questions existe déjà : le script ne s'applique qu'une fois.
 */
import {getCliClient} from 'sanity/cli'

const write = process.argv.includes('--write')
const client = getCliClient({apiVersion: '2026-09-29'})

const ID = 'prestation-audit-cecb'
const NB = ' '

const ITEMS = [
  {
    question: `Intervenez-vous en dehors de Genève${NB}?`,
    answer: `Oui. Nos experts CECB interviennent dans tout le canton de Genève et dans le canton de Vaud. Pour un bâtiment situé ailleurs en Suisse romande, contactez-nous${NB}: nous vous indiquons si nous pouvons intervenir.`,
  },
  {
    question: `Quels documents préparer pour un CECB${NB}?`,
    answer:
      'Idéalement les plans du bâtiment, les relevés de consommation et les factures d’énergie, ainsi que les informations techniques disponibles sur les installations.',
  },
  {
    question: `Combien de temps faut-il pour obtenir un CECB${NB}?`,
    answer: `Entre la demande, la visite et la remise du certificat, comptez en général 2 à 3${NB}semaines pour un CECB et 3 à 4${NB}semaines pour un CECB Plus.`,
  },
  {
    question: `Le CECB Plus est-il exigé pour une demande de subvention${NB}?`,
    answer: `Il est notamment exigé pour l’isolation thermique (toiture, façades, murs, sols) lorsque la subvention atteint ou dépasse CHF${NB}10’000, selon le canton${NB}; en Valais, dès que la surface isolée dépasse 142${NB}m². Il l’est aussi pour certaines subventions de rénovation énergétique globale liées à l’amélioration des classes énergétiques du bâtiment, notamment les mesures M-10 et M-13, selon le canton. Pour le remplacement d’un chauffage par une pompe à chaleur ou l’installation de panneaux photovoltaïques, le CECB Plus n’est généralement pas exigé, mais un CECB simple peut être nécessaire. Les exigences varient selon les cantons et les programmes de subvention${NB}: il est essentiel de les vérifier avant d’engager les travaux.`,
  },
  {
    question: `Le CECB devient-il obligatoire dans le canton de Vaud${NB}?`,
    answer: `Oui, pour une partie des bâtiments. Dès 2027, la nouvelle loi vaudoise sur l’énergie impose notamment un CECB simple aux bâtiments construits avant 1986, à établir d’ici fin 2031.`,
  },
]

type Faq = {_key: string; question?: string; answer?: string}
type Doc = {_id: string; _rev: string; faq?: Faq[]}

const norm = (s = '') => s.replace(/\s+/g, ' ').trim().toLocaleLowerCase('fr-CH')

async function main() {
  const doc = await client.getDocument<Doc>(ID)
  if (!doc) throw new Error(`${ID} introuvable`)
  console.log('--- SAUVEGARDE (document publié) ---')
  console.log(JSON.stringify(doc, null, 2))

  const pending = await client.fetch<string[]>(`*[_id == "drafts.${ID}" || _id in path("versions.**.${ID}")]._id`)
  if (pending.length) throw new Error(`Brouillon ou version en cours, rien n'est écrit : ${pending.join(', ')}`)

  const faq = doc.faq ?? []
  const existing = new Set(faq.map((f) => norm(f.question)))
  const dup = ITEMS.filter((i) => existing.has(norm(i.question)))
  if (dup.length) throw new Error(`Déjà présentes : ${dup.map((d) => d.question).join(' | ')}`)

  const items = ITEMS.map((item, i) => ({_key: `fnov${i}`, _type: 'faqItem', ...item}))

  console.log('--- CHANGEMENT ---')
  console.log(`FAQ actuelle : ${faq.length} questions, ajout de ${items.length} à la suite :`)
  for (const it of items) console.log(`\n  Q : ${it.question}\n  R : ${it.answer}`)

  if (!write) {
    console.log('\nSimulation : rien n’est écrit. Relancer avec -- --write.')
    return
  }

  await client.patch(ID).ifRevisionId(doc._rev).setIfMissing({faq: []}).append('faq', items).commit()

  const check = await client.getDocument<Doc>(ID)
  const got = (check?.faq ?? []).map((f) => f.question)
  const ok = got.length === faq.length + items.length && items.every((it, i) => got[faq.length + i] === it.question)
  if (!ok) throw new Error(`Relecture : FAQ inattendue (${got.length} questions)`)
  console.log(`\nÉcrit et relu : conforme, ${got.length} questions.`)
}

main().catch((err) => {
  console.error(err instanceof Error ? err.message : err)
  process.exit(1)
})
