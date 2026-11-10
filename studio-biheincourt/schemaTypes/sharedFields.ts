import {defineArrayMember, defineField} from 'sanity'

export function slugField() {
  return defineField({
    name: 'slug',
    type: 'slug',
    options: {source: 'title', maxLength: 96},
    validation: (rule) => rule.required(),
  })
}

export function portableTextField(name = 'body') {
  return defineField({
    name,
    type: 'array',
    of: [defineArrayMember({type: 'block'})],
    validation: (rule) => rule.required().min(1),
  })
}

export function imageWithAltField(name: string) {
  return defineField({
    name,
    type: 'image',
    options: {hotspot: true},
    fields: [
      defineField({
        name: 'alt',
        title: 'Alternative text',
        type: 'string',
        validation: (rule) => rule.required(),
      }),
    ],
    validation: (rule) => rule.required(),
  })
}

export const seoFields = [
  defineField({
    name: 'seoTitle',
    title: 'SEO title',
    type: 'string',
    validation: (rule) => rule.max(60),
  }),
  defineField({
    name: 'seoDescription',
    title: 'SEO description',
    type: 'text',
    rows: 3,
    validation: (rule) => rule.max(160),
  }),
]
