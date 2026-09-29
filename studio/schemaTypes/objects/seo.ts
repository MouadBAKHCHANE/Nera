import {defineField, defineType} from 'sanity'
import {SearchIcon} from '@sanity/icons/Search'

/**
 * Bloc SEO réutilisable. Aucun champ n'est obligatoire : sans valeur, le site retombe sur le
 * titre du contenu et sur les réglages SEO par défaut.
 * Les longueurs sont des avertissements, pas des erreurs : Google tronque, il ne rejette pas.
 */
export const seo = defineType({
  name: 'seo',
  title: 'Référencement (SEO)',
  type: 'object',
  icon: SearchIcon,
  options: {collapsible: true, collapsed: true},
  fields: [
    defineField({
      name: 'title',
      title: 'Titre pour Google',
      description: 'Affiché dans les résultats de recherche. Idéalement entre 30 et 60 caractères.',
      type: 'string',
      validation: (rule) =>
        rule
          .custom((value?: string) => {
            if (!value) return true
            if (value.length > 60) return `${value.length} caractères : Google coupera au-delà de 60.`
            if (value.length < 30) return `${value.length} caractères : un titre plus descriptif aide le référencement.`
            return true
          })
          .warning(),
    }),
    defineField({
      name: 'description',
      title: 'Description pour Google',
      description: 'Le résumé sous le titre dans Google. Idéalement entre 70 et 160 caractères.',
      type: 'text',
      rows: 3,
      validation: (rule) =>
        rule
          .custom((value?: string) => {
            if (!value) return true
            if (value.length > 160) return `${value.length} caractères : Google coupera au-delà de 160.`
            if (value.length < 70) return `${value.length} caractères : une description plus complète est conseillée.`
            return true
          })
          .warning(),
    }),
    defineField({
      name: 'image',
      title: 'Image de partage',
      description: 'Affichée quand la page est partagée sur LinkedIn, WhatsApp… Format conseillé : 1200 × 630.',
      type: 'image',
      options: {hotspot: true},
    }),
    defineField({
      name: 'noIndex',
      title: 'Masquer cette page de Google',
      description: 'La page reste accessible, mais Google ne l’affiche plus dans ses résultats.',
      type: 'boolean',
      initialValue: false,
    }),
  ],
})
