# Postilla — Nostr Scrutiny fact sheet

*Checked on 2026-11-20. Facts and sources only: no score, no verdict.*

**What it is:** a Nostr client for Android only: feeds, private messages (NIP-17), groups, a Lightning wallet, a marketplace (NIP-99) and translation. Application id `com.isolabellart.darkwispenhanced`. Distributed through **Zapstore** and **GitHub releases**, not Google Play. [Repository](https://github.com/isolabellart/postilla-android)

## Who is behind it

- Published by an individual, not a company: the GitHub account **isolabellart**, which also signs the Zapstore releases with the Postilla Nostr account. Its developer asked for this review on Nostr, with a specific question about Google translation.
- **A fork of a fork:** Postilla describes itself as an independent continuation of **Dark Wisp**, which comes from **Wisp**, the client started by Barry Deen. Of its 1,718 commits, 1,131 are Barry Deen's and 388 isolabellart's. It "is not an official release" of Dark Wisp, and keeps Dark Wisp Enhanced's application id and signing key so existing installs keep updating.
- No website and **no privacy policy were found**: the README has a "Privacy, safety and account control" section listing features, not what is collected. No NIP-89 app announcement (kind 31990) was found on four large relays.

## Your keys

- **README and code:** the private key can be stored on the device with Android's encrypted storage (EncryptedSharedPreferences, backed by the Android Keystore), optionally behind biometrics, or kept in Amber (NIP-55). [KeyRepository.kt](https://github.com/isolabellart/postilla-android/blob/5d4c815f/app/src/main/kotlin/com/darkwisp/app/repo/KeyRepository.kt)

## Code

- Open source, **MIT**, in Kotlin. The repository was created on 2026-11-07, with Wisp's history from 2026-02-18; latest release **v1.0.42** (2026-11-20).
- **Releases are built by GitHub Actions**, started by hand (a "manual, protected" workflow that checks the signing certificate before publishing).
- **Zapstore serves the same file:** the Zapstore release for 1.0.42 gives the same SHA-256 as the GitHub release asset (`026ec5d4…0ff2a`), and versions 1.0.33 to 1.0.42 share one signing certificate.
- No reproducible builds and **no security audit was found.**

## Translation (the developer's question)

There are **two translation engines**, chosen in the settings. [TranslationRepository.kt](https://github.com/isolabellart/postilla-android/blob/5d4c815f/app/src/main/kotlin/com/darkwisp/app/repo/TranslationRepository.kt)

- **On the device, with Google ML Kit (the default).** The text of a note is identified and translated on the phone; Google says its on-device translation does not send the text to a server. [ML Kit Translation](https://developers.google.com/ml-kit/language/translation) What does reach Google:
  - **the language packs**, downloaded from Google the first time a language is needed (Google sees the IP address and which language);
  - **diagnostic and usage data**, which Google's own disclosure lists for these libraries: device information, app information, performance metrics, the **configured source and target languages** (Translate) and the **identified languages** (Language ID). Google says it does not share it with third parties; no way to turn it off is described. [ML Kit data disclosure](https://developers.google.com/ml-kit/android-data-disclosure)
  - The same ML Kit family is used for **QR scanning** (barcode scanning).
- **In the cloud, with DeepL**, using the reader's own DeepL API key (kept in encrypted storage). The whole text goes to `api.deepl.com` or `api-free.deepl.com`. [DeepLApiClient.kt](https://github.com/isolabellart/postilla-android/blob/5d4c815f/app/src/main/kotlin/com/darkwisp/app/repo/DeepLApiClient.kt)
- **Private messages are always translated with DeepL**, whatever engine is chosen: when the reader taps translate on a message, its decrypted text goes to DeepL. [DmConversationScreen.kt](https://github.com/isolabellart/postilla-android/blob/5d4c815f/app/src/main/kotlin/com/darkwisp/app/ui/screen/DmConversationScreen.kt)
- Translation only happens when the reader asks for it.

## Privacy: what the code shows

- **No Google Play Services, Firebase or crash-reporting library** was found in the build files. Google libraries present: ML Kit (translation, language identification, barcode scanning) and ZXing.
- **Permissions:** internet, camera (QR codes), notifications, vibration, foreground services (media playback and a "special use" one) and storage. No location, microphone or contacts permission. [AndroidManifest.xml](https://github.com/isolabellart/postilla-android/blob/5d4c815f/app/src/main/AndroidManifest.xml)
- **Other services the app contacts:** CoinGecko (Bitcoin price) and Coinbase (exchange rates for the marketplace); YouTube thumbnails for YouTube links; Blossom servers for uploads (blossom.primal.net, blossom.band, nostr.build).
- **Wallet:** besides Nostr Wallet Connect, a built-in self-custodial wallet with the **Breez SDK (Spark)**, which talks to Breez's and Spark's services.
- **Relays used to start:** relay.damus.io, relay.primal.net, indexer.coracle.social and relay.nos.social. The marketplace also lists relay.nostr.band, which did not answer when tried on 2026-11-20.

## Where the sources differ

- **Translation:** the README and the Zapstore description mention only DeepL; the default engine is Google's ML Kit, and nothing in the repository says what ML Kit sends to Google.
- **Private messages:** they are end-to-end encrypted on Nostr, but translating one sends its text to DeepL; the app does not use the on-device engine for them even when it is the one selected.

## What could not be checked

- What ML Kit actually sends from this app, beyond Google's disclosure (that needs watching the traffic of an installed app).
- That a given APK was built from a given commit (no reproducible builds), beyond the matching hashes between Zapstore and GitHub.
- What the Breez and Spark services see of the wallet.
- The app's behaviour after signing in (it was not installed).

## Sources

- Repository: https://github.com/isolabellart/postilla-android (commit `5d4c815f`: `README.md`, `zapstore.yaml`, `gradle/libs.versions.toml`, `app/build.gradle.kts`, `app/src/main/AndroidManifest.xml`, `.github/workflows/dark-wisp-enhanced-release.yml`, `app/src/main/kotlin/com/darkwisp/app/` — `repo/TranslationRepository.kt`, `repo/DeepLApiClient.kt`, `repo/DeepLKeyStore.kt`, `repo/KeyRepository.kt`, `repo/InterfacePreferences.kt`, `ui/screen/DmConversationScreen.kt`, `relay/RelayProber.kt`)
- Google ML Kit: https://developers.google.com/ml-kit/language/translation, https://developers.google.com/ml-kit/android-data-disclosure
- Release v1.0.42: https://github.com/isolabellart/postilla-android/releases/tag/v1.0.42
- Zapstore: release events kind 3063 for `com.isolabellart.darkwispenhanced` on relay.zapstore.dev
- Collected data: `data/postilla/2026-11-20.json` in the Nostr Scrutiny repository
