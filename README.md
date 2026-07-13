# Context Cost

[![Site](https://img.shields.io/badge/site-www.contextcost.dev-2563eb)](https://www.contextcost.dev)
[![DOI](https://zenodo.org/badge/DOI/10.5281/zenodo.21331759.svg)](https://doi.org/10.5281/zenodo.21331759)

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

## License

| Scope | License |
|-------|---------|
| CMP book content (`src/content/research/cmp/`, `/cmp/` pages) | [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/) — see [LICENSE-CMP.md](./LICENSE-CMP.md) |
| Site code, config, and non-CMP content | All rights reserved unless otherwise noted in file headers |

## Citation

The citable CMP preprint is archived on Zenodo: [10.5281/zenodo.21331759](https://doi.org/10.5281/zenodo.21331759). See [CITATION.cff](./CITATION.cff) for machine-readable metadata.

## Publishing a CMP PDF

Pushing a tag matching `cmp-v*` runs the CMP PDF release workflow. It builds the static site from that exact tag, renders `/cmp/print/` to PDF, creates a SHA-256 checksum, and publishes both files in a GitHub Release. The release can then be archived by the enabled Zenodo GitHub integration.

Create a tag from the version commit you intend to preserve:

```bash
git tag -a cmp-v1.0.0 <commit-sha> -m "Context Minimization Principle v1.0.0"
git push origin cmp-v1.0.0
```

For a newly pushed tag that already contains this workflow, the release starts automatically. A tag pointing to an older commit cannot start the workflow itself because that commit predates the workflow file. In that case, open **Actions → Publish CMP PDF Release → Run workflow**, select `master`, and enter the existing tag (for example `cmp-v0.1.0`). The current workflow checks out the requested tag before building it.

The selected historical tag must still contain a buildable Astro site and the `/cmp/print/` route. The workflow will not overwrite an already published release. To retry an incomplete run, leave or recreate the GitHub Release as a draft, then dispatch **Publish CMP PDF Release** with the existing tag.

## Author

- GitHub: [@leric](https://github.com/leric)
- Email: leric.zhang@gmail.com
