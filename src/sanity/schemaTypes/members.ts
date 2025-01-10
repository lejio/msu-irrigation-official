// ./src/sanity/schemaTypes/author.ts
import { defineField, defineType } from "sanity";

export const membersType = defineType({
  name: "members",
  type: "document",
  fields: [
    defineField({
      name: "name",
      type: "string",
    }),
    defineField({
      name: "people",
      title: "People in the Lab",
      type: "array",
      of: [
        {
          name: "Role",
          type: "object",
          fields: [
            defineField({
              name: "Role",
              type: "string",
            }),
            defineField({
              name: "People",
              type: "array",
              of: [
                {
                  name: "Member",
                  type: "object",
                  fields: [
                    defineField({
                      name: "name",
                      type: "string",
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
                          fields: [
                            defineField({
                              name: "name",
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
                },
              ],
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
