import assert from 'node:assert/strict';
import { readFile, readdir, access } from 'node:fs/promises';
import test from 'node:test';
import { readFrontmatter, renderMarkdown } from '../app/markdown.ts';

async function render(path) {
  const route = path.replace(/^\/+|\/+$/g, '');
  try {
    const html = await readFile(new URL(`../dist/client/${route ? route + '/' : ''}index.html`, import.meta.url), 'utf8');
    return { status: 200, html };
  } catch (error) {
    if (error.code !== 'ENOENT') throw error;
    return { status: 404, html: await readFile(new URL('../dist/client/404.html', import.meta.url), 'utf8') };
  }
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
  assert.doesNotMatch(html, /Recent Posts/);
  assert.match(html, /hero-orbit/);
  assert.match(html, /href="#recent-projects"/);
  assert.match(html, /LLM for Qualitative Coding/);
  assert.match(html, /Simulation for Architecture/);
  assert.match(html, /Experience-Centered Spatial Simulation \(ECSS\) Framework/);
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

test('Markdown projects render their images and matching table-of-contents anchors', async () => {
  const root = new URL('../content/projects/', import.meta.url);
  const files = (await readdir(root)).filter(file => file.endsWith('.md'));
  let published = 0;
  for (const file of files) {
    const source = await readFile(new URL(file, root), 'utf8');
    const { data, body } = readFrontmatter(source, file);
    const { status, html } = await render(`/projects/${file.replace(/\.md$/, '')}`);
    if (data.draft === true) {
      assert.equal(status, 404, file);
      continue;
    }
    published++;
    assert.equal(status, 200, file);
    assert.match(html, /class="story-layout"/);
    const article = renderMarkdown(body);
    for (const image of [data.cover, ...article.images]) {
      assert.ok(html.includes(`src="${image}"`), `${file}: ${image}`);
      if (image.startsWith('/media/')) await access(new URL(`../public${image}`, import.meta.url));
    }
    for (const heading of article.headings) {
      assert.ok(html.includes(`id="${heading.id}"`));
      assert.ok(html.includes(`href="#${heading.id}"`));
    }
  }
  assert.ok(published > 0, 'published project files are present');
});

test('Markdown supports unique multilingual headings, inline figures and paired images', () => {
  const article = renderMarkdown(`## 重复标题

First paragraph.

![A drawing](/media/dont-touch/section.png "right")

Another paragraph.

## 重复标题

![One](/media/warren/app.png)
![Two](/media/warren/icon.png)

| Method | Result |
| --- | --- |
| A | B |`);
  assert.equal(new Set(article.headings.map(h => h.id)).size, 2);
  assert.match(article.html, /article-figure-right/);
  assert.match(article.html, /article-image-pair/);
  assert.match(article.html, /article-table/);
  assert.equal(article.images.length, 3);
  assert.ok(article.html.indexOf('First paragraph') < article.html.indexOf('A drawing'));
  assert.ok(article.html.indexOf('A drawing') < article.html.indexOf('Another paragraph'));
});

 test('single body images default centered, with an explicit full-width option', () => {
  const article = renderMarkdown('![Detail](/media/warren/app.png)\n\nBody text.\n\n![Diagram](/media/warren/icon.png "full")');
  assert.match(article.html, /article-figure-centered/);
  assert.match(article.html, /article-figure-full/);
});


test('project archive lists every published Markdown project newest first', async () => {
  const root = new URL('../content/projects/', import.meta.url);
  const records = [];
  for (const file of await readdir(root)) {
    if (!file.endsWith('.md')) continue;
    const { data } = readFrontmatter(await readFile(new URL(file, root), 'utf8'), file);
    if (data.draft === true) continue;
    records.push({ slug: file.replace(/\.md$/, ''), year: Number(data.year) });
  }
  const { html } = await render('/projects');
  const grid = html.slice(html.indexOf('class="project-index-grid"'));
  const positions = records.map(record => ({ ...record, position: grid.indexOf(`href="/projects/${record.slug}"`) }));
  for (const record of positions) assert.ok(record.position >= 0, record.slug);
  positions.sort((a, b) => a.position - b.position);
  for (let i = 1; i < positions.length; i++) assert.ok(positions[i - 1].year >= positions[i].year);
  assert.ok(records.some(record => record.slug === 'disclosure'));
  assert.ok(records.some(record => record.slug === 'help-seekers'));
});

test('restored project links sit between the cover and article text', async () => {
  for (const slug of ['emotion-space', 'musical-influence', 'warren-for-vs-code']) {
    const { html } = await render(`/projects/${slug}`);
    const cover = html.indexOf('class="story-cover ');
    const links = html.indexOf('aria-label="Project links"');
    const prose = html.indexOf('class="story-prose"');
    assert.ok(cover < links && links < prose, slug);
    const { data } = readFrontmatter(await readFile(new URL(`../content/projects/${slug}.md`, import.meta.url), 'utf8'), slug);
    for (const link of data.links) assert.ok(html.slice(links, prose).includes(`href="${link.url}"`), link.url);
  }
});

test('original-site migration preserves every captured text block, link and image', async () => {
  const audit = JSON.parse(await readFile(new URL('../content/migration/original-site.json', import.meta.url), 'utf8'));
  const normalize = value => value.replace(/&(?:amp|lt|gt|quot|apos|#39|#x27|nbsp);/g,
    entity => ({ '&amp;': '&', '&lt;': '<', '&gt;': '>', '&quot;': '"', '&apos;': "'", '&#39;': "'", '&#x27;': "'", '&nbsp;': ' ' })[entity]).replace(/\s+/g, '');
  for (const page of audit.pages) {
    const { status, html } = await render(page.route);
    assert.equal(status, 200, page.route);
    const prose = html.match(/<div class="story-prose">([\s\S]*?)<\/div><dialog/)?.[1];
    assert.ok(prose, page.route);
    const text = normalize(prose.replace(/<[^>]*>/g, ''));
    for (const block of page.textBlocks) assert.ok(text.includes(normalize(block)), `${page.route}: ${block.slice(0, 100)}`);
    for (const link of page.links) assert.ok(prose.includes(`href="${link.url.replace(/&/g, '&amp;')}"`), link.url);
    for (const image of page.images) {
      assert.ok(prose.includes(`src="${image.local}"`), image.source);
      await access(new URL(`../public${image.local}`, import.meta.url));
    }
  }
  assert.equal(audit.pages.length, 15);
});

test('standalone quotes support centered styling, inline formatting and optional attribution', () => {
  const rich = renderMarkdown('Before.\n\n> [!QUOTE]\n> A **shared** landscape.\n>\n> Another thought.\n>\n> — Qing He · [Source](https://example.com)\n\n## Following section\n\nAfter.');
  assert.match(rich.html, /<figure class="story-pullquote">/);
  assert.match(rich.html, /<strong>shared<\/strong>/);
  assert.match(rich.html, /<figcaption>— Qing He/);
  assert.match(rich.html, /href="https:\/\/example.com"/);
  assert.doesNotMatch(rich.html, /\[!QUOTE\]/);
  assert.equal(rich.headings.length, 1);
  const plain = renderMarkdown('> [!QUOTE]\n> No attribution.');
  assert.doesNotMatch(plain.html, /figcaption/);
  const ordinary = renderMarkdown('> Ordinary quote.');
  assert.match(ordinary.html, /<blockquote>/);
  assert.doesNotMatch(ordinary.html, /story-pullquote/);
});

test('standalone quotes preserve soft and hard line breaks without changing ordinary prose', () => {
  const quote = renderMarkdown('> [!QUOTE]\n> First line.\n> Second line.  \n> Third line.\n>\n> A new paragraph.');
  assert.equal((quote.html.match(/<br\s*\/?\s*>/g) ?? []).length, 2);
  assert.match(quote.html, /<p>A new paragraph\.<\/p>/);
  const prose = renderMarkdown('First line.\nSecond line.');
  assert.doesNotMatch(prose.html, /<br/);
});

test('project categories come from current published content rather than a fixed list', async () => {
  const { getProjectCategories } = await import('../app/project-types.ts');
  assert.deepEqual(getProjectCategories([
    { category: 'Architecture Studio' }, { category: 'Tools' }, { category: 'Architecture Studio' },
  ]), [{ name: 'Architecture Studio', count: 2 }, { name: 'Tools', count: 1 }]);
  assert.deepEqual(getProjectCategories([]), []);
  const root = new URL('../content/projects/', import.meta.url);
  const counts = new Map();
  for (const file of await readdir(root)) {
    if (!file.endsWith('.md')) continue;
    const { data } = readFrontmatter(await readFile(new URL(file, root), 'utf8'), file);
    if (data.draft === true) continue;
    const category = data.category.trim();
    counts.set(category, (counts.get(category) ?? 0) + 1);
  }
  const { html } = await render('/projects');
  const filters = html.match(/<div class="project-filter-list"[\s\S]*?<\/div>/)?.[0];
  assert.ok(filters);
  assert.equal((filters.match(/<button\b/g) ?? []).length, counts.size + 1);
  for (const [name, count] of counts) {
    assert.ok(filters.includes(`<span>${name.replace(/&/g, '&amp;')}</span><strong>${count}</strong>`));
  }
});

test('static Pages output includes local assets, home navigation payload and legacy redirects', async () => {
  const output = new URL('../dist/client/', import.meta.url);
  assert.equal(await readFile(new URL('.rsc', output), 'utf8'), await readFile(new URL('index.rsc', output), 'utf8'));
  await access(new URL('.nojekyll', output));
  for (const path of await readdir(output, { recursive: true })) {
    if (!path.endsWith('.html')) continue;
    const html = await readFile(new URL(path, output), 'utf8');
    for (const match of html.matchAll(/(?:src|href)="(\/[^"#?]*)(?:[?#][^"]*)?"/g)) {
      const target = decodeURIComponent(match[1].replaceAll('&amp;', '&'));
      if (target.startsWith('//')) continue;
      const relative = target.replace(/^\/+|\/+$/g, '');
      try {
        await access(new URL(relative || 'index.html', output));
      } catch (error) {
        assert.fail(`${path}: missing static asset or page ${target}: ${error.message}`);
      }
    }
  }
  const originalMigration = JSON.parse(await readFile(new URL("../content/migration/original-site.json", import.meta.url), "utf8"));
  for (const page of originalMigration.pages) {
    const source = new URL(page.source);
    if (!/^\/post\/[a-z0-9]+\/$/i.test(source.pathname)) continue;
    const html = await readFile(new URL(source.pathname.slice(1) + 'index.html', output), 'utf8');
    assert.ok(html.includes(`href="${page.route}/"`), source.pathname);
  }
});

test('publication archive and homepage follow the shared editable configuration', async () => {
  const entries = JSON.parse(await readFile(new URL('../content/publications.json', import.meta.url), 'utf8'));
  const home = (await render('/')).html;
  const archive = (await render('/publications')).html;
  const selected = home.slice(home.indexOf('Selected Publications'), home.indexOf('Selected Projects'));
  for (const entry of entries) {
    assert.ok(archive.includes(entry.title), entry.title);
    assert.equal(selected.includes(entry.title), entry.showOnHome === true, entry.title);
    assert.ok(archive.includes(entry.href), entry.href);
    if (entry.showOnHome && entry.image) assert.ok(selected.includes(`src="${entry.image}"`));
  }
  const nudging = entries.find(entry => entry.title.startsWith('Does Personalized'));
  assert.equal(nudging.href, 'https://dl.acm.org/doi/full/10.1145/3772318.3791777');
  assert.doesNotMatch(selected, /Longitudinal_Study_of_AI_Self_Modeling.pdf/);
  const recent = JSON.parse(await readFile(new URL('../content/recent-projects.json', import.meta.url), 'utf8'));
  for (const entry of recent) {
    if (entry.image) assert.ok(home.includes(`src="${entry.image}"`));
  }
});
