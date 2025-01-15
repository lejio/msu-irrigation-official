import { defineField, defineType } from "sanity";
import Slug from "./ArticleFields/Slug";
import Authors from "./ArticleFields/Authors";
import Title from "./ArticleFields/Title";
import Image from "./ArticleFields/Image";

export const articleType = defineType({
  name: "article",
  type: "document",
  fields: [
    Title,
    Slug,
    Authors,
    Image,
    defineField({
      name: "publishedAt",
      description:
        "The date the article was published. Defaults to current time (EST).",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: "sections",
      type: "array",
      description: "The section is made up of Section objects. You can create multiple sections to create complex articles.",
      title: "Sections",
      of: [
        {
          type: "object",
          name: "section",
          title: "Section",
          description: "A section of the article. Can contain text and images.",
          fields: [
            defineField({
              name: "title",
              type: "string",
              title: "Section Title",
              description: "Only used for author reference, this is not displayed on the site.",
              validation: (Rule) => [Rule.required()],
            }),
            defineField({
              name: "displayTitle",
              type: "string",
              title: "Display Title",
              description: "Section title displayed in the article.",
              validation: (Rule) => [Rule.required()],
            }),
            defineField({
              name: "content",
              type: "blockContent",
              title: "Section Content",
              description: "The content of the section. Can be text and images.",
              validation: (Rule) => [Rule.required()],
            }),
            defineField({
              name: "image",
              description: "Image for the section. Optional.",
              type: "object",
              fields: [
                defineField({
                  name: "sectionImage",
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
                    {
                      name: "caption",
                      type: "string",
                      title: "Caption",
                      description: "Displayed below the image. Optional.",
                      hidden: ({ parent }) => !parent?.asset,
                    },
                    {
                      name: "imagePosition",
                      type: "string",
                      title: "Image Position",
                      initialValue: "Top",
                      description: "The position of the image in the section.",
                      hidden: ({ parent }) => !parent?.asset,
                      options: {
                        list: [
                          { title: "Top", value: "top" },
                          { title: "Bottom", value: "bottom" },
                          { title: "Left", value: "left" },
                          { title: "Right", value: "right" },
                        ],
                      },
                    },
                  ],
                }),
              ],
            }),
          ],
        },
      ],
    }),
  ],

  preview: {
    select: {
      title: "title",
      author: "authors.name",
      media: "mainImage",
    },
    prepare(selection) {
      const { author } = selection;
      return { ...selection, subtitle: author && `by ${author}` };
    },
  },
});
