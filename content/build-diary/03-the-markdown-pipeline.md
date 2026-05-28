---
title: "The markdown pipeline"
section: "build-diary"
order: 3
duration: "12 min"
difficulty: "beginner"
prerequisites: ["02-scaffolding-with-antigravity"]
analogy: "How a recipe card becomes a finished dish"
tags: ["build-diary", "markdown", "mdx", "content-pipeline"]
summary: "How a .md file in /content becomes a rendered lesson page — the four-step recipe and the libraries that do the work."
---

> 📝 **Note:** This entry will be revised once the actual pipeline has been implemented and tested in a live build.

This is the most reusable piece of the whole build — the bit that any reader could lift and apply to their own project. If you understand this pipeline, you can spin up a markdown-driven site for any subject in a weekend.

The core idea is simple: a folder of `.md` files becomes a navigable website, with each file being a page. No CMS. No database. No admin UI. The content lives in git, the build process turns it into HTML, and any change to the markdown triggers a redeploy. This entry explains how.

## How a recipe card becomes a finished dish

If you give a chef a stack of recipe cards, you don't get dinner — you get a stack of cards. Something has to *happen* between the cards and the meal. Ingredients have to be sourced. Equipment has to be readied. The recipe has to be read, interpreted, and executed.

Markdown files are the recipe cards. The build pipeline is the kitchen — sourcing the cards, interpreting them, executing the steps that turn each card into a finished page on the site.

Once you understand each step in the kitchen, you can see how to substitute steps, add new ones, or tear out the parts you don't need. That's the value of understanding rather than just copy-pasting.

## What's that block at the top of every file?

Before we get to the four-step recipe, one thing to name. Open any `.md` file in this site — a lesson, a build-diary entry — and you'll see a block at the top wrapped in triple-dashes:

```yaml
---
title: "How to read documentation"
section: "how-to-learn"
order: 4
duration: "18 min"
difficulty: "beginner"
prerequisites: ["03-reading-code-you-didnt-write"]
analogy: "A reference book, not a novel"
tags: ["meta-learning", "docs", "fundamentals"]
summary: "Documentation isn't written to be read cover-to-cover..."
---

Adult learners often blame themselves for "not understanding the docs"...
```

That block is called **frontmatter** — structured metadata that travels with the file. It isn't markdown; it's [YAML](https://yaml.org/) wrapped in triple-dash delimiters so the markdown parser knows to skip it and the build script knows to extract it.

The purpose: it lets a single `.md` file carry both its *content* (the prose below the second `---`) and its *settings* (everything between the dashes — what to call the file in the navigation, what order to sort it in, what tags it has, what it depends on, how long it takes to read). Without frontmatter, you'd need a second file or a database to store the metadata. With frontmatter, the file is self-contained — drop it in `/content/lessons/<section>/`, push, and the build pipeline has everything it needs to render and link the page.

The full list of fields the build expects — `title`, `section`, `order`, `duration`, `difficulty`, `prerequisites`, `analogy`, `tags`, `summary`, and the optional `real_world_excerpt` — is documented in [`CONTENT-SPEC.md`](https://github.com/SwarupSG/learning-ux-design-dsai/blob/main/CONTENT-SPEC.md). The build script validates every `.md` file against that contract; a missing required field fails the deploy rather than shipping silently.

> 💡 **Why it's called frontmatter.** Borrowed from book publishing — the "front matter" of a printed book is the title page, copyright notice, table of contents, dedication, and other metadata that sits *before* chapter one. Same idea here: the structured stuff that describes the content goes in front of the content itself.

## What's in a section folder?

While we're naming conventions, open any folder under `/content/lessons/` and you'll see two filename patterns side by side:

```
content/lessons/how-to-learn/
  _section.md
  01-how-adults-learn-to-code.md
  02-knowing-vs-understanding.md
  03-reading-code-you-didnt-write.md
  04-reading-docs.md
```

Three small conventions, each doing a specific job for the build pipeline.

**`_section.md` — section metadata.** The leading underscore is a sorting trick: most file browsers and the build script sort `_` before letters and digits, so this file always appears at the top of the folder listing. The file itself is just frontmatter + a paragraph — section title, slug, sort order across sections, summary text, optional icon. The build script reads this when it generates the section index page (the page at `/lessons/how-to-learn` that lists all four lessons in this folder).

**Numeric prefix on lesson files.** Every lesson filename starts with a 2-digit number — `01-`, `02-`, and so on. The prefix isn't strictly load-bearing — the canonical order comes from the `order:` field inside the frontmatter, not the filename — but the prefix makes the folder readable at a glance. When you `ls` the folder, you see lessons in their teaching order rather than alphabetical by title.

**`prerequisites:` array in the frontmatter.** A list of prior lesson slugs (filenames without `.md`). The build script validates these at build time: if you list a prerequisite that doesn't exist, the build fails rather than shipping a broken link. The lesson page itself renders a "before this lesson" link to each prerequisite, so a student who lands on lesson 7 from a search engine sees what they should read first.

These three conventions together let a student fork the template, drop a new `.md` file into a folder, and have the build pipeline do the right thing — sort it, link it, validate it — without anyone touching a line of code.

## The four-step recipe

A markdown file becomes a rendered page in four steps:

### Step 1 — Read

`gray-matter` parses each `.md` file and splits it into two pieces: the YAML frontmatter at the top (between `---` lines) and the markdown body underneath. Frontmatter becomes a JavaScript object; body stays as a string of markdown.

```typescript
import matter from 'gray-matter';
import fs from 'fs';

const raw = fs.readFileSync('content/lessons/foundations/01-what-design-is.md', 'utf-8');
const { data, content } = matter(raw);

// data = { title: "What design actually is", section: "foundations", order: 1, ... }
// content = "You already ship data products. You know what works..."
```

This step is fast and dependency-light. `gray-matter` is one of those packages that does one thing well.

### Step 2 — Compile

The markdown body needs to become React. That's `@next/mdx`'s job, augmented by two plugins:

- **`remark-gfm`** — adds GitHub-flavoured markdown features (tables, task lists, autolinks, strikethrough) to the basic CommonMark spec
- **`rehype-pretty-code`** — runs each code block through Shiki to add syntax highlighting at build time

The result is a React component that renders the lesson body. Pretty-coded fenced code blocks. Properly rendered tables. Working autolinks. All processed once at build time, not every time a page loads.

### Step 3 — Route

Next.js's [App Router](../../GLOSSARY.md#app-router) maps URL paths to file paths. The route `/lessons/foundations/01-what-design-is` is handled by `app/lessons/[section]/[slug]/page.tsx`, which reads the section and slug from the URL and uses them to find the right `.md` file.

The mapping isn't fully automatic — we have to *tell* Next.js what slugs exist via `generateStaticParams`:

```typescript
export async function generateStaticParams() {
  const lessons = getAllLessons();    // walks /content/lessons/
  return lessons.map(lesson => ({
    section: lesson.section,
    slug: lesson.slug,
  }));
}
```

This is what makes the site fully static — Next.js pre-renders every route at build time, producing one HTML file per lesson. No server processing at request time. Fast on free tiers.

### Step 4 — Render

The page component combines the metadata (frontmatter), the compiled body (React from MDX), and the layout (header, sidebar, footer) into the final HTML. It also handles the `real_world_excerpt` callout — reading the referenced file from `/examples/`, slicing the line range, and rendering it as a sidebar.

```tsx
export default async function LessonPage({ params }) {
  const lesson = await getLesson(params.section, params.slug);
  return (
    <article>
      <Header title={lesson.frontmatter.title} />
      <RealWorldCallout excerpt={lesson.frontmatter.real_world_excerpt} />
      <Body>{lesson.body}</Body>
      <NextLink to={lesson.next} />
    </article>
  );
}
```

End to end, the four steps take a `.md` file and turn it into a fully-rendered HTML page with syntax-highlighted code, a working sidebar, and proper navigation. Every change to the source `.md` file triggers a rebuild on Vercel that regenerates the HTML.

## The libraries and what each does

A short, honest description of each library — and what would happen without it.

| Library | What it does | What you'd lose without it |
|---|---|---|
| `@next/mdx` | Compiles markdown into React components | You'd have to do the compilation manually with a markdown library |
| `gray-matter` | Parses YAML frontmatter | You'd have to parse it yourself or pick a different format |
| `remark-gfm` | GitHub-flavoured markdown features | No tables, no task lists, no autolinks |
| `rehype-pretty-code` | Syntax highlighting via Shiki, at build time | Code blocks would be unstyled or you'd need a runtime highlighter |
| `shiki` (used by `rehype-pretty-code`) | The actual highlighting engine | No syntax highlighting |
| `tailwindcss` | Utility-class styling system | You'd hand-roll CSS or use another framework |

That's the whole stack. Six libraries; each doing one job; each replaceable with an alternative if you preferred.

## Adding a new lesson — the actual recipe

This is the user-facing experience the pipeline enables. To add a new lesson:

1. **Copy any existing `.md` file** from `/content/lessons/<section>/`
2. **Edit the frontmatter** — title, order, slug, tags, etc.
3. **Write the lesson body** in markdown, using fenced code blocks and standard markdown features
4. **`git push`** to the main branch

Vercel detects the push, rebuilds the site, and the new lesson is live. About 90 seconds from push to live URL.

That's the whole user experience. Four steps, no code change required, no deployment dance, no CI configuration to update. The pipeline absorbs everything.

## A note on portability

This same pipeline would deploy on Netlify, Cloudflare Pages, GitHub Pages, or a self-hosted Node server with zero changes. The build process is just `next build`; the output is static HTML; any host that can serve static HTML can host this site.

Vercel was chosen because the free tier is generous and the GitHub integration is one click. If at some point Vercel changes its terms or the limits become a problem, switching costs are low. **The lock-in surface is zero.** That's a deliberate design choice from the start, not an afterthought.

## What this enables for forks

If a student forks this template for their own subject (see `FORK.md`), the pipeline doesn't care what the content is about. Replace the `.md` files. Replace the section folders. Replace the example artifact in `/examples/`. The pipeline handles whatever you give it.

This is the goal: a content-driven site where the content is the only thing that needs creative work, and the structure is reusable for any topic.

## What's next

Build-diary entry 4 — the deployment step. From local development to a live URL on Vercel's free tier, plus an honest assessment of the free-tier limits and when you might want to upgrade.
