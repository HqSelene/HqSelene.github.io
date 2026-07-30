"use client";

import { useEffect, useRef, useState } from "react";

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
}: {
  title: string;
  images: string[];
}) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const uniqueImages = Array.from(new Set(images));
  const isOpen = activeIndex !== null;

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    function handleKeyDown(event: KeyboardEvent) {
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

  return (
    <section className="project-gallery-section" aria-labelledby="gallery-title">
      <div className="gallery-heading">
        <div>
          <p className="eyebrow">Project gallery</p>
          <h2 id="gallery-title">A closer look.</h2>
        </div>
        <p>
          {String(uniqueImages.length).padStart(2, "0")}{" "}
          {uniqueImages.length === 1 ? "image" : "images"} · Click to enlarge
        </p>
      </div>

      <div className="gallery-grid">
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
              Expand ↗
            </span>
          </button>
        ))}
      </div>

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
