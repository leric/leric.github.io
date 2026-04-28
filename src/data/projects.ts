export type Project = {
	slug: string;
	name: string;
	published?: boolean;
	kicker: string;
	status: string;
	stage: string;
	repo?: string;
	primaryAction?: {
		label: string;
		href: string;
	};
	summary: string;
	description: string;
	tags: string[];
	highlights: string[];
	useCases: string[];
	architecture: string[];
	commands?: {
		label: string;
		code: string;
	}[];
};

export const projects: Project[] = [
	{
		slug: "airic-gtd",
		name: "AiricGTD",
		published: false,
		kicker: "Document-mediated Agent Coordinator",
		status: "In development",
		stage: "Notion MVP",
		summary:
			"A local-first coordinator that turns Notion or Markdown task documents into executable work contracts for external agents.",
		description:
			"AiricGTD watches document-based task systems, claims ready work, dispatches it to mature executors such as Claude Code, Codex, Hermes, or shell scripts, then writes execution logs, artifacts, status updates, follow-ups, and decision requests back into the original task document.",
		tags: ["Notion", "Agent Coordinator", "GTD", "Attention Cycle", "Local-first"],
		highlights: [
			"Uses task documents as the source of truth, not chat messages.",
			"Keeps AiricGTD thin: discover, lock, schedule, dispatch, observe, write back, and notify.",
			"Delegates execution to mature agents instead of trying to become a universal agent.",
			"Turns documents into context, contracts, execution logs, review surfaces, and coordination layers.",
		],
		useCases: [
			"Let Notion store planned work while AiricGTD executes the work asynchronously in the background.",
			"Batch human attention into review sessions instead of supervising agents continuously.",
			"Coordinate Claude Code, Codex, Hermes, scripts, and future specialized agents through one task protocol.",
		],
		architecture: [
			"Notion Task Protocol defines task properties and page sections such as Goal, Context, Next Action, Constraints, Definition of Done, Execution Log, Output, and Follow-ups.",
			"Watcher polls for Ready tasks, then Claim / Lock Manager marks them Running with a machine id, timestamp, and run id.",
			"Executor adapters provide a common interface for Claude Code, Codex, Hermes, shell scripts, manual tasks, and test no-op runs.",
			"Result Writer appends execution logs and artifacts to the task document while updating lifecycle status and creating Decision Queue items when needed.",
		],
		commands: [
			{ label: "Run one task", code: "airic once" },
			{ label: "Start local service", code: "airic start" },
			{ label: "Stop local service", code: "airic stop" },
			{ label: "Inspect coordinator", code: "airic status" },
		],
	},
	{
		slug: "cmp",
		name: "Context Minimization Principle",
		kicker: "Software Design Research",
		status: "Position paper",
		stage: "2026",
		repo: "https://github.com/leric/cmp",
		primaryAction: {
			label: "Read the source",
			href: "https://github.com/leric/cmp",
		},
		summary:
			"A software design principle for asking a concrete question: how much context must a human or AI load before it can make a reliable change?",
		description:
			"The Context Minimization Principle reframes architecture quality around the cost of understanding. A design is better, all else equal, when it lets a developer or coding agent answer a real engineering question with less irrelevant context, while still preserving the domain knowledge that actually matters.",
		tags: ["Software Design", "AI Coding", "Architecture", "Research", "Quarto"],
		highlights: [
			"Moves architecture discussion from abstract elegance to query-specific comprehension cost.",
			"Explains why modularity, encapsulation, naming, and boundaries matter even more when AI agents read and change code.",
			"Separates useful domain complexity from accidental context that only exists because the design leaks.",
			"Provides a shared vocabulary for evaluating refactors, framework choices, and system boundaries.",
		],
		useCases: [
			"Review a proposed refactor by asking whether common change requests require less cross-file loading afterward.",
			"Compare two architecture options by the context they force maintainers and agents to traverse.",
			"Explain why some codebases feel easy to modify even when they are large, while others feel fragile despite being smaller.",
		],
		architecture: [
			"The paper is maintained as Quarto source so the argument, references, PDF, and publication package stay reproducible.",
			"The repository includes the bibliography, working draft, render workflow, and arXiv packaging script.",
			"Context Footprint is the companion measurement prototype that explores how CMP can be tested empirically.",
		],
		commands: [
			{ label: "Render paper", code: "quarto render cmp-position-paper.qmd" },
			{ label: "Package arXiv source", code: "./build-arxiv.sh" },
		],
	},
	{
		slug: "context-footprint",
		name: "Context Footprint",
		kicker: "Static Analysis Tool",
		status: "Research preview",
		stage: "Python + TypeScript tested",
		repo: "https://github.com/airicdev/context-footprint",
		primaryAction: {
			label: "View repository",
			href: "https://github.com/airicdev/context-footprint",
		},
		summary:
			"A static analysis prototype that estimates how much code context is pulled into scope when you need to reason about a function or type.",
		description:
			"Context Footprint turns the Context Minimization Principle into something measurable. It consumes semantic data from a codebase, builds a dependency graph, and computes a token-based Context Footprint for symbols so architectural hotspots become visible instead of anecdotal.",
		tags: ["Static Analysis", "Rust", "Python", "Architecture Metrics", "Semantic Graph"],
		highlights: [
			"Reports distribution-level context exposure across functions and types, not just isolated complexity scores.",
			"Surfaces symbols whose dependencies force unusually large amounts of code into the reader's working context.",
			"Allows drill-down from a high CF value to the source fragments that contributed to it.",
			"Uses a language-agnostic semantic JSON model, with Python and TypeScript used as early test targets.",
		],
		useCases: [
			"Find functions or types that look small locally but drag a large dependency neighborhood behind them.",
			"Measure whether a refactor actually reduced context exposure instead of merely moving code around.",
			"Collect empirical evidence for architecture research, design reviews, or AI coding-agent benchmarks.",
		],
		architecture: [
			"Semantic extractors produce JSON; the core analyzer stays focused on graph construction, traversal, and scoring.",
			"Traversal is conservative by default and can stop at external libraries or explicit abstraction boundaries.",
			"The Python package includes `cf-extract` for generating semantic data from Python projects.",
			"The CLI supports aggregate statistics, largest-footprint queries, single-symbol computation, and context inspection.",
		],
		commands: [
			{ label: "Install", code: "uv tool install cftool" },
			{ label: "Extract Python semantic data", code: "cf-extract /path/to/python/project > semantic_data.json" },
			{ label: "Analyze distribution", code: "cftool semantic_data.json stats" },
			{ label: "Find largest symbols", code: "cftool semantic_data.json top --limit 10" },
		],
	},
];

export const publicProjects = projects.filter((project) => project.published !== false);

export const featuredProjects = publicProjects.slice(0, 3);
