// @ts-check
import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import rehypeSlug from "rehype-slug";

const remarkPlugins = [remarkGfm, remarkMath];
const rehypePlugins = [rehypeSlug, rehypeKatex];

// https://astro.build/config
export default defineConfig({
  site: "https://www.contextcost.dev",
  base: "/",
  output: "static",
  redirects: {
    "/research/cmp": "/cmp/",
  },
  markdown: {
    remarkPlugins,
    rehypePlugins,
    shikiConfig: {
      theme: "github-light",
    },
  },
  integrations: [
    mdx({
      remarkPlugins,
      rehypePlugins,
      optimize: true,
    }),
    sitemap(),
  ],
});
