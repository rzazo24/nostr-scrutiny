# Divine — Nostr Scrutiny fact sheet

*Checked on 2026-11-22. Facts and sources only: no score, no verdict.*

**What it is:** a short-video app on Nostr, a revival of Vine (it also shows the old Vine archive), for iPhone, Android and the web (divine.video). Its relay, relay.divine.video, was in **7.6%** of the relay lists updated between 12 and 19 November 2026 in a count of 15,453 accounts. [divine.video](https://divine.video)

## Who is behind it

- The privacy policy names **Verse Communications PBC dba Divine**, in the United States (Oregon address). The App Store seller is **Verse Communications, Inc.**; on Google Play the developer is "Verse Communication PBC" and the legal name "Verse Communications, Inc.". [Privacy policy](https://divine.video/privacy)
- **Distribution:** App Store (version 1.0.31 of 2026-11-19, first released 2026-04-29, 4.2 stars from 179 ratings) and Google Play (updated 2026-11-16); the web app at divine.video.
- No NIP-89 app announcement (kind 31990) was found on four large relays.

## Your keys

- **Two ways in.** With your own Nostr key (imported, or kept in a signer), Divine says it stores no private key. Or with **Divine Login**, an account with **email and password** where Divine keeps the key on its servers, encrypted, through its key-management service (**Keycast**). The policy: Divine "may process and store encrypted key material and related account data". [Privacy policy](https://divine.video/privacy), [keycast](https://github.com/divinevideo/keycast)
- **Code (mobile):** keys kept on the device go in `flutter_secure_storage` (iOS Keychain / Android encrypted storage).

## Code

- Open source, **MPL-2.0**: [divine-mobile](https://github.com/divinevideo/divine-mobile) (Flutter; last commit 2026-11-22; latest GitHub release 1.0.29 of 2026-11-16, behind the 1.0.31 in the App Store), [divine-web](https://github.com/divinevideo/divine-web), [divine-blossom](https://github.com/divinevideo/divine-blossom) (video hosting) and more; Keycast is MIT. Some services (push, router, upload server, identity verification) have no licence on GitHub.
- The app uses **Shorebird**, which lets Divine push code updates to installed apps without a new store release (the policy says so).
- **No security audit was found.**

## Privacy: what the policy says

The policy (dated **2026-11-05**) covers only "Divine-controlled infrastructure". Among other things:

- It collects device and browser information, **IP address**, **approximate location** from network signals, and logs.
- **Shorebird** receives a random per-install identifier, versions, platform and update status.
- **When you are signed in, the app tells Divine when it opens and closes, and checks in once a minute while it is open**, "only to time notifications"; kept from three minutes to 90 days depending on the item.
- Moderation records and "identifiers or hashes used to detect abuse".
- Disclosure to unnamed "service providers". **It does not name Google, Firebase or Zendesk.**

## Privacy: what the stores say

- **Google Play, "Data safety":** "doesn't collect or share any user data"; no data collected, no data shared.

## Privacy: what the code shows

- **Google Firebase is built in:** Analytics, Crashlytics (crash reports), Performance and Messaging (push). [pubspec.yaml](https://github.com/divinevideo/divine-mobile/blob/a463fc7/mobile/pubspec.yaml)
- **Your Nostr public key is the user ID** given to Firebase Analytics and to Crashlytics, so Google's records are tied to your Nostr identity. [analytics_providers.dart](https://github.com/divinevideo/divine-mobile/blob/a463fc7/mobile/lib/providers/analytics_providers.dart)
- **Usage analytics are on by default.** A switch in Settings → Privacy & safety turns off Firebase Analytics, Divine's own analytics queue and the view events below; the code says "what the shipped default should be is still decided". [privacy_settings_screen.dart](https://github.com/divinevideo/divine-mobile/blob/a463fc7/mobile/lib/screens/settings/privacy_settings_screen.dart), [analytics_service.dart](https://github.com/divinevideo/divine-mobile/blob/a463fc7/mobile/lib/services/analytics_service.dart)
- **Crash reports are always on in store builds**, outside that switch. [crash_reporting_service.dart](https://github.com/divinevideo/divine-mobile/blob/a463fc7/mobile/lib/services/crash_reporting_service.dart)
- **What you watch is published as Nostr events signed with your key:** "ephemeral video view events" (kind 22236) for each video, with the video, the seconds watched, the loops and where it was found (which feed, list or hashtag), "processed by analytics services in real-time" for creator statistics and recommendations. They are governed by the analytics switch. [view_event_publisher.dart](https://github.com/divinevideo/divine-mobile/blob/a463fc7/mobile/lib/services/view_event_publisher.dart)
- **A location check at start-up:** before showing anything, the app asks a Cloudflare Worker (`openvine-geo-blocker.protestnet.workers.dev`) whether the user's region is blocked, which reveals the IP address to that service. The answer is kept for 24 hours, so the check repeats about once a day. [geo_blocking_service.dart](https://github.com/divinevideo/divine-mobile/blob/a463fc7/mobile/lib/services/geo_blocking_service.dart)
- **Help desk:** Zendesk receives the display name, NIP-05 and npub of the signed-in user. [auth_providers.dart](https://github.com/divinevideo/divine-mobile/blob/a463fc7/mobile/lib/providers/auth_providers.dart)

## Privacy: what the website does

Opened as a first-time visitor (divine.video, the web app), with nothing clicked, for 8 seconds:

- **WebSocket connections to 4 relays:** relay.divine.video, relay.primal.net, relay.damus.io and purplepag.es.
- **Other sites contacted:** Google Fonts, **storage.googleapis.com**, and for the Vine archive v.cdn.vine.co, vines.s3.amazonaws.com and web.archive.org.
- **No cookies**; one item in browser storage (`nostr:login`).
- **Security headers:** none of HSTS, Content-Security-Policy, referrer policy or framing protection.

## Where the sources differ

- **Data collection:** Google Play says the app collects and shares no data. The policy lists IP address, approximate location, device information, logs and per-minute check-ins; the code sends analytics and crash reports to Google with the Nostr public key as the user ID, and publishes view events.
- **Third parties:** the policy does not name Google/Firebase, Zendesk or the Cloudflare geo-check.

## What could not be checked

- What Divine's servers (relay, Keycast, analytics, push) keep beyond what the policy says.
- Whether the analytics switch starts on or off in each store build (the code default is on, and the code says it is still being decided).
- The iPhone privacy label.
- Which commit each store build was made from, and what Shorebird has pushed since.
- The app's behaviour after signing in (it was not installed).

## Sources

- Website and policy: https://divine.video, https://divine.video/privacy (copy of 2026-11-22 in `data/divine/`)
- App Store: https://apps.apple.com/app/id6747959501
- Google Play: https://play.google.com/store/apps/details?id=co.openvine.app (and its Data safety page)
- Repositories: https://github.com/divinevideo/divine-mobile (commit `a463fc7`: `mobile/pubspec.yaml`, `mobile/lib/providers/analytics_providers.dart`, `mobile/lib/services/analytics_service.dart`, `mobile/lib/services/crash_reporting_service.dart`, `mobile/lib/services/view_event_publisher.dart`, `mobile/lib/services/geo_blocking_service.dart`, `mobile/lib/screens/settings/privacy_settings_screen.dart`, `mobile/lib/providers/auth_providers.dart`), https://github.com/divinevideo/keycast
- Relay-list count of 2026-11-19 (NIP-65 lists on purplepag.es), published on Nostr
- Collected data: `data/divine/2026-11-22.json` in the Nostr Scrutiny repository
