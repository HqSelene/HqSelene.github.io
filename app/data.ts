import { readFrontmatter, renderMarkdown } from "./markdown";

import { type Project } from "./project-types";
export type { Project, ProjectCategory } from "./project-types";

const sources = import.meta.glob<string>("../content/projects/*.md", { query: "?raw", import: "default", eager: true });

export const projects: Project[] = Object.entries(sources).flatMap(([path, source]) => {
  const { data, body } = readFrontmatter(source, path);
  if (data.draft === true) return [];
  function required(key: string) {
    const value = data[key];
    if (typeof value !== "string" || !value.trim()) throw new Error(`${path}: ${key} must be a non-empty string`);
    return value;
  }
  const category = required("category").trim();
  const tags = data.tags ?? [];
  if (!Array.isArray(tags) || !tags.every(t => typeof t === "string")) throw new Error(`${path}: tags must be a list of strings`);
  const links = data.links ?? [];
  if (!Array.isArray(links) || !links.every(l => l && typeof l.label === "string" && typeof l.url === "string" && /^(https?:\/\/|\/(?!\/))/.test(l.url))) throw new Error(`${path}: invalid links`);
  const year = String(data.year ?? "");
  if (!/^\d{4}$/.test(year)) throw new Error(`${path}: year must have four digits`);
  const cover = required("cover");
  if (!/^(https?:\/\/|\/(?!\/))/.test(cover)) throw new Error(`${path}: invalid cover path`);
  const article = renderMarkdown(body);
  const sectionLabels = data.sectionLabels;
  if (sectionLabels !== undefined && (!sectionLabels || typeof sectionLabels !== "object" || Array.isArray(sectionLabels) || !Object.values(sectionLabels).every(label => typeof label === "string"))) {
    throw new Error(`${path}: sectionLabels must map heading titles to short text labels`);
  }
  const labels = (sectionLabels ?? {}) as Record<string, string>;
  return [{ slug: path.split("/").pop()!.replace(/\.md$/, ""), title: required("title"),
    category, year, intro: required("intro"), summary: required("summary"),
    tags, cover, featured: data.featured === true, role: required("role"), tools: required("tools"),
    order: typeof data.order === "number" ? data.order : 999,
    archiveUrl: typeof data.archiveUrl === "string" ? data.archiveUrl : undefined,
    links, html: article.html, headings: article.headings.map(heading => ({ ...heading, title: labels[heading.title] || heading.title })), gallery: article.images }];
}).sort((a, b) => Number(b.year) - Number(a.year) || a.order - b.order || a.title.localeCompare(b.title));

export const featuredProjects = projects.filter(project => project.featured);
export function getProject(slug: string) { return projects.find(project => project.slug === slug); }
