#!/usr/bin/env bash
# Builds the site and publishes it through the Caddy of a relay deployment (nostr-relay-khatru), like Quill and the chat:
#   ./scripts/deploy.sh <path-to-relay-repo> <domain>
# It copies site/ to <relay-repo>/sites/scrutiny/, writes <relay-repo>/sites/scrutiny.caddy, validates the whole Caddy configuration and only then
# reloads it. If validation fails nothing is reloaded and the previous files are restored.
set -euo pipefail
cd "$(dirname "$0")/.."
RELAY_REPO="${1:?usage: deploy.sh <path-to-relay-repo> <domain>}"
DOMAIN="${2:?usage: deploy.sh <path-to-relay-repo> <domain>}"
[[ "$DOMAIN" =~ ^[A-Za-z0-9.-]+$ ]] || { echo "invalid domain" >&2; exit 1; }
[[ -d "$RELAY_REPO/sites" ]] || { echo "$RELAY_REPO/sites does not exist: is that the relay repo?" >&2; exit 1; }
npm run build
BACKUP="$(mktemp -d)"; trap 'rm -rf "$BACKUP"' EXIT
[[ -d "$RELAY_REPO/sites/scrutiny" ]] && cp -a "$RELAY_REPO/sites/scrutiny" "$BACKUP/scrutiny"
[[ -f "$RELAY_REPO/sites/scrutiny.caddy" ]] && cp -a "$RELAY_REPO/sites/scrutiny.caddy" "$BACKUP/scrutiny.caddy"
mkdir -p "$RELAY_REPO/sites/scrutiny"
rsync -a --delete site/ "$RELAY_REPO/sites/scrutiny/"
sed -e "s#__DOMAIN__#$DOMAIN#" deploy/scrutiny.caddy.template > "$RELAY_REPO/sites/scrutiny.caddy"
restore() {
  echo "validation failed: restoring the previous files, nothing was reloaded" >&2
  rm -rf "$RELAY_REPO/sites/scrutiny" "$RELAY_REPO/sites/scrutiny.caddy"
  [[ -d "$BACKUP/scrutiny" ]] && cp -a "$BACKUP/scrutiny" "$RELAY_REPO/sites/scrutiny"
  [[ -f "$BACKUP/scrutiny.caddy" ]] && cp -a "$BACKUP/scrutiny.caddy" "$RELAY_REPO/sites/scrutiny.caddy"
  exit 1
}
cd "$RELAY_REPO"
docker compose exec -T caddy caddy validate --config /etc/caddy/Caddyfile || restore
docker compose exec -T caddy caddy reload --config /etc/caddy/Caddyfile
echo "published: https://$DOMAIN"
