# Nostr Scrutiny

*Leer en español: [README.es.md](README.es.md)*

**Live: https://scrutiny.hivescope.xyz**

Fact sheets about Nostr clients: **who is behind them, what they do with your keys, their code and their privacy.** Facts and sources only: no scores, no verdicts. Inspired by [WalletScrutiny](https://walletscrutiny.com), which does this for Bitcoin wallets.

Each sheet puts side by side what the app stores say, what the privacy policy says, what the published code shows and what the app does when opened in a browser, and says where they disagree. How it is done, and what is not checked yet: [METHOD.md](METHOD.md).

## Sheets

| Client | Checked |
| --- | --- |
| [Amethyst](sheets/amethyst.md) | 2026-10-24 |
| [Damus](sheets/damus.md) | 2026-10-24 |
| [Nostrich](sheets/nostrich.md) | 2026-10-24 |
| [Primal](sheets/primal.md) | 2026-10-24 |
| [Quill](sheets/quill.md) | 2026-10-24 |

Disclosure: Quill is made by the author of Nostr Scrutiny; it goes through the same checks.

## How a sheet is made

1. `clients/<client>.json` lists where to look: the website, the App Store and Google Play ids, the repository, the privacy policy.
2. `npm run collect <client>` gathers what can be checked and writes it, dated, to `data/<client>/<date>.json` (the privacy policy is kept word for word next to it):
   - **App Store** (Apple's lookup API) and **Google Play** (the listing and its Data safety page): who publishes the app, contact details, what the developer declares about data;
   - **the repository**: licence, last commit, latest release;
   - **the web app**, opened in a real browser as a first-time visitor: other sites it talks to, the relays it connects to, cookies, storage and security headers;
   - **NIP-89**: the app's own announcement on Nostr, if any.
3. A person reads the published code for what the collectors cannot judge (key storage, signers, analytics) and writes the sheet in `sheets/<client>.md`. Every claim points to a source; what could not be checked is said so.

Adding a client: [CONTRIBUTING.md](CONTRIBUTING.md). Something wrong or out of date: open an issue with the source that shows it.

## Run it

```bash
npm install
npx playwright install chromium   # once, for the collectors
npm run collect quill             # gather data for one client
npm test                          # sheets follow the method; the site builds clean
npm run build                     # the site, in site/
./scripts/deploy.sh <path-to-relay-repo> scrutiny.hivescope.xyz   # publish through the relay's Caddy
```

The site is plain HTML and one stylesheet: no scripts, no cookies and nothing loaded from other sites, served with a strict Content-Security-Policy.

## Layout

| Path | What |
| --- | --- |
| `clients/` | where to look, per client |
| `src/collect.mjs`, `src/sources/` | the collectors (App Store, Google Play, GitHub, web app, privacy policy, NIP-89) |
| `data/` | what was collected, dated |
| `sheets/` | the fact sheets |
| `scripts/build.mjs`, `web/` | the static site |
| `deploy/`, `scripts/deploy.sh` | publishing through the relay's Caddy |

## License

MIT
