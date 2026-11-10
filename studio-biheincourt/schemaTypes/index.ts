import {blogPost} from './blogPost'
import {faq} from './faq'
import {gallery} from './gallery'
import {homePage} from './homePage'
import {service} from './service'
import {siteSettings} from './siteSettings'
import consultationPromo from '../../sanity/schemaTypes/consultationPromo'

export const schemaTypes = [
  blogPost,
  service,
  faq,
  gallery,
  homePage,
  siteSettings,
  consultationPromo,
]
