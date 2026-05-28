# IMAGES.md — image manifest

The source of truth for every image in the site. Each entry lists the filename, the lesson that uses it, the alt text, the prompt to paste into Nano Banana, and a status checkbox.

The generated PNGs live in [`public/images/`](./public/images/README.md).

---

## Workflow

For each image with status `[ ]`:

1. Open [Google AI Studio](https://aistudio.google.com/) and start a chat with Nano Banana (Google's Gemini Image model family — distinct from the older Imagen line).
2. Paste the Style preamble first. Then paste the image's Content prompt as a second message. You can also concatenate them into one message. Both work.
3. Generate. If the first output doesn't fit, regenerate two or three times. Pick the best.
4. Download the PNG.
5. Save it to `public/images/<exact-filename>.png`. Use the exact filename from the entry header.
6. Change the entry's status from `[ ]` to `[x]` and commit.

If you change the style preamble later, all images become stale. Regenerate everything to keep the site visually consistent.

> Nano Banana sometimes invents text it wasn't asked for. Each content prompt below lists the only text allowed inside the illustration. If the model adds extra labels, regenerate or follow up with "redo without any extra text beyond the labels I listed".

---

## Style preamble

Prepend this to every image prompt. It's what keeps the six illustrations visually consistent.

```
Style: a warm, hand-drawn black-and-white line illustration in the style of a thoughtful instructor's whiteboard sketch. Sketchy, gentle pen lines — not vector-precise. Cream/off-white background (#FAF7F2). Dark grey/black ink (#1A1A1A). Suitable for an adult-learner reading-first website.

Hard constraints:
- No photographic elements
- No gradients, no shadows, no shading
- No colour beyond the cream background and dark ink — strictly two-tone
- Text inside the illustration is allowed ONLY where the content prompt lists exact words. Do not invent extra labels, captions, or signatures
- Aspect ratio: 16:9 landscape (1920×1080) unless the content prompt says otherwise
- Composition: centered subject, generous whitespace — the illustration should not fill the entire frame
- The mood is calm and explanatory, not corporate, not playful, not cartoonish
```

---

## Images

### [ ] `lesson-03-four-pass-building.png`

**Used in:** `content/lessons/how-to-learn/03-reading-code-you-didnt-write.md`

**Alt text:** *A diagram of a codebase rendered as a building with four floors, each labelled with one of the four passes: shape, happy path, edges, why.*

**Content prompt:**

```
Draw a cross-section of a simple four-storey building. Each floor is clearly separated by a horizontal line. The building has a flat roof and simple square windows. No surrounding scenery, no people, no street.

Inside each floor, in hand-drawn lettering, write the floor's label. From top floor to bottom:
- Top floor: "Pass 4 — Why"
- Third floor: "Pass 3 — Edges"
- Second floor: "Pass 2 — Happy path"
- Ground floor: "Pass 1 — Shape"

The four floor labels are the ONLY text in the illustration. No building name, no architect's signature, no other words anywhere.
```

---

### [ ] `lesson-04-diataxis-grid.png`

**Used in:** `content/lessons/how-to-learn/04-reading-docs.md`

**Alt text:** *A diagram showing the four documentation genres arranged in a two-by-two grid: practical vs. theoretical on one axis, study vs. work on the other.*

**Content prompt:**

```
Draw a simple 2×2 grid of four hand-sketched square boxes. The four boxes are arranged in a clean grid with a small gap between them.

Inside each box, centered, write the box's label in hand-drawn lettering:
- Top-left box: "Tutorial"
- Top-right box: "How-to guide"
- Bottom-left box: "Explanation"
- Bottom-right box: "Reference"

Along the bottom of the entire grid, draw a horizontal arrow labelled "Practical → Theoretical" (left to right).

Along the left side of the entire grid, draw a vertical arrow labelled "Study → Work" (top to bottom).

The four box labels and the two axis labels are the ONLY text. No title, no legend, no captions.
```

---

### [ ] `lesson-09-seven-boxes.png`

**Used in:** `content/lessons/shape-of-an-ai-app/09-shape-of-a-modern-ai-app.md`

**Alt text:** *A diagram showing seven labelled boxes — Frontend, API, Model, Vector Store, Queue, Logs, Deploy — connected by arrows showing the request flow.*

**Content prompt:**

```
Draw seven hand-sketched rectangular boxes connected by simple arrows, showing the flow of a web request through a modern AI application.

Layout:
- Top row (left to right): "Frontend" → "API" → "Model"
- "Model" also has a sideways arrow to a box labelled "Vector Store" (to the right of Model)
- Below "API", two boxes branching down: "Queue" and "Logs"
- Below all the others, spanning the width, a wider rectangle labelled "Deploy" with dashed upward arrows connecting it to Frontend, API, and Model (suggesting it brings them into existence)

Each box has its label written inside in clear hand-drawn lettering. The seven labels are the ONLY text:
"Frontend", "API", "Model", "Vector Store", "Queue", "Logs", "Deploy"

Arrows are simple hand-drawn lines with small triangular arrowheads. Use dashed lines for the arrows from "Deploy" upward; solid lines for everything else. No other words, no legend, no annotations on the arrows.
```

---

### [ ] `lesson-11-model-and-supporting-cast.png`

**Used in:** `content/lessons/shape-of-an-ai-app/11-system-around-the-model.md`

**Alt text:** *Diagram showing a central 'Model' box, with three supporting boxes — Vector Store, Queue, Observability — connected to it by labelled arrows.*

**Content prompt:**

```
Draw a central hand-sketched circle labelled "Model" in the middle of the frame. Around it, arranged at three points (left, right, and below), draw three hand-sketched rectangles connected to the central circle by simple labelled arrows.

Layout and arrow labels:
- Left rectangle labelled "Vector Store" — arrow pointing INTO the Model, labelled "context"
- Right rectangle labelled "Queue" — arrow pointing OUT of the Model, labelled "slow jobs"
- Bottom rectangle labelled "Observability" — arrow pointing OUT of the Model, labelled "logs"

Hand-drawn arrows with small triangular arrowheads. The arrow labels sit small and italicised along each arrow.

The seven words are the ONLY text in the illustration:
- Four box/circle labels: "Model", "Vector Store", "Queue", "Observability"
- Three arrow labels: "context", "slow jobs", "logs"

No title, no other annotations.
```

---

### [ ] `lesson-14-ship-zone.png`

**Used in:** `content/lessons/the-hard-parts/14-good-enough-to-ship.md` (first image)

**Alt text:** *A simple two-axis chart with 'too early' on the left, 'too late' on the right, and a narrow 'ship here' zone in the middle.*

**Content prompt:**

```
Draw a single horizontal bar across the middle of the frame, like a sketched spectrum line. The bar is divided into three labelled regions:
- Far left third, labelled below: "Too early"
- Far right third, labelled below: "Too late"
- A narrow shaded zone in the middle (lightly hatched with diagonal lines), labelled above: "Ship here"

Above the "Ship here" zone, draw a small downward-pointing arrow with the words "decision moment" written next to it.

The five words/phrases are the ONLY text in the illustration:
- "Too early"
- "Too late"
- "Ship here"
- "decision moment"

No axis labels, no title, no scale numbers.
```

---

### [ ] `lesson-14-ship-checklist.png`

**Used in:** `content/lessons/the-hard-parts/14-good-enough-to-ship.md` (second image)

**Alt text:** *A simple checklist mock-up with five items ticked off and one unticked, highlighting the item that's blocking the decision.*

**Content prompt:**

```
Draw a hand-sketched clipboard or simple notepad in portrait orientation (3:4 aspect ratio for this image, NOT 16:9 — override the preamble for this one).

On the clipboard, draw a vertical checklist of six items, each with a square checkbox on the left. Five checkboxes have hand-drawn checkmarks inside; one (the fourth) has an empty checkbox, and that empty checkbox is circled with a sketched oval to highlight it.

Item labels (top to bottom):
1. ✓ "Happy path tested"
2. ✓ "Errors give clear messages"
3. ✓ "Logs in place"
4. ☐ (empty, circled for emphasis) "Cost limit set"
5. ✓ "Sample suite running"
6. ✓ "One outsider tested it"

The six checklist labels are the ONLY text. No clipboard brand, no title, no date.
```

---

## What about images we add later?

When a new lesson or section adds an image:

1. Add a new entry to this file using the template above (filename, Used in, Alt text, Content prompt, `[ ]` status).
2. Add the matching `![alt](/images/your-file.png)` reference in the lesson.
3. Run the workflow.

The rule: nothing in `public/images/` exists without a corresponding entry here. That keeps the regeneration story clean. Anyone who forks the repo can regenerate every image from the prompts and get a visually consistent site, without having to remember what each illustration was supposed to look like.
