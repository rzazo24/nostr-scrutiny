# Ditto — Nostr Scrutiny fact sheet

*Checked on 2026-11-22. Facts and sources only: no score, no verdict.*

**What it is:** a Nostr client for iPhone, Android and the web (ditto.pub), from the team behind Soapbox, with its own relay, **relay.ditto.pub**, and extras (themes, badges, "Blobbi", widgets). relay.ditto.pub was in 5.3% of the relay lists updated between 12 and 19 November 2026 in a count of 15,453 accounts. [ditto.pub](https://ditto.pub), [about.ditto.pub](https://about.ditto.pub)

## Who is behind it

- **Soapbox Technology LLC**, the seller on the App Store and the developer and legal name on Google Play. The privacy policy names no company and points to soapbox.pub for contact. [Privacy policy](https://ditto.pub/privacy)
- **Distribution:** App Store (version 2.46.5 of 2026-11-20, first released 2026-04-15, 4.8 stars from 26 ratings), Google Play (updated 2026-11-20) and the web app.
- No NIP-89 app announcement (kind 31990) was found on four large relays.

## Your keys

- **Policy:** with a browser extension (NIP-07) or another external signer, "your private key is managed by the signer and is never accessed or stored by Ditto"; it recommends an extension or a hardware signer.
- **Code:** a pasted private key (nsec) is kept in the **iOS Keychain or Android KeyStore** in the apps, but **in the browser's localStorage, unencrypted, on the web**. Amber and other signers are supported on Android. [secureStorage.ts](https://gitlab.com/soapbox-pub/ditto/-/blob/a32223eb/src/lib/secureStorage.ts)

## Code

- Open source, **AGPL-3.0**, on **GitLab** (not GitHub): one repository for the web app and the iPhone and Android apps (built with Capacitor). Last commit and release `v2.46.5` on 2026-11-20. [gitlab.com/soapbox-pub/ditto](https://gitlab.com/soapbox-pub/ditto)
- **No security audit was found.**

## Privacy: what the policy says

The policy (dated **2026-03-18**) is short and written for the web app ("stored locally in your browser"). Among other things: Ditto "is designed to minimize data collection"; "**Ditto itself contains no analytics or tracking scripts**"; the web hosting gateway sees each page opened, the IP address and browser information; third parties are relays, Blossom servers, Lightning/NWC and NIP-05 providers. It also says "**Ditto does not operate these relays**".

## Privacy: what the stores say

- **Google Play, "Data safety":** no data shared; data collected: **crash logs** and **app interactions**; encrypted in transit; deletion can be requested.

## Privacy: what the code shows

- **Ditto's relays are built in.** For an account without a relay list, the defaults are relay.ditto.pub and relay.dreamith.to (read and write) plus relay.primal.net and relay.damus.io (write). **Search, trending and streaming queries go to relay.ditto.pub and relay.dreamith.to** whatever the user's own relays. [appRelays.ts](https://gitlab.com/soapbox-pub/ditto/-/blob/a32223eb/src/lib/appRelays.ts)
- **Crash reporting with Sentry** is in the code and **switched on by default**, but only works when a Sentry address is built in. The web app at ditto.pub was built without one (checked in its served code on 2026-11-22), so it sends none; whether the store apps have one cannot be seen from the source. Secrets are filtered out before sending, and the setting can be changed in Advanced settings. [sentry.ts](https://gitlab.com/soapbox-pub/ditto/-/blob/a32223eb/src/lib/sentry.ts), [App.tsx](https://gitlab.com/soapbox-pub/ditto/-/blob/a32223eb/src/App.tsx)
- **Push notifications** go through a "nostr-push" service over NIP-44-encrypted Nostr events, from a throwaway key generated for the device, so the user's signer is not involved; the service receives which events to notify about. [nostrPush.ts](https://gitlab.com/soapbox-pub/ditto/-/blob/a32223eb/src/lib/nostrPush.ts)

## Privacy: what the website does

Opened as a first-time visitor (ditto.pub, the web app), with nothing clicked, for 8 seconds:

- **WebSocket connections to 2 relays:** relay.ditto.pub and relay.dreamith.to.
- **19 other sites contacted** to draw the home page: pictures from Primal, nostr.build, Blossom servers, Divine and others, a Wikipedia widget (Wikipedia, Wikimedia and Wikidata), GitHub and personal sites.
- **Three cookies set by Wikimedia**, none by Ditto. In browser storage: login, feed snapshots and push keys.
- **Security headers:** a strict Content-Security-Policy; no HSTS, referrer policy or framing protection.

## Where the sources differ

- **Relays:** the policy says Ditto does not operate the relays; the app's default and search relay, relay.ditto.pub, is Ditto's own.
- **Analytics and crashes:** the policy says there are no analytics or tracking scripts; Google Play declares crash logs and app interactions collected, and the code has Sentry crash reporting switched on wherever a Sentry address is built in.

## What could not be checked

- Whether the App Store and Google Play builds carry a Sentry address, and where crash reports go.
- What relay.ditto.pub and the push service keep.
- Which commit each store build was made from.
- The iPhone privacy label, and the app's behaviour after signing in (it was not installed).

## Sources

- Website and policy: https://ditto.pub, https://ditto.pub/privacy (copy of 2026-11-22 in `data/ditto/`), https://about.ditto.pub
- App Store: https://apps.apple.com/app/id6761851821
- Google Play: https://play.google.com/store/apps/details?id=pub.ditto.app (and its Data safety page)
- Repository: https://gitlab.com/soapbox-pub/ditto (commit `a32223eb`: `src/lib/appRelays.ts`, `src/lib/secureStorage.ts`, `src/lib/sentry.ts`, `src/components/SentryProvider.tsx`, `src/App.tsx`, `src/lib/nostrPush.ts`, `package.json`, `LICENSE`)
- Served web code of ditto.pub on 2026-11-22 (`/assets/index-BnnyM71a.js`: empty Sentry address)
- Relay-list count of 2026-11-19 (NIP-65 lists on purplepag.es), published on Nostr
- Collected data: `data/ditto/2026-11-22.json` in the Nostr Scrutiny repository
