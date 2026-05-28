# Apply the Stitch design via MCP

Back in Antigravity's Agent panel (Cmd+L on Mac, Ctrl+L on Windows). Paste this, replacing the project name placeholder with the name you gave your Stitch project.

---

> Use the Stitch MCP server to fetch the latest design from my project named "**[YOUR STITCH PROJECT NAME]**".
>
> 1. Find my Stitch project by name and get its ID.
> 2. Discover the four screens inside that project (home, section index, lesson page, about).
> 3. Fetch the HTML/CSS for each screen.
> 4. Extract the design tokens — colour palette, typography, spacing — and update `tailwind.config.ts` to match. Include both light-mode and dark-mode token values (the Stitch design should provide both per `BRIEF.md` §8).
> 5. Update the local `DESIGN.md` so it stays in sync with Stitch. Use explicit headings (Colors, Typography, Spacing, Components, Layout) so future sessions can parse it.
> 6. Add a dark-mode toggle to the Header component. Use Tailwind's `dark:` classes throughout the site so the toggle picks up the dark-mode tokens automatically.
> 7. Components shouldn't need rewriting — they should already use Tailwind classes that pick up the new tokens. If any component has hardcoded colours, fonts, or spacing, refactor to tokens.
> 8. Restart the dev server and verify the site renders with the new design and the dark-mode toggle works.

---

## What this prompt does

Four MCP calls in sequence: find your project by name, list its screens, fetch each screen's code, and (optionally) fetch a preview image for visual comparison. Translates the output into Tailwind config, including dark-mode tokens. Updates `DESIGN.md` so the next session has the latest design as context. Adds a dark-mode toggle to the Header.

This is the first prompt in the whole build path where `tailwind.config.ts` gets real values. Until now it's been Tailwind's defaults. Module 2 deliberately deferred the design system to this point because there was no real design to wire up yet.

If you want to see the exact tool names the agent will call, type `/mcp list` in the Agent panel before running this prompt. Exact names vary across Stitch MCP versions; the prompt above uses natural-language instructions so the agent picks the right tools for whatever version you have installed.

## Why a single prompt for all four MCP calls

Because each call's output is the next call's input. Finding the project gives you the ID. Listing screens needs that ID. Fetching screen code needs the screen IDs from the previous step. The agent chains them automatically. You don't need four separate prompts.

## What to verify

After the agent finishes:

- `tailwind.config.ts` now has your real palette, fonts, and spacing scale (was Tailwind defaults before)
- `tailwind.config.ts` also has dark-mode token values (was nothing before)
- `DESIGN.md` is no longer a placeholder. It documents the actual design system.
- A dark-mode toggle exists in the Header component
- The dev server, after restart, renders the site in your design language
- The dark-mode toggle works. The page switches palettes when clicked.

## Common stumble

**The agent skips the listing step and tries to guess screen names.** Some agent versions try to shortcut the discovery step and end up requesting screens that don't exist. If this happens, stop the agent and re-prompt with explicit step naming: "First find my project by name, then list the screens inside it, then fetch the code for each screen from that list. Don't skip the listing step." The explicit chain resolves it every time.

## What MCP just did for you

You didn't copy a single CSS value by hand. The bridge fetched the design as structured data. The agent translated it into Tailwind tokens. Your existing components picked up the tokens automatically.

If you iterate the design further in Stitch later, this same prompt — re-run — fetches the updated design and applies it. The round-trip is about 60 seconds end to end.
