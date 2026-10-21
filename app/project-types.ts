import type { ArticleHeading } from "./markdown";

export type ProjectCategory = string;
export type Project = {
  slug: string; title: string; category: ProjectCategory; year: string;
  intro: string; summary: string; tags: string[]; cover: string;
  featured: boolean; role: string; tools: string; order: number;
  archiveUrl?: string; links: { label: string; url: string }[];
  html: string; headings: ArticleHeading[]; gallery: string[];
};

export type ProjectSummary = Omit<Project, "html" | "headings" | "gallery">;

export function getProjectCategories(projects: Pick<Project, "category">[]) {
  const counts = new Map<string, number>();
  for (const { category } of projects) counts.set(category, (counts.get(category) ?? 0) + 1);
  return [...counts].sort(([a], [b]) => a.localeCompare(b))
    .map(([name, count]) => ({ name, count }));
}
