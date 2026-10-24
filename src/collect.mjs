// Collects what can be checked about one Nostr client and writes it, dated, to data/<client>/<YYYY-MM-DD>.json (and the privacy policy
// word for word next to it). A fact sheet is written from this file: every claim in it must point to something collected here.
//   node src/collect.mjs <client>        (the client's sources are in clients/<client>.json)
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import { chromium } from 'playwright'
import { appStore } from './sources/appstore.mjs'
import { play } from './sources/play.mjs'
import { github } from './sources/github.mjs'
import { web } from './sources/web.mjs'
import { policy } from './sources/policy.mjs'
import { nip89 } from './sources/nip89.mjs'

const id = process.argv[2]
if (!id || !/^[a-z0-9-]+$/.test(id)) { console.error('usage: node src/collect.mjs <client>'); process.exit(1) }
const cfg = JSON.parse(readFileSync(new URL(`../clients/${id}.json`, import.meta.url), 'utf8'))
const day = new Date().toISOString().slice(0, 10)
const out = { client: cfg.name, collected: new Date().toISOString(), config: cfg, errors: {} }

const step = async (name, fn) => { try { out[name] = await fn() } catch (e) { out.errors[name] = String(e?.message ?? e) } }
const browser = await chromium.launch()
try {
  await Promise.all([
    cfg.appStore ? step('appStore', () => appStore(cfg.appStore)) : null,
    cfg.repo ? step('github', () => github(cfg.repo)) : null,
    step('nip89', () => nip89(cfg.name, cfg.nip89Pubkey)),
  ])
  if (cfg.play) await step('play', () => play(browser, cfg.play))
  if (cfg.website) await step('web', () => web(browser, cfg.website))
  const policyUrl = cfg.privacyPolicy ?? out.play?.privacyPolicy
  if (policyUrl) await step('policy', () => policy(browser, policyUrl))
} finally { await browser.close() }

const dir = new URL(`../data/${id}/`, import.meta.url)
mkdirSync(dir, { recursive: true })
if (out.policy?.text) { writeFileSync(new URL(`${day}-privacy.txt`, dir), out.policy.text + '\n'); out.policy.text = `(see ${day}-privacy.txt)` }
writeFileSync(new URL(`${day}.json`, dir), JSON.stringify(out, null, 2) + '\n')
console.log(JSON.stringify({ client: cfg.name, wrote: `data/${id}/${day}.json`, errors: out.errors, thirdParty: out.web?.thirdParty?.map((h) => h.host), websockets: out.web?.websockets?.map((h) => h.host), github: out.github && { license: out.github.license, lastCommit: out.github.lastCommit }, appStore: out.appStore && { seller: out.appStore.seller, version: out.appStore.version }, play: out.play && { developer: out.play.developer, updated: out.play.updated }, nip89: out.nip89?.length }, null, 1))
