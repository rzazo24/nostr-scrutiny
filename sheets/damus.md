# Damus — Nostr Scrutiny fact sheet

*Checked on 2026-10-24. Facts and sources only: no score, no verdict.*

**What it is:** a Nostr client for iPhone, iPad and Mac. There is no web client: damus.io is its website. [damus.io](https://damus.io)

## Who is behind it

- **App Store:** sold by **Damus Nostr, Inc**. Current version 1.17, of 2026-06-03. [App Store](https://apps.apple.com/us/app/damus/id1628663131)
- No Google Play listing.
- No NIP-89 app announcement (kind 31990) was found for Damus on four large relays.

## Your keys

From its source code (latest commit, 2026-09-09):

- The key is kept in the iOS Keychain.
- No support for remote signers (NIP-46) or external signer apps was found in the code: the private key is entered in the app.

## Code

- Open source, **GPL-3.0** licence. Last commit: 2026-09-09. No tagged releases on GitHub. [Repository](https://github.com/damus-io/damus)
- The current App Store version (1.17) is older than the last commit; the code alone does not show which commit it was built from.

## Privacy

- **Privacy policy:** one sentence: "Damus doesn't store any information about you other than the posts which you make, which are published to the damus relay as well other relays if configured." No date. [Privacy policy](https://damus.io/privacy-policy.txt)
- **Error reports:** the app includes Sentry for error and diagnostics reporting, behind a setting ("Enable Error & Diagnostics Reporting") that is **off by default**. The privacy policy does not mention it.
- **The website** (not the app), opened as a first-time visitor, loads Cloudflare's analytics script (`static.cloudflareinsights.com`) and a form from `tally.so`. It sets no cookies and sends no security headers such as a Content-Security-Policy.

## What could not be checked

- Which commit the App Store version was built from.
- The App Store privacy label (Apple's API does not return it).
- What the Damus relay keeps, beyond the policy's one sentence.

## Sources

- App Store: https://apps.apple.com/us/app/damus/id1628663131
- Repository: https://github.com/damus-io/damus (settings: `damus/Features/Settings/Models/GlobalSettingsStore.swift`, `enable_sentry_telemetry`, default `false`)
- Privacy policy: https://damus.io/privacy-policy.txt
- Collected data: `data/damus/2026-10-24.json` in the Nostr Scrutiny repository
