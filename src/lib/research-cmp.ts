import type { CollectionEntry } from 'astro:content';

export const CMP_BOOK_SLUG = 'cmp' as const;

/** URL segment order for Parts (TOC + prev/next). */
export const CMP_PART_ORDER = ['start', 'foundations', 'shape'] as const;

export type CmpPartId = (typeof CMP_PART_ORDER)[number];

export const CMP_START_PART = 'start' as const;

export const CMP_PART_LABELS: Record<CmpPartId, string> = {
	start: 'Start here',
	foundations: 'Part I — Foundations',
	shape: 'Part II — The Shape of Context',
};

export function cmpChapterPath(part: string, slug: string) {
	return `/research/${CMP_BOOK_SLUG}/${part}/${slug}/`;
}

export function cmpChapterCanonicalUrl(site: URL | string, part: string, slug: string) {
	const base = typeof site === 'string' ? site.replace(/\/$/, '') : site.origin;
	return `${base}${cmpChapterPath(part, slug)}`;
}

export function parseCmpEntryId(id: string): { part: string; slug: string } | null {
	const m = id.match(/^cmp\/([^/]+)\/(.+)$/);
	if (!m) return null;
	return { part: m[1], slug: m[2] };
}

export function isCmpChapterPublished(status: 'draft' | 'published' | 'wip') {
	return status === 'published';
}

export function isCmpChapterRenderable(status: 'draft' | 'published' | 'wip') {
	return status === 'published' || status === 'wip';
}

export function partSortKey(part: string) {
	const idx = CMP_PART_ORDER.indexOf(part as CmpPartId);
	return idx === -1 ? 999 : idx;
}

export function sortCmpChapters(entries: CollectionEntry<'research'>[]) {
	return [...entries].sort((a, b) => {
		const dp = partSortKey(a.data.part) - partSortKey(b.data.part);
		if (dp !== 0) return dp;
		return a.data.order - b.data.order;
	});
}

export function getCmpChapters(entries: CollectionEntry<'research'>[]) {
	return sortCmpChapters(entries.filter((e) => e.data.book === CMP_BOOK_SLUG));
}

export function getAdjacentChapters(
	sortedRenderable: CollectionEntry<'research'>[],
	currentId: string,
) {
	const idx = sortedRenderable.findIndex((e) => e.id === currentId);
	if (idx === -1)
		return {
			prev: undefined as CollectionEntry<'research'> | undefined,
			next: undefined as CollectionEntry<'research'> | undefined,
		};
	return {
		prev: sortedRenderable[idx - 1],
		next: sortedRenderable[idx + 1],
	};
}
