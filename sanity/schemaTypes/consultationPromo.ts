const consultationPromo = {
  name: "consultationPromo",
  title: "Consultation promotion",
  type: "document",
  fields: [
    {
      name: "enabled",
      title: "Show promotion",
      type: "boolean",
      initialValue: false,
    },
    {
      name: "image",
      title: "Image",
      type: "image",
      options: { hotspot: true },
    },
    {
      name: "imageAlt",
      title: "Image alternative text",
      type: "string",
      description: "Describe the image for visitors using assistive technology.",
      validation: (Rule: { required: () => unknown }) => Rule.required(),
    },
    {
      name: "heading",
      title: "Heading",
      type: "string",
      validation: (Rule: { required: () => unknown }) => Rule.required(),
    },
    {
      name: "message",
      title: "Message",
      type: "text",
      rows: 3,
      validation: (Rule: { required: () => unknown }) => Rule.required(),
    },
    {
      name: "buttonLabel",
      title: "Button label",
      type: "string",
      validation: (Rule: { required: () => unknown }) => Rule.required(),
    },
    {
      name: "ctaDestination",
      title: "Button destination",
      type: "string",
      options: {
        list: [
          { title: "Open consultation booking", value: "consultation" },
          { title: "Open contact page", value: "contact" },
        ],
        layout: "radio",
      },
      initialValue: "consultation",
      validation: (Rule: { required: () => unknown }) => Rule.required(),
    },
  ],
};

export default consultationPromo;
