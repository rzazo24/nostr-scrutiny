# 0xchat — Nostr Scrutiny fact sheet

*Checked on 2026-11-19. Facts and sources only: no score, no verdict.*

**What it is:** a private messenger on Nostr: one-to-one messages (NIP-17), private groups (on MLS), public channels, relay-based groups (NIP-29), voice and video calls, and a Cashu wallet. No phone number or email. For Android, iPhone, macOS, Windows and Linux. [0xchat.com](https://0xchat.com)

## Who is behind it

- On Google Play the developer and legal name are **0xchat Limited**; contact `xchat937@gmail.com`. No country or address is given in the listing.
- The privacy policy names no company.
- **Distribution:** Google Play (updated 2026-10-01) and GitHub releases for Android; for the desktop, GitHub releases (version 1.5.3). For iPhone the website links to an App Store page and a TestFlight beta, but **the App Store page does not exist** (Apple returns "not found" for that app in the United States, United Kingdom, Germany, Japan, Hong Kong, Singapore, Canada and Australia), so on 2026-11-19 the iPhone app was only available through TestFlight.
- No NIP-89 app announcement (kind 31990) was found for 0xchat on four large relays.

## Your keys

- **Policy (archived copy):** the private and public keys are "registered" when the account is created; it says nothing else about the key.
- **Code:** the key can stay in Amber or a remote signer. The wallet's database uses SQLCipher (an encrypted SQLite); whether the main database (Isar), which holds the account, is encrypted was not established from the code.

## Code

- Open source: the app under **MIT** ([0xchat-app-main](https://github.com/0xchat-app/0xchat-app-main), last commit 2026-11-11, latest release `v1.5.6-release` of 2026-09-30) and its core libraries under **LGPL-3.0** (0xchat-core, nostr-dart, cashu-dart), now kept inside the app repository.
- **Private groups use MLS** (the IETF standard behind Marmot), through a Flutter bridge to an MLS library in Rust. [nostr-mls-package](https://github.com/0xchat-app/nostr-mls-package)
- The core can route traffic through **Tor** (a `tor` plugin is a dependency).
- **0xchat's own relays are gone:** the code says relay.0xchat.com and groups.0xchat.com "are gone for good" and are no longer offered. The relays it suggests now are public ones (relay.damus.io, nos.lol, relay.primal.net, yabu.me, nostr.wine, inbox.nostr.wine, auth.nostr1.com, relay.ditto.pub and others). [relays.dart](https://github.com/0xchat-app/0xchat-app-main/blob/1396323/packages/0xchat-core/lib/src/account/relays.dart)
- **No security audit was found.**

## Privacy: what the policy says

- **The privacy policy the app and Google Play link to no longer exists.** Both point to `0xchat.com/protocols/0xchat_privacy_policy.html`; on 2026-11-19 that address served the home page instead. The text below is the **copy kept by the Internet Archive on 2026-04-15**.
- It is short and undated: 0xChat "cannot decrypt or access the content of your private messages and contacts" and "queues end-to-end encrypted messages on relays"; profile information can be managed in settings; child sexual abuse content is prohibited and can be reported in the app. It does not mention push notifications, calls, the wallet or any third party.
- The same website hosts the privacy policy of **XChat** (`0xchat.com/xchat-privacy-policy.html`, last modified August 2025, contact support@0xchat.com), a different app, which describes "zero-data collection", Nostr MLS and keys stored in the iOS Keychain or Android Keystore. It is not the policy linked from 0xchat.

## Privacy: what the stores say

- **Google Play, "Data safety":** "doesn't collect or share any user data"; no data collected, no data shared.

## Privacy: what the code shows

- **Push notifications go through 0xchat's push server.** To get notifications, the app sends that server, encrypted to its key (NIP-04, kind 22456), the **list of the user's contacts**, the channels and groups not muted, the user's own public key, the relays to watch and the device's push token. The server therefore learns whom the user talks to. Notifications can be turned off in settings; the server's key is not in the published code (it is set in a private configuration file). [notification.dart](https://github.com/0xchat-app/0xchat-app-main/blob/1396323/packages/0xchat-core/lib/src/account/notification.dart), [ox_userinfo_manager.dart](https://github.com/0xchat-app/0xchat-app-main/blob/1396323/packages/base_framework/ox_common/lib/utils/ox_userinfo_manager.dart)
- On Android the app offers **UnifiedPush** as a way to receive notifications; the Android build also includes Google's Firebase (`google-services`).
- **Calls:** voice and video calls use WebRTC with 0xchat's own server `rtc.0xchat.com` (STUN and TURN) and the public STUN servers of Google and Cloudflare. A TURN server relays the call when a direct connection fails and sees both IP addresses.
- **Translation:** by default with Google ML Kit, which translates on the device.
- **No analytics or crash-reporting library was found** in the app's dependencies.
- **Permissions on Android** include precise and approximate location, phone state, Bluetooth, camera, microphone and storage; no use of location was found in the app's own code.

## Privacy: what the website does

Opened as a first-time visitor (0xchat.com, not a web client), with nothing clicked, for 8 seconds:

- **No other site contacted, no WebSocket connections, no cookies** and nothing stored in the browser.
- **Security headers:** none of HSTS, Content-Security-Policy, referrer policy or framing protection.

## Where the sources differ

- **Data collection:** Google Play says the app collects and shares no data. Its push service sends 0xchat's server the user's contact list and device push token, and calls can go through 0xchat's TURN server.
- **The privacy policy** linked from Google Play and the app is gone; the policy now on the same website is for another app (XChat).
- **iPhone:** the website offers an App Store download that no longer exists.

## What could not be checked

- What the push server and the call server keep, and where they run.
- Which commit each Google Play build was made from (there are tagged releases, but no reproducible builds).
- The iPhone (TestFlight) and desktop apps.
- Whether MLS private groups, NIP-17 messages and Tor behave as the code suggests: that needs testing, not reading.
- The app's behaviour after signing in (it was not installed).

## Sources

- Website: https://0xchat.com, https://0xchat.com/download
- Privacy policy linked from the app and Google Play: https://www.0xchat.com/protocols/0xchat_privacy_policy.html (gone on 2026-11-19; Internet Archive copy of 2026-04-15: https://web.archive.org/web/20260415100306/https://www.0xchat.com/protocols/0xchat_privacy_policy.html, kept in `data/0xchat/`)
- XChat's policy: https://0xchat.com/xchat-privacy-policy.html
- Google Play: https://play.google.com/store/apps/details?id=com.oxchat.nostr (and its Data safety page)
- App Store (not found): https://apps.apple.com/app/0xchat/id1637607169
- Repositories: https://github.com/0xchat-app/0xchat-app-main (commit `1396323`: `packages/0xchat-core/lib/src/account/notification.dart`, `packages/0xchat-core/lib/src/account/relays.dart`, `packages/base_framework/ox_common/lib/utils/ox_userinfo_manager.dart`, `android/app/build.gradle`, `android/app/src/main/AndroidManifest.xml`), https://github.com/0xchat-app/nostr-mls-package, https://github.com/0xchat-app/website
- Collected data: `data/0xchat/2026-11-19.json` in the Nostr Scrutiny repository
