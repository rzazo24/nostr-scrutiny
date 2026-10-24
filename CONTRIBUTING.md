# Adding or updating a client

1. **Describe where to look** in `clients/<client>.json`:

   ```json
   {
     "name": "Example",
     "website": "https://example.app",
     "appStore": "1234567890",
     "play": "com.example.app",
     "repo": "owner/repository",
     "privacyPolicy": "https://example.app/privacy"
   }
   ```

   Only `name` is required; leave out what does not exist. `appStore` is the number in the App Store link (`…/id1234567890`); `play` is the `id=` of the Google Play link. `nip89Pubkey` can name the key of the app's NIP-89 announcement if it is not found by name.

2. **Collect:** `npm run collect <client>`. It writes `data/<client>/<date>.json` (and the privacy policy word for word next to it). Look at it: a store page that changed its layout shows up as missing fields.

3. **Look at the code** the collectors cannot judge: where keys are stored, which signers are supported (NIP-46, NIP-55, NIP-07), analytics, crash reporting and push libraries. Note the file that shows each fact.

4. **Write `sheets/<client>.md`** following [METHOD.md](METHOD.md) and an existing sheet: the same sections, every claim linked to its source, a section on what could not be checked, no street addresses or phone numbers.

5. **Check:** `npm test` (the sheet follows the method, the site builds without scripts or external resources), then `npm run build` and open `site/`.

Corrections to an existing sheet follow the same steps: collect again, change what the new data shows, and the sheet gets the new date.
