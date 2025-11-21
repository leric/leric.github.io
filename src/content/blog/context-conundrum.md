---
title: "The Context Conundrum: A Shared Limit for Humans and AI"
description: "Exploring how abstraction, functional programming, and Clean Architecture help both humans and AI manage context complexity in software development."
pubDate: "Aug 02 2024"
heroImage: "../../assets/blog-placeholder-2.jpg"
---

*This is Part 2 of my series — check out Part 1: "[Beyond Vibe Coding: Why AI Won't Replace Software Engineers.](https://medium.com/@lericzhang/beyond-vibe-coding-why-ai-wont-replace-software-engineers-f92ebac9d436)"*

At the heart of effective software engineering lies a simple yet profound challenge: managing context. For humans, our cognitive capacity is constrained by working memory — often cited as holding about 7±2 items at a time, per Miller's Law. We find it hard to work with large, complex code or tangled systems unless we break them down into smaller, easier-to-understand parts. Similarly, LLMs, the backbone of modern AI tools, face token limits that restrict how much context they can process in a single interaction. Exceed these limits, and the AI risks "hallucinations" or incoherent outputs due to overwhelmed context.

In the AI era, context size isn't just a human concern; it's a critical bottleneck for AI agents tasked with code generation, refactoring, or system design. Reducing the context required for any given task — making code "fit in your head" — becomes a unifying goal. Smaller contexts mean faster processing, fewer errors, and more reliable collaboration between humans and machines, especially in domain-heavy projects where complexity can spiral into thousands of interconnected details. This article examines how traditional software practices, refined for AI, tackle this conundrum head-on.

## Abstraction: Depend on What, Not How

One of the most enduring principles in software design is to **depend on abstraction, not implementation**. Abstraction allows us to hide low-level details behind interfaces, modules, or functions, letting developers reason about systems at a higher level without drowning in minutiae. This directly shrinks the context size of a task — you focus on *what* a component does, not *how* it's built, keeping mental load light.

For humans, this has always been a productivity booster. Consider a payment processing system: Instead of memorizing every line of database access code, you interact with an abstracted `IPaymentProcessor` interface, reasoning only about its purpose. In the AI era, this principle takes on even greater importance. LLMs thrive when given focused, modular contexts that fit within their token limits. Prompt an AI to refactor a payment module using an abstracted interface, and it can handle the task without needing the full implementation's weight, reducing errors and improving output quality.

Historically, some developers viewed writing interfaces for everything as redundant — human brains can skim or recall details as needed. But for AI, it's transformative. Abstraction modularizes prompts, enabling agents to tackle sub-tasks independently, much like composing micro-services in a larger system. This isn't just about cleaner code; it's about making complexity manageable for both human and machine minds, ensuring tasks stay within cognitive or token boundaries.

## Functional Programming: Stateless Simplicity

Another powerful tool for minimizing context is **functional programming (FP)**, which emphasizes immutability and pure functions — code without side effects. By eliminating mutable state, FP reduces the need to track "what changed when" across a program's flow. For human developers, this makes code more predictable and easier to test, aligning perfectly with the "fits in your head" ethos. No more mental gymnastics to follow state mutations; instead, you reason about data as immutable flows.

For AI agents, the benefits are even more pronounced. LLMs often struggle with stateful logic, losing track of variables or hallucinating changes in long contexts. FP counters this by treating functions as isolated, stateless units that transform data rather than modify it. This shrinks the required context, allowing AI to process tasks with greater accuracy. Imagine an AI analyzing a supply chain: With a functional state machine approach, each state transition is a pure function producing a new state, making the flow predictable and eliminating the need to track global variables across the entire context.

This approach dovetails with the human-AI parallel: Just as we chunk information to avoid cognitive overload, FP chunks code into stateless components, making it digestible for LLMs. It's a micro-level strategy that keeps tasks small and focused, paving the way for higher-level system design.

## Clean Architecture: System-Wide Context Control

Taking context management to a broader scale, **Clean Architecture** applies the concept of Inversion of Control (IOC) at a system level. By structuring a system so dependencies flow inward — keeping core business logic pure and isolated from external concerns like databases or UI — Clean Architecture ensures that tasks only load the context they need. For human developers, this prevents the dreaded "big ball of mud," where everything depends on everything else, ballooning mental load.

In AI-driven workflows, this structure is a game-changer. Agents can target specific layers without dragging in the full system's complexity. For instance, an AI could generate database adapters without touching the domain model, keeping prompts concise and within token limits. What once seemed like over-engineering — defining interfaces for every layer — becomes a necessity for AI efficiency. Humans might tolerate some context bloat, but LLMs thrive on this disciplined separation, enabling precise, error-free contributions.

Clean Architecture transforms IOC from a tactical choice into a strategic enabler, ensuring that both human and AI collaborators can focus on bite-sized, meaningful tasks. It's a blueprint for scaling complexity without overwhelming either mind.

## Putting It Together: Hallucinations Come True

Let's tie these concepts into a practical vision. Imagine a domain-heavy project — say, a healthcare billing system — where complexity could easily spiral. Using abstraction, you define clear interfaces for billing workflows, hiding implementation details. With FP, core functions like calculating patient dues are stateless, ensuring predictability for both developers and AI agents. Clean Architecture layers the system, so AI can generate UI components without touching business rules, keeping contexts small.

In this setup, an AI agent tasked with adding a new feature — like insurance validation — operates within a constrained context. It references abstracted interfaces, leverages stateless functions, and targets a specific architectural layer. The result? Reliable code generation with minimal hallucinations, achieving what I like to call "hallucination come true" — where what the AI thinks the code should be turns out to be exactly what it is.

This phenomenon arises from clear responsibility separation, often expressed through abstract interfaces. When an LLM "hallucinates" a function in one of its dependencies — based on its understanding of responsibilities (typically outlined in interface comments or documentation) — it's not always a flaw. Instead, it can highlight gaps in our design. For example, if the AI assumes an `IInsuranceValidator` interface should include a `CheckPolicyCoverage` method to handle eligibility checks, and it's missing, this isn't mere invention; it's a signal that we're likely overlooking a key responsibility. The AI's output, grounded in abstracted roles, prompts us to refine the system, turning potential hallucinations into validated, implemented reality.

By enforcing such separations, we create a feedback loop: AI suggests based on high-level abstractions, humans verify and implement, and the code evolves to match the AI's reasoned expectations. This synergy ensures code fits in both human heads and AI token limits, democratizing excellence across the development process.

## Conclusion & Teaser: Toward a Holistic AI Workflow

The practices of abstraction, functional programming, and Clean Architecture aren't new, but their importance is magnified in the AI era. By minimizing context size, they address the shared limitations of human and machine minds, making software engineering more manageable, scalable, and collaborative. "Code That Fits in Your Head" isn't just a catchy phrase — it's a guiding principle for navigating complexity, whether you're a seasoned developer or an AI agent.

Looking ahead, the next article in this series will expand beyond individual practices to explore the entire software development lifecycle in the AI age. We'll dive into strategic frameworks like Domain-Driven Design (DDD) and examine how they orchestrate the full process — from ideation to deployment — in partnership with AI. Stay tuned for a roadmap to mastering domain-heavy challenges with machine precision and human insight. If you have feedback on this draft or ideas for specific examples, I'm all ears!

*Special thanks to Mark Seemann's influential book "Code That Fits in Your Head" (2021), which inspired this article and its emphasis on designing software that remains mentally manageable — principles we extend here to the AI era.*
