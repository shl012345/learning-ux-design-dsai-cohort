# AGENTS.md

Rules for AI coding agents working in this repo. Read this before generating any code.

This file follows the [AGENTS.md cross-tool standard](https://agents.md/) supported by Antigravity v1.20.3+ (March 2026), Cursor, Gemini CLI, and 20+ other tools listed at agents.md. Project-specific rules live here. Agent-specific overrides go in `GEMINI.md` if needed (and take precedence).

## What this repo is

A content-driven learning site. Markdown files in `/content/` are the source of truth. The application reads them at build time and renders the website. Real source code referenced by lessons lives in `/examples/`.

Three documents you should read before generating code:

- **`BRIEF.md`** — full project brief (purpose, audience, scope, tech stack, success criteria)
- **`CONTENT-SPEC.md`** — frontmatter contract every `.md` file must satisfy
- **`site.config.json`** — site-level metadata (title, author, navigation, branding)

If you're not sure what this repo is for, re-read those three before continuing.

## Stack constraints — non-negotiable

- **Next.js 16** with the App Router. **TypeScript** strict mode. **Tailwind CSS v4**.
- **Vanilla scaffold only.** Do not use commercial Vercel templates or starter kits. Build from `create-next-app`.
- **No Vercel-locked features.** Do not introduce Vercel KV, Postgres, Blob, or paid Vercel Analytics. The codebase must remain portable to Netlify, Cloudflare Pages, or self-hosted Node with zero changes.
- **Static generation only.** Use `generateStaticParams` for every dynamic route. No server functions, no API routes, no client-side data fetching for content.
- **No database.** Markdown files in git are the only data store.

## Content discovery rules

- **Section discovery is filesystem-driven.** Walk `/content/lessons/` and `/content/build-diary/`. Treat every subfolder as a section. Do not hardcode section names anywhere in code.
- **`_section.md` is section metadata.** Treat any `_section.md` file as section metadata, not as a lesson. Read its frontmatter for `slug`, `title`, `order`, `summary`.
- **Lesson order comes from the `order` field.** The numeric prefix on filenames (`01-`, `02-`) is for natural sorting of the file system listing. The canonical order comes from the frontmatter.
- **Frontmatter is the contract.** If a `.md` file has malformed or incomplete frontmatter, fail the build with a clear error pointing at the file and missing fields.

## Required dependencies

These libraries are part of the contract. Do not introduce alternatives unprompted:

- `gray-matter` — frontmatter parsing
- `@next/mdx` — MDX support in Next.js
- `remark-gfm` — GitHub-flavoured markdown features (tables, task lists, autolinks)
- `rehype-pretty-code` — syntax highlighting at build time, powered by Shiki

If you need additional libraries, ask before installing.

## Design system

- **Design tokens come from `DESIGN.md`** at the repo root. Read it before writing any styling code.
- **If the Stitch MCP server is connected** (installed per-user via Antigravity's MCP Store — see Module 3 for setup), prefer fetching the latest design from Stitch via MCP rather than relying on a stale local `DESIGN.md`. The agent can list projects, list screens, and fetch each screen's code through the Stitch MCP server's tools. Update `DESIGN.md` from the MCP source so the file stays in sync. Exact tool names vary across Stitch MCP versions; check the live list with `/mcp list` in the Agent panel.
- **Tailwind is the styling layer.** No CSS-in-JS, no styled-components, no Emotion.
- **Dark mode is supported from day one.** Use Tailwind's `dark:` modifier classes. Pull dark-mode tokens from `DESIGN.md`.
- **No animations** beyond standard hover and focus states. The site is reading-first.

## Component model

- **Server Components by default.** Use Client Components (`"use client"`) only when interactivity strictly requires it (for example, a dark-mode toggle or a search input).
- **One component per file.** Component name in PascalCase. Filename matches: `RealWorldCallout.tsx`, not `realWorldCallout.tsx`.
- **Real-world callouts.** When a lesson's frontmatter has `real_world_excerpt`, render a sidebar callout that reads the referenced file from `/examples/`, slices the line range, and syntax-highlights it with the same Shiki theme used for inline code.
- **Forward navigation.** Every lesson page has a "Next" link to the next lesson in `order`. Within section first, then across sections in `navigation.primary`.

## Images

- **Images live in `public/images/`** per Next.js convention. Lessons reference them via standard markdown image syntax: `![alt text](/images/<filename>.png)`. Next.js serves anything in `public/` from the root URL.
- **`IMAGES.md` at the repo root is the source of truth** for image filenames, alt text, and the Nano Banana prompts that generate them. Do not add or rename an image without a matching entry there.
- **Missing images must degrade gracefully.** Render a styled placeholder (broken-image frame, alt text visible) rather than a hard error. The site should build and serve even when `public/images/` is empty.
- **Do not generate images on the fly.** All images are pre-generated externally via Nano Banana and committed to `public/images/`. The build pipeline is static-only.

## Glossary discipline

- **`GLOSSARY.md` at the repo root** is the canonical reference for every technical term used in student-facing docs (lessons, build diary, in-site reader).
- **On first use of a technical term** in any student-facing doc, either explain it in plain language in place, or add a pointer: `(see [GLOSSARY](../../GLOSSARY.md#term) → term)`. Later uses in the same file can be bare.
- **If you introduce a new technical term** that doesn't exist in `GLOSSARY.md`, add the entry in the same commit. Don't ship the doc and the glossary out of sync.
- This rule does not apply to instructor-facing docs (`AGENTS.md`, `DEMO.md`, `BRIEF.md`, `CONTENT-SPEC.md`, `FORK.md`). Those readers are assumed to know the terms.

## Cross-platform notes

Most cohort students are on Windows using WSL2 (Ubuntu inside Windows). A smaller number are on macOS or Linux directly. Keep these patterns in mind when generating commands or troubleshooting:

- **Default to bash commands.** All instructions assume a Unix-like shell. WSL2 students are inside Ubuntu's bash. Don't ship PowerShell variants of every command. The only Windows-native command students should see is the initial `wsl --install`.
- **Paths are Linux paths.** Project paths look like `/home/<user>/learning-ux-design-dsai/...`, not `/Users/...` (Mac) or `C:\Users\...` (Windows). If you see a Windows path in a student's question, they're likely working outside WSL2 — flag it.
- **Project must live on the WSL2 native filesystem.** When inside WSL2, the project should be at `~/learning-ux-design-dsai/`, not `/mnt/c/Users/<user>/...`. The Windows filesystem mounted at `/mnt/c/` makes `npm install`, file watching, and dev-server reloads painfully slow.
- **`localhost:3000` from inside WSL2 is reachable from the Windows browser** in most cases. If a student reports it isn't, `wsl --shutdown` in PowerShell followed by a restart of the dev server usually fixes it.
- **Antigravity connects to WSL2 via Remote-WSL** (the same mechanism as VS Code; no separate Antigravity extension to install). Students click the bottom-left remote indicator → **Connect to WSL** → then File → Open Folder. If you see a student trying to open the project via File → Open Folder from the Windows side without connecting to WSL first, flag it.
- **`gh` auth and SSH keys live inside WSL2**, not on the Windows host. If `git push` fails with permission errors, the student probably authenticated outside WSL2. Re-run `gh auth login` from inside Ubuntu.
- **Don't suggest installing Node on the Windows host.** Node should live inside WSL2's Ubuntu, installed via `nvm`. A student running Node on Windows while editing files in WSL2 hits the worst of both environments.

When you give terminal commands, you can assume a bash environment. When you give IDE actions (open folder, etc.), say "inside Antigravity" not "inside VS Code" or "inside Windows Explorer".

## Validation

A `scripts/validate-content.ts` runs at build time. It must fail the build (`exit 1`) on any of:

- A `.md` file missing required frontmatter fields (see `CONTENT-SPEC.md`)
- A `prerequisites` slug that doesn't reference an existing lesson
- A `real_world_excerpt.file` path that doesn't exist
- A duplicate `order` value within the same section

Image references via `![alt](/images/...)` that point at a missing file should produce a build warning (not a failure). The site should still build when images are yet to be generated. The warning lists the file path and the lesson it appeared in.

## What you should ask the user before doing

- Adding a new top-level dependency
- Introducing a new pattern that conflicts with these rules
- Restructuring `/content/`, `/examples/`, or the routing scheme
- Renaming any of the documented files (`BRIEF.md`, `CONTENT-SPEC.md`, `FORK.md`, `DEMO.md`, `IMAGES.md`, `GLOSSARY.md`, `SITE-CONFIG.md`, `WHICH_DOC_WHEN.md`, `site.config.json`, `DESIGN.md`)

## What you can do without asking

- Add a new component in `/components/` if the existing prompt requires it
- Refactor a hardcoded value to use a design token
- Add tests
- Improve TypeScript types
- Add comments to make code clearer

## When in doubt

Read `BRIEF.md` again. The brief settles most "should I…?" questions.
