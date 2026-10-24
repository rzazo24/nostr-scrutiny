// NIP-89: the app's own announcement on Nostr (kind 31990), if it publishes one: which key speaks for the app, and what it says it handles.
import WebSocket from 'ws'
import { useWebSocketImplementation, SimplePool } from 'nostr-tools/pool'
import { verifyEvent } from 'nostr-tools'
useWebSocketImplementation(WebSocket)

const RELAYS = ['wss://relay.primal.net', 'wss://nos.lol', 'wss://relay.damus.io', 'wss://nostr.mom']

export async function nip89(name, pubkey) {
  const pool = new SimplePool()
  try {
    const filter = pubkey ? { kinds: [31990], authors: [pubkey] } : { kinds: [31990], limit: 2000 }
    const events = (await pool.querySync(RELAYS, filter, { maxWait: 8000 })).filter((e) => verifyEvent(e))
    const meta = (e) => { try { return JSON.parse(e.content) } catch { return {} } }
    const mine = events.filter((e) => pubkey || String(meta(e).name ?? meta(e).display_name ?? '').toLowerCase() === name.toLowerCase())
    return mine.map((e) => ({ id: e.id, pubkey: e.pubkey, created: new Date(e.created_at * 1000).toISOString(), name: meta(e).name ?? null, website: meta(e).website ?? null, handles: e.tags.filter((t) => t[0] === 'k').map((t) => t[1]), platforms: e.tags.filter((t) => ['web', 'ios', 'android'].includes(t[0])).map((t) => t[0]) }))
  } finally { pool.close(RELAYS) }
}
