import type { Metadata } from "next";
import site from "../content/site.json";

export function pageMetadata(path: string, title: string, description: string, image = site.image): Metadata {
  const url = new URL(path === "/" ? "/" : path.replace(/\/$/, "") + "/", site.url).href;
  const imageUrl = new URL(image || site.image, site.url).href;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title, description, url, siteName: site.name, type: "website",
      images: [{ url: imageUrl, alt: title }],
    },
    twitter: { card: "summary_large_image", title, description, images: [imageUrl] },
  };
}
