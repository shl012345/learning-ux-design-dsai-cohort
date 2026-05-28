# /public/images/

This is where the site's image assets live. Next.js serves anything in `public/` at the root URL — so `public/images/foo.png` is reachable at `/images/foo.png` in markdown and components.

## How images get into this folder

Image filenames, alt text, and **the Nano Banana prompts that generate them** are tracked in [`/IMAGES.md`](../../IMAGES.md) at the repo root. To add or replace an image:

1. Open `IMAGES.md`, find (or add) the image entry
2. Copy the **Style preamble** + the image's **Content prompt** into [Google Nano Banana](https://aistudio.google.com/) (in Google AI Studio)
3. Generate, pick the best output, download
4. Save the PNG to this folder using the exact filename listed in `IMAGES.md`
5. Tick the `[x]` status box in `IMAGES.md` and commit

The `IMAGES.md` manifest is the source of truth. The PNGs in this folder are derived artifacts. If you ever need to regenerate them in a new style, edit the style preamble in `IMAGES.md` and re-run the loop.

## Folder convention

- Lesson illustrations: `lesson-NN-<descriptive-slug>.png` (e.g. `lesson-09-seven-boxes.png`)
- Build-diary illustrations (if any): `build-NN-<slug>.png`
- Site chrome (logo, favicon, OG image): `site-<slug>.png`

Keeping the filename pattern consistent makes it easy to grep where each image is used across the lessons.
