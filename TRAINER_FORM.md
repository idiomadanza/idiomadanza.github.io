# 📝 Trainer-Formular – Setup-Anleitung (Vorstand)

> **Diese Anleitung beschreibt, wie du Google Sheets + Apps Script einrichtest, damit das Trainer-Formular funktioniert.**

## 🎯 Was du brauchst

- ✅ Google-Konto (z.B. dein privates oder `vorstand@idiomadanza.de`)
- ✅ 15 Minuten Setup-Zeit

## 📋 Schritt 1: Google Sheet erstellen

1. Gehe zu [sheets.google.com](https://sheets.google.com)
2. Klicke **+ Blank** (neue Tabelle)
3. Benenne die Tabelle: **"Idiomadanza Trainer-Einträge"**
4. Benenne den ersten Tab unten: **"Trainer-Einträge"** (genau so, wichtig!)

## 📝 Schritt 2: Apps Script einrichten

1. In der Google Sheet: Menü **"Erweiterungen"** → **"Apps Script"**
2. Es öffnet sich ein neuer Tab mit dem Code-Editor
3. **Lösche den gesamten Inhalt** des Editors
4. **Kopiere den Code** aus `scripts/apps-script.gs` (im Repo) komplett rein
5. Klicke oben auf das Diskettensymbol 💾 zum Speichern
6. Gib dem Projekt einen Namen: **"Idiomadanza Trainer-Submit"**

## 🚀 Schritt 3: Als Web App bereitstellen

1. Klicke oben rechts auf **"Bereitstellen"** → **"Neue Bereitstellung"**
2. Klicke auf das **Zahnrad-Symbol** neben "Typ auswählen"
3. Wähle **"Web-App"**
4. Konfiguration:
   - **Beschreibung**: "Trainer-Submit Handler v1"
   - **Skript ausführen als**: **"Ich"** (dein Google-Account)
   - **Zugriff**: **"Jeder"** ← WICHTIG! Sonst funktioniert das Formular nicht
5. Klicke **"Bereitstellen"**
6. Google fragt nach Berechtigungen:
   - Klicke **"Zugriff autorisieren"**
   - Wähle deinen Google-Account
   - Klicke **"Erweiterte Einstellungen"** → **"Gehe zu Idiomadanza Trainer-Submit (unsicher)"**
   - Klicke **"Zulassen"**
7. **Kopiere die angezeigte Web-App-URL** — sie sieht so aus:
   ```
   https://script.google.com/macros/s/AKfycbx.../exec
   ```

## 🔐 Schritt 4: URL in Netlify eintragen

1. Gehe zu [app.netlify.com](https://app.netlify.com)
2. Wähle deine Idiomadanza-Site
3. **Site Settings** → **Environment Variables** (linke Sidebar)
4. Klicke **"Add a variable"**
5. Konfiguration:
   - **Key**: `PUBLIC_TRAINER_FORM_URL`
   - **Value**: Die kopierte Web-App-URL aus Schritt 3
   - **Scopes**: Production, Deploy Previews (beide an)
6. Klicke **"Save"**
7. **Wichtig:** Triggere ein neues Deploy! (Site → Deploys → "Trigger deploy" → "Deploy site")

## 🧪 Schritt 5: Testen

1. Öffne `https://idiomadanza.de/trainer-anmeldung`
2. Fülle das Formular aus:
   - Trainer-ID: T-001
   - Datum: heute
   - Status: scheduled
3. Klicke **"Eintrag absenden"**
4. Du solltest grünes ✓ sehen: "Eingetragen"
5. Gehe zu deiner Google Sheet — der Eintrag sollte da sein! 🎉

## 📊 Sheet-Struktur

Deine Sheet hat folgende Spalten (automatisch erstellt):

| Spalte | Inhalt | Beispiel |
|--------|--------|----------|
| A: Timestamp | ISO-Datum der Übertragung | `2026-09-15T18:42:11.000Z` |
| B: Trainer-ID | Anonymisiert | `T-001` |
| C: Datum | Datum der Stunde | `2026-09-15` |
| D: Zeit | Uhrzeit | `20:00` |
| E: Dauer (h) | Dezimal | `1.5` |
| F: Kurs | Kursname | `Bachata Foundations` |
| G: Level | Optional | `Anfänger` |
| H: Ort | Standard: Fortuna | `Fortuna Regensburg` |
| I: Status | scheduled/performed/complete | `scheduled` |
| J: Notizen | Freitext | `Vertretung` |
| K: Source-IP | Für DSGVO-Audit | `192.0.2.1` |

## 🛡️ Datenschutz-Hinweise

### Was wird übertragen?

- ✅ Anonymisierte Trainer-IDs (`T-001`, nicht "Stephan")
- ✅ Funktionale Daten (Datum, Zeit, Kurs)
- ❌ **Keine Klarnamen**
- ❌ **Keine E-Mail-Adressen**
- ❌ **Keine Telefonnummern**

### Wo liegt das Mapping `T-001 → Klarname`?

**Nur lokal beim Vorstand** (z.B. Excel auf deinem Rechner). Niemals in Google Sheets oder im Git-Repo!

### Audit-Trail

Die `Timestamp` + `Source-IP` Spalten ermöglichen:
- Nachvollziehbarkeit wann etwas eingetragen wurde
- Spam-Erkennung (gleiche IP → gleicher Eintrag in kurzer Zeit)

## 🔄 Wenn etwas schief geht

### Problem: Formular zeigt "Dev-Mode" Banner
→ URL wurde nicht korrekt in Netlify gesetzt. Schritt 4 wiederholen.

### Problem: Eintrag kommt nicht in Sheet an
1. URL nochmal prüfen (beginnt mit `https://script.google.com/macros/s/`)
2. Apps Script Berechtigung "Jeder" prüfen (Schritt 3.4)
3. Browser DevTools öffnen → Network Tab → POST prüfen

### Problem: 404 oder Fehler
1. Apps Script Logs prüfen: Apps Script Editor → "Executions"
2. Sheet-Name prüfen: muss exakt "Trainer-Einträge" heißen
3. Tab in der Sheet umbenennen falls nötig

## 📊 Empfohlene Sheet-Erweiterungen

### Pivot-Tabelle für Abrechnung

Füge eine zweite Sheet hinzu: **"Abrechnung pro Monat"**

```
Monat | Trainer-ID | Stunden | Betrag
Sep 26 | T-001      | 6.0     | 150€
Sep 26 | T-002      | 4.5     | 135€
```

Mit `=SUMIFS()` und `=QUERY()` kannst du das automatisch aus den Roh-Daten generieren.

### Filter / Sortierung

- Klick auf Spalten-Header → Filter aktivieren
- Spalte I (Status) filtern → nur "performed" → abrechnungsfähige Einträge

### Charts

- **Balkendiagramm**: Stunden pro Trainer pro Monat
- **Tortendiagramm**: Kursverteilung

## 🆘 Support

Bei Fragen:
- Schau in die Apps Script Logs: **"Executions"** Tab zeigt alle Submissions
- Browser DevTools → Network Tab zeigt die HTTP-Requests
- Oder frag den Vorstand 😉

---

**Letzte Aktualisierung:** Sprint 6 (Trainer-Form)
**Maintainer:** Idiomadanza e.V. Vorstand