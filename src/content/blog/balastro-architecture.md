---
title: "From Clean Architecture to Balatro: When 'Bureaucracy' Meets 'Emergence'"
description: "Exploring how game development's ECS paradigm challenges traditional Clean Architecture, and why sometimes perfect order is the enemy of joy. A reflection on bureaucracy vs. emergence in software design."
pubDate: "Jan 10 2026"
heroImage: "https://images.unsplash.com/photo-1667833153581-07750fc1370e?w=1920&q=80"
category: "Software Architecture"
tags: ["Clean Architecture", "ECS", "Game Development", "Software Design", "Balatro"]
---

## From Clean Architecture to Balatro: When "Bureaucracy" Meets "Emergence"

I used to be a Clean Architecture purist.

For years, I worshipped at the altar of order. Layers upon layers. Dependency Inversion like gospel. High walls separating the sacred Domain from the profane Infrastructure. Every line of code had its place—UseCase here, Repository there, Controller over yonder. It was beautiful. It was clean. It was *correct*.

Then I read the source code of *Balatro*, a roguelike deckbuilder about poker and chaos.

It broke me.

**Sometimes, perfect order is the enemy of joy.**

## The Architect as Bureaucrat

In *Nexus*, Yuval Noah Harari makes a sharp observation: bureaucracy—from the French *bureau*, literally "a desk with drawers"—works by cramming messy reality into neat little compartments. To govern, we must simplify. To simplify, we must ignore.

Sound familiar?

Clean Architecture is bureaucracy for code:

- **Entities** are your core assets, locked in the vault
- **UseCases** are standardized procedures, filed in triplicate
- **Interfaces** are the official forms departments use to talk to each other

And like any good bureaucracy, it *works*. It prevents rot. It reduces cognitive load. When you're building banking software or e-commerce systems—domains where bugs mean lawsuits—this kind of defensive structure is a godsend.

But bureaucracies have a fatal flaw: **every filing system is a bet on what matters.** The moment you decide something belongs in the "unimportant" drawer, you've killed its potential to combine with other elements in unexpected ways. You've traded serendipity for safety.

## The Joker Laughs Last

*Balatro* showed me what happens when you bet the other way.

Consider this combo: **Pareidolia + Sock and Buskin + Face Card Jokers**.

- **Pareidolia**: All cards count as Face Cards (J, Q, K)
- **Sock and Buskin**: Face cards trigger **twice** during scoring
- **Scary Face**: Each face card gives +30 Chips

Here's the magic: a lowly 2 of Clubs has nothing to do with royalty. But Pareidolia doesn't *transform* it—it just makes every "is this a face card?" check return `true`. Suddenly your 2 triggers twice. Suddenly it's worth +60 Chips. **One rule rewrote another rule's truth condition, and a third rule stacked effects on top of that rewritten reality.**

Now try implementing this in Clean Architecture. I dare you.

1. **Where does "is face card" live?** Looks like an Entity property. But Pareidolia turns it into a globally mutable query. Which layer owns that?
2. **Where does "trigger count" live?** Looks like scoring logic. But Sock and Buskin makes it externally configurable. Who's in charge?
3. **Who orchestrates the Joker effects?** There's no conductor. Jokers modify each other. They don't ask permission.

Worse: **the order you place Jokers matters.** +Mult card must go before xMult ones, or your math falls apart. This isn't declarative composition—it's procedural execution, left to right, no exceptions.

To make this work in a layered architecture, you'd have to punch holes everywhere. Pass context through every wall. Your clean separation becomes Swiss cheese. Because *Balatro*'s entire design philosophy is **"rules that break rules."** Nothing is sacred. Everything is mutable. And that mutability *is the fun*.

## A Different Game: ECS and Structured Chaos

So how do game developers build systems where chaos is the feature, not the bug?

The answer is **ECS (Entity-Component-System)**, part of a broader paradigm called **Data-Oriented Design**.

The core idea: **separate data from behavior completely.**

### Data: Entities and Components

An **Entity** is just an ID—a blank name tag. It holds nothing, knows nothing. It exists only as a hook for **Components**, which are typed bags of data you can attach or detach at runtime.

In *Balatro*, Entities might be:

- Each playing card (`card_001`, `card_002`)
- Each Joker (`joker_pareidolia`, `joker_scary_face`)
- The player state, the current hand, even a single "play action"

Components define what an Entity *is*:

- `Suit: Hearts`
- `Rank: 2`
- `IsFaceCard: true`
- `TriggerCount: 2`

There's no class hierarchy. No inheritance. An Entity's "type" emerges from whatever tags happen to be attached to it right now.

### Behavior: Systems

A **System** is a pure function that queries Entities by their Components and does something with them. Systems don't talk to each other—they just read and write data.

Each Joker becomes a System:

- **PareidoliaSystem**: Find all card Entities → attach `IsFaceCard: true`
- **SockAndBuskinSystem**: Find all Entities with `IsFaceCard` → set `TriggerCount: 2`
- **ScaryFaceSystem**: Find all Entities with `IsFaceCard` → add +30 Chips on score

### Why This Works

Remember our three impossible questions?

1. **Where does "is face card" live?** It's a Component. Any System can add or remove it. Pareidolia doesn't "ask" the card if it's a face card—it just slaps on a tag. **The tag is the truth.**
2. **Where does "trigger count" live?** Also a Component. Sock and Buskin modifies it directly. No approval needed.
3. **Who coordinates everything?** Nobody. Systems run in sequence. Each one queries the tags it cares about, does its thing, moves on. Effects stack naturally because they all operate on the same shared data.

It looks like anarchy—global state everywhere, no encapsulation, no type safety. But it's *designed* anarchy. You sacrifice isolation for **compositional freedom**. Adding a new Joker is trivial: write a new System, define what Components it reads and writes, done. No refactoring required.

## The Plot Twist: They're Solving the Same Problem

This experience expanded my view of software architecture. Clean Architecture and ECS aren't opposites—they're two solutions to the same fundamental constraint.

**We can only hold so much in our heads at once.**

Whether you're a human reading code or an LLM processing tokens, you have a context window. A good architecture is one that lets you work on part of a system **without loading the whole thing into memory.**

- **Clean Architecture** draws boundaries around **abstraction levels**. Business logic doesn't need to know about databases. Use an interface, and you can change the DB without touching the domain.
- **ECS** draws boundaries around **data queries**. Each System only sees Entities that match its filter. Add a new System, and existing ones don't notice or care.

Different cuts. Same goal: **minimize the global context required to make a local change.**

The "chaos" of ECS isn't lawlessness—it's a different kind of order. Clean Architecture organizes by *responsibility*. ECS organizes by *data shape*. Pick the one that matches how your system actually changes.

## Know When to Play Which Card

Bureaucracy and emergence look like enemies. Zoom out, and they're both doing **context management**.

Clean Architecture builds sterile rooms. Change the implementation without understanding the business. Change the business without touching the plumbing. It's **defensive decoupling**: assume change is dangerous, contain it.

ECS builds ecosystems. Add new rules without knowing what other rules exist. Let effects combine in ways you never planned. It's **offensive decoupling**: assume change is constant, embrace it.

Mature engineers don't pick a side. They learn to code-switch.

In your core domain—the parts where correctness is non-negotiable—be the bureaucrat. Guard invariants. Enforce boundaries. File everything in its proper drawer.

At the edges—where users interact, where rules combine, where emergence creates value—be the joker. Let data flow. Let systems surprise you. **Play the hand you're dealt, not the one you planned.**

The best architectures aren't pure. They're hybrids that know when order serves the system and when it strangles it.

Sometimes you need a clean desk. Sometimes you need to let the cards fall where they may.