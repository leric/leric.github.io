---
title: "Hermes Cut 34% of Its Code. Did Its Context Footprint Shrink?"
description: "A natural experiment on Nous Research's Hermes Agent refactor: measuring whether a 34% code reduction actually shrank the context required to reason about its behavior, and why code decomposition is not context decomposition."
pubDate: "Sep 22 2026"
heroImage: "../../assets/refactor.png"
category: "Software Architecture"
tags: ["Context Footprint", "Software Architecture", "Refactoring", "AI Agents", "Hermes"]
---

Nous Research recently published [an unusual refactoring story](https://nousresearch.com/refactoring-hermes-with-1393-agents): **1,393 agents** worked on Hermes Agent, reducing its non-test Python code from 1.06 million lines to about 698,000 — a **34.4% reduction**. Files over 5,000 lines dropped from 37 to 6, and functions over 300 lines from 192 to 2.

That is already impressive. But the part that caught my attention was a different question they asked: 

**Did the refactor actually make the code easier for agents to work with?**

Nous measured symbol lookup cost. Across the same 4,000 symbols, the average amount of code returned per lookup fell from 2,218 tokens to 993. But they also noted an important caveat: splitting files increased the number of modules and import dependencies. Individual pieces became easier to read, while some of the coupling remained.

That is almost exactly the problem I have been trying to measure with [**Context Footprint**](https://github.com/leric/context-footprint).

## Code Decomposition Is Not Context Decomposition

Imagine a 5,000-line function:

```text
handle_message()
    ... 5000 lines ...
```

After refactoring:

```text
handle_message()
    -> parse_message()
    -> route_message()
    -> handle_agent()
    -> load_skill()
    -> resolve_command()
```

The entry function may now be only 100 lines long. By file size, function length, and local readability, this is a huge improvement. But if modifying `handle_message()` still requires understanding all of those functions across many modules, then something important has not changed.

The **code** was decomposed. The **context required to reason about the behavior** may not have been. This distinction is what Context Footprint tries to make measurable.

## What Is Context Footprint?

Context Footprint (CF) is a static-analysis metric that approximates the amount of code context that must be traversed to analyze a function or type.

Starting from a symbol, the tool follows language-level dependencies until it reaches boundaries that are considered sufficient abstractions. The resulting reachable code is measured in tokens.

So function size asks:

> **How large is this function?**

Context Footprint asks:

> **How much code do I need to read in order to understand this function's behavior?**

These are very different questions. A function may be tiny while depending on behavior distributed across dozens of other functions and modules. Conversely, a relatively large function may be locally self-contained and require little additional context.

That makes the Hermes refactor a useful natural experiment. We have the same real project, before and after a massive architectural refactor, with frozen commits and a clearly stated goal of improving readability and structure.

So I ran Context Footprint on both versions.

## The Repository-Level Result

For non-test Python functions:

| Context Footprint | Before | After | Change |
|---|---:|---:|---:|
| Median | 235 | 206 | -12.3% |
| P90 | 3,513 | 2,490 | -29.1% |
| P99 | 34,579 | 21,543 | -37.7% |
| Max | 835,438 | 445,418 | -46.7% |
| Mean | 2,285 | 1,619 | -29.1% |

The median fell only 12%, while P99 fell 38% and the maximum almost halved. The refactor disproportionately reduced the high-CF end of the distribution — the pathological cases where understanding one piece of behavior required pulling in an enormous amount of surrounding code.

There is another useful signal: the refactored repository contained 30.7% more Python files and 23.6% more definitions, yet the number of dependency-graph edges fell by about 8%. So this was not merely one big file being mechanically split into many smaller files, there was a real structural change that simplified interconnections.

But the more interesting result appears when we zoom in.

## Two Very Different Refactorings

Consider Hermes' message handling path.

For `_handle_message`, the result looks exactly like what we would hope for:

```text
Definition size: 5,997 → 476 tokens
Context Footprint: 317,063 → 23,784 tokens
Reachable files: 183 → 37
```

The function definition became about 92% smaller. Its Context Footprint also became about **92% smaller**. And the number of files reachable from that entry point dropped by about 80%.

This is genuine **context decomposition**.

The refactoring did not merely move code elsewhere. It created boundaries that allowed the surrounding world to be ignored.

Now look at `_handle_message_with_agent`:

```text
Definition size: 8,452 → 555 tokens     -93.4%
Context Footprint: 149,299 → 143,385      -4.0%
Reachable files: 104 → 153              +47.1%
```

Locally, this looks like an extraordinary refactor: the function became **93% smaller**. But its Context Footprint barely moved. And the code needed to reason about it actually spread across more files.

This is primarily **code decomposition**, not context decomposition. The code was broken into smaller pieces, but modifying the core behavior still requires traversing a wide dependency closure.

That distinction is difficult to see from LOC, function length, or file size alone.

But，this does not mean the refactor failed.

First, _handle_message_with_agent is a major orchestrator， the original function may simply have contained relatively little redundant or incidental logic that could be removed from its behavioral context. Even after a good refactor, understanding an orchestrator may inherently require understanding a broad set of collaborators.

Second, the refactor may have decomposed the implementation without making the new abstraction boundaries sufficiently self-contained. A function boundary only reduces Context Footprint if its signature, types, documentation, and surrounding contract provide enough information to reason about its behavior without opening the implementation. If those boundaries remain underspecified, an agent still has to cross them and read the code behind them.

Context Footprint does not tell us which of these explanations is correct. It tells us where code decomposition and comprehension decomposition diverge — and gives us a place worth investigating.

## Architecture as Context Control

We usually describe good architecture using concepts such as coupling, cohesion, abstraction, interfaces, information hiding, and the SOLID principles.

These principles were developed long before coding agents. But they can also be read through a surprisingly unified lens: They determine how much context an agent must acquire before it can reason reliably about a local change.

Consider information hiding. Its value is not simply that implementation code becomes invisible. A useful boundary lets the reader stop. Once the contract is understood, the implementation behind it no longer needs to enter the working context.

Many familiar design principles can be understood this way.

- Interface Segregation reduces the surface an agent must inspect. A caller that needs two operations should not have to understand thirty unrelated methods, states, and failure modes.
- Liskov Substitution prevents implementation-specific behavior from leaking through a boundary. If every implementation requires different caveats, the caller cannot reason from the abstraction alone and must acquire additional context about which implementation is actually present.
- Dependency Inversion can be seen as deciding who gets to define the context boundary. A client-shaped abstraction describes exactly the semantics the caller needs, rather than exposing whatever surface happens to exist in the provider.

Even naming matters. A good name is a tiny context package. Concepts such as Cache, Transaction, Order, or PaymentIntent compress a large set of expectations into a token the reader already knows how to reason about. A vague or misleading name does the opposite: it forces the reader to open the implementation to discover what the abstraction actually means.

Type systems play the same role. Option, Result, algebraic data types, state machines, and explicit schemas move information that would otherwise need to be discovered by searching implementation code into the boundary itself.

Seen this way, many architecture and design techniques are forms of context engineering. They either reduce the amount of context that must be acquired, or package that context into a cheaper and more reliable form.

## What Context Footprint Does Not Measure

CF starts from a code symbol and follows relationships that the program makes visible: calls, references, types, imports, and other structural connections. It can estimate how much connected code must be understood before reliable boundaries let the reader stop. But sometimes the information required for a correct change is not connected to the code being changed at all.

During review, the team found that some public names had been removed because they had no callers inside the repository. The cleanup looked correct from the local code graph. But those names were being imported by external plugins. The information required to preserve them existed — just not anywhere the static dependency graph could reach.

With a large Context Footprint, the problem is visible: the reader keeps following dependencies, opening files, and accumulating context because there is no trustworthy place to stop. With disconnected context, the reader may feel finished. There is simply no path telling them that another artifact exists.

That makes oversight the central risk. The code that was found may be perfectly understandable, the local change may compile and pass its tests, and yet something that needed to be checked or changed was never brought into context.

This is an important limit of Context Footprint, CF only measures the depth, not the [breadth of context cost](https://www.contextcost.dev/research/cmp/shape/breadth/).

## What This Experiment Tells Us

The Hermes refactor gives us a rare opportunity to look at architecture through the lens of context rather than code size alone.

At repository scale, Context Footprint improved substantially, especially in the upper tail. At symbol scale, it revealed something that LOC and function length cannot: code decomposition and context decomposition are not the same thing.

That distinction also gives a different interpretation of familiar architecture principles. Abstraction, information hiding, interfaces, types, and dependency inversion all help when they create semantic boundaries that allow context traversal to stop. Their value can be understood partly as reducing the cost of acquiring the context needed to understand behavior.

The regressions found after the Hermes refactor show the other half: some necessary context may not be connected to the code at all. An external consumer or an implicit behavioral invariant can be missed even when the local code is perfectly understandable.

As coding agents take on more software-engineering work, this may become an increasingly useful way to evaluate architecture: not just by how the code is divided, but by how much of the system must be understood at once — and where context traversal can safely stop.

**Good architecture should minimize the context you need to acquire, without hiding the context you cannot afford to miss.**
