#!/bin/bash
# generate-hash.sh - Generiert einen SHA-512 Hash (8 Zeichen) für ein neues Mitglied
# Nutzung: ./scripts/generate-hash.sh "max-mustermann"

if [ -z "$1" ]; then
  echo "❌ Nutzung: $0 <slug>"
  echo "   Beispiel: $0 max-mustermann"
  exit 1
fi

SLUG="$1"
HASH=$(echo -n "$SLUG" | shasum -a 512 | cut -c1-8)

echo ""
echo "✓ Neues Mitglied:"
echo "  Slug: $SLUG"
echo "  Hash: $HASH"
echo ""
echo "JSON-Eintrag (in src/data/members.json hinzufügen):"
cat <<EOF
{
  "id": "$SLUG",
  "name": "<VORNAME NACHNAME>",
  "hash": "$HASH",
  "membershipStatus": "active"
}
EOF