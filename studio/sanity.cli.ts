import {defineCliConfig} from 'sanity/cli'
import {dataset, projectId} from './env'

export default defineCliConfig({
  api: {projectId, dataset},
  // Studio hébergé par Sanity, séparé du site : ses mises à jour ne passent pas par Vercel.
  deployment: {autoUpdates: true},
})
