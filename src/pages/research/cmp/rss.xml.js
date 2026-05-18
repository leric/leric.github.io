import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import {
	cmpChapterPath,
	getCmpChapters,
	isCmpChapterRenderable,
	parseCmpEntryId,
} from '../../../lib/research-cmp';

export async function GET(context) {
	const all = await getCollection('research');
	const items = getCmpChapters(all).filter((e) => isCmpChapterRenderable(e.data.status));
	items.sort(
		(a, b) =>
			(b.data.updatedDate ?? b.data.pubDate).valueOf() -
			(a.data.updatedDate ?? a.data.pubDate).valueOf(),
	);

	return rss({
		title: 'CMP — Context Minimization Principle',
		description: 'Updates to the Context Minimization Principle online book (research chapters only).',
		site: context.site,
		items: items.map((entry) => {
			const p = parseCmpEntryId(entry.id);
			const link = p ? cmpChapterPath(p.part, p.slug) : '/research/cmp/';
			return {
				title: entry.data.title,
				description: entry.data.description,
				pubDate: entry.data.updatedDate ?? entry.data.pubDate,
				link,
			};
		}),
	});
}
