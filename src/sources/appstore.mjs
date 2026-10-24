// App Store: Apple's public lookup API (no scraping). What it says about who publishes the app and its current version.
export async function appStore(id, country = 'us') {
  const r = await fetch(`https://itunes.apple.com/lookup?id=${encodeURIComponent(id)}&country=${country}`)
  const j = await r.json()
  const a = j.results?.[0]
  if (!a) return { found: false, source: `https://apps.apple.com/${country}/app/id${id}` }
  return {
    found: true,
    source: a.trackViewUrl,
    name: a.trackName,
    seller: a.sellerName, // the legal entity that sells it
    developer: a.artistName,
    sellerUrl: a.sellerUrl ?? null,
    version: a.version,
    versionDate: a.currentVersionReleaseDate,
    firstRelease: a.releaseDate,
    rating: a.averageUserRating ?? null,
    ratings: a.userRatingCount ?? null,
  }
}
