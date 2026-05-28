# Project Brief — `learning-ux-design-dsai`

> Folder name is provisional. A rename to `dsai-companion-reader` is a candidate once the site is under git. The folder name doesn't appear in URLs or content.

The DSAI Companion Reader is a self-paced reading site for adults moving into data science and AI. It sits next to a cohort's hands-on builds, not in place of them. It covers how to learn the craft, how to use AI tools well, and the shape of the systems the cohort builds will eventually become.

The site is also a capstone artifact. It teaches how it was built using Google Stitch, Google Antigravity, and Vercel. Students learn the subject and the modern build pipeline together. The site is structured as a reusable template. Students can fork it and produce their own learning site on any topic in a weekend.

---

## 1. Purpose

Three purposes, one site:

1. **Companion reader.** A self-paced sequence of lessons that covers what a DSAI cohort doesn't have time for: how adults actually learn to code, how to work with AI tools well, the shape of the systems being built, and what to do when the cohort ends.
2. **Capstone.** A short build diary documenting how the site was made: Stitch design, Antigravity scaffolding, markdown-driven content, Vercel deployment.
3. **Template.** A reusable scaffold any student can fork and repurpose by editing `site.config.json`, swapping the content folders, and pushing. Documented in [`FORK.md`](./FORK.md).

The pedagogical assumption: career-switchers entering DSAI absorb the craft fastest when meta-skills are taught explicitly. Without explicit teaching, those skills (reading code, verifying AI output, debugging, reading docs) get left for the student to absorb on their own.

---

## 2. Audience

**Primary:** Adult career-switchers in their first DSAI cohort. Singapore SCTP DSAI students and the equivalent elsewhere. Mixed technical ability. Some have a CS degree from 15 years ago and stopped coding when they had kids. Some have never written a `for` loop. What they share is that they are competent, busy adults retraining into DSAI alongside their existing lives. They are not impressed by jargon. They are easily worn out by abstract prose with no analogy. They read on the bus home from class.

**Secondary:** Adults considering a DSAI career-switch but not yet enrolled. They use the site to decide whether the craft suits them. Also: instructors of similar cohorts who might fork the template for their own audience.

**Out of scope:** Working data scientists and ML engineers looking for a reference. They have better resources. Also out of scope: senior CS undergraduates. The tone and pacing assume adult learners with limited code time per week, not full-time students.

---

## 3. Scope

### 3.1 Curriculum — 16 lessons in 5 sections

The sixteen lessons are organised into five sections. Each section answers one question a cohort student naturally asks.

**Section 1 — How to learn this stuff** *(I'm new — how do adults actually do this?)*
1. How adults actually learn to code
2. The difference between knowing and understanding
3. How to read code you didn't write
4. How to read documentation

**Section 2 — Working with AI tools** *(everyone says use AI — how do I do that well?)*
5. Prompting that gets useful output
6. When to use AI and when not to
7. How to verify what AI tells you

**Section 3 — The shape of a modern AI app** *(what does the thing we're building look like?)*
8. What "production" actually means
9. The shape of a modern AI-powered app
10. From notebook to service — why notebooks don't deploy
11. What sits around the model — vector DBs, queues, observability

**Section 4 — The hard parts** *(what will catch me out?)*
12. Cost, latency, and the trade you make
13. Failure modes and how to spot them
14. The "good enough to ship" judgement

**Section 5 — What to do next** *(the cohort ends — now what?)*
15. Teach what you know — turn your learning into a site (pointer to `FORK.md` and the build diary)
16. Where to go from here

Sections are prose-driven. Code excerpts appear where they help (an error message, a small idiom), not as drills.

### 3.2 Build diary — 5 entries

Medium depth. Around 600–950 words each. Covers the Stitch design brief, the two main Antigravity prompts, the deploy steps, and the architectural argument.

1. Designing with Stitch
2. Scaffolding with Antigravity (vanilla Next.js, no template)
3. The markdown content pipeline
4. Deploying to Vercel
5. Why content is markdown and config is JSON — the architectural argument

### 3.3 Explicitly out of scope (v1)

- Interactive design tools (Figma embeds, in-page sketching, image annotation)
- Inline quizzes and progress tracking
- User accounts, authentication, gating
- Comments or community features
- Email subscriptions or notifications
- Multilingual support
- Mobile-app version

These are deliberate cuts to ship in two to three weeks. They can return in v2 without architectural rework.

### 3.4 Template reusability (in scope)

The site must be straightforward to fork and repurpose for any other subject. Three architectural commitments support this:

1. **Site metadata in one file.** All site-level decisions — title, tagline, author, navigation order, branding tokens, feature flags — live in `site.config.json`. A fork edits one file to rebrand.
2. **Sections discovered from the filesystem.** The build script walks `/content/` at build time. Section folders are not enumerated in code. Renaming a section is moving the folder and editing two files (`_section.md` and `site.config.json`).
3. **No content-specific code.** No UX, design, or DS/AI vocabulary appears in the build script, the components, or the routing. Anything subject-specific lives only in `.md` files and `site.config.json`.

The fork workflow: edit `site.config.json` to set title and author. Replace the section folders with your own. Write lessons as `.md` files. Delete or rename the build diary. Push to GitHub. Connect to Vercel. No code change. The full recipe is in [`FORK.md`](./FORK.md), eight numbered steps.

---

## 4. Success criteria

The project is successful when:

1. A new student can land on the site, work through the lessons in their own time, and end able to look at a DS/AI product and reason about what's good design and what isn't.
2. Adding a new lesson is a single act: drop a `.md` file in the right `/content` subfolder, push to GitHub, Vercel auto-deploys. No code change.
3. Editing existing content is a single act: edit the `.md` file, push, redeploy.
4. A reader of the build diary could plausibly recreate this site for a different subject in a weekend.
5. A student who finishes the course can fork the repo, edit `site.config.json`, replace the content folders, and have their own learning site live on Vercel by the end of a weekend. No code changes required.
6. The site loads in under 1 second on a normal broadband connection.
7. The site costs zero dollars per month to run.

---

## 5. Tech stack

A portable stack. Vercel is the host, but nothing in the codebase is locked to Vercel features.

| Layer | Choice | Why this, not that |
|---|---|---|
| Framework | Next.js 16 (App Router), vanilla scaffold via `create-next-app` | Industry standard for markdown-driven sites; built-in static generation; no template lock-in |
| Content format | `.md` files with frontmatter, processed via `@next/mdx` and `gray-matter` | Plain text in git is the simplest possible CMS. Future-proof, diff-friendly, AI-friendly |
| Styling | Tailwind CSS v4 | Stitch exports Tailwind natively; zero translation cost from design to code |
| Code highlighting | `rehype-pretty-code` (Shiki) | Syntax highlighting at build time; no runtime cost |
| Markdown extras | `remark-gfm` | GitHub-flavoured markdown: tables, task lists, autolinks |
| Hosting | Vercel Hobby (free tier) | One-click GitHub deploy; preview URLs per branch; generous limits |
| Repo | Private GitHub repo | Single source of truth for content and code |
| Design tool | Google Stitch | Generates UI; exports `DESIGN.md` and Tailwind components |
| IDE | Google Antigravity | AI-assisted scaffolding and content authoring |

### What we deliberately do not use

- Vercel KV / Postgres / Blob — would lock us in
- Vercel Analytics paid features
- A headless CMS (Sanity, Contentful) — markdown in git is enough
- Any commercial Vercel template — vanilla scaffold only
- React Server Components for content (overkill for static)
- A database — none needed

This same repo would deploy on Netlify, Cloudflare Pages, or GitHub Pages with zero changes. Vercel was chosen because the free tier is generous and the GitHub integration is one click.

---

## 6. Information architecture

```
/                                              ← landing page
/lessons                                       ← all lessons, grouped by section
/lessons/how-to-learn/01-how-adults-learn-to-code
/lessons/how-to-learn/02-knowing-vs-understanding
/lessons/how-to-learn/03-reading-code-you-didnt-write
/lessons/how-to-learn/04-reading-docs
/lessons/working-with-ai/05-prompting-that-works
/lessons/working-with-ai/06-when-to-use-ai
/lessons/working-with-ai/07-verifying-what-ai-says
/lessons/shape-of-an-ai-app/08-what-production-means
/lessons/shape-of-an-ai-app/09-shape-of-a-modern-ai-app
/lessons/shape-of-an-ai-app/10-notebook-to-service
/lessons/shape-of-an-ai-app/11-system-around-the-model
/lessons/the-hard-parts/12-cost-and-latency
/lessons/the-hard-parts/13-failure-modes
/lessons/the-hard-parts/14-good-enough-to-ship
/lessons/what-next/15-teach-what-you-know
/lessons/what-next/16-where-to-go-from-here
/build/01-designing-with-stitch
/build/02-scaffolding-with-antigravity
/build/03-the-markdown-pipeline
/build/04-deploying-to-vercel
/build/05-content-config-code-separation
/about
```

The build path itself is not rendered as part of the deployed site. It lives in the repo for builders, not readers:

- `/dist/module_01_planning_files/` through `/dist/module_04_shipping_it/` — cohort modules

URLs follow the file structure exactly. No slug-rewriting. Predictable for the reader, simple for the build.

---

## 7. Frontmatter spec

Every lesson `.md` file has YAML frontmatter at the top. See [`CONTENT-SPEC.md`](./CONTENT-SPEC.md) for the field-by-field contract.

Build diary entries use the same shape but with `section: "build-diary"`.

This shape is the contract. Adding fields later is fine. Renaming or removing fields requires updating the build script.

---

## 8. Branding

Fresh visual direction from Stitch. The design constraints given to Stitch (expanded in `DESIGN.md` after the Stitch session):

- Tone: warm, calm, confident, not corporate
- Reading-first: a place to read prose comfortably for 20 minutes
- Code-block and image clarity is critical
- Mobile-readable but desktop-optimised (most adult learners use laptops)
- One accent colour, one heading font, one body font, plenty of whitespace
- No animations beyond standard hover states
- Dark mode supported from day one

---

## 9. Phasing

Two-to-three-week plan.

**Days 1–2.** Design in Stitch. Export `DESIGN.md` and Tailwind tokens. Scaffold vanilla Next.js + MDX in Antigravity. First deploy to Vercel.

**Day 3.** Wire up `lib/content.ts` (the markdown reader), frontmatter handling, navigation, the lesson template page. Write Lesson 1 to validate the pipeline end-to-end.

**Days 4–10.** Write the curriculum lessons, around two per day. Pipeline is stable; this is now a writing exercise, not an engineering one.

**Days 11–12.** Write or revise the build-diary entries while the build memory is still fresh.

**Day 13.** Polish, test with a real student, ship.

Real-world calendar: about three weeks.

---

## 10. Decisions captured

| Decision | Choice | Date |
|---|---|---|
| Audience | DSAI career-switchers in their first cohort (Singapore SCTP and equivalents). Narrowed from "mid-career DS/AI practitioners" | 2026-05-27 |
| Topic | Companion reader: meta-learning + AI craft + the shape of an AI app + the hard parts + what's next | 2026-05-27 |
| Curriculum shape | 16 lessons in 5 sections (locked) | 2026-05-27 |
| Anchor artifact | None for v1. Fully prose-driven. OpsDesk repo is a candidate for v2 | 2026-05-27 |
| Site title | "The DSAI Companion Reader" | 2026-05-27 |
| Folder name | `learning-ux-design-dsai` (provisional, rename to `dsai-companion-reader` deferred until git is initialised) | 2026-05-27 |
| Branding | Fresh visual direction from Stitch | 2026-05-27 |
| Build-diary depth | Medium. Key prompts and screenshots. Around 600 words per entry | 2026-05-27 |
| Repo visibility | Private (initially) | 2026-05-27 |
| Deploy approach | Vanilla Next.js scaffold; Vercel as host only, no Vercel-locked features | 2026-05-27 |
| Content storage | All content as `.md` files in the GitHub repo | 2026-05-27 |
| Interactivity | Static text and code/images only for v1 | 2026-05-27 |
| Versioning | Living document (edit a `.md`, push, redeploy) | 2026-05-27 |
| Reusability | Template-first design: `site.config.json` + `_section.md` + `FORK.md` so students can fork for their own subject | 2026-05-27 |

---

## 11. Open questions for later

These don't block kick-off. Park them here and decide when they become relevant.

- What's the canonical domain? (`ux-dsai.swarup.com`? A subdomain on an existing property? `learning-ux-design-dsai.vercel.app` for now?)
- Do we want analytics? If yes, Plausible self-hosted or a free tier of Vercel Analytics?
- Should there be a printable PDF version of each lesson?
- When and how do we open this to the public?
- Is there a feedback mechanism (a form, an email link) on each lesson?
- Will the site need to embed Figma screens, video walkthroughs, or annotated screenshots? Affects component scope in v1 vs v2.
- Is there a single real-world artifact (a public DS/AI product, a public design system) that lessons can anchor to, the way the OOP repo uses Karpathy's tiny GPT?

---

## 12. Definition of done — v1

The project ships when all of these are true:

- [ ] Repo exists on GitHub, private
- [ ] Vercel deployment is live on the Hobby tier
- [ ] All 5 curriculum sections exist with `_section.md` and at least placeholder lesson files
- [ ] All 16 curriculum lesson `.md` files exist with valid frontmatter and complete prose
- [ ] All 5 build-diary `.md` files exist with valid frontmatter and complete content
- [ ] The landing page lists all 5 sections in `navigation.primary` order
- [ ] Each section page lists its lessons in `order`
- [ ] Each lesson page renders prose, syntax-highlighted code (where used), and images cleanly
- [ ] Adding a new `.md` file requires no code change
- [ ] One real cohort student (current SCTP intake) has worked through Lesson 1 and reported back
- [ ] The build diary can be read end-to-end and another instructor could replicate the build
- [ ] [`FORK.md`](./FORK.md) is complete and a test fork can be brought up on a fresh topic in one weekend without code changes
- [ ] No topic-specific vocabulary (DSAI, AI, cohort, etc.) appears in the build script, components, or routing. Only in `.md` files and `site.config.json`.
