import assert from "node:assert/strict";
import test from "node:test";

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request("http://localhost/", {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("server-renders the portfolio home page", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>Qing He — Designer &amp; Researcher<\/title>/i);
  assert.match(html, /I design interfaces/);
  assert.match(html, /between <em>people<\/em>/);
  assert.match(html, /class="compact-system-map"/);
  assert.match(html, /HCI/);
  assert.match(html, /PRODUCT/);
  assert.match(html, /SPACE/);
  assert.match(html, /DATA/);
  assert.match(html, /id="selected-work"/);
  assert.match(html, /View all projects/);
});

test("keeps the practice bar between the introduction and projects", async () => {
  const response = await render();
  const html = await response.text();

  const heroIndex = html.indexOf('class="compact-home-hero"');
  const barIndex = html.indexOf('class="marquee"');
  const workIndex = html.indexOf('class="compact-home-work"');

  assert.ok(heroIndex >= 0);
  assert.ok(barIndex > heroIndex);
  assert.ok(workIndex > barIndex);

  const projectCards = html.match(/class="project-card project-card--compact"/g);
  assert.equal(projectCards?.length, 3);
});
