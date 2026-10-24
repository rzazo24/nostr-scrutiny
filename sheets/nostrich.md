# Nostrich — Nostr Scrutiny fact sheet

*Checked on 2026-10-24. Facts and sources only: no score, no verdict.*

**What it is:** a Nostr client for the web, iPhone/iPad, Android and Mac, with a marketplace, chat, "Spaces" and paid zap campaigns. [nostrich.org](https://nostrich.org)

## Who is behind it

- **App Store:** sold by **RHXO Technology, LLC**; first released 2026-09-23, version 1.2.2 of 2026-10-23. [App Store](https://apps.apple.com/us/app/nostrich-nostr-client/id6807898323)
- **Google Play:** developer **RHXO TECHNOLOGY LLC**, with a postal address in Jersey City, New Jersey (US) and the contact address info@rhxo.com. [Google Play](https://play.google.com/store/apps/details?id=org.nostrich.app)
- **Privacy policy:** names a different entity as operator: **RHXO, Inc., a Delaware corporation**, which it calls the controller of the data its servers hold. [Privacy policy](https://nostrich.org/privacy)
- **On Nostr**, the account "nostrich" says RHXO stands for "Reserve Holdings Exclusively Orange", describes itself as a Bitcoin-native company and says it plans to seek a public listing, subject to the SEC. [Note](https://njump.me/nevent1qvzqqqqqqypzpunng8mv78n6hhufgdezgcej7k8708yeyh2gnljewgvqzuc54h7nqyvhwumn8ghj7un9d3shjtngd9mx2umrdacx2tnc09aqz9nhwden5te0wfjkccte9ec8y6tdv9kzumn9wsqzqmh720zeqyl5mm4a79htcs2hzst7v229cj6yyju3mtec8m97569adtpdyq)
- No NIP-89 app announcement (kind 31990) was found for Nostrich on four large relays.

## Your keys

According to its privacy policy:

- Keys are stored on the device: the iOS Keychain, the Android Keystore, or the browser's storage on the web. The private key is not sent to its servers.
- A remote signer can be used instead; then Nostrich does not receive the private key.

## Code

- The policy calls Nostrich free and open source. The GitHub account **nostrichOS** (created 2026-09-02) has a repository `nostrich-client` under the **MIT** licence. [Repository](https://github.com/nostrichOS/nostrich-client)
- Its **last commit is of 2026-09-24**, while the iPhone app had a new version on 2026-10-23 and the Android app on 2026-10-03. No tagged releases. The published code cannot be matched to the apps in the stores.

## Privacy: what the stores say

- **Google Play, "Data safety":** "The developer says that this app doesn't collect or share any user data": no data shared, no data collected.

## Privacy: what the policy says

The policy (dated 2026-10-23) describes server-side processing, among other things:

- **Zap campaigns:** advertisers pay to send zaps with a message to people who posted recently. For this, Nostrich keeps an index of public notes from about the last week, with each author's Lightning address and an "Activity score" calculated from public Nostr data. This covers authors on Nostr in general, not only Nostrich users. Everyone is included unless they turn on "Don't include me in zap campaigns" in Nostrich's settings; that choice is kept with the public key, even after deleting other data.
- **Marketplace:** listings are described and sorted with large language models (LLMs), and sellers get an Activity score.
- **LLMs** also translate and summarise on request (the policy says the text is not stored), check custom @nostrich.org names, describe public content such as custom emoji, and write a bot's replies to public notes.
- **Images** may go through an image optimisation service run for Nostrich.
- **Push notifications** use Apple's and Google's services and store registration data, including a one-way hash of muted keys.
- **Server logs** may record IP addresses and similar technical data "for security, reliability and abuse prevention".

## Privacy: what the web app does

Opened as a first-time visitor, with nothing clicked, for 8 seconds:

- **No analytics or advertising trackers were seen.** One first-party cookie (`nostrich_lang`) and 17 entries in the browser's storage, all named `nostrich:`.
- **The browser contacted 35 other sites**, nearly all of them hosting profile pictures and media of people in the feed (for example `pbs.twimg.com`, `i.nostr.build`, `blossom.primal.net`, `files.catbox.moe`). Each of these sites receives the visitor's IP address.
- **WebSocket connections to 8 Nostr services:** relay.primal.net, relay.damus.io, nos.lol, nostr.mom, nostr.oxtr.dev, nostr.bitcoiner.social, directory.yabu.me and profiles.nostr1.com.
- **Security headers:** no restrictive Content-Security-Policy (only `upgrade-insecure-requests`), no HSTS header on the page; camera and microphone are allowed for the page itself and for `cornychat.com`.

## Where the sources differ

- The Google Play listing says the app collects no data. The privacy policy describes indexes, Activity scores, campaign and payout records, push registrations and server logs. Part of this concerns public Nostr data rather than data taken from the device, which may be why it is not declared in the store; the store label does not mention it either way.
- The stores name RHXO Technology LLC; the privacy policy names RHXO, Inc. (Delaware) as operator.

## What could not be checked

- Whether the apps in the stores are built from the published code (its last commit predates the current versions).
- What the servers actually store and for how long, beyond what the policy says.
- The iPhone app's privacy label (Apple's API does not return it).

## Sources

- Website and policy: https://nostrich.org, https://nostrich.org/privacy (copy of 2026-10-24 in `data/nostrich/`)
- App Store: https://apps.apple.com/us/app/nostrich-nostr-client/id6807898323
- Google Play: https://play.google.com/store/apps/details?id=org.nostrich.app (and its Data safety page)
- Repository: https://github.com/nostrichOS/nostrich-client
- Collected data: `data/nostrich/2026-10-24.json` in the Nostr Scrutiny repository
