# 👥 Mitglieder-Verwaltung – Anleitung für den Vorstand

> **Diese Anleitung beschreibt, wie du Mitglieder hinzufügst, änderst oder entfernst.**

## 🛡️ Datenschutz-Hinweis (bitte zuerst lesen!)

Mitgliederdaten sind **streng vertraulich**. Befolge diese Regeln:

- ⚠️ **Klarnamen NIEMALS** ins Git-Repo committen!
- ⚠️ Klarnamen-Zuordnung nur in einer **separaten, nicht-öffentlichen** Datei (Excel/CSV auf deinem Rechner)
- ✅ Webseite zeigt **nur anonymisierte IDs** (z.B. `M-001`, `M-002`)
- ✅ Vorstands-Tabellen mit Klarnamen lokal aufbewahren, nie pushen
- ✅ Bei Austritt sofort den `membershipStatus` auf `inactive` setzen

---

## ➕ Neues Mitglied hinzufügen

### Schritt 1: Mitglieds-ID vergeben

Verwende eine **anonymisierte, fortlaufende ID**, z.B. `M-042`. Die ID darf **keine Rückschlüsse auf die Person** zulassen (also kein Name, kein Geburtsdatum).

> 💡 **Tipp:** Excel-Tabelle führen mit `M-XXX` ↔ Klarname (privat, nicht im Repo!)

### Schritt 2: Hash generieren

Im Terminal:

```bash
cd ~/Projects/idiomadanza
./scripts/generate-hash.sh "M-042"
```

**Output:**

```
✓ Neues Mitglied:
  ID:   M-042
  Hash: 65a7b3f2

JSON-Eintrag (in src/data/members.json hinzufügen):
{
  "id": "M-042",
  "hash": "65a7b3f2",
  "membershipStatus": "active"
}
```

### Schritt 3: JSON-Datei bearbeiten

Datei `src/data/members.json` öffnen und den neuen Eintrag **vor dem schließenden `]` einfügen**:

```json
[
  ...bestehende Einträge...,
  {
    "id": "M-042",
    "hash": "65a7b3f2",
    "membershipStatus": "active"
  }
]
```

> ⚠️ **Wichtig:** Vor dem letzten Eintrag **Komma** nicht vergessen!

### Schritt 4: QR-Code erzeugen

Nach dem Deploy ist das Mitglied automatisch auf `https://idiomadanza.de/members` sichtbar. Dort:

1. Browser öffnen → `https://idiomadanza.de/members`
2. Neue Mitgliederkarte suchen
3. QR-Code mit **Rechtsklick → Bild speichern** herunterladen

> 🎯 **Optional:** Du kannst den QR-Code auch mit [qrcode-monkey.com](https://www.qrcode-monkey.com) erzeugen, wenn du die URL direkt brauchst: `https://idiomadanza.de/verify?hash=65a7b3f2`

### Schritt 5: Karte ausdrucken

Empfohlenes Format: **Scheckkartengröße 85×55 mm** mit:

- Vereins-Logo
- "Mitglied M-042" (kein Name!)
- QR-Code (groß, scannbar)
- Hash in Klarschrift (Backup)
- Optional: Status-Badge

### Schritt 6: Deployen

```bash
git add src/data/members.json
git commit -m "feat: add member M-042"
git push
```

Nach ca. 2 Minuten ist die neue Karte live.

---

## 🔄 Status ändern

### Beitragsrückstand (gelb)

```json
{
  "id": "M-042",
  "hash": "65a7b3f2",
  "membershipStatus": "warning"   // ← active → warning
}
```

### Mahnung zurückgezogen (wieder grün)

```json
{
  "id": "M-042",
  "hash": "65a7b3f2",
  "membershipStatus": "active"    // ← warning → active
}
```

### Austritt / Kündigung

```json
{
  "id": "M-042",
  "hash": "65a7b3f2",
  "membershipStatus": "inactive"  // ← active → inactive
}
```

> ⚠️ Bei `inactive` wird das Mitglied **nicht mehr auf `/members` angezeigt**, aber der Hash bleibt im System → Trainer bekommen beim Scannen **rot** mit Hinweis "Mitglied M-042 ist nicht mehr aktiv".

**Wirkung:**

| Status | `/members` sichtbar | Trainer-Scan zeigt |
|--------|---------------------|---------------------|
| `active` | ✅ Ja | 🟢 **Grün** – "Zugang gewährt" |
| `warning` | ✅ Ja | 🟡 **Gelb** – "Hinweis: Vorstand informieren" |
| `inactive` | ❌ Nein | 🔴 **Rot** – "Nicht mehr aktiv" |
| Hash unbekannt | — | 🔴 **Rot** – "Unbekannt" |

---

## 🗑️ Mitglied komplett entfernen

Falls ein Mitglied **komplett aus dem System verschwinden** soll (Hash nicht mehr gültig):

### Option A: Inaktiv setzen (empfohlen)

Siehe oben — Mitglied bleibt im JSON, aber Status `inactive`. Vorteil: Historie bleibt nachvollziehbar.

### Option B: Komplett löschen

Eintrag aus `src/data/members.json` entfernen. Der Hash ist dann **weltweit unbekannt** → Trainer bekommen **rot** mit "Hash XXX ist im System nicht hinterlegt".

```bash
# Eintrag aus Array entfernen, dann:
git add src/data/members.json
git commit -m "chore: remove member M-042 (ausgetreten zum 31.12.2026)"
git push
```

---

## 🔁 Hash erneuern (bei Karten-Verlust)

Falls ein Mitglied seine Karte verliert:

1. **Alte ID stilllegen** → Status auf `inactive`
2. **Neue ID vergeben** → z.B. `M-099` (frischer Hash)
3. **Neue Karte drucken**

```bash
./scripts/generate-hash.sh "M-099"
```

> 💡 So bleibt der alte Hash ungültig, falls jemand die verlorene Karte findet.

---

## 🧪 Verifizierung testen

Nach jeder Änderung kannst du lokal testen:

```bash
# Dev-Server starten
npm run dev

# Im Browser öffnen:
http://127.0.0.1:4321/verify?hash=65a7b3f2   # sollte grün sein
http://127.0.0.1:4321/members                # sollte Karte zeigen
```

**Im Live-System (nach Push):**

```
https://idiomadanza.de/verify?hash=65a7b3f2
https://idiomadanza.de/members
```

---

## 📊 Komplett-Workflow Cheat-Sheet

| Aktion | Schritte |
|--------|----------|
| **Neues Mitglied** | ID wählen → `./scripts/generate-hash.sh` → JSON editieren → pushen → Karte drucken |
| **Status ändern** | JSON editieren → pushen → wirkt sofort |
| **Austritt** | Status auf `inactive` setzen → pushen |
| **Karte verloren** | Alte ID inaktiv → neue ID vergeben → pushen |
| **Komplett löschen** | JSON-Eintrag entfernen → pushen |

---

## ⚠️ Häufige Fehler vermeiden

| Fehler | Folge | Lösung |
|--------|-------|--------|
| Komma nach letztem Eintrag vergessen | JSON kaputt, Build fail | Vor dem letzten Eintrag **kein** Komma |
| Klammer vergessen | JSON-Fehler | Mit Online-Validator prüfen (z.B. jsonlint.com) |
| Klarname ins JSON geschrieben | DSGVO-Verstoß! | Sofort revert + aus Git-History entfernen |
| Doppelte ID | Hash-Konflikt | IDs müssen unique sein |
| Push vergessen | Karte nicht live | Nach JSON-Edit immer `git push` |

---

## 🆘 Hilfe & Support

Bei Fragen:
- Vorstand kontaktieren
- GitHub Issue erstellen
- Code-Review mit Patricia/Stephan

---

**Letzte Aktualisierung:** Sprint 4 (Members System)
**Maintainer:** Idiomadanza e.V. Vorstand