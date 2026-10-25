import { PageHeading } from "../page-heading";
import { pageMetadata } from "../seo";
import { SiteFooter, SiteHeader } from "../components";
import { PostList } from "../content-components";

export const metadata = pageMetadata("/posts/", "Posts — Qing He", "Research notes, observations, and open questions by Qing He.");

export default function PostsPage() {
  return <><SiteHeader /><main className="inner-page posts-page index-page">
    <PageHeading title="Posts" label="Public notes" description="Thoughts on research, design, and the systems we live with." />
  <PostList /></main><SiteFooter /></>;
}
