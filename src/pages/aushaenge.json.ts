import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

/**
 * Aushänge für die Schüler-App (Quelle: Blog-Beiträge).
 *
 * Regel: Ein Beitrag mit `eventDate` verschwindet, sobald der Termin vorbei ist
 * (einen Tag Kulanz, damit der Abend selbst noch sichtbar bleibt).
 * Beiträge ohne `eventDate` sind Evergreen und bleiben.
 *
 * Ausgeliefert wird nur, was öffentlich ohnehin auf der Website steht.
 */
const KULANZ_TAGE = 1;
const MAX = 12;

const deDatum = (iso: string) => {
  const [j, m, t] = iso.split('-');
  return `${t}.${m}.${j}`;
};

export const GET: APIRoute = async () => {
  const heute = new Date();
  const grenze = new Date(heute.getTime() - KULANZ_TAGE * 864e5)
    .toISOString()
    .slice(0, 10);

  const alle = await getCollection('blog');

  const aushaenge = alle
    .filter((eintrag) => {
      const eventDate = eintrag.data.eventDate;
      return !eventDate || eventDate >= grenze;
    })
    .sort((a, b) => {
      if (a.data.pinned !== b.data.pinned) return a.data.pinned ? -1 : 1;
      return (b.data.eventDate || '').localeCompare(a.data.eventDate || '');
    })
    .slice(0, MAX)
    .map((eintrag) => ({
      id: eintrag.id,
      titel: eintrag.data.title,
      text: eintrag.data.excerpt,
      kategorie: eintrag.data.category,
      veroeffentlicht: eintrag.data.date,
      termin: eintrag.data.eventDate ? deDatum(eintrag.data.eventDate) : null,
      terminIso: eintrag.data.eventDate || null,
      wichtig: eintrag.data.pinned === true,
      url: `https://idiomadanza.de/blog/${eintrag.id}/`,
    }));

  return new Response(
    JSON.stringify(
      {
        generatedAt: new Date().toISOString(),
        anzahl: aushaenge.length,
        aushaenge,
      },
      null,
      1
    ),
    {
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Cache-Control': 'public, max-age=300',
        'Access-Control-Allow-Origin': '*',
      },
    }
  );
};
