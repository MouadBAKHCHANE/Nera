/**
 * Migration des trois pages légales du code vers Sanity, mot pour mot.
 *
 *   cd studio
 *   npx sanity exec scripts/import-legal.ts --with-user-token            # simulation
 *   npx sanity exec scripts/import-legal.ts --with-user-token -- --write # écriture
 *
 * Crée ou remplace les documents publiés `legal-mentions-legales`, `legal-confidentialite` et
 * `legal-cookies`. Après écriture, relit chaque document et compare son texte à la source,
 * balisage des liens retiré : le script échoue si un seul mot diffère.
 * À ne relancer qu'en connaissance de cause : il écraserait les modifications faites dans le
 * Studio depuis la migration.
 */
import {getCliClient} from 'sanity/cli'
import {legalDocs} from '../../content/legal-pages'
import {LEGAL_PAGES, legalDocToSanity, type LegalPortable} from '../../lib/legal/portable'

const write = process.argv.includes('--write')
const client = getCliClient({apiVersion: '2026-09-29'})

/** Texte brut d'un contenu riche, pour la comparaison avec la source. */
function plain(nodes: LegalPortable[]): string {
  return nodes
    .map((n) => {
      switch (n._type) {
        case 'block':
          return n.children.map((c) => c.text).join('')
        case 'legalTable':
          return [...n.head, ...n.rows.flatMap((r) => r.cells)].join(' ')
        case 'legalNote':
          return [n.title, plain(n.body)].join(' ')
        case 'consentReminder':
          return ''
      }
    })
    .join(' ')
}

/** Texte brut de la source : `[libellé](cible)` devient `libellé`. */
function sourcePlain(doc: (typeof legalDocs)[number]): string {
  const strip = (t: string) => t.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
  return doc.sections
    .map((s) =>
      s.blocks
        .map((b) => {
          switch (b.t) {
            case 'p':
              return strip(b.text)
            case 'lines':
              return strip(b.lines.join('\n'))
            case 'ul':
              return b.items.map(strip).join(' ')
            case 'table':
              return [...b.head, ...b.rows.flat()].join(' ')
            case 'note':
              return [b.title, b.body.map(strip).join(' ')].join(' ')
            case 'consent':
              return ''
          }
        })
        .join(' '),
    )
    .join(' ')
}

const norm = (t: string) => t.replace(/\s+/g, ' ').trim()

async function main() {
  for (const {id, route} of LEGAL_PAGES) {
    const doc = legalDocs.find((d) => d.route === route)
    if (!doc) throw new Error(`Source introuvable pour ${route}`)
    const data = legalDocToSanity(doc)
    const blocks = data.sections.reduce((n, s) => n + s.body.length, 0)
    console.log(`${id} : ${data.sections.length} sections, ${blocks} blocs`)
    if (!write) continue

    await client.createOrReplace({_id: id, _type: 'legalPage', ...data})

    // Relecture et comparaison mot pour mot.
    const saved = await client.getDocument<{sections: {body: LegalPortable[]}[]}>(id)
    if (!saved) throw new Error(`${id} introuvable après écriture`)
    const got = norm(saved.sections.map((s) => plain(s.body)).join(' '))
    const want = norm(sourcePlain(doc))
    if (got !== want) {
      const i = [...got].findIndex((c, k) => c !== want[k])
      throw new Error(`${id} : texte différent de la source vers « ${want.slice(Math.max(0, i - 40), i + 40)} »`)
    }
    console.log(`  écrit et vérifié : ${want.length} caractères identiques à la source`)
  }
  if (!write) console.log('Simulation seulement. Relancer avec « -- --write » pour écrire.')
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
