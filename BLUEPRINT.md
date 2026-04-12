# Idiomadanza e.V. - Website Blueprint

## 1. Mission & USP
**Mission**: Eine hybride Plattform, welche die Professionalität von Patricia & Stephan (Bachata/Salsa) mit dem starken Gemeinschaftsgefühl des Vereins "Idiomadanza e.V." aus Regensburg vereint.
**USP**: Höchste tänzerische Qualität trifft auf die Nähe und Community eines Vereins.
**Tech-Stack**: Astro (SSG) + Tailwind CSS.

## 2. Informationsarchitektur (Sitemap)
Die Webseite folgt einer flachen, Conversion-optimierten Hierarchie:
- **`/` (Home)**: Hero-Sektion mit emotionalem Video-Background oder hochwertiger Animation, USP klar kommuniziert. Testimonials von Tänzer:innen, Call-to-Action (z.B. "Kostenlose Probestunde"), Kurzübersicht der aktuellen Kurse.
- **`/kurse`**: Auflistung aller Kurszyklen (Bachata, Salsa, Sensual), klare Level-Beschreibungen (Beginner bis Advanced) und direkte Anmeldemöglichkeit.
- **`/ueber-uns`**: Vorstellung des Trainerpaars Patricia & Stephan sowie der Vereinsstruktur. Vision, Mission und das Team hinter den Kulissen.
- **`/blog` (News)**: Artikel, Bilder und Updates über aktuelle Events, Social-Dances, Workshops und Tanztipps.
- **`/kontakt`**: Einfaches Kontaktformular, Anfahrtsbeschreibung via Google Maps, FAQs (Was soll ich anziehen? Brauche ich einen Tanzpartner?), Impressum und Datenschutz.

## 3. SEO-Struktur (Agentic SEO & Schema.org)
Damit KI-Agenten und Suchmaschinen-Crawler die Daten nahtlos verarbeiten können, werden spezifische JSON-LD Markups integriert.

### A. LocalBusiness (DanceSchool)
*Implementierung im base `<head>` (z.B. in `Layout.astro`):*
```json
{
  "@context": "https://schema.org",
  "@type": "DanceSchool",
  "name": "Idiomadanza e.V.",
  "description": "Bachata und Salsa Tanzverein in Regensburg. Hochwertiger Tanzunterricht mit starker Community.",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Metzgerweg 48",
    "addressLocality": "Regensburg",
    "postalCode": "93055",
    "addressCountry": "DE"
  },
  "url": "https://idiomadanza.de/",
  "telephone": "+49 15678 659226",
  "priceRange": "€€"
}
```

### B. Events (Kurszyklen & Workshops)
*Implementierung auf der `/kurse` Seite für jedes Kurs-Item:*
```json
{
  "@context": "https://schema.org",
  "@type": "Event",
  "name": "Bachata Sensual Anfängerkurs Foundations",
  "startDate": "2025-05-05T20:00",
  "endDate": "2025-08-04T21:00",
  "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
  "eventStatus": "https://schema.org/EventScheduled",
  "location": {
    "@type": "Place",
    "name": "Idiomadanza Tanzstudio",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Regensburg"
    }
  },
  "organizer": {
    "@type": "Organization",
    "name": "Idiomadanza e.V."
  }
}
```

## 4. Island-Architektur (Astro)
Astro erlaubt 100% statisch generiertes (SSG) HTML per Default („Zero JS“). Nur dort, wo Interaktivität benötigt wird, laden wir kleine JavaScript-"Inseln" (Islands).

### Statische Komponenten (Kein Client-seitiges JS)
- Header, Footer, Hero-Sektionen.
- Reine Text- & Inhalts-Seiten (`/ueber-uns`, `/impressum`).
- Der Blog-Bereich (aus Markdown/MDX statisch gerendert).
- Die Liste der kommenden Kurse (lesend, API-Fetch zur Build-Zeit).

### Interaktive Inseln (Hydratisierung nötig)
- **Mobile Menü-Ansteuerung**: Kann über CSS gesteuert werden oder mittels kleinem AlpineJS/VanillaJS (`client:load` bei Bedarf).
- **Kurs-Anmeldung / Formulare**: React/Svelte/Vue Komponente für Formular-Validierung und Submit. (Lade-Strategie: `client:visible`).
- **Media-Galleries / Lightbox**: z.B. bei Event-Bildern (`client:idle`).

## 5. Design-Guidelines: "Modern-Clubbing"
- **Dark Mode Option**: Dunkles Basis-Schema (Slate-900/950) für das echte "Club-Feeling" und zur Betonung der Rose-Akzente.
- **Violet-Theme (#8B5CF6)**: Ein lebendiges Electric Violet als Primärfarbe für CTAs und Hover-Effekte – spiegelt die Energie und Leidenschaft des Bachata wider.
- **Amber-Glow (#FCD34D)**: Ein warmes Gold für Akzente und zur Wiedererkennung des Logos.
- **Glassmorphism-Effekte**: Navigation und Cards als halbtransparente Glaselemente (`backdrop-blur`, `bg-opacity`), um tiefe, schwebende Layer zu erzeugen.
- **Flüssige Tailwind-Animationen**: Leichtes Einfliegen (`fade-in-up`) beim Scrollen, Glow-Effekte bei wichtigen Buttons, um Dynamik in das Corporate Design zu bringen.

## 6. High-Performance & Security-First Architektur (Crawford-Stil)

### 6.1 Dependency Audit & Native Astro 6 APIs
Ziel ist es, die Angriffsfläche (Supply Chain Attacks) durch den Verzicht auf unnötige Drittanbieter-Pakete massiv zu reduzieren.

#### Minimaler Dependency-Footprint (Erlaubte Pakete)
- `astro` (Core Framework – Version 6+)
- `tailwindcss` (Core Styling Engine – Version 4+)
- `@astrojs/tailwind` (Tailwind Integration)
- `@astrojs/sitemap` (Native XML Sitemap-Generierung)
- `typescript` (Typsicherheit)
- *Optional:* `@astrojs/mdx` (falls MDX zwingend für Content benötigt wird, reines Markdown wird ohnehin nativ von Astro unterstützt)

#### Native Astro APIs (Zero-Third-Party Policy)
- **State Management:** Statt `zustand` oder `redux` nutzen wir Astro View Transitions für das SPA-Gefühl und `nanostores` (falls client-seitiger State absolut essenziell ist).
- **Image Optimization:** Strikt keine SDKs (z. B. cloudinary) oder `next/image` Ports. Nutzung der nativen `<Image />` und `<Picture />` Komponenten in Astro (basierend auf der lokalen sharp API).
- **Icons:** Keine gigantischen Library-Abhängigkeiten wie `font-awesome`. Statische, inline eingebettete und optimierte SVG-Dateien.
- **Routing & SEO:** Native Datei-basiertes Routing von Astro. JSON-LD Schema und Meta-Tags über strukturierte Layout-Komponenten statt Plugins (`next-seo` / `react-helmet`).
- **Content:** Strikte Nutzung von **Astro Content Collections** (`src/content/config.ts`) mit Zod-Validierung anstelle von Drittanbieter-CMS-SDKs.

### 6.2 Security-Hardening (Zero-Trust)

#### npm Hardening (`.npmrc`)
Erstelle direkt im Root-Verzeichnis eine `<project>/.npmrc` um bösartige Installations-Skripte zu blockieren:
```ini
# Blockiert 95% der Supply-Chain Malware, die über pre/postinstall Scripts agiert
ignore-scripts=true
# Optionale strikte Kontrolle (kein automatisches Fund-Spamming)
audit=true
fund=false
```
> *Wenn Code-Transformationen wie `sharp` oder `esbuild` kompilieren müssen, muss der Agent einen manuellen `npm rebuild <package-name>` nach einem kurzen Code-Review durchführen.*

#### Content-Security-Policy (CSP)
Implementierung strikter Header über Astro Middleware (`src/middleware.ts`):
```typescript
import { defineMiddleware } from "astro:middleware";

export const onRequest = defineMiddleware(async ({ request, locals }, next) => {
  const response = await next();
  const csp = "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; connect-src 'self'; font-src 'self' data: woff2;";
  
  response.headers.set('Content-Security-Policy', csp);
  response.headers.set('Strict-Transport-Security', 'max-age=63072000; includeSubDomains; preload');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-Frame-Options', 'DENY');

  return response;
});
```

### 6.3 Component Mapping (Crawford-Stil)

Crawford's "Constraint-Based Design" fokussiert sich auf radikalen Einsatz von Typografie, Whitespace, starken Kontrasten und strikten Proportionen. Keine willkürlichen Abstände (Margin/Padding).

#### Design Tokens (Tailwind v4 Setup)
- **Grid:** 12-Column-Grid, aber primär Flow-basiert (`max-w-prose` für Texte).
- **Typografie:** Maximale Limitierung. Eine Serife (z. B. Playfair), eine Sans-Serif (z. B. Inter). CSS `clamp()` für absolut fließendes Scaling (Fluid Typography).
- **Farben:** Deep Black (#020617), starkes Off-White (#F8FAFC), singuläre Akzentfarbe Electric Violet (#8B5CF6) und Amber Glow (#FCD34D).

#### Verzeichnis-Struktur (`/src/components`)
```text
src/
└── components/
    ├── primitives/           # Basis Constraint-Bausteine
    │   ├── Box.astro         # Container mit restriktiven Spacing-Props
    │   ├── Flex.astro        # Layout Flexbox
    │   ├── Grid.astro        # CSS Grid
    │   └── Text.astro        # Typography Manger (erzwingt Modular Scale)
    ├── typography/           # Visuelle Crawford-Typo
    │   ├── Heading.astro     # Typografische Hierarchie (H1-H6)
    │   ├── Paragraph.astro   # Lesetexte (opt. line-height & measure)
    │   └── Display.astro     # Übergroße, maskierte Textblöcke
    ├── ui/                   # Wiederverwendbare Interfaces
    │   ├── MinimalButton.astro # CTA
    │   └── Divider.astro     # Subtile Trennlinien
    └── blocks/               # Zusammengelegte Sektoren
        ├── HeroSection.astro
        ├── EditorialBox.astro
        └── MinimalFooter.astro
```

### 6.4 Anti-Gravity Roadmap (Iterative Sprints)

1. **Sprint 1: Hardened Bootstrap**: Bootstrapping, `.npmrc` (`ignore-scripts=true`), manuelle Dependency-Rebuilds.
2. **Sprint 2: Constraint-Based CSS & Primitives**: Tailwind v4 Setup mit `clamp()`, Programmierung der UI-Basis (`<Text>`, `<Box>`).
3. **Sprint 3: Architektur & Server-Middleware**: `middleware.ts` (CSP Header), Content Collections + Zod, Base-Layout Setup.
4. **Sprint 4: Editorial Assembly (UI Bau)**: Zusammenstellen der Pages (Hero, Editorial, MinimalFooter) anhand strengen Whitespace-Einsatzes.
5. **Sprint 5: Optimization & Build-Audit**: Einbau von `<Image />`, Fonts lokal, und Zero-Vulnerability Build Audit (`npm audit`).
