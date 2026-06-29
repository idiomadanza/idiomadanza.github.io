import { defineMiddleware } from "astro:middleware";

export const onRequest = defineMiddleware(async ({ request, locals }, next) => {
  const response = await next();
  
  // Strikte CSP Policy (Scripts ohne unsafe-inline, Styles mit für Astro-Komponenten)
  // 'unsafe-inline' für Styles bleibt, weil Astro Scoped Styles inline einsetzt
  // Scripts sind bereits externe Module (Astro Hydration), kein Inline-JS nötig
  const csp = "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; connect-src 'self'; font-src 'self' data: woff2;";
  
  response.headers.set('Content-Security-Policy', csp);
  response.headers.set('Strict-Transport-Security', 'max-age=63072000; includeSubDomains; preload');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-XSS-Protection', '1; mode=block');

  return response;
});
