import {defineConfig, defineSingleton} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'

const singletonDefinitions = [
  defineSingleton({documentId: 'homePage', schemaType: 'homePage'}),
  defineSingleton({documentId: 'siteSettings', schemaType: 'siteSettings'}),
  defineSingleton({documentId: 'gallery', schemaType: 'gallery'}),
  defineSingleton({documentId: 'consultationPromo', schemaType: 'consultationPromo'}),
]

export default defineConfig({
  name: 'default',
  title: 'biheincourt',

  projectId: 'vk9sp82r',
  dataset: 'production',

  plugins: [structureTool(), visionTool()],

  schema: {
    types: schemaTypes,
  },

  document: {
    singletons: singletonDefinitions,
  },
})
