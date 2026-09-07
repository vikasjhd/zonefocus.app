import { access, readFile, readdir } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { locales, pages } from './content.mjs';

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const docs = join(root, 'docs');
const failures = [];
const warnings = [];
const expectedPageCount = Object.keys(locales).length * pages.length;

async function walk(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) files.push(...await walk(path));
    else files.push(path);
  }
  return files;
}

const htmlFiles = (await walk(docs)).filter((file) => file.endsWith('.html'));
if (htmlFiles.length !== expectedPageCount) failures.push(`Expected ${expectedPageCount} HTML pages; found ${htmlFiles.length}`);

for (const file of htmlFiles) {
  const html = await readFile(file, 'utf8');
  const relative = file.slice(docs.length) || '/index.html';
  const matches = (pattern) => [...html.matchAll(pattern)];
  const title = html.match(/<title>(.*?)<\/title>/s)?.[1] ?? '';
  const description = html.match(/<meta name="description" content="([^"]+)">/)?.[1] ?? '';

  if (!/^<!doctype html>/i.test(html)) failures.push(`${relative}: missing doctype`);
  if (!/<html lang="[^"]+">/.test(html)) failures.push(`${relative}: missing lang`);
  if (!title) failures.push(`${relative}: missing title`);
  if (title.length > 75) warnings.push(`${relative}: long title (${title.length})`);
  if (description.length < 90 || description.length > 180) warnings.push(`${relative}: description length ${description.length}`);
  if (matches(/<h1\b/g).length !== 1) failures.push(`${relative}: expected one h1`);
  if (matches(/<link rel="canonical"/g).length !== 1) failures.push(`${relative}: canonical count`);
  if (matches(/rel="alternate" hreflang=/g).length !== 11) failures.push(`${relative}: expected 11 hreflang links`);
  if (!/<meta name="apple-itunes-app" content="app-id=6763581982">/.test(html)) failures.push(`${relative}: missing Smart App Banner`);
  if (!html.includes('data-app-store-link')) failures.push(`${relative}: missing App Store CTA tracking hook`);

  for (const match of matches(/<script type="application\/ld\+json">(.*?)<\/script>/gs)) {
    try { JSON.parse(match[1]); }
    catch { failures.push(`${relative}: invalid JSON-LD`); }
  }

  const urls = matches(/(?:href|src)="(\/[^"]*)"/g).map((match) => match[1]);
  for (const url of urls) {
    const clean = url.split('#')[0].split('?')[0];
    if (!clean) continue;
    const target = clean.endsWith('/') ? join(docs, clean, 'index.html') : join(docs, clean);
    try { await access(target); }
    catch { failures.push(`${relative}: missing internal target ${clean}`); }
  }
}

const sitemap = await readFile(join(docs, 'sitemap.xml'), 'utf8');
const sitemapUrls = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => match[1]);
if (sitemapUrls.length !== expectedPageCount) failures.push(`Expected ${expectedPageCount} sitemap URLs; found ${sitemapUrls.length}`);
if (new Set(sitemapUrls).size !== sitemapUrls.length) failures.push('Sitemap contains duplicate URLs');

const robots = await readFile(join(docs, 'robots.txt'), 'utf8');
for (const value of ['User-agent: *', 'User-agent: OAI-SearchBot', 'Sitemap: https://zonefocus.app/sitemap.xml']) {
  if (!robots.includes(value)) failures.push(`robots.txt missing: ${value}`);
}

if (warnings.length) console.log(`Warnings (${warnings.length}):\n- ${warnings.join('\n- ')}`);
if (failures.length) {
  console.error(`Failures (${failures.length}):\n- ${failures.join('\n- ')}`);
  process.exit(1);
}
console.log(`Validated ${htmlFiles.length} pages, ${sitemapUrls.length} sitemap URLs, structured data, metadata, and internal links.`);
