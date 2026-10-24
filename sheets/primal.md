# Primal — Nostr Scrutiny fact sheet

*Checked on 2026-10-24. Facts and sources only: no score, no verdict.*

**What it is:** a Nostr client for the web, iPhone and Android, with a hosted wallet and a paid "Premium" tier. [primal.net](https://primal.net)

## Who is behind it

- **App Store:** sold by **Primal Systems Incorporated.**, version 3.5.65 of 2026-10-20. [App Store](https://apps.apple.com/us/app/primal/id1673134518)
- **Google Play:** developer **Primal Systems Inc**, contact support@primal.net, updated 2026-10-19. [Google Play](https://play.google.com/store/apps/details?id=net.primal.android)
- **Privacy policy:** Primal Systems Inc. and its affiliates; the website gives Doral, Florida (US). The hosted wallet is offered "in partnership with our affiliate Zap Solutions, Inc. ("Strike")". [Privacy policy](https://primal.net/privacy)
- No NIP-89 app announcement (kind 31990) was found for Primal on four large relays.

## Your keys

From its source code:

- **Web app:** login with a browser extension (NIP-07) or a remote signer (NIP-46) is supported. [Web repository](https://github.com/PrimalHQ/primal-web-app)
- **Android app:** login with Amber (NIP-55) is supported, and the code includes a remote-signer component. [Android repository](https://github.com/PrimalHQ/primal-android-app)

## Code

- Open source, **MIT** licence, in three repositories: web (last commit 2026-08-13), Android (last push 2026-10-19) and iOS (last push 2026-10-19). No tagged releases.
- The Android and iOS repositories were updated the same days as the store versions; the code alone does not prove which commit each build comes from.

## Privacy: what the policy says

The policy is dated **February 21, 2024**. Among other things:

- "Primal doesn't monetize your personal information", with no advertising and no sale of personal information.
- The mobile apps collect no data beyond what is published to Nostr and the optional hosted wallet.
- **Hosted wallet:** Primal collects "the minimum amount of personal information required by law" and must share it with Strike.

## Privacy: what the stores say

- **Google Play, "Data safety":** no data shared with third parties; data collected: **photos and videos**, and **name, email address and user IDs**; data encrypted in transit; deletion can be requested.

## Privacy: what the web app does

Opened as a first-time visitor, with nothing clicked, for 8 seconds:

- **One WebSocket connection, to `cache2.primal.net`:** the web app reads Nostr through Primal's own caching service, not directly from relays. That service sees what is asked for and the visitor's IP address.
- **The browser contacted 35 other sites**, nearly all of them hosting the pictures and videos in the feed (for example `pbs.twimg.com`, `i.nostr.build`, `primaldata.s3.us-east-005.backblazeb2.com`). Each of these sites receives the visitor's IP address.
- No cookies, 3 entries in the browser's storage, and no security headers such as a Content-Security-Policy.
- **Android app:** uses Firebase Cloud Messaging (Google) for push notifications, according to its code.

## Where the sources differ

- Google Play lists photos, videos, name, email and user IDs as collected; the policy says the mobile apps collect nothing beyond what is published to Nostr and the hosted wallet. The policy is two and a half years older than the current apps.

## What could not be checked

- Which commits the store versions were built from.
- What `cache2.primal.net` keeps about requests and for how long (the policy does not mention the caching service).
- The App Store privacy label (Apple's API does not return it).

## Sources

- App Store: https://apps.apple.com/us/app/primal/id1673134518
- Google Play: https://play.google.com/store/apps/details?id=net.primal.android (and its Data safety page)
- Repositories: https://github.com/PrimalHQ/primal-web-app, https://github.com/PrimalHQ/primal-android-app, https://github.com/PrimalHQ/primal-ios-app
- Privacy policy: https://primal.net/privacy (copy of 2026-10-24 in `data/primal/`)
- Collected data: `data/primal/2026-10-24.json` in the Nostr Scrutiny repository
