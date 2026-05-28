# Module 2 — Scaffolding from the brief

**Time:** ~35 min · **Requires:** Antigravity installed, repo opened as a workspace

## What you'll learn

You'll use Antigravity to turn the planning files into a working Next.js application. It takes two prompts.

The prompts themselves matter less than the four principles behind them. The principles work on any project you bootstrap from a brief:

1. **Read the context first.** Every prompt starts by telling the agent which planning files to read. The agent doesn't guess what the project is. You point it at the brief.
2. **One concern per prompt.** Prompt 1 is only scaffolding. Prompt 2 is only content rendering and routing. Don't bundle concerns — the output is hard to review and hard to fix.
3. **Name the rules file.** Every prompt references `AGENTS.md`. This keeps the output consistent across calls. Without it, the agent uses defaults that fight your project conventions.
4. **Iterate, don't rewrite.** If the output isn't right, refine in the same conversation. Don't start a new chat.

The Next.js scaffold is the side effect. The principles are what transfer.

> This module applies the deliberate "before-state" design from `DESIGN.md` — cream background, Georgia serif throughout, muted sage accent, no dark mode, no cards or shadows. It's meant to look thoughtful but plain, like a 2008 long-form blog. Module 3's Stitch MCP fetch replaces this entire design system with whatever you design in Stitch. The visible before/after is the teaching moment — keep this state plain on purpose. If your Module 2 site looks polished and modern, the agent went beyond `DESIGN.md`; re-prompt to strip it back.

## Class flow

### Step 1 — Open the workspace (2 min)

In Antigravity: **File → Open Folder**. Select your local clone of the repo. The agent reads `AGENTS.md`, `BRIEF.md`, `CONTENT-SPEC.md`, and `site.config.json` automatically.

Open the Agent panel: **Cmd+L** on Mac or **Ctrl+L** on Windows. (Cmd+E is a different shortcut — it toggles between Editor View and Manager View.)

Sanity-check that the agent has the context. Type:

> What's in this repo, and what are the project rules?

The agent should mention the DSAI Companion Reader topic, the 16 lessons across 5 sections, and the constraints in `AGENTS.md`: vanilla Next.js, no Vercel lock-in, Tailwind v4, static generation only.

### Step 2 — Run Prompt 1 (~10 min)

Open [`prompts/01_scaffold.md`](./prompts/01_scaffold.md). Copy the prompt verbatim. Paste it into the agent. Skim each new file before you accept the changes.

Then in your terminal:

```bash
npm install
npm run dev
```

Open `http://localhost:3000`. You should see Next.js's default placeholder page. That's success for Prompt 1.

### Step 3 — Run Prompt 2 (~15 min)

Open [`prompts/02_content_routing.md`](./prompts/02_content_routing.md). Copy and paste. This prompt wires up the markdown reader, the routing, and the page components.

When the agent finishes, the dev server should render:

- A landing page listing the five sections
- Each section page listing its lessons
- Each lesson page rendering the body with frontmatter at the top
- The build-diary section under `/build/`

This is the "before" state for Modules 3 and 4. The styling is plain Tailwind defaults. There are no images. But every piece of content is reachable.

### Step 4 — Notice the four principles in action (5 min)

Re-read the two prompts. For each one, find:

- Where it reads the context first
- What its one concern is
- Where it names the rules file
- Whether you iterated in the same conversation when output wasn't right

Noticing where the principles show up is what makes them transferable.

## Defend-It questions

1. If you bundled both prompts into one "build me the whole app" prompt, what would break? Predict the failure mode.

2. Why does `AGENTS.md` appear by name in every prompt? What would the agent do differently if you left it out?

3. The prompts work, but a senior developer reviewing the output would still find things to clean up. Name two things you'd expect to need hand-editing. (See build-diary entry 02 §"What I had to hand-edit".)

## What's next

[**Module 3 — The visual layer**](../module_03_visual_layer/README.md). Stitch design, MCP, and Nano Banana images. About 60 minutes.

## See also

- [Build-diary entry 02](../../content/build-diary/02-scaffolding-with-antigravity.md) — the full reflection on this scaffolding session, including the principles section
- [`AGENTS.md`](../../AGENTS.md) — the rules file the agent reads on every prompt
