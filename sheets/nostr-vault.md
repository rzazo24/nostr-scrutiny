# Nostr Vault — Nostr Scrutiny fact sheet

*Checked on 2026-11-01. Facts and sources only: no score, no verdict.*

**What it is:** a Nostr client with a Nostr relay of its own built in (the "vault"), for iPhone, iPad, Mac and Android, plus a web app. It grew out of the Haven relay. [nostrvault.app](https://nostrvault.app)

## Who is behind it

- Made by **btcforplebs**, as the privacy policy says; no company is named. [Privacy policy](https://nostrvault.app/privacy.html)
- **Distribution:** the iPhone app is a beta on Apple's **TestFlight**; no App Store listing was found. No Google Play listing was found either; Android builds are published as GitHub releases (latest `v3.0.1-b53`, 2026-10-29). [Releases](https://github.com/btcforplebs/nostr-vault/releases)
- **Web app:** at [nostrvault.app/vault/](https://nostrvault.app/vault/), running in the browser.
- No NIP-89 app announcement (kind 31990) was found for Nostr Vault on four large relays.

## Your keys

- **Policy:** the private key is kept in the iOS/Mac Keychain or encrypted app storage on Android, or stays in a remote signer or Amber. In the web app, signing in with a browser extension or a bunker keeps the key out of the page; an account created in the web app keeps its key in the browser, encrypted with the user's password (NIP-49). [Privacy policy](https://nostrvault.app/privacy.html)
- **Code:** iOS stores credentials in the Keychain, readable only on that device after the first unlock (`kSecAttrAccessibleAfterFirstUnlockThisDeviceOnly`); Android uses `EncryptedSharedPreferences`. Remote signers (NIP-46) and Amber (NIP-55) are supported on Android, and the web app supports browser extensions (NIP-07). [Repository](https://github.com/btcforplebs/nostr-vault)

## Code

- Open source, **MIT** licence. Last commit: 2026-10-31. Releases are tagged on GitHub.
- One repository holds the iPhone/Mac app, the Android app, the web app, the relay (in Go, from Haven) and the website.
- No analytics or crash-reporting libraries were found. Android's Firebase push library is present only as a commented-out line; the iOS privacy manifest declares no tracking (`NSPrivacyTracking` false).

## Privacy: what the policy says

The policy (dated **2026-10-23**) is unusually detailed. Among other things:

- **No analytics, crash reporting, advertising or tracking code, and no push server**: notifications are made on the device.
- **The developer's relay**, relay.btcforplebs.com, is one of the defaults; it sees the IP address and public key of whoever connects. It can be removed in Settings.
- **The website** runs behind Cloudflare; the web server keeps a standard request log (IP address, time, page, browser, referrer) for **7 days**, and shared-post links show up in it.
- **Profile pictures** in the iPhone, Mac and Android apps load through **wsrv.nl**, a third-party image resizer, which can tell whose profiles are looked at. The policy says there is no setting to turn this off yet.
- **Link previews** are fetched for links on screen in all apps, so a site learns the IP address of people who scroll past its link; no setting to turn this off yet.
- **FIPS mesh** (from version 3.0, optional): connects to seeds run by iris.to and may ask public STUN servers (Google, Cloudflare, Twilio) for the public IP address.
- **Off unless turned on:** follower counts from Vertex and Fanfares article checks, both of which send a request signed by the user's key.

## Privacy: what the web app does

Opened as a first-time visitor (nostrvault.app/vault/), with nothing clicked, for 8 seconds:

- **No requests to other sites, no WebSocket connections, no cookies** and nothing stored in the browser: the app waits for the visitor to sign in.
- **Security headers:** a Content-Security-Policy that allows only its own scripts, no referrer sent to other sites, and the page cannot be framed by other sites. No HSTS header.

## Where the sources differ

- Nothing found so far: the policy names the third parties the code was seen to use (wsrv.nl for profile pictures, the developer's relay among the defaults).

## What could not be checked

- The iPhone app's builds (TestFlight only, no store listing or privacy label) and which commit each was built from.
- What relay.btcforplebs.com and the web server actually keep, beyond what the policy says.
- The apps' behaviour after signing in (only the web app was opened, and only as a first-time visitor).

## Sources

- Website and policy: https://nostrvault.app, https://nostrvault.app/privacy.html (copy of 2026-11-01 in `data/nostr-vault/`)
- Web app: https://nostrvault.app/vault/
- Repository: https://github.com/btcforplebs/nostr-vault (keys: `HavenApp/HavenApp/Services/CredentialStore.swift`, `NostrVault/app/src/main/java/com/nostrvault/data/local/CredentialStore.kt`; signers: `NostrVault/app/src/main/java/com/nostrvault/service/NIP46Service.kt`, `AmberSignerService.kt`, `web-vault/src/signer/nip07.js`)
- Collected data: `data/nostr-vault/2026-11-01.json` in the Nostr Scrutiny repository
