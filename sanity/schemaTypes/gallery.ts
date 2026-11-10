/**
 * Register this document in the Sanity Studio schemaTypes array.
 * The order of `images` is the published gallery order; editors can reorder
 * items directly in Studio before publishing the document.
 */
export const gallery = {
  name: "gallery",
  title: "Gallery",
  type: "document",
  fields: [
    { name: "title", title: "Title", type: "string", initialValue: "Gallery" },
    {
      name: "images",
      title: "Images",
      type: "array",
      of: [
        {
          name: "galleryImage",
          title: "Gallery image",
          type: "object",
          fields: [
            {
              name: "image",
              title: "Image",
              type: "image",
              options: { hotspot: true },
              validation: (Rule: { required: () => unknown }) => Rule.required(),
            },
            {
              name: "alt",
              title: "Alternative text",
              type: "string",
              validation: (Rule: { required: () => unknown }) => Rule.required(),
            },
            { name: "caption", title: "Caption", type: "string" },
          ],
          preview: {
            select: { title: "caption", media: "image" },
            prepare: ({ title, media }: { title?: string; media?: unknown }) => ({
              title: title || "Untitled gallery image",
              media,
            }),
          },
        },
      ],
    },
  ],
};

export default gallery;
