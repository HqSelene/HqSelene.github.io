import { ResearchThumbnail } from "../research-thumbnail";
import { PublicationAward } from "./publication-award";
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
          {publications.map((publication, index) => {
            const Entry = publication.href.trim() ? "a" : "article";
            return (
            <Entry
              href={publication.href.trim() || undefined}
              target={publication.href.trim() ? "_blank" : undefined}
              rel={publication.href.trim() ? "noreferrer" : undefined}
              className="publication-item"
              key={publication.title}
            >
              <span className="publication-index">{String(index + 1).padStart(2, "0")}</span>
              <div className="publication-media">
                <ResearchThumbnail image={publication.image} imageAlt={publication.imageAlt} />
              </div>
              <div className="publication-copy">
                <div className="publication-labels"><span className="eyebrow">{publication.venue}</span><PublicationAward award={publication.award} /></div>
                <h2>{publication.title}</h2>
                <p className="publication-authors">{publication.authors.split(/(Qing He)/).map((part, index) => part === "Qing He" ? <strong key={index}>{part}</strong> : part)}</p>
                {publication.note && <p className="publication-note">{publication.note}</p>}
              </div>
              {publication.href.trim() && <span className="publication-arrow" aria-hidden="true">
                ↗
              </span>}
            </Entry>
          ); })}
        </section>
      </main>
      <SiteFooter />
    </>
  );
}

