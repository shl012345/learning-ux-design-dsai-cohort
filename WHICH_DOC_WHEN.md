# Which doc, when?

Quick map to help you navigate this repo. There are several files. Each one is the right doc for a different moment.

## At a glance

| Document | What it does |
|---|---|
| `README.md` | Top-level pitch, status, build path, content layout |
| `WHICH_DOC_WHEN.md` | This file. Routes you to the right doc for the moment you're in. |
| `BRIEF.md` | Project brief — purpose, audience, scope, tech stack, decisions log |
| `FORK.md` | Eight-step recipe for repurposing this template for your own topic |
| `CONTENT-SPEC.md` | The frontmatter contract every `.md` file in `/content/` must satisfy |
| `SITE-CONFIG.md` | Field-by-field reference for `site.config.json` |
| `IMAGES.md` | Image manifest + Nano Banana prompts for the lesson illustrations |
| `GLOSSARY.md` | Plain-language definitions for every technical term used in the docs |
| `AGENTS.md` | Rules for AI coding agents working in this repo |
| `DESIGN.md` | Design system (deliberate before-state until Module 3 swaps it via Stitch) |
| `DEMO.md` | Pointer to the build path |
| `dist/module_NN_*/README.md` | One per module — what to do, prompts to paste, Defend-It questions |
| `content/lessons/**/*.md` | The 16 lessons the site renders |
| `content/build-diary/*.md` | Five entries explaining how the site was made |
| `site.config.json` | Site-wide metadata (title, navigation order, branding, feature flags) |

## The pair that matters most

During each module, two surfaces work in tandem:

- **The module README** at `dist/module_NN_*/README.md` — what to do, prompts to paste, what to check
- **The crash course** — the narrative explanation of *why* each step works, with deeper coverage per module

The crash course is **delivered separately by your instructor** (it's not in this repo). You should have it open in a second window or printed alongside while you work through each module. A student who only opens the module README is following a recipe. A student who reads both is learning the craft.

If you don't have the crash course yet, ask your instructor.

## What each doc is for, organised by reading-moment

**Before you start anything:**
- `README.md` — what this repo is, who it's for, what you'll build
- `WHICH_DOC_WHEN.md` (this file) — the map
- `BRIEF.md` §1–§3 — the project context

**While you're building:**
- `dist/module_NN_*/README.md` — the step-by-step for the current module
- The crash course (separately delivered) — the narrative companion
- `GLOSSARY.md` — when you hit a term you don't recognise

**When you want to fork the template for a new subject:**
- `FORK.md` — the eight-step recipe
- `SITE-CONFIG.md` — what every field in `site.config.json` does
- `CONTENT-SPEC.md` — the frontmatter contract for your new content
- `IMAGES.md` — how to manage images for your fork

**Reference (read on demand):**
- `AGENTS.md` — what the IDE agent assumes about this repo
- `DESIGN.md` — the design tokens currently applied
- `content/build-diary/*.md` — deep-dive essays on each architectural choice

## "I don't know which doc to open right now"

A short decision tree:

- **Setting up your dev environment for the first time** → the crash course § Set up your dev environment (most thorough), or `dist/module_01_planning_files/README.md` § setup (shorter pointer)
- **Running a module** → that module's README in `/dist/`
- **The agent did something unexpected during a prompt** → the matching build-diary entry (`content/build-diary/02-scaffolding-with-antigravity.md` for Module 2, etc.)
- **Hit a Stitch / MCP / Vercel error** → the crash course § Troubleshooting (organised by surface area)
- **What does this term mean?** → `GLOSSARY.md`
- **How do I change the site title / accent colour / navigation?** → `SITE-CONFIG.md`
- **Forking for your own subject** → `FORK.md` first, then `SITE-CONFIG.md` and `CONTENT-SPEC.md`

## When in doubt

Ask the agent in Antigravity. `AGENTS.md` makes it aware of all the docs in this repo. A prompt like "given the rules in AGENTS.md, what doc should I read for X?" will point you at the right file.
