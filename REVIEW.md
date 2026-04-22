🔍 Post-Build Review & Audit Checkliste (v2.8)

⚠️ NUR LESEN / READ-ONLY: Diese Datei ist eine statische System-Vorlage. Manuelle Änderungen am Regelwerk sollten nur nach Rücksprache mit der technischen Leitung vorgenommen werden. Ergebnisse und Korrekturmaßnahmen werden ausschließlich in der post-review-task.md dokumentiert.

Diese Checkliste wird nach jedem erfolgreichen Build (npm run build) ausgeführt. Sie dient als verbindlicher Gatekeeper für das Deployment.

Agenten-Instruktion: Scanne den /dist Ordner, die /src Struktur und die Konfigurationsdateien. Antworte für jeden Unterpunkt strikt mit:
[✅ OK], [⚠️ WARNING] oder [❌ BLOCKER]. Erstelle am Ende eine zusammenfassende Bewertung.

🛡️ 1. Security & Supply Chain Audit

[ ] npm Hygiene: npm audit (Kriterium: 0 High/Critical).

[ ] Data Leak Scan: Suche nach process.env oder Keys im /dist Verzeichnis.

[ ] Email Obfuscation: Schutz der Mail-Adressen gegen Scraper.

[ ] Form Spam Protection: Vorhandensein eines Honeypots oder Bot-Schutzes in allen Formularen.

🛠️ 2. Linting & Static Analysis

[ ] Astro Check: Validierung der Frontmatter-Typen und Komponenten-Props.

[ ] Tailwind Validator: Prüfung auf kollidierende Klassen.

[ ] Logic Audit: Ausschluss von console.log oder Debugger-Statements.

🤖 3. Agentic SEO & AI Readability

[ ] JSON-LD Grounding: NAP-Konsistenz (Name, Address, Phone) über alle Entitäten.

[ ] Schema LocalBusiness: Öffnungszeiten und Geo-Daten für Regensburg vorhanden.

[ ] Reader-Mode Check: Strukturierte Text-Extraktion ohne visuelle Layer verständlich.

🕸️ 4. SEO & Indexability

[ ] Title/Meta: Eindeutigkeit und Längenbeschränkung (Title < 60, Desc < 155).

[ ] Canonical & Lang: Vorhandensein von <link rel="canonical"> und korrektem lang="de" Attribut im <html>-Tag.

[ ] Sitemap & Robots: Validierung der Pfade in sitemap-index.xml und robots.txt.

⚡ 5. Performance & Asset-Audit

[ ] Bilder: WebP/AVIF Nutzung und explizite width/height (CLS-Prävention).

[ ] Lazy Loading: loading="lazy" für Bilder "below the fold" aktiv?

[ ] Fonts: Lokaler Host-Check (Keine externen Font-CDNs).

⚖️ 6. Compliance (DSGVO)

[ ] External Requests: Null-Toleranz für ungefragte Drittanbieter-Calls.

[ ] Impressum: 2-Klick-Erreichbarkeit und vollständige Vereinsangaben.

[ ] Datenschutz: Aktualisierte Klauseln für Kontaktformulare vorhanden.

♿ 7. Accessibility (A11y) Pro

[ ] Contrast Ratio: Textfarben erfüllen min. 4.5:1 (AA) oder 7:1 (AAA).

[ ] Focus States: Sind alle interaktiven Elemente (Buttons, Links) bei Tastatur-Fokus (:focus) deutlich sichtbar umrandet?

[ ] Aria-Labels: Sinnvolle Labels für Icons ohne Text-Inhalt.

🎨 8. UX & Brand Consistency

[ ] Interaction Feedback: Visuelle Erfolgsmeldungen für Formular-Aktionen.

[ ] Typography Scale: Konsistente Nutzung der Tailwind-Font-Sizes.

[ ] 404 Page: Hilfreiche Fehlerseite mit Rückführung zur Startseite.

🚀 Agenten-Audit: Abschlussbewertung & Freigabe

📊 Build Health Score

Metrik-Gruppe

Status

Vertrauens-Level

Security & Integrity

[ WARTET ]

-- / 100

Linting & Code Quality

[ WARTET ]

-- / 100

Agentic SEO (AI-Ready)

[ WARTET ]

-- / 100

Performance (Vitals)

[ WARTET ]

-- / 100

Legal & Accessibility

[ WARTET ]

-- / 100

UX & Design Consistency

[ WARTET ]

-- / 100

🚨 Kritische Blocker (Deployment gestoppt)

Noch keine Analyse erfolgt.

✅ Finales Urteil

Status: [ ⏳ ANALYSE ERFORDERLICH ]

Entscheidungs-Logik:

Alle [✅ OK] -> "BUILD CERTIFIED"

Ein [❌ BLOCKER] -> "DEPLOYMENT REJECTED"

Nur Warnungen [⚠️] -> "BUILD CERTIFIED (WITH CAVEATS)"

Dokumenten-Version: 2.8 | Stand: April 2026