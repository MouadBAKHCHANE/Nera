import {defineArrayMember, defineField} from 'sanity'

/**
 * Champs répétés dans les pages (accueil, bureau, contact) : titres, paragraphes, listes,
 * partie du titre en vert, photos. Texte simple partout, comme le texte du client aujourd'hui.
 */

export const titleField = (title = 'Titre') =>
  defineField({name: 'title', title, type: 'string', validation: (rule) => rule.required()})

/** Partie du titre en vert. Vérifiée contre le titre voisin : elle doit y figurer telle quelle. */
export const accentField = (titleName = 'title') =>
  defineField({
    name: 'accent',
    title: 'Mot mis en avant',
    description: 'Partie du titre affichée en vert, recopiée à l’identique. Laisser vide pour aucune mise en avant.',
    type: 'string',
    validation: (rule) =>
      rule.custom((value, context) => {
        if (!value) return true
        const title = (context.parent as Record<string, unknown> | undefined)?.[titleName]
        return typeof title === 'string' && title.includes(value)
          ? true
          : 'Introuvable dans le titre : recopier exactement une partie du titre.'
      }),
  })

export const paragraphsField = (name = 'paragraphs', title = 'Paragraphes', description?: string) =>
  defineField({
    name,
    title,
    description: description ?? 'Un paragraphe par entrée.',
    type: 'array',
    of: [defineArrayMember({type: 'text', rows: 3})],
    validation: (rule) => rule.required().min(1),
  })

export const listField = (name: string, title: string, description?: string) =>
  defineField({
    name,
    title,
    description,
    type: 'array',
    of: [defineArrayMember({type: 'string'})],
    validation: (rule) => rule.required().min(1),
  })

export const textField = (name: string, title: string, description?: string, rows = 2) =>
  defineField({name, title, description, type: 'text', rows, validation: (rule) => rule.required()})

export const stringField = (name: string, title: string, description?: string) =>
  defineField({name, title, description, type: 'string', validation: (rule) => rule.required()})

export const imageField = (name: string, title: string, description?: string) =>
  defineField({
    name,
    title,
    description: `${description ? `${description} ` : ''}Choisir le point focal (bouton de recadrage) pour garder l’essentiel visible sur mobile.`,
    type: 'image',
    options: {hotspot: true},
    validation: (rule) => rule.required(),
  })

export const keywordsField = (group = 'seo') =>
  defineField({
    name: 'keywords',
    title: 'Expressions visées',
    description: 'Repère de rédaction : l’expression principale en tête. Google ne s’en sert pas pour le classement.',
    type: 'array',
    of: [defineArrayMember({type: 'string'})],
    options: {layout: 'tags'},
    group,
  })
