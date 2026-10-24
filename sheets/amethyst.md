# Amethyst — Nostr Scrutiny fact sheet

*Checked on 2026-10-24. Facts and sources only: no score, no verdict.*

**What it is:** a Nostr client for Android (with a desktop version in the same repository). There is no web client: amethyst.social is its website. [amethyst.social](https://amethyst.social)

## Who is behind it

- **Google Play:** developer **Vitor F. Pamplona** (an individual), contact amethyst@vitorpamplona.com, updated 2026-10-14. [Google Play](https://play.google.com/store/apps/details?id=com.vitorpamplona.amethyst)
- Also distributed outside Google Play (the policy mentions an F-Droid build).
- **NIP-89:** Amethyst publishes an app announcement (kind 31990, 2026-08-31) for Android, listing the kinds of events it handles.

## Your keys

- **Policy:** keys are stored in the app's local storage on the phone; "there is no Amethyst server, no Amethyst account". [Privacy policy](https://github.com/vitorpamplona/amethyst/blob/main/PRIVACY.md)
- **Code:** keys are encrypted with the Android Keystore; login with remote signers (NIP-46, `bunker://` and `nostrconnect://`) and with Amber (NIP-55) is supported. [Repository](https://github.com/vitorpamplona/amethyst)

## Code

- Open source, **MIT** licence. Last commit: 2026-10-24; latest release **v1.20.0**, published 2026-10-24 on GitHub.
- The Google Play version (updated 2026-10-14) is older than that release; the code alone does not show which build is in the store.

## Privacy: what the policy says

The policy (updated **2026-09-15**) lists what leaves the phone:

- events you publish and what you ask relays for, sent to the relays you choose;
- media uploads, to the media server you choose;
- **with push notifications on:** in the Google Play build, a per-device token, your **public key** and a preferred relay, registered with Google Firebase Cloud Messaging so a notification proxy can wake the app; in the F-Droid build, a token with the UnifiedPush distributor you install;
- workout summaries, only when you publish one.

It states that "the developer does not run any server that aggregates or stores this data", and that Health Connect data (if you allow it) is read-only, foreground-only, limited to 28 days and never uploaded automatically.

## Privacy: what the stores say

- **Google Play, "Data safety":** "The developer says that this app doesn't collect or share any user data": no data shared, no data collected.

## Privacy: what the code shows

- No analytics or crash-reporting libraries were found; Firebase is used for push messaging, as the policy says.

## Privacy: the website

The website (not the app), opened as a first-time visitor, made one request to another site, `api.github.com`, and set no cookies. It sends no security headers such as a Content-Security-Policy.

## Where the sources differ

- Google Play says the app collects no data; the policy explains that, with push notifications on, the public key and a device token go to Google's push service through a notification proxy. That proxy is not run by the developer according to the policy, which may be why it is not declared; the store label does not mention it either way.

## What could not be checked

- Which commit the Google Play version was built from.
- Who runs the notification proxy and what it keeps.

## Sources

- Google Play: https://play.google.com/store/apps/details?id=com.vitorpamplona.amethyst (and its Data safety page)
- Repository: https://github.com/vitorpamplona/amethyst (key storage: `commons/src/androidMain/kotlin/com/vitorpamplona/amethyst/commons/keystorage/`)
- Privacy policy: https://github.com/vitorpamplona/amethyst/blob/main/PRIVACY.md (copy of 2026-10-24 in `data/amethyst/`)
- Collected data: `data/amethyst/2026-10-24.json` in the Nostr Scrutiny repository
