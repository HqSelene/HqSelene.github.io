import { Marked, type Tokens } from "marked";
import { parse as parseYaml } from "yaml";

export type ArticleHeading = { id: string; title: string; level: number };
export type MarkdownDocument = { html: string; headings: ArticleHeading[]; images: string[] };

export function readFrontmatter(source: string, path: string) {
  const match = source.match(/^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/);
  if (!match) throw new Error(`Missing YAML frontmatter in ${path}`);
  const data = parseYaml(match[1]);
  if (!data || typeof data !== "object" || Array.isArray(data)) throw new Error(`Invalid frontmatter in ${path}`);
  return { data: data as Record<string, unknown>, body: source.slice(match[0].length) };
}

export function escapeHtml(text: string) {
  return text.replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);
}

export function renderMarkdown(body: string): MarkdownDocument {
  const headings: ArticleHeading[] = [];
  const images: string[] = [];
  const ids = new Map<string, number>();
  const parser = new Marked({
    renderer: {
      blockquote({ text, tokens }: Tokens.Blockquote) {
        if (!/^\[!QUOTE\](?:\r?\n|$)/.test(text)) {
          return `<blockquote>\n${this.parser.parse(tokens)}</blockquote>\n`;
        }
        let body = text.replace(/^\[!QUOTE\]\r?\n?/, "").trim();
        const attribution = body.match(/\n\s*\n—\s+([^\n]+)$/);
        if (attribution) body = body.slice(0, attribution.index).trim();
        const quote = body.split(/\n\s*\n/).filter(Boolean)
          .map(paragraph => `<p>${parser.parseInline(paragraph, { async: false, breaks: true })}</p>`).join("\n");
        return `<figure class="story-pullquote"><span class="story-quote-mark" aria-hidden="true">“</span><blockquote>${quote}</blockquote>${attribution ? `<figcaption>— ${parser.parseInline(attribution[1], { async: false })}</figcaption>` : ""}</figure>\n`;
      },
      heading({ tokens, depth }: Tokens.Heading) {
        const title = tokens.map(token => "text" in token ? token.text : token.raw).join("").replace(/<[^>]*>/g, "");
        const base = `section-${title.toLowerCase().replace(/[^\p{L}\p{N}]+/gu, "-").replace(/^-|-$/g, "") || "untitled"}`;
        const count = (ids.get(base) ?? 0) + 1;
        ids.set(base, count);
        const id = count === 1 ? base : `${base}-${count}`;
        // The page already owns h1. Markdown headings start at h2.
        const level = Math.max(2, depth);
        headings.push({ id, title, level });
        return `<h${level} id="${escapeHtml(id)}">${this.parser.parseInline(tokens)}</h${level}>\n`;
      },
      paragraph({ tokens }: Tokens.Paragraph) {
        const meaningful = tokens.filter(t => t.type !== "text" || t.raw.trim());
        if (meaningful.length && meaningful.every(t => t.type === "image")) {
          const figures = meaningful.map(token => {
            const image = token as Tokens.Image;
            if (!/^(\/(?!\/)|https?:\/\/)/i.test(image.href)) throw new Error(`Use an absolute /media/ path or HTTP(S) URL for image: ${image.href}`);
            const src = escapeHtml(image.href);
            const caption = escapeHtml(image.text);
            const alignment = image.title === "full" ? " article-figure-full" : image.title === "right" ? " article-figure-right" : " article-figure-centered";
            return `<figure class="article-figure${alignment}"><a href="${src}" data-article-image="true" aria-label="Enlarge ${caption}"><img src="${src}" alt="${caption}" loading="lazy" /><span class="article-image-expand" aria-hidden="true">↗</span></a>${caption ? `<figcaption>${caption}</figcaption>` : ""}</figure>`;
          }).join("\n");
          return meaningful.length > 1 ? `<div class="article-image-pair">${figures}</div>\n` : `${figures}\n`;
        }
        return `<p>${this.parser.parseInline(tokens)}</p>\n`;
      },
      table({ header, rows, align }: Tokens.Table) {
        const cells = (row: Tokens.TableCell[], tag: string) => row.map((cell, index) => `<${tag}${align[index] ? ` style="text-align:${align[index]}"` : ""}>${this.parser.parseInline(cell.tokens)}</${tag}>`).join("");
        return `<div class="article-table"><table><thead><tr>${cells(header, "th")}</tr></thead><tbody>${rows.map(row => `<tr>${cells(row, "td")}</tr>`).join("")}</tbody></table></div>`;
      },
    },
    walkTokens(token) { if (token.type === "image") images.push(token.href); },
  });
  return { html: parser.parse(body, { async: false }), headings, images: [...new Set(images)] };
}
