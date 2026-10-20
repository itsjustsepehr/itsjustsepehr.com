# Verification

## Audit cleanup — 2026-10-20

This replaces historical starter-template claims that no longer describe main.
The repository deploys through GitHub Actions to `https://itsjustsepehr.com/`.

- Production `npm run build`: 0 type errors, warnings, or hints; 14 HTML pages.
- Existing Vite warning for chunks over 500 kB remains.
- `npm run check:output`: headings, canonical URLs, and social-card metadata.
- Temporary raster-cover fixture emitted an absolute `og:image` and large-image
  card; placeholder covers emitted summary cards without an image. Fixture removed.
- Documented `GITHUB_REPOSITORY=itsjustsepehr/personal-site` configuration produced
  the expected `/personal-site` base path.
- `git diff --check` passed.

Browser rendering and computed print/RTL styles were not verified in this pass:
Chromium was unavailable and its download failed. Review mobile layout, Persian
headings, article printing, and hero appearance before merging.

## Content still to supply

Final article covers, detailed résumé history, and public portfolio case studies.
Current article covers are placeholders, so social cards omit `og:image` until
an eligible raster cover is supplied.
