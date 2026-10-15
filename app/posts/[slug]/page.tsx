import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteFooter, SiteHeader } from "../../components";
import { formatDate, posts } from "../../content";

export function generateStaticParams() { return posts.map(({ slug }) => ({ slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = posts.find((item) => item.slug === slug);
  return post ? { title: `${post.title} — Qing He`, description: post.summary } : {};
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = posts.find((item) => item.slug === slug);
  if (!post) notFound();
  return <><SiteHeader /><main className="reading-page article-page">
    <Link className="text-link" href="/posts">← All posts</Link>
    <article><header className="reading-intro"><time dateTime={post.date}>{formatDate(post.date)}</time>
      <h1>{post.title}</h1><p>{post.summary}</p></header>
      <div className="post-prose" dangerouslySetInnerHTML={{ __html: post.html }} />
    </article></main><SiteFooter /></>;
}
