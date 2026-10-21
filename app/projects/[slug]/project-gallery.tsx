"use client";

import { useEffect, useId, useRef, useState } from "react";

function imageLabel(path: string, index: number) {
  const filename = path.split("/").pop()?.replace(/\.[^.]+$/, "") ?? "";
  const cleaned = filename
    .replace(/[-_]+/g, " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
  return cleaned || `Project view ${index + 1}`;
}

export function ProjectGallery({
  title,
  images,
  inline = false,
}: {
  title: string;
  images: string[];
  inline?: boolean;
}) {
  const headingId = useId();
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const railRef = useRef<HTMLDivElement>(null);
  const uniqueImages = Array.from(new Set(images));
  const isOpen = activeIndex !== null;

  useEffect(() => {
    if (!isOpen) return;

    const previousFocus = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Tab") {
        const dialog = closeButtonRef.current?.closest('[role="dialog"]');
        const buttons = dialog?.querySelectorAll<HTMLButtonElement>("button");
        if (buttons?.length) {
          const first = buttons[0];
          const last = buttons[buttons.length - 1];
          if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
          if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
        }
      }
      if (event.key === "Escape") {
        setActiveIndex(null);
      } else if (event.key === "ArrowRight" && uniqueImages.length > 1) {
        setActiveIndex((current) =>
          current === null ? 0 : (current + 1) % uniqueImages.length,
        );
      } else if (event.key === "ArrowLeft" && uniqueImages.length > 1) {
        setActiveIndex((current) =>
          current === null
            ? 0
            : (current - 1 + uniqueImages.length) % uniqueImages.length,
        );
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      previousFocus?.focus();
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, uniqueImages.length]);

  function showPrevious() {
    setActiveIndex((current) =>
      current === null
        ? 0
        : (current - 1 + uniqueImages.length) % uniqueImages.length,
    );
  }

  function showNext() {
    setActiveIndex((current) =>
      current === null ? 0 : (current + 1) % uniqueImages.length,
    );
  }

  function scrollRail(direction: -1 | 1) {
    const rail = railRef.current;
    if (!rail) return;

    rail.scrollBy({
      left: direction * Math.min(rail.clientWidth * 0.72, 520),
      behavior: "smooth",
    });
  }

  return (
    <section className={inline ? "inline-project-gallery" : "project-gallery-section"} aria-label={inline ? `${title} illustrations` : undefined} aria-labelledby={inline ? undefined : headingId}>
      {inline ? <div className="article-figures">
        {uniqueImages.map((image, index) => <figure key={image}>
          <button type="button" onClick={() => setActiveIndex(index)} aria-label={`Enlarge ${imageLabel(image, index)}`}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={image} alt={`${title} — ${imageLabel(image, index)}`} loading="lazy" />
            <span aria-hidden="true">↗</span>
          </button>
          <figcaption>{imageLabel(image, index)} <span>Click to enlarge</span></figcaption>
        </figure>)}
      </div> : <><div className="gallery-heading">
        <div>
          <p className="eyebrow">Project gallery</p>
          <h2 id={headingId}>A closer look.</h2>
        </div>

        <div className="gallery-heading-meta">
          <p>
            {String(uniqueImages.length).padStart(2, "0")}{" "}
            {uniqueImages.length === 1 ? "image" : "images"}
            <span>Swipe to explore · Click to enlarge</span>
          </p>

          {uniqueImages.length > 1 && (
            <div className="gallery-scroll-controls" aria-label="Scroll gallery">
              <button
                type="button"
                onClick={() => scrollRail(-1)}
                aria-label="Scroll gallery left"
              >
                <span aria-hidden="true">←</span>
              </button>
              <button
                type="button"
                onClick={() => scrollRail(1)}
                aria-label="Scroll gallery right"
              >
                <span aria-hidden="true">→</span>
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="gallery-rail-wrap">
        <div
          className="gallery-rail"
          ref={railRef}
          role="region"
          aria-label={`${title} image thumbnails`}
          tabIndex={0}
        >
          {uniqueImages.map((image, index) => (
            <button
              className="gallery-tile"
              type="button"
              key={image}
              onClick={() => setActiveIndex(index)}
              aria-label={`Open ${title} image ${index + 1} of ${uniqueImages.length}`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={image}
                alt={`${title} — ${imageLabel(image, index)}`}
                loading="lazy"
              />
              <span className="gallery-tile-number">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="gallery-tile-action" aria-hidden="true">
                View
              </span>
            </button>
          ))}
        </div>
      </div>

      </>}
      {activeIndex !== null && (
        <div
          className="lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={`${title} image gallery`}
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setActiveIndex(null);
          }}
        >
          <div className="lightbox-topbar">
            <p>
              {title}
              <span>
                {String(activeIndex + 1).padStart(2, "0")} /{" "}
                {String(uniqueImages.length).padStart(2, "0")}
              </span>
            </p>
            <button
              ref={closeButtonRef}
              type="button"
              onClick={() => setActiveIndex(null)}
              aria-label="Close image gallery"
            >
              Close <span aria-hidden="true">×</span>
            </button>
          </div>

          <div className="lightbox-stage">
            {uniqueImages.length > 1 && (
              <button
                className="lightbox-arrow lightbox-arrow--previous"
                type="button"
                onClick={showPrevious}
                aria-label="Previous image"
              >
                ←
              </button>
            )}

            <figure>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                key={uniqueImages[activeIndex]}
                src={uniqueImages[activeIndex]}
                alt={`${title} — ${imageLabel(uniqueImages[activeIndex], activeIndex)}`}
              />
              <figcaption>
                {imageLabel(uniqueImages[activeIndex], activeIndex)}
              </figcaption>
            </figure>

            {uniqueImages.length > 1 && (
              <button
                className="lightbox-arrow lightbox-arrow--next"
                type="button"
                onClick={showNext}
                aria-label="Next image"
              >
                →
              </button>
            )}
          </div>

          {uniqueImages.length > 1 && (
            <div className="lightbox-thumbnails" aria-label="Choose image">
              {uniqueImages.map((image, index) => (
                <button
                  type="button"
                  className={activeIndex === index ? "is-active" : ""}
                  key={image}
                  onClick={() => setActiveIndex(index)}
                  aria-label={`View image ${index + 1}`}
                  aria-pressed={activeIndex === index}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={image} alt="" />
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </section>
  );
}
