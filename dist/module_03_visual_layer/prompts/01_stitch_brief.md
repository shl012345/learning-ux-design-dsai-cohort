# Stitch brief — first pass

Paste this into Stitch's prompt panel. Use **Ideate** mode. Edit the bracketed section to mention the reference site you picked.

---

> Design a calm, reading-first learning site for adult learners. The audience is mid-career data science and AI practitioners new to the craft. The reading experience is the product — readers will spend 20 minutes on a single page of prose.
>
> Tone reference: similar in feel to **[name the site you picked — for example "the long-form blog Stratechery", "Diátaxis documentation", or "the Tailwind UI docs"]**. Warm but not corporate. Confident but not academic.
>
> Constraints:
> - One accent colour, one heading font, one body font, plenty of whitespace
> - Code blocks visually distinct and easy to read
> - Tables, callout boxes, and inline images all need their own clear treatment
> - Mobile-readable but desktop-optimised
> - No animations beyond standard hover states
> - Dark mode from day one
>
> Anti-constraints — do NOT produce:
> - A carousel, hero video, or scroll-triggered animation
> - A corporate-blue colour palette
> - Generic stock-photo placeholders for the image slots
>
> Generate four screens: home (landing page listing five sections), section index (listing the lessons in one section), lesson page (the long-form reading experience), and about page.
>
> Output a `DESIGN.md` agent-friendly design system covering colour palette, typography scale, spacing scale, component tokens, and Tailwind mapping.

---

## Anatomy of this brief

A well-shaped Stitch brief has five parts:

1. What the site is, in one sentence. Purpose and audience together. (Paragraph 1.)
2. Tone, given as adjectives plus a reference site. (Paragraph 2.)
3. Hard constraints — the things that are non-negotiable. (First bullet list.)
4. Anti-constraints — what NOT to do. (Second bullet list.)
5. Required screens. Name them. Stitch generates each one. (Paragraph 4.)

Stitch's own [prompt guide](https://discuss.ai.google.dev/t/stitch-prompt-guide/83844) is explicit: vague prompts give generic layouts. Structured prompts give specific output.

## What to do with the output

Stitch will produce several candidates with different personalities. Usually one editorial, one technical, one warmer. Pick one. Discard the others. Trying to merge directions across refinement prompts is the most common way to end up with an incoherent design.

Take a screenshot before you refine. You'll want it later if a refinement goes wrong.

Then move on to [02_stitch_refinement_examples.md](./02_stitch_refinement_examples.md) for the iteration discipline.
