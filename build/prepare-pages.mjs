import { readFile, writeFile, mkdir, access, copyFile } from 'node:fs/promises';

// GitHub Pages publishes only dist/client; no Worker or server bundle is uploaded.
const output = new URL('../dist/client/', import.meta.url);
await access(new URL('index.html', output));
await writeFile(new URL('.nojekyll', output), '');
// vinext 0.0.50 exports index.rsc but its client requests /.rsc for the homepage.
// A static host has no Worker rewrite, so provide the exact requested filename.
await copyFile(new URL('index.rsc', output), new URL('.rsc', output));

// Preserve the original published article URLs captured during content migration.
const { pages } = JSON.parse(await readFile(new URL('../content/migration/original-site.json', import.meta.url), 'utf8'));
const redirects = new Map();
for (const page of pages) {
  const source = new URL(page.source);
  if (source.hostname !== 'hqselene.github.io' || !/^\/post\/[a-z0-9]+\/$/i.test(source.pathname)) continue;
  const destination = page.route.replace(/\/$/, '') + '/';
  await access(new URL(destination.slice(1) + 'index.html', output));
  if (redirects.has(source.pathname) && redirects.get(source.pathname) !== destination) throw new Error(`Conflicting redirect: ${source.pathname}`);
  redirects.set(source.pathname, destination);
}
for (const [source, destination] of redirects) {
  const directory = new URL(source.slice(1), output);
  await mkdir(directory, { recursive: true });
  const escaped = destination.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;');
  await writeFile(new URL('index.html', directory), `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>Page moved — Qing He</title><link rel="canonical" href="${escaped}">
<meta http-equiv="refresh" content="0; url=${escaped}"></head>
<body><p>This page has moved. <a href="${escaped}">Continue to the article</a>.</p>
<script>location.replace(${JSON.stringify(destination)} + location.search + location.hash);</script></body></html>`);
}
console.log(`GitHub Pages ready: dist/client, including ${redirects.size} legacy article redirects.`);
