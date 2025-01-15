import React from "react";
import { defineField } from "sanity";

export default defineField({
  name: "title",
  description: "The title of the article.",
  type: "string",
  validation: (Rule) => [Rule.required()],
});
