import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const baseDir = path.join(root, "src/content/research/cmp");

const SITE = "https://www.contextcost.dev";

/** @type {{ part: string, order: number, slug: string, status: string, title: string, description: string }[]} */
const chapters = [
	// Part I
	{
		part: "foundations",
		order: 1,
		slug: "why-ai-agents",
		status: "published",
		title: "Why AI Agents Are Going to Force a Theory of Software Design",
		description:
			"Manifesto placeholder: why comprehension cost becomes the bottleneck when machines read and change code at scale.",
	},
	{
		part: "foundations",
		order: 2,
		slug: "principles-and-definitions",
		status: "draft",
		title: "Principles and Definitions (draft)",
		description: "Placeholder chapter: core terms, scope, and working definitions for CMP.",
	},
	{
		part: "foundations",
		order: 3,
		slug: "context-as-economic-cost",
		status: "draft",
		title: "Context as Economic Cost (draft)",
		description: "Placeholder chapter: reframing context load as a measurable design cost.",
	},
	{
		part: "foundations",
		order: 4,
		slug: "scope-and-non-goals",
		status: "draft",
		title: "Scope and Non-Goals (draft)",
		description: "Placeholder chapter: what CMP claims, what it does not, and how to falsify it.",
	},
	// Part II
	{
		part: "two-shapes",
		order: 1,
		slug: "two-shapes-overview",
		status: "draft",
		title: "Two Shapes Overview (draft)",
		description: "Placeholder chapter: contrasting structural shapes implied by CMP.",
	},
	{
		part: "two-shapes",
		order: 2,
		slug: "mechanical-vs-intentional",
		status: "draft",
		title: "Mechanical vs Intentional Structure (draft)",
		description: "Placeholder chapter: separating accidental coupling from domain intent.",
	},
	{
		part: "two-shapes",
		order: 3,
		slug: "bridges-and-mismatches",
		status: "draft",
		title: "Bridges and Mismatches (draft)",
		description: "Placeholder chapter: where abstractions help vs where they hide risk.",
	},
	{
		part: "two-shapes",
		order: 4,
		slug: "worked-example-stretch",
		status: "draft",
		title: "Worked Example Stretch (draft)",
		description: "Placeholder chapter: a single system traced through two design shapes.",
	},
	// Part III
	{
		part: "design",
		order: 1,
		slug: "modularity-revisited",
		status: "draft",
		title: "Modularity Revisited (draft)",
		description: "Placeholder chapter: modularity as a context-minimization strategy.",
	},
	{
		part: "design",
		order: 2,
		slug: "naming-and-surface-area",
		status: "draft",
		title: "Naming and Surface Area (draft)",
		description: "Placeholder chapter: APIs, names, and the cost of discovery.",
	},
	{
		part: "design",
		order: 3,
		slug: "dependency-rulebook",
		status: "draft",
		title: "Dependency Rulebook (draft)",
		description: "Placeholder chapter: dependency direction as a lever on context footprint.",
	},
	{
		part: "design",
		order: 4,
		slug: "intentional-leaks",
		status: "draft",
		title: "Intentional Leaks (draft)",
		description: "Placeholder chapter: when controlled leakage beats false encapsulation.",
	},
	// Part IV
	{
		part: "mechanical-indexes",
		order: 1,
		slug: "what-counts-as-an-index",
		status: "draft",
		title: "What Counts as an Index (draft)",
		description: "Placeholder chapter: indexes as mechanical context shortcuts.",
	},
	{
		part: "mechanical-indexes",
		order: 2,
		slug: "retrieval-composition",
		status: "draft",
		title: "Retrieval Composition (draft)",
		description: "Placeholder chapter: composing retrievals without exploding working context.",
	},
	{
		part: "mechanical-indexes",
		order: 3,
		slug: "correctness-and-staleness",
		status: "draft",
		title: "Correctness and Staleness (draft)",
		description: "Placeholder chapter: staleness as a first-class design constraint.",
	},
	// Part V
	{
		part: "uncertainty",
		order: 1,
		slug: "epistemic-footprint",
		status: "draft",
		title: "Epistemic Footprint (draft)",
		description: "Placeholder chapter: uncertainty about the system vs uncertainty in the domain.",
	},
	{
		part: "uncertainty",
		order: 2,
		slug: "operational-risk",
		status: "draft",
		title: "Operational Risk (draft)",
		description: "Placeholder chapter: runtime surprises and the context they force you to load.",
	},
	{
		part: "uncertainty",
		order: 3,
		slug: "design-for-ignorance",
		status: "draft",
		title: "Design for Ignorance (draft)",
		description: "Placeholder chapter: designing so partial knowledge can still be safe.",
	},
	// Part VI
	{
		part: "measuring",
		order: 1,
		slug: "proxies-and-metrics",
		status: "draft",
		title: "Proxies and Metrics (draft)",
		description: "Placeholder chapter: what we can measure vs what we wish we measured.",
	},
	{
		part: "measuring",
		order: 2,
		slug: "static-methods",
		status: "draft",
		title: "Static Methods (draft)",
		description: "Placeholder chapter: static signals for context exposure.",
	},
	{
		part: "measuring",
		order: 3,
		slug: "empirical-protocols",
		status: "draft",
		title: "Empirical Protocols (draft)",
		description: "Placeholder chapter: repeatable measurement protocols for case studies.",
	},
	{
		part: "measuring",
		order: 4,
		slug: "baselines-and-regressions",
		status: "draft",
		title: "Baselines and Regressions (draft)",
		description: "Placeholder chapter: preventing metric gaming and silent regressions.",
	},
	// Part VII
	{
		part: "agents",
		order: 1,
		slug: "how-agents-read-codebases",
		status: "draft",
		title: "How Agents Read Codebases (draft)",
		description: "Placeholder chapter: read paths, tool calls, and context windows.",
	},
	{
		part: "agents",
		order: 2,
		slug: "tool-surfaces-and-contracts",
		status: "draft",
		title: "Tool Surfaces and Contracts (draft)",
		description: "Placeholder chapter: contracts that reduce ambiguous agent context.",
	},
	{
		part: "agents",
		order: 3,
		slug: "planning-execution-separation",
		status: "draft",
		title: "Planning vs Execution Separation (draft)",
		description: "Placeholder chapter: separating exploratory planning from committed edits.",
	},
	{
		part: "agents",
		order: 4,
		slug: "human-attention-boundaries",
		status: "draft",
		title: "Human Attention Boundaries (draft)",
		description: "Placeholder chapter: where humans should remain in the loop.",
	},
	// Appendix
	{
		part: "appendix",
		order: 1,
		slug: "glossary-draft",
		status: "draft",
		title: "Glossary (draft)",
		description: "Placeholder appendix: working glossary of CMP terms.",
	},
	{
		part: "appendix",
		order: 2,
		slug: "notation-conventions",
		status: "draft",
		title: "Notation Conventions (draft)",
		description: "Placeholder appendix: symbols and notation used across the book.",
	},
	{
		part: "appendix",
		order: 3,
		slug: "extended-bibliography",
		status: "draft",
		title: "Extended Bibliography (draft)",
		description: "Placeholder appendix: extended reading list and references.",
	},
];

function fm(ch) {
	const url = `${SITE}/research/cmp/${ch.part}/${ch.slug}/`;
	return `---
title: "${ch.title.replace(/"/g, '\\"')}"
description: "${ch.description.replace(/"/g, '\\"')}"
book: cmp
part: ${ch.part}
order: ${ch.order}
status: ${ch.status}
version: "0.1"
pubDate: May 18 2026
updatedDate: May 18 2026
canonicalUrl: "${url}"
tags: ["CMP", "software-design"]
lang: en
---

`;
}

const publishedBody = `
This page is a **Phase 0 manifesto container**. The full argument will ship incrementally as the surrounding book parts move from \`draft\` to \`published\`.

## A tiny sketch of the claim

When change is cheap, the bottleneck stops being “typing speed” and starts being **how much code you must load to know whether a change is safe**. Call that load *context*—files, types, docs, runtime behavior, and organizational folklore that must be in working memory before you can commit.[^load]

If agents widen the funnel of attempted edits without widening comprehension, failures migrate from syntax errors to *semantic* and *systemic* ones. That is not an argument against agents; it is an argument for a **theory of software design** that treats context minimization as a first-class design objective.

### Diagrams as figures

Graphs and architecture pictures are authored **outside** this repo (no Mermaid runtime here) and embedded as images so builds stay lean. The figure below is a stand-in for a diagram you might export from Excalidraw, OmniGraffle, or similar.

<figure>
  <img
    src="https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=1200&q=80"
    alt="Placeholder diagram: city blueprint metaphor for software structure"
    width="800"
    height="500"
    loading="lazy"
  />
  <figcaption>Placeholder figure — replace with your exported diagram when ready.</figcaption>
</figure>

## Math as notation (not a claim of precision)

Let $C$ be a crude stand-in for “context mass” and $Q$ the question you are trying to answer about a change. CMP-style thinking cares about how design rules reshape the relationship between $Q$ and $C$—not about pretending $C$ is an exact scalar.[^notation]

$$
\\mathbb{E}[\\text{mistakes} \\mid C \\text{ large}] \\geq \\mathbb{E}[\\text{mistakes} \\mid C \\text{ small}]
$$

The inequality is deliberately cartoonish: it is a mnemonic, not a theorem. The book chapters will replace slogans with definitions, measurement hooks, and falsifiable predictions.

> **Note:** **How to read this chapter.** Treat it as a bookmark for the roadmap: it exists so URLs, RSS, SEO, and the book shell can stabilize while the real text is written.

[^load]: “Context” is used informally here; later chapters separate *domain* context (necessary complexity) from *accidental* context (coupling, leaks, poor boundaries).

[^notation]: Notation preview only; Part VI will discuss measurement without overclaiming precision.
`;

const draftBody = ``;

for (const ch of chapters) {
	const dir = path.join(baseDir, ch.part);
	fs.mkdirSync(dir, { recursive: true });
	const file = path.join(dir, `${ch.slug}.mdx`);
	const body = ch.slug === "why-ai-agents" && ch.status === "published" ? publishedBody : draftBody;
	fs.writeFileSync(file, fm(ch) + body.trim() + "\n", "utf8");
}

console.log(`Wrote ${chapters.length} chapters under ${baseDir}`);
