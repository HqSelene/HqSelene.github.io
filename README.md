# Qing He Portfolio

An independent, project-first portfolio for Qing He. This site intentionally
removes the blog archive, categories, tags, and article sidebar from the
original Hexo site and focuses on personal positioning, selected work,
research, and contact.

## Pages

- `/` — personal introduction and selected work
- `/projects` — complete project index
- `/projects/[slug]` — focused case studies for eight retained projects
- `/about` — background, education, research, and contact
- `/publications` — selected HCI, AI, and ML publications

## Local development

```bash
npm install
npm run dev
```

The site uses the vinext starter structure and is ready for local development
or a later Sites deployment. Project media and PDFs are self-contained under
`public/`.


## Recent updates and public posts

The homepage preserves the animated landing screen, followed by Recent Projects,
Selected Publications, and three Selected Projects. `/updates` and `/posts` remain
available as separate archives.

### Edit ongoing projects

Edit `content/recent-projects.json`. Each entry has a `title` and `description`.
Entries appear in file order and describe work in progress, separately from publications.

### Edit recent updates

Edit `content/updates.json`. Each entry has a `date` (`YYYY-MM-DD`) and
`description`. Updates are plain text, with no links:

```json
[
  {
    "date": "2026-10-17",
    "description": "A short update in your own words."
  }
]
```

Entries are sorted newest first automatically. The homepage shows up to three
entries by default, four on screens at least 1100px wide and 800px tall, and
five on screens at least 1440px wide and 950px tall. This keeps the animated
landing page compact. Fewer available entries are shown without placeholders.
The `/updates` archive shows every entry. Use `[]` for an empty list.
Rebuild and deploy after editing to update the live website.

### Write a post

Copy `content/posts/first-note.md` to a descriptive filename, such as
`content/posts/my-note.md`. The filename becomes `/posts/my-note`.
Set `title`, `date`, and `summary` in the YAML frontmatter. Keep `draft: true`
while writing; set `draft: false` to publish. Drafts have no public detail page
and do not appear in lists. The included template is intentionally a draft.

Write the body in Markdown: headings, lists, links, images, blockquotes, and
fenced code blocks are supported. Store images under `public/media/` and link
with `/media/filename.png`. Markdown is trusted repository-authored content
and supports raw HTML; do not populate it with untrusted user submissions.

Content is bundled at build time, including on Workers (no runtime filesystem).
Rebuild and deploy after edits for changes to appear on the live website.
Editing a file on GitHub updates the live site only if automatic deployment
has been configured for that repository.
