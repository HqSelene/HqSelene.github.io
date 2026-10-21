"use client";

import { useEffect, useRef, useState } from "react";

export function ArticleBody({ html, cover, title, summary, resources }: { html: string; cover?: string; title: string; summary?: string; resources?: { label: string; url: string }[] }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const opener = useRef<HTMLElement | null>(null);
  const [image, setImage] = useState<{ src: string; alt: string } | null>(null);

  useEffect(() => {
    if (!image) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialog.current?.showModal();
    return () => { document.body.style.overflow = previousOverflow; opener.current?.focus(); };
  }, [image]);

  function close() { dialog.current?.close(); setImage(null); }

  return <div className="story-body" onClick={event => {
    if (!(event.target instanceof Element)) return;
    const link = event.target.closest<HTMLAnchorElement>("a[data-article-image]");
    if (!link || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
    const img = link.querySelector("img");
    if (!img) return;
    event.preventDefault();
    opener.current = link;
    setImage({ src: img.src, alt: img.alt });
  }}>
    {cover && <figure className="story-cover article-figure">
      <a href={cover} data-article-image="true" aria-label={`Enlarge ${title} cover`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={cover} alt={`${title} — project cover`} />
        <span className="article-image-expand" aria-hidden="true">↗</span>
      </a>
    </figure>}
    {!!resources?.length && <nav className="story-resources story-cover-resources" aria-label="Project links">
      {resources.map(link => <a href={link.url} key={link.url} target="_blank" rel="noopener noreferrer">{link.label} <span aria-hidden="true">↗</span></a>)}
    </nav>}
    {summary && <p className="story-summary">{summary}</p>}
    <div className="story-prose" dangerouslySetInnerHTML={{ __html: html }} />
    <dialog ref={dialog} className="story-image-dialog" aria-label="Enlarged image" onCancel={close} onClose={() => setImage(null)} onClick={event => {
      if (event.target === event.currentTarget) close();
    }}>
      <button type="button" onClick={close} autoFocus aria-label="Close enlarged image">Close ×</button>
      {image && <figure>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={image.src} alt={image.alt} />
        <figcaption>{image.alt}</figcaption>
      </figure>}
    </dialog>
  </div>;
}
