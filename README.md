# The DSAI Companion Reader

A self-paced reader for adults in their first data-science / AI cohort. It sits next to your hands-on work, not in place of it. It covers what the cohort doesn't have time for: how adults actually learn the craft, how to use AI tools without being fooled, the shape of the systems your hands-on builds will eventually become, and what to do when the cohort ends.

The site is also a capstone project. It teaches how it was built using Google Stitch, Google Antigravity, and Vercel. Readers learn the subject and the build pipeline together.

> Use this as a template. This repo is structured as a reusable template. Fork it, change `site.config.json`, replace the content under `/content/`, and you have your own self-paced learning site on any topic. See [`FORK.md`](./FORK.md) for the eight-step recipe.

## Status

**v0.1 — topic locked, lesson stubs in place.** The 16 lesson `.md` files exist with valid frontmatter and full prose. The Next.js application code does not yet exist. It gets scaffolded by Antigravity in Modules 1–2 of the build path. The build-diary section is fully drafted.

## Build path

You can take this repo from "planning files" to "live on Vercel" in about three hours. Follow the four modules in [`/dist/`](./dist/):

1. [Module 1 — The planning files](./dist/module_01_planning_files/README.md) (~30 min)
2. [Module 2 — Scaffolding from the brief](./dist/module_02_scaffolding/README.md) (~35 min)
3. [Module 3 — The visual layer](./dist/module_03_visual_layer/README.md) (~60 min)
4. [Module 4 — Shipping it](./dist/module_04_shipping_it/README.md) (~30 min)

Each module has its own README with the learning moments, the prompts to paste, and self-check questions.

## Documents in this repo

- [`WHICH_DOC_WHEN.md`](./WHICH_DOC_WHEN.md) — quick map: which doc to open for which moment. **Start here if you're new.**
- [`BRIEF.md`](./BRIEF.md) — the project brief and product document for this instance
- [`FORK.md`](./FORK.md) — how to repurpose this repo as a template for your own topic
- [`CONTENT-SPEC.md`](./CONTENT-SPEC.md) — the frontmatter contract every `.md` file must satisfy
- [`DEMO.md`](./DEMO.md) — pointer to the cohort modules under `/dist/`
- [`/dist/`](./dist/) — the four cohort modules (Planning → Scaffolding → Visual → Ship)
- [`IMAGES.md`](./IMAGES.md) — image manifest and Nano Banana prompts for the lesson illustrations
- [`GLOSSARY.md`](./GLOSSARY.md) — plain-language definitions for every technical term used in the docs
- [`AGENTS.md`](./AGENTS.md) — rules for AI coding agents working in this repo
- [`SITE-CONFIG.md`](./SITE-CONFIG.md) — field-by-field reference for `site.config.json`
- [`site.config.json`](./site.config.json) — site-level metadata (title, author, navigation order, branding)
- [`DESIGN.md`](./DESIGN.md) — the design language exported from Stitch (placeholder until the Stitch step)

## Content layout

```
/content                          ← the SUBJECT (what the site shows readers)
  /lessons
    /how-to-learn                 ← 4 lessons + _section.md
    /working-with-ai              ← 3 lessons + _section.md
    /shape-of-an-ai-app           ← 4 lessons + _section.md
    /the-hard-parts               ← 3 lessons + _section.md
    /what-next                    ← 2 lessons + _section.md
  /build-diary                    ← 5 entries + _section.md
/public/images                    ← lesson illustrations (generated via IMAGES.md)
/dist                             ← the BUILD MODULES (what you do step by step)
  /module_01_planning_files
  /module_02_scaffolding          ← + prompts/
  /module_03_visual_layer         ← + prompts/
  /module_04_shipping_it
/examples                         ← anchor artifacts (optional)
```

Each content section folder contains a `_section.md` with the section's title, summary, and order. Sections are discovered from the filesystem at build time. There is no central list of sections to maintain. Renaming a section is moving the folder and editing two files.

## Adding a new lesson

1. Copy an existing `.md` file (the build-diary entries are the only examples in this scaffold).
2. Edit the frontmatter (title, order, slug). See [`CONTENT-SPEC.md`](./CONTENT-SPEC.md) for the contract.
3. Write the lesson body.
4. Push to `main`. Vercel auto-deploys.

No code change required. That's the contract.

## Adding a new section

1. Create a new folder under `/content/lessons/` with a kebab-case name.
2. Add a `_section.md` to it with `slug`, `title`, `order`, `summary`.
3. Add the section's slug to `navigation.primary` in `site.config.json`.
4. Add lesson `.md` files to the folder.
5. Push to `main`.

## Tech stack

Next.js 16 + MDX + Tailwind CSS v4, deployed on Vercel Hobby (free tier). Content lives in `/content` as `.md` files with YAML frontmatter. Nothing in the codebase is locked to Vercel features. The same repo would deploy on Netlify or Cloudflare Pages with zero changes. See [`BRIEF.md`](./BRIEF.md) for the rationale.

## Local development

To be filled in once Antigravity scaffolds the Next.js application in Module 2 of the build path. Will be:

```bash
npm install
npm run dev
```

## License

[PolyForm Noncommercial License 1.0.0](./LICENSE). Free for personal, educational, nonprofit, government, and any other noncommercial use. Commercial use requires a separate license — see [`NOTICE.md`](./NOTICE.md) for details and contact.
