# 👨‍🏫 Trainer-Management – Anleitung für Vorstand & Trainer

> **Diese Anleitung beschreibt die Planung, Status-Updates und Abrechnung von Trainern.**

## 🎯 Überblick

Das Trainer-System hat **drei Seiten** und **zwei Daten-Dateien**:

| Datei | Zweck |
|-------|-------|
| `/trainer-plan` | **Öffentlich** – zeigt alle kommenden und vergangenen Trainings |
| `/trainer-check` | **Token-geschützt** – Vorstand und Trainer verwalten Status |
| `src/data/trainers.json` | Trainer-Stammdaten (ID, Stundensatz) |
| `src/data/schedule.json` | Alle Trainings-Einträge |

## 🛡️ Datenschutz

- ⚠️ **Klarnamen NIEMALS ins Git-Repo committen!**
- ✅ Klarnamen-Zuordnung nur in **lokaler Excel/CSV** beim Vorstand
- ✅ Webseite zeigt nur **anonymisierte Trainer-IDs** (T-001, T-002)
- ✅ Token für `/trainer-check` ist geheim (URL-Parameter)

---

## 📊 Drei Status-Stufen

Jeder Training-Eintrag durchläuft drei Status:

```
┌──────────┐    ┌────────────┐    ┌──────────┐
│scheduled │ →  │ performed  │ →  │ complete │
│ (Geplant)│    │ (Gehalten) │    │(Abger.)  │
└──────────┘    └────────────┘    └──────────┘
   Vorstand      Trainer/         Vorstand
   (Planung)     Vorstand         (Abrechnung)
```

| Status | Wer setzt | Wann | Bedeutung |
|--------|-----------|------|-----------|
| `scheduled` | Vorstand | Bei der Planung | Geplant, offen |
| `performed` | Trainer (oder Vorstand) | Nach der Stunde | Stunde wurde gehalten |
| `complete` | Vorstand | Nach Überweisung | Abgerechnet + bezahlt |

> 💡 **Tipp:** Git-Commits sind der Audit-Trail. Jede Status-Änderung ist nachvollziehbar.

---

## ➕ Training planen (Vorstand)

### Schritt 1: `schedule.json` öffnen

```bash
code ~/Projects/idiomadanza/src/data/schedule.json
```

### Schritt 2: Neuen Eintrag hinzufügen

Vor dem schließenden `]` einfügen:

```json
  ,
  {
    "id": "S-042",
    "date": "2026-10-15",
    "time": "20:00",
    "duration": 1.5,
    "course": "Bachata Sensual",
    "level": "Mittelstufe",
    "location": "Fortuna Regensburg",
    "trainerIds": ["T-001"],
    "status": "scheduled",
    "notes": ""
  }
```

> ⚠️ Komma vor dem Eintrag nicht vergessen!

### Schritt 3: Committen + Pushen

```bash
git add src/data/schedule.json
git commit -m "feat: schedule Bachata Sensual 15.10.2026"
git push
```

Nach ca. 2 Minuten ist das Training auf `/trainer-plan` sichtbar.

---

## ✅ Training als "performed" markieren (Trainer)

### Wer kann das?

Der **Trainer selbst** (via `/trainer-check` mit Token) oder der **Vorstand**.

### Schritt 1: Link öffnen

```
https://idiomadanza.de/trainer-check?token=<TOKEN>
```

> 🔐 Token wird vom Vorstand per WhatsApp/E-Mail an Trainer geschickt.

### Schritt 2: Vorstand ändert JSON

Da die Seite read-only ist, muss der Status in `schedule.json` geändert werden:

```diff
  {
    "id": "S-042",
    "date": "2026-10-15",
    ...
-   "status": "scheduled",
+   "status": "performed",
    "notes": ""
  }
```

### Schritt 3: Committen + Pushen

```bash
git add src/data/schedule.json
git commit -m "chore: mark S-042 as performed (15.10.2026)"
git push
```

---

## 💰 Training als "complete" markieren (Vorstand)

### Schritt 1: Stundennachweis prüfen

Auf `/trainer-check?token=XXX` sind alle Trainings gelistet. Vorstand prüft:
- Hat Trainer die Stunde gehalten? (Status `performed`)
- Stimmt die Dauer?
- Wurde der Stundensatz bezahlt?

### Schritt 2: Status in JSON ändern

```diff
  {
    "id": "S-042",
    ...
-   "status": "performed",
+   "status": "complete",
    "notes": "Bezahlt am 20.10.2026, Überweisung"
  }
```

### Schritt 3: Committen + Pushen

```bash
git add src/data/schedule.json
git commit -m "chore: mark S-042 as complete (bezahlt)"
git push
```

---

## 👨‍🏫 Neuen Trainer hinzufügen

### Schritt 1: Trainer-ID vergeben

Fortlaufende ID, z.B. `T-005`. Niemals Klarnamen!

### Schritt 2: `trainers.json` ergänzen

```json
  ,
  {
    "id": "T-005",
    "hourlyRate": 25,
    "active": true
  }
```

### Schritt 3: Klarnamen-Mapping pflegen (privat!)

In **lokaler Excel-Tabelle** (nicht im Repo!):

| Trainer-ID | Klarname | E-Mail | IBAN |
|------------|----------|--------|------|
| T-001 | Vorname Nachname | ... | ... |
| T-002 | ... | ... | ... |

> ⚠️ Diese Datei **niemals** committen!

---

## 📊 Statistiken

`/trainer-check` zeigt automatisch:
- Anzahl `scheduled` (noch ausstehend)
- Anzahl `performed` (gehalten, aber nicht bezahlt)
- Anzahl `complete` (bezahlt)
- **Gesamt-Stunden** der nicht-scheduled Einträge

> 💡 Für die Abrechnung kann man z.B. filtern: "alle `performed` aus Oktober = X Stunden × Stundensatz"

---

## 🔐 Token verwalten

### Token ändern

Datei `src/pages/trainer-check.astro` öffnen:

```typescript
const VALID_TOKEN = "idio-trainer-2026";  // ← hier ändern
```

Build + Push, dann neuen Link teilen.

### Token nur intern halten

- ⚠️ Niemals öffentlich posten (z.B. Social Media)
- ✅ Nur per WhatsApp/E-Mail an berechtigte Trainer teilen
- ✅ Bei Verdacht auf Leak: sofort ändern

---

## 🧪 Workflow Cheat-Sheet

| Aktion | Wer | Schritte |
|--------|-----|----------|
| **Training planen** | Vorstand | JSON editieren → pushen |
| **Training gehalten** | Trainer/Vorstand | JSON: `scheduled` → `performed` → pushen |
| **Training bezahlt** | Vorstand | JSON: `performed` → `complete` → pushen |
| **Trainer hinzufügen** | Vorstand | `trainers.json` ergänzen → pushen |
| **Token ändern** | Vorstand | `trainer-check.astro` editieren → pushen |
| **Klarnamen nachschlagen** | Vorstand | Lokale Excel-Tabelle (nicht im Repo) |

---

## ⚠️ Häufige Fehler

| Fehler | Folge | Lösung |
|--------|-------|--------|
| Komma im JSON vergessen | Build fail | Vor letzten Eintrag **kein** Komma |
| Klarname in `trainers.json` | DSGVO-Verstoß | Sofort revert + aus History entfernen |
| Token in Git committed | Token-Leak | Sofort neuen Token generieren |
| Status ohne Push geändert | Vorstand und Trainer sehen unterschiedliches | Immer pushen nach JSON-Edit |

---

## 🆘 Hilfe

Bei Fragen:
- Vorstand kontaktieren
- GitHub Issue erstellen

---

**Letzte Aktualisierung:** Sprint 5 (Trainer-Management)
**Maintainer:** Idiomadanza e.V. Vorstand