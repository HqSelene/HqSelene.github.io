import { PageHeading } from "../page-heading";
import type { Metadata } from "next";
import { SiteFooter, SiteHeader } from "../components";

export const metadata: Metadata = {
  title: "About — Qing He",
  description:
    "Qing He is a designer and researcher working across HCI, product, architecture, and data science.",
};

export default function AboutPage() {
  return (
    <>
      <SiteHeader />
      <main className="inner-page about-page index-page">
        <PageHeading title="About" label="Qing He · Background & interests" description="I work between disciplines on purpose — connecting analytical systems with human experience." />

        <section className="about-lead">
          <div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/media/profile.jpg" alt="Portrait of Qing He" />
          </div>
          <div>
            <p className="lead-copy">
              I’m a designer and researcher interested in how AI and other
              complex systems reshape human behavior, perception, and
              collective life.
            </p>
            <p>
              I am currently pursuing a Master of Architecture at the
              University of Pennsylvania, alongside a certificate in product
              design. Before that, I studied finance, computer science, data
              science, and machine learning at Renmin University of China.
            </p>
            <p>
              My research experience spans information retrieval at NLPIR Lab
              and human–computer interaction with the Pervasive HCI group at
              Tsinghua University. I use this mixed background to move between
              evidence and imagination: modeling a system, prototyping an
              interaction, then asking what it means for the person inside it.
            </p>
          </div>
        </section>

        <section className="about-details">
          <div>
            <p className="eyebrow">Currently</p>
            <h2>Exploring human–AI interaction and behavioral engagement.</h2>
          </div>
          <dl>
            <div>
              <dt>Education</dt>
              <dd>
                University of Pennsylvania
                <br />
                Master of Architecture
              </dd>
              <dd>
                Renmin University of China
                <br />
                Finance · Computer Science
              </dd>
            </div>
            <div>
              <dt>Research</dt>
              <dd>Human–computer interaction</dd>
              <dd>Information retrieval</dd>
              <dd>Behavior change</dd>
              <dd>Human–AI collaboration</dd>
            </div>
            <div>
              <dt>Contact</dt>
              <dd>
                <a href="mailto:qingh@upenn.edu">qingh@upenn.edu</a>
              </dd>
              <dd>
                <a
                  href="https://github.com/HqSelene"
                  target="_blank"
                  rel="noreferrer"
                >
                  GitHub ↗
                </a>
              </dd>
              <dd>
                <a href="/Qing_He_CV.pdf" target="_blank">
                  Curriculum vitae ↗
                </a>
              </dd>
            </div>
          </dl>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}

