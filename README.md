# Context Cost

[![Site](https://img.shields.io/badge/site-www.contextcost.dev-2563eb)](https://www.contextcost.dev)

Source repository for **[Context Cost](https://www.contextcost.dev)** — essays on software design, context cost, and AI-assisted engineering, plus the online book [**Context Minimization Principle (CMP)**](https://www.contextcost.dev/cmp/).

By [Lianghui Zhang (Leric Zhang)](https://github.com/leric).

## Discussions — comments & feedback

This repository’s **[GitHub Discussions](https://github.com/leric/leric.github.io/discussions)** is the public forum for everything published on [contextcost.dev](https://www.contextcost.dev). The static site has no built-in comment widget; conversation happens here instead.

| What you read on the site | How to discuss it |
|---------------------------|-------------------|
| **[CMP](https://www.contextcost.dev/cmp/) chapters** | Each chapter footer links to **Discuss this chapter** → same Discussions space. Start a thread per chapter, or reply to an existing one. |
| **[Blog essays](https://www.contextcost.dev/blog)** | Open a [new discussion](https://github.com/leric/leric.github.io/discussions/new/choose) and mention the essay title or link (e.g. `https://www.contextcost.dev/blog/…`) so others can find the thread. |

Use Discussions for questions, counterarguments, examples from your own work, typo reports, and ideas that might become follow-up essays or CMP revisions. Pull requests are still the right channel for direct text fixes; Discussions is for dialogue that does not need to land as a patch immediately.

## Live site

| | |
|---|---|
| **Home** | https://www.contextcost.dev |
| **Essays** | https://www.contextcost.dev/blog |
| **CMP book** | https://www.contextcost.dev/cmp |
| **Blog RSS** | https://www.contextcost.dev/rss.xml |
| **CMP RSS** | https://www.contextcost.dev/research/cmp/rss.xml |
| **Discussions** | https://github.com/leric/leric.github.io/discussions |

## What's in this repo

- **Blog** — Markdown/MDX essays under `src/content/blog/`
- **CMP research** — structured chapters under `src/content/research/cmp/` (also served at `/cmp/`)

Topics include software architecture, domain-driven design, AI coding agents, context engineering, and the CMP research program.

## Tech stack

- [Astro](https://astro.build/) 5 (static output)
- Content collections with Zod schemas (`src/content.config.ts`)
- MDX, [GFM](https://github.github.com/gfm/), math via `remark-math` + KaTeX
- Sitemap and RSS integrations

## Related repositories

- **[leric/cmp](https://github.com/leric/cmp)** — primary CMP paper / research source (canonical development may happen there; this repo hosts the published web edition).

## License

| Scope | License |
|-------|---------|
| CMP book content (`src/content/research/cmp/`, `/cmp/` pages) | [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/) — see [LICENSE-CMP.md](./LICENSE-CMP.md) |
| Site code, config, and non-CMP content | All rights reserved unless otherwise noted in file headers |

## Citation

See [CITATION.cff](./CITATION.cff) for machine-readable citation metadata for the Context Minimization Principle.

## Author

- GitHub: [@leric](https://github.com/leric)
- Email: leric.zhang@gmail.com
