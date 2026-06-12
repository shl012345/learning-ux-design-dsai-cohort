# DESIGN.md

> **Status: ACTIVE-STATE.** This is the active design system imported from Google Stitch for the DSAI Companion Reader. It integrates a premium, book-like scholarly aesthetic with full support for light and dark modes.

---

## Colors

The palette supports class-based dark mode using CSS variables. The `.dark` class overrides core properties at the root level.

| Token | Light Value | Dark Value | Purpose |
|---|---|---|---|
| `background` | `#f8f6f6` | `#211511` | Primary canvas background |
| `foreground` | `#22201F` | `#f8f6f6` | High-contrast body copy and headings |
| `muted` | `#8A837A` | `#A39B92` | Secondary text, captions, page subtitles |
| `border` | `#E5E0D8` | `#3A2C27` | Thin layout borders and divider lines |
| `accent` | `#e85b30` | `#e85b30` | Interactive links, active states, and brand highlights |
| `accent-hover` | `#cf461c` | `#cf461c` | Link hover states |
| `code-bg` | `#2A2827` | `#1A120F` | Code block backgrounds |
| `surface` | `#F0ECE5` | `#2D1E19` | Subtle highlights, block quotes, and sidebar backgrounds |

---

## Typography

Typography uses the Literata display serif font to enforce a book-like reading experience, combined with JetBrains Mono for code blocks.

| Token | Value | Use |
|---|---|---|
| `font-body` | `'Literata', Georgia, serif` | Body copy and headings |
| `font-code` | `'JetBrains Mono', ui-monospace, monospace` | Fenced code blocks and inline code |
| `font-size` | `18px` | Default body font size |
| `line-height` | `1.7` | Default line-height for readability |
| `text-h1` | `36px (large desktop: 40px)` | Page title (lessons, sections) |
| `text-h2` | `26px` | Heading 2 |
| `text-h3` | `20px` | Heading 3 |

---

## Spacing & Border Radius

| Token | Value | Use |
|---|---|---|
| `borderRadius.sm` | `0.125rem (2px)` | Small buttons, cards, chips |
| `borderRadius.DEFAULT` | `0.125rem (2px)` | Default elements |
| `borderRadius.lg` | `0.25rem (4px)` | Main image placeholders or code block containers |
| `borderRadius.xl` | `0.5rem (8px)` | Modal cards or major sections |
| `borderRadius.full` | `9999px` | Fully rounded elements |

---

## Layout

- **Width:** Single-column layout. The main reading prose sits centered with a maximum width of `680px` (`max-w-[680px]`).
- **Layout Grid (Lessons):** When a real-world excerpt is present, the page adapts to a 3-column layout (`lg:grid-cols-3`):
  - **Main content:** Spans 2 columns (`lg:col-span-2`), maintaining a clean, max-680px reading container.
  - **Sidebar:** Spans 1 column (`lg:col-span-1`) to display the code excerpt without cluttering the main article.

---

## Components

### Header
- Fixed/Sticky top layout.
- Sites logo text on the left, navigation links and a dynamic **DarkModeToggle** on the right.
- Bottom border: `1px solid border`.
- Background: Matches the active mode (`background`).

### Code Blocks
- Background: `#2A2827` (light mode) / `#1A120F` (dark mode) providing strong contrast.
- Fonts: `font-code` at `15px` with a leading height of `1.7`.

### Graceful Image
- If an image is missing, it displays a dashed-border visual placeholder (`2px dashed border`) with the alt-text inside a space-7 padded block. Shows the filename dynamically below in a monospace font.
