# Architecture Map

Routing index for this codebase. CMP treats architecture as a context-routing system; this file is the map that keeps routes cheap to find. Read it before planning a change (it is the entry point for Planning Workflow step 4), and update it when a change creates or moves a route (see "Maintaining this map").

This is an index, not a mirror of the code. Record stable, high-value navigation only: where things live, who owns what, which boundaries to trust. Leave out implementation detail the code already states and that would drift.

- Last updated:
- Architectural decision owners:

## Layer layout

Where each layer physically lives.

| Layer | Location (path / module) | Notes |
|---|---|---|
| Entities / domain |  |  |
| Use cases / application |  |  |
| Ports (interfaces) |  |  |
| Adapters (infrastructure) |  |  |
| Delivery (controllers / UI / API) |  |  |
| Persistence |  |  |
| Tests |  |  |

## Use case catalog (vertical owners)

The primary routing table: which business process owns which behavior. Workflow step 3 starts here.

| Use case | Purpose (one line) | Location | Ports used | Key entities |
|---|---|---|---|---|
|  |  |  |  |  |

## Ports & adapters registry

Check here before creating a new port (Workflow step 7).

| Port | Capability (use-case language) | Location | Adapters | Contract test |
|---|---|---|---|---|
|  |  |  |  |  |

## Core entities & invariants

Where stable business rules live.

| Entity / value object | Owns (invariant) | Location |
|---|---|---|
|  |  |  |

## Conventions & placement rules

How new things are placed, so changes follow existing routes (Workflow steps 4 and 8).

- New use case →
- New port →
- New adapter →
- Naming conventions →
- Dependency-rule enforcement (lint / arch test) →
- Other →

## Boundary debts (known untrusted routes)

Boundaries to not trust casually (Workflow step 6). Recording them prevents re-discovery and silent bypass.

| Boundary | Problem | Risk if bypassed | Owner / status |
|---|---|---|---|
|  | provider-shaped / leak / missing contract / wrong dependency direction |  |  |

## Open ownership questions

Capabilities whose owner is not yet settled. Route here to escalate consistently instead of guessing.

| Capability / concern | Candidate owners | Decision needed |
|---|---|---|
|  |  |  |

## Maintaining this map

The skill keeps this file current as part of every change that moves or creates a route.

- **Read first.** At Workflow step 4, start from this map, then drill into code. If the map disagrees with the code you inspect, correct the stale entry (cheap, how-level) and note it; if the discrepancy touches a design gate, escalate instead.
- **Update last.** As the final step of a change, update the map when — and only when — a structural fact changed: a use case added/removed/renamed or its ports/entities changed; a port or adapter added/removed, or a port contract's semantics changed; an entity gained/lost an owned invariant; a placement convention or dependency rule changed; a boundary debt introduced, resolved, or reclassified; an ownership question opened or closed. If nothing structural changed, leave the map untouched.
- **Record, don't decide.** Recording an already-approved structural decision is how-level bookkeeping. Adding an entry for a new use case, port, owned concept, or convention that has NOT been approved is a what-level decision behind a human design gate. Never use a map edit as a backdoor to introduce a boundary.
- **Keep it an index.** Every entry must lower the context cost of a future change. Drop entries that only duplicate what the code already makes obvious.
