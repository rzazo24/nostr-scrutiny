# T-Bone — Nostr Scrutiny fact sheet

*Checked on 2026-11-20. Facts and sources only: no score, no verdict.*

**What it is:** a Nostr client for Android only, with an encrypted "toolbox" on the side (private notes, checklists, calendar, voice recorder). Package `social.tbone.fork`. Distributed through **Zapstore** and **GitHub releases**, not Google Play. [Repository](https://github.com/toddsmith456/T-Bone-)

## Who is behind it

- Published by an individual, not a company: the GitHub account **toddsmith456**. The Zapstore releases are signed with the Nostr key of **The_Toddstr** (`The_Toddstr@Cordn.net`), who invited this review on Nostr.
- **A fork of a fork:** according to the repository, it started from T-Bone (`social.tbone`, version 0.3.36, copied in as a source archive), which in turn came from Bony (`daomah/bony`). This fork installs next to the original instead of replacing it. [FORK.md](https://github.com/toddsmith456/T-Bone-/blob/b51d324/FORK.md)
- No website: the repository is the home page. No NIP-89 app announcement (kind 31990) was found on four large relays.

## Your keys

- **Policy:** "Private keys stay out of the app": signing is meant to go to Amber (NIP-55) or a remote signer (NIP-46), with a local key in the Android Keystore as the fallback.
- **Code:** the local key is generated in the app and kept encrypted with an AES-GCM key held in the Android Keystore (the Keystore cannot hold a secp256k1 key itself); it is decrypted in memory only while signing. [LocalKeySigner.kt](https://github.com/toddsmith456/T-Bone-/blob/b51d324/app/src/main/kotlin/social/tbone/account/signer/LocalKeySigner.kt)
- The app also has an App Lock, a separate PIN for the toolbox and a **duress PIN** that wipes the private local data.

## Code

- Open source, **MIT**, in Kotlin. First commit 2026-09-08; 252 commits; latest release **v0.6.3** (2026-11-19).
- **Releases are built by GitHub Actions** from a version tag, and the release lists the APK's SHA-256. [build-release.yml](https://github.com/toddsmith456/T-Bone-/blob/b51d324/.github/workflows/build-release.yml)
- **Zapstore serves the same file:** the Zapstore release for 0.6.3 (kind 3063) gives the same SHA-256 as the GitHub release asset (`53dbfd22…172d`) and points to the GitHub download, and versions 0.6.0 to 0.6.3 are all signed with the same certificate.
- No reproducible builds and **no security audit was found.**

## Privacy: what the policy says

The privacy document is part of the repository and calls itself "a binding rule for every contribution". Among other things: **no Google Play Services, no Firebase, no analytics, tracking or crash-reporting SDKs**; crash logs stay on the device until the user chooses to share them; no location, SMS, call-log or contacts permissions; "no feature may phone home", with network calls going only to "user-chosen Nostr relays / Blossom servers / Tor proxy", and "no update pings"; `allowBackup=false`. Weakening a rule requires a release marked "PRIVACY POLICY CHANGE". [PRIVACY.md](https://github.com/toddsmith456/T-Bone-/blob/b51d324/docs/PRIVACY.md)

## Privacy: what the code shows

- **The build-time check exists and runs.** `scripts/privacy-check.sh` looks for banned dependencies, imports, permissions and known tracking hosts and fails the build if it finds any. GitHub Actions runs it on every pull request and push to `main`, and before every release and beta build. The release notes themselves say these checks "screen selected dependencies, imports, permissions and known endpoints; they are not an end-to-end privacy guarantee". [privacy-check.sh](https://github.com/toddsmith456/T-Bone-/blob/b51d324/scripts/privacy-check.sh)
- **No Google Play Services, Firebase or tracking library** was found in the build files. Google libraries present are offline ones (Hilt, ZXing for QR codes, LiteRT 1.4.2 for the optional image filter), as the policy lists.
- **Permissions:** internet, notifications, microphone (voice recorder), exact alarms (calendar), starting at boot, ignoring battery optimisation, installing packages (for updates) and storage. Bluetooth, nearby-Wi-Fi and UWB permissions that libraries would add are explicitly removed. No location or contacts permission. [AndroidManifest.xml](https://github.com/toddsmith456/T-Bone-/blob/b51d324/app/src/main/AndroidManifest.xml)
- **Update checks:** release builds ask GitHub's API for the latest release when the app starts and then every 24 hours, so GitHub sees the IP address (or the Tor exit, with Tor on). No setting to turn this off was found. The update centre can download and install the APK after checking its signature and SHA-256. [UpdateManager.kt](https://github.com/toddsmith456/T-Bone-/blob/b51d324/app/src/main/kotlin/social/tbone/updates/UpdateManager.kt)
- **Followers lists:** to show who follows an account, the app also asks **Primal's** HTTP API (`cache2.primal.net` / `primal.net`) for that account's followers, so Primal sees whose followers are looked up. [FollowerListRepository.kt](https://github.com/toddsmith456/T-Bone-/blob/b51d324/app/src/main/kotlin/social/tbone/lists/FollowerListRepository.kt)
- Both calls, like image loading, go through Tor when Tor/Orbot routing is turned on.
- **Default relays** for an account without a relay list: relay.damus.io, relay.primal.net, nos.lol and relay.nostr.band (which did not answer when tried on 2026-11-20). [Tunables.kt](https://github.com/toddsmith456/T-Bone-/blob/b51d324/app/src/main/kotlin/social/tbone/Tunables.kt)
- **Optional AI image filter:** the models are downloaded from the project's own GitHub releases only when the user asks, checked against fixed SHA-256 hashes, and run on the device.
- **Notifications** are in-app only, with no push server.

## Where the sources differ

- **"No update pings":** the policy rules them out, but release builds check GitHub for a new version at every start and every 24 hours.
- **"User-chosen" servers only:** the followers view asks Primal's API, which the user does not choose.

## What could not be checked

- That a given APK was built from a given commit (no reproducible builds), beyond the matching hashes between Zapstore and GitHub.
- The original T-Bone (`social.tbone`) and Bony, which this sheet does not cover.
- The app's behaviour after signing in (it was not installed).

## Sources

- Repository: https://github.com/toddsmith456/T-Bone- (commit `b51d324`: `docs/PRIVACY.md`, `FORK.md`, `scripts/privacy-check.sh`, `.github/workflows/`, `app/src/main/AndroidManifest.xml`, `app/src/main/kotlin/social/tbone/` — `updates/UpdateManager.kt`, `lists/FollowerListRepository.kt`, `account/signer/LocalKeySigner.kt`, `Tunables.kt`, `ai/AiModelCatalog.kt`)
- Privacy document: https://github.com/toddsmith456/T-Bone-/blob/main/docs/PRIVACY.md (copy of 2026-11-20 in `data/t-bone/`)
- Release v0.6.3: https://github.com/toddsmith456/T-Bone-/releases/tag/v0.6.3
- Zapstore: https://zapstore.dev/apps/social.tbone.fork (release events kind 3063 on relay.zapstore.dev)
- Collected data: `data/t-bone/2026-11-20.json` in the Nostr Scrutiny repository
