# Module 3 — The visual layer

**Time:** ~60 min · **Requires:** Module 2 complete · Stitch account + API key · Stitch MCP installed in Antigravity

## What you'll learn

After Module 2 the site renders all its content but looks like a wireframe. This module fixes that. Two workflows run in parallel:

- **Design (Stitch + MCP).** You brief Stitch, iterate the design one change at a time, then fetch the result into Antigravity through the MCP bridge.
- **Images (Nano Banana).** You generate the six lesson illustrations by working through `IMAGES.md`.

This is the module where the visible design changes. After Module 2 your site uses the deliberate "before-state" design from `DESIGN.md` — cream background, Georgia serif throughout, sage accent, no dark mode. The MCP fetch in Step 5 (Track A) replaces `DESIGN.md` with your Stitch export and updates `app/globals.css` (the Tailwind v4 `@theme` block) to match. Same components, new tokens. The dark-mode toggle gets added at the same time. The transformation should be visibly dramatic — if your site looks roughly the same after the fetch as before, the agent didn't fully replace the `@theme` block; re-prompt.

Four learning moments inside this module:

1. Stitch's generation modes (Ideate, Flash, Thinking, Redesign) and when to use each
2. The 5-part Stitch brief anatomy: what the site is, tone, hard constraints, anti-constraints, required screens
3. The one-change-per-prompt rule for Stitch refinement
4. The MCP bridge: how Antigravity reaches into Stitch and pulls the design out without copy-paste

## Class flow

This module has two tracks. Run them in parallel (one in a Stitch tab, one in a Nano Banana tab) or one after the other.

### Track A — Design with Stitch (40 min)

**Step 1 — Pick a similar site to lift from (5 min).** Find one reading-first content site you admire. A long-form magazine, a personal blog, or a documentation site works. You won't copy it pixel-for-pixel. You'll mention it as the tone reference in your Stitch brief.

**Step 2 — Brief Stitch (5 min).** Open [stitch.withgoogle.com](https://stitch.withgoogle.com). Click **New design** → **Standard mode**. Paste the brief from [`prompts/01_stitch_brief.md`](./prompts/01_stitch_brief.md), edited to mention the site you picked. Use **Ideate** mode for this first pass.

**Step 3 — Pick a direction (5 min).** Stitch produces several candidates. Pick one. Discard the others. Take a screenshot of what you picked. If a later refinement goes wrong, the screenshot is your recovery point.

**Step 4 — Refine, one change per prompt (15 min).** See [`prompts/02_stitch_refinement_examples.md`](./prompts/02_stitch_refinement_examples.md) for what a good refinement looks like next to a bad one. Do three to five refinement rounds in **Flash** mode. Then one final pass in **Thinking** mode for typography and spacing details.

**Step 5 — Fetch the design via MCP into Antigravity (10 min).** Back in Antigravity, paste [`prompts/03_apply_design_via_mcp.md`](./prompts/03_apply_design_via_mcp.md). Substitute your Stitch project name. The agent chains a sequence of Stitch MCP tool calls (list your projects, list the screens inside the target one, fetch each screen's code), updates `tailwind.config.ts` and `DESIGN.md`, and adds the dark-mode toggle. Restart the dev server.

The site you scaffolded in Module 2 should now render with your design system. The components didn't need rewriting. They were already using Tailwind tokens, which picked up the new values.

### Track B — Generate the images (20 min)

**Step 1 — Open IMAGES.md and Nano Banana.** [`/IMAGES.md`](../../IMAGES.md) at the repo root has six image entries, each marked `[ ]`. Nano Banana lives inside [Google AI Studio](https://aistudio.google.com/).

**Step 2 — Generate one image at a time.** For each entry:

1. Copy the **Style preamble** (top of `IMAGES.md`) into Nano Banana.
2. Paste the entry's **Content prompt** as a second message.
3. Generate. Pick the best output. Download it.
4. Save it as `public/images/<filename>.png`, using the exact filename from the entry.
5. Change `[ ]` to `[x]` in `IMAGES.md`.

**Step 3 — Refresh the dev server.** The six lesson images now render in place of the styled placeholders.

## Why one change per Stitch prompt

This is the rule everyone gets wrong on day one. Stitch's own prompt guide is explicit: do not mix layout changes and UI components in the same prompt.

| Good refinement | Bad refinement |
|---|---|
| "On the lesson page, tighten the line length on the body copy to about 65 characters." | "Tighten the line length, change the accent colour, and add a callout component." |
| "Pull back on the accent colour saturation. It's tiring for long reading sessions." | "Make it more like Medium." |
| "Add a callout component for real-world code excerpts: a tinted box with a small label." | "Use a better font." |

The pattern: name the screen, name the element, describe the change, give the reason. If you combine changes in one prompt, you can't tell which instruction produced which effect. Stitch's memory across prompts is unreliable, so debugging is impossible.

## Why the style preamble in IMAGES.md exists

Without it, six images from Nano Banana would look like six unrelated illustrations. With it, they look like one set. The preamble keeps the lesson images visually consistent.

If you want to change the visual style of all six (for example, add colour or go vector instead of hand-drawn), edit the preamble in `IMAGES.md` and regenerate. One edit. Six new images. The site stays coherent.

## Defend-It questions

1. Why is the recommended order Ideate → Flash → Thinking, not Thinking → Flash → Ideate? What does each mode do well? Why does running everything in Thinking burn your quota?

2. The Stitch MCP server typically exposes a tool that returns a preview image (PNG) of a screen, alongside the HTML/CSS fetch tool. What would you use the image tool for if you were debugging a design that didn't render correctly after the fetch?

3. You finish Module 3. The site looks good locally. Then you realise you don't like the accent colour. Walk through what you'd do — without redoing the whole Stitch session.

## What's next

[**Module 4 — Shipping it**](../module_04_shipping_it/README.md). Push to GitHub, deploy to Vercel, understand why content changes need a redeploy. About 30 minutes.

## See also

- [Build-diary entry 01](../../content/build-diary/01-designing-with-stitch.md) — reflection on the full Stitch session
- [Build-diary entry 02 §MCP layer](../../content/build-diary/02-scaffolding-with-antigravity.md) — what MCP actually does
- [`/IMAGES.md`](../../IMAGES.md) — the image manifest with the style preamble and all six prompts
- [`/GLOSSARY.md`](../../GLOSSARY.md) — Stitch, MCP, Nano Banana, Tailwind, and the rest
