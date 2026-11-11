#!/usr/bin/env node
// Prüft das gebaute dist/ gegen die Fakten aus content-facts.json.
// Abhängigkeitsfrei. Aufruf: node scripts/content_truth.mjs [dist]
import { readFileSync, existsSync, readdirSync, statSync } from 'node:fs';
import { join, extname } from 'node:path';

const DIST = process.argv[2] || 'dist';
const FACTS_FILE = 'content-facts.json';

if (!existsSync(DIST)) {
  console.error(`❌ ${DIST}/ fehlt — zuerst "npm run build"`);
  process.exit(1);
}
if (!existsSync(FACTS_FILE)) {
  console.error(`❌ ${FACTS_FILE} fehlt`);
  process.exit(1);
}

const facts = JSON.parse(readFileSync(FACTS_FILE, 'utf-8'));
const errors = [];

function pages(dir, out = []) {
  for (const e of readdirSync(dir)) {
    const p = join(dir, e);
    const s = statSync(p);
    if (s.isDirectory()) pages(p, out);
    else if (extname(p) === '.html') out.push(p);
  }
  return out;
}

const text = (file) => {
  const html = readFileSync(file, 'utf-8');
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&nbsp;/g, ' ')
    .replace(/\s+/g, ' ');
};

/** Findet die Datei zu einer Route ("/ueber-uns/" → dist/ueber-uns/index.html) */
function routeFile(route) {
  const candidates = [
    join(DIST, route, 'index.html'),
    join(DIST, route + '.html'),
    join(DIST, route, 'index.html'.slice(0, 0) || 'index.html'),
  ];
  return candidates.find((c) => existsSync(c)) || null;
}

const all = pages(DIST);

// 1) Ausgeschiedene Personen dürfen nirgends stehen
// Wortgrenzen + Groß/Klein-Unterscheidung: "Anna" darf nicht in "Annahme" anschlagen
const departedPatterns = (facts.departed || []).map((name) => ({
  name,
  re: new RegExp(`(^|[^\\p{L}])${name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}([^\\p{L}]|$)`, 'u'),
}));
for (const page of all) {
  const t = text(page);
  for (const { name, re } of departedPatterns) {
    if (re.test(t)) {
      errors.push(`${page.replace(DIST, '')}: enthält ausgeschiedene Person "${name}"`);
    }
  }
}

// 2) Trainerzahl
const teamFile = routeFile(facts.teamPage || '/ueber-uns/');
if (!teamFile) {
  errors.push(`Teamseite ${facts.teamPage} nicht in dist/ gefunden`);
} else {
  const m = text(teamFile).match(/Team aus\s+(\d+)/);
  if (!m) errors.push(`${facts.teamPage}: Angabe "Team aus N" nicht gefunden`);
  else if (Number(m[1]) !== facts.trainerCount) {
    errors.push(`${facts.teamPage}: "Team aus ${m[1]}" — erwartet ${facts.trainerCount}`);
  }
}

// 3) Kommende Workshops
const wsFile = routeFile(facts.workshopPage || '/workshops/');
if (!wsFile) errors.push(`Workshop-Seite ${facts.workshopPage} fehlt`);
else {
  const t = text(wsFile);
  for (const s of facts.upcomingWorkshopTexts || []) {
    if (!t.includes(s)) errors.push(`${facts.workshopPage}: Workshop-Text "${s}" fehlt`);
  }
}

// 4) Preise
const cFile = routeFile(facts.coursePage || '/kurse/');
if (!cFile) errors.push(`Kursseite ${facts.coursePage} fehlt`);
else {
  const t = text(cFile);
  for (const s of facts.priceTexts || []) {
    if (!t.includes(s)) errors.push(`${facts.coursePage}: Preis "${s}" fehlt`);
  }
}

// 5) Veraltete Kursstart-Werbung (Fehlerklasse aus der Vergangenheit)
for (const page of all) {
  const t = text(page);
  const m = t.match(/Kursstart[^.]{0,60}/i);
  if (m && !/jederzeit/i.test(m[0])) {
    errors.push(`${page.replace(DIST, '')}: "Kursstart"-Werbung gefunden — Kurse laufen ohne festen Start`);
  }
}

if (errors.length) {
  console.error('❌ Content-Truth-Check:');
  for (const e of errors) console.error('   -', e);
  console.error(`\n${errors.length} Befund(e). Quelle der Wahrheit: ${FACTS_FILE} (aus dem Vault pflegen).`);
  process.exit(1);
}

console.log(`✅ Content-Truth ok: ${facts.trainerCount} Trainer, ${(facts.departed || []).length} ausgeschiedene Personen nicht auffindbar, ${(facts.upcomingWorkshopTexts || []).length} Workshop-/${(facts.priceTexts || []).length} Preistexte vorhanden`);
