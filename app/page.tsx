import Link from "next/link";
import { ProjectCard, SiteFooter, SiteHeader } from "./components";
import { featuredProjects } from "./data";
import { RotatingPractice } from "./interactive";
import { PostList, UpdateList } from "./content-components";
import { publications } from "./publications/data";

export default function Home() {
  return <><SiteHeader /><main className="academic-home">
    <section className="home-hero academic-hero">
      <div className="hero-stage">
        <div className="hero-copy">
          <p className="eyebrow">Researcher · Designer · Builder</p>
          <h1>Qing He<span className="name-dot">.</span></h1>
          <p className="academic-bio">I study how people interact with AI systems, with a focus on motivation, agency, and long-term engagement.</p>
          <p className="academic-context">Currently pursuing a Master of Architecture at the University of Pennsylvania. My work connects human–computer interaction, design, and computational systems.</p>
          <div className="intro-links"><a href="mailto:qingh@upenn.edu">Email ↗</a><a href="/Qing_He_CV.pdf" target="_blank" rel="noreferrer">CV ↗</a><a href="https://github.com/HqSelene" target="_blank" rel="noreferrer">GitHub ↗</a><Link href="/about">About me ↗</Link></div>
          <p className="exploring-line">Exploring <RotatingPractice /></p>
        </div>
        <div className="hero-orbit" aria-hidden="true"><span className="orbit orbit-one" /><span className="orbit orbit-two" /><span className="orbit-dot orbit-dot-one">✦</span><span className="orbit-dot orbit-dot-two">✿</span><span className="orbit-core">QH</span><span className="orbit-note">One star in one person</span></div>
      </div>
    </section>
    <section className="academic-section"><div className="academic-heading"><h2>Recent Updates</h2><Link href="/updates">All updates ↗</Link></div><UpdateList limit={5} /></section>
    <section className="academic-section"><div className="academic-heading"><h2>Selected Publications</h2><Link href="/publications">All publications ↗</Link></div>
      <div className="home-publications">{publications.map((publication) => <article key={publication.title}>
        <span className="venue-label">{publication.venue}</span><div><h3><a href={publication.href} target="_blank" rel="noreferrer">{publication.title}</a></h3>
          <p>{publication.authors.split(/(Qing He)/).map((part, index) => part === "Qing He" ? <strong key={index}>{part}</strong> : part)}</p>
          <a className="paper-link" href={publication.href} target="_blank" rel="noreferrer">{publication.href.endsWith(".pdf") ? "PDF" : "DOI"} ↗</a>
        </div></article>)}</div>
    </section>
    <section className="academic-section" id="selected-work"><div className="academic-heading"><h2>Selected Projects</h2><Link href="/projects">All projects ↗</Link></div>
      <div className="academic-projects">{featuredProjects.slice(0, 3).map((project, index) => <ProjectCard key={project.slug} project={project} index={index} variant="compact" />)}</div>
    </section>
    <section className="academic-section"><div className="academic-heading"><h2>Recent Posts</h2><Link href="/posts">All posts ↗</Link></div><PostList limit={3} /></section>
  </main><SiteFooter /></>;
}
