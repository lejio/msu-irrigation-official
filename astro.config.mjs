// @ts-check
import { defineConfig } from "astro/config";

import tailwind from "@astrojs/tailwind";

import sanity from "@sanity/astro";
import react from "@astrojs/react";

import vercel from "@astrojs/vercel";

export default defineConfig({
  integrations: [
    tailwind(),
    sanity({
      projectId: "dt8mf0yl",
      dataset: "production",
      // Set useCdn to false if you're building statically.
      useCdn: true,
      studioBasePath: '/studio'
    }),
    react(),
  ],

  adapter: vercel(),
});