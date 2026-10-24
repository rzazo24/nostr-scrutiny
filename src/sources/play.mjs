// Google Play: the listing and its "Data safety" page, read as text in a real browser (the pages are built by script).
// Only facts as the store shows them: who the developer is, their contact details, and what the developer declares about data.
const lines = (t) => t.split('\n').map((l) => l.trim()).filter(Boolean)

export async function play(browser, id) {
  const page = await browser.newPage({ locale: 'en-US' })
  try {
    const listing = `https://play.google.com/store/apps/details?id=${encodeURIComponent(id)}&hl=en&gl=us`
    const res = await page.goto(listing, { waitUntil: 'networkidle', timeout: 45000 })
    if (!res || res.status() >= 400) return { found: false, source: listing }
    const text = lines(await page.locator('body').innerText())
    const after = (label, n = 1) => { const i = text.findIndex((l) => l === label); return i >= 0 ? text.slice(i + 1, i + 1 + n) : [] }
    const html = await page.content()
    const developerName = (html.match(/"author":\s*\{[^}]*"name":\s*"([^"]+)"/) ?? [])[1] ?? null
    const out = {
      found: true,
      source: listing,
      name: text[0] ?? null,
      developer: developerName,
      updated: after('Updated on')[0] ?? null,
      email: text.find((l) => /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i.test(l)) ?? null,
      address: after('Address', 3).join(', ') || null,
      website: (html.match(/href="(https?:\/\/[^"]+)"[^>]*>\s*(?:<[^>]+>\s*)*Website/) ?? [])[1] ?? null,
      privacyPolicy: (html.match(/href="(https?:\/\/[^"]+)"[^>]*>\s*(?:<[^>]+>\s*)*Privacy [Pp]olicy/) ?? [])[1] ?? null,
    }
    const safety = `https://play.google.com/store/apps/datasafety?id=${encodeURIComponent(id)}&hl=en&gl=us`
    await page.goto(safety, { waitUntil: 'networkidle', timeout: 45000 })
    const s = lines(await page.locator('body').innerText())
    const from = s.findIndex((l) => /^Data shared$/i.test(l)), to = s.findIndex((l) => /^Security practices$/i.test(l))
    out.dataSafety = { source: safety, text: s.slice(from >= 0 ? from : 0, to > from ? to + 8 : from + 40) }
    return out
  } finally { await page.close() }
}
