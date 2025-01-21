import { defineField, defineType } from "sanity";

export const publicationType = defineType({
  name: "publication",
  title: "Publications",
  type: "document",
  fields: [
    defineField({
      name: "publication_title",
      type: "string",
      title: "Publication Title",
      description: "The name of the publication.",
      validation: (Rule) => [Rule.required()],
    }),
    defineField({
      name: "publication_slug",
      type: "slug",
      title: "Publication Slug",
      description: "The slug of the publication.",
      validation: (Rule) => [Rule.required()],
      options: {
        source: "publication_title",
        maxLength: 96,
      },
    }),
    defineField({
      name: "publication_authors",
      type: "array",
      title: "Publication Authors",
      description: "The authors of the publication.",
      of: [{ type: "reference", to: { type: "members" } }],
      validation: (Rule) => [Rule.required()],
    }),
    defineField({
      name: "publication_image_field",
      title: "Publication Image",
      description: "The hero/main image for the publication.",
      type: "object",
      fields: [
        defineField({
          name: "publication_image",
          type: "image",
          options: {
            hotspot: true,
          },
          fields: [
            {
              name: "publication_image_alt",
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
              name: "publication_image_caption",
              type: "string",
              title: "Caption",
              description: "Displayed below the image. Optional.",
              hidden: ({ parent }) => !parent?.asset,
            },
          ],
        }),
      ],
    }),
    defineField({
      name: "publishedAt",
      description:
        "The date the article was published. Defaults to current time (EST).",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: "abstract",
      title: "Abstract",
      type: "array",
      of: [{ type: "block" }],
      description: "The abstract of the publication.",
      validation: (Rule) => [
        Rule.custom(
          (blocks: { children?: { text: string }[] }[] | undefined) => {
            if (!blocks) return true; // Allow empty field

            // Join all text content in the blocks
            const text = blocks
              .map((block) =>
                block.children
                  ? block.children.map((child) => child.text).join(" ")
                  : ""
              )
              .join(" ");

            // Split text into words and count them
            const wordCount = text
              .split(/\s+/) // Split by whitespace (handles multiple spaces)
              .filter((word) => word.length > 0).length; // Exclude empty strings

            // Check word count
            return (
              wordCount <= 300 ||
              `Abstract must be 300 words or less. Current word count: ${wordCount}`
            );
          }
        ),
        Rule.required(),
      ],
    }),
    defineField({
      name: "publication_link",
      title: "Link to Publication",
      type: "url",
      validation: (Rule) => [Rule.required()],
    }),
  ],

  preview: {
    select: {
      title: "publication_title", // Direct reference to the field
      author: "publication_authors.0.name", // First author's name
      media: "publication_image_field.publication_image", // Main image
    },
    prepare(selection) {
      const { title, author, media } = selection;
      return {
        title,
        subtitle: author ? `by ${author}` : "No author",
        media,
      };
    },
  },
});
