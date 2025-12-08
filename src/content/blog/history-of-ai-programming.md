---
title: "AI Programming: Replaying 50 Years of Software Engineering in 2 Years"
description: "AI coding has replayed decades of software engineering in fast-forward — from vibe coding chaos, to spec-first echoes of waterfall, to agile design that makes systems changeable. Here's how to steer it."
pubDate: "Dec 05 2024"
heroImage: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=1920&q=80"
category: "Software Engineering"
tags: ["AI", "Agile", "SOLID"]
featured: true
---

*History doesn't repeat itself, but it often rhymes.*


## Act I: Vibe Coding — The 21st Century GOTO

In early 2025, Andrej Karpathy coined the term **Vibe Coding**.

He described it like this: "Fully giving in to vibes, smashing Accept All, code ballooning to the point where I have no clue what it does. Sometimes it errors and I just paste the error back in and it usually fixes it."

This would make any seasoned programmer break into a cold sweat. It's eerily reminiscent of programming's early days—the era of GOTO and global variables. Code became spaghetti. Execution paths jumped erratically. State scattered everywhere. Only the person who wrote it had a vague sense of what it did. Sometimes not even them.

**Vibe Coding is essentially spaghetti code written in natural language.** You and AI cobble together something that "works," but no one can explain its logic, let alone maintain or evolve it. Fine for demos. For production systems? You're digging your own grave.

**The pain point:** code becomes uncontrollable and unmaintainable. Once the system grows beyond trivial size, nobody understands it—not even the AI itself.


## Act II: Spec-Driven Development — The Ghost of Waterfall

Pain points breed solutions. In late 2025, **Spec-Driven Development (SDD)** started gaining traction.

The logic seemed sound: better prompts produce better results. The more detailed the prompt, the closer the output matches your intent. Early description errors compound into huge deviation. So the thinking went: write a detailed specification first, then have AI generate code strictly according to spec.

Sounds perfectly reasonable, right? **Fifty years ago, everyone thought the same thing.**

Back then, the software industry was drowning in the "software crisis." Winston Royce proposed the **Waterfall Model**: Requirements → Design → Implementation → Verification, step by step. Never proceed to the next phase until the current one is complete.

The Waterfall Model's core assumption: **Requirements changes are too expensive—we must think everything through upfront.**

SDD makes the same assumption: if the spec is perfect, AI will generate a perfect system.

**But history proved that assumption wrong.**


## The Turning Point: Why "Thinking Everything Through" Is an Illusion

The Waterfall Model dominated for over two decades, then was overthrown by the Agile revolution. For one simple reason:

**Requirements change, and they must change.**

Not because customers are fickle, but because the problems software must solve are themselves changing. More importantly, customers often don't know what they want — until they see something working.

**SDD is repeating the same mistake.** Developers are already complaining:

- The spec paradox: If you're not sure what you want, how can you describe it precisely?
- Bureaucratizing trivial tasks: Fixing a bug now requires a four-phase process? Not following the process and specs quickly become outdated.
- Context overload: Specs grow too long, AI starts hallucinating and forgetting.

Bottom line: SDD tries to constrain **dynamic intelligence** with **static text**. It's doomed to be inefficient.

## Act III: Agile AI Engineering — Agility in Design Is the Core

In 2001, a group of programmers released the Agile Manifesto. Its core principle: "responding to change over following a plan."

But when discussing agile, I want to emphasize a commonly overlooked point: **Agile's core value is not in process management, but in software design.**

When people talk about agile, they think of stand-ups, sprints, Kanban boards. These are surface-level. The prerequisite for agile to "embrace change" is: **the software itself must be designed to be easy to change.**

Without good design, even the most agile process is spinning its wheels. You can iterate every two weeks, but if the code is a tangled mess where every change pulls at everything else, iterations will only get slower and more painful.

**In the AI era, process agility may matter less — AI can generate code instantly, teams might be solo, sprint cycles can compress to the extreme. But design agility? Its value only grows.**

Why? Because AI amplifies the impact of design:

- **Good design + AI = exponential efficiency.** Modular, single-responsibility code allows AI to understand and modify precisely.
- **Bad design + AI = exponential chaos.** Feed AI a tangled mess, and it generates an even bigger mess.

ThoughtWorks specifically highlights "AI-friendly code design" in their latest Tech Radar: clear naming provides domain context, modular design limits change scope, DRY principles reduce redundancy — **excellent design for humans equally empowers AI.**


## Design Principles for the AI Era

**SOLID = Context Engineering Best Practices**

The essence of SOLID principles is **minimizing comprehension cost** — reducing the amount of code you need to read to understand or implement a component. The core mechanism is the **Interface**: using contracts to bound scope, hide implementation, and enable components and agents to collaborate safely at minimal context cost.

In the AI era, this value intensifies: AI context windows are limited. Good design, through clear interfaces and responsibility separation, allows each module to be fully understood within minimal context — whether by humans or AI.

Each SOLID principle manages "context pressure," keeping changes local and reasoning costs low:

- **Single Responsibility Principle (SRP)**: A component has one reason to change, meaning its interface surface stays small and focused. For AI, this minimizes the background knowledge needed to understand or modify it.
- **Interface Segregation Principle (ISP)**: Use multiple small interfaces instead of one large one; each consumer depends on only the narrow slice of knowledge it needs.
    - *Context effect*: Shrinks attention span and token budgets, improving comprehension precision.
- **Open/Closed Principle (OCP)**: Keep interfaces stable; extend behavior via new implementations or composition.
    - *Context effect*: Historical knowledge remains valid; only deltas need to be learned.
- **Liskov Substitution Principle (LSP)**: Subtypes honor contracts; callers reason only about the base interface.
    - *Context effect*: Replacing implementations doesn't require re-understanding the entire system; context is portable.
- **Dependency Inversion Principle (DIP)**: Depend on abstractions, not concretions. High-level policy defines contracts; low-level details implement them.
    - *Context effect*: Business intent becomes the primary context; infrastructure details exit the core reasoning loop and can change independently. Humans define "what" (tests, interfaces); AI handles "how" (implementation).

**Summary**: Interfaces compress context *legally*, not heuristically — through invariants, pre/post-conditions, and data contracts. SOLID is a context management playbook: constraining what must be known (S, I), preserving prior knowledge under change (O, L), and grounding reasoning in policies rather than mechanisms (D).

## Conclusion: History Compressed, Future Unfolding

**AI programming replayed fifty years of software engineering evolution in two years.**

From Vibe Coding's "just make it run" (GOTO era), to Spec-Driven Development's "think it through upfront" (Waterfall era), to today's realization that "agility in design is the core" (Agile era) — this compressed historical arc taught us the same lesson at breakneck speed:

**There are no silver bullets. Complexity is conserved.**

AI doesn't make software engineering simpler; it shifts where complexity lives: from "how to write" to "how to design, constrain, and verify." The engineering wisdom accumulated over decades — modularity, contract-based design, test-driven development, continuous refactoring — hasn't become obsolete. It has become essential to harnessing AI.

**Looking ahead, the programmer's role is being redefined:**

- **From coder to architect**: Defining system boundaries, designing module interfaces, planning evolutionary paths
- **From implementer to constraint designer**: Using tests, types, and contracts to bound AI's output space
- **From solo contributor to orchestrator**: Coordinating multiple AI agents within well-defined contexts
- **From one-time delivery to continuous evolution**: AI reduces refactoring costs; systems can continuously adapt rather than ossify

AI replaces "typing," but amplifies "design." The tools changed, but the battle against system entropy remains eternal. Engineers who understand how to design and control complexity will wield unprecedented leverage in the AI era.

**History doesn't repeat itself, but it often rhymes. This time, we should be able to move faster and farther.**
