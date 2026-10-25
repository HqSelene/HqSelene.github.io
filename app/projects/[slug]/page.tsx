import { pageMetadata } from "../../seo";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProject, projects } from "../../data";
import { ArticleLayout } from "../../article-layout";

export function generateStaticParams() { return projects.map(project => ({ slug: project.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  return project ? pageMetadata(`/projects/${slug}/`, `${project.title} — Qing He`, project.summary, project.cover) : {};
}

export default async function ProjectDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();
  const nextProject = projects[(projects.indexOf(project) + 1) % projects.length];
  return <ArticleLayout variant="project" title={project.title} label={`${project.category} · ${project.year}`}
    intro={project.intro} summary={project.summary} cover={project.cover}
    resources={[...project.links, ...(project.archiveUrl ? [{ label: "Original case study", url: project.archiveUrl }] : [])]}
    html={project.html} headings={project.headings} backHref="/projects" backLabel="All Projects"
    metadata={[{ label: "Type", value: project.category }, { label: "Year", value: project.year },
      { label: "Role", value: project.role }, { label: "Tools & methods", value: project.tools },
      ...(project.tags.length ? [{ label: "Focus", value: project.tags.join(" · ") }] : [])]}>
    {nextProject && nextProject.slug !== project.slug && <Link className="story-next" href={`/projects/${nextProject.slug}`}><span className="eyebrow">Next project</span><strong>{nextProject.title}</strong><span aria-hidden="true">↗</span></Link>}
  </ArticleLayout>;
}
