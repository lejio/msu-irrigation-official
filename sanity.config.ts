// ./sanity.config.ts
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schema } from "./src/sanity/schemaTypes";
import { presentationTool } from "sanity/presentation";
import { resolve } from "./src/sanity/lib/resolve";

export default defineConfig({
  projectId: "dt8mf0yl",
  dataset: "production",
  plugins: [
    structureTool(),
    presentationTool({
      title: "Visual Editor",
      resolve,
      previewUrl: `${location.origin}`,
    }),
  ],
  schema,
});
