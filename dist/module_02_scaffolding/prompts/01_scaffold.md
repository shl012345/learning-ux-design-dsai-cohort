# Prompt 1 — Vanilla Next.js scaffold

Paste this into the Antigravity Agent panel (Cmd+L on Mac, Ctrl+L on Windows). Verbatim.

---

> Read `BRIEF.md`, `CONTENT-SPEC.md`, `AGENTS.md`, and `site.config.json` to understand what we're building and the project rules.
>
> Create a vanilla Next.js 16 application using the App Router with TypeScript and Tailwind CSS v4. Place `app/`, `lib/`, and `components/` at the project root — do not use a `src/` directory. Install `gray-matter`, `@next/mdx`, `remark-gfm`, and `rehype-pretty-code`.
>
> Three non-obvious things to get right the first time:
>
> 1. **Use `next.config.mjs`, not `next.config.ts`.** `rehype-pretty-code` is ESM-only and importing it from a `.ts` config file produces cryptic errors. Configure the `.mjs` file to support `.md` and `.mdx` extensions.
>
> 2. **In `next.config.mjs`, pass MDX plugins as string-tuples, not imported functions.** Turbopack (Next.js 16's default bundler) requires serialisable plugin options. Use this pattern exactly:
>    ```js
>    options: {
>      remarkPlugins: [['remark-gfm']],
>      rehypePlugins: [['rehype-pretty-code', { theme: 'github-dark' }]],
>    }
>    ```
>    The imported-function pattern (`remarkPlugins: [remarkGfm]`) will throw "loader does not have serializable options" at dev-server start. Most tutorials online show the broken pattern — do not follow them.
>
> 3. **Delete the auto-generated `AGENTS.md` and `CLAUDE.md`.** Next.js 16's `create-next-app` writes a new `AGENTS.md` and `CLAUDE.md` at the project root. The existing `AGENTS.md` in this repo has the project rules; the new one would overwrite or compete with it. After scaffolding, remove the newly-created `AGENTS.md` and `CLAUDE.md`. Do not touch the existing `AGENTS.md` that was there before you ran `create-next-app`.
>
> Don't write any application code yet — just set up the project structure, install dependencies, apply the three fixes above, and confirm `npm run dev` starts a working dev server.

---

## What this prompt does

Scaffolds the empty Next.js 16 app. Installs the four dependencies the markdown pipeline needs. Applies three fixes that prevent first-time stumbles: ESM config, Turbopack-compatible plugin refs, and clearing the create-next-app collision with the existing AGENTS.md.

## Tailwind v4 — a note

Tailwind CSS v4 changed how it's configured from v3. There's no `tailwind.config.js` by default — config is CSS-first, and the import in `app/globals.css` is `@import "tailwindcss"` instead of the old `@tailwind base/components/utilities` directives. Stack Overflow answers and tutorials written for v3 will mislead you. If the agent produces v3-style config in this prompt, ask it to "use the Tailwind CSS v4 CSS-first configuration pattern, not the v3 JavaScript-config pattern". Tailwind v4 also requires Safari 16.4+, Chrome 111+, or Firefox 128+.

## Where you can see the four principles

- **Read context first:** "Read `BRIEF.md`, `CONTENT-SPEC.md`, `AGENTS.md`, and `site.config.json`" is the first sentence.
- **One concern:** scaffolding only. No content rendering. No design tokens. No routing.
- **Name the rules file:** `AGENTS.md` is in the read list.
- **Iterate, don't rewrite:** if the agent installs the wrong dependency version, your follow-up is "use the latest stable version of X". Don't start a new chat.

## What to verify

After the prompt runs:

- `package.json` exists with `next`, `react`, `tailwindcss`, `gray-matter`, `@next/mdx`, `remark-gfm`, and `rehype-pretty-code` in dependencies
- `app/` is at the project root (NOT `src/app/`). No `src/` folder at all.
- `next.config.mjs` exists (not `next.config.ts`) and uses string-based plugin refs (e.g. `[['remark-gfm']]`)
- The project root has the original `AGENTS.md` (the 100-line one with the project rules). No `CLAUDE.md`. If you see a short auto-generated AGENTS.md at the root, the cleanup step didn't happen — re-prompt.
- `npm install` completes without errors
- `npm run dev` starts a server on `http://localhost:3000`
- Visiting the URL shows Next.js's default placeholder page (or an empty page — either is fine)
- The dev-server log does not include "loader does not have serializable options"

If something failed, refine in the same conversation. Don't start a new chat.
