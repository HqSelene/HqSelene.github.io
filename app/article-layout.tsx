import type { ReactNode } from "react";
import { SiteFooter, SiteHeader } from "./components";
import { ArticleSidebar } from "./article-sidebar";
import { ArticleBody } from "./article-body";
import type { ArticleHeading } from "./markdown";

export function ArticleLayout({ title, label, intro, summary, cover, html, headings, metadata, backHref, backLabel, resources, variant = "post", children }: {
  title: string; label: string; intro: string; summary?: string; cover?: string; html: string;
  headings: ArticleHeading[]; metadata: { label: string; value: string }[];
  backHref: string; backLabel: string; resources?: { label: string; url: string }[]; variant?: "project" | "post"; children?: ReactNode;
}) {
  return <><SiteHeader />
    <main className="story-layout">
      <ArticleSidebar backHref={backHref} backLabel={backLabel} headings={[{ id: "overview", title: "Overview", level: 2 }, ...headings]} metadata={metadata} />
      <article className="story-article" data-article-type={variant}>
        <header id="overview" className="story-heading">
          <p className="eyebrow">{label}</p>
          <h1>{title}</h1>
          <p className="story-intro">{intro}</p>
        </header>
        <ArticleBody html={html} cover={cover} title={title} summary={summary} resources={resources} />
        {children && <footer className="story-end">{children}</footer>}
      </article>
    </main>
    <SiteFooter /></>;
}
