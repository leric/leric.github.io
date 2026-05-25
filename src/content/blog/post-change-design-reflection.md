---
title: "Post-Change Design Reflection: Turning Agent Work Into Design Feedback"
description: "A skill for turning the context an agent just acquired during a task into focused, actionable design feedback."
pubDate: "May 25 2026"
category: "AI Agents"
tags: ["AI Agents", "CMP", "Skills", "Software Design", "Context Cost"]
---

After a coding agent finishes a task, we usually evaluate the visible result: does the code run, do the tests pass, and does the diff look reasonable?

But at that exact moment, something else exists and is usually thrown away.

The agent has just acquired a task-shaped understanding of the system. It has followed paths through the codebase, discovered where rules actually live, noticed which tests explain behavior and which only check outcomes, and learned which related pieces had to change together. That temporary understanding is valuable because it was not produced by an abstract architecture review. It was produced by a real modification.

This article introduces a small skill I call **Post-Change Design Reflection**: a way for coding agents to turn the context they just acquired during a task into focused design feedback.

The goal is not to make agents perform broad architecture reviews. It is to capture a narrow, actionable signal:

> When an agent struggles to make a local change, the struggle itself is evidence about the design.

## The CMP lens

The Context Minimization Principle says:

> For the modifications a system must realistically support, a design is better when the sufficient context required for correct modification is cheaper to acquire.

In practice, a developer or agent does not modify code by reading everything. They start from an entry point, follow names, types, tests, call chains, schemas, docs, and conventions, and try to acquire enough context to make a safe change.

Good design does not mean "less code" or "more abstraction." It means the required context for realistic changes is easier to find, trust, and verify.

That context cost often appears in two forms:

- **Depth**: how far the modifier must traverse to understand behavior behind a focal point.
- **Breadth**: how many related places must be found because they belong to the same change.

A boundary helps when it lets the modifier stop reading. A test helps when it makes a rule executable. A type helps when it turns a hidden assumption into a check. A registry, convention, or module structure helps when it makes related pieces discoverable.

The key idea behind this skill is simple: after completing a coding task, the agent has just paid the context cost. That makes it the best time to ask what made the cost higher than necessary.

## Why the post-change moment matters

Design feedback is often too early or too late.

Before the task, the agent does not yet know where the real difficulty is. It may guess that a module is complex, but it has not yet discovered which parts of the system actually mattered for the change.

Much later, only the diff remains. The reasoning path is gone. We can see which files changed, but not which files had to be read, which assumptions were confusing, which contracts were too weak, or which related pieces were only found through search or failing tests.

Immediately after the task, the agent still has the richest evidence:

- the original change request
- the natural starting point
- the files and modules it inspected
- the reason each file mattered
- the rules or behaviors it had to reconstruct
- the final change surface
- the tests or checks that confirmed the change
- the places that were hard to discover
- the design friction that slowed the modification down

This is a rare window. The agent has just experienced the codebase as a modifier.

That experience can be turned into design feedback.

## What the skill should produce

The skill should not produce generic comments like:

> This module should be refactored to improve maintainability.

That kind of feedback is almost useless. It names a broad quality without explaining the mechanism.

A better reflection looks like this:

> This change required checking four places to understand one validation rule. The rule has no clear owner. Move it into a named validator and add a focused test around it.

That statement is useful because it contains a concrete chain:

1. **What happened**: the change required checking four places.
2. **Why it was expensive**: one rule had no clear owner.
3. **What to improve**: move the rule into a named validator.
4. **Why it helps**: future changes can start from the validator instead of reconstructing the rule from scattered behavior.

The output should be a design observation grounded in the completed task, not a speculative architecture opinion.

## From task context to design signal

A coding task exposes design quality because the modifier must acquire the context needed to change the system correctly.

When the context is cheap, the path feels bounded:

- the starting point leads to the owner of the behavior
- the boundary contract is clear enough to trust
- related pieces are connected by types, tests, names, schemas, or conventions
- tests explain the rule being preserved
- the final change is close to the understanding path

When the context is expensive, the agent often has to compensate:

- search globally for a rule that should have had an owner
- inspect implementation details behind a boundary that should have been trustworthy
- find related artifacts by naming guess or test failure
- reconstruct behavior from scattered tests
- infer framework conventions that are not visible at the entry point
- update multiple representations of the same decision that do not point to each other

These are not just annoyances. They are design signals.

Two questions are especially useful:

> If a future developer or agent starts from any meaningful part of this change surface, can they discover the other parts that must be considered together?

> If they encounter a boundary on the way, can they trust its contract and stop there, or do they still need to read through the implementation behind it?

If the first answer is no, the system has an unindexed change surface. If the second answer is no, the system has a weak boundary: the abstraction exists, but it does not reduce the context a modifier must acquire. The solution does not have to be a large refactor. For an indexing problem, the smallest useful improvement might be a central registry of handlers, an exhaustive match over variants, or just some comment as reminder. For a boundary problem, it might be a client-shaped interface, explicit preconditions and error semantics, a contract test shared by all implementations, or a named domain service that owns the rule.

## Why this does not become over-refactoring

A common concern is that if every task ends with design reflection, every task will produce refactoring work. Worse, the team may start adding abstractions, registries, interfaces, and process around every inconvenience. That would be over-engineering.

The skill avoids this not only by making the output advisory, but by changing the burden of proof. A suggestion is not justified because the code felt messy. It is justified only if the completed task exposed a repeated or realistic context-acquisition cost, and only if the proposed change would reduce more future context cost than it adds.

In other words, the reflection does not ask:

> Can we make this design cleaner?

It asks:

> What context did this task force us to acquire, why was that context expensive, and would a small design move make the next similar modification cheaper?

That distinction filters out many tempting refactors. A new abstraction is not helpful if future changes would still require reading through it. A registry is not helpful if there is no real set of change-together members to enumerate. A contract test is not helpful if the boundary was already trustworthy enough for this kind of modification. Documentation is not helpful if it creates another artifact future changes must keep in sync without making anything easier to find or verify.

So the reflection treats every improvement as a trade:

- **What context cost did this task reveal?**
- **Is the suggested improvement grounded in the change surface this task actually exposed?**
- **What new context cost would the proposed improvement add?**
- **Would it let future modifiers stop earlier, find related pieces more reliably, or make omissions visible?**

Only when the answer is concrete does the suggestion become a candidate for refactoring.

This is why the final recommendation is deliberately conservative:

- **Do now**: the improvement is small, low-risk, directly related to the current change, and clearly reduces the next similar context-acquisition path.
- **Schedule later**: the issue is real, but the fix would add enough structure or touch enough code that it deserves its own design decision.
- **Just note**: the task exposed friction, but there is not enough evidence that adding structure would pay for itself.

The point is not to refactor after every change. The point is to price refactoring against the context cost that real work just revealed.

That makes the skill a guard against over-engineering, not a driver of it: it asks whether a design move earns its cost before recommending that the team pay it.

## Why agents are especially useful here

Human developers can do this reflection too. In fact, experienced developers often do it implicitly.

But coding agents make the process more observable.

An agent's work often leaves traces: searches, files opened, failed assumptions, test failures, localization attempts, and patch revisions. These traces are imperfect, but they expose part of the context acquisition process that usually lives inside a human developer's head.

That makes agents useful not only as code generators, but also as design observers.

A coding agent can report:

- "I had to inspect these files to understand one rule."
- "The boundary existed, but I could not trust it without reading the implementation."
- "The tests checked the behavior but did not reveal the domain rule."
- "The frontend and backend represented the same decision, but nothing linked them."
- "A future change is likely to miss this config because it was only found by global search."

This turns agent work into design telemetry.

Not a metric. Not a score. Not a replacement for engineering judgment.

But a practical feedback loop: each real modification can reveal where the system made the required context harder to acquire than it needed to be.

## The skill

Here is the full skill text.

<details class="blog-collapsible" open>
<summary>Post-Change Design Reflection Skill (full text)</summary>

```markdown
# Post-Change Design Reflection Skill

Use this skill after completing a code change, bug fix, feature update, migration, or refactoring.

Do not change the normal coding workflow.
Do not introduce new theory or terminology.
Do not judge the code by abstract design principles first.
Do not perform additional refactoring unless explicitly asked.

Instead, reflect on the actual work process while the context is still fresh.

Ask:

- What code did you need to inspect?
- Why did you need to inspect it?
- Where was the real cause, rule, behavior, or decision located?
- Where was the final change made?
- Did the understanding path feel wider or deeper than the change itself?
- What made the change harder than it should have been?
- Which related pieces had to change together?
- Were those related pieces discoverable from the natural starting point?
- Which pieces were disconnected and likely to be missed next time?

Your goal is to identify design or structure issues that increased the amount of context needed for this change, especially disconnected parts of the change surface, and suggest focused improvements that would make future similar changes easier, safer, and less likely to miss something.

Do not produce a generic architecture review.
Produce a focused post-change reflection based only on what this task actually exposed.

## Core Idea

After a change is complete, the agent has valuable temporary knowledge:

- which files had to be inspected
- why they had to be inspected
- where the real rule or cause was located
- which related pieces changed together
- which related pieces were easy to find
- which related pieces were only found by search, failing tests, naming guesses, framework knowledge, manual review, or prior knowledge
- which missing connections may cause future omissions

Use that knowledge before it disappears.

The most important question is:

If a future developer or agent starts from any meaningful part of this change surface, would they be able to discover the other parts that must be considered together?

If not, suggest the smallest useful connection.

## Context Cost

In this skill, context cost means all information that had to be loaded, understood, and verified to complete this change safely.

This includes code, tests, types, contracts, configuration, schemas, documentation, runtime behavior, framework conventions, deployment steps, ownership rules, and domain knowledge.

Every non-trivial change has context cost.

This reflection focuses on the part of the context cost that the design made higher than necessary:

- information that was hard to discover
- rules that had no clear owner
- related artifacts that did not point to each other
- boundaries that could not be trusted
- hidden conventions that were not captured as artifacts
- repeated decisions represented in disconnected places
- tests, types, or contracts that failed to reveal the required change surface

The goal is not to eliminate context.
The goal is to make the required context smaller, clearer, better connected, and easier to verify for future similar changes.

## What to Look For

Look for issues such as:

- business logic scattered across multiple places
- unclear ownership of a rule, behavior, or decision
- weak or vague interface contracts
- hidden coupling between caller and implementation
- implicit side effects
- framework conventions that are required but not visible near the entry point
- tests that verify behavior but do not explain the rule
- types that are too broad to express the real constraint
- naming that does not reveal responsibility
- abstraction layers that only forward calls without reducing understanding burden
- documentation or examples missing at the point where they would help
- legacy and new paths implementing the same behavior through different conventions
- repeated representations of the same decision across code, tests, config, frontend, schema, docs, or deployment logic
- cross-system or cross-team dependencies not recorded as contracts, owners, checklists, or consumer lists

## Design Reflection

After completing the task, produce a short design reflection with these sections.

### 1. Context needed for this change

Briefly list the important files, modules, tests, interfaces, configs, docs, or runtime behavior that had to be inspected.

For each, explain why it was needed.

Do not list files mechanically.

Good format:

- `file_or_module`: why it mattered for this change

Focus on the reasoning path, not just the file list.

### 2. What made the change harder

Identify the main reason this change required extra context.

Explain whether the difficulty came from:

- scattered logic
- unclear ownership
- weak boundary
- hidden coupling
- implicit side effect
- missing test signal
- broad type
- misleading naming
- framework convention
- forwarding abstraction
- missing documentation
- legacy/new path divergence
- deployment or config dependency
- social or ownership dependency

Be specific. Avoid vague statements like "the architecture is complex."

### 3. What changed together

Describe the set of things that turned out to belong to the same change.

Include non-code artifacts if relevant, such as:

- tests
- types
- configs
- schemas
- migrations
- frontend flows
- docs
- scripts
- generated files
- deployment steps
- monitoring
- ownership rules
- external consumers

This section is about the actual change surface revealed by the task.

### 4. Disconnected or hard-to-discover pieces

Identify any pieces that were not easy to discover from the natural starting point.

Explain how they were discovered:

- direct navigation
- reference lookup
- type lookup
- test failure
- global search
- naming guess
- framework knowledge
- manual review
- prior knowledge
- runtime failure
- deployment failure
- comments or documentation

Call out anything future developers or agents are likely to miss.

This is the locality review: check whether the related pieces of the change were connected well enough.

### 5. Design issue revealed

State the structural issue that increased context cost in this task.

Do not label the issue with a broad design principle first.
Explain the actual mechanism.

Use this form when possible:

- This change required extra context because ...
- The extra context was needed because ...
- Future similar changes may miss something because ...

Good examples:

- The rule has no clear owner, so understanding it required reconstructing behavior from several files.
- The boundary exists, but its contract is too weak to stop investigation.
- The same decision is represented in multiple artifacts, but those artifacts do not point to each other.
- The test setup hides an important runtime contract, so passing tests do not clearly explain the real behavior.

### 6. Suggested improvement

Suggest one focused improvement that reduces future context cost.

Prefer the smallest connection that makes the related change surface easier to discover.

The improvement may be:

- an index: a test name, module note, contract note, README section, ownership note, or checklist
- a stronger executable connection: exhaustive type check, central registry, generated completeness check, contract test, or shared test helper
- a small refactor: moving a scattered rule into a named owner, clarifying a boundary, or removing a forwarding layer that adds no useful understanding

Choose a refactor only when the task showed that the disconnected pieces represent the same decision and should have a clearer owner.

Do not suggest broad rewrites.
Do not suggest improvements that are merely stylistic.

### 7. Why this helps

Explain how the suggestion reduces context cost for future changes.

Be explicit about the mechanism.

For example, explain whether it would:

- make related artifacts discoverable from each other
- give the rule a clearer owner
- let future developers or agents stop at a reliable boundary
- turn hidden knowledge into an artifact
- make omission visible through tests, types, or checklists
- reduce the number of places that must be inspected before a safe change

Avoid vague claims such as "this improves maintainability."

### 8. Recommendation

Classify the suggestion as one of:

- Do now: small, low-risk, directly related to this change
- Schedule later: valuable but outside the current task, should be a separate follow-up PR
- Just note: interesting signal, but not enough evidence to change yet

Do not perform the suggested refactoring unless explicitly asked.

## Avoid

Do not suggest broad rewrites.
Do not say "improve architecture" without a concrete change.
Do not recommend Clean Architecture, DDD, SOLID, DRY, or other labels as the conclusion.
Do not turn every inconvenience into a refactoring task.
Do not add documentation noise.
Do not suggest changes unrelated to the task just completed.
Do not perform the suggested improvement unless explicitly asked.

## Output Template

Use this template:

## Design Reflection

### 1. Context needed for this change

- ...

### 2. What made the change harder

...

### 3. What changed together

...

### 4. Disconnected or hard-to-discover pieces

...

### 5. Design issue revealed

...

### 6. Suggested improvement

...

### 7. Why this helps

...

### 8. Recommendation

Do now / Schedule later / Just note
```

</details>

## Closing the loop

One common fear about AI programming is that agents will make a codebase worse over time. Each change may focus narrowly on the task at hand, with no shared plan or architectural direction. The individual patches may look reasonable, but over time they can accumulate into a codebase that feels messy, inconsistent, and hard to reason about.

Post-change design reflection points in the opposite direction. If an agent can notice the context cost it just paid, it can also help maintain the design conditions that make future changes safer. The agent does not only complete the task. It also reports where the task exposed avoidable context cost, and suggests a small way to reduce it.

That does not mean every observation deserves immediate refactoring. It means real modification work is one of the best sources of design feedback we have. With this loop in place, a coding agent is not only a faster way to complete development tasks. It can also help you keep making the codebase cleaner, more coherent, and easier to work with over time.
