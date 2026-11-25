# Nostur — Nostr Scrutiny fact sheet

*Checked on 2026-11-25. Facts and sources only: no score, no verdict.*

**What it is:** a Nostr client for iPhone, iPad and Mac, by one developer. [nostur.com](https://nostur.com)

## Who is behind it

- An individual, **Fabian Lachman**, the seller on the App Store. No company is named.
- **Distribution:** App Store (version 1.35.0 of 2026-11-08, first released 2023-05-29, 4.7 stars from 27 ratings), free. No Android or web version.
- A NIP-89 app announcement (kind 31990) was found, published 2025-07-29.

## Your keys

- **Code:** a private key entered in the app is kept in the **iOS Keychain**, marked to **sync through iCloud Keychain** to the user's other Apple devices. Remote signers (NIP-46) are supported, and their connection secrets are kept the same way. [AccountManager.swift](https://github.com/nostur-com/nostur-ios-public/blob/004bf8f/Nostur/Accounts/AccountManager.swift), [NIP46SecretManager.swift](https://github.com/nostur-com/nostur-ios-public/blob/004bf8f/Nostur/Nostr/NIP46-NC/NIP46SecretManager.swift)
- **Account data** (accounts and other app data) is synced through **CloudKit**, in the user's own iCloud, so it follows the user to their other devices. [DataProvider.swift](https://github.com/nostur-com/nostur-ios-public/blob/004bf8f/Nostur/CoreData/DataProvider.swift)
- The policy does not mention iCloud.

## Code

- Open source, **GPL-3.0**: [nostur-ios-public](https://github.com/nostur-com/nostur-ios-public) (Swift; last commit 2026-11-25; latest release 1.35.0, the App Store version).
- **No analytics or crash-reporting library** among its dependencies (Swift packages: cryptography, images, Markdown, Keychain, LiveKit for live audio, and others).
- The app has an Apple **privacy manifest** (`PrivacyInfo.xcprivacy`).
- **No security audit was found.**

## Privacy: what the policy says

The policy is a short undated text linked from the App Store listing (the website does not link it): "**Nostur does not collect information about you.**" It names two external services: **Tenor** for GIFs and "image upload services", and says you can avoid both by not using GIFs or images. [privacy.txt](https://nostur.com/privacy.txt)

## Privacy: what the stores say

- **App Store privacy label: "Data Not Collected".**

## Privacy: what the code shows

- **GIF search** goes to **Tenor** (Google) until 29 June 2026 and to **KLIPY** after that date (the code switches by date), so from that date the GIF provider is KLIPY, not the Tenor the policy names. The search words go to that service. [Tenor.swift](https://github.com/nostur-com/nostur-ios-public/blob/004bf8f/Nostur/GIFs/Tenor.swift)
- **Image uploads** go by default to **nostr.build**; Blossom servers, nostrcheck.me and Imgur can be chosen in Settings. [SettingsStore.swift](https://github.com/nostur-com/nostur-ios-public/blob/004bf8f/Nostur/Screens/Settings/SettingsStore.swift)
- **No push-notification server** was found in the code.

## Privacy: what the website does

Opened as a first-time visitor (nostur.com, not a web client), with nothing clicked, for 8 seconds:

- **No other site contacted, no WebSocket connections, no cookies**, nothing stored in the browser.
- **Security headers:** none of HSTS, Content-Security-Policy, referrer policy or framing protection.

## Where the sources differ

- **GIFs:** the policy names Tenor; since 29 June 2026 the app sends GIF searches to KLIPY.
- **iCloud:** keys and account data sync through the user's iCloud (Keychain and CloudKit), which the policy does not mention. This is the user's own iCloud, not a server of Nostur's.

## What could not be checked

- That the App Store build is made from the published code (Apple builds are not reproducible).
- The app's behaviour after signing in (it was not installed).

## Sources

- Website and policy: https://nostur.com, https://nostur.com/privacy.txt (copy of 2026-11-25 in `data/nostur/`)
- App Store: https://apps.apple.com/app/id1672780508 (including its privacy label, read on 2026-11-25)
- Repository: https://github.com/nostur-com/nostur-ios-public (commit `004bf8f`: `Nostur.xcodeproj/project.pbxproj`, `Config.xcconfig.dist`, `PrivacyInfo.xcprivacy`, `Nostur/Accounts/AccountManager.swift`, `Nostur/Nostr/NIP46-NC/NIP46SecretManager.swift`, `Nostur/CoreData/DataProvider.swift`, `Nostur/GIFs/Tenor.swift`, `Nostur/Screens/Settings/SettingsStore.swift`)
- Collected data: `data/nostur/2026-11-25.json` in the Nostr Scrutiny repository
