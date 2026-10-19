import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';
import worker from '../dist/server/index.js';

async function render(path) {
  const response = await worker.fetch(new Request(`http://localhost${path}`, { headers: { accept: 'text/html' } }),
    { ASSETS: { fetch: async () => new Response('Not found', { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} });
  return { status: response.status, html: await response.text() };
}

test('home renders research sections in order and keeps the animated identity', async () => {
  const { status, html } = await render('/');
  assert.equal(status, 200);
  const headings = ['Recent Projects', 'Selected Publications', 'Selected Projects'];
  let previous = -1;
  for (const heading of headings) {
    const position = html.indexOf(heading);
    assert.ok(position > previous, `${heading} follows the preceding section`);
    previous = position;
  }
  assert.match(html, /hero-orbit/);
  assert.match(html, /href="#recent-projects"/);
  assert.match(html, /LLM for Qualitative Coding/);
  assert.match(html, /Simulation for Architecture/);
  assert.match(html, /ECSS Framework/);
  assert.match(html, /cosmic-layer/);
  const highlights = html.match(/<aside class="hero-updates"[\s\S]*?<\/aside>/)?.[0];
  assert.ok(highlights, 'homepage includes highlights');
  assert.doesNotMatch(highlights, /<a\b/);
  assert.ok((highlights.match(/<li\b/g) ?? []).length <= 5);
  assert.match(html, /href="\/posts"/);
  assert.doesNotMatch(html, /Your first note/);
});

test('updates archive renders the editable JSON content', async () => {
  const { status, html } = await render('/updates');
  assert.equal(status, 200);
  const updates = JSON.parse(await readFile(new URL('../content/updates.json', import.meta.url), 'utf8'));
  for (const update of updates) assert.ok(html.includes(`dateTime="${update.date}"`));
});

test('posts archive loads; drafts and missing posts return 404', async () => {
  assert.equal((await render('/posts')).status, 200);
  assert.equal((await render('/posts/first-note')).status, 404);
  assert.equal((await render('/posts/nonexistent-post')).status, 404);
});

test('existing research and project routes remain available', async () => {
  for (const path of ['/about', '/projects', '/publications', '/projects/fitness-tracker']) {
    assert.equal((await render(path)).status, 200, path);
  }
});
