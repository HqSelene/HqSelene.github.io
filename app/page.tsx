import Link from "next/link";
import { ProjectCard, SiteFooter, SiteHeader } from "./components";
import { featuredProjects } from "./data";
import { RotatingPractice } from "./interactive";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main>
        <section className="home-hero">
          <p className="hero-kicker">
            Designer · Researcher · Builder
            <span>Philadelphia / Beijing</span>
          </p>
          <div className="hero-stage">
            <div className="hero-copy">
              <h1>
                I design interfaces
                <br />
                between <em>people</em>
                <br />
                and emerging systems.
              </h1>
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
          <div className="hero-foot">
            <p>
              I’m Qing He. My work moves across human–computer interaction,
              product design, spatial practice, and data science.
            </p>
            <p className="hero-manifesto">
              One history in one person.
              <br />
              One world, differently lit.
            </p>
            <a className="circle-link" href="#selected-work" aria-label="See work">
              <span>↓</span>
            </a>
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

        <section className="work-section" id="selected-work">
          <div className="section-heading">
            <p className="eyebrow">01 · Selected work</p>
            <h2>Ideas, tested in the world.</h2>
            <div className="section-heading-aside">
              <span className="flower-mark" aria-hidden="true">
                ✿
              </span>
              <Link href="/projects" className="text-link">
                View all projects <span>↗</span>
              </Link>
            </div>
          </div>
          <div className="project-grid">
            {featuredProjects.map((project, index) => (
              <ProjectCard key={project.slug} project={project} index={index} />
            ))}
          </div>
        </section>

        <section className="practice-section">
          <div className="constellation-rule" aria-hidden="true">
            <span>✦</span>
            <i />
            <span>✿</span>
            <i />
            <span>✦</span>
          </div>
          <div className="practice-heading">
            <p className="eyebrow">02 · Practice</p>
            <h2>
              I’m interested in the moment a complex system becomes{" "}
              <em>felt</em>.
            </h2>
          </div>
          <div className="practice-list">
            <article>
              <span>01</span>
              <h3>Human–AI Interaction</h3>
              <p>
                Studying how adaptive and generative systems shape motivation,
                agency, and everyday behavior.
              </p>
            </article>
            <article>
              <span>02</span>
              <h3>Experience & Product</h3>
              <p>
                Turning research questions into clear, testable interactions
                across digital and physical touchpoints.
              </p>
            </article>
            <article>
              <span>03</span>
              <h3>Spatial & Data Systems</h3>
              <p>
                Using space, networks, and visualization to reveal hidden
                relationships and collective patterns.
              </p>
            </article>
          </div>
        </section>

        <section className="profile-strip">
          <div className="profile-image-wrap">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/media/profile.jpg" alt="Qing He" />
          </div>
          <div className="profile-copy">
            <p className="eyebrow">03 · About</p>
            <p className="profile-statement">
              Trained across finance, computer science, and architecture, I use
              design to connect analytical systems with human experience.
            </p>
            <p>
              Currently pursuing a Master of Architecture at the University of
              Pennsylvania, with research experience in HCI and information
              retrieval.
            </p>
            <Link className="text-link" href="/about">
              More about me <span>↗</span>
            </Link>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
