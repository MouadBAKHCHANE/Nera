import {defineArrayMember, defineField, defineType} from 'sanity'
import {ThListIcon} from '@sanity/icons/ThList'
import {ThLargeIcon} from '@sanity/icons/ThLarge'

/**
 * Texte d'une section de prestation : paragraphes, listes à puces et sous-titres, plus deux
 * blocs de mise en forme du site, la frise numérotée et le groupe de cartes.
 *
 * Texte simple, sans gras ni liens : c'est le texte du client tel qu'il est affiché aujourd'hui.
 * Un sous-titre regroupe tout ce qui le suit jusqu'au sous-titre suivant ou la fin de la section
 * (voir `lib/prestations/portable.ts`).
 */

/** Élément d'une frise ou d'un groupe de cartes : un titre et un court texte. */
const titledItem = defineArrayMember({
  name: 'titledItem',
  title: 'Élément',
  type: 'object',
  fields: [
    defineField({name: 'title', title: 'Titre', type: 'string', validation: (rule) => rule.required()}),
    defineField({name: 'text', title: 'Texte', type: 'text', rows: 3, validation: (rule) => rule.required()}),
  ],
  preview: {select: {title: 'title', subtitle: 'text'}},
})

export const prestationBody = defineType({
  name: 'prestationBody',
  title: 'Texte',
  type: 'array',
  of: [
    defineArrayMember({
      type: 'block',
      styles: [
        {title: 'Paragraphe', value: 'normal'},
        {title: 'Sous-titre', value: 'h3'},
      ],
      lists: [{title: 'Liste à puces', value: 'bullet'}],
      marks: {decorators: [], annotations: []},
    }),
    defineArrayMember({
      name: 'steps',
      title: 'Frise numérotée',
      description: 'Étapes numérotées automatiquement, reliées par un trait.',
      type: 'object',
      icon: ThListIcon,
      fields: [
        defineField({
          name: 'items',
          title: 'Étapes',
          type: 'array',
          of: [titledItem],
          validation: (rule) => rule.required().min(1),
        }),
      ],
      preview: {
        select: {items: 'items'},
        prepare: ({items}) => ({
          title: `Frise : ${(items ?? []).length} étape(s)`,
          subtitle: (items ?? []).map((i: {title?: string}) => i.title).join(' · '),
        }),
      },
    }),
    defineArrayMember({
      name: 'cards',
      title: 'Cartes',
      description: 'Cartes côte à côte, trois par ligne sur ordinateur.',
      type: 'object',
      icon: ThLargeIcon,
      fields: [
        defineField({
          name: 'items',
          title: 'Cartes',
          type: 'array',
          of: [titledItem],
          validation: (rule) => rule.required().min(1),
        }),
      ],
      preview: {
        select: {items: 'items'},
        prepare: ({items}) => ({
          title: `Cartes : ${(items ?? []).length}`,
          subtitle: (items ?? []).map((i: {title?: string}) => i.title).join(' · '),
        }),
      },
    }),
  ],
})
