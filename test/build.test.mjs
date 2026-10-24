// The site practises what the sheets look for: no scripts, nothing loaded from other sites, external links without a referrer.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { execFileSync } from 'node:child_process'
import { readdirSync, readFileSync } from 'node:fs'

test('the site builds: an index that lists every sheet, and one page per sheet', () => {
  execFileSync('node', ['scripts/build.mjs'], { cwd: new URL('..', import.meta.url) })
  const site = new URL('../site/', import.meta.url)
  const sheets = readdirSync(new URL('../sheets/', import.meta.url)).filter((f) => f.endsWith('.md')).map((f) => f.replace(/\.md$/, ''))
  const index = readFileSync(new URL('index.html', site), 'utf8')
  for (const id of sheets) {
    assert.ok(index.includes(`href="/${id}.html"`), `index links to ${id}`)
    readFileSync(new URL(`${id}.html`, site), 'utf8')
  }
  for (const f of readdirSync(site).filter((x) => x.endsWith('.html'))) {
    const html = readFileSync(new URL(f, site), 'utf8')
    assert.doesNotMatch(html, /<script/i, `${f}: no scripts`)
    assert.doesNotMatch(html, /<(link|img|iframe)[^>]+(src|href)="https?:/i, `${f}: nothing loaded from other sites`)
    for (const a of html.match(/<a [^>]*href="https?:[^>]*>/g) ?? []) assert.match(a, /rel="noopener noreferrer"/, `${f}: ${a}`)
  }
})
