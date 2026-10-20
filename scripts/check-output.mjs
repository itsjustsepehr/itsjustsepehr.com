import assert from 'node:assert/strict';
import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

// Run after a production build. Uses Node only; no test framework required.
const pages = readdirSync('dist', { recursive: true }).filter(path => path.endsWith('.html'));
assert.ok(pages.length > 0, 'Build the site first');
for (const path of pages) {
  const html = readFileSync(join('dist', path), 'utf8');
  assert.equal((html.match(/<h1(?:\s|>)/g) ?? []).length, 1, `${path}: expected one H1`);
  assert.match(html, /<link\b[^>]*rel="canonical"[^>]*href="https?:\/\//, `${path}: canonical URL`);
  const image = html.match(/<meta\b[^>]*property="og:image"[^>]*content="([^"]+)"/)?.[1];
  if (image) {
    assert.match(image, /^https?:\/\//, `${path}: absolute social image URL`);
    assert.ok(!image.includes('/placeholders/'), `${path}: no placeholder social image`);
    assert.match(html, /name="twitter:card" content="summary_large_image"/, `${path}: image card`);
  } else {
    assert.match(html, /name="twitter:card" content="summary"/, `${path}: fallback card`);
  }
}
console.log(`Checked headings, canonical URLs, and social cards in ${pages.length} pages.`);
