# GLOSSARY.md

Plain-language definitions for every technical term that shows up in this site's student-facing docs. Alphabetised. Most entries have an everyday analogy.

> For maintainers. Every technical term used in a student-facing doc (lessons, build diary, in-site reader) should have either a one-line analogy in place on first use, or a `(see GLOSSARY → term)` pointer. If you introduce a new term, add a row here in the same commit.

---

### Antigravity

Google's AI-native IDE (released late 2025). You describe what you want in plain English. The agent reads your repo, writes code, and you review. In this project, used to scaffold the Next.js app from the brief and to apply the Stitch design via MCP. *Analogy: a senior pair-programmer who has read your whole codebase before you say a word.*

### App Router

Next.js's modern routing system. The URL structure of your site mirrors the folder structure under `/app/`. A file at `app/lessons/foundations/page.tsx` becomes a page at `/lessons/foundations`. The older "Pages Router" used a different folder. We use App Router throughout.

### Build time

The moment `next build` runs. Source files (markdown, JSON, TypeScript) get turned into static HTML files. Happens once per deploy, on Vercel's servers. The opposite of *runtime*. *Analogy: a printer making the books. Once printed, they're handed out as-is.*

### Client Component

A React component that runs in the browser (in addition to at build time). Required for anything interactive: a button with an `onClick`, a dark-mode toggle, a search box. Marked with `"use client"` at the top of the file. Most components in this site are not Client Components, because the site is reading-first.

### Editor View (Antigravity)

Antigravity's single-agent synchronous mode. You type a prompt, the agent reads and edits, you review. Like pair-programming. Toggle between Editor View and Manager View with **Cmd+E** (Mac) / **Ctrl+E** (Windows). Contrast with *Manager View*.

### Fork (GitHub)

A copy of a GitHub repo placed on your own GitHub account. You can edit your fork freely without affecting the original. This template is designed to be forked. See [`FORK.md`](./FORK.md). *Analogy: making a personal photocopy of a recipe book you can scribble in.*

### Frontmatter

The block of structured metadata wrapped in triple-dashes at the top of every `.md` file in this repo. Format is YAML. Carries the lesson's title, sort order, prerequisites, tags. Explained in detail in [build-diary entry 03](./content/build-diary/03-the-markdown-pipeline.md). *Analogy: the title page and copyright notice that sit before chapter one in a printed book.*

### Generation modes (Stitch)

Stitch offers four modes when you brief it for a design: **Ideate** (exploratory; produces multiple directions), **Flash** (fastest; for quick iterations), **Thinking** (highest quality; for the final polish), and **Redesign** (transforms an existing screen). See [`DEMO.md`](./DEMO.md) for when to use which.

### Git

The version-control tool every working developer uses. Tracks every change to every file. Lets you revert mistakes. Lets multiple people work on the same project. This repo is a git repository. Pushing to git is how a change gets to Vercel.

### `.gitignore`

A file listing paths that git should not track. Used for secrets (API keys), generated files (`node_modules/`, `.next/`), and operating-system noise (`.DS_Store`). If a file is in `.gitignore`, it stays on your laptop but never makes it to GitHub.

### `.gitkeep`

A zero-byte file used to make git track an otherwise-empty folder. Git doesn't track empty folders. Adding `.gitkeep` marks a folder as "intentionally empty but should exist". Used in `public/images/` here.

### JSON (JavaScript Object Notation)

A plain-text data format. Represents structured information as nested objects and arrays. Used in this repo for `site.config.json`. Every modern editor handles it natively. *Analogy: a form with labelled fields, written in a format any program can read.*

### JSON Schema

A formal description of a JSON file's expected shape. Says which fields are required, what types they accept, and what each one means. The `site.config.schema.json` file is a JSON Schema for `site.config.json`. Editors that respect the `"$schema"` field give you autocomplete, validation, and hover tooltips for free.

### Manager View (Antigravity)

Antigravity's multi-agent orchestration mode. Coordinates up to 5 agents working in parallel on different parts of the repo. More powerful than *Editor View*, more complicated. Used for larger projects with parallel concerns. Toggle to/from Editor View with **Cmd+E** (Mac) / **Ctrl+E** (Windows).

### Nano Banana

Google's image-generation model family, accessible via [Google AI Studio](https://aistudio.google.com/). Part of the Gemini Image lineup (Gemini 2.5 Flash Image, Gemini 3.1 Flash Image, Gemini 3 Pro Image). **Not the same as Imagen** — Imagen is an older, separate Google model family. We use Nano Banana to generate the lesson illustrations from prompts in `IMAGES.md`.

### Markdown

A plain-text format for prose. Headers use `#`, code uses backticks, lists use `-`. Easy to write, easy to read in raw form, easy for any tool to render to HTML. Every lesson on this site is a markdown file. *Analogy: handwritten notes with simple symbols, not a Microsoft Word document.*

### MCP (Model Context Protocol)

A standard that lets an AI agent in one app call tools provided by another app. In this project, the Stitch MCP server lets the Antigravity agent fetch designs directly from Stitch. No copy-paste, no screenshots. Explained in [build-diary entry 02](./content/build-diary/02-scaffolding-with-antigravity.md). *Analogy: a universal power adapter. One standard that lets devices from different makers plug into each other.*

### MDX

Markdown with the ability to embed React components inline. Lets you write `<RealWorldCallout file="..." lines="..." />` inside a `.md` file and have it render as an interactive component on the site. In this repo, the file extension is still `.md` but the build pipeline processes them as MDX. *Analogy: a book where most pages are plain prose, but a few have a pull-out diagram you can interact with.*

### Next.js

The web framework this site is built with. Sits on top of React. Handles routing, page generation, and the build pipeline. Made by Vercel. Works with any host. Version 15 (with the App Router) is the one we use.

### Pre-render / static generation

The technique of generating every page's HTML at build time, before any user visits the site. All pages on this site are pre-rendered. Faster and cheaper to serve than pages generated per-request. *Analogy: a bakery that bakes the bread before the shop opens, instead of starting from scratch when a customer walks in.*

### Prerequisites (frontmatter field)

A list of lesson slugs that should be read before this one. The build script validates the list (broken references fail the deploy). The lesson page renders a "before this lesson" link to each prerequisite.

### Preview deploy (Vercel)

When you push to a branch other than `main`, Vercel builds the site and serves it at a unique URL specific to that branch. You can share the preview URL with someone for feedback before merging. The production URL only updates when `main` updates.

### `public/` folder (Next.js)

The folder Next.js serves at the root URL. A file at `public/images/foo.png` is reachable at `/images/foo.png` in the browser. Used for static assets that don't go through the build pipeline: images, favicons, robots.txt.

### RAG (Retrieval-Augmented Generation)

A pattern where, before sending a question to a language model, you first retrieve relevant context from a vector store and augment the prompt with that context. Lets the model answer questions about your specific data, not just its training data. *Analogy: handing the model the relevant page of a textbook before asking it a question, instead of expecting it to remember everything.*

### Runtime

The moment a user hits the page in their browser. The opposite of *build time*. In this site, almost nothing happens at runtime. The HTML was already generated. The browser just renders it.

### `_section.md`

A per-folder metadata file under `/content/`. Carries the section's title, slug, sort order, and intro text. The leading underscore is a sorting convention. Most file listings sort `_` before letters and digits, so this file always appears at the top of the folder.

### Server Component

A React component that runs only at build time (or, in dynamic sites, on the server for each request). Cannot use interactive features like `onClick` or `useState`. In this site, every component except a few interactive ones is a Server Component. Faster, smaller bundle, simpler to reason about.

### Shiki

A syntax-highlighting library. Highlights code blocks at build time so they render with colour in the deployed site without any JavaScript running in the browser. Used via the `rehype-pretty-code` plugin in this repo.

### Slug

A URL-safe identifier for a piece of content. The lesson at `/lessons/how-to-learn/01-how-adults-learn-to-code` has the slug `01-how-adults-learn-to-code`. Slugs come from filenames (without the `.md`) and from the `slug` field in `_section.md`.

### SSG (Static Site Generation)

Another name for *pre-render*. The build pipeline generates every page's HTML during `next build`. Vercel serves the resulting HTML files. No server-side rendering at request time.

### Stitch (Google)

Google's AI-native UI design tool. Generates web designs from a brief. Exports a design system. Integrates with Antigravity via MCP. Used in this project to design the visual language for the site. See [build-diary entry 01](./content/build-diary/01-designing-with-stitch.md).

### Tailwind CSS

A utility-first CSS framework. Instead of writing CSS in a separate file, you compose styling by combining small utility classes directly on your HTML: `className="text-lg font-semibold text-stone-800"`. Every component in this site uses Tailwind classes. Stitch exports designs as Tailwind-compatible tokens. *Analogy: instead of buying pre-made outfits, you assemble each outfit from individual pieces.*

### Vector store

A database that stores text by its semantic meaning, not by exact word match. Lets you search for "documents like this question" rather than "documents containing these exact words". Used in RAG patterns. Examples: Postgres with `pgvector`, Chroma, Pinecone.

### Vercel

The hosting platform that serves this site. Built by the same team that makes Next.js. Free tier ("Hobby") is generous for small sites. See [build-diary entry 04](./content/build-diary/04-deploying-to-vercel.md). Connect your GitHub repo once. Every push triggers a rebuild and deploy.

### Browser preview / Test Result Artifacts (Antigravity)

Antigravity's built-in Chrome browser, used to verify your changes visually. The agent can drive the browser, take screenshots, and produce "Test Result Artifacts" (recordings + screenshots) that confirm the change looks right. Often informally called "Vibe Check" in tutorials, but that's not an official feature name. *Analogy: asking the agent to actually look at the work, not just trust that the code compiles.*

### YAML

A human-readable data format used for the frontmatter blocks in this repo's `.md` files. Indentation-based. Quotes optional for simple values. Easier to write than JSON by hand, but more sensitive to whitespace mistakes. *Analogy: an indented outline you'd write in a notebook, not a form with brackets and commas.*

---

## How to use this glossary

- **As a reader:** when you hit a term in any doc that you don't recognise, look here.
- **As a writer:** when you use a technical term for the first time in a student-facing doc, either define it in plain language on the spot, or add `(see [GLOSSARY](./GLOSSARY.md) → term)` so the reader can look it up.
- **As an agent:** if you introduce a term that doesn't exist here, add the entry in the same commit. Don't ship a glossary that's out of date.
