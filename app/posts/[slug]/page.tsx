import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { formatDate, posts } from "../../content";
import { ArticleLayout } from "../../article-layout";

export function generateStaticParams() { return posts.map(({ slug }) => ({ slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = posts.find(item => item.slug === slug);
  return post ? { title: `${post.title} — Qing He`, description: post.summary } : {};
}
export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = posts.find(item => item.slug === slug);
  if (!post) notFound();
  return <ArticleLayout title={post.title} label={`Notes · ${formatDate(post.date)}`} intro={post.summary}
    cover={post.cover}
    html={post.html} headings={post.headings} backHref="/posts" backLabel="All Posts"
    metadata={[{ label: "Published", value: formatDate(post.date) }, { label: "Author", value: "Qing He" }]} />;
}
