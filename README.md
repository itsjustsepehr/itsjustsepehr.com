# itsjustsepehr

A static Astro personal website for Sepehr. Astro 7, Tailwind CSS 4, MDX content collections, TypeScript, self-hosted Inter and Vazirmatn, and small vanilla JavaScript enhancements.

## Local setup

Use Node.js 24 LTS and npm.

```sh
npm install
npm run dev
```

For reproducible installation and production verification:

```sh
npm ci
npm run build
npm run check:output
npm run preview
```

`build` runs `astro check` before generating `dist/`. The lockfile is tracked. No API keys, database, runtime server, or external font requests are required.

## Pages and source

- `/`: homepage
- `/writing/`: article list with English/Persian filter
- `/writing/[id]/`: MDX article routes
- `/categories/` and `/categories/[slug]/`: five category landing pages
- `/about/`, `/resume/`, `/portfolio/`
- `/rss.xml`, `/sitemap-index.xml`, `/robots.txt`, `/404.html`

`src/content.config.ts` defines the content schema. `src/lib/posts.ts` centralizes publication filtering. `src/lib/site.ts` defines categories and base-aware links. `src/layouts/Base.astro` owns navigation, metadata, and motion. `src/styles/global.css` contains the design tokens and shared styling. See `DESIGN_SYSTEM.md` for the complete design contract.

## Authoring

Create a file in `src/content/writing/your-slug.mdx`. Its filename becomes the URL slug.

```yaml
---
title: "A useful engineering lesson"
description: "A short, specific summary."
category: engineering
tags: [reliability, practice]
date: 2026-10-16
cover: /placeholders/cover.svg
coverAlt: "Neutral article cover placeholder"
language: en
draft: true
---
```

Allowed categories: `artificial-intelligence`, `web-development`, `banking-systems`, `software-architecture`, `engineering`. Use `language: fa` for Persian. The article document becomes RTL, while code stays LTR. Keep code blocks fenced and use the appropriate language identifier.

Set `draft: false` when ready. Drafts and future-dated articles are excluded from routes, indexes, categories, RSS, and sitemap. A future date becomes eligible only on a later rebuild; no scheduled publishing workflow is enabled.

Reusable components work inside MDX:

```mdx
import Callout from '../../components/Callout.astro';

<Callout title="A useful distinction">
Explain the assumption that matters.
</Callout>
```

Only trusted authors should edit MDX: it is executable project source. Use the `href` helper for internal links and public asset paths to support project-site prefixes. Put final covers in `public/covers/`, then set a root-relative `cover` value such as `/covers/my-article.webp`. Do not include a repository prefix in frontmatter.

The collection currently contains two published Persian articles. The résumé includes only supplied facts; the portfolio is an explicit empty state. No invented employers, project achievements, or education appear.

## Images and typography

The homepage uses the approved animated shader hero. Replace the navbar initial in `Base.astro` with a circular avatar. Article cover placeholders are 960×540 SVG assets, not generated illustrations. Use a raster image if you later add social-preview images, since platform support for SVG previews varies.

Inter and Vazirmatn are bundled locally through Fontsource packages. Code uses system monospace. Keep only these two custom families.

## GitHub Pages deployment

Repository: `itsjustsepehr/itsjustsepehr.com`.
Production URL: `https://itsjustsepehr.com/`. The deployment workflow supplies this origin and `/` as the base path.

1. Create an empty public repository named `itsjustsepehr.com` in the `itsjustsepehr` account.
2. In **Settings → Pages → Build and deployment**, choose **GitHub Actions**.
3. Push this project's contents to the repository root on `main`, including `package-lock.json` and `.github/workflows/`.

```sh
git init -b main
git add .
git commit -m "Build itsjustsepehr Astro website"
git remote add origin https://github.com/itsjustsepehr/itsjustsepehr.com.git
git push -u origin main
```

If a repository is already initialized, use its existing Git history instead of reinitializing. If an `origin` remote already exists, inspect it before changing it.

4. Open the Actions tab. The deploy workflow installs with `npm ci`, checks types, builds static files, uploads the Pages artifact, and deploys it.
5. Confirm both jobs are green, then visit the URL shown by the deployment. A configured URL is not proof of a completed deployment.

The workflow needs repository `contents: read`, `pages: write`, and `id-token: write`. Pull requests run a separate build check without deployment. Pages must be enabled before the deployment workflow's configure step.

### User sites and project sites

Configuration derives the owner and repository from `GITHUB_REPOSITORY` in Actions. Locally it defaults to `itsjustsepehr/itsjustsepehr.com`.

| Repository | Site origin | Base |
| --- | --- | --- |
| `itsjustsepehr.github.io` | `https://itsjustsepehr.github.io` | `/` |
| `personal-site` | `https://itsjustsepehr.github.io` | `/personal-site` |

To test a project-site build locally:

```sh
GITHUB_REPOSITORY=itsjustsepehr/personal-site npm run build
GITHUB_REPOSITORY=itsjustsepehr/personal-site npm run preview
```

Visit the printed origin with `/personal-site/` appended. Root-relative links use the shared helper. Styles, scripts, canonical URLs, RSS, sitemap, and placeholder assets follow the configured base.

### Future custom domain

1. Add the domain in repository **Settings → Pages** and configure DNS using GitHub's current instructions.
2. Add repository Actions variables `SITE_URL=https://your-domain.example` and `BASE_PATH=/`.
3. Add `public/CNAME` containing only the hostname.
4. Rebuild and redeploy; enable HTTPS when GitHub makes it available.

For local custom-domain validation, export `SITE_URL` and `BASE_PATH` in the shell. `.env.example` documents these variables; the config loads a local `.env` file when present; exported environment variables take precedence.

Official guides: [Astro GitHub Pages deployment](https://docs.astro.build/en/guides/deploy/github/) and [GitHub custom domains](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site).

## Verification and limitations

See `VERIFICATION.md` for the performed checks and outstanding deployment/browser verification. This project contains no analytics or tracking. Add real portrait, final writing, experience details, and portfolio entries as iterative content updates.


## React shader homepage hero

The homepage hero is an Astro React island (`src/components/HomeHero.tsx`,
`client:load`). Astro renders its text and links at build time; React hydrates the
animation. The rest of the page keeps the existing Astro components.

- Shared UI: `src/components/ui/` (`@/components/ui`). This is the requested
  `/components/ui` convention within this project's `src` source root. Keeping
  reusable primitives here makes shadcn imports and CLI additions predictable;
  a second root-level components folder is unnecessary.
- Styles: `src/styles/global.css`, with Tailwind 4 and semantic color tokens.
- Utilities: `src/lib/utils.ts` (`cn` combines clsx and tailwind-merge).
- TypeScript: strict Astro configuration plus React JSX and the `@/*` alias.
- `components.json` configures shadcn. No new project or Tailwind initialization
  is required. To add future primitives, run `npx shadcn@latest add <component>`
  and review any proposed changes to existing tokens/components.

From a clean checkout run `npm ci`, `npm run build`, then `npm run dev`.
React support uses `@astrojs/react`, `react`, and `react-dom`; the supplied
components also require `three`, `@radix-ui/react-slot`,
`clsx` and `tailwind-merge`, with React/Three types.
All are recorded in package.json and the lockfile.

`HomeHero` receives only `writingHref` and `aboutHref`, built with the existing
base-path helper. It needs no providers, remote assets, or global state.
The hero preserves
Sepehr's introduction rather than publishing the generic design/availability
claims from the sample.

Integration adjustments to the supplied components: the canvas is absolute and
container-sized rather than fixed over the whole site; drawing-buffer resolution
accounts for pixel ratio (capped at 1.5); animation uses elapsed time, pauses off
screen/in background tabs, and respects reduced motion. A CSS background remains
when WebGL is unavailable or its context is lost. Resources/listeners are disposed
on unmount. The liquid button uses Radix Slottable for real links, unique filter
IDs, valid inline markup, and a blur fallback. The liquid button keeps only the appearance used by the hero; unused button exports and variant configuration have been removed. Header typography and spacing adapt to mobile without changing navigation.
