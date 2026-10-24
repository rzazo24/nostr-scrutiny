// The web app, opened in a real browser as a first-time visitor: which other sites it makes the browser talk to, what it stores, and the
// security headers of the page. Nothing is clicked and no account is used: this is what anyone gets just by opening it.
const site = (host) => host.split('.').slice(-2).join('.') // good enough to tell "this site" from "someone else" for the hosts we meet

export async function web(browser, url, waitMs = 8000) {
  const ctx = await browser.newContext({ locale: 'en-US' })
  const page = await ctx.newPage()
  const hosts = new Map()
  const sockets = new Set()
  page.on('websocket', (ws) => { try { sockets.add(new URL(ws.url()).host) } catch { /* not a URL */ } }) // relays: WebSockets are not 'requests'
  page.on('request', (r) => { try { const u = new URL(r.url()); if (u.protocol.startsWith('http') || u.protocol.startsWith('ws')) hosts.set(u.host, (hosts.get(u.host) ?? 0) + 1) } catch { /* data: and the like */ } })
  try {
    const res = await page.goto(url, { waitUntil: 'load', timeout: 45000 })
    await page.waitForTimeout(waitMs) // let it open its relays and whatever else it loads on its own
    const own = site(new URL(page.url()).host)
    const headers = res ? await res.allHeaders() : {}
    const cookies = await ctx.cookies()
    const storage = await page.evaluate(() => Object.keys(localStorage))
    const all = [...hosts].map(([host, n]) => ({ host, requests: n, thirdParty: site(host) !== own }))
    return {
      source: url,
      finalUrl: page.url(),
      title: await page.title(),
      thirdParty: all.filter((h) => h.thirdParty).sort((a, b) => a.host.localeCompare(b.host)),
      websockets: [...sockets].sort().map((host) => ({ host, thirdParty: site(host) !== own })), // the relays it connects to on its own
      firstPartyHosts: all.filter((h) => !h.thirdParty).map((h) => h.host).sort(),
      cookies: cookies.map((c) => ({ name: c.name, domain: c.domain, thirdParty: site(c.domain.replace(/^\./, '')) !== own })),
      localStorageKeys: storage.sort(),
      headers: Object.fromEntries(['content-security-policy', 'strict-transport-security', 'referrer-policy', 'permissions-policy', 'x-frame-options'].map((h) => [h, headers[h] ?? null])),
    }
  } finally { await ctx.close() }
}
