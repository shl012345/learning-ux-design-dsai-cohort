---
title: "How to read code you didn't write"
section: "how-to-learn"
order: 3
duration: "22 min"
difficulty: "beginner"
prerequisites: ["02-knowing-vs-understanding"]
analogy: "Walking into a kitchen mid-prep"
tags: ["meta-learning", "code-reading", "fundamentals"]
summary: "Most adult learners write code badly because they read code badly. The four-pass reading technique professional developers use without thinking, why it works, and how to practise it on small files until it becomes automatic."
---

The first time you open a real codebase — even a small one — the instinct is to read it like prose. Top to bottom. Line by line. Trying to hold every detail in your head as you go.

This almost never works. Code isn't prose; it's a building. Reading it like prose is the equivalent of walking into a house by examining one brick at a time. By brick four hundred you've forgotten what brick three looked like and you still don't know if there's a kitchen.

Senior developers don't read like that. They use four passes, each pass answering a different question. They don't usually name the technique — they've internalised it — but you can learn it explicitly and skip the years.

![A diagram of a codebase rendered as a building with four floors, each labelled with one of the four passes: shape, happy path, edges, why.](/images/lesson-03-four-pass-building.png)

## Pass 1 — Shape

The first pass asks: *what is this thing made of, and what depends on what?*

You're not reading the code at all on pass one. You're looking at the file structure, the imports, and which functions call which. You want a mental map: this folder is the API, this folder is the database layer, this folder is config. This file imports from those three; nothing imports from it.

In a small project the shape pass takes ninety seconds. In a larger one, ten minutes. Either way, you don't proceed to pass two until you have the shape. Trying to read code without knowing its shape is the brick-by-brick mistake.

## Pass 2 — Happy path

The second pass asks: *if everything goes well, what happens?*

Pick one entry point — usually the function the program starts with, or the API route a user hits first. Trace what that function does, calling out into other functions when it does, but pretending all errors are impossible and all edge cases don't exist. Read the version of the code where everything works.

For a tiny FastAPI service, the happy-path trace looks something like this:

```python
@app.get("/items/{id}")
def get_item(id: int):
    item = db.fetch_item(id)         # always finds the item
    payload = serialise(item)        # always serialises cleanly
    return payload                   # always returns successfully
```

That's the happy path. You'll have spotted that the real code is wrapped in error handling — that's fine; ignore it for now. Pass two is about understanding the intent, not the safety net.

## Pass 3 — Edges

The third pass asks: *what does this thing do when it goes wrong?*

Now go back to the same function and read the parts you skipped — the try/except blocks, the validation, the early returns, the edge cases. For each, ask: what is the author defending against? Why is this branch here? What user-visible thing happens if this branch fires?

This pass is where you find the bugs and the cleverness. The happy path is usually obvious; the edges are where the design choices live. A senior developer reading a new codebase often spends more time on the edges than the happy path.

## Pass 4 — Why

The fourth and final pass asks: *why does this code exist at all?*

This is the pass most beginners skip. You read the commit history (`git log`). You read the comments. You read the tests, which are usually the most honest documentation a codebase has. You're looking for: when was this written? What problem did it solve? What did it replace? What constraints were the authors working under?

The fourth pass is what separates a coder from someone who understands a codebase well enough to safely change it.

## Two failure modes

There are two reliable ways to do this badly.

**Trying to understand everything at once.** This is the prose-reading mistake. You read line one, try to fully understand it, then line two, and so on. You'll get to line fifty and realise you can't remember line one and you still don't know what the file is for. Always do shape first.

**Skipping straight to the bug you're hunting.** When you open someone else's code because something is broken, the urge is to jump straight to the broken function. Don't. Do shape and happy path first, even if it costs you ten minutes. You will fix the bug correctly more often, and you'll fix it without breaking three other things.

## Practising this

Take any small file you've written yourself — fifty to a hundred lines — and run the four passes on it as if someone else wrote it. You already know what it does, so you can check your own work. Then do the same on a file from one of the example projects your cohort uses. After three or four files, the four-pass shape will feel natural.

## What's next

Most code is meant to be read in concert with the library's documentation. The next lesson covers the four genres of documentation, what each is for, and the reliable order to read them in when you're new to a library.
