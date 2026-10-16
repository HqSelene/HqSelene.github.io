import Link from "next/link";
import { SiteFooter, SiteHeader } from "./components";
import { featuredProjects } from "./data";
import { RotatingPractice } from "./interactive";
import recentProjects from "../content/recent-projects.json";
import { publications } from "./publications/data";

export default function Home() {
  return <><SiteHeader /><main>
        <div className="landing-viewport">
        <section className="home-hero home-hero--simple">
          <div className="hero-stage">
            <div className="hero-copy hero-introduction">
              <h1>
                I’m <em>Qing He.</em>
              </h1>
              <p className="hero-introduction-lead">
                I’m a designer and researcher studying architecture at the
                University of Pennsylvania. With a background in computer science,
                finance, and design, I explore how AI systems shape human
                motivation, agency, and everyday experience.
              </p>
              <p className="exploring-line">
                I’m exploring in <RotatingPractice />
              </p>
            </div>
            <div className="hero-orbit" aria-hidden="true">
              <span className="orbit orbit-one" />
              <span className="orbit orbit-two" />
              <span className="orbit-dot orbit-dot-one">✦</span>
              <span className="orbit-dot orbit-dot-two">✿</span>
              <span className="orbit-core">QH</span>
              <span className="orbit-note">One star in one person</span>
            </div>
          </div>
          <a className="circle-link hero-scroll-link" href="#recent-projects" aria-label="Scroll to recent projects">
            <span aria-hidden="true">↓</span>
          </a>
        </section>

        <section className="marquee" aria-label="Areas of practice">
          <div>
            <span>HCI</span>
            <i>✦</i>
            <span>AI</span>
            <i>✦</i>
            <span>PRODUCT</span>
            <i>✦</i>
            <span>SPACE</span>
            <i>✦</i>
            <span>DATA</span>
            <i>✦</i>
          </div>
        </section>

        </div>

    <div className="research-content">
    <section className="academic-section" id="recent-projects">
      <div className="academic-heading"><h2>Recent Projects</h2><span className="ongoing-label">Work in progress</span></div>
      <div className="ongoing-projects">{recentProjects.map((project) => <article key={project.title}>
        <h3>{project.title}</h3><p>{project.description}</p>
      </article>)}</div>
    </section>
    <section className="academic-section"><div className="academic-heading"><h2>Selected Publications</h2><Link href="/publications">All publications ↗</Link></div>
      <div className="home-publications">{publications.map((publication) => <article key={publication.title}>
        <span className="venue-label">{publication.venue}</span><div><h3><a href={publication.href} target="_blank" rel="noreferrer">{publication.title}</a></h3>
          <p>{publication.authors.split(/(Qing He)/).map((part, index) => part === "Qing He" ? <strong key={index}>{part}</strong> : part)}</p>
          <a className="paper-link" href={publication.href} target="_blank" rel="noreferrer">{publication.href.endsWith(".pdf") ? "PDF" : "DOI"} ↗</a>
        </div></article>)}</div>
    </section>
    <section className="academic-section" id="selected-work"><div className="academic-heading"><h2>Selected Projects</h2><Link href="/projects">All projects ↗</Link></div>
      <div className="selected-project-list">{featuredProjects.slice(0, 3).map((project) => <article key={project.slug}>
        <Link href={`/projects/${project.slug}`} className="selected-project-thumbnail" aria-label={project.title}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={project.cover} alt="" loading="lazy" />
        </Link>
        <div><p className="project-meta">{project.category} · {project.year}</p>
          <h3><Link href={`/projects/${project.slug}`}>{project.title} <span aria-hidden="true">↗</span></Link></h3>
          <p>{project.summary}</p>
        </div>
      </article>)}</div>
    </section>
    </div>
  </main><SiteFooter /></>;
}
