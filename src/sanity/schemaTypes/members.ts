// ./src/sanity/schemaTypes/author.ts
import { defineField, defineType } from "sanity";

export const membersType = defineType({
  name: "members",
  type: "document",
  fields: [
    defineField({
      name: "name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      type: "slug",
      options: {
        source: "name",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "role",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "title",
      type: "reference",
      validation: (Rule) => Rule.required(),
      to: [{ type: "title" }],
    }),
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
          description:
            "Displayed when the image fails to load. Required for accessibility.",
          hidden: ({ parent }) => !parent?.asset,
          validation: (Rule) => [Rule.required()],
          options: {
            isHighlighted: true,
          },
        },
      ],
    }),
    defineField({
      name: "bio",
      type: "array",
      of: [
        {
          type: "block",
          styles: [{ title: "Normal", value: "normal" }],
          lists: [],
        },
      ],
    }),
    defineField({
      name: "socials",
      type: "array",
      of: [
        {
          type: "object",
          name: "social",
          fields: [
            defineField({
              name: "platform",
              type: "string",
            }),
            defineField({
              name: "url",
              type: "url",
            }),
          ],
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: "name",
      media: "image",
    },
  },
});
