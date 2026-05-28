---
title: "Why content is markdown and config is JSON"
section: "build-diary"
order: 5
duration: "14 min"
difficulty: "beginner"
prerequisites: ["04-deploying-to-vercel"]
analogy: "Recipes on cards, menu on the wall, equipment in the drawers"
tags: ["build-diary", "architecture", "markdown", "json", "nextjs"]
summary: "Why this site keeps content, configuration, and code in three different file types — and what Next.js actually does with each at build time."
---

You've now seen all the pieces of the build. Stitch designed it. Antigravity scaffolded it. Markdown files became pages. Vercel deployed it. One question remains, and it's the one most students ask first when they open the repo: *why is the site shaped this way at all?*

Open the project and you'll find three kinds of file doing three different jobs. The lessons you're reading live in `/content/` as plain markdown. The site-wide settings — title, navigation order, branding — live in `site.config.json`. The components that render everything live in `/app/` as TypeScript. Three formats. Three folders. Three different update cadences.

You could fold all three into TypeScript. Lots of sites do. So why didn't this one?

## The kitchen separation

A working kitchen keeps three things in three places. The recipes are on cards in a box. The menu and prices are on a board on the wall. The equipment is in the drawers. Each gets edited by different people, at different rhythms, with different tools — the chef writes recipes by hand, the host updates the menu nightly, the cook only buys new equipment once a year.

If you put all three on the same surface, every change competes with every other change. The board with tomorrow's prices is also the recipe for the soup. Update the prices and you risk smudging the recipe. The kitchen works because the separation is *deliberate*.

This site works the same way:

| Layer | What it holds | Where it lives | Update cadence |
|---|---|---|---|
| **Content** | The lessons themselves | `/content/lessons/*.md`, `/content/build-diary/*.md` | Weekly — you add a lesson, you fix a typo |
| **Config** | Site-wide settings | `site.config.json` | Monthly — you tweak the accent colour, you add a section |
| **Code** | Components and rendering logic | `/app/*.tsx`, `/lib/content.ts`, `/components/*.tsx` | Rarely — you build a new component, you upgrade a dependency |

Different cadences, different tools, different files. The architecture honours how the work actually happens.

## Why markdown for content

The lessons are 700-word essays with the occasional code block, table, and image. That's roughly the shape of a blog post. The real question is: what format do you write blog posts in?

Four reasonable options, and their costs:

| Option | What it buys | What it costs |
|---|---|---|
| **Markdown in git** | Plain text, diff-friendly, AI-readable, no lock-in, free | You edit in a text editor, not a WYSIWYG |
| **Headless CMS** (Sanity, Contentful) | Pretty editor for non-technical authors | Vendor lock-in, pricing tiers, another system to learn |
| **WordPress** | Massive ecosystem, plug-ins for everything | Hosted complexity, security surface, a database to back up |
| **Hardcoded React** | Maximum control over rendering | Every edit is a code change; non-developers locked out |

For a single-author learning site, markdown wins almost every dimension. The cost — "you edit in a text editor" — turns into a feature the day you ask an AI to help draft a lesson, or `grep` for everywhere you mentioned vector stores, or commit a fix from your phone via the GitHub web editor.

> 💡 **The under-rated property.** Markdown is the only one of those options that another instructor — the one who forks your template a year from now — can read and edit without learning anything new. Markdown is the lowest-common-denominator format that adults already know.

## Why JSON for config

Same question, asked of site-wide settings. The title. The navigation order. The accent colour. The author bio. Where do these live?

Three reasonable options:

- **In code** (e.g. a `siteConfig.ts` file). Works fine. The trap: any non-developer who wants to rebrand a fork has to learn TypeScript first.
- **In YAML or TOML.** Both work; both add a parser you wouldn't otherwise need. Neither is more universal than JSON.
- **In JSON.** The format an adult who has touched the web has probably already met. Every editor handles it. Every AI handles it. Git diffs it cleanly. And — uniquely among the three — JSON has [JSON Schema](https://json-schema.org/), which gives editors free autocomplete and validation.

The schema file (`site.config.schema.json`) is the bonus. Add `"$schema": "./site.config.schema.json"` to the top of `site.config.json` and any modern editor — VS Code, Antigravity, Cursor — turns into a guided form: red squiggles when you misspell a field, autocomplete when you start a new one, hover tooltips that explain what each value means.

## What Next.js does with both at build time

The honest answer is *less than you'd think*. Both files are read once, at build time, and the results are baked into static HTML. Here's the shape of how the JSON gets used in the root layout component (which Antigravity scaffolds in DEMO.md Step 5):

```typescript
// app/layout.tsx — runs at build time, not at request time
import siteConfig from '../site.config.json'

export const metadata = {
  title: siteConfig.site.title,
  description: siteConfig.site.description,
}

export default function RootLayout({ children }) {
  return (
    <html lang={siteConfig.site.language}>
      <body>
        <Header logoText={siteConfig.branding.logoText} />
        <Nav sections={siteConfig.navigation.primary} />
        {children}
        <Footer copyright={siteConfig.footer.copyright} />
      </body>
    </html>
  )
}
```

For markdown, the equivalent happens in `lib/content.ts`. It walks `/content/`, reads each `.md` file, parses the frontmatter, compiles the body to React, and hands the result to the page components. Once at build time. Never at request time.

> 💡 **What "build time" actually means.** Most websites you've used run code on the server every time you load a page — they fetch the latest data from a database, run some logic, build the HTML, send it back. This site doesn't. The HTML for every page is generated *once*, at the moment `next build` runs on Vercel's servers after you push to git. After that, the server is just handing out finished HTML files like a librarian handing out books. That's why this site is fast on a free tier with no database, and also why a content change requires a redeploy to show up live — there's nothing watching the file for changes; the file got read once, during the last build, and the HTML it produced is what visitors get until the next build.

By the time `next build` finishes, both the JSON and the markdown have been *flattened* into static HTML files. Vercel serves the HTML; the JSON and markdown files are no longer needed at runtime. They live on in git as the source of truth; the HTML in production is the derived artifact.

> The separation between source-of-truth and rendered-output is the most under-noticed property of this architecture. You can delete the entire Vercel deploy and rebuild it from `/content/` and `site.config.json` alone, with no manual data recovery. The HTML is replaceable; the data isn't.

## What this enables

Three properties that compound, in roughly this order.

**The fork story.** Anyone who can edit a markdown file or a JSON file can fork the template and produce their own learning site. That's a much wider audience than "anyone who can edit React". Eight steps in [`FORK.md`](https://github.com/SwarupSG/learning-ux-design-dsai/blob/main/FORK.md). No code change required, by design.

**AI-friendliness.** Every file in this repo is text an LLM can read in context. Drop the repo into an Antigravity workspace; the agent can answer "where do I add a new lesson?" without you having to explain. The same site stored in a CMS or a database wouldn't have that property — the agent would need API credentials and a custom integration to see the content.

**Longevity.** The data — markdown + JSON — is in a format that will be readable in 2046. The view — Next.js, React, Tailwind — might not all exist by then. But you can rebuild the view in whatever the framework-of-the-day is, in a weekend, from the same data. Building this way is a hedge against the framework churn that defines modern web development.

## What's next

That's the diary. Five entries on how and why this site was built. From here it's a maintained thing — add a lesson, push, redeploy.

If you want to fork the template for your own subject, the [`FORK.md`](https://github.com/SwarupSG/learning-ux-design-dsai/blob/main/FORK.md) recipe is the next eight steps. If you're a DSAI student, the [first lesson of the companion reader](/lessons/how-to-learn/01-how-adults-learn-to-code) is where to start.

Thanks for reading.
