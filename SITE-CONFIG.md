# SITE-CONFIG.md

The complete reference for `site.config.json` — the file that holds every site-wide setting.

This file is what you edit first when you fork the template. It's what Next.js reads at build time to set the site title, the navigation order, the branding tokens, and the feature flags. Components reference fields from it by path (e.g. `siteConfig.site.title`, `siteConfig.navigation.primary`).

If you're forking for your own topic, also see [`FORK.md`](./FORK.md) for the eight-step recipe. If you want to understand *why* config is in a JSON file at all, see [build-diary entry 05](./content/build-diary/05-content-config-code-separation.md). This file is the field-by-field reference.

---

## The whole file at a glance

Seven top-level sections plus a `$schema` reference:

| Section | What it holds | Edit when |
|---|---|---|
| `$schema` | Path to the JSON Schema | Don't edit. The schema gives your editor autocomplete and validation |
| `site` | Title, tagline, description, URL, language | Forking, rebranding |
| `author` | Your name, email, bio, link | Forking |
| `navigation` | Section slugs in the order they appear in the menu | Adding or reordering sections |
| `branding` | Accent colour, fonts, logo text, favicon | After running the Stitch design step (Module 3) |
| `features` | Boolean flags to hide/show optional features | When you want to turn off a feature without deleting the code |
| `footer` | Copyright line, footer links | Forking, adding social links |
| `seo` | Default OG image, Twitter handle | Forking, before public launch |

The file is around 60 lines. There's no nesting deeper than two levels.

---

## How Next.js reads this file at build time

Components import `site.config.json` directly as a JSON module. There's no runtime fetch and no parsing logic. The bundler reads the file once during `next build` and inlines the values into the static HTML.

A typical use in `app/layout.tsx`:

```typescript
import siteConfig from '../site.config.json'

export const metadata = {
  title: siteConfig.site.title,
  description: siteConfig.site.description,
}

export default function RootLayout({ children }) {
  return (
    <html lang={siteConfig.site.language}>
      <body>
        <Header
          logoText={siteConfig.branding.logoText}
          navItems={siteConfig.navigation.primary}
        />
        {children}
        <Footer copyright={siteConfig.footer.copyright} />
      </body>
    </html>
  )
}
```

Once `next build` finishes, the JSON values have been baked into the HTML. Changing `site.config.json` after a deploy has no effect until the next build. This is the static-generation property described in build-diary entry 05.

---

## Field-by-field reference

### `$schema`

```json
"$schema": "./site.config.schema.json"
```

A pointer to the JSON Schema that describes this file's shape. Don't edit. When you open `site.config.json` in any modern editor (VS Code, Antigravity, Cursor), the editor reads the schema and gives you autocomplete on field names, validation when you misspell something, and hover tooltips that explain what each field is for.

The schema file itself (`site.config.schema.json`) is what defines those rules. You generally don't touch the schema either.

---

### `site`

Identity of the site.

| Field | Type | What it does |
|---|---|---|
| `title` | string | Page `<title>` tag. Shown in browser tabs and search results. Also rendered as the site title on the landing page |
| `tagline` | string | One-line pitch shown under the title on the landing page and in the header |
| `description` | string | The `<meta description>` for SEO and link previews (open graph, Twitter cards) |
| `url` | string | Canonical domain for the deployed site. Used in OG/Twitter meta tags and the sitemap |
| `language` | string | The HTML `lang` attribute (e.g. `"en"`, `"es"`) |
| `locale` | string | More specific locale (e.g. `"en-SG"`, `"en-GB"`, `"es-MX"`) — affects date and number formatting |

Edit all of these when you fork. The `url` is the only one that depends on your deploy — leave it as the Vercel default until you have a custom domain.

---

### `author`

Who's behind the site. Shows up on the about page and in the footer.

| Field | Type | What it does |
|---|---|---|
| `name` | string | Your full name |
| `email` | string | Contact email. Optional but recommended |
| `url` | string | Personal site or X/LinkedIn URL. Leave empty (`""`) if you don't have one |
| `bio` | string | One-line description that appears on the about page |

Edit when you fork. Single-author sites only — this template doesn't have multi-author support.

---

### `navigation`

The order in which sections appear in the site's top navigation.

```json
"navigation": {
  "primary": [
    "how-to-learn",
    "working-with-ai",
    "shape-of-an-ai-app",
    "the-hard-parts",
    "what-next"
  ],
  "secondary": [
    "build-diary"
  ]
}
```

| Field | Type | What it does |
|---|---|---|
| `primary` | string[] | Section slugs (folder names under `/content/lessons/`) in display order. These appear in the main nav as "Lessons" or the equivalent |
| `secondary` | string[] | Section slugs that appear separately — usually just `"build-diary"` |

Every slug listed here must exist as a folder under `/content/`. If you reorder, the navigation reorders. If you add a slug here without creating the folder, the build script will warn you. If you create a folder under `/content/` without adding it here, the build will warn that the section is orphaned.

Edit when you add or reorder sections.

---

### `branding`

The visual identity tokens that aren't part of the design system.

| Field | Type | What it does |
|---|---|---|
| `accentColor` | string (hex) | Fallback accent colour. Used by components that need a colour before `DESIGN.md` has been loaded. After Module 3's Stitch fetch, `DESIGN.md` is the source of truth and this is mostly cosmetic |
| `fontHeading` | string | Fallback font for headings. Same logic — Module 3 overrides via `DESIGN.md` |
| `fontBody` | string | Fallback body font |
| `fontCode` | string | Fallback code font |
| `logoText` | string | The short label that appears next to (or instead of) a logo in the header. Often an abbreviation or short brand name |
| `favicon` | string | Path to the favicon, served from `/public/` |

The fonts and accent colour here matter less once you've run Module 3 (`DESIGN.md` takes over). The `logoText` and `favicon` always matter — they're used regardless of which design is loaded.

Edit `logoText` when you fork. Edit `favicon` once you have your own. The font/colour fallbacks rarely need editing.

---

### `features`

Boolean flags to turn features on or off without deleting code.

| Field | Type | What it does |
|---|---|---|
| `showBuildDiary` | boolean | If `false`, hides the build-diary link from the nav and removes its pages from the build |
| `showAboutPage` | boolean | If `false`, no `/about` route is generated |
| `showSearch` | boolean | If `true`, shows a search input in the header. Search is unimplemented in v1 — leave `false` until v2 |
| `showDarkMode` | boolean | If `true`, shows the dark-mode toggle. Module 3's Stitch fetch enables this; before then it's `true` but the toggle has no effect |
| `showReadingTime` | boolean | If `true`, shows estimated reading time on lesson cards. Calculated from word count at build time |

Feature flags exist so you can disable a feature mid-build without ripping out the code that supports it. If you ever want to bring the feature back, just flip the flag.

Edit when you want a different feature set. Common pattern for a fork: turn off `showBuildDiary` if your forked site doesn't include one.

---

### `footer`

What appears at the bottom of every page.

| Field | Type | What it does |
|---|---|---|
| `copyright` | string | The copyright line (e.g. `"© 2026 Your Name. All rights reserved."`) |
| `links` | array | Optional footer links. Each item is `{ "label": "...", "url": "..." }`. Empty array is fine |

Edit `copyright` when you fork. Add `links` if you want a Privacy / Terms / GitHub link in the footer.

---

### `seo`

Defaults for SEO meta tags that individual pages can override.

| Field | Type | What it does |
|---|---|---|
| `defaultImage` | string | Path to the default Open Graph image (the preview thumbnail shown when someone shares a link). Served from `/public/`. Typically `/og-default.png`, 1200×630px |
| `twitterHandle` | string | Your Twitter/X handle including the `@`. Used in Twitter card meta tags. Empty string is fine if you don't have one |

Edit before you open the site to public traffic. Both fields are optional — the site works without them, you just lose some social-share polish.

---

## The `_comment` keys

You'll notice several `"_comment": "..."` lines scattered through the file. JSON doesn't support comments, so these are real fields that the build script ignores (any field whose name starts with `_` is treated as documentation). They're there so a future maintainer reading the file knows what each section is for.

Keep them. Update them if the surrounding fields change meaning. They don't affect the build.

---

## When to edit

| Situation | Fields to touch |
|---|---|
| Forking the template for a new topic | `site.*`, `author.*`, `navigation.primary`, `branding.logoText`, `footer.copyright` |
| Adding a new content section | `navigation.primary` (add the slug) |
| Reordering sections | `navigation.primary` (rearrange) |
| After running Module 3 (Stitch fetch) | `branding.accentColor`, `branding.fontHeading`, `branding.fontBody` get overwritten or become irrelevant — `DESIGN.md` takes over |
| Buying a custom domain | `site.url` |
| Removing the build diary section | `features.showBuildDiary` → `false` AND remove `"build-diary"` from `navigation.secondary` |
| Adding social links to the footer | `footer.links` |
| Before public launch | `seo.defaultImage`, `seo.twitterHandle` |

---

## When NOT to edit

- **`$schema`** — points at the local schema; only change if you move the schema file
- **The `_comment` fields** — keep them, but only update if the surrounding fields change meaning
- **Anything during a build** — Next.js inlines values at `next build`. Mid-build edits do nothing until the next build

---

## Validation

The build runs `site.config.json` against `site.config.schema.json`. A missing required field or a wrong type fails the deploy at build time, before students see the broken site. The schema is the contract.

If you add a new field to the config, also add it to the schema. If you remove a field, remove it from the schema. Otherwise you'll get either runtime errors (field missing) or annoying validation warnings (field defined but not in schema).

---

## See also

- [`FORK.md`](./FORK.md) — the eight-step recipe for forking the template, including which fields to edit first
- [`CONTENT-SPEC.md`](./CONTENT-SPEC.md) — the contract for the markdown content files
- [build-diary entry 05](./content/build-diary/05-content-config-code-separation.md) — the architectural argument for why config is JSON, not TypeScript
- [`site.config.schema.json`](./site.config.schema.json) — the formal JSON Schema that defines this file's shape
- [`GLOSSARY.md`](./GLOSSARY.md) — definitions of JSON, JSON Schema, and frontmatter
