"use client";

import Link from "next/link";
import { numberHeadings } from "./article-outline";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import type { ArticleHeading } from "./markdown";

export function ArticleSidebar({ backHref, backLabel, headings, metadata }: {
  backHref: string; backLabel: string; headings: ArticleHeading[];
  metadata: { label: string; value: string }[];
}) {
  const sidebarRef = useRef<HTMLElement>(null);
  const [scrolling, setScrolling] = useState(false);
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    const sidebar = sidebarRef.current;
    const show = () => {
      setScrolling(true);
      clearTimeout(timer);
      timer = setTimeout(() => setScrolling(false), 900);
    };
    window.addEventListener("scroll", show, { passive: true });
    sidebar?.addEventListener("scroll", show, { passive: true, capture: true });
    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", show);
      sidebar?.removeEventListener("scroll", show, true);
    };
  }, []);

  const [active, setActive] = useState("overview");
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      let current = "overview";
      for (const item of headings) {
        const element = document.getElementById(item.id);
        if (element && element.getBoundingClientRect().top <= 170) current = item.id;
      }
      setActive(current);
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => { cancelAnimationFrame(frame); window.removeEventListener("scroll", schedule); window.removeEventListener("resize", schedule); };
  }, [headings]);

  return <aside ref={sidebarRef} className="story-sidebar" data-scrolling={scrolling ? "true" : undefined}>
    <Link className="story-back" href={backHref}>← {backLabel}</Link>
    <nav className="story-toc" aria-label="On this page">
      {numberHeadings(headings).map((heading) => <a key={heading.id} href={`#${heading.id}`} data-level={heading.level} style={{ "--toc-depth": heading.depth } as CSSProperties} aria-current={active === heading.id ? "location" : undefined}>
        <span aria-hidden="true">{heading.number}</span>{heading.title}
      </a>)}
    </nav>
    <dl className="story-metadata">{metadata.map(item => <div key={item.label}><dt>{item.label}</dt><dd>{item.value}</dd></div>)}</dl>
  </aside>;
}
