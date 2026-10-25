import { pageMetadata } from "./seo";
import site from "../content/site.json";
import { ResearchThumbnail } from "./research-thumbnail";
import { PublicationAward } from "./publications/publication-award";
import Link from "next/link";
import { SiteFooter, SiteHeader } from "./components";
import { featuredProjects } from "./data";
import { RotatingPractice } from "./interactive";
import recentProjects from "../content/recent-projects.json";
import { selectedPublications } from "./publications/data";
import { UpdateList } from "./content-components";

export const metadata = pageMetadata("/", site.title, site.description);

export default function Home() {
  return <><SiteHeader /><main>
        <div className="landing-viewport">
        <section className="home-hero home-hero--simple">
          <div className="hero-stage">
            <div className="hero-copy hero-introduction">
              <h1>
                I’m <em>He, Qing</em> [贺清]
              </h1>
              <p className="hero-introduction-lead">
                I’m a third-year Master of Architecture (M.Arch) student at the
                University of Pennsylvania, where I’m also a research assistant at
                Penn HCI, working with <a href="https://metaxa.net/">Danaé Metaxa</a> on Human–Computer
                Interaction (Simulation for Architecture, LLM for Qualitative Coding, LLM Audit for Community).
              </p>
              <p className="hero-introduction-lead">
                Before Penn, I studied Computer Science and Finance at Renmin
                University of China. I previously conducted machine learning
                research at the NLPIR Lab, advised by <a href="https://playbigdata.ruc.edu.cn/dou/">Zhicheng Dou</a> and{" "}
                <a href="https://scholar.google.com/citations?user=NosrkdgAAAAJ">Qiannan Zhu</a>, and HCI research at Tsinghua University’s Pervasive HCI
                Lab, advised by <a href="https://pi.cs.tsinghua.edu.cn/lab/people/YuntaoWang/">Yuntao Wang</a>.
              </p>
              <p className="exploring-line">
                I’m exploring in <RotatingPractice />
              </p>
            </div>
            <div className="hero-side">
            <div className="hero-orbit" aria-hidden="true">
              <span className="orbit orbit-one" />
              <span className="orbit orbit-two" />
              <span className="orbit-dot orbit-dot-one">✦</span>
              <span className="orbit-dot orbit-dot-two">✿</span>
              <span className="orbit-core">QH</span>
              <span className="orbit-note">One star in one person</span>
            </div>
            <aside className="hero-updates" aria-labelledby="hero-updates-title">
              <h2 id="hero-updates-title">Recent Highlights</h2>
              <UpdateList limit={5} />
            </aside>
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
        <ResearchThumbnail image={project.image} imageAlt={project.imageAlt} />
        <div>{project.label && <p className="recent-project-label">{project.label}</p>}<h3>{project.href ? <Link href={project.href}>{project.title} <span aria-hidden="true">↗</span></Link> : project.title}</h3><p>{project.description}</p></div>
      </article>)}</div>
    </section>
    <section className="academic-section"><div className="academic-heading"><h2>Selected Publications</h2><Link href="/publications">All publications ↗</Link></div>
      <div className="home-publications">{selectedPublications.map((publication) => <article key={publication.title}>
        <ResearchThumbnail image={publication.image} imageAlt={publication.imageAlt} />
        <div><div className="publication-labels"><span className="venue-label">{publication.venue}</span><PublicationAward award={publication.award} /></div><h3>{publication.href.trim() ? <a href={publication.href} target="_blank" rel="noreferrer">{publication.title}</a> : publication.title}</h3>
          <p>{publication.authors.split(/(Qing He)/).map((part, index) => part === "Qing He" ? <strong key={index}>{part}</strong> : part)}</p>
          {publication.href.trim() && <a className="paper-link" href={publication.href} target="_blank" rel="noreferrer">{publication.href.endsWith(".pdf") ? "PDF" : "Link"} ↗</a>}
        </div></article>)}</div>
    </section>
    <section className="academic-section project-showcase" id="selected-work">
      <div className="academic-heading"><h2>Selected Projects</h2><Link href="/projects">All projects ↗</Link></div>
      <div className="showcase-grid">{featuredProjects.slice(0, 3).map((project, index) => <article className="showcase-card" key={project.slug}>
        <Link href={`/projects/${project.slug}`} className="showcase-link">
          <div className="showcase-image">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={project.cover} alt="" loading="lazy" />
            <span className="showcase-number" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
            <span className="showcase-open">Explore project <span aria-hidden="true">↗</span></span>
          </div>
          <div className="showcase-copy">
            <p className="showcase-meta">{project.category} · {project.year}</p>
            <h3>{project.title}<span aria-hidden="true">↗</span></h3>
            <p className="showcase-summary">{project.summary}</p>
          </div>
        </Link>
      </article>)}</div>
    </section>
    </div>
  </main><SiteFooter /></>;
}
