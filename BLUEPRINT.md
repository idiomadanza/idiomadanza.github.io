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
- **Rose-Theme (#BE123C)**: Ein edles, tieferes Rot (Tailwind Rose-700) als Primärfarbe für CTAs und Hover-Effekte – spiegelt die Leidenschaft des Bachata wider.
- **Glassmorphism-Effekte**: Navigation und Cards als halbtransparente Glaselemente (`backdrop-blur`, `bg-opacity`), um tiefe, schwebende Layer zu erzeugen.
- **Flüssige Tailwind-Animationen**: Leichtes Einfliegen (`fade-in-up`) beim Scrollen, Glow-Effekte bei wichtigen Buttons, um Dynamik in das Corporate Design zu bringen.
