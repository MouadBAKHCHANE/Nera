import {legalPage} from './documents/legalPage'
import {marketingSettings} from './documents/marketingSettings'
import {realisation} from './documents/realisation'
import {redirect} from './documents/redirect'
import {settings} from './documents/settings'
import {seo} from './objects/seo'

export const schemaTypes = [settings, marketingSettings, realisation, legalPage, redirect, seo]

/**
 * Types à documents fixes : exclus du menu « Créer » et des actions Dupliquer et Supprimer.
 * « legalPage » en fait partie : ses trois documents ont des adresses fixes sur le site.
 */
export const singletonTypes = new Set(['settings', 'marketingSettings', 'legalPage'])
