import { PageScrollbar } from "./page-scrollbar";
import site from "../content/site.json";
import type { Metadata } from "next";
import "./globals.css";
import { CosmicLayer } from "./interactive";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: site.title, template: "%s" },
  description: site.description,
  icons: { icon: "/media/avatar.png" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <PageScrollbar />
        <CosmicLayer />
        <div id="page-content" className="site-shell">{children}</div>
      </body>
    </html>
  );
}
