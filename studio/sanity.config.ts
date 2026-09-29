import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {frFRLocale} from '@sanity/locale-fr-fr'
import {dataset, projectId} from './env'
import {schemaTypes, singletonTypes} from './schemaTypes'
import {structure} from './structure'

export default defineConfig({
  name: 'default',
  title: 'NERA Ingénieurs Conseils',
  projectId,
  dataset,
  plugins: [structureTool({structure}), frFRLocale()],
  schema: {
    types: schemaTypes,
    // Pas de « Réglages du site » dans le menu Créer : il n'en existe qu'un.
    templates: (templates) => templates.filter(({schemaType}) => !singletonTypes.has(schemaType)),
  },
  document: {
    // Sur un document unique : publier, annuler, restaurer. Ni dupliquer ni supprimer.
    actions: (actions, {schemaType}) =>
      singletonTypes.has(schemaType)
        ? actions.filter(({action}) => action && ['publish', 'discardChanges', 'restore'].includes(action))
        : actions,
  },
})
