# Amber — Nostr Scrutiny fact sheet

*Checked on 2026-11-27. Facts and sources only: no score, no verdict.*

**What it is:** a **signer**, not a client: an Android app (with a desktop version for Windows, macOS and Linux) that keeps the Nostr private key in one place and signs for other apps, either on the same phone (NIP-55) or remotely as a NIP-46 "bunker". Several apps reviewed here rely on it (T-Bone, Postilla, White Noise, Ditto, Divine). [Repository](https://github.com/greenart7c3/Amber)

## Who is behind it

- An individual developer, the GitHub account **greenart7c3**. No company, no website.
- **Distribution: not on Google Play.** GitHub releases, **F-Droid** (version 6.6.9), Zapstore and Obtainium.
- No NIP-89 app announcement (kind 31990) was found on four large relays.
- **No privacy policy was found.**

## Your keys

- Keys are kept encrypted with a key held in the **Android Keystore**; the code also handles phones whose Keystore key stops working (a known device bug), listing the accounts affected instead of failing silently. [AccountRepository.kt](https://github.com/greenart7c3/Amber/blob/901d0a7/app/src/main/java/com/greenart7c3/nostrsigner/data/AccountRepository.kt)
- The list of apps allowed to sign, and their permissions, is stored encrypted too. [ApplicationEntityCrypto.kt](https://github.com/greenart7c3/Amber/blob/901d0a7/app/src/main/java/com/greenart7c3/nostrsigner/database/ApplicationEntityCrypto.kt)

## Code

- Open source; the `LICENSE` file is **MIT**, although the README badge says Apache-2.0. Kotlin; last commit 2026-11-26; latest release **v6.6.9** (2026-10-14).
- **Releases can be checked twice over:**
  - each release ships a **manifest of file hashes signed with GPG**, and the README says not to install an APK whose signature does not verify; [VERIFY_RELEASES.md](https://github.com/greenart7c3/Amber/blob/901d0a7/VERIFY_RELEASES.md)
  - the README explains how to **rebuild the APK from its tag in Docker and compare it** with the published one ("APKs match!"), and the same for the desktop downloads. **It is the first app reviewed here that documents reproducible builds.** [README](https://github.com/greenart7c3/Amber/blob/901d0a7/README.md)
- **No security audit was found.**

## Privacy: what the code shows

- **No analytics, crash-reporting, Firebase or Google Play Services library** in the build files.
- **Three builds:**
  - **"offline"**, which **removes the internet permission** altogether: it can only sign for apps on the same phone (NIP-55). **This is the build Zapstore distributes.** [offline AndroidManifest.xml](https://github.com/greenart7c3/Amber/blob/901d0a7/app/src/offline/AndroidManifest.xml), [build.gradle.kts](https://github.com/greenart7c3/Amber/blob/901d0a7/app/build.gradle.kts)
  - **"free"**, with internet, notifications and a foreground service, needed to act as a remote NIP-46 signer through relays;
  - **"tor"**, for routing through Tor.
- **Update checks:** builds outside F-Droid and the offline build ask Nostr relays (relay.zapstore.dev, relay.primal.net, relay.snort.social and others) for new Zapstore releases, **daily by default** (weekly can be chosen; no "never" option was found). Those relays see the IP address. [ZapstoreUpdater.kt](https://github.com/greenart7c3/Amber/blob/901d0a7/app/src/main/java/com/greenart7c3/nostrsigner/service/ZapstoreUpdater.kt), [Amber.kt](https://github.com/greenart7c3/Amber/blob/901d0a7/app/src/main/java/com/greenart7c3/nostrsigner/Amber.kt)
- **Permissions (all builds):** storage, starting at boot, ignoring battery optimisation and installing packages (for updates); the networked builds add internet and notifications.

## Where the sources differ

- **Licence:** the `LICENSE` file is MIT; the README badge says Apache-2.0.

## What could not be checked

- The reproducible build itself was not run for this sheet (it needs a full Docker build).
- What the relays used for remote signing and update checks keep.
- The app's behaviour after setting it up (it was not installed).

## Sources

- Repository: https://github.com/greenart7c3/Amber (commit `901d0a7`: `README.md`, `VERIFY_RELEASES.md`, `LICENSE`, `app/build.gradle.kts`, `app/src/main/AndroidManifest.xml`, `app/src/free/AndroidManifest.xml`, `app/src/offline/AndroidManifest.xml`, `app/src/main/java/com/greenart7c3/nostrsigner/` — `Amber.kt`, `service/ZapstoreUpdater.kt`, `data/AccountRepository.kt`, `database/ApplicationEntityCrypto.kt`)
- Release v6.6.9 with its signed manifest: https://github.com/greenart7c3/Amber/releases/tag/v6.6.9
- F-Droid: https://f-droid.org/packages/com.greenart7c3.nostrsigner/
- Collected data: `data/amber/2026-11-27.json` in the Nostr Scrutiny repository
