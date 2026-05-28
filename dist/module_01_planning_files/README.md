# Module 1 — The planning files

**Time:** ~30 min (plus 15–30 min for one-time dev-environment setup if you haven't done it yet) · **No agent prompts in this module.** You'll be reading.

## Set up your dev environment (one-time, skip if already done)

You'll need Node.js 22 (LTS), Git, and the GitHub CLI on a Unix-like shell before Module 2. The commands are the same on Mac and on Windows (WSL2 Ubuntu).

> Windows users: this assumes WSL2 is already installed and you have an Ubuntu prompt open. If not, run `wsl --install` in PowerShell as Administrator, restart, then continue inside Ubuntu (not PowerShell).

Install Node 22 via nvm — same on Mac and WSL2:

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.4/install.sh | bash
# close and reopen your terminal, then:
nvm install 22
nvm use 22
nvm alias default 22
```

Confirm `git` and `gh` are present (you likely already have both):

```bash
git --version
gh --version
```

If either is missing — Mac: `brew install git gh`. WSL2 Ubuntu: `sudo apt install -y git gh`.

Verify before continuing:

```bash
node --version    # v22.x
git --version
gh --version
```


**Windows-only reminder:** keep your project at `~/` inside Ubuntu, never on `/mnt/c/`. To open the project in Antigravity, click the bottom-left remote indicator → **Connect to WSL** → File → Open Folder.

## What you'll learn

By the end of this module you'll understand the file layout of this repo.

There are three kinds of file:

- **Content** — markdown lessons under `/content/`
- **Config** — JSON in `site.config.json`
- **Code** — TypeScript under `/app/`, `/lib/`, `/components/` (gets added in Module 2)

Each kind lives in its own folder. You'll edit content most often. You'll edit code least often.

This module covers four things you need to know before you start prompting any agent:

1. Why content and config are kept in separate file types
2. What "frontmatter" is (the block at the top of every `.md` file)
3. The naming conventions inside a section folder (`_section.md`, numeric prefixes, `prerequisites`)
4. Why `site.config.json` is JSON and not TypeScript

All four are explained in the build diary. This module tells you which entries to read and in what order.

## Class flow

### Step 1 — Read these, in order (15 min)

1. [`/BRIEF.md`](../../BRIEF.md) §1–§3. This is the project's purpose, audience, and scope.
2. [`/content/build-diary/05-content-config-code-separation.md`](../../content/build-diary/05-content-config-code-separation.md). The architectural argument. The most important read in this module.
3. [`/content/build-diary/03-the-markdown-pipeline.md`](../../content/build-diary/03-the-markdown-pipeline.md). Frontmatter, section folder conventions, and how a `.md` file becomes a page.

Read them in this order. BRIEF gives you context. Entry 05 gives you the architecture. Entry 03 gives you the file-level details.

### Step 2 — Open the source files (10 min)

After reading, open each of these files. Confirm you can describe what each does in one sentence:

| File | What it does |
|---|---|
| [`/site.config.json`](../../site.config.json) | Site-wide metadata: title, navigation order, branding |
| [`/site.config.schema.json`](../../site.config.schema.json) | Validates `site.config.json` and gives autocomplete in your editor |
| [`/content/lessons/how-to-learn/_section.md`](../../content/lessons/how-to-learn/_section.md) | One section's metadata |
| [`/content/lessons/how-to-learn/01-how-adults-learn-to-code.md`](../../content/lessons/how-to-learn/01-how-adults-learn-to-code.md) | One lesson's frontmatter and body |
| [`/CONTENT-SPEC.md`](../../CONTENT-SPEC.md) | The contract for every required frontmatter field |
| [`/AGENTS.md`](../../AGENTS.md) | The rules the IDE agent reads when generating code |

### Step 3 — Trace one lesson in your head (5 min)

Pick `01-how-adults-learn-to-code.md`. Without running anything, work out what the build pipeline will do with it:

1. The build script walks `/content/` and finds this file.
2. `gray-matter` splits the frontmatter (the block between `---`) from the body.
3. The frontmatter says `section: "how-to-learn"`, so the build knows which section folder it belongs to.
4. The frontmatter says `order: 1`, so it's the first lesson in that section.
5. The body gets compiled to React via `@next/mdx`.
6. The page renders at `/lessons/how-to-learn/01-how-adults-learn-to-code`.

You didn't write any code. The conventions did the work.

## Defend-It questions

Answer these out loud, in your own words, before you start Module 2.

1. Open `/content/lessons/`. You see five folders, each containing a `_section.md` and several numbered lessons. **Why does `_section.md` start with an underscore?** What would change if you renamed it to `section.md`?

2. You want to add a sixth section called `advanced-topics`. **What files do you change, and what do you add?** (More than one thing changes. Only one of them is "create a folder".)

3. `site.config.json` is read at build time by `app/layout.tsx`. **Why is the config a JSON file instead of a TypeScript file?** Give two reasons: one practical, one related to the fork story.

If you can't answer one of these, re-read entry 05 (for the architecture question) or entry 03 (for the conventions questions). Don't start Module 2 until you can.

## What's next

[**Module 2 — Scaffolding from the brief**](../module_02_scaffolding/README.md). You'll prompt Antigravity to turn the planning files into a working Next.js app. Two prompts, four principles, about 35 minutes.
