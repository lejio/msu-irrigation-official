import React from 'react'
import { defineField } from 'sanity'

export default defineField({
    name: "slug",
    description: <>The slug for the article. Used to generate the URL. <br />Must be unique. <br />Recommend using the "Generate" button.</>,
    type: "slug",
    options: {
      source: "title",
      maxLength: 96,
    },
    validation: Rule => [
      Rule.required(),
    ],
  });