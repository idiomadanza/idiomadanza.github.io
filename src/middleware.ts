import { defineMiddleware } from "astro:middleware";
import { readFileSync } from "node:fs";
import { join } from "node:path";

function loadNonce(): string {
  try {
    const filePath = join(process.cwd(), "public", ".csp-nonce.json");
    const data = JSON.parse(readFileSync(filePath, "utf-8"));
    return data.nonce || "build-time-nonce";
  } catch {
    return "build-time-nonce";
  }
}

const NONCE = loadNonce();

export const onRequest = defineMiddleware(async ({ request, locals }, next) => {
  locals.nonce = NONCE;

  const response = await next();

  // Strikte CSP Policy mit Nonce-basierten Directives
  // Der Nonce-Wert wird beim Build generiert und ist in HTML + Header identisch
  // CSP mit Reporting: Blockierte Resources werden gemeldet
  const csp = \`default-src 'self'; script-src 'self' 'nonce-\${NONCE}'; style-src 'self' 'nonce-\${NONCE}'; img-src 'self' data:; connect-src 'self' https://*.googleapis.com; font-src 'self' data: woff2; report-to csp-endpoint;\`;

  // Report-To Header definiert den Endpoint-Group
  response.headers.set(
    'Report-To',
    '{"group":"csp-endpoint","max_age":86400,"endpoints":[{"url":"https://idiomadanza.de/__csp-report__"}]}'
  );

  response.headers.set('Content-Security-Policy', csp);
  response.headers.set('Strict-Transport-Security', 'max-age=63072000; includeSubDomains; preload');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-XSS-Protection', '1; mode=block');

  return response;
});
