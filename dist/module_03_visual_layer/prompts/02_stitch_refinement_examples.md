# Stitch refinement — the discipline

You've picked one candidate from the first pass. Now you refine. The single rule everyone gets wrong on day one:

## One change per prompt

Stitch's own prompt guide is explicit: do not mix layout changes and UI components in the same prompt. If you combine changes, you can't tell which instruction produced which effect. Stitch's memory across prompts is unreliable, so debugging is impossible.

Switch to **Flash** mode for these. It's the fastest iteration cycle.

## Good refinements

Each one names the screen, names the element, describes the change, and gives the reason.

> On the lesson page, tighten the line length on the body copy. It should be roughly 65 characters wide for comfortable reading.

> Pull back on the accent colour saturation. It's too vivid for a 20-minute reading session.

> Add a callout component for real-world code excerpts. A tinted box with a small label, distinct from regular code blocks.

> On the section index page, increase the visual weight of the section headings. They're currently blending into the body copy.

> The code blocks should have a subtle left border in the accent colour, to distinguish them visually from prose. Don't change the background.

## Bad refinements

Each one will confuse Stitch and produce mixed results.

> Make the line length tighter, change the accent colour, and add a callout component.

(Three changes in one prompt. You'll have no idea which instruction produced which effect.)

> Make it more like Medium.

(Vague. "Like Medium" could mean any of fifty design decisions. Be specific about which property of Medium you want.)

> Use a better font.

(No screen named. No element named. No specific font requested.)

> Make it look more professional.

(Subjective. Stitch can't reason about "professional". It can reason about "tighter type, more whitespace, fewer accent colours".)

## Save screenshots

After every refinement you keep, take a screenshot. If a later prompt makes things worse, you have a recovery point. Stitch doesn't reliably remember earlier design state across prompts, and there's no version-history equivalent.

## Cap your refinements

Three to five rounds in Flash is the sweet spot. Beyond that you're polishing past the point where anyone can tell the difference, and you'll start eating into Stitch's daily credit budget (the free tier currently allows around 400 design credits per day).

After Flash, do one final pass in **Thinking** mode for typography and spacing details. Then stop.

## Name your project

When the design feels close, give the Stitch project a real name. You'll reference it by name from the MCP in [03_apply_design_via_mcp.md](./03_apply_design_via_mcp.md).

Don't export manually. The agent will fetch via MCP.
