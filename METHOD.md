# How Nostr Scrutiny checks a client

*Leer en español: [METHOD.es.md](METHOD.es.md)*

## Principles

- **Facts and sources only.** A sheet says what a source shows, and links to it. No scores, no ratings, no verdicts: readers judge for themselves.
- **Every claim points to a source:** an app store listing, a privacy policy, a line of published code, or what the app did when opened in a browser. Collected data is kept in `data/`, dated, so a claim can be traced back.
- **What could not be checked is said so**, in its own section of every sheet.
- **Where sources disagree, both are quoted**, side by side, without guessing why beyond what the sources themselves say.
- **No personal details are repeated.** Store listings sometimes show a home address or a phone number; a sheet names the entity and the city, never a street or a number.
- **Disclosure.** The author of Nostr Scrutiny also makes the Quill client. Quill goes through exactly the same checks and its sheet says so first.
- **Dated.** Apps change; every sheet says when it was checked, and is checked again from time to time.

## What is checked

1. **Who is behind it:** the seller or developer named by the App Store and Google Play, the operator named in the privacy policy, the developer's own statements, and the app's NIP-89 announcement on Nostr (kind 31990), if any.
2. **Your keys:** where the app keeps a private key, and whether it can sign without holding it (remote signers, NIP-46; Android signer apps, NIP-55; browser extensions, NIP-07). From the policy and the published code.
3. **Code:** licence, last commit and latest release of the published repository, compared with the dates of the versions in the stores.
4. **Privacy, as stated:** the privacy policy (kept word for word as of the check) and the stores' privacy labels (Google Play's "Data safety").
5. **Privacy, as observed:** the web app (or the website, for apps without one) opened in a real browser as a first-time visitor, with nothing clicked, for 8 seconds: which other sites the browser contacts, which relays or services it connects to, cookies, storage and security headers. For apps, the published code is searched for analytics, crash reporting and push-notification libraries.

## What is not checked (yet)

- Whether a store build matches the published code (reproducible builds).
- Network traffic of the native apps once installed.
- Apple's App Store privacy labels (not available through Apple's public API).

## Corrections

If a sheet is wrong or out of date, open an issue in this repository with the source that shows it, or reply on Nostr to the note that published the sheet. Corrections are made by checking the source, and the sheet is dated again.
