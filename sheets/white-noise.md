# White Noise — Nostr Scrutiny fact sheet

*Checked on 2026-11-04. Facts and sources only: no score, no verdict.*

**What it is:** a private messenger for one-to-one and group chats, built on the **Marmot protocol**: end-to-end encrypted groups with MLS (the IETF standard RFC 9420) carried over Nostr relays. No phone number or email. For Android and iPhone, in beta. [whitenoise.chat](https://whitenoise.chat)

## Who is behind it

- Published by the **Internet Privacy Foundation** (IPF), which the privacy policy describes as a Wyoming nonprofit corporation. Contact: dev@ipf.dev (Google Play), privacy@ipf.dev (policy). [Privacy policy](https://whitenoise.chat/privacy)
- **Distribution:** Google Play (developer Internet Privacy Foundation, updated 2026-10-27), Zapstore and GitHub releases for Android; on iPhone only a **TestFlight** beta, with no App Store listing. [Download page](https://whitenoise.chat/download)
- The website publishes a monthly **warrant canary**, last re-affirmed on 2026-10-31, each one also posted as a signed Nostr note. [Canary](https://whitenoise.chat/canary)
- No NIP-89 app announcement (kind 31990) was found for White Noise on four large relays.

## Your keys

- **Policy:** the Nostr private key is generated and kept on the device; IPF does not store it and cannot recover it. [Privacy policy](https://whitenoise.chat/privacy)
- **Code (Android):** stored secrets are sealed with an AES-256-GCM key held in the Android Keystore. Signing in with **Amber** (NIP-55) is supported, so the key can stay in the signer. [KeystoreSecureStore.kt](https://github.com/marmot-protocol/whitenoise-android/blob/master/app/src/main/java/dev/ipf/whitenoise/android/state/KeystoreSecureStore.kt)
- **Messages:** group messages are published with throwaway (ephemeral) Nostr keys rather than the account's key, which the policy says reduces, but does not remove, the link to the account through connection metadata.

## Code

- Open source, **AGPL-3.0**, one repository per platform: [Android](https://github.com/marmot-protocol/whitenoise-android) (latest release `android-v2026.10.27`), [iOS](https://github.com/marmot-protocol/whitenoise-ios), [macOS](https://github.com/marmot-protocol/whitenoise-mac) and [Linux](https://github.com/marmot-protocol/whitenoise-linux); last commits 2026-11-04. The original Flutter app is archived. The README calls every client "in development".
- **The protocol** is specified in its own repository, still changing (last change 2026-11-03). [Marmot](https://github.com/marmot-protocol/marmot)
- **No security audit was found.** The protocol's own threat model says it is "not a security audit, a formal proof, or evidence that any particular implementation follows every rule", and **80 of its 86 risk scenarios are marked "Unverified"**. [Threat model](https://github.com/marmot-protocol/marmot/blob/master/security-considerations.md)
- Among the risks it lists: relays can show different histories to different clients, replay messages or drop them after acknowledging them; competing group changes are settled by a fixed rule, which a member can try to tilt; and relays still see timing, sizes and connection patterns ("does not promise anonymity").

## Privacy: what the policy says

The policy (dated **2026-10-13**) is long and detailed. Among other things:

- **IPF cannot read messages.** Relays, including the ones IPF runs, see the IP address, connection details and event metadata.
- **Off unless turned on:** product analytics (IPF's own Aptabase, kept 180 days) and telemetry (IPF's own OpenTelemetry collector, kept 90 days), with no message content, contacts or public keys; **group diagnostic logs**, more sensitive (group and message identifiers, relays), uploaded automatically to IPF once enabled and kept 30 days.
- **Push notifications** (optional) go through Transponder, a service IPF runs, which can read the Apple or Google push token but not link it to the Nostr identity.
- **Third parties named:** Blossom servers for media (encrypted inside chats, public for profile pictures), **Giphy** for GIF search, DuckDuckGo for image search on iOS, the phone's speech service for dictation, Stripe for donations on iOS, and any AI agent the user connects to a chat, which receives the messages of that chat.
- **Moderation reports** sent to IPF include the reporter's public key, are kept 60 days and may be shared with law enforcement where the law requires it.

## Privacy: what the stores say

- **Google Play, "Data safety":** no data shared with third parties; data that may be collected: app interactions, diagnostics, **approximate location**, voice recordings, device IDs, contacts, name and user IDs, photos; encrypted in transit; deletion can be requested.

## Privacy: what the code shows

- **Firebase Cloud Messaging** (Google) is built into the Android app, in the Google Play and the Zapstore builds alike, for push notifications.
- **Location sharing:** the app asks for location permission and has a "Share location" picker whose map loads **OpenStreetMap** tiles directly, so OpenStreetMap's servers see the IP address and the area being looked at.
- **Default relays** in the code include IPF's relay.eu.whitenoise.chat and relay.us.whitenoise.chat.
- Diagnostic log uploads start switched off at every launch until consent is given.

## Privacy: what the website does

Opened as a first-time visitor (whitenoise.chat, not a web client), with nothing clicked, for 8 seconds:

- **One other site contacted:** analytics.ipf.dev, the self-hosted analytics the policy describes (page, referrer, browser, screen size, country). No WebSocket connections.
- **One first-party cookie** (`__vdpl`); the site is hosted on Vercel. The policy says the analytics sets no cookies.
- **Security headers:** HSTS and framing blocked; no Content-Security-Policy.

## Where the sources differ

- **Location:** Google Play lists approximate location among the data collected and the app has a location-sharing feature, but the privacy policy does not mention location or OpenStreetMap.

## What could not be checked

- The iPhone app (TestFlight only, no store listing or privacy label) and the macOS and Linux apps.
- Which commit each store build was made from.
- What IPF's relays, Transponder and analytics servers keep beyond what the policy says.
- Whether Marmot behaves as specified when relays drop or reorder messages: that needs testing, not reading.
- The app's behaviour after signing in (it was not installed).

## Sources

- Website and policy: https://whitenoise.chat, https://whitenoise.chat/privacy (copy of 2026-11-04 in `data/white-noise/`), https://whitenoise.chat/download, https://whitenoise.chat/canary
- Google Play: https://play.google.com/store/apps/details?id=dev.ipf.whitenoise.android (and its Data safety page)
- Repositories: https://github.com/marmot-protocol/whitenoise-android (keys: `app/src/main/java/dev/ipf/whitenoise/android/state/KeystoreSecureStore.kt`; push: `notifications/MarmotFirebaseMessagingService.kt`; location: `ui/conversation/share/LocationPickerScreen.kt`; permissions: `app/src/main/AndroidManifest.xml`), https://github.com/marmot-protocol/whitenoise-ios, https://github.com/marmot-protocol/whitenoise-mac, https://github.com/marmot-protocol/whitenoise-linux
- Protocol: https://github.com/marmot-protocol/marmot (`security-considerations.md`)
- Collected data: `data/white-noise/2026-11-04.json` in the Nostr Scrutiny repository
