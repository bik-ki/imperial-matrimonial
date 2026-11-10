import {blogPost} from './blogPost'
import {faq} from './faq'
import {homePage} from './homePage'
import {service} from './service'
import {siteSettings} from './siteSettings'
import gallery from '../../sanity/schemaTypes/gallery'
import consultationPromo from '../../sanity/schemaTypes/consultationPromo'

export const schemaTypes = [
  blogPost,
  service,
  faq,
  homePage,
  siteSettings,
  gallery,
  consultationPromo,
]
