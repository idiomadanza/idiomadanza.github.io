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
    plugins: [tailwindcss()]
  }
});
