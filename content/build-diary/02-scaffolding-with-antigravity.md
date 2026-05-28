---
title: "Scaffolding with Antigravity"
section: "build-diary"
order: 2
duration: "15 min"
difficulty: "beginner"
prerequisites: ["01-designing-with-stitch"]
analogy: "Telling a senior developer what you want and reviewing what they wrote"
tags: ["build-diary", "antigravity", "nextjs", "ai-development"]
summary: "Using Google Antigravity to scaffold a vanilla Next.js + MDX application from the brief and the DESIGN.md."
---

> 📝 **Note:** This entry describes the planned scaffolding workflow. It will be revised once the actual Antigravity session has been completed, with the real prompts used and screenshots of the agent's output.

You have a brief (`BRIEF.md`) and a design language (`DESIGN.md`). You need a working [Next.js](../../GLOSSARY.md#nextjs) application. The traditional path is to scaffold by hand — `npx create-next-app`, install [MDX](../../GLOSSARY.md#mdx) support, configure [Tailwind](../../GLOSSARY.md#tailwind-css), write the markdown reader, build the routing. About a day's work for someone who's done it before. A week for someone who hasn't.

Antigravity is Google's agentic IDE — released in late 2025. You can describe what you want in plain English, the agent reads your existing repo (the brief, the design language, the content structure), writes the code, and you review it. The day's work becomes a couple of hours.

This diary entry covers how I used Antigravity to scaffold the Next.js application — what worked, what I had to hand-edit, and what I'd do differently next time.

## Why Antigravity rather than a Vercel template

There's a faster path: fork one of Vercel's official Next.js + MDX templates and modify it. That would have shaved another half-day off the schedule. I chose not to, for a specific reason: **portability**. Vercel templates assume Vercel-specific features (analytics SDKs, KV storage, edge functions) that lock you in. Building from vanilla Next.js means the same repo will deploy on Netlify, Cloudflare Pages, GitHub Pages, or a self-hosted server with zero changes. For a learning site that students might fork for their own subjects (see `FORK.md`), portability matters.

The trade-off: more work upfront. Antigravity made the trade-off acceptable.

## Editor View vs Manager View

Antigravity offers two modes:

- **Editor View** is a single-agent IDE — you type a prompt, the agent reads and edits files, you review. Synchronous, like pair programming.
- **Manager View** orchestrates multiple agents working in parallel on different parts of the same repo. Asynchronous, more powerful, more complicated.

For a project this size — a few hundred lines of scaffolding code — Manager View was overkill. Editor View was the right tool. One conversation, one agent, sequential prompts, my review at each step.

If I were building something larger — say, a multi-tenant SaaS with three independent subsystems — Manager View would earn its place. Knowing when to use which is part of the craft.

## Two prompts that did the scaffold

The scaffolding came out of two prompts, each focused on one concern. The design system came later, in a separate session, via the Stitch MCP — covered further down.

### Prompt 1 — The vanilla Next.js scaffold

> Create a vanilla Next.js 16 application using the App Router. Set up TypeScript. Add Tailwind CSS v4. Place `app/`, `lib/`, and `components/` at the project root — do not use a `src/` directory. Install `@next/mdx`, `gray-matter`, `rehype-pretty-code`, and `remark-gfm`. Use `next.config.mjs` (not `.ts`) because `rehype-pretty-code` is ESM-only. In the MDX plugin config, pass plugins as string-tuples (`[['remark-gfm']]`) not imported functions, because Turbopack needs serialisable options. After scaffolding, delete the auto-generated `AGENTS.md` and `CLAUDE.md` that `create-next-app` writes — the existing `AGENTS.md` in this repo has the project rules and shouldn't be overwritten. Don't use any Vercel-specific templates or starter kits — I want to be able to deploy this anywhere. Read `BRIEF.md` and `site.config.json` for context.

This prompt produced the basic project structure: `package.json`, `tsconfig.json`, `next.config.mjs`, `app/layout.tsx`, `app/page.tsx`, and a working dev server. About 200 lines of code generated; I reviewed each file and accepted them with minor edits.

The agent correctly read `site.config.json` and pulled the title and tagline into the layout — that was a small but pleasant win. Antigravity's value isn't really "writes code"; it's "writes code that respects the existing context in your repo".

Two things in the prompt are non-obvious enough to call out. The first is `next.config.mjs` over `.ts`: `rehype-pretty-code` is ESM-only and the import will fail from a TypeScript config. The second is the string-tuple plugin pattern: Turbopack (Next.js 16's default bundler) refuses non-serialisable loader options, so the imported-function pattern most Stack Overflow answers use will throw at dev-server start. Both are first-time-only stumbles. Once you know about them, the scaffold runs clean.

### Prompt 2 — The markdown content reader and routing

> Build the markdown content reader at `lib/content.ts`. It should walk `/content/` at build time, treat every subfolder as a section, read `_section.md` for section metadata, and read every other `.md` file as a lesson. Use `gray-matter` for frontmatter parsing. Then build the lesson page at `app/lessons/[section]/[slug]/page.tsx` and the section index page at `app/lessons/[section]/page.tsx`. Both should use static site generation (SSG) so the site is fully pre-rendered at build time. Read `CONTENT-SPEC.md` for the frontmatter contract. Apply the design system in `DESIGN.md` literally — exact hex values, Georgia serif body, sage accent, no cards or shadows or dark mode. Module 3's Stitch fetch will replace this entire design system; don't embellish.

This was the densest prompt and produced the most code — about 300 lines across `lib/content.ts`, the page components, and the navigation. I reviewed it carefully and edited about 20% of what the agent wrote, mostly to tighten the rendering logic and add error handling for missing frontmatter fields.

The agent correctly implemented the `real_world_excerpt` callout component too — reading the file path and line range, slicing the source code, syntax-highlighting it, and rendering it in a sidebar. That was the part I'd most worried about; it just worked.

### Why design is a deliberate before-state, not a Stitch placeholder

The original plan was three prompts: scaffold, design tokens, content+routing. I collapsed it to two. The design tokens still get applied — but they're applied from a deliberate before-state `DESIGN.md`, not from a Stitch export.

The reasoning: when I ran the first version of these prompts, `DESIGN.md` was a placeholder that said "this file will be filled by Stitch later". The agent read that, shrugged, and produced its own polished defaults — a dark theme with sensible spacing and a nice typographic hierarchy. The site looked good after Prompt 2.

That sounds like a win, but it killed the teaching moment of Module 3. When you then ran Stitch and pulled the design via MCP, the visible difference between "before Stitch" and "after Stitch" was small — both states looked polished. The "design as data" lesson had no payoff to point at.

So I made `DESIGN.md` a real but deliberately plain design system. Cream background, Georgia serif throughout, muted sage accent, no dark mode, no cards or shadows. The Prompt 2 instructions now tell the agent to apply this `DESIGN.md` literally, without embellishment. The result is a thoughtful-but-obviously-default reading experience after Module 2 — and Module 3's Stitch fetch creates a visible transformation when it replaces the design system. The "before / after" jump is now genuinely instructive instead of subtle.

## What Antigravity got right out of the box

Several things, in roughly this order of impressiveness:

- **Read the existing context.** It used `BRIEF.md`, `DESIGN.md`, `CONTENT-SPEC.md`, and `site.config.json` without me needing to paste them. The agent treated the repo as a single coherent thing.
- **Followed the conventions.** Filenames in kebab-case, components in PascalCase, tests next to source files, frontmatter parsing in a single place. No mismatches with the project's existing style.
- **Wrote idiomatic Next.js 16.** Used the App Router properly. Server Components by default. Avoided client components except where needed (the dark-mode toggle).
- **Got the markdown pipeline right.** `gray-matter` for frontmatter, `remark-gfm` for tables/task lists, `rehype-pretty-code` for syntax highlighting via Shiki. All wired up correctly on the first try.

## What I had to hand-edit

A few things, none of them deal-breakers:

- **Line-length on lesson pages** — the agent's max-width was 800px, which is fine for normal content but a touch wide for code-heavy lessons. I tightened to 720px.
- **The "What's next" link footer** — the agent rendered it as a plain link; I added a card with a small arrow icon to make it more visually distinct.
- **Frontmatter validation errors** — the agent silently swallowed missing fields. I added a build-time check that fails the deploy if any `.md` file has invalid frontmatter, so problems show up at build time rather than at runtime.
- **The TypeScript types for frontmatter** — generic `any` on first pass; I tightened them to a proper `LessonFrontmatter` interface.

These are the kinds of edits a senior developer would make to a junior's PR. The agent produced workable code; I made it production-quality.

## What would have been simpler with a template

Honesty time. If I'd used a Vercel Next.js + MDX template, much of this would have been pre-done:

- The basic scaffold would already exist
- Tailwind and MDX would already be wired up
- The lesson page would already render

I'd have spent the time customising the template instead of building from scratch. About four to six hours saved.

But the trade-off, again, is portability and lock-in. With the vanilla scaffold, the codebase is fully understood — every file was generated against the brief, not inherited from a template I didn't write. That ownership matters when a student forks the repo for their own subject; they won't be debugging template code they don't understand.

Would I still recommend the vanilla path for a similar project? Yes. The four to six hours was worth it.

## How Antigravity talks to Stitch — the MCP layer

One thing the two prompts above leave implicit: when Antigravity needs to *apply* a design from Stitch (which happens in Module 3, after Stitch has been briefed and iterated), how does it actually reach into Stitch and pull the design out? The answer is **MCP — the Model Context Protocol**.

MCP is a standard for letting an AI agent in one app call tools provided by another app. *Analogy: a universal power adapter — one standard that lets devices from different makers plug into each other.* In this project, the Stitch MCP server is the bridge between the Antigravity agent and the Stitch design tool. The agent can ask Stitch questions in plain English; Stitch returns structured answers; the agent does something useful with them.

The Stitch MCP server exposes a small set of tools the agent can call. You don't need to memorise the tool names — you describe what you want in plain English ("fetch the latest design from my Stitch project named X") and the agent picks the right tools to chain. The set typically includes operations for listing projects, listing the screens inside a project, fetching a screen's HTML/CSS, and fetching a preview image. Exact tool names vary across Stitch MCP versions; you can check the live list in Antigravity by typing `/mcp list` in the Agent panel.

Why this matters, in one sentence: **without MCP, you'd be copy-pasting Stitch's CSS exports into Antigravity by hand every time you refined the design**. With MCP, the agent re-fetches the latest design from Stitch on every relevant prompt, and the design stays live. Iterate in Stitch, ask the agent to "apply the latest design", and the round-trip happens in seconds.

The setup is a one-time per-developer step: install the Stitch MCP server via Antigravity's MCP Store and paste your Stitch API key when prompted. Full instructions in Module 3's prompt files. After that you stop thinking about MCP and just talk to the agent.

## What's next

Build-diary entry 3 explains the markdown content pipeline in detail — how a `.md` file becomes a rendered lesson page. This is the most reusable piece of the build, and the part that makes the whole "drop a `.md` file, push to git, see it deploy" workflow possible.
