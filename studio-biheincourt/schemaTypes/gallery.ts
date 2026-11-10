import {defineArrayMember, defineField, defineType} from 'sanity'

export const gallery = defineType({
  name: 'gallery',
  title: 'Gallery',
  type: 'document',
  fields: [
    defineField({name: 'title', type: 'string', initialValue: 'Gallery'}),
    defineField({
      name: 'images',
      title: 'Images',
      type: 'array',
      of: [
        defineArrayMember({
          name: 'galleryImage',
          title: 'Gallery image',
          type: 'object',
          fields: [
            defineField({
              name: 'image',
              title: 'Image',
              type: 'image',
              options: {hotspot: true},
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'alt',
              title: 'Alternative text',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
            defineField({name: 'caption', type: 'string'}),
          ],
          preview: {
            select: {title: 'caption', media: 'image'},
            prepare: ({title, media}) => ({
              title: title || 'Untitled gallery image',
              media,
            }),
          },
        }),
      ],
    }),
  ],
})
