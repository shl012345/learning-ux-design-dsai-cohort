# DESIGN.md

> **Status: BEFORE-STATE.** This is the design system the site uses after Module 2 (Antigravity scaffold). It is deliberately plain. Module 3 (Stitch fetch via MCP) replaces every value in this file with the design system you generate in Stitch. The visible difference between before and after is the teaching moment of Module 3 — keep this file plain on purpose.
>
> Agents reading this file: apply these tokens **literally**. Do not add card styling, shadows, gradients, or other embellishments. The "wireframe with type" feel is the goal, not a sign of incomplete work.

This file is the contract `tailwind.config.ts` / `app/globals.css` should read from. Every component on the site references tokens from this file. When Module 3 fetches the Stitch design via MCP, the agent overwrites this file from Stitch's export and the site updates automatically because the components already use these token names.

---

## Colors

Single palette. No dark mode in the before-state (Module 3 adds it).

| Token | Hex | Use |
|---|---|---|
| `background` | `#FAF6EE` | Page background (cream, warm off-white) |
| `foreground` | `#2A2A2A` | Body text (warm near-black) |
| `muted` | `#6B6B6B` | Secondary text, captions, metadata |
| `border` | `#D9D2C1` | Hairline borders, hr lines |
| `accent` | `#5C7A5E` | Links, the one accent thing per screen. Muted sage green |
| `accent-hover` | `#4A6249` | Hover state for links |
| `code-bg` | `#F0EADC` | Inline code background and code block background |

That's seven colors. Resist adding more.

---

## Typography

Single font family for the entire site. Heading weight + size do all the hierarchy work.

| Token | Value | Use |
|---|---|---|
| `font-body` | `Georgia, "Times New Roman", serif` | Everything — body, headings, code-block captions |
| `font-code` | `ui-monospace, "SF Mono", Menlo, monospace` | Inline code and code blocks only |
| `text-base` | `18px` | Body |
| `line-height-body` | `1.65` | Body line-height |
| `text-h1` | `36px / 1.2 / weight 700` | Page title (lesson, section, landing) |
| `text-h2` | `26px / 1.3 / weight 700` | Major section heading inside a lesson |
| `text-h3` | `20px / 1.4 / weight 700` | Subsection heading |
| `text-small` | `15px / 1.5 / weight 400` | Metadata (duration, difficulty, tags) |

Georgia is on every Mac, Windows, and Linux machine since the late 1990s. No web fonts to load. That's deliberate — Module 3 swaps to whichever font Stitch picks.

---

## Spacing scale

4px base, used for all margins and padding.

| Token | Value |
|---|---|
| `space-1` | `4px` |
| `space-2` | `8px` |
| `space-3` | `12px` |
| `space-4` | `16px` |
| `space-5` | `24px` |
| `space-6` | `32px` |
| `space-7` | `48px` |
| `space-8` | `64px` |

Use `space-7` (48px) between major content blocks. Use `space-5` (24px) between paragraphs. Use `space-3` (12px) between list items.

---

## Layout

| Token | Value |
|---|---|
| `content-max-width` | `680px` |
| `page-padding-x` | `24px` (mobile), `48px` (desktop ≥768px) |
| `page-padding-y` | `48px` |

Single-column layout. The content sits centered with a max-width of 680px (around 65–70 characters per line at the body font size). This is the reading-first commitment in `BRIEF.md` §8, made concrete.

---

## Components

These are the only patterns the before-state ships with. Each is deliberately minimal.

### Header

- Fixed at top: site logo text (left), nav links (right)
- Background: same cream as the page
- Bottom border: `1px solid border`
- Padding: `space-4` vertical, `space-5` horizontal
- Logo: text only, `font-body weight 700`, no symbol

### Footer

- Single line of muted text
- `border-top: 1px solid border`
- Padding: `space-5`
- Centered

### Code block

- Background: `code-bg`
- Border: `1px solid border` (no rounded corners)
- Padding: `space-4`
- Font: `font-code` at `15px`
- No syntax highlighting colors yet — the text is just `foreground` colored. (Shiki via `rehype-pretty-code` is wired up but uses a single-color "light-plus" theme until Stitch picks a real code theme in Module 3.)

### Inline code

- Background: `code-bg`
- Padding: `2px 6px`
- Font: `font-code` at `0.9em` of surrounding text

### Tables

- Border-collapse, `border: 1px solid border` on cells
- Header row: `font-weight 700`, no background tint
- Cell padding: `space-3`
- No alternating row colors

### Callout (the `> 💡` blockquote pattern)

- Left border: `4px solid accent`
- Background: same cream as page (no tint)
- Padding: `space-4 space-5`

### Image placeholder (when `/images/...` file is missing)

- Dashed border, `2px dashed border`
- Padding: `space-7`
- Centered text with the alt-text in `muted` color
- A simple monospace-style "filename: ..." caption underneath

### Links

- Color: `accent`
- Underline: yes (1px solid, `0.15em` offset)
- Hover: `accent-hover`, underline stays
- No visited-state styling

---

## What is deliberately NOT in this design

These exist in many design systems and are absent here on purpose. Module 3's Stitch fetch may add some of them:

- Cards (boxed lesson summaries, etc.) — lessons are just headings + prose
- Shadows
- Gradients
- Hover animations beyond simple color changes
- A dark mode toggle (Module 3 adds the toggle and the dark tokens together)
- Custom icons (we use emoji where icons are needed — section icons in `_section.md`)
- Image-frame styling beyond the placeholder pattern above
- Sidebar navigation on lesson pages
- Pagination decorations beyond a simple "← Previous · Next →" line

If a Module 2 agent adds any of these, it's gone beyond DESIGN.md. The cohort student should re-prompt: "Strip the X — use only what's in DESIGN.md."

---

## Tailwind mapping

The agent should produce a `tailwind.config.ts` (or equivalent v4 CSS-first config) that exposes these tokens to components. Component code should reference token names, never hardcoded values, so Module 3's fetch swaps the design without touching components.

In Tailwind v4's CSS-first config (`app/globals.css`):

```css
@import "tailwindcss";

@theme {
  --color-background: #FAF6EE;
  --color-foreground: #2A2A2A;
  --color-muted: #6B6B6B;
  --color-border: #D9D2C1;
  --color-accent: #5C7A5E;
  --color-accent-hover: #4A6249;
  --color-code-bg: #F0EADC;

  --font-body: Georgia, "Times New Roman", serif;
  --font-code: ui-monospace, "SF Mono", Menlo, monospace;
}

body {
  background: var(--color-background);
  color: var(--color-foreground);
  font-family: var(--font-body);
  font-size: 18px;
  line-height: 1.65;
}
```

Components then use Tailwind classes like `bg-background`, `text-foreground`, `border-border`, `text-accent`, `font-body`. When Module 3 rewrites this `@theme` block from Stitch's export, every component picks up the new values automatically.

---

## How this changes in Module 3

Module 3 runs the Stitch MCP fetch. The agent will:

1. Read this file as the current state.
2. Fetch the design system from your Stitch project (typography, palette, spacing, component patterns).
3. Rewrite this file from top to bottom with Stitch's tokens.
4. Update `tailwind.config.ts` / `app/globals.css` to match the new `@theme`.
5. Add a dark-mode toggle to the Header and dark-mode tokens to the `@theme` block.

The components don't change. Only the tokens change. That's the visible "design as data" lesson.

---

## Pages designed in Stitch (the four screens to brief Stitch with)

The minimum set Module 3's Stitch brief should request:

1. **Landing page (`/`)** — site title, tagline, sections list
2. **Section index page (`/lessons/<section>`)** — lessons in that section
3. **Lesson page (`/lessons/<section>/<slug>`)** — the long-form reading experience
4. **About page (`/about`)** — short, author bio

Other pages (build diary, etc.) inherit the lesson-page treatment.
