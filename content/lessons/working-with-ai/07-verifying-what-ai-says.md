---
title: "How to verify what AI tells you"
section: "working-with-ai"
order: 7
duration: "22 min"
difficulty: "beginner"
prerequisites: ["06-when-to-use-ai"]
analogy: "Trust but verify"
tags: ["ai-craft", "verification", "judgement"]
summary: "The three ways AI is wrong (hallucination, dated knowledge, plausible-but-off), the 30-second sanity checks that catch most of them, and the discipline of never shipping AI output you haven't read."
---

The lesson that turns AI-users into AI-craftspeople is this one. The discipline that separates the two is not skill at prompting; it's skill at *not trusting* what comes back.

AI output is confident-sounding by default. The model produces text that reads like an answer regardless of whether it actually is one. The first defence is to assume — every time — that the answer might be wrong in a specific way, and to know which specific ways to check for.

There are three flavours of wrong you'll meet. Each has its own tell, and each has a 30-second check.

## The three flavours of wrong

**1. Confident-but-fabricated.** The model invents an API, a function, a flag, a library that does not exist. The fabrication is plausible — it would *make sense* for the thing to exist — but it doesn't. The classic case is asking for "the function in NumPy that does X" and getting a function name that's never been in NumPy. The output runs through `import` and then dies with `AttributeError`.

**2. Confident-but-stale.** The model gives you syntax that was correct in 2022 and isn't any more. The library released a breaking change, the deprecated form was removed, the recommended pattern shifted. The output runs in your editor's syntax check but breaks at runtime, or it works but logs a deprecation warning you don't notice.

**3. Confident-but-subtly-off.** The output runs. The output looks right. The output even *does* the right thing on the example you tested. But it's wrong on the edge case you didn't think to test — empty input, single-element input, unicode, negative numbers, the boundary between weeks. This is the most dangerous flavour because it leaves no immediate trace.

## The 30-second checks

Each flavour has a check that takes about half a minute and catches it the vast majority of the time.

**For fabricated APIs** — search the official documentation for the exact name. Not Google; the actual docs. If the function exists, it's documented. If you can't find it in the docs in thirty seconds, treat it as fabricated until proven otherwise. The fastest way to do this: `Ctrl-F` on the library's reference page.

**For stale knowledge** — check the library version. Two questions: what version did the model assume, and what version are you actually on? If they're different, expect drift. The pip output `pip show <library>` tells you what version you have; the docs tell you when each feature was added or removed. If the gap is more than a year, treat anything specific as suspect.

**For subtly-off output** — write the one test that would catch it. This is the hardest of the three, because it requires you to imagine the edge case. The discipline: every time the model gives you code that handles a collection or a string or a number, ask: *what happens if this is empty? what happens if this is at the boundary?* Run those cases by hand, even if you don't formalise them as tests.

```python
# AI gave you this:
def first_three(items):
    return items[:3]

# Before you ship it, run:
first_three([])         # what does it do? is that what you want?
first_three([1, 2])     # fewer than three. acceptable?
first_three(None)       # explodes. is that the right behaviour?
```

The thirty-second test is more useful than the thirty-minute test you might write later when the bug hits production.

> The professional habit you're building is: *trust the model's draft, don't trust the model's facts.* Drafts are easy to edit. Facts feel correct until they cost you. The verification habit closes the gap.

## The rule that prevents most disasters

There is one durable rule that has saved more cohort students than any other:

**Never paste AI output into anything other people will rely on without reading every line and testing the boundary case yourself.**

"Other people will rely on" includes: your cohort submission, your project's README, a database migration, a config file, a deploy script, anything that touches production. Internal scratch work — exploration, drafting, rubber-ducking — is fine. The line is what other people will trust.

Reading every line means literally reading. Out loud if needed. Catching the line you didn't notice was there. Testing the boundary case means running the function on empty input, on the largest input you can imagine, and on one weird input you make up specifically because you didn't think of it before.

## A practical exercise

The next time you use AI to help with a piece of code, do this: don't paste the result into your editor immediately. Read it through. Annotate it — in your head or on paper — with what each line does and why. Then run the boundary cases. *Then* paste it in.

The first time you try this it'll feel slow. By the fifth time, it's automatic. By the twentieth, it's the only way you'd consider working.

## What's next

Section 3 — The shape of a modern AI app. Your hands-on cohort builds the pieces; this section steps back and shows what the whole thing looks like once it's deployed and people other than you start using it. We start with the deceptively simple question: what does "production" actually mean?
