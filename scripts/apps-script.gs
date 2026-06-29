// Google Apps Script – Trainer-Submission Handler
//
// ANLEITUNG:
// 1. Öffne deine Google Sheet (z.B. "Idiomadanza Trainer-Einträge")
// 2. Klicke auf "Erweiterungen" → "Apps Script"
// 3. Lösche den Inhalt des Code-Editors
// 4. Kopiere diesen Code komplett rein
// 5. Speichere (Strg+S / Cmd+S)
// 6. Klicke "Bereitstellen" → "Neue Bereitstellung"
//    - Typ: "Web-App"
//    - Ausführen als: "Ich" (dein Account)
//    - Zugriff: "Jeder" (wichtig! sonst funktioniert es nicht)
// 7. Klicke "Bereitstellen"
// 8. Kopiere die angezeigte Web-App-URL
// 9. Trage sie in netlify.toml als PUBLIC_TRAINER_FORM_URL ein
//    oder als Astro-Env-Variable

const SHEET_NAME = 'Trainer-Einträge'; // Name des Tabs (anpassen falls anders)

// POST-Handler: nimmt JSON-Payload entgegen und schreibt in Sheet
function doPost(e) {
  try {
    // CORS Preflight abfangen
    if (e.postData == null) {
      return jsonResponse({ ok: false, error: 'No POST data' }, 400);
    }

    // JSON parsen
    const data = JSON.parse(e.postData.contents);

    // Validierung: Pflichtfelder
    const required = ['trainerId', 'date', 'time', 'duration', 'course', 'status'];
    for (const field of required) {
      if (!data[field] && data[field] !== 0) {
        return jsonResponse({ ok: false, error: `Missing field: ${field}` }, 400);
      }
    }

    // Sheet öffnen oder erstellen
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    let sheet = ss.getSheetByName(SHEET_NAME);
    if (!sheet) {
      sheet = ss.insertSheet(SHEET_NAME);
      // Header-Zeile hinzufügen
      sheet.appendRow([
        'Timestamp',
        'Trainer-ID',
        'Datum',
        'Zeit',
        'Dauer (h)',
        'Kurs',
        'Level',
        'Ort',
        'Status',
        'Notizen',
        'Source-IP',
      ]);
      // Header stylen
      sheet.getRange(1, 1, 1, 11).setFontWeight('bold').setBackground('#8b5cf6').setFontColor('#ffffff');
      sheet.setFrozenRows(1);
    }

    // Eintrag hinzufügen
    const timestamp = new Date().toISOString();
    const sourceIp = e.parameter && e.parameter.userIp ? e.parameter.userIp : 'unknown';

    sheet.appendRow([
      timestamp,
      data.trainerId,
      data.date,
      data.time,
      data.duration,
      data.course,
      data.level || '',
      data.location || 'Fortuna Regensburg',
      data.status,
      data.notes || '',
      sourceIp,
    ]);

    // Optional: Auto-Resize Spalten
    sheet.autoResizeColumns(1, 11);

    // Erfolg zurückgeben (mit CORS)
    return jsonResponse({
      ok: true,
      message: 'Eintrag erfolgreich gespeichert',
      row: sheet.getLastRow(),
    });
  } catch (err) {
    return jsonResponse({ ok: false, error: String(err) }, 500);
  }
}

// CORS-Headers für Antworten
function jsonResponse(data, status) {
  const output = ContentService.createTextOutput(JSON.stringify(data));
  output.setMimeType(ContentService.MimeType.JSON);
  // Hinweis: Apps Script erlaubt keine custom CORS-Headers bei Web Apps,
  // aber das Standard-Verhalten ist bereits CORS-freundlich für POST.
  return output;
}

// Optional: GET-Handler für Health-Check
function doGet(e) {
  return jsonResponse({
    ok: true,
    service: 'Idiomadanza Trainer-Form',
    sheet: SHEET_NAME,
    timestamp: new Date().toISOString(),
  });
}