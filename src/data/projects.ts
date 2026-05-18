export type Project = {
	slug: string;
	name: string;
	published?: boolean;
	repo: string;
	primaryAction?: {
		label: string;
		href: string;
	};
	summary: string;
	tags: string[];
};

export const projects: Project[] = [
	{
		slug: "airic-gtd",
		name: "AiricGTD",
		published: false,
		repo: "https://github.com/leric/airic-gtd",
		summary:
			"A local-first coordinator that turns Notion or Markdown task documents into executable work contracts for external agents.",
		tags: ["Notion", "Agent Coordinator", "GTD", "Attention Cycle", "Local-first"],
	},
	{
		slug: "context-footprint",
		name: "Context Footprint",
		repo: "https://github.com/airicdev/context-footprint",
		primaryAction: {
			label: "View repository",
			href: "https://github.com/airicdev/context-footprint",
		},
		summary:
			"A static analysis prototype exploring proxies for context acquisition cost across dependency traversal and modification reachability.",
		tags: ["Static Analysis", "Rust", "Python", "Architecture Metrics", "Semantic Graph"],
	},
	{
		slug: "attention-cycle",
		name: "The Attention Cycle",
		repo: "https://github.com/leric/attention-cycle",
		primaryAction: {
			label: "View repository",
			href: "https://github.com/leric/attention-cycle",
		},
		summary:
			"A research manuscript on reducing supervision tax by using executable documents as the coordination surface for human-agent work.",
		tags: ["AI Agents", "Executable Documents", "Attention", "Quarto", "Research"],
	},
];

export const publicProjects = projects.filter((project) => project.published !== false);

export const featuredProjects = publicProjects.slice(0, 3);
