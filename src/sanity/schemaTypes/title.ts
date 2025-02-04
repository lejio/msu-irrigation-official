// ./src/sanity/schemaTypes/author.ts
import { defineField, defineType } from "sanity";

export const titleType = defineType({
  name: "title",
  type: "document",
  fields: [
    defineField({
      name: "title_name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "title_slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: "title_name",
    },
  },
});
