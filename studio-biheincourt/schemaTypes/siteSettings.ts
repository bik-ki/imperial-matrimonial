import {CogIcon} from '@sanity/icons/Cog'
import {defineArrayMember, defineField, defineType} from 'sanity'

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site settings',
  type: 'document',
  icon: CogIcon,
  fields: [
    defineField({
      name: 'socialLinks',
      title: 'Social links',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'platform',
              type: 'string',
              options: {
                list: [
                  {title: 'Facebook', value: 'facebook'},
                  {title: 'Instagram', value: 'instagram'},
                  {title: 'TikTok', value: 'tiktok'},
                  {title: 'YouTube', value: 'youtube'},
                  {title: 'LinkedIn', value: 'linkedin'},
                ],
              },
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'url',
              type: 'url',
              validation: (rule) => rule.required().uri({scheme: ['https']}),
            }),
          ],
          preview: {select: {title: 'platform', subtitle: 'url'}},
        }),
      ],
    }),
    defineField({
      name: 'contact',
      title: 'Shared contact details',
      type: 'object',
      fields: [
        defineField({
          name: 'whatsappNumber',
          title: 'WhatsApp number (international digits only)',
          type: 'string',
          validation: (rule) => rule.required().regex(/^[0-9]+$/),
        }),
        defineField({name: 'whatsappDisplay', title: 'WhatsApp display number', type: 'string'}),
        defineField({
          name: 'whatsappMessage',
          title: 'Default WhatsApp message',
          type: 'text',
          rows: 2,
        }),
        defineField({name: 'phoneDisplay', title: 'Phone display number', type: 'string'}),
        defineField({
          name: 'email',
          type: 'string',
          validation: (rule) => rule.required().email(),
        }),
        defineField({
          name: 'address',
          type: 'text',
          rows: 2,
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: 'mapsUrl',
          title: 'Map link',
          type: 'url',
          validation: (rule) => rule.uri({scheme: ['https']}),
        }),
        defineField({
          name: 'mapsEmbed',
          title: 'Map embed URL',
          type: 'url',
          validation: (rule) => rule.uri({scheme: ['https']}),
        }),
        defineField({
          name: 'hours',
          title: 'Office hours',
          type: 'array',
          of: [
            defineArrayMember({
              type: 'object',
              fields: [
                defineField({name: 'days', type: 'string', validation: (rule) => rule.required()}),
                defineField({name: 'time', type: 'string', validation: (rule) => rule.required()}),
              ],
              preview: {select: {title: 'days', subtitle: 'time'}},
            }),
          ],
        }),
      ],
      validation: (rule) => rule.required(),
    }),
  ],
})
