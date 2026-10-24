// Google Play: the listing and its "Data safety" page, read as text in a real browser (the pages are built by script).
// Only facts as the store shows them: who the developer is, their contact details, and what the developer declares about data.
// "About the developer" (hidden behind a toggle, so read from the HTML): the legal name, email, postal address and phone the store shows.
// Kept in the collected data as published; a fact sheet names the entity and the city, never a street or a phone number.
function aboutDeveloper(html) {
  const block = html.split('About the developer</div>')[1]?.split('</div></div>')[0] ?? ''
  const parts = [...block.matchAll(/<div[^>]*>([^<]+)<\/div>/g)].map((m) => m[1].replace(/\\n/g, '\n').trim()).filter(Boolean)
  return {
    legalName: parts[0] ?? null,
    email: parts.find((x) => /^[^\s@]+@[^\s@]+$/.test(x)) ?? null,
    address: parts.find((x) => x.includes('\n')) ?? null,
    phone: parts.find((x) => /^\+?[\d\s().-]{7,}$/.test(x)) ?? null,
  }
}
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
      ...aboutDeveloper(html),
      // the developer's own policy link (the page also links to Google's own privacy page, which is not it)
      privacyPolicy: [...html.matchAll(/href="(https?:\/\/[^"]+)"/g)].map((m) => m[1]).find((u) => /privacy/i.test(u) && !/(^|\.)google\.com\//.test(new URL(u).host + '/')) ?? null,
    }
    const safety = `https://play.google.com/store/apps/datasafety?id=${encodeURIComponent(id)}&hl=en&gl=us`
    await page.goto(safety, { waitUntil: 'networkidle', timeout: 45000 })
    const s = lines(await page.locator('body').innerText())
    const from = s.findIndex((l) => /^Data shared$/i.test(l)), to = s.findIndex((l) => /^Security practices$/i.test(l))
    out.dataSafety = { source: safety, text: s.slice(from >= 0 ? from : 0, to > from ? to + 8 : from + 40) }
    return out
  } finally { await page.close() }
}
