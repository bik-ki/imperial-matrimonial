import {DocumentTextIcon} from '@sanity/icons/DocumentText'
import {defineArrayMember, defineField, defineType} from 'sanity'
import {imageWithAltField, portableTextField, seoFields, slugField} from './sharedFields'

export const service = defineType({
  name: 'service',
  title: 'Service',
  type: 'document',
  icon: DocumentTextIcon,
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'titleNe',
      title: 'Title in Nepali',
      type: 'string',
    }),
    slugField(),
    defineField({
      name: 'summary',
      type: 'text',
      rows: 3,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'summaryNe',
      title: 'Summary in Nepali',
      type: 'text',
      rows: 3,
    }),
    portableTextField(),
    defineField({
      name: 'includes',
      title: "What's included",
      type: 'array',
      of: [defineArrayMember({type: 'string'})],
    }),
    defineField({
      name: 'pendingDetails',
      title: 'Details to verify',
      type: 'text',
      rows: 3,
    }),
    imageWithAltField('image'),
    ...seoFields,
  ],
  preview: {
    select: {
      title: 'title',
      media: 'image',
    },
  },
})
