// Builds the static site in site/: an index of the fact sheets and one page per sheet, from sheets/*.md. Plain HTML and one stylesheet:
// no scripts, no fonts, nothing loaded from anywhere else (the site practises what the sheets look for).
import { readFileSync, writeFileSync, mkdirSync, readdirSync, copyFileSync, rmSync } from 'node:fs'
import { marked } from 'marked'

const out = new URL('../site/', import.meta.url)
rmSync(out, { recursive: true, force: true }); mkdirSync(out, { recursive: true })
copyFileSync(new URL('../web/style.css', import.meta.url), new URL('style.css', out))
copyFileSync(new URL('../web/icon.svg', import.meta.url), new URL('icon.svg', out))

const esc = (s) => s.replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c])
const page = (title, body, description) => `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title><meta name="description" content="${esc(description)}">
<link rel="icon" href="/icon.svg" type="image/svg+xml"><link rel="stylesheet" href="/style.css"></head>
<body><header><a class="brand" href="/"><img src="/icon.svg" alt="" width="28" height="28"> Nostr Scrutiny</a></header>
<main>${body}</main>
<footer><p>Facts and sources only: no scores, no verdicts. Every claim links to where it comes from; what could not be checked is said so.</p>
<p>Inspired by <a href="https://walletscrutiny.com">WalletScrutiny</a>. Method, collectors and collected data: <a href="https://github.com/rzazo24/nostr-scrutiny">source code</a>.</p></footer>
</body></html>
`

const sheets = readdirSync(new URL('../sheets/', import.meta.url)).filter((f) => f.endsWith('.md')).sort()
const rows = []
for (const f of sheets) {
  const md = readFileSync(new URL(`../sheets/${f}`, import.meta.url), 'utf8')
  const id = f.replace(/\.md$/, '')
  const name = md.match(/^# (.+?) — /m)?.[1] ?? id
  const checked = md.match(/Checked on (\d{4}-\d{2}-\d{2})/)?.[1] ?? ''
  const what = (md.match(/^\*\*What it is:\*\* (.+)$/m)?.[1] ?? '').replace(/\[([^\]]+)\]\([^)]+\)/g, '').replace(/\s+\.?\s*$/, '').trim()
  const html = marked.parse(md).replace(/<a href="http/g, '<a rel="noopener noreferrer" href="http')
  writeFileSync(new URL(`${id}.html`, out), page(`${name} — Nostr Scrutiny`, `<article>${html}</article><p class="back"><a href="/">← All clients</a></p>`, `Fact sheet about the Nostr client ${name}: who is behind it, keys, code and privacy.`))
  rows.push({ id, name, checked, what: what.charAt(0).toUpperCase() + what.slice(1) })
}

const intro = `<h1>Nostr Scrutiny</h1>
<p class="lead">Fact sheets about Nostr clients: <strong>who is behind them, what they do with your keys, their code and their privacy.</strong></p>
<p>Each sheet puts side by side what the app stores say, what the privacy policy says, what the published code shows and what the app actually does when opened in a browser. Where these disagree, the sheet says so. Facts and sources only: no scores and no verdicts, so you can judge for yourself.</p>
<p>Disclosure: Quill is made by the same person who publishes these sheets, and it goes through exactly the same checks.</p>`
const list = `<h2>Clients</h2><ul class="clients">${rows.map((r) => `<li><a href="/${r.id}.html"><strong>${esc(r.name)}</strong><span>${esc(r.what)}</span><small>Checked ${esc(r.checked)}</small></a></li>`).join('')}</ul>`
writeFileSync(new URL('index.html', out), page('Nostr Scrutiny', intro + list, 'Fact sheets about Nostr clients: who is behind them, what they do with your keys, their code and their privacy. Facts and sources only.'))
console.log(`site/: index + ${rows.length} sheets`)
