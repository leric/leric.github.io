---
title: "When Documents Become Programs"
description: "How AI Skills represent a fundamental shift: documents evolving from passive knowledge containers into executable programs that agents can run, humans can learn from, and teams can refine together."
pubDate: "Dec 23 2025"
heroImage: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1920&q=80"
category: "AI Agents"
tags: ["AI Skills", "Document-Driven Design", "AI Agents", "Knowledge Systems", "Claude", "OpenAI"]
---

## Something Interesting Just Happened

On December 12th, OpenAI quietly shipped Skills support in their Codex CLI and ChatGPT. No keynote, no fanfare—just a feature that appeared in the wild.

Two months ago, Anthropic introduced Claude Skills, a way to package reusable workflows as structured Markdown files. Now OpenAI has followed. When the two leading AI labs independently converge on the same pattern, it's worth asking what they see that we might be missing.

I think they're both betting on the same answer to a problem that's been bugging me all year: **how do you build AI agents that actually work in production?**

---

## Why Documents? Why Markdown?

When I first saw Anthropic package Skills as Markdown files, my reaction was: **they're betting on the same thesis I built Airic around.** [^1]

Airic[^2] is a framework I've been designing this year for document-driven agents. It started as my answer to the question: what would it take to make AI agents reliable enough for real production work?

The core thesis:

> In the age of AI agents, documents stop being passive records and become executable programs.
> 

For thousands of years, documents have been humanity's container for knowledge—we write down what we know, what we've learned, how things work. But they've always been inert. A playbook sits on a shelf. A wiki captures tribal knowledge but can't *do* anything with it.

Now that changes. When you write a document that describes how an agent should behave, what steps to follow, what quality standards apply, what edge cases matter—an AI can read that document and *execute* it.

In the Airic design:

- **Agent identity and behavior** are defined by documents (`agent` metadata)
- **Document structure and quality standards** are defined by documents (`doctype` metadata)
- **The document templates themselves** are defined by meta-documents
- **Discussions, decisions, tasks, and outputs** all accumulate in the same knowledge graph, where AI retrieves context dynamically

**This is equivalent to treating knowledge as versionable, composable source code.**

Watching Skills gain traction now feels like external validation of this direction.

---

## Why Skills Work: Three Design Wins

From the Airic lens, Skills get three things fundamentally right:

### 1. No Human-Machine Divide

Skills are written in Markdown. That means the same file a senior engineer writes to codify their debugging workflow can be:

- Read and reviewed by teammates (like code review)
- Studied by junior engineers learning the craft
- Executed by an AI agent handling routine cases

**You don't maintain separate "docs for humans" and "configs for machines." There's one canonical source of truth.**

### 2. Context That Scales

Claude's implementation is clever: when a conversation starts, the system scans only the front matter of each [`SKILL.md`](http://SKILL.md)—a few dozen tokens. Full skill content loads only when the agent matches a task.

This means you can build a library of hundreds of skills without blowing up your context window. **The experience repository can grow without hitting architectural limits.**

### 3. Iteration at the Speed of Thought

To update a skill? Open the Markdown file. Edit. Save. Done.

No build step, no deploy pipeline, no API versioning dance. **Knowledge updates at the same velocity as the work itself.**

---

## Where MCP Went Wrong

Contrast that with MCP (Model Context Protocol), which launched in 2024 with big ambitions: an open standard for connecting AI to external tools.

The result? A curious inversion: **more people writing MCP servers than actually using them.**

Here's why: MCP optimized for the wrong user. It's *easy to build*—wire up a few tool definitions, expose some endpoints, ship it. But it's *hard to use*—every tool you plug in bloats the context, and after a few conversational turns, the agent starts making brittle assumptions.

MCP solved the integration problem but missed the knowledge problem. **Its implicit model is: capability = function calls. But real capability is judgment, process, edge-case handling—things you can't express in an OpenAPI spec.**

---

## What Happens Next

If I'm right that this pattern has legs, here's what I expect to see:

### Skills as a First-Class Artifact

Right now, most people think of Skills as *consumption*: download from a marketplace, install, run. Like apps.

But the real unlock is *authorship*. **Skills aren't just for agents to execute—they're for humans to write, read, and refine.**

A good Skill is simultaneously:

- Executable: an agent can run it
- Educational: a person can learn from it
- Improvable: a team can iterate on it

And here's the meta-layer: **"how to write a great Skill" is itself a Skill.** Equip an agent with that, everyone on your team can distill their knowledge into reusable assets. You're not just downloading tools—you're growing your organization's capability surface.

### Workspaces That Evolve with You

This implies a new kind of software: **Agentic Workspaces with native Skill authoring built in.**

Not just a place to *run* agents, but a place to *shape* them:

- **Inspect** how a Skill works, instead of treating it as a black box
- **Adapt** it to your specific context and constraints
- **Refine** it over time as you learn what works

Anthropic's "skill creator" tool hints at this—using conversation to extract workflows into structured Skills. That's the bootstrap: **AI helping you teach AI.**

### The Convergence: Human-Readable = Machine-Executable

The long-term endgame is a world where the distinction collapses entirely.

You write an SOP in plain language, annotate edge cases, include examples. Maybe you add a script or two for deterministic steps. The same artifact:

- Onboards a new hire
- Guides an agent through a complex task
- Serves as the source of truth for quality standards

**No translation layer. No drift between docs and reality.**

---

## A Glimpse Into the Future

**More tools will soon adopt Skill compatibility. Skills will converge into a unified standard.**

We've been encoding knowledge in documents for millennia. Now, for the first time, those documents can *run*. That changes everything.

Skills are just the beginning.

---
[^1]: https://github.com/leric/metadoc/tree/main/docs
[^2]: https://github.com/AiricDev/airic-spec
