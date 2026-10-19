import { parse as parseYaml } from "yaml";
import { marked } from "marked";
import updateData from "../content/updates.json";

type Update = { date: string; description: string };
export type Post = { slug: string; title: string; date: string; summary: string; html: string };

function validDate(value: unknown): value is string {
  return typeof value === "string" && /^\d{4}-\d{2}-\d{2}$/.test(value) &&
    !Number.isNaN(Date.parse(value)) && new Date(value).toISOString().slice(0, 10) === value;
}

export const updates: Update[] = updateData.map((item) => {
  if (!validDate(item.date) || typeof item.description !== "string" || !item.description.trim()) {
    throw new Error("Invalid entry in content/updates.json: use a valid YYYY-MM-DD date and a non-empty description.");
  }
  return item;
}).sort((a, b) => b.date.localeCompare(a.date));

// Bundle Markdown at build time: no runtime filesystem is needed on Workers.
const sources = import.meta.glob<string>("../content/posts/*.md", {
  query: "?raw", import: "default", eager: true,
});

export const posts: Post[] = Object.entries(sources).flatMap(([path, source]) => {
  const frontmatter = source.match(/^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/);
  if (!frontmatter) throw new Error(`Missing YAML frontmatter in ${path}`);
  const data = parseYaml(frontmatter[1]);
  if (!data || typeof data !== "object") throw new Error(`Invalid YAML frontmatter in ${path}`);
  const content = source.slice(frontmatter[0].length);
  if (data.draft === true) return [];
  const date = data.date instanceof Date ? data.date.toISOString().slice(0, 10) : data.date;
  if (typeof data.title !== "string" || !data.title.trim() || !validDate(date) || typeof data.summary !== "string") {
    throw new Error(`Invalid post metadata in ${path}: title, date and summary are required.`);
  }
  return [{ slug: path.split("/").pop()!.replace(/\.md$/, ""), title: data.title, date,
    summary: data.summary, html: marked.parse(content, { async: false }) }];
}).sort((a, b) => b.date.localeCompare(a.date));

export function formatDate(date: string) {
  return new Intl.DateTimeFormat("en", { month: "short", year: "numeric", timeZone: "UTC" }).format(new Date(date));
}
