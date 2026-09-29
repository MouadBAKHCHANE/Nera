import {defineField, defineType, type SanityDocumentLike} from 'sanity'
import {LinkIcon} from '@sanity/icons/Link'

/**
 * Redirection d'une ancienne adresse vers une nouvelle, appliquée par le site.
 * À créer chaque fois qu'une page change d'adresse, pour garder son référencement.
 */
function isValidPath(value: string | undefined) {
  if (!value) return 'Obligatoire'
  if (!value.startsWith('/')) return 'Doit commencer par « / », par exemple /ancienne-page'
  if (/[^a-zA-Z0-9\-_/]/.test(value)) return 'Lettres sans accent, chiffres, tirets et « / » seulement'
  return true
}

export const redirect = defineType({
  name: 'redirect',
  title: 'Redirection',
  type: 'document',
  icon: LinkIcon,
  validation: (rule) =>
    rule.custom((doc: SanityDocumentLike | undefined) =>
      doc?.source && doc.source === doc?.destination ? 'L’ancienne et la nouvelle adresse sont identiques.' : true,
    ),
  fields: [
    defineField({
      name: 'source',
      title: 'Ancienne adresse',
      description: 'Le chemin seul, sans le domaine. Par exemple /prestations/ancien-nom',
      type: 'string',
      validation: (rule) => rule.required().custom(isValidPath),
    }),
    defineField({
      name: 'destination',
      title: 'Nouvelle adresse',
      description: 'Un chemin du site (/prestations/nouveau-nom) ou une adresse complète (https://…).',
      type: 'string',
      validation: (rule) =>
        rule
          .required()
          .custom((value?: string) =>
            !value || value.startsWith('/') || value.startsWith('https://')
              ? true
              : 'Doit commencer par « / » ou par « https:// ».',
          ),
    }),
    defineField({
      name: 'permanent',
      title: 'Redirection définitive',
      description: 'Oui (301) si l’ancienne page ne reviendra pas : Google transfère alors son référencement.',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({name: 'isEnabled', title: 'Active', type: 'boolean', initialValue: true}),
  ],
  preview: {
    select: {source: 'source', destination: 'destination', isEnabled: 'isEnabled'},
    prepare: ({source, destination, isEnabled}) => ({
      title: `${source ?? '?'} → ${destination ?? '?'}`,
      subtitle: isEnabled === false ? 'Désactivée' : undefined,
    }),
  },
})
