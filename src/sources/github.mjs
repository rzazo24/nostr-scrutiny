// The public repository: licence, when it was last changed, and its latest release, from GitHub's API (unauthenticated, 60 calls an hour).
const api = async (path) => { const r = await fetch(`https://api.github.com/${path}`, { headers: { accept: 'application/vnd.github+json' } }); return r.ok ? r.json() : null }

export async function github(repo) {
  const r = await api(`repos/${repo}`)
  if (!r) return { found: false, source: `https://github.com/${repo}` }
  const [release, commits] = await Promise.all([api(`repos/${repo}/releases/latest`), api(`repos/${repo}/commits?per_page=1&sha=${encodeURIComponent(r.default_branch)}`)])
  return {
    found: true,
    source: r.html_url,
    license: r.license?.spdx_id ?? null,
    archived: r.archived,
    created: r.created_at,
    lastPush: r.pushed_at,
    lastCommit: commits?.[0]?.commit?.committer?.date ?? null,
    latestRelease: release ? { tag: release.tag_name, date: release.published_at, url: release.html_url } : null,
    stars: r.stargazers_count,
  }
}
