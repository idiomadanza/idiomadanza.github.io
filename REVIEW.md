🔍 Post-Build Review & Audit Checkliste (v2.2)

Diese Checkliste wird nach jedem erfolgreichen Build (npm run build) ausgeführt. Sie dient als verbindlicher Gatekeeper für das Deployment und stellt sicher, dass Design-, Sicherheits- und Performance-Standards nicht durch neue Code-Änderungen erodieren.

Agenten-Instruktion: Scanne den /dist Ordner, die Konfigurationsdateien und den generierten Client-Code. Antworte für jeden Unterpunkt strikt mit:
[✅ OK], [⚠️ WARNING] oder [❌ BLOCKER]. Erstelle am Ende eine zusammenfassende Bewertung.

🛡️ 1. Security & Supply Chain Audit

Ziel: Zero-Trust Architektur und Schutz vor Daten-Exfiltration oder Supply-Chain-Angriffen.

[ ] npm Hygiene: Ausführung von npm audit.

Kriterium: 0 High/Critical Vulnerabilities erlaubt.

[ ] Script Isolation: Überprüfung der .npmrc im Root auf ignore-scripts=true.

[ ] Data Leak Scan: - Action: grep -r "process.env" ./dist (Darf keine Treffer im Client-JS liefern).

Action: Suche nach Patterns wie AI_KEY, SECRET, DATABASE_URL oder sk_test_ im gesamten /dist Verzeichnis.

[ ] Header & CSP: - Prüfung der astro.config.mjs auf aktive Security-Header (HSTS, No-Sniff, Frame-Deny).

Validierung der Content-Security-Policy (CSP): Keine Verwendung von unsafe-inline ohne entsprechende Hashes oder Nonces.

🤖 2. Agentic SEO & AI Readability

Ziel: Optimierung der Seite für LLMs (SearchGPT, Perplexity) und semantische Crawler.

[ ] JSON-LD Schema: Validierung der strukturierter Daten (@type: "DanceSchool", @type: "Event") auf der Homepage und unter /kurse.

[ ] Semantischer Baum: - Exakt ein <h1> pro Seite vorhanden.

Korrekte Verwendung von Landmark-Elementen (<main>, <article>, <nav>, <footer>) statt "Div-Wüsten".

[ ] LLM-Context Test: Extraktion des reinen Text-Contents (Reader-Mode-Simulation).

Frage: Ist der Kontext "Bachata Verein Regensburg" ohne visuelle Hilfen innerhalb von 3 Sekunden klar?

[ ] A11y: Alle interaktiven Elemente besitzen ein aussagekräftiges aria-label. Alle Bilder verfügen über funktionale alt-Tags.

🕸️ 3. SEO & Indexability

Ziel: Maximale organische Sichtbarkeit und fehlerfreies Crawling.

[ ] Sitemap-Check: Existenz von sitemap-index.xml im Root und korrekte Verlinkung innerhalb der robots.txt.

[ ] Metadata: Jede Route besitzt einen einzigartigen <title> (max. 60 Zeichen) und eine meta-description (max. 155 Zeichen).

[ ] Social Graph: Prüfung der Open-Graph-Tags (og:title, og:image, og:description) pro Seite auf Vollständigkeit pro Seite.

[ ] Link-Integrity: Lokaler Scan auf "Broken Links" (404er) innerhalb der statischen Build-Struktur.

⚡ 4. Performance & Core Web Vitals

Ziel: Instant-Loading Experience. LCP < 1.2s, CLS = 0.

[ ] Asset Optimization: - Alle Bilder werden als .webp oder .avif ausgeliefert.

Verpflichtende width und height Attribute an Bildern zur CLS-Vermeidung.

[ ] Bundle-Size: Analyse des /dist/_astro/ Verzeichnisses.

Warnung: Einzelne JS-Dateien sollten 50kb nicht überschreiten (Fokus auf SSG).

[ ] Font-Blocking: Lokale Webfonts müssen im woff2 Format via <link rel="preload"> im <head> eingebunden sein. Externe Font-Requests (z.B. Google Fonts API) sind untersagt.

✒️ 5. Constraint-Based Design Audit

Ziel: Aufrechterhaltung der visuellen Identität und des Premium-Minimalismus.

[ ] Spacing-Tokens: Scan des generierten CSS auf Inline-Styles oder Abstände außerhalb der definierten Tailwind-Scale.

[ ] Fluid Typography: Verifizierung der clamp() Funktionen in der CSS-Ausgabe für nahtloses Responsive-Scaling ohne Breakpoint-Sprünge.

[ ] Contrast-Check: Textfarben (z.B. Neutral-950 auf Neutral-50) müssen ein Kontrastverhältnis von mindestens 7:1 aufweisen (WCAG AAA Standard).

[ ] Visual Noise Audit: Überprüfung auf unnötige Design-Elemente (Border-Radii, Schatten), die nicht den minimalistischen Richtlinien entsprechen.

🚀 Abschlussbewertung des Agenten

Dieser Teil wird vom Review-Agenten nach der Analyse ausgefüllt.

Gesamtstatus: [ WARTET AUF ANALYSE ]

Kritische Blocker: - Noch keine vorhanden.

Optimierungspotenzial: - Noch keine vorhanden.

Post-Review Action: Der Agent muss nach Abschluss des Audits eine Datei namens post-review-task.md generieren, die alle identifizierten [❌ BLOCKER] und [⚠️ WARNING] als interaktive Task-Liste für die Behebung zusammenfasst.

Dokumenten-Version: 2.3 | Stand: April 2026