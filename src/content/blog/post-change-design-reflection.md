---
title: "Post-Change Design Reflection: Turning Agent Work Into Design Feedback"
description: "A skill for turning the context an agent just acquired during a task into focused design feedback, locality repair, and architecture anti-corruption."
pubDate: "May 26 2026"
category: "AI Agents"
tags: ["AI Agents", "CMP", "Skills", "Software Design", "Context Cost"]
---

One of the most common fears about AI coding is simple:

> Will coding agents make my codebase a mess?

The fear is reasonable. A coding agent can complete many small tasks quickly, but each task is usually optimized locally. The agent sees the current request, follows the shortest path to a working patch, gets the tests green, and moves on. Each individual change may look acceptable. Over time, those local changes can still erode the structure that made the codebase understandable.

A domain rule is duplicated in a controller because that was the easiest place to fix the bug. A repository from another module is imported directly because the official path felt too long. A shared helper is created without a clear owner. An architecture test is weakened because it blocked the patch. None of these changes has to look catastrophic in isolation. But together they can make the architecture stop doing its job.

The problem is not that AI writes bad code by nature. The problem is that a coding agent, like a rushed human developer, can optimize for the current task while ignoring the architecture’s intent.

**Post-Change Design Reflection** turns the context an agent just acquired during a task into focused design feedback after the change is complete. It helps the agent notice when related pieces of a change surface were disconnected, hard to discover, or likely to be missed next time.

It also gives each completed modification an architecture-preserving checkpoint:

> Did this change preserve the architecture’s existing intent?

This does not mean the skill redesigns the macro architecture. Macro architecture still requires deliberate design judgment. The role of this skill is narrower and more operational: after every modification, it checks whether the change respected existing boundaries, ownership, and placement rules.

Good architecture is not only designed at the beginning. It is either respected or corroded during every modification.

## The CMP lens

The Context Minimization Principle says:

> For the modifications a system must realistically support, a design is better when the sufficient context required for correct modification is cheaper to acquire.

In practice, a developer or agent does not modify code by reading everything. They start from an entry point, follow names, types, tests, call chains, schemas, docs, ownership rules, and conventions, and try to acquire enough context to make a safe change.

Good design does not mean “less code” or “more abstraction.” It means the required context for realistic changes is easier to find, trust, and verify.

That context cost often appears in two forms:

* **Depth**: how far the modifier must traverse to understand behavior behind a focal point.
* **Breadth**: how many related places must be found because they belong to the same change.

A boundary helps when it lets the modifier stop reading. A test helps when it makes a rule executable. A type helps when it turns a hidden assumption into a check. A registry, convention, or module structure helps when it makes related pieces discoverable.

Architecture works at a larger scale. It tells modifiers where decisions should live, which boundaries should be respected, which dependencies are allowed, and which parts of the system should not need to be searched.

That is the key point: architecture is a context-routing system.

When architecture works, a modifier does not have to search everywhere. They know where a domain rule belongs. They know which module owns a decision. They know whether a caller may depend on an implementation detail. They know which boundary should be trusted and which protocol should be used.

When architecture decays, the codebase may still have layers, modules, interfaces, folders, and naming conventions. But those structures no longer predict where decisions live. A developer first follows the architecture, fails to find the decision, and then searches globally anyway. The architecture still imposes carrying cost, but its routing benefit has disappeared.

That is what “AI made the codebase messy” really means in CMP terms: ordinary local changes silently weakened the architecture’s context-routing function.

## Why the post-change moment matters

Design feedback is often too early or too late.

Before the task, the agent does not yet know where the real difficulty is. It may guess that a module is complex, but it has not yet discovered which parts of the system actually mattered for the change.

Much later, only the diff remains. The reasoning path is gone. We can see which files changed, but not which files had to be read, which assumptions were confusing, which contracts were too weak, which related pieces were only found through search, or which boundary was almost bypassed.

Immediately after the task, the agent still has the richest evidence:

* the original change request
* the natural starting point
* the files and modules it inspected
* the reason each file mattered
* the rules or behaviors it had to reconstruct
* the final change surface
* the tests or checks that confirmed the change
* the places that were hard to discover
* the boundaries it had to cross
* the ownership rules it had to respect
* the design friction that slowed the modification down

This is a rare window. The agent has just experienced the codebase as a modifier. That experience can be turned into design feedback. More importantly, it can be turned into an architecture-preserving check:

> Did this change respect the architecture’s existing intent?

## What the skill should produce

The skill should not produce generic comments like:

> This module should be refactored to improve maintainability.

That kind of feedback is almost useless. It names a broad quality without explaining the mechanism.

A better reflection looks like this:

> This change required checking four places to understand one validation rule. The rule has no clear owner. The smallest useful improvement is to move the rule into the existing validator that already owns this input contract, and add a focused test around that validator.

That statement is useful because it contains a concrete chain:

1. What happened: the change required checking four places.
2. Why it was expensive: one rule had no clear owner.
3. What to improve: move it into an existing owner, not an arbitrary new abstraction.
4. Why it helps: future changes can start from the validator instead of reconstructing the rule from scattered behavior.

The output should be a design observation grounded in the completed task, not a speculative architecture opinion.

The skill is not asking the agent to become an architect after every patch. It is asking the agent to preserve what the architecture already claims.

## From task context to design signal

A coding task exposes design quality because the modifier must acquire the context needed to change the system correctly.

When the context is cheap, the path feels bounded:

* the starting point leads to the owner of the behavior
* the boundary contract is clear enough to trust
* related pieces are connected by types, tests, names, schemas, or conventions
* tests explain the rule being preserved
* the final change is close to the understanding path
* dependency direction is respected without special effort

When the context is expensive, the agent often has to compensate:

* search globally for a rule that should have had an owner
* inspect implementation details behind a boundary that should have been trustworthy
* find related artifacts by naming guess or test failure
* reconstruct behavior from scattered tests
* infer framework conventions that are not visible at the entry point
* update multiple representations of the same decision that do not point to each other
* route around an existing boundary because the official path was unclear
* introduce a shortcut dependency because ownership was not visible

These are not just annoyances. They are design signals.

Two questions are especially useful:

> If a future developer or agent starts from any meaningful part of this change surface, can they discover the other parts that must be considered together?

> If they encounter a boundary on the way, can they trust its contract and stop there, or do they still need to read through the implementation behind it?

If the first answer is no, the system has an unindexed change surface. The solution may be a small locality improvement: a registry, a generated completeness check, an ownership note, a better test name, a contract test, or a direct reference between artifacts that must change together.

If the second answer is no, the system has a weak boundary. But the response should be more conservative. A weak boundary is not automatically a refactoring target. It is first a diagnostic signal.

This distinction matters.

Locality problems are often safe to improve directly. If two artifacts must change together but do not point to each other, the smallest useful connection can reduce omission risk without changing the architecture.

Boundary problems are different. Whether a boundary should move, split, merge, or change ownership is usually not something a single task can decide. A post-change reflection can notice that the boundary failed to stop traversal. It should not casually reshape the boundary to reduce the current task’s context cost.

That is the core safety rule:

> Locality can often be repaired after a task. Boundaries should be respected by default and only diagnosed unless the current change itself violated them.

## Locality repair and boundary guard

Post-change reflection becomes safer when it separates two responsibilities.

### Locality repair

A locality issue means the task revealed a change surface whose related parts were not discoverable from each other.

Examples:

* a frontend field, backend validator, schema, and test all encoded the same input rule, but nothing linked them
* an event producer and consumers had to change together, but the consumer list existed only in tribal knowledge
* a config option affected runtime behavior, but the only way to find it was a failing integration test
* a rule was represented in code, test fixtures, and documentation, but no artifact identified the rule as one decision

For these cases, the skill may suggest a focused improvement:

* add a test name that states the rule
* add an ownership note near the rule
* add a registry or consumer list
* add a contract test
* make an existing type more precise
* add a small reference between artifacts that must change together
* move a scattered rule into an existing owner when the task clearly showed the same decision is duplicated

The goal is not to make the code “cleaner.” The goal is to make the next similar modification less likely to miss part of the closure.

### Boundary guard

A boundary issue means the task crossed or touched an architectural boundary: a module boundary, layer boundary, ownership boundary, public interface, protocol, package dependency, bounded context, or extension point.

Here the skill must be conservative.

It should ask:

* Which existing boundary was this change supposed to respect?
* Who owns the rule, behavior, data, or decision touched by this change?
* Did the final patch move a decision away from its owner?
* Did the change introduce a new boundary? If so, is its owner clear under the higher-level architecture?
* Did the task reveal a weak boundary whose contract failed to stop traversal?
* Did the task introduce a shortcut dependency, shared abstraction, or contract change that weakens architecture routing?

The default rule is:

> Respect existing boundaries unless the current task explicitly includes an architecture change.

A post-change reflection may strengthen a boundary in small ways when ownership does not change:

* clarify an interface contract
* add a contract test
* document an invariant near the boundary
* narrow a type to express the real constraint
* rename a method to reveal responsibility
* add an ownership note
* make an implicit protocol assumption explicit

But it should not perform boundary redesign as ordinary task cleanup:

* do not move a domain rule into a caller just because the caller was the current entry point
* do not merge concepts across ownership boundaries based on one observed co-change
* do not reshape a shared public interface around one consumer
* do not bypass dependency direction to reduce local traversal
* do not delete an adapter, registry, or layer before checking whether it serves as an ownership boundary, protocol boundary, extension point, or architecture index
* do not weaken an architecture test or dependency rule just to make the patch pass

If the current patch introduced a boundary violation, correcting it is not optional cleanup. It is part of making the change correct.

If the boundary was weak but not violated, record it as boundary pressure. That pressure may justify a later architecture-focused change, but it should not be silently resolved inside a task-local refactor.

## Why this does not become over-refactoring

A common concern is that if every task ends with design reflection, every task will produce refactoring work. Worse, the team may start adding abstractions, registries, interfaces, and process around every inconvenience. That would be over-engineering.

The skill avoids this by changing the burden of proof.

It does not ask:

> Can we make this design cleaner?

It asks:

> What context did this task force us to acquire, why was that context expensive, and would a small design move make the next similar modification cheaper without weakening existing architecture intent?

That last clause is important.

A new abstraction is not helpful if future changes would still require reading through it. A registry is not helpful if there is no real set of change-together members to enumerate. A contract test is not helpful if the boundary was already trustworthy enough for this kind of modification. Documentation is not helpful if it creates another artifact future changes must keep in sync without making anything easier to find or verify.

The reflection treats every improvement as a trade:

* What context cost did this task reveal?
* Is the suggested improvement grounded in the change surface this task actually exposed?
* What new context cost would the proposed improvement add?
* Would it let future modifiers stop earlier, find related pieces more reliably, or make omissions visible?
* Does it preserve existing ownership, dependency direction, and decision placement?

Only when the answer is concrete does the suggestion become a candidate for refactoring.

This is why the final recommendation is deliberately conservative:

* **Do now**: the improvement is small, low-risk, directly related to the current change, clearly reduces the next similar context-acquisition path, and does not weaken architectural intent. If the current patch introduced a boundary violation, correcting it is also Do now.
* **Schedule later**: the issue is real, but the fix would change ownership, reshape a boundary, add significant structure, or touch enough code that it deserves its own design decision.
* **Just note**: the task exposed friction, but there is not enough evidence that adding structure would pay for itself, or the evidence points to boundary pressure rather than a safe local improvement.

The point is not to refactor after every change. The point is to price refactoring against the context cost that real work just revealed, while refusing to pay for local convenience by corrupting the architecture.

That makes the skill a guard against both over-engineering and architecture decay.

## Why agents are especially useful here

Human developers can do this reflection too. In fact, experienced developers often do it implicitly.

But coding agents make the process more observable.

An agent’s work often leaves traces: searches, files opened, failed assumptions, test failures, localization attempts, patch revisions, and tool calls. These traces are imperfect, but they expose part of the context acquisition process that usually lives inside a human developer’s head.

That makes agents useful not only as code generators, but also as design observers.

A coding agent can report:

* “I had to inspect these files to understand one rule.”
* “The boundary existed, but I could not infer its behavior without reading the implementation.”
* “The tests checked the behavior but did not reveal the domain rule.”
* “The frontend and backend represented the same decision, but nothing linked them.”
* “A future change is likely to miss this config because it was only found by global search.”
* “The easiest patch would have introduced a dependency across an ownership boundary.”
* “This change added a helper, but its owner is unclear under the current architecture.”
* “The patch originally placed the rule near the caller, but the existing owner is the domain service.”

This turns agent work into design telemetry.

Not a metric. Not a score. Not a replacement for engineering judgment. But a practical feedback loop: each real modification can reveal where the system made required context harder to acquire than it needed to be, and whether the change preserved the architecture’s intent.

## The skill

Here is the full skill text.

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
- Which existing boundary, layer, module, context, interface, or ownership rule was relevant to this change?
- Did the final change respect that boundary?
- Did the change introduce a new boundary, abstraction, helper, dependency, or shared artifact? If so, is its owner clear under the existing architecture?

Your goal is to identify design or structure issues that increased the amount of context needed for this change, especially disconnected parts of the change surface and boundary-related risks.

Suggest focused improvements that would make future similar changes easier, safer, and less likely to miss something, while preserving the architecture's existing intent.

Do not produce a generic architecture review. Produce a focused post-change reflection based only on what this task actually exposed.

## Core Idea

After a change is complete, the agent has valuable temporary knowledge:

- which files had to be inspected
- why they had to be inspected
- where the real rule or cause was located
- which related pieces changed together
- which related pieces were easy to find
- which related pieces were only found by search, failing tests, naming guesses, framework knowledge, manual review, or prior knowledge
- which missing connections may cause future omissions
- which boundaries were crossed or relied on
- which boundaries failed to stop traversal
- whether the final patch respected ownership and dependency direction

Use that knowledge before it disappears.

The most important locality question is:

- If a future developer or agent starts from any meaningful part of this change surface, would they be able to discover the other parts that must be considered together?
- If not, suggest the smallest useful connection.

The most important boundary question is:

- Did this change preserve the existing architecture's boundary, ownership, and placement intent?
- If not, recommend correcting the violation before considering the task complete.
- If the boundary was weak but not violated, record the weakness as boundary pressure instead of silently reshaping the boundary.

## Context Cost

In this skill, context cost means all information that had to be loaded, understood, and verified to complete this change safely.

This includes code, tests, types, contracts, configuration, schemas, documentation, runtime behavior, framework conventions, deployment steps, ownership rules, architecture rules, and domain knowledge.

Every non-trivial change has context cost.

This reflection focuses on the part of the context cost that the design made higher than necessary:

- information that was hard to discover
- rules that had no clear owner
- related artifacts that did not point to each other
- boundaries that could not be trusted
- hidden conventions that were not captured as artifacts
- repeated decisions represented in disconnected places
- tests, types, or contracts that failed to reveal the required change surface
- ownership or dependency rules that were unclear at the point of change
- architecture boundaries that the patch almost bypassed or actually violated

The goal is not to eliminate context.
The goal is to make the required context smaller, clearer, better connected, and easier to verify for future similar changes, without weakening the architecture's context-routing structure.

## What to Look For

Look for locality issues such as:

- business logic scattered across multiple places
- related artifacts that do not point to each other
- repeated representations of the same decision across code, tests, config, frontend, schema, docs, or deployment logic
- framework conventions that are required but not visible near the entry point
- tests that verify behavior but do not explain the rule
- types that are too broad to express the real constraint
- naming that does not reveal responsibility
- documentation or examples missing at the point where they would help
- legacy and new paths implementing the same behavior through different conventions
- cross-system or cross-team dependencies not recorded as contracts, owners, checklists, or consumer lists

Look for boundary issues such as:

- unclear ownership of a rule, behavior, or decision
- weak or vague interface contracts
- hidden coupling between caller and implementation
- implicit side effects across a boundary
- implementation details leaking through a public contract
- caller-specific assumptions entering a shared boundary
- a new helper, abstraction, or shared module with unclear owner
- a shortcut dependency across layers, modules, contexts, or ownership boundaries
- an adapter, registry, layer, or architecture test treated as accidental friction even though it may encode architecture intent

## Boundary Guard

Before suggesting an improvement, identify whether this task touched an existing architectural boundary.

Ask:

- Which existing boundary, layer, module, context, interface, or ownership rule was relevant to this change?
- Did the final change respect that boundary?
- Did the change move a rule, behavior, data access, or decision away from its existing owner?
- Did the change introduce a new boundary? If so, is its owner and placement clear under the higher-level architecture?
- Did the task reveal a weak boundary whose contract failed to stop traversal?
- Did the task introduce a dependency, shortcut, shared abstraction, or contract change that weakens architecture routing?

Rules:

- Respect existing boundaries by default.
- Do not reduce local context cost by moving decisions away from their architectural owner.
- Do not merge concepts across ownership boundaries based only on one observed co-change.
- Do not reshape a shared boundary around the current task's consumer.
- Do not remove an indirection if it serves as an ownership boundary, extension point, protocol boundary, registry, or architecture index.
- Treat architecture tests, dependency rules, visibility rules, and contract tests as guard context, not ordinary friction.
- If this task introduced a boundary violation, recommend correcting it as part of the current change.
- If the boundary was weak but not violated, record it as boundary pressure unless a small contract clarification is enough.

## Design Reflection

After completing the task, produce a short design reflection with these sections.

### 1. Context needed for this change

Briefly list the important files, modules, tests, interfaces, configs, docs, architecture rules, or runtime behavior that had to be inspected.

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
- unclear architecture rule
- boundary pressure

Be specific. Avoid vague statements like “the architecture is complex.”

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
- architecture tests or dependency rules

This section is about the actual change surface revealed by the task.

Do not assume that one observed co-change proves decision identity. If ownership or future variation is unclear, say so.

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
- architecture rule or ownership note

Call out anything future developers or agents are likely to miss.

This is the locality review: check whether the related pieces of the change were connected well enough.

### 5. Boundary and ownership check

Identify the existing boundary, layer, module, context, interface, or ownership rule this task touched.

State whether the final change respected it.

Use this form when possible:

- The change stayed within the existing owner of ...
- The change crossed ... but used the existing boundary/protocol.
- The change introduced ... and its owner is ...
- The boundary exists, but its contract was too weak to stop investigation.
- The current patch violates ... because ...

If the patch violates an existing boundary, recommend correcting it before treating the task as complete.

If the boundary was weak but not violated, record it as boundary pressure.

### 6. Design issue revealed

State the structural issue that increased context cost in this task.

Do not label the issue with a broad design principle first.
Explain the actual mechanism.

Use this form when possible:

- This change required extra context because ...
- The extra context was needed because ...
- Future similar changes may miss something because ...
- Future similar changes may weaken the architecture because ...

Good examples:

- The rule has no clear owner, so understanding it required reconstructing behavior from several files.
- The boundary exists, but its contract is too weak to stop investigation.
- The same decision is represented in multiple artifacts, but those artifacts do not point to each other.
- The test setup hides an important runtime contract, so passing tests do not clearly explain the real behavior.
- The easiest local patch would bypass the existing ownership boundary, so this task revealed boundary pressure rather than a safe local refactor.

### 7. Suggested improvement

Suggest one focused improvement that reduces future context cost while preserving architecture intent.

Prefer the smallest connection that makes the related change surface easier to discover.

The improvement may be:

- an index: a test name, module note, contract note, README section, ownership note, or checklist
- a stronger executable connection: exhaustive type check, central registry, generated completeness check, contract test, architecture test, or shared test helper
- a small refactor inside an existing owner: moving a scattered rule into its existing owner, clarifying a boundary contract, or removing a forwarding layer that adds no useful understanding and does not serve as an architecture index

Choose a refactor only when the task showed that the disconnected pieces represent the same decision and should have a clearer owner.

Do not infer decision identity from one co-change alone.

Do not suggest broad rewrites.
Do not suggest improvements that are merely stylistic.
Do not suggest boundary reshaping as a local improvement.

If the improvement would change ownership, dependency direction, public contracts, layer placement, or bounded-context responsibilities, classify it as a separate architecture-focused follow-up.

### 8. Why this helps

Explain how the suggestion reduces context cost for future changes.

Be explicit about the mechanism.

For example, explain whether it would:

- make related artifacts discoverable from each other
- give the rule a clearer owner
- let future developers or agents stop at a reliable boundary
- turn hidden knowledge into an artifact
- make omission visible through tests, types, contracts, or checklists
- reduce the number of places that must be inspected before a safe change
- preserve architecture routing by keeping decisions under the correct owner
- make boundary pressure visible without silently weakening the boundary

Avoid vague claims such as “this improves maintainability.”

### 9. Recommendation

Classify the suggestion as one of:

- Do now: small, low-risk, directly related to this change, and safe under existing architecture; or required because the current change introduced a boundary violation
- Schedule later: valuable but outside the current task, especially if it changes ownership, dependency direction, public contracts, layer placement, or bounded-context responsibilities
- Just note: interesting signal, but not enough evidence to change yet; often appropriate for weak-boundary observations or one-off co-change evidence

Do not perform the suggested refactoring unless explicitly asked.

## Avoid

Do not suggest broad rewrites.
Do not say “improve architecture” without a concrete mechanism.
Do not recommend Clean Architecture, DDD, SOLID, DRY, or other labels as the conclusion.
Do not turn every inconvenience into a refactoring task.
Do not add documentation noise.
Do not suggest changes unrelated to the task just completed.
Do not reshape boundaries during local post-change reflection.
Do not move decisions across ownership boundaries to reduce local traversal.
Do not remove architecture indexes merely because they looked like forwarding layers in this task.
Do not weaken tests, types, dependency rules, or contracts that enforce architecture intent.
Do not perform the suggested improvement unless explicitly asked, except to correct a boundary violation introduced by the current change.

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

### 5. Boundary and ownership check

...

### 6. Design issue revealed

...

### 7. Suggested improvement

...

### 8. Why this helps

...

### 9. Recommendation

Do now / Schedule later / Just note

...
```

## Closing the loop

So, will AI coding ruin your codebase?

Not inevitably. The real risk is not that coding agents are incapable of architectural reasoning. Modern coding agents always plan before changing code: they inspect the existing structure, infer the architecture, decide where the change should land, and try to implement the task in a way that fits the codebase.

That planning step matters. But it is not enough.

Pre-change planning works from an anticipated understanding of the task. Post-change reflection works from the actual modification path. After the change is complete, the agent knows which files it truly had to inspect, which boundary looked clear but failed to stop traversal, which related artifact was only found through search, which ownership rule was almost bypassed, and which tiny shortcut slipped into the patch because it made the local change easier.

Those small details are where architecture decay often begins.

A codebase is rarely ruined by one obviously bad architectural decision. It is more often weakened by small, plausible modifications that leave behind tiny violations. These are the ant holes in the dike. Each one looks too small to justify an architecture discussion. Together, they make the architecture less trustworthy as a context-routing system.

Post-change design reflection exists for exactly this scale of problem. It does not replace macro architecture design. It does not decide the best bounded contexts, rewrite the dependency graph, or prove that existing boundaries are still the right ones. Its job is narrower and more continuous:

- notice the small violations that planning missed
- repair locality when a real task exposes a disconnected change surface
- strengthen weak boundaries through small contract clarifications when safe
- correct boundary violations introduced by the current patch
- record boundary pressure when the architecture made the task harder but should not be changed locally
- keep architecture intent visible inside the modification loop

That is enough to matter. A good architecture is not preserved by planning alone. It is preserved when every modification is checked against where decisions belong, which boundaries are trustworthy, and how future modifiers are supposed to acquire context.

Add the skill to your coding agent, run it after a real task is complete, and see what kind of design feedback it gives you. You may find that the most valuable suggestions are not grand refactorings, but small observations: a missing connection, a weak contract, an unclear owner, or a tiny boundary violation that would otherwise become part of the codebase unnoticed.
