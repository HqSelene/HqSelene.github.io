import Link from "next/link";
import { ProjectCard, SiteFooter, SiteHeader } from "./components";
import { featuredProjects } from "./data";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main>
        <section className="compact-home-hero">
          <div className="compact-hero-copy">
            <p className="compact-hero-kicker">Research · Design · Build</p>
            <div>
              <h1>
                I design interfaces
                <br />
                between <em>people</em>
                <br />
                and emerging systems.
              </h1>
              <p className="compact-hero-intro">
                I explore human–AI relationships across digital interfaces and
                physical environments, drawing from HCI, architecture, product
                design, and data science.
              </p>
              <Link className="compact-hero-cta" href="#selected-work">
                See my work <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>

          <div className="compact-system-map" aria-hidden="true">
            <span className="system-ring system-ring-one" />
            <span className="system-ring system-ring-two" />
            <span className="system-core">QH</span>
            <span className="system-point system-point-hci">
              <i>✦</i>
              <b>HCI</b>
              <small>People and interaction</small>
            </span>
            <span className="system-point system-point-ai">
              <i>✦</i>
              <b>AI</b>
              <small>Intelligent systems</small>
            </span>
            <span className="system-point system-point-space">
              <i>△</i>
              <b>Space</b>
              <small>Built environments</small>
            </span>
            <span className="system-point system-point-data">
              <i>▦</i>
              <b>Data</b>
              <small>From data to understanding</small>
            </span>
            <p>
              One history in one person.
              <br />
              One world, differently lit.
            </p>
          </div>
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

        <section className="compact-home-work" id="selected-work">
          <div className="compact-work-heading">
            <p className="eyebrow">Selected work</p>
            <Link href="/projects" className="compact-work-link">
              View all projects <span aria-hidden="true">→</span>
            </Link>
          </div>
          <div className="compact-project-row">
            {featuredProjects.slice(0, 4).map((project, index) => (
              <ProjectCard
                key={project.slug}
                project={project}
                index={index}
                variant="compact"
              />
            ))}
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
