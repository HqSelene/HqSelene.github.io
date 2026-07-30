import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteFooter, SiteHeader } from "../../components";
import { getProject, projects } from "../../data";
import { ProjectGallery } from "./project-gallery";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return {
    title: `${project.title} — Qing He`,
    description: project.summary,
  };
}

export default async function ProjectDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const currentIndex = projects.findIndex((item) => item.slug === project.slug);
  const nextProject = projects[(currentIndex + 1) % projects.length];

  return (
    <>
      <SiteHeader />
      <main className="case-study">
        <section className="case-hero">
          <div className="case-hero-top">
            <p className="eyebrow">
              {project.category} · {project.year}
            </p>
            <Link href="/projects" className="text-link">
              All projects <span>↗</span>
            </Link>
          </div>
          <h1>{project.title}</h1>
          <p className="case-intro">{project.intro}</p>
          <div className="case-cover">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={project.cover} alt={`${project.title} project cover`} />
          </div>
        </section>

        <section className="case-overview">
          <p className="eyebrow">Overview</p>
          <p className="case-summary">{project.summary}</p>
          <dl>
            <div>
              <dt>Role</dt>
              <dd>{project.role}</dd>
            </div>
            <div>
              <dt>Methods & tools</dt>
              <dd>{project.tools}</dd>
            </div>
            <div>
              <dt>Focus</dt>
              <dd>{project.tags.join(" · ")}</dd>
            </div>
          </dl>
        </section>

        <div className="case-narrative">
          {project.sections.map((section, index) => (
            <section className="case-section" key={section.title}>
              <p className="eyebrow">
                {String(index + 1).padStart(2, "0")} · {section.eyebrow}
              </p>
              <div>
                <h2>{section.title}</h2>
                {section.body.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </section>
          ))}
        </div>

        <ProjectGallery
          title={project.title}
          images={[project.cover, ...project.gallery]}
        />

        <section className="case-archive">
          <p>
            This focused case study preserves the project inside the new
            portfolio. The original long-form page remains available as an
            archive.
          </p>
          <a
            className="text-link"
            href={project.archiveUrl}
            target="_blank"
            rel="noreferrer"
          >
            Open original case study <span>↗</span>
          </a>
        </section>

        <Link className="next-project" href={`/projects/${nextProject.slug}`}>
          <span className="eyebrow">Next project</span>
          <strong>{nextProject.title}</strong>
          <span aria-hidden="true">↗</span>
        </Link>
      </main>
      <SiteFooter />
    </>
  );
}
