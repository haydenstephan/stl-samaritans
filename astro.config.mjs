// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://stlsamaritans.org',
  // TEMPORARY: remove `base` once custom domain DNS is configured and the site
  // serves from the apex. While deployed at haydenstephan.github.io/stl-samaritans/,
  // this keeps asset and nav paths correct.
  base: '/stl-samaritans/',
  vite: {
    plugins: [tailwindcss()]
  }
});