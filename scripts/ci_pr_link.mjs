#!/usr/bin/env node
// Prüft bei Pull-Request-Events, ob der PR-Body ein Issue schließt ("Closes #12").
// Läuft nur in der CI; lokal ohne EVENT-Datei wird übersprungen.
import { readFileSync, existsSync } from 'node:fs';

const path = process.env.GITHUB_EVENT_PATH;
if (!path || !existsSync(path)) {
  console.log('Kein GitHub-Event — Prüfung übersprungen (lokaler Lauf)');
  process.exit(0);
}

const event = JSON.parse(readFileSync(path, 'utf-8'));
if (event.pull_request === undefined) {
  console.log('Kein pull_request-Event — Prüfung übersprungen');
  process.exit(0);
}

const body = event.pull_request.body || '';
const matches = [...body.matchAll(/\b(?:close[sd]?|fix(?:e[sd])?|resolve[sd]?)\s+#(\d+)/gi)];
const numbers = [...new Set(matches.map((m) => m[1]))];

if (!numbers.length) {
  console.error('❌ Der PR-Body nennt kein Issue.');
  console.error('   Erwartet: "Closes #<nummer>" in der ersten Zeile.');
  console.error('   Ohne diese Zeile bleibt das Issue nach dem Merge offen.');
  process.exit(1);
}

console.log(`✅ Issue-Verknüpfung gefunden: #${numbers.join(', #')}`);
