// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { siteConfig } from './src/config/site.ts';

// https://astro.build/config
export default defineConfig({
  site: siteConfig.url,
  output: 'static',
  integrations: [sitemap()],
});
