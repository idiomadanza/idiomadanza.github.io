#!/usr/bin/env node
// Struktur-Prüfung für dist/ — abhängigkeitsfrei, läuft lokal und in der CI.
// Aufruf: node scripts/ci_check.mjs [dist-verzeichnis]
import { readFileSync, existsSync, readdirSync, statSync } from 'node:fs';
import { join, extname } from 'node:path';

const DIST = process.argv[2] || 'dist';
const errors = [];
const warnings = [];

if (!existsSync(DIST)) {
  console.error(`❌ ${DIST}/ fehlt — zuerst "npm run build"`);
  process.exit(1);
}

// 1) Pflichtdateien
const REQUIRED = [
  'index.html',
  'robots.txt',
  'sitemap-index.xml',
  'images/og-default.png',
  'favicon.ico',
];
for (const f of REQUIRED) {
  if (!existsSync(join(DIST, f))) errors.push(`Pflichtdatei fehlt: ${f}`);
}

// 2) Alle HTML-Seiten sammeln
function walk(dir, out = []) {
  for (const e of readdirSync(dir)) {
    const p = join(dir, e);
    const s = statSync(p);
    if (s.isDirectory()) walk(p, out);
    else if (extname(p) === '.html') out.push(p);
  }
  return out;
}
const pages = walk(DIST);
if (!pages.length) errors.push('Keine HTML-Seiten in dist/ gefunden');

// 3) Inline-Skripte (CSP: script-src 'self')
let inlineScripts = 0;
let noindexPages = 0;
let externalOk = 0;
for (const page of pages) {
  const html = readFileSync(page, 'utf-8');
  const scripts = html.match(/<script\b[^>]*>/gi) || [];
  for (const tag of scripts) {
    const isJsonLd = /type="application\/ld\+json"/i.test(tag);
    const hasSrc = /\bsrc=/i.test(tag);
    if (isJsonLd) continue;
    if (hasSrc) externalOk++;
    else {
      inlineScripts++;
      errors.push(`Inline-<script> ohne src in ${page.replace(DIST, '')} — von der CSP blockiert`);
    }
  }

  const rel = page.replace(DIST, '') || '/';
  const noindex = /<meta\s+name="robots"[^>]*noindex/i.test(html);
  if (noindex) {
    noindexPages++;
  } else {
    if (!/rel="canonical"/i.test(html)) errors.push(`rel="canonical" fehlt: ${rel}`);
    if (!/property="og:image"/i.test(html)) errors.push(`og:image fehlt: ${rel}`);
  }
  const og = html.match(/property="og:image"\s+content="([^"]+)"/i);
  if (og) {
    const path = og[1].replace(/^https?:\/\/[^/]+/, '');
    if (path.startsWith('/') && !existsSync(join(DIST, decodeURIComponent(path)))) {
      errors.push(`og:image zeigt auf fehlende Datei: ${path} (${rel})`);
    }
  }
}

// 4) Interne Links
const missing = new Set();
for (const page of pages) {
  const html = readFileSync(page, 'utf-8');
  for (const m of html.matchAll(/href="(\/[^"#?]*)"/g)) {
    const href = m[1];
    if (extname(href)) {
      if (!existsSync(join(DIST, href))) missing.add(href);
      continue;
    }
    const candidates = [
      join(DIST, href, 'index.html'),
      join(DIST, href),
      join(DIST, href + '.html'),
    ];
    if (!candidates.some((c) => existsSync(c))) missing.add(href);
  }
}
for (const m of missing) errors.push(`Interner Link ohne Ziel in dist/: ${m}`);

// 5) Bericht
console.log(`Geprüft: ${pages.length} Seiten (${noindexPages} noindex), ${externalOk} externe Skripte, ${inlineScripts} Inline-Skripte`);
if (warnings.length) warnings.forEach((w) => console.log(`⚠️  ${w}`));
if (errors.length) {
  errors.forEach((e) => console.log(`❌ ${e}`));
  console.log(`\n${errors.length} Fehler`);
  process.exit(1);
}
console.log('✅ Alle Struktur-Prüfungen bestanden');
