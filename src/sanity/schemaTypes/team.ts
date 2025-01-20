// ./src/sanity/schemaTypes/author.ts
import { defineField, defineType } from "sanity";

export const teamType = defineType({
  name: "team",
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
    defineField(
      {
        name: "title_sections",
        type: "array",
        validation: (Rule) => Rule.min(1),
        of: [{
          name: "title_section",
          type: "object",
          fields: [
            defineField({
              name: "title",
              type: "reference",
              to: [{ type: "title" }],
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "title_members",
              type: "array",
              of: [{
                type: "reference",
                to: [{ type: "members" }],
              }],
            }),
          ],
          preview: {
            select: {
              title: "title.title",
            },
          },
        }],
      }
    )
  ],
  preview: {
    select: {
      title: "name",
      media: "image",
    },
  },
});
