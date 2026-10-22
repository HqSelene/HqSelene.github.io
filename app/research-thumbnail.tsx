export function ResearchThumbnail({ image, imageAlt = "" }: { image?: string; imageAlt?: string }) {
  return <div className={image ? "research-thumbnail" : "research-thumbnail research-thumbnail-empty"} aria-hidden={image ? undefined : true}>
    {/* eslint-disable-next-line @next/next/no-img-element */}
    {image && <img src={image} alt={imageAlt} loading="lazy" />}
  </div>;
}

