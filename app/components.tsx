import Link from "next/link";
import type { Project } from "./data";
import { ThemeToggle } from "./interactive";

export function SiteHeader() {
  return (
    <header className="site-header">
      <Link className="wordmark" href="/" aria-label="Qing He — home">
        QH<span className="wordmark-dot">.</span>
      </Link>

      <div className="header-actions">
        <nav className="desktop-nav" aria-label="Primary navigation">
          <Link href="/projects">Projects</Link>
          <Link href="/about">About</Link>
          <Link href="/publications">Publications</Link>
          <a href="mailto:qingh@upenn.edu">Contact</a>
        </nav>

        <ThemeToggle />

        <details className="mobile-nav">
          <summary aria-label="Open navigation">Menu</summary>
          <nav aria-label="Mobile navigation">
            <Link href="/projects">Projects</Link>
            <Link href="/about">About</Link>
            <Link href="/publications">Publications</Link>
            <a href="mailto:qingh@upenn.edu">Contact</a>
          </nav>
        </details>
      </div>
    </header>
  );
}

export function ProjectCard({
  project,
  index,
  variant = "feature",
}: {
  project: Project;
  index: number;
  variant?: "feature" | "compact";
}) {
  return (
    <article className={`project-card project-card--${variant}`}>
      <Link href={`/projects/${project.slug}`} className="project-card-link">
        <div className="project-card-image-wrap">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className="project-card-image"
            src={project.cover}
            alt=""
            loading={index > 1 ? "lazy" : "eager"}
          />
          <span className="project-card-index">
            {String(index + 1).padStart(2, "0")}
          </span>
          <span className="project-card-action" aria-hidden="true">
            ↗
          </span>
          <div className="project-card-reveal" aria-hidden="true">
            <span className="reveal-symbol">✦</span>
            <p>{project.intro}</p>
            <div>
              {project.tags.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
          </div>
        </div>
        <div className="project-card-copy">
          <div>
            <p className="eyebrow">
              {project.category} · {project.year}
            </p>
            <h3>{project.title}</h3>
          </div>
          <p>{project.summary}</p>
        </div>
      </Link>
    </article>
  );
}

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <p className="footer-invitation">Have a question or an idea?</p>
      <a className="footer-email" href="mailto:qingh@upenn.edu">
        Let’s talk<span aria-hidden="true"> ↗</span>
      </a>
      <div className="footer-bottom">
        <span>Qing He · Philadelphia</span>
        <div>
          <a
            href="https://github.com/HqSelene"
            target="_blank"
            rel="noreferrer"
          >
            GitHub
          </a>
          <a href="/Qing_He_CV.pdf" target="_blank">
            CV
          </a>
        </div>
        <span>© {new Date().getFullYear()}</span>
      </div>
    </footer>
  );
}
