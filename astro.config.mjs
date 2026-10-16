import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
const repository = process.env.GITHUB_REPOSITORY || 'itsjustsepehr/itsjustsepehr.com';
const [owner, repo] = repository.split('/');
const site = process.env.SITE_URL || `https://itsjustsepehr.com/`;
const base = process.env.BASE_PATH || (process.env.SITE_URL || repo === `${owner}.github.io` ? '/' : `/${repo}`);
export default defineConfig({ site, base, output: 'static', trailingSlash: 'always', integrations: [mdx(), sitemap({ filter: (url) => !url.endsWith('/404/') && !url.endsWith('/404.html') })], vite: { plugins: [tailwindcss()] } });
