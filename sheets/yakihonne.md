# YakiHonne — Nostr Scrutiny fact sheet

*Checked on 2026-11-19. Facts and sources only: no score, no verdict.*

**What it is:** a Nostr client for iPhone, Android and the web, built around long-form articles as well as notes, videos, curations, "smart widgets", private messages and a wallet (Cashu and Nostr Wallet Connect). It has paid plans and in-app "Yaki Points". [yakihonne.com](https://yakihonne.com)

## Who is behind it

- **Three different names, depending on where you look:**
  - the privacy policy on the website names **Yakihonne LLC**, in Wyoming (United States); [Privacy policy](https://yakihonne.com/privacy)
  - the App Store seller is **JUSTHONNE TECHNOLOGY SDN. BHD.**, a Malaysian company, and the developer is "JustHonne Technologies";
  - on Google Play the developer is "JustHonne Technologies", and the legal name in the listing is a private individual's, with an address in Malaysia. Contact: dev@yakihonne.com.
- **Distribution:** App Store (version 2.1.1 of 2026-11-01, first released 2023-11-30) and Google Play (updated 2026-11-01); the web app at yakihonne.com.
- A NIP-89 app announcement (kind 31990) was found, published 2025-10-23, for the web, Android and iOS.

## Your keys

- **Code (mobile):** keys are kept with `flutter_secure_storage` (the iOS Keychain or Android's encrypted storage). Remote signers and Amber are supported. [localdatabase_repository.dart](https://github.com/YakiHonne/mobile-app/blob/d34dc8d/lib/repositories/localdatabase_repository.dart)
- **Signing in with Google ("Pomegranate"):** the app offers an account tied to a Google login, using fiatjaf's Pomegranate protocol. The Nostr key is **split into shares held by independent servers** ("operators"), and a central server runs the Google login and gives the app a NIP-46 bunker. By default the central is `auth.njump.me` (with `auth.yakihonne.com` as the backup), the shares go to three operators (`po.yakihonne.com`, `po.jumble.social`, `po.njump.me`) and **any two of them are enough** to sign. The operators can be changed in the advanced options. [pomegranate_helpers.dart](https://github.com/YakiHonne/nostr_core_enhanced/blob/main/lib/pomegranate/pomegranate_helpers.dart)
- **Policy:** for Google sign-in, the company receives the login token and the email address from Google, "no other Google profile data". It does not name the operators or the central.

## Code

- Open source, **MIT**: [mobile app](https://github.com/YakiHonne/mobile-app) (Flutter; last commit 2026-11-12, release `YakiHonne-2.1.1` of 2026-11-01), [web app](https://github.com/YakiHonne/web-app) (last commit 2026-11-08) and the shared library [nostr_core_enhanced](https://github.com/YakiHonne/nostr_core_enhanced). The older repositories are archived.
- The mobile app uses **Shorebird**, which lets the developer push code updates to installed apps without a new store release.
- **No security audit was found.**

## Privacy: what the policy says

There are **two different privacy policies**:

- **On the website** (dated **2026-07-15**, Yakihonne LLC): usage analytics with **Umami**, which it calls "a third-party analytics provider" that collects only aggregate, non-identifying data and no IP addresses, device identifiers or cookies; subscription and payment data (card payments through Stripe's own page; Lightning; Yaki Points; in-app purchases); for Google sign-in, the email address and a token. Shared with Stripe, Lightning providers, Umami and Google/Pomegranate. No sale of data. It **does not mention crash reporting.**
- **Linked from Google Play** (dated **2023-10-26**, JustHonne Technology SDN BHD, Malaysia): a generic template made with a policy generator ("Free Privacy Policy Generator"), which says that usage data may include the device type, its unique ID, IP address, operating system and browser.

## Privacy: what the stores say

- **Google Play, "Data safety":** "doesn't collect or share any user data"; no data collected, no data shared.
- **App Store:** the privacy label could not be read (Apple's API does not return it).

## Privacy: what the code shows

- **Crash reports and usage analytics are on by default**, behind one setting the app calls "Crashlytics & cache"; they can be turned off. [main.dart](https://github.com/YakiHonne/mobile-app/blob/d34dc8d/lib/main.dart), [localdatabase_repository.dart](https://github.com/YakiHonne/mobile-app/blob/d34dc8d/lib/repositories/localdatabase_repository.dart)
  - **Crash reports** go through the Sentry library to a GlitchTip server (a Sentry-compatible service) whose address is not in the published code.
  - **Usage analytics** go to `umami.yakihonne.com`, YakiHonne's own Umami server: each screen viewed, the screen size and an identifier made from the **phone model and system version**. [umami_tracker.dart](https://github.com/YakiHonne/mobile-app/blob/d34dc8d/lib/common/tracker/umami_tracker.dart)
- **YakiHonne's relays are built in:** `nostr-01.yakihonne.com` and `nostr-02.yakihonne.com` are hard-coded as "mandatory relays", and the code adds them when publishing articles, videos, curations, zap polls and some wallet events. [constants.dart](https://github.com/YakiHonne/mobile-app/blob/d34dc8d/lib/utils/constants.dart)
- **Permissions:** on iPhone, camera (QR codes), location ("for Exif data"), microphone and photos; on Android, internet, notifications, microphone and starting at boot.

## Privacy: what the website does

Opened as a first-time visitor (yakihonne.com, the web app), with nothing clicked, for 8 seconds:

- **WebSocket connections to 8 relays:** YakiHonne's `nostr-01` and `nostr-02`, relay.primal.net, cache2.primal.net (Primal's cache), nos.lol, relay.damus.io, purplepag.es and monitorlizard.nostr1.com. They see the visitor's IP address.
- **Other sites contacted:** YakiHonne's own `cache-v2.yakihonne.com` and **`umami.yakihonne.com`** (analytics), an Amazon S3 bucket of YakiHonne's, **api.coingecko.com** (Bitcoin price), and image hosts (nostr.build, Primal, nostrcheck.me and others).
- **One cookie** (`i18next`, the language); one item in browser storage (the theme colour).
- **Security headers:** no HSTS, no restriction on framing and no real Content-Security-Policy (only `upgrade-insecure-requests`).

## Where the sources differ

- **Data collection:** Google Play says the app collects no data. The app sends crash reports and usage analytics by default, and both policies describe collecting usage data.
- **Analytics:** the website's policy calls Umami a third-party provider that does not collect IP addresses; the Umami server the app and the website use is YakiHonne's own (`umami.yakihonne.com`), which receives the requests and so the IP address, whatever it then keeps.
- **Crash reporting** is in the app, on by default, and in neither policy.
- **Who runs it:** a Wyoming LLC (website policy), a Malaysian company (App Store, Play-linked policy) or an individual (Google Play legal name).
- **Which policy applies:** Google Play links the 2023 Malaysian template, not the 2026 policy on the website.

## What could not be checked

- The iPhone privacy label.
- Which commit each store build was made from, and what Shorebird has pushed to installed apps since.
- Where the crash reports end up (the GlitchTip address is not in the code) and what YakiHonne's Umami server and relays keep.
- The "Fix with AI" / "Improve with AI" writing tools: which service the text goes to.
- How the Pomegranate operators store their shares, or whether they are run independently in practice (two of the three defaults are YakiHonne's and njump.me's).
- The app's behaviour after signing in (it was not installed).

## Sources

- Website and policy: https://yakihonne.com, https://yakihonne.com/privacy (copy of 2026-11-19 in `data/yakihonne/`)
- Policy linked from Google Play: https://www.freeprivacypolicy.com/live/4cb607d9-99b0-4236-8a27-07a6115d347b (copy of 2026-11-19 in `data/yakihonne/`, `2026-11-19-play-privacy.txt`)
- App Store: https://apps.apple.com/us/app/yakihonne/id6472556189
- Google Play: https://play.google.com/store/apps/details?id=com.yakihonne.yakihonne (and its Data safety page)
- Repositories: https://github.com/YakiHonne/mobile-app (commit `d34dc8d`: `lib/main.dart`, `lib/common/tracker/umami_tracker.dart`, `lib/repositories/localdatabase_repository.dart`, `lib/utils/constants.dart`, `shorebird.yaml`, `ios/Runner/Info.plist`, `android/app/src/main/AndroidManifest.xml`), https://github.com/YakiHonne/web-app, https://github.com/YakiHonne/nostr_core_enhanced (`lib/pomegranate/`)
- Collected data: `data/yakihonne/2026-11-19.json` in the Nostr Scrutiny repository
