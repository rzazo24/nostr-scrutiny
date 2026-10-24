// A privacy policy, kept word for word as it reads today (quotes in a fact sheet come from this copy), with its date if it states one.
export async function policy(browser, url) {
  const page = await browser.newPage({ locale: 'en-US' })
  try {
    const res = await page.goto(url, { waitUntil: 'load', timeout: 45000 })
    await page.waitForTimeout(4000) // apps that keep relays open never go network-idle: give the page time to draw the text
    const text = (await page.locator('body').innerText()).replace(/\n{3,}/g, '\n\n').trim()
    const date = (text.match(/(?:Last updated|Effective(?: date)?|Updated)[:\s]+([A-Z][a-z]+ \d{1,2}, \d{4}|\d{4}-\d{2}-\d{2})/i) ?? [])[1] ?? null
    return { source: url, status: res?.status() ?? null, stated: date, chars: text.length, text }
  } finally { await page.close() }
}
