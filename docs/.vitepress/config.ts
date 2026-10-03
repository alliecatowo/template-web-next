import { defineConfig } from "vitepress";

// GitHub Pages serves project sites under /<repo>/. Set DOCS_BASE=/ for a custom domain.
export default defineConfig({
  title: "template-web-next",
  description: "Next.js web app template: pnpm, Biome, vitest, Playwright, Vercel, mise, lefthook, CI and a VitePress docs site.",
  base: process.env.DOCS_BASE ?? "/template-web-next/",
  cleanUrls: true,
  lastUpdated: true,
  themeConfig: {
    nav: [{ text: "Guide", link: "/guide/getting-started" }],
    sidebar: [
      { text: "Guide", items: [{ text: "Getting started", link: "/guide/getting-started" }] },
    ],
    socialLinks: [{ icon: "github", link: "https://github.com/alliecatowo/template-web-next" }],
    search: { provider: "local" },
  },
});
