import { writeFileSync } from 'node:fs';
import { randomBytes } from 'node:crypto';

const nonce = randomBytes(32).toString('base64').slice(0, 24);
writeFileSync('public/.csp-nonce.json', JSON.stringify({ nonce }));
console.log(`[csp-nonce] Generated nonce: ${nonce}`);
