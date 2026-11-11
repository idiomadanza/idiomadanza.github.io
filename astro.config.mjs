import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://idiomadanza.de',
  integrations: [
    sitemap({
      filter: (page) => !page.includes('/404'),
    })
  ],
  image: {
    formats: ['avif', 'webp'],
  },
  vite: {
    plugins: [tailwindcss()],
    build: {
      // Skripte nie inline ausliefern: nur so kann die CSP mit script-src 'self'
      // ohne Nonce/Hashes auskommen. Astro würde kleine Bundles sonst in den
      // HTML-Output einbetten (assetsInlineLimit).
      assetsInlineLimit: (filePath) => (filePath.endsWith('.js') ? false : undefined),
    },
  },
});
