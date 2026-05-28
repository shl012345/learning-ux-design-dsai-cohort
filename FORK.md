# Forking this template for your own topic

This repo is two things at once. It's the DSAI Companion Reader, and it's a reusable template for any self-paced learning site driven by markdown files. If you want to publish your own learning site on a different topic, fork this repo. You can be live within a weekend.

Here's the recipe.

## 1. Fork the repo

On GitHub, click **Fork**. Or with the GitHub CLI:

```bash
gh repo fork SwarupSG/learning-ux-design-dsai --clone=true
```

Rename your fork to fit your topic. `cooking-fundamentals`, `intro-to-statistics`, `learning-spanish` — anything. Keep it kebab-case for clean URLs.

You can keep the fork private or make it public. Either works.

## 2. Rename the site

Open `site.config.json`. Change these fields. For a complete field-by-field reference including what each field does at runtime and when to edit it, see [`SITE-CONFIG.md`](./SITE-CONFIG.md).

| Field | What to put |
|---|---|
| `site.title` | Your site's name (for example "Cooking Fundamentals") |
| `site.tagline` | One-line pitch shown under the title |
| `site.description` | Slightly longer description used for SEO and meta tags |
| `site.url` | Your eventual domain. The Vercel default works for now |
| `site.locale` | Your locale (`en-GB`, `es-MX`, etc.) |
| `author.name` | Your name |
| `author.email` | Your contact email |
| `author.bio` | One-line bio shown on the about page |
| `branding.logoText` | Short version of your site name shown in the navigation |
| `footer.copyright` | Your copyright line |

Don't touch `navigation` yet. That comes in step 3.

## 3. Replace the sections

Each subfolder under `/content/lessons/` is a section. To restructure for your topic:

1. **Decide your sections.** Three to five sections is the right range. Fewer feels thin. More feels like a tour bus that never stops.
2. **Rename or replace the folders.** Use kebab-case slugs: `getting-started`, `core-concepts`, `advanced-techniques`.
3. **Edit each section's `_section.md`.** New `slug`, new `title`, new `order`, new `summary`, and a short description in the body.
4. **Update `navigation.primary` in `site.config.json`.** List your section slugs in the order you want them displayed.

Example. A cooking site might have:

```
/content/lessons/
  /knife-skills/_section.md
  /heat-and-fire/_section.md
  /flavour-balance/_section.md
  /putting-it-together/_section.md
```

With `navigation.primary` set to `["knife-skills", "heat-and-fire", "flavour-balance", "putting-it-together"]`.

## 4. Replace the lessons

Each `.md` file in a section folder (other than `_section.md`) is a lesson.

1. Either edit the existing files in place, or delete them and create new ones.
2. Every lesson `.md` must have valid frontmatter. See [`CONTENT-SPEC.md`](./CONTENT-SPEC.md) for the contract.
3. Use a 2-digit numeric prefix for natural sorting: `01-knife-grip.md`, `02-the-claw.md`.
4. The lesson `order` field in the frontmatter should match the numeric prefix.

The frontmatter shape is non-negotiable. The build script reads it and breaks if it's wrong. The body is whatever markdown you want.

## 5. Decide what to do with the build diary

The `/content/build-diary/` folder is meta-content about how this site was built. Three options for your fork:

- **Delete it.** If a build diary doesn't suit your topic, delete the folder and remove `"build-diary"` from `navigation.secondary` in `site.config.json`.
- **Replace it.** Write your own build diary about adapting the template. Useful as a teaching artifact for your readers.
- **Rename it.** Turn it into "appendix", "resources", "further reading", or whatever suits. Rename the folder, update its `_section.md`, update `site.config.json`. The system doesn't care what it's called.

## 6. Redesign (optional)

The site uses tokens defined in `DESIGN.md`. To re-skin:

1. Re-run Google Stitch with your own brief.
2. Replace `DESIGN.md` with the new export.
3. Update `tailwind.config.ts` to match.
4. The Tailwind classes throughout the components will now render in your new colours and typography.

If you don't want to redesign, edit `branding.accentColor`, `branding.fontHeading`, and `branding.fontBody` in `site.config.json`. You'll get a quick rebrand without touching code.

## 7. Write your own brief (recommended)

`BRIEF.md` is the project brief for this site specifically. It's worth keeping a brief for your own project too. Partly as a thinking tool. Partly as documentation for anyone you collaborate with.

You have two options:

- Edit `BRIEF.md` in place to describe your project, replacing every reference to DSAI with your topic.
- Rename it to `BRIEF.example.md` and write your own from scratch using the structure as a template.

Either is fine. The structure (purpose, audience, scope, success criteria, tech stack) generalises to almost any learning project.

## 8. Deploy

Same as the original:

1. Push your fork to GitHub.
2. Connect the repo to Vercel (free Hobby tier).
3. Vercel auto-deploys on every push to `main`.

You'll have a live URL within minutes of the first deploy. Add a custom domain whenever you're ready. Also free on the Hobby tier.

## What you can change easily

- All content, structure, branding, and copy
- Number of sections and number of lessons per section
- Whether to include a build diary, an about page, dark mode, or search
- Author identity and contact details
- Domain and deployment target

## What you cannot change easily

The template is opinionated. If any of these fight your needs, fork from a different starting point.

| Constraint | Why |
|---|---|
| Markdown-driven content with frontmatter | There's no admin UI. You commit markdown via git. |
| Static generation at build time | No live database. No comments out of the box. |
| Single-author voice | Multi-author support would need bespoke work. |
| English-first | Internationalisation is not built in. |
| Long-form reading | The design optimises for 20-minute reads, not skimmable cheat sheets. |

If those constraints suit you, this template will save you a week or two of work.

## Where to ask for help

Open an issue on the original repo if you spot a bug in the template itself. For your fork, you're on your own. [`CONTENT-SPEC.md`](./CONTENT-SPEC.md) and [`BRIEF.md`](./BRIEF.md) cover most of what you'll need to know.
