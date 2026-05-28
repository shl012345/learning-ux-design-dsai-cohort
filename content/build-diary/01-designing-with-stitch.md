---
title: "Designing with Stitch"
section: "build-diary"
order: 1
duration: "12 min"
difficulty: "beginner"
prerequisites: []
analogy: "Sketching before scaffolding"
tags: ["build-diary", "stitch", "design"]
summary: "How the design language for this site was generated in Google Stitch — the brief, the iterations, and the DESIGN.md that fell out of it."
---

> 📝 **Note:** This entry describes the planned design workflow. It will be revised once the actual Stitch session has been completed, with the real `DESIGN.md` export and screenshots of the generated screens.

The first decision in any web project is the same: *what should it look like?* You can put it off, but the longer you delay, the more code you'll write that you'll have to redesign later. Better to design first and then code against the design.

This diary entry covers how the visual language for this site was generated in Google Stitch — Google's AI-native UI design tool — and how the resulting `DESIGN.md` becomes the contract that the rest of the build follows.

## Why design first, code second

Most beginner web projects do this in the wrong order. The author writes code, gets something working, then tries to make it look nice afterwards. The result is usually code that fights its own design — components shaped for one layout being squeezed into another, hand-tuned spacing that doesn't follow any system, colour choices made one component at a time.

Designing first reverses this. You decide the colour palette, the typography, the spacing scale, the layout grid *before* you write components. Every component built afterwards inherits the system. The result feels coherent because it *is* coherent.

For a learning site, where the reading experience is the product, this matters more than usual. Reading 1,500 words on a page that's competing for your attention is hard. The design needs to disappear so the prose can do its work. That's a deliberate aesthetic choice — and Stitch is good at honouring deliberate aesthetic choices.

## The brief I gave Stitch

From `BRIEF.md` §8 — the constraints I set:

- **Tone:** warm, calm, confident, not corporate
- **Reading-first:** comfortable for reading prose for 20 minutes at a stretch
- **Code-block clarity** is critical — this is a programming course
- **Mobile-readable** but desktop-optimised (most adult learners use laptops)
- **One accent colour, one heading font, one body font, plenty of whitespace**
- **No animations** beyond standard hover states
- **Dark mode** supported from day one

I pasted these straight into Stitch's brief panel along with a sentence describing what the site does: "A self-paced learning site teaching UX design fundamentals to mid-career data science and AI practitioners new to design."

The shorter and more constraint-focused the brief, the better Stitch tends to do. Telling it "warm, calm, confident, not corporate" is more useful than telling it "use blue tones". Stitch can interpret aesthetic guidance; it gets less interesting when given specific colour codes.

## Iterating in Stitch

Stitch produced three candidate design languages on the first run. They differed mostly in personality — one leaned editorial (think long-form magazine), one leaned technical (think developer documentation), one leaned warm and almost handmade. Each came with a sample landing page, a sample lesson page, and a partial component set.

I picked the warm-and-handmade direction. The brief had asked for warm and not-corporate; this option matched best. The other two would have worked, but the warmer aesthetic felt right for adult learners coming to a difficult subject. Friendly typography lowers the activation energy.

A few rounds of refinement followed. Things I asked Stitch to change:

- Tightening the line-length on the lesson page (text was too wide for comfortable reading)
- Adding more visual weight to the section headings (they blended into the body too much)
- Pulling back on the accent colour — it was too saturated for long sessions
- Adding a "real-world callout" component for the inline excerpt sidebars

Each refinement took about thirty seconds in Stitch. The advantage of an AI design tool is that iteration is cheap; you can ask for ten variations and pick the best, rather than committing to a single direction early.

## The four pages designed

The minimum set:

1. **Landing page (`/`)** — what visitors see first. Lists the five sections, gives a one-paragraph pitch, includes the title and tagline.
2. **Section index page (e.g. `/lessons/foundations`)** — lists the lessons in a section, shows their titles, durations, and difficulty.
3. **Lesson page (e.g. `/lessons/<section>/01-<slug>`)** — the actual reading experience. Long-form prose, code blocks, real-world callouts in a sidebar.
4. **About page (`/about`)** — short, includes "How was this site built?" linking to the build diary.

Other pages (the build diary entries, the about page) inherit the lesson page's layout. Designing four pages, not twenty, kept the scope manageable.

## What `DESIGN.md` contains

Stitch exports its design language as a markdown file — `DESIGN.md` — that downstream tools can read. The file lives at the root of this repo. It contains:

1. **Colour palette** — the accent, the neutral scale, semantic colours for success/warning/error
2. **Typography** — the heading scale (h1 through h4), the body scale, the code-block face
3. **Spacing scale** — the multiples of a base unit (4px, 8px, 16px, etc.) that all margins and padding use
4. **Component tokens** — buttons, links, callouts, code blocks, navigation
5. **Layout rules** — grid, max-width, breakpoints
6. **Tailwind mapping** — how the design tokens translate to a `tailwind.config.ts` file (Tailwind is a utility-first CSS framework — see [GLOSSARY](../../GLOSSARY.md#tailwind-css))

This file is the *contract* the rest of the build follows. Antigravity reads it when scaffolding the Next.js application. Tailwind is configured from it. Every component on the site uses tokens defined here. A change to the design system means editing `DESIGN.md` and rebuilding — not hand-tuning every component.

## What this enables

With `DESIGN.md` in hand, several things become trivial later in the build:

- **Visual consistency** — every page automatically uses the same spacing, type, and colour tokens
- **Dark mode** — the colour palette includes dark-mode equivalents, and Tailwind's `dark:` classes pick them up automatically
- **Future redesigns** — to re-skin the site (or for a fork to use a different design), just replace `DESIGN.md` with a new export from Stitch and rebuild
- **AI-assisted iteration** — because the tokens are in markdown, future Antigravity sessions can read and respect the existing design without me re-explaining it

That last point is genuinely valuable. The friction in long projects is usually "explaining context to the next session". `DESIGN.md` is durable, machine-readable context.

## What's next

Build-diary entry 2 picks up where this leaves off — taking `DESIGN.md` into Antigravity and using it to scaffold the Next.js application. That's where the design becomes code.
