import type { Metadata } from "next";
import "./globals.css";
import { CosmicLayer } from "./interactive";

export const metadata: Metadata = {
  metadataBase: new URL("https://hqselene.github.io"),
  title: {
    default: "Qing He — Designer & Researcher",
    template: "%s",
  },
  description:
    "Qing He is a designer and researcher working across human-computer interaction, product, architecture, and data science.",
  icons: {
    icon: "/media/avatar.png",
  },
  openGraph: {
    title: "Qing He — Designer, Researcher, Builder",
    description:
      "Selected work across human-computer interaction, product, architecture, and data science.",
    type: "website",
    images: [
      {
        url: "/og-v2.png",
        width: 1536,
        height: 1024,
        alt: "Qing He — One star in one person",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Qing He — Designer, Researcher, Builder",
    description:
      "Selected work across human-computer interaction, product, architecture, and data science.",
    images: ["/og-v2.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <CosmicLayer />
        <div className="site-shell">{children}</div>
      </body>
    </html>
  );
}
