// Place any global data in this file.
// You can import this data from anywhere in your site by using the `import` keyword.

export const SITE_TITLE = "Context Cost";
export const SITE_DESCRIPTION = "Insights on software engineering in the AI era.";

export const AUTHOR = {
	name: 'Leric Zhang',
	formalName: 'Lianghui Zhang',
	citationName: 'Lianghui Zhang (Leric Zhang)',
	bio: 'Software architect and independent researcher focused on software design for modification.',
	avatar: 'https://gravatar.com/avatar/f21db36d8141ef33ca88e79852872fb28cad4242979da17e97a8fd3e5e5f5a44',
	social: {
		github: 'https://github.com/leric',
		email: 'mailto:leric.zhang@gmail.com'
	}
};

export const AUTHOR_JSON_LD = {
	'@type': 'Person',
	name: AUTHOR.formalName,
	alternateName: AUTHOR.name,
	url: AUTHOR.social.github,
	sameAs: [AUTHOR.social.github],
};

/** Source repo for “Edit on GitHub” / discussions links */
export const SITE_REPO = {
	owner: 'leric',
	repo: 'leric.github.io',
	branch: 'master',
} as const;

export const CMP_RSS_PATH = '/research/cmp/rss.xml';

/** Canonical source repository for CMP chapters and the published web edition */
export const CMP_SOURCE_REPO = 'https://github.com/leric/leric.github.io';

/** Fixed, citable CMP preprint edition */
export const CMP_PUBLICATION = {
	version: 'v1.0.1',
	doi: '10.5281/zenodo.21331759',
	url: 'https://doi.org/10.5281/zenodo.21331759',
} as const;

/** Airic project site — switch to https://airic.dev when the dedicated site launches */
export const AIRIC_URL = 'https://www.airic.dev';

export function githubEditUrl(relativePathFromRepoRoot: string) {
	const clean = relativePathFromRepoRoot.replace(/^\/+/, '');
	return `https://github.com/${SITE_REPO.owner}/${SITE_REPO.repo}/edit/${SITE_REPO.branch}/${clean}`;
}

export function cmpDiscussUrl() {
	return `https://github.com/${SITE_REPO.owner}/${SITE_REPO.repo}/discussions`;
}
