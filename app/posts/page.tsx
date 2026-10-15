import type { Metadata } from "next";
import { SiteFooter, SiteHeader } from "../components";
import { PostList } from "../content-components";

export const metadata: Metadata = { title: "Posts — Qing He", description: "Research notes, observations, and open questions by Qing He." };

export default function PostsPage() {
  return <><SiteHeader /><main className="reading-page"><header className="reading-intro">
    <p className="eyebrow">Public notes</p><h1>Notes & Thinking</h1>
    <p>Thoughts on research, design, and the systems we live with.</p>
  </header><PostList /></main><SiteFooter /></>;
}
