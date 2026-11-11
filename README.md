# Idiomadanza e.V. — Website

Statische Website des Tanzsportvereins **Idiomadanza e.V.** (Bachata & Salsa, Regensburg):
Astro 6 mit Static Site Generation, deployt über Netlify auf **https://idiomadanza.de**.

## Fakten

| | |
|---|---|
| **Framework** | Astro 6.4 (`astro@^6.4.8`), SSG — alle Seiten werden als HTML gebaut |
| **Styling** | Tailwind CSS **v4** über `@tailwindcss/vite`; Tokens im `@theme`-Block von `src/styles/global.css` |
| **Node** | **22** (`engines: >=22`, `.nvmrc`, `netlify.toml`) |
| **Deploy** | Netlify, `publish = dist`, `NODE_VERSION=22` — keine GitHub-Action für das Deployment |
| **Hauptzweig** | **`production`** (geschützt: PR-Pflicht, 1 Approval, grüne Checks, kein Force-Push) |
| **Repo** | `https://github.com/idiomadanza/idiomadanza.github.io` (öffentlich) |

⚠️ **Merge = Deploy.** Ein Merge nach `production` wird von Netlify sofort live gebaut. Es gibt keine Staging-Stufe; der Deploy-Preview des PRs ist die Vorschau.

## Entwicklung

```bash
git clone https://github.com/idiomadanza/idiomadanza.github.io.git
cd idiomadanza.github.io
npm ci --no-fund --no-audit   # Lockfile-exakt; niemals "npm install"
npm run dev                   # http://localhost:4321
npm run build                 # erzeugt dist/ — muss grün sein
npm run preview               # gebauten Stand lokal ansehen
```

`npm ci` statt `npm install` ist Absicht: `.npmrc` setzt `ignore-scripts=true`, exakte Pins und `save-exact`. Neue Abhängigkeiten brauchen eine eigene Freigabe.

## Struktur

```
src/
  pages/          Routen: /, /kurse, /workshops, /ueber-uns, /mitglied-werden,
                  /kontakt, /blog, /schedule, /satzung, /vereinsordnung,
                  /datenschutz, /impressum, /cookie-richtlinie, /tv (Signage, noindex)
  layouts/        Layout.astro — Head, Meta/OG, JSON-LD, Navigation, Footer
  components/     UI-Bausteine (ui/, FAQAccordion, CookieBanner, SafeMail …)
  content/        Content Collections: team/, workshops/, blog/, testimonials/
  styles/         global.css — Design-Tokens (einzige Quelle für Farben/Typo)
  data/           schedule/course-Daten
public/           statische Dateien (favicon-Set, logo.png, og-default.png, robots.txt, llms.txt)
netlify.toml      Header (CSP, HSTS, Permissions-Policy), Cache-Regeln
DESIGN.md         verbindliches Design-System (schlägt BLUEPRINT.md §5)
```

## Qualitätssicherung

Jeder PR gegen `production` läuft durch `.github/workflows/ci.yml`:

1. `npm ci` → `npm run build` (18 Seiten)
2. `node scripts/ci_check.mjs` — Pflichtdateien in `dist/`, **keine Inline-Skripte** (die CSP erlaubt nur `script-src 'self'`), `canonical`/`og:image` je Seite inkl. Existenzprüfung des Bildes, alle internen Links müssen ein Ziel haben
3. `npm audit --audit-level=high` (derzeit nur Report — offene Critical-Meldung, siehe Issue #116)

Zusätzlich manuell auf dem Agenten-Host: `/opt/website/tools/csp_check.mjs` (Playwright, prüft alle Routen gegen die echte CSP) und Lighthouse.

## Ablauf für Änderungen

1. Issue anlegen (Befund, Auswirkung, Abnahmekriterium)
2. Branch vom aktuellen `production`, Worktree pro Aufgabe
3. Ändern → `npm run build` grün → committen → pushen → PR mit `Closes #<issue>`
4. Abnahme (Screenshots, Lighthouse, Inhalt gegen `SecondBrain`-Vault) → Approval → Squash-Merge
5. Nach dem Merge: Live-Gegenprobe auf https://idiomadanza.de

## Inhaltliche Wahrheit

Kursdaten, Termine, Trainer und Preise stammen aus dem Vault (`/opt/SecondBrain`), nicht aus dem Kopf. Erfundene oder veraltete Angaben auf einer öffentlichen Vereinsseite sind ein Reputationsrisiko.

## Kontakt

Idiomadanza e.V. · Isarstr. 85 · 93057 Regensburg · www.idiomadanza.de
