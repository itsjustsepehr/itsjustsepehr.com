# Verification

## Passed locally

- `npm install`: dependencies resolved successfully; `package-lock.json` generated.
- `npm ci`: clean dependency installation from the lockfile succeeded.
- `npm run build`: Astro type checking reported 0 errors, 0 warnings, and 0 hints. Static generation produced 17 HTML pages plus RSS, robots, sitemap, and assets.
- Default root deployment configuration (`itsjustsepehr.github.io`).
- Project repository configuration (`GITHUB_REPOSITORY=itsjustsepehr/personal-site`), including `/personal-site/` asset and route prefixes.
- Custom-domain build (`SITE_URL=https://example.com BASE_PATH=/`), including canonical and sitemap origin.
- Parsed generated HTML: all local href/src targets resolved to generated files, fragment links resolved, one H1 per page, and canonical metadata present.
- Persian article emitted `lang="fa"` and `dir="rtl"`.
- Draft article excluded from generated routes, pages, RSS, and sitemap.
- RSS contained five published article entries.
- Sitemap excluded the draft and 404 page.
- Final build restored to the default root configuration.

## Not verified

- Browser rendering, mobile screenshots, keyboard walkthrough, screen-reader behavior, print rendering, and interactive language filtering were not browser-tested in this environment.
- A full WCAG audit and Lighthouse performance audit were not performed.
- GitHub repository creation, remote push, GitHub Actions execution, and live Pages deployment are pending. The connected GitHub plugin returned no accessible repositories and did not expose repository creation or Pages settings capabilities.
- DNS, HTTPS provisioning, and custom-domain ownership have not been configured; only the custom-domain static build was verified.

## Content still to supply

Real portrait/avatar, final article covers, reviewed final article copy, detailed résumé history, and public portfolio case studies. The implementation deliberately uses placeholders and known biographical facts.
