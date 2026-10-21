"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { ArticleHeading } from "./markdown";

export function ArticleSidebar({ backHref, backLabel, headings, metadata }: {
  backHref: string; backLabel: string; headings: ArticleHeading[];
  metadata: { label: string; value: string }[];
}) {
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

  return <aside className="story-sidebar">
    <Link className="story-back" href={backHref}>← {backLabel}</Link>
    <nav className="story-toc" aria-label="On this page">
      {headings.map((heading, index) => <a key={heading.id} href={`#${heading.id}`} aria-current={active === heading.id ? "location" : undefined}>
        <span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>{heading.title}
      </a>)}
    </nav>
    <dl className="story-metadata">{metadata.map(item => <div key={item.label}><dt>{item.label}</dt><dd>{item.value}</dd></div>)}</dl>
  </aside>;
}
