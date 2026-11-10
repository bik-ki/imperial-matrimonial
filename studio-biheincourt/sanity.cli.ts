import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: 'vk9sp82r',
    dataset: 'production'
  },
  studioHost: 'biheincourt',
  deployment: {
    appId: 'ozu7g6udo734ceoo5tzhkl86',
    /**
     * Enable auto-updates for studios.
     * Learn more at https://www.sanity.io/docs/studio/latest-version-of-sanity#k47faf43faf56
     */
    autoUpdates: true,
  },
})
