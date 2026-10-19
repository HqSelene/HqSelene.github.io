import { PageHeading } from "../page-heading";
import type { Metadata } from "next";
import { SiteFooter, SiteHeader } from "../components";

export const metadata: Metadata = {
  title: "Publications — Qing He",
  description: "Selected publications in HCI, AI, and machine learning.",
};

import { publications } from "./data";

export default function PublicationsPage() {
  return (
    <>
      <SiteHeader />
      <main className="inner-page publications-page index-page">
        <PageHeading title="Publications" label="Research · HCI, AI & ML" description="Selected work on behavioral engagement, explainable product search, and recommendation systems." />

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

