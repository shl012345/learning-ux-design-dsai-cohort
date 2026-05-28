# TECH_STACK.md

The full tech stack of this project, organised by what each thing does.

If a student asks "what's the stack?", the first table (core stack) is the answer. The rest is plumbing and tools — what makes this specific site work, but not what a student needs to memorise on day one.

---

## 1. Core stack — the fundamentals

| Item | Role | Version we use |
|---|---|---|
| **Next.js** | App framework, routing, build pipeline | 16 (App Router) |
| **React** | UI components | 19 (ships with Next.js 16) |
| **Tailwind CSS** | Styling | v4 (CSS-first config) |
| **Node.js** | Runtime for `next dev` and `next build`. Does **not** run in production. | 22 LTS ("Jod") |
| **TypeScript** | Strict-mode JavaScript with types | 5.x |

### A note on Node

Node powers the local development server (`next dev`) and the build step (`next build`). It does **not** run when a visitor opens the deployed site. The site is statically generated — every page's HTML is built once at deploy time, then served as a finished file from Vercel's CDN. That's why the site is free to host on Vercel's Hobby tier: no Node process keeps running per visitor.

This is the single most under-noticed property of the architecture, and the reason the site costs zero dollars per month to run.

## 2. Content pipeline — how markdown becomes pages

These four libraries get installed in Module 2 and then run only at build time. Students don't usually touch them directly; the agent wires them up.

| Item | Role |
|---|---|
| **MDX** (`@next/mdx`) | Markdown that can embed React components inline. Lets a `.md` file include `<RealWorldCallout />` or similar |
| **gray-matter** | Parses the YAML frontmatter block at the top of every `.md` file into a JavaScript object |
| **remark-gfm** | Adds GitHub-flavoured markdown features: tables, task lists, autolinks, strikethrough |
| **rehype-pretty-code** (+ **Shiki**) | Syntax-highlights code blocks at build time. Zero runtime JavaScript needed for syntax colours |

See [`CONTENT-SPEC.md`](./CONTENT-SPEC.md) for the frontmatter contract these libraries operate on. See [build-diary entry 03](./content/build-diary/03-the-markdown-pipeline.md) for the four-step recipe explaining what each library does in sequence.

## 3. External tools — what you operate during the build

These are not code dependencies. They're tools you use as a human, in their own UI, alongside writing prompts in Antigravity.

| Item | Role | When used |
|---|---|---|
| **Stitch** (Google) | AI-native UI design tool. Generates the design system. Stitch's design tokens get fetched via MCP and applied to `app/globals.css` | Module 3 |
| **Antigravity** (Google) | AI-native IDE. Reads the brief and project rules (`AGENTS.md`), writes the code, applies designs via MCP | Modules 2 + 3 |
| **Nano Banana** (Google's Gemini Image family) | AI image generation. Produces the lesson illustrations from prompts in [`IMAGES.md`](./IMAGES.md). Distinct from the older Imagen line | Module 3 (Track B) |

## 4. Platforms — where things live and run

| Item | Role |
|---|---|
| **GitHub** | Source control. The repo. Push to `main` triggers Vercel's auto-deploy |
| **Vercel** | Hosting. Auto-detects Next.js on push, runs `next build`, serves the resulting HTML from a global CDN. Free Hobby tier covers small reading-first sites comfortably |

See [build-diary entry 04](./content/build-diary/04-deploying-to-vercel.md) for the Vercel-specific reasoning (free-tier numbers, the push-to-deploy loop, why not Netlify).

---

## Counting

That's **5 + 4 + 3 + 2 = 14 items** when you fully enumerate. The categorisation makes them easier to hold in your head than a flat list of 14.

## What a student actually interacts with

Of the 14, students directly operate **5 + 2 platforms + 3 tools = 10**. The content pipeline (MDX, gray-matter, remark-gfm, rehype-pretty-code) is plumbing — the agent wires it up in Module 2 and students rarely touch it again.

## What this stack is NOT

Deliberate choices we made *against* common defaults:

- **No commercial Vercel templates** — vanilla `create-next-app` scaffold only. Keeps the repo portable to Netlify, Cloudflare Pages, or self-hosted Node with zero changes.
- **No headless CMS** (Sanity, Contentful, Strapi) — markdown in git is the simplest possible CMS. No vendor lock-in, no per-month pricing tier.
- **No database** — content is static markdown; site is statically generated. No Postgres, no Redis, no vector store needed (this is a *reading* site, not a *retrieval* site).
- **No Vercel-locked features** — no KV, no Postgres, no paid Analytics. The whole codebase deploys anywhere static HTML can be served.
- **No CSS-in-JS** — no styled-components, no Emotion. Tailwind utility classes throughout. Simpler bundle, faster build.

See [`BRIEF.md`](./BRIEF.md) §5 for the full "what we deliberately don't use" list and the reasoning behind each.

---

## See also

- [`BRIEF.md`](./BRIEF.md) §5 — tech-stack table with rationale for each choice
- [`CONTENT-SPEC.md`](./CONTENT-SPEC.md) — frontmatter contract the content pipeline operates on
- [`AGENTS.md`](./AGENTS.md) — stack constraints that AI agents must respect when generating code
- [`GLOSSARY.md`](./GLOSSARY.md) — plain-language definitions for each item above
- [build-diary entry 02](./content/build-diary/02-scaffolding-with-antigravity.md) — how the stack was scaffolded
- [build-diary entry 05](./content/build-diary/05-content-config-code-separation.md) — why the architecture is shaped this way
