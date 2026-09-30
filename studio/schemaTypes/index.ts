import {legalPage} from './documents/legalPage'
import {marketingSettings} from './documents/marketingSettings'
import {prestationPage} from './documents/prestationPage'
import {prestationsPage} from './documents/prestationsPage'
import {realisation} from './documents/realisation'
import {redirect} from './documents/redirect'
import {settings} from './documents/settings'
import {prestationBody} from './objects/prestationBody'
import {seo} from './objects/seo'

export const schemaTypes = [
  settings,
  marketingSettings,
  prestationsPage,
  prestationPage,
  realisation,
  legalPage,
  redirect,
  seo,
  prestationBody,
]

/**
 * Types à documents fixes : exclus du menu « Créer » et des actions Dupliquer et Supprimer.
 * « legalPage » et « prestationPage » en font partie : leurs documents ont des adresses fixes sur
 * le site, et les prestations sont en plus liées au menu, aux icônes et au formulaire de devis.
 */
export const singletonTypes = new Set(['settings', 'marketingSettings', 'prestationsPage', 'prestationPage', 'legalPage'])
