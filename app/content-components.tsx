import Link from "next/link";
import { formatDate, posts, updates } from "./content";

export function UpdateList({ limit }: { limit?: number }) {
  return updates.length ? <ul className="update-list">{updates.slice(0, limit).map((item, index) => (
    <li key={`${item.date}-${index}`}><time dateTime={item.date}>{formatDate(item.date)}</time>
      <p>{item.description}</p>
    </li>
  ))}</ul> : <p className="quiet-copy">New updates will appear here.</p>;
}

export function PostList({ limit }: { limit?: number }) {
  return posts.length ? <ul className="post-list">{posts.slice(0, limit).map((post) => (
    <li key={post.slug}><time dateTime={post.date}>{formatDate(post.date)}</time><div>
      <h2><Link href={`/posts/${post.slug}`}>{post.title} <span aria-hidden="true">↗</span></Link></h2>
      <p>{post.summary}</p>
    </div></li>
  ))}</ul> : <p className="quiet-copy">A space for research notes, observations, and open questions. Posts will appear here soon.</p>;
}
