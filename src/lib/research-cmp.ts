import type { CollectionEntry } from 'astro:content';

export const CMP_BOOK_SLUG = 'cmp' as const;

/** URL segment order for Parts (TOC + prev/next). */
export const CMP_PART_ORDER = ['start', 'foundations', 'shape', 'principles', 'practice'] as const;

export type CmpPartId = (typeof CMP_PART_ORDER)[number];

export const CMP_START_PART = 'start' as const;

export const CMP_PART_LABELS: Record<CmpPartId, string> = {
	start: 'Start here',
	foundations: 'Part I — Foundations',
	shape: 'Part II — The Shape of Context',
	principles: 'Part III — Design as Context Engineering',
	practice: 'Part IV — Practice: Design in the Agent Era',
};

export type CmpLang = 'en' | 'zh';

export const CMP_PART_LABELS_ZH: Record<CmpPartId, string> = {
	start: '从这里开始',
	foundations: '第一部分 · 基础',
	shape: '第二部分 · 上下文的形状',
	principles: '第三部分 · 设计即上下文工程',
	practice: '第四部分 · 实践：智能体时代的设计',
};

export function cmpPartLabel(part: CmpPartId, lang: CmpLang = 'en') {
	return lang === 'zh' ? CMP_PART_LABELS_ZH[part] : CMP_PART_LABELS[part];
}

/** Chinese pages live under /zh/; English URLs stay unprefixed. */
export function cmpLangPrefix(lang: CmpLang = 'en') {
	return lang === 'zh' ? '/zh' : '';
}

export function cmpBookPath(lang: CmpLang = 'en') {
	return `${cmpLangPrefix(lang)}/cmp/`;
}

export function cmpChapterPath(part: string, slug: string, lang: CmpLang = 'en') {
	return `${cmpLangPrefix(lang)}/research/${CMP_BOOK_SLUG}/${part}/${slug}/`;
}

export function cmpChapterCanonicalUrl(site: URL | string, part: string, slug: string) {
	const base = typeof site === 'string' ? site.replace(/\/$/, '') : site.origin;
	return `${base}${cmpChapterPath(part, slug)}`;
}

/** Entry ids are `cmp/<part>/<slug>` (English) or `zh/cmp/<part>/<slug>` (Chinese). */
export function parseCmpEntryId(
	id: string,
): { part: string; slug: string; lang: CmpLang } | null {
	const m = id.match(/^(?:(zh)\/)?cmp\/([^/]+)\/(.+)$/);
	if (!m) return null;
	return { part: m[2], slug: m[3], lang: m[1] === 'zh' ? 'zh' : 'en' };
}

export function cmpEntryPath(entry: CollectionEntry<'research'>) {
	const p = parseCmpEntryId(entry.id);
	return p ? cmpChapterPath(p.part, p.slug, p.lang) : '#';
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

export function getCmpChapters(entries: CollectionEntry<'research'>[], lang: CmpLang = 'en') {
	return sortCmpChapters(
		entries.filter(
			(e) => e.data.book === CMP_BOOK_SLUG && parseCmpEntryId(e.id)?.lang === lang,
		),
	);
}

/** The same chapter in the other language, if it exists and is renderable. */
export function findCmpTranslation(
	entries: CollectionEntry<'research'>[],
	entry: CollectionEntry<'research'>,
	targetLang: CmpLang,
) {
	const p = parseCmpEntryId(entry.id);
	if (!p) return undefined;
	return entries.find((e) => {
		const q = parseCmpEntryId(e.id);
		return (
			q?.lang === targetLang &&
			q.part === p.part &&
			q.slug === p.slug &&
			isCmpChapterRenderable(e.data.status)
		);
	});
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
