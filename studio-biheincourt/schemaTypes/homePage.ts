import {DocumentIcon} from '@sanity/icons/Document'
import {defineArrayMember, defineField, defineType} from 'sanity'
import {imageWithAltField} from './sharedFields'

export const homePage = defineType({
  name: 'homePage',
  title: 'Home page',
  type: 'document',
  icon: DocumentIcon,
  fields: [
    defineField({
      name: 'hero',
      type: 'object',
      fields: [
        defineField({name: 'eyebrow', type: 'string', validation: (rule) => rule.required()}),
        defineField({
          name: 'titleLine1',
          title: 'Title line 1',
          type: 'string',
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: 'titleLine2',
          title: 'Title line 2',
          type: 'string',
          validation: (rule) => rule.required(),
        }),
        defineField({name: 'subtitle', type: 'string', validation: (rule) => rule.required()}),
        defineField({
          name: 'description',
          type: 'text',
          rows: 3,
          validation: (rule) => rule.required(),
        }),
        defineField({name: 'primaryCtaLabel', title: 'Primary button label', type: 'string'}),
        defineField({name: 'secondaryCtaLabel', title: 'Secondary button label', type: 'string'}),
        imageWithAltField('image'),
        defineField({name: 'badgeTitle', type: 'string'}),
        defineField({name: 'badgeDetail', type: 'string'}),
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'statistics',
      title: 'Statistics strip',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({name: 'value', type: 'string', validation: (rule) => rule.required()}),
            defineField({name: 'label', type: 'string', validation: (rule) => rule.required()}),
          ],
          preview: {select: {title: 'label', subtitle: 'value'}},
        }),
      ],
    }),
    defineField({
      name: 'process',
      title: 'Process section',
      type: 'object',
      fields: [
        defineField({name: 'eyebrow', type: 'string'}),
        defineField({name: 'title', type: 'string', validation: (rule) => rule.required()}),
        defineField({
          name: 'steps',
          type: 'array',
          of: [
            defineArrayMember({
              type: 'object',
              fields: [
                defineField({name: 'title', type: 'string', validation: (rule) => rule.required()}),
                defineField({
                  name: 'description',
                  type: 'text',
                  rows: 3,
                  validation: (rule) => rule.required(),
                }),
              ],
              preview: {select: {title: 'title'}},
            }),
          ],
          validation: (rule) => rule.min(1),
        }),
        defineField({name: 'note', type: 'text', rows: 3}),
        defineField({name: 'primaryCtaLabel', title: 'Primary button label', type: 'string'}),
        defineField({name: 'secondaryCtaLabel', title: 'Secondary button label', type: 'string'}),
      ],
    }),
    defineField({
      name: 'eligibility',
      title: 'Eligibility section',
      type: 'object',
      fields: [
        defineField({name: 'eyebrow', type: 'string'}),
        defineField({name: 'title', type: 'string', validation: (rule) => rule.required()}),
        defineField({
          name: 'description',
          type: 'text',
          rows: 3,
          validation: (rule) => rule.required(),
        }),
      ],
    }),
    defineField({
      name: 'servicesSection',
      title: 'Services section',
      type: 'object',
      fields: [
        defineField({name: 'eyebrow', type: 'string'}),
        defineField({name: 'title', type: 'string', validation: (rule) => rule.required()}),
        defineField({
          name: 'consultationCtaLabel',
          title: 'Consultation button label',
          type: 'string',
        }),
        defineField({name: 'whatsappCtaLabel', title: 'WhatsApp button label', type: 'string'}),
      ],
    }),
    defineField({
      name: 'about',
      title: 'About the practice section',
      type: 'object',
      fields: [
        defineField({name: 'eyebrow', type: 'string'}),
        defineField({name: 'title', type: 'string', validation: (rule) => rule.required()}),
        defineField({
          name: 'description',
          type: 'text',
          rows: 4,
          validation: (rule) => rule.required(),
        }),
        defineField({name: 'linkLabel', title: 'Link label', type: 'string'}),
        imageWithAltField('image'),
      ],
    }),
    defineField({
      name: 'instagram',
      title: 'Instagram section',
      type: 'object',
      fields: [
        defineField({name: 'eyebrow', type: 'string'}),
        defineField({name: 'title', type: 'string', validation: (rule) => rule.required()}),
        defineField({name: 'note', type: 'string'}),
        defineField({
          name: 'posts',
          type: 'array',
          of: [
            defineArrayMember({
              type: 'object',
              fields: [
                imageWithAltField('image'),
                defineField({
                  name: 'caption',
                  type: 'text',
                  rows: 3,
                  validation: (rule) => rule.required(),
                }),
              ],
              preview: {select: {title: 'caption', media: 'image'}},
            }),
          ],
        }),
        defineField({
          name: 'featuredReel',
          title: 'Featured reel preview',
          type: 'object',
          fields: [
            imageWithAltField('image'),
            defineField({name: 'caption', type: 'text', rows: 3}),
          ],
        }),
      ],
    }),
    defineField({
      name: 'blogPreview',
      title: 'Blog preview section',
      type: 'object',
      fields: [
        defineField({name: 'eyebrow', type: 'string'}),
        defineField({name: 'title', type: 'string', validation: (rule) => rule.required()}),
        defineField({name: 'allArticlesLabel', title: 'All articles link label', type: 'string'}),
      ],
    }),
  ],
})
