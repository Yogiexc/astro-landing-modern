import { defineConfig } from 'astro/config';
import svelte from '@astrojs/svelte';

export default defineConfig({
  integrations: [svelte()],
  build: {
    inlineStylesheets: 'auto',
  },
  compressHTML: true,
});