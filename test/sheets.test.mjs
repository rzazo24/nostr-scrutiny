// Every sheet follows the method (METHOD.md): dated, the same sections, something said about what could not be checked, sources listed,
// and no street addresses or phone numbers repeated from the stores.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readdirSync, readFileSync, existsSync } from 'node:fs'

const dir = new URL('../sheets/', import.meta.url)
const sheets = readdirSync(dir).filter((f) => f.endsWith('.md'))

test('there are sheets, and each one has its client config and collected data', () => {
  assert.ok(sheets.length >= 1)
  for (const f of sheets) {
    const id = f.replace(/\.md$/, '')
    assert.ok(existsSync(new URL(`../clients/${id}.json`, import.meta.url)), `clients/${id}.json`)
    const date = readFileSync(new URL(f, dir), 'utf8').match(/Checked on (\d{4}-\d{2}-\d{2})/)?.[1]
    assert.ok(date, `${f}: "Checked on <date>"`)
    assert.ok(existsSync(new URL(`../data/${id}/${date}.json`, import.meta.url)), `${f}: data/${id}/${date}.json, the data it was written from`)
  }
})

for (const f of sheets) {
  test(`${f} follows the method`, () => {
    const md = readFileSync(new URL(f, dir), 'utf8')
    assert.match(md, /^# .+ — Nostr Scrutiny fact sheet$/m)
    assert.match(md, /Facts and sources only: no score, no verdict\./)
    assert.match(md, /^\*\*What it is:\*\* /m)
    for (const h of ['## Who is behind it', '## Your keys', '## Code', '## What could not be checked', '## Sources']) assert.ok(md.includes(`\n${h}\n`), `${f}: section "${h}"`)
    assert.match(md, /\]\(https?:\/\//, `${f}: links to its sources`)
    assert.doesNotMatch(md, /\b\d+ [A-Z][a-z]+ (St|Street|Ave|Avenue|Rd|Road)\b|\bAPT \d+|\+\d[\d\s().-]{7,}/, `${f}: no street address or phone number`)
  })
}
