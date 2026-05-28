---
title: "How to read documentation"
section: "how-to-learn"
order: 4
duration: "18 min"
difficulty: "beginner"
prerequisites: ["03-reading-code-you-didnt-write"]
analogy: "A reference book, not a novel"
tags: ["meta-learning", "docs", "fundamentals"]
summary: "Documentation isn't written to be read cover-to-cover, and trying to do that is why so many learners bounce off it. The four kinds of doc, what each one is for, and the order to read them in when you're new to a library."
---

Cohort students often arrive at the docs of a new library, scroll through the first page, scroll through the second, lose the thread by the third, close the tab, and go back to a tutorial. They blame themselves for "not understanding the docs". The truth is usually simpler: they were reading the wrong document, in the wrong order, for the question they had.

Documentation is not a single thing. Most good docs are four different documents in a trench coat, each written for a different purpose. Knowing which document you need is most of the skill.

## The four genres

A widely used framework called [Diátaxis](https://diataxis.fr/) names the four documentation genres. Almost every well-maintained library splits its docs along these lines, whether or not the maintainers know the framework by name.

| Genre | What it answers | When to read it |
|---|---|---|
| **Tutorial** | "I'm brand new — walk me through one complete example" | The first time you touch a library |
| **How-to guide** | "I have a specific problem — what's the recipe?" | When you have a concrete task in mind |
| **Reference** | "I need the exact signature of this function" | When you already know what you want and need the details |
| **Explanation** | "Why is this library shaped the way it is?" | When you've used the library enough to have opinions of your own |

![A diagram showing the four documentation genres arranged in a two-by-two grid: practical vs. theoretical on one axis, study vs. work on the other.](/images/lesson-04-diataxis-grid.png)

Tutorial and reference are the two genres most people know. How-to and explanation are the two most people accidentally skip.

## The reading order

When you're brand new to a library, read the four genres in this order:

1. **Tutorial first.** One tutorial. Cover to cover. Even if it's longer than you'd like. You're building the mental model the rest of the docs will assume.
2. **One how-to that matches your problem.** Don't read all of them. Just the one that does the thing you actually need to do right now.
3. **Reference, as needed.** Use it as a lookup, not a study text. You don't read the dictionary.
4. **Explanation, when you have time.** The "why" articles are the most rewarding reads in the docs, but only after you have the *what*. Reading them first is like reading a film critic before you've seen any of the director's films.

The most common mistake is to skip step 1 because you "don't have time for a tutorial" — and then spend three hours bouncing around the reference, trying to assemble a tutorial from scratch in your head. The tutorial was shorter.

## Two specific traps

**Reading the reference first.** Reference docs assume context. They tell you that `fetch_one` takes a `session: AsyncSession` and an `id: int` and returns `Optional[Row]`. They do not tell you what a session is, why it's async, where it comes from, or why you'd want one. If you don't know those things, the reference is just a list of words you don't understand. Read the tutorial first; come back for the reference when you know what to look up.

**Reading the explanation first.** Explanation articles are usually the best-written docs in the project — they're often essays the maintainer cares about. The trap is that you'll absorb opinions about the library ("you should never use synchronous engines in production") without yet knowing what an engine is. You'll arrive at every later decision pre-loaded with a verdict you can't justify. Get the experience first; absorb the opinions second.

## A practical exercise

The next time you need to use a library you've never touched, force yourself through this:

- Set a timer for thirty minutes.
- Find the tutorial. Read it. Do the example.
- When the timer goes off, decide whether you have a real task in mind or are just exploring.
- If you have a task, find the how-to that matches it and follow it.
- If you don't have a task, stop. You're done for the day. Come back when you have one.

The bounded time is on purpose. Docs reward focused short visits more than they reward open-ended hours of scrolling.

## What's next

Section 2 — Working with AI tools — opens with the most common question DSAI cohort students ask: "everyone says use AI to learn faster, but my outputs are mediocre and I don't know why". The next lesson is the answer, and it starts with what a useful prompt actually contains.
