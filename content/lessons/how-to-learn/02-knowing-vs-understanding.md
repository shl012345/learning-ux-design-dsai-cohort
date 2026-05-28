---
title: "The difference between knowing and understanding"
section: "how-to-learn"
order: 2
duration: "18 min"
difficulty: "beginner"
prerequisites: ["01-how-adults-learn-to-code"]
analogy: "Reading a recipe vs cooking the dish"
tags: ["meta-learning", "mental-models"]
summary: "Why being able to follow a tutorial and being able to build something without one are different skills, how to test which one you actually have, and the small daily practice that converts knowing into understanding."
---

You can read a recipe for risotto and know what it says. You cannot, on the strength of having read it, make a risotto. The reading is "knowing the recipe". The cooking is "understanding risotto". They look related — you used the same words — but in your hands they behave like different skills.

This gap is the single most common reason adult learners feel like they're moving but not arriving. You finish a Python tutorial; you feel competent; you open a blank file the next day and freeze. This lesson is about why that happens, and about a five-minute test you can run on yourself to tell which side of the gap you're on.

## Two kinds of knowing

Cognitive scientists distinguish two states that ordinary English bundles into one word.

| Type | What it feels like | What it lets you do |
|---|---|---|
| **Recognition** | "Yes, that's familiar" | Read someone else's code; nod along to a tutorial; pass a multiple-choice test |
| **Production** | "I could write that from scratch" | Open a blank file and build the thing; explain it to someone in your own words; predict what it will do without running it |

Recognition is cheap. Your brain gives it to you almost for free, as long as you've seen the material once before in some form. That's why a tutorial feels like it's working — you're harvesting recognition.

Production is expensive. It requires the same neurons to have been organised and connected, not just visited. Production is what your job will eventually ask of you. Recognition is what feels like learning. The trap is that you can build a lot of recognition and almost no production, and you won't notice until you're trying to produce.

## The five-minute test

Whenever you finish a tutorial — or a chapter of a book, or a video lesson — close the laptop and sit somewhere quiet. Then explain what you just learned to an imagined friend who isn't a coder. Out loud. Without notes. For five minutes.

If you can do it cleanly, you've moved at least partway into production.

If you stall, repeat yourself, gesture at the laptop you've just closed, or notice that you're using words ("function", "decorator", "endpoint") that you couldn't actually define — you're still in recognition. That's fine. It just means the lesson hasn't finished yet.

The friction is the point. Recognition feels good and proves nothing. The five-minute explanation feels uncomfortable and proves a lot.

## The explain → produce → predict loop

Three exercises, in order, reliably convert recognition into production. Each one takes a few minutes. You can do them after any tutorial.

**Explain.** As above. Out loud, in your own words, to an imagined audience. This is the cheapest move and it surfaces every gap.

**Produce.** Reopen the blank file. Build a tiny version of the thing the tutorial taught — half the size, your own example. If the tutorial taught a Flask hello-world, you build a Flask app that returns your name. The smaller the better; the point is the friction of writing, not the size of the artifact.

**Predict.** Look at a piece of code you haven't seen — ideally a snippet from the same library or topic — and before you run it, write down what you think it will do. Then run it. The difference between what you predicted and what happened is exactly the shape of the gap in your understanding.

Doing all three takes about fifteen minutes. Doing all three after every tutorial would be excessive; doing all three after the tutorials you most want to actually retain is closer to right.

## What this is not asking of you

It is not asking you to be slower, or more thorough, or to take fewer tutorials. The volume of material you consume is mostly irrelevant. What matters is whether the consumption produced any production. Twenty tutorials at recognition level move you less than three tutorials at production level. The five-minute test is how you tell which kind of evening you just had.

> The students who finish a cohort feeling unprepared almost always did the lessons; they just never converted them. The cost of conversion is small. The cost of not converting is the year of self-doubt that follows.

## What's next

The next lesson covers the most common production exercise in real working life — reading code you didn't write — and the four-pass technique that turns a wall of unfamiliar code into something legible.
