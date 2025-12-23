// @ts-check
import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import remarkGfm from "remark-gfm";

// https://astro.build/config
export default defineConfig({
  site: "https://www.airic.dev",
  base: "/",
  output: "static",
  markdown: {
    remarkPlugins: [remarkGfm],
  },
  integrations: [mdx(), sitemap()],
});
