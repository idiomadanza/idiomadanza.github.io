#!/bin/bash
# generate-hash.sh - Generiert einen SHA-512 Hash (8 Zeichen) für eine neue Mitglieds-ID
# Nutzung: ./scripts/generate-hash.sh "M-042"
#
# Datenschutz-Hinweis: Die ID sollte KEINE Rückschlüsse auf die Person zulassen.
# Empfehlung: Durchnummerierte IDs (M-001, M-002, ...) oder zufällige Strings.

if [ -z "$1" ]; then
  echo "❌ Nutzung: $0 <mitglieds-id>"
  echo "   Beispiel: $0 M-042"
  echo ""
  echo "⚠️  Datenschutz: Verwende eine zufällige/anonymisierte ID, KEINEN Namen!"
  exit 1
fi

ID="$1"
HASH=$(echo -n "$ID" | shasum -a 512 | cut -c1-8)

echo ""
echo "✓ Neues Mitglied:"
echo "  ID:   $ID"
echo "  Hash: $HASH"
echo ""
echo "JSON-Eintrag (in src/data/members.json hinzufügen):"
cat <<EOF
{
  "id": "$ID",
  "hash": "$HASH",
  "membershipStatus": "active"
}
EOF