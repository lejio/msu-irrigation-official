import React from "react";
import { defineField } from "sanity";

export default defineField({
  name: "author",
  description: <>The author of the article. Please select "Add Item" to add a new author(s) <br />If you do not see the author here, please navigate to "Author" and create one.</>,
  type: "array",
  of: [{ type: "reference", to: { type: "authors" } }],
  validation: Rule => [
    Rule.required(),
  ],
});
