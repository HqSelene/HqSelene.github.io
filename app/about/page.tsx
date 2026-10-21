import type { Metadata } from "next";
import { SiteFooter, SiteHeader } from "../components";
import { AboutPhotos } from "./about-photos";

const photoFiles = import.meta.glob<string>("../../content/about-photos/*.{jpg,jpeg,png,webp,avif,JPG,JPEG,PNG,WEBP,AVIF}", { eager: true, query: "?url", import: "default" });
const photos = Object.entries(photoFiles).sort(([a], [b]) => a.localeCompare(b, "en", { numeric: true })).map(([path, src]) => ({ src, alt: path.split("/").pop()!.replace(/\.[^.]+$/, "").replace(/^\d+[-_ ]*/, "").replace(/[-_]/g, " ") }));

export const metadata: Metadata = {
  title: "About — Qing He",
  description: "Qing He is a Master of Architecture student at the University of Pennsylvania and a research assistant at Penn HCI, exploring human–AI interaction, creativity, and human experience.",
};

export default function AboutPage() {
  return <>
    <SiteHeader />
    <main className="inner-page about-page index-page">
      <section className="about-profile" aria-labelledby="about-hello">
        <figure className="about-portrait">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/media/profile.jpg" alt="Portrait of Qing He" />
          <figcaption>Qing He <span>Somewhere between disciplines ✦</span></figcaption>
          <span className="about-photo-sticker" aria-hidden="true">Always<br />curious ↗</span>
        </figure>
        <div className="about-profile-copy">
          <p className="eyebrow">Architecture · Human–Computer Interaction</p>
          <h1 id="about-hello">Hi! I’m <em>Qing</em><span>.</span></h1>
          <p>I’m a third-year Master of Architecture student at the University of Pennsylvania. I am a research assistant at Penn HCI, working with Professor Danaé Metaxa on Human–Computer Interaction (HCI).</p>
          <nav className="about-contact-links" aria-label="Contact Qing">
            <a href="mailto:qingh@upenn.edu">Email ↗</a>
            <a href="/Qing_He_CV.pdf" target="_blank" rel="noopener noreferrer">Curriculum vitae ↗</a>
            <a href="https://github.com/HqSelene" target="_blank" rel="noopener noreferrer">GitHub ↗</a>
          </nav>
        </div>
      </section>

      <section className="about-section about-background" aria-labelledby="about-background">
        <header><p className="eyebrow">The path so far</p><h2 id="about-background">Across disciplines</h2></header>
        <div className="about-section-body">
          <p>My academic journey has taken me from Finance and Computer Science to Architecture, and now to HCI. I received my bachelor’s degrees in Finance and Data Science &amp; Big Data Technology from Renmin University of China, where I conducted research on machine learning, explainable algorithms, and information retrieval. My architectural education has since brought me closer to questions about human experiences, perception, and creativity.</p>
          <div className="about-journey" aria-label="Academic journey">
            <div><span className="eyebrow">01 · Systems</span><strong>Finance &amp;<br />Computer Science</strong></div><span className="about-path-arrow" aria-hidden="true">↗</span><div><span className="eyebrow">02 · Spaces</span><strong>Architecture</strong></div><span className="about-path-arrow" aria-hidden="true">↗</span><div><span className="eyebrow">03 · People</span><strong>HCI</strong></div>
          </div>
        </div>
      </section>

      <section className="about-section about-research" aria-labelledby="about-research">
        <header><p className="eyebrow">Questions I keep coming back to</p><h2 id="about-research">People, AI &amp; creativity</h2></header>
        <div className="about-section-body">
          <p>My research interests lie at the intersection of Human–AI Interaction, Creativity Support, and Human-Centered Computing. I’m particularly interested in understanding how AI shapes the ways people think, create, and make decisions, and how we can design AI systems that augment rather than replace human judgment and creativity.</p>
          <p>I’m currently exploring two interconnected directions:</p>
          <p><strong>AI for Human Creativity and Decision-Making.</strong> I study how people interact with AI in complex, open-ended tasks, including architectural design and qualitative research, with a focus on creative agency, reasoning, and appropriate reliance.</p>
          <p><strong>Computational Models of Human Experience.</strong> I explore how generative agents can model human perception, cognition, and spatial experiences, and how these simulations might help us better understand diverse human perspectives and provide insights for future tool development.</p>
          <p>Beyond research, I’m interested in the connections between technology, design, and the humanities. I enjoy exploring how different disciplines understand people and how these perspectives can inspire new ways of thinking about AI.
            As a curious person, I also want to learn more about social computing, psychology, and philosophy, which are important for me to understand the broader implications of AI.
          </p>
        </div>
      </section>

      <section className="about-section about-beyond" aria-labelledby="about-interests">
        <header><p className="eyebrow">Off the clock</p><h2 id="about-interests">Life has a<br /><em>different rhythm.</em></h2></header>
        <div className="about-section-body">
          <p>Outside of research, I enjoy musicals, pilates, hiking, traveling and K-pop.</p>
          <p>I like traveling to new places and trying different local foods (a real foodie)! I think
            food is the most important culture. My goal is traveling to as many countries as possible.
            I have been to Korea, Indonesia, Netherlands, Belgium, Denmark, Colombia. I saw a red but beutiful
            mushroom while I was hiking in Colombia🍄!
          </p>
          <p>I like music in general, Jazz, Hip-hop, Pop, Country, etc. I am an Army (fan of BTS),
            and also a big fan of musicals! Les Misérables, Hadestown, Notre-Dame de Paris are my favorites!</p>
        </div>
        <AboutPhotos photos={photos} />
          <ul className="about-interest-list" aria-label="Personal interests">
            <li className="interest-stage">
              <svg viewBox="0 0 200 150" fill="none" aria-hidden="true"><path d="M28 25h144v104H28zM20 134h160M100 25v15"/><path d="M28 25c42 17 36 55 0 73m144-73c-42 17-36 55 0 73M28 98l17 31m127-31-17 31"/><path d="m100 43 32 77H68z" className="interest-fill"/><circle cx="100" cy="83" r="7"/><path d="M100 91v24m-13-15 13-6 13 6"/></svg>
              <span className="interest-caption">Stories on stage</span><h3>Musical</h3>
            </li>
            <li className="interest-movement">
              <svg viewBox="0 0 200 150" fill="none" aria-hidden="true"><ellipse cx="100" cy="127" rx="70" ry="9" className="interest-fill"/><circle cx="130" cy="58" r="11"/><path d="M120 69 93 92l-37 4-18 28m55-32 33 17 24 15M111 77l20 17 34-8M115 73 95 54l-4-26"/><path d="M48 39c-18 13-21 31-13 47m121-62 7 11m-1-18 9 2"/></svg>
              <span className="interest-caption">Movement &amp; balance</span><h3>Pilates</h3>
            </li>
            <li className="interest-trail">
              <svg viewBox="0 0 200 150" fill="none" aria-hidden="true"><circle cx="151" cy="35" r="15" className="interest-fill"/><path d="m18 120 52-77 36 48 24-33 53 62M52 69l18 9 13-16M28 130h144"/><path d="M102 126c-21-14 37-20 9-32" strokeDasharray="4 6"/><path d="M33 34h22m-11-9v18"/></svg>
              <span className="interest-caption">Time outdoors</span><h3>Hiking</h3>
            </li>
            <li className="interest-music">
              <svg viewBox="0 0 200 150" fill="none" aria-hidden="true"><circle cx="100" cy="77" r="48" className="interest-fill"/><circle cx="100" cy="77" r="34"/><circle cx="100" cy="77" r="10"/><path d="M100 38a39 39 0 0 1 39 39M61 77a39 39 0 0 0 39 39M157 24v29m-14-14h28M30 94v23m-11-11h22"/><path d="m164 104 5 10 11 2-8 8 2 11-10-5-10 5 2-11-8-8 11-2z"/></svg>
              <span className="interest-caption">Music &amp; performance</span><h3>K-pop</h3>
            </li>
          </ul>
      </section>
    </main>
    <SiteFooter />
  </>;
}
