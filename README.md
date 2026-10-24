# Nostr Scrutiny

*Leer en español: [README.es.md](README.es.md)*

Fact sheets about Nostr clients: **who is behind them, what they do with your keys, their code and their privacy.** Facts and sources only: no scores, no verdicts. Inspired by [WalletScrutiny](https://walletscrutiny.com), which does this for Bitcoin wallets.

## How a sheet is made

1. `clients/<client>.json` lists where to look: the website, the App Store and Google Play ids, the repository, the privacy policy.
2. `npm run collect <client>` gathers what can be checked and writes it, dated, to `data/<client>/<date>.json` (the privacy policy is kept word for word next to it):
   - **App Store** (Apple's lookup API) and **Google Play** (the listing and its Data safety page): who publishes the app, contact details, what the developer declares about data;
   - **the repository**: licence, last commit, latest release;
   - **the web app**, opened in a real browser as a first-time visitor: other sites it talks to, the relays it connects to, cookies, storage and security headers;
   - **NIP-89**: the app's own announcement on Nostr, if any.
3. A person writes the sheet in `sheets/<client>.md` from that data and from the sources it links. Every claim points to a source; what could not be checked is said so.

## Run it

```bash
npm install
npx playwright install chromium   # once
npm run collect quill
```

## License

MIT
