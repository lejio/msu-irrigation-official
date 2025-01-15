import { defineField } from "sanity";

export default defineField({
  name: "mainImage",
  title: "Main Image",
  description: "The hero/main image for the article.",
  type: "object",
  fields: [
    defineField({
      name: "image",
      type: "image",
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: "alt",
          type: "string",
          title: "Alternative Text",
          description: "Displayed when the image fails to load. Required for accessibility.",
          hidden: ({ parent }) => !parent?.asset,
          validation: (Rule) => [Rule.required()],
          options: {
            isHighlighted: true,
          }
        },
        {
            name: "caption",
            type: "string",
            title: "Caption",
            description: "Displayed below the image. Optional.",
            hidden: ({ parent }) => !parent?.asset,
        }
      ],
    }),
  ],
});
