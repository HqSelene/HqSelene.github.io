"use client";

import { useEffect, useState } from "react";

export function AboutPhotos({ photos }: { photos: { src: string; alt: string }[] }) {
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setPlaying(!preference.matches);
    update();
    preference.addEventListener("change", update);
    return () => preference.removeEventListener("change", update);
  }, []);
  useEffect(() => {
    if (!playing || hovered || focused || photos.length < 2) return;
    const timer = window.setInterval(() => {
      if (!document.hidden) setIndex(current => (current + 1) % photos.length);
    }, 6000);
    return () => window.clearInterval(timer);
  }, [playing, hovered, focused, photos.length]);

  if (!photos.length) return <div className="about-photos about-photos-empty">Small moments, collected.</div>;
  const current = index % photos.length;
  function move(offset: number) {
    setPlaying(false);
    setIndex((current + offset + photos.length) % photos.length);
  }
  return <section className="about-photos" aria-label="Personal photo collection" aria-roledescription="carousel"
    onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
    onFocusCapture={() => setFocused(true)} onBlurCapture={event => { if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false); }}
    onKeyDown={event => {
      if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
        event.preventDefault();
        move(event.key === "ArrowLeft" ? -1 : 1);
      }
    }}>
    <figure className="about-photo-frame">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={photos[current].src} alt={photos[current].alt} loading="lazy" />
    </figure>
    <div className="about-photo-controls">
      <span>Small moments ↗</span>
      <div>
        <span className="about-photo-count" aria-live={playing ? "off" : "polite"}>{String(current + 1).padStart(2, "0")} / {String(photos.length).padStart(2, "0")}</span>
        {photos.length > 1 && <>
          <button type="button" aria-label="Previous photo" onClick={() => move(-1)}>←</button>
          <button type="button" aria-label={playing ? "Pause slideshow" : "Play slideshow"} onClick={() => setPlaying(value => !value)}>{playing ? "Ⅱ" : "▷"}</button>
          <button type="button" aria-label="Next photo" onClick={() => move(1)}>→</button>
        </>}
      </div>
    </div>
  </section>;
}
