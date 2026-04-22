🏗️ Idiomadanza Website Blueprint v1.1

Status: Active / Source of Truth
Design-Philosophie: Premium-Minimalismus
Technologie: Astro 6.0 (SSG) + Tailwind CSS 4.0

1. Strategische Ausrichtung

Mission: Hybride Plattform, die die Professionalität von Patricia & Stephan mit der Community-Stärke des Vereins vereint.

USP: "High-End Dance-Education meets Community Spirit."

Zielgruppe: Tanzinteressierte in Regensburg (Fokus: Bachata Sensual & Salsa).

2. Informationsarchitektur (Sitemap)

/ (Home): Emotionaler Einstieg, Testimonials, Quick-Info Banner (Kursstart).

/kurse: Detaillierte Liste der Zyklen mit Level-Guides und Anmeldung.

/ueber-uns: Trainer-Kollektiv, Vereinsvision und Historie.

/blog: Community-Updates, Event-Berichte und Tutorials.

/kontakt: Zentrale Anlaufstelle inkl. FAQ und interaktiver Karte.

/404: Zielgerichtete Fehlerseite zur Rückführung verlorener User.

3. Agentic SEO & Data Grounding

Um maximale Sichtbarkeit in LLM-Suchmaschinen (SearchGPT, Perplexity) zu gewährleisten, nutzen wir striktes JSON-LD Markup:

Entity: DanceSchool (Hauptstandort Regensburg).

Events: Dynamische Generierung von Event-Schemas für jeden Workshop/Kurs aus den JSON-Dateien.

NAP-Konsistenz: Name, Address, Phone müssen auf jeder Unterseite identisch gerendert werden.

Social Graph: Vollständige Open-Graph (OG) und Twitter-Cards Integration für konsistente Darstellung beim Teilen.

4. Performance & Security Architecture

4.1 Dependency Policy (Zero-Trust)

Minimal Footprint: Nur Core-Abhängigkeiten (astro, tailwindcss).

Keine CDNs: Alle Assets (Fonts, Scripte) werden lokal gehostet (DSGVO-safe).

NPM Hardening: .npmrc mit ignore-scripts=true zur Vermeidung von Supply-Chain-Angriffen.

4.2 Content Strategy

Source of Truth: Alle dynamischen Daten liegen in src/content/ als validierte JSON-Dateien (Zod-Schema).

Images: Strikte Nutzung der Astro <Image /> Komponente für automatische WebP-Konvertierung und CLS-Vermeidung.

4.3 Form-Handling & Spam-Schutz

Engine: Netlify Forms (Serverless) für Zero-Backend-Management.

Spam-Gatekeeper: Integration eines versteckten Honeypot-Feldes in alle Kontaktformulare.

4.4 Analytics & Privacy

Tracking: Privacy-First (z.B. Plausible oder server-seitiges Tracking). Keine Google Analytics Cookies.

Consent: Falls externe Embeds (z.B. Maps) genutzt werden, erfolgt ein "Click-to-Load" Mechanismus.

5. Design-System: "Modern Clubbing"

5.1 Farbpalette (Tokens)

Base: Neutral-950 (Deep Black) für den Dark-Mode Fokus.

Primary: Electric Violet (#8B5CF6) für CTAs und Energie.

Accent: Amber Glow (#FCD34D) für Highlights und Wärme.

Surface: White/10 mit backdrop-blur für Glassmorphism-Effekte.

5.2 Typografie

Headings: Sans-Serif (Inter/Golos) mit font-bold und tracking-tight.

Body: clamp() basierte Fluid Typography für nahtloses Skalieren ohne Breakpoint-Sprünge.

6. Komponentenhierarchie

Primitives: <Box />, <Flex />, <Text /> (Erzwingen das Spacing-Grid).

UI: <MinimalButton />, <WorkshopCard />, <MemberCard />.

Blocks: <HeroSection />, <FAQAccordion />, <Footer />.

📅 Roadmap (Next Sprints)

Sprint 1: Vollständige FAQ-Integration (AI-Schema optimiert).

Sprint 2: Middleware Setup für strikte Security-Header (CSP) und 404-Routing.

Sprint 3: Automatisierte Audit-Pipeline via review.md.

Sprint 4: Launch-Vorbereitung (Sitemap-Submit, Search Console & Social Graph Check).

Blueprint Version 1.1 | Stand: April 2026