# Prompt 2 — Markdown reader, routing, and pages

Paste this into the agent. Verbatim. This is the densest prompt. Expect around 300 lines of output across several files.

---

> Build the application against the contract in `CONTENT-SPEC.md` and the brief in `BRIEF.md`. Follow the rules in `AGENTS.md`.
>
> 1. **`lib/content.ts`** — walks `/content/`. Treats every subfolder as a section. Reads `_section.md` for section metadata. Parses other `.md` files as lessons via `gray-matter`. Export `getAllSections()`, `getSection(slug)`, `getLesson(section, slug)`, `getNeighbours(section, slug)`.
>
> 2. **`scripts/validate-content.ts`** — fails the build if any frontmatter field is missing, any `prerequisites` slug doesn't exist, or any `real_world_excerpt.file` path doesn't exist. Logs a warning (not an error) for missing image references via `![alt](/images/...)`.
>
> 3. **`app/page.tsx`** — landing page. Read title and tagline from `site.config.json`. List sections from `navigation.primary`.
>
> 4. **`app/lessons/[section]/page.tsx`** — section index. Read `_section.md`. List lessons in `order`.
>
> 5. **`app/lessons/[section]/[slug]/page.tsx`** — full lesson with MDX-rendered body, syntax-highlighted code, prerequisites listed, and a sidebar that reads `real_world_excerpt` from frontmatter, slices the line range from the file in `/examples/`, and renders it syntax-highlighted.
>
> 6. **`app/build/page.tsx`** and **`app/build/[slug]/page.tsx`** — same pattern for build-diary entries.
>
> 7. **`components/`** — `Header`, `Footer`, `LessonNav`, and `RealWorldCallout`. Also a graceful image placeholder component that renders the alt text in a styled frame when a `/images/...` path doesn't exist.
>
> **Apply the design system in `DESIGN.md` literally.** Read `DESIGN.md` and translate its tokens into `app/globals.css` using Tailwind v4's CSS-first `@theme` block. Use the exact hex values, the exact font stacks (Georgia for body, ui-monospace for code), and the exact component patterns it specifies (minimal headers, no cards, no shadows, no gradients, no dark-mode toggle yet, the dashed-border image placeholder, the left-border callout). Do not embellish, do not add extra polish — Module 3 replaces this entire design system via the Stitch MCP fetch, and the visible before/after transformation is part of the teaching arc. The "wireframe with type" feel is deliberate.
>
> Static generation only. Use `generateStaticParams` for every dynamic route.

---

## What this prompt does

The substantive build. Markdown reader, content validator, all pages, key components.

## Where you can see the four principles

- **Read context first:** "the contract in `CONTENT-SPEC.md` and the brief in `BRIEF.md`". The agent re-reads both files for the latest state.
- **One concern:** content rendering and routing. Not design (Module 3). Not deploy (Module 4).
- **Name the rules file:** "Follow the rules in `AGENTS.md`."
- **Iterate, don't rewrite:** if the output isn't right (for example, the `LessonNav` doesn't link to the next lesson across sections), your follow-up is "the LessonNav should link forward across sections per `navigation.primary` order". Don't start a new chat.

## What to verify

After the agent finishes and you've run `npm install` for any new dependencies:

- `npm run dev` starts cleanly
- Visiting `http://localhost:3000` shows the landing page with the five sections listed
- Each section page lists its lessons in `order`
- Each lesson page renders the body with proper headings, code blocks, and tables
- The five build-diary entries are reachable under `/build/`
- Images referenced via `/images/...` paths render as styled placeholders. The actual images come in Module 3.
- The site uses the cream background (`#FAF6EE`), Georgia serif body, and sage-green accent (`#5C7A5E`) from `DESIGN.md`. No dark mode toggle. No cards, no shadows, no gradients. **If you see a polished dark theme, the agent went beyond DESIGN.md — re-prompt: "Strip any styling not in DESIGN.md. Use only the cream-and-Georgia tokens specified there."**

You can also run the validator manually:

```bash
npx tsx scripts/validate-content.ts
```

It should exit 0 (the existing content is valid) and produce warnings about the six missing images.
