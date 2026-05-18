import { glob } from 'astro/loaders';
import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
	// Load Markdown and MDX files in the `src/content/blog/` directory.
	loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
	// Type-check frontmatter using a schema
	schema: ({ image }) => z.object({
		title: z.string(),
		description: z.string(),
		// Transform string to Date object
		pubDate: z.coerce.date(),
		updatedDate: z.coerce.date().optional(),
		// Support both local images and external URLs
		heroImage: z.union([image(), z.string()]).optional(),
		category: z.string().optional(),
		tags: z.array(z.string()).optional(),
		featured: z.boolean().optional(),
	}),
});

const research = defineCollection({
	loader: glob({ base: './src/content/research', pattern: '**/*.{md,mdx}' }),
	schema: z.object({
		title: z.string(),
		description: z.string(),
		book: z.literal('cmp'),
		part: z.string(),
		order: z.number().int(),
		status: z.enum(['draft', 'published', 'wip']),
		version: z.string(),
		pubDate: z.coerce.date(),
		updatedDate: z.coerce.date().optional(),
		canonicalUrl: z.string().url(),
		tags: z.array(z.string()).optional(),
		lang: z.string().default('en'),
		standalone: z
			.object({
				isArticle: z.boolean().optional(),
				ogImage: z.string().optional(),
			})
			.optional(),
	}),
});

export const collections = { blog, research };
