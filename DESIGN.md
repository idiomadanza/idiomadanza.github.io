# DESIGN.md — Idiomadanza Design System

**Status:** verbindlich · **Stand:** 26.10.2026 · **Rang:** Diese Datei schlägt `BLUEPRINT.md` §5 (Design-System), weil sie den **tatsächlich gebauten** Stand abbildet.
**Gegenstück im Vault:** `2-Bereiche/Verein/Website-Design-System.md` (identischer Inhalt).
**Stack:** Astro 6 · Tailwind v4 (`@theme`, keine Config-Datei) · Netlify · Node 22

> **Zweck:** Jede PR entscheidet über Farben, Typo und Abstände — ohne festgeschriebene Tokens
> entscheidet sie anders. Diese Datei ist die Prüfliste. Zahl = gemessen, nicht geschätzt.

---

## 1 · Tokens — der einzige Ort, an dem Werte stehen

**Quelle:** `src/styles/global.css`, Block `@theme`. **Kein anderer Ort** definiert Markenwerte.

### Farben

| Token | Wert | Rolle |
|---|---|---|
| `--color-brand-dark` | `#020617` | Fläche dunkel (Dark-Mode-Basis) |
| `--color-brand-darker` | `#010411` | Fläche dunkler (Footer, Overlays) |
| `--color-brand-light` | `#f8fafc` | Fläche hell (Light-Mode-Basis) |
| `--color-brand-rose` | `#8b5cf6` | Primär — CTAs, Akzente, Links |
| `--color-brand-glow` | `#fcd34d` | Sekundär — nur auf dunkler Fläche |

### Typografie

| Token | Wert |
|---|---|
| `--font-display` | `"Golos Text", "Playfair Display", serif` |
| `--font-sans` | `"Inter", "Golos Text", sans-serif` |

| Token | Wert | Einsatz |
|---|---|---|
| `--text-fluid-sm` | `clamp(0.75rem, 0.7rem + 0.25vw, 1rem)` | Labels, Fußnoten |
| `--text-fluid-base` | `clamp(1rem, 0.95rem + 0.25vw, 1.25rem)` | Fließtext |
| `--text-fluid-lg` | `clamp(1.25rem, 1.15rem + 0.5vw, 1.75rem)` | Zwischentitel |
| `--text-fluid-xl` | `clamp(1.5rem, 1.3rem + 1vw, 2.5rem)` | Abschnittstitel |
| `--text-fluid-2xl` | `clamp(2rem, 1.7rem + 1.5vw, 3.5rem)` | Seitentitel |
| `--text-fluid-display` | `clamp(3rem, 2.5rem + 2.5vw, 6rem)` | Hero |

### Abstände, Form, Effekte

| Token | Wert | Regel |
|---|---|---|
| `--spacing-fluid-gutter` | `clamp(1rem, 5vw, 4rem)` | horizontaler Seitenrand, immer dieser |
| `--spacing-fluid-stack` | `clamp(2rem, 10vw, 8rem)` | vertikaler Abschnittsabstand |
| `--size-touch-target` | `44px` | **Mindestgröße jedes interaktiven Elements** |
| `--shadow-glass` | `0 8px 32px 0 rgba(0,0,0,.37)` | nur über Bildern/Dark |
| `--shadow-glow-rose` | `0 0 15px rgba(139,92,246,.5)` | nur Dark |
| `--shadow-glow-amber` | `0 0 15px rgba(252,211,77,.5)` | nur Dark |

Radius: `1.5rem` für Karten und Flächen. Kein anderer Radius-Wert ohne Änderung dieser Datei.

---

## 2 · Kontrast — gemessene Paare (WCAG 2.2 AA)

| Kombination | Verhältnis | Urteil |
|---|---|---|
| `#020617` Text auf `#f8fafc` | **19,28:1** | ✅ AAA |
| `#f8fafc` Text auf `#020617` | **19,28:1** | ✅ AAA |
| `#fcd34d` auf `#020617` | **13,99:1** | ✅ AAA |
| `#8b5cf6` auf `#020617` | **4,76:1** | ✅ AA Text |
| `#94a3b8` auf `#020617` | **7,87:1** | ✅ AAA |
| `#475569` auf `#f8fafc` | **7,24:1** | ✅ AAA |
| **`#8b5cf6` auf `#f8fafc`** | **4,05:1** | ⚠️ **nur ≥18,7 px fett / ≥24 px** — nicht für Fließtext und kleine Links |
| **`#ffffff` auf `#8b5cf6`** | **4,23:1** | ⚠️ **knapp unter 4,5** — nur für ≥18,7 px fett zulässig |
| **`#fcd34d` auf `#f8fafc`** | **1,38:1** | ❌ **verboten** — Glow ist ausschließlich Dark-Fläche |

### Daraus folgen drei harte Regeln

1. **Kleiner Text in Rose auf heller Fläche braucht `#7c3aed`** (5,45:1) oder dunkler — nicht `#8b5cf6`.
2. **CTA-Text auf Rose:** entweder `#020617` auf `#fcd34d`, oder `#ffffff` auf `#7c3aed` (5,70:1). Weiß auf `#8b5cf6` nur, wenn die Beschriftung ≥18,7 px fett ist.
3. **Glow niemals auf heller Fläche.** Kein `text-brand-glow` in Light-Mode-Abschnitten.

---

## 3 · Regeln für die Umsetzung

| Regel | Prüfbar woran |
|---|---|
| Farben nur als Tokens (`text-brand-rose`, `bg-brand-dark`), **keine Hex-Werte in `.astro`** | `grep -rnE "#[0-9a-fA-F]{6}" src --include=*.astro` → **Ist 26.10.2026: 2 Treffer** (`src/pages/tv.astro`, Zeile 25 + 105). Ziel: 0 |
| Fließtext max. **65 Zeichen** pro Zeile | `max-w-[65ch]` an Text-Containern |
| Jedes `button`/`a` ≥ **44 px** Trefferfläche | `min-h-[44px] min-w-[44px]` oder `p-3` auf Icon-Buttons — **Ist 26.10.2026: 0 Treffer**, der Token ist definiert, aber unbenutzt |
| Fokus **immer sichtbar** — der globale `:focus-visible`-Ring bleibt | kein `outline-none` ohne `ring-*` |
| Bilder nur über Astros `<Image />` | kein `<img src="/bild.jpg">` in neuen Komponenten |
| `prefers-reduced-motion` respektieren | `pulse-glow`, `float`, `fade-in-up` in `@media (prefers-reduced-motion: reduce)` abschalten — **Ist 26.10.2026: 0 Treffer im ganzen `src/`, also nirgends umgesetzt** |
| Dark-Mode ist der **führende** Modus | neue Sektion zuerst in Dark prüfen, dann in Light |
| Kein Glassmorphism auf Textflächen | Blur nur über Bild/Hero, nie hinter Fließtext |

---

## 4 · Widersprüche im Bestand — entschieden

| Befund | Konsequenz |
|---|---|
| 🔴 **`tailwind.config.mjs` wird nicht geladen.** Tailwind v4 mit `@tailwindcss/vite` und ohne `@config`-Direktive ignoriert die Datei vollständig. | Die Datei ist **Altlast und irreführend**: sie nennt `brand.rose: #7C3AED`, `display: Playfair Display`, `sans: Inter` — keiner dieser Werte ist im Build aktiv. **Löschen** (oder als `legacy/` ablegen), sonst pflegt jemand die falschen Werte. |
| 🟠 **Zwei Rose-Werte im Umlauf:** `#8b5cf6` (aktiv, `global.css`) gegen `#7C3AED` (Config, toter Pfad) | Aktiv ist `#8b5cf6`. Für Text auf hell siehe §2.1. |
| 🟠 **Display-Schrift doppelt belegt:** `Golos Text` und `Playfair Display` sind beide eingebunden und im Stack | `Golos Text` ist die Display-Schrift. `Playfair` bleibt nur als Fallback im Stack — wenn es nicht mehr gebraucht wird, aus `global.css` und dem Preload in `Layout.astro` entfernen (spart eine Font-Datei und einen Request). |
| 🟡 **`darkMode: 'class'`** in der toten Config gegen `transition-colors` + `dark:`-Varianten im Layout | Dark-Mode läuft über `dark:`-Varianten; die Umschaltung ist im Layout verdrahtet. Kein Handlungsbedarf, aber nicht auf die Config verlassen. |

---

## 5 · PR-Checkliste (5 Punkte, mehr nicht)

- [ ] Keine Hex-Werte außerhalb von `global.css`
- [ ] Kontrastpaare nur aus §2 (bzw. gemessen und hier nachgetragen)
- [ ] Fokus-Ring an jedem neuen interaktiven Element sichtbar
- [ ] 44 px Trefferfläche an mobilen Buttons
- [ ] Neue Sektion in Dark **und** Light gesichtet (Screenshot in der PR-Beschreibung)

---

## Verwandt

- Stack & Audit-Ablauf → `Website-Audit-2026-09-20`
- Blueprint (Strategie, IA, SEO) → `BLUEPRINT.md` im Repo
- Verein → `Stammdaten`

---
*Angelegt 2026-10-26 · Grundlage: `src/styles/global.css` (Tokens), `tailwind.config.mjs` (Widerspruchsprüfung), Kontrastwerte berechnet nach WCAG 2.2 (sRGB, relative Luminanz)*
