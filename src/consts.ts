// Place any global data in this file.
// You can import this data from anywhere in your site by using the `import` keyword.

export const SITE_TITLE = "Context Cost";
export const SITE_DESCRIPTION = "Insights on software engineering in the AI era.";

export const AUTHOR = {
	name: 'Leric Zhang',
	bio: 'Software architect and independent researcher focused on software design for modification.',
	avatar: 'https://gravatar.com/avatar/f21db36d8141ef33ca88e79852872fb28cad4242979da17e97a8fd3e5e5f5a44',
	social: {
		github: 'https://github.com/leric',
		email: 'mailto:leric.zhang@gmail.com'
	}
};

/** Source repo for “Edit on GitHub” / discussions links */
export const SITE_REPO = {
	owner: 'leric',
	repo: 'leric.github.io',
	branch: 'main',
} as const;

export const CMP_RSS_PATH = '/research/cmp/rss.xml';

/** Primary CMP paper / research source repository */
export const CMP_SOURCE_REPO = 'https://github.com/leric/cmp';

export function githubEditUrl(relativePathFromRepoRoot: string) {
	const clean = relativePathFromRepoRoot.replace(/^\/+/, '');
	return `https://github.com/${SITE_REPO.owner}/${SITE_REPO.repo}/edit/${SITE_REPO.branch}/${clean}`;
}

export function cmpDiscussUrl() {
	return `https://github.com/${SITE_REPO.owner}/${SITE_REPO.repo}/discussions`;
}
