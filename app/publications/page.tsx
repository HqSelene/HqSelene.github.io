import type { Metadata } from "next";
import { SiteFooter, SiteHeader } from "../components";

export const metadata: Metadata = {
  title: "Publications — Qing He",
  description: "Selected publications in HCI, AI, and machine learning.",
};

const publications = [
  {
    venue: "CHI 2026",
    title:
      "Does Personalized Nudging Wear Off? A Longitudinal Study of AI Self-Modeling for Behavioral Engagement",
    authors: "Qing He, Zeyu Wang, Yuzhou Du, Yuanchun Shi, Yuntao Wang",
    note: "Accepted · ACM SIGCHI Conference on Human Factors in Computing Systems",
    href: "/Longitudinal_Study_of_AI_Self_Modeling.pdf",
  },
  {
    venue: "TKDE 2023",
    title:
      "Query-aware Explainable Product Search with Reinforcement Knowledge Graph Reasoning",
    authors: "Qiannan Zhu, Haobo Zhang, Qing He, Zhicheng Dou",
    note: "IEEE Transactions on Knowledge and Data Engineering",
    href: "https://doi.org/10.1109/TKDE.2023.3297331",
  },
  {
    venue: "WWW 2022",
    title: "A Gain-Tuning Dynamic Negative Sampler for Recommendation",
    authors: "Qiannan Zhu, Haobo Zhang, Qing He, Zhicheng Dou",
    note: "The Web Conference",
    href: "https://doi.org/10.1145/3485447.3511956",
  },
];

export default function PublicationsPage() {
  return (
    <>
      <SiteHeader />
      <main className="inner-page publications-page">
        <section className="page-intro">
          <p className="eyebrow">Research · HCI, AI & ML</p>
          <h1>Publications</h1>
          <p className="page-intro-copy">
            Selected work on behavioral engagement, explainable product
            search, and recommendation systems.
          </p>
        </section>

        <section className="publication-list">
          {publications.map((publication, index) => (
            <a
              href={publication.href}
              target="_blank"
              rel="noreferrer"
              className="publication-item"
              key={publication.title}
            >
              <span className="publication-index">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div>
                <p className="eyebrow">{publication.venue}</p>
                <h2>{publication.title}</h2>
                <p className="publication-authors">{publication.authors}</p>
                <p>{publication.note}</p>
              </div>
              <span className="publication-arrow" aria-hidden="true">
                ↗
              </span>
            </a>
          ))}
        </section>
      </main>
      <SiteFooter />
    </>
  );
}

