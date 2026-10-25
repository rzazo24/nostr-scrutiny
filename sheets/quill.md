# Quill — Nostr Scrutiny fact sheet

*Checked on 2026-10-25. Facts and sources only: no score, no verdict.*
*Disclosure: Quill is made by the same person who publishes Nostr Scrutiny. It goes through exactly the same checks as any other client.*

**What it is:** a text-first Nostr client that runs in the browser and can be installed as a web app (PWA). No App Store or Google Play listing. [quill.hivescope.xyz](https://quill.hivescope.xyz)

## Who is behind it

- Published by an individual, not a company: the GitHub account **rzazo24**, who also runs the relay `relay.hivescope.xyz`. [Repository](https://github.com/rzazo24/quill)
- There is no company and no terms of service. A privacy policy was published on 2026-10-24, after the first version of this sheet pointed out it had none; it gives the author's npub as the contact. [Privacy policy](https://quill.hivescope.xyz/privacy.html)
- No NIP-89 app announcement (kind 31990) was found for Quill on four large relays.

## Your keys

- Quill never asks for a private key (nsec). Reading only needs a public key (npub); the login form refuses an nsec. [Source code](https://github.com/rzazo24/quill)
- Writing goes through a remote signer (NIP-46: Amber, Primal, Clave or your own bunker) or, since 2026-10-25, a browser extension (NIP-07, such as Alby or nos2x). The signer or extension holds the key and signs; Quill checks each event against its own policy before asking, and checks what comes back. [In-app help](https://quill.hivescope.xyz/#/help)

## Code

- Open source, **MIT** licence. Last commit: 2026-10-25.
- No tagged releases. The site is deployed by its author from that repository; from the outside there is no way to prove that what the server sends is exactly a given commit.

## Privacy: what the policy says

The policy (dated 2026-10-25) says, among other things, that Quill never sees the private key; settings, drafts, saved notes and wallet connections stay in the browser; the web server keeps no access log; the picture proxy keeps small copies for 7 days and logs only the site of a picture that fails; the Pick of the day is made by Claude from public notes without data about the reader; and Quill sets no cookies and uses no analytics. It also says that relay.hivescope.xyz, one of the default relays, is run by the same person.

## Privacy: what the web app does

Opened as a first-time visitor, with nothing clicked, for 8 seconds:

- **No third-party scripts, trackers, analytics or cookies.** All requests went to `quill.hivescope.xyz` itself, and nothing was stored in the browser.
- **WebSocket connections to 7 Nostr relays:** relay.hivescope.xyz, relay.primal.net, relay.damus.io, nos.lol, nostr.mom, nostr.oxtr.dev, nostr.bitcoiner.social. These relays see the visitor's IP address and what is asked for.
- **Security headers:** a strict Content-Security-Policy (only its own scripts and styles), no referrer sent to other sites, and camera, microphone, location and payment turned off.

From its source code and server configuration (not visible to a visitor):

- **Profile pictures** of people you follow are off by default. When turned on, Quill's server fetches each picture and sends back a small copy, so the picture's site sees the server's address instead of yours. The server therefore sees which pictures are requested.
- **"Pick of the day":** a daily selection of notes chosen by an AI model (Claude) on the server, from public notes. The selection is a public file; the reader's own data is not sent to the AI.
- **The client tag:** notes and reactions written with Quill carry a public `["client","Quill"]` tag by default (NIP-89). It can be turned off in Settings.
- **Server logs:** the web server configuration has no access log set up. [Server config](https://github.com/rzazo24/quill/blob/main/deploy/quill.caddy.template)
- **Zaps:** a wallet connection (Nostr Wallet Connect) is kept only in the browser of the device.

## What could not be checked

- That the files served match the published source exactly (there are no reproducible builds or signed releases).
- What the operator's server does beyond the published configuration.

## Sources

- Repository: https://github.com/rzazo24/quill
- Web app: https://quill.hivescope.xyz
- Privacy policy: https://quill.hivescope.xyz/privacy.html (copy of 2026-10-25 in `data/quill/`)
- Collected data: `data/quill/2026-10-25.json` in the Nostr Scrutiny repository
