---
title: "Teach what you know — turn your learning into a site"
section: "what-next"
order: 15
duration: "20 min"
difficulty: "beginner"
prerequisites: ["14-good-enough-to-ship"]
analogy: "The most reliable way to learn it is to teach it"
tags: ["meta-learning", "consolidation", "next-steps"]
summary: "Why teaching the thing you just learned is the most reliable consolidation move available, what kinds of teaching artifact actually compound (notes vs. blog post vs. site), and how to fork this very repo as your starting point."
---

The cognitive-science finding is unambiguous: the single most reliable thing you can do to lock in newly-learned material is to explain it to someone else.

The reason isn't mystical. Teaching forces three things to happen at once. *Retrieval* — you have to pull the material out of memory without notes. *Generation* — you have to organise it into a coherent sequence, not just remember it as a heap. *Specificity* — your audience asks questions that expose where you were vague even with yourself.

You can do all three by explaining to a colleague at lunch. You can also do them by writing the explanation down somewhere a stranger might read it. The lunch version is cheap and forgettable. The written version compounds.

## The spectrum of teaching artifacts

Teaching artifacts sit on a spectrum from cheap-and-disposable to expensive-and-durable. They're all valid; they buy you different things.

| Artifact | Effort | Durability | What it buys |
|---|---|---|---|
| Spoken explanation to a friend | Free | None | Fast consolidation; no compounding |
| Written notes for yourself | Low | Personal | Future-you can read them; nobody else will |
| A blog post or thread | Medium | Public | Strangers find it via search; one piece, one topic |
| A small site with multiple lessons | High | Public + compounding | Multiple pieces, all linked, grows over time |

The site is the most compounding because each lesson reinforces the others — if you write twelve lessons on a topic, the twelfth one teaches you more than the first because by then you've had to make the whole thing coherent.

A site is also the only one of these artifacts that doubles as a portfolio piece. The blog post is a thing you wrote. The site is a thing you *built*, with structure, design, and an actual deploy. For a career-switcher, that distinction matters.

## You don't have to start from scratch

You're reading this site right now. It's a self-paced learning site, built with Stitch, Antigravity, and Vercel — and the [build diary](/build/01-designing-with-stitch) documents how the whole thing came together in roughly a weekend's work. The site is also a *template*. The repo is structured so you can fork it, change `site.config.json`, swap the content folders for your own, push to Vercel, and have your own learning site live within a weekend.

> 💡 **The recursive trick.** The site you're reading is itself the example. Everything you've seen — the Stitch design, the markdown-driven content pipeline, the deploy story — works on any topic. The build diary teaches the process, and [`FORK.md`](https://github.com/SwarupSG/learning-ux-design-dsai/blob/main/FORK.md) gives the eight-step recipe.

The recipe in short:

```bash
gh repo fork SwarupSG/learning-ux-design-dsai --clone=true
cd your-fork
# 1. Edit site.config.json — title, tagline, your name
# 2. Replace /content/lessons/* with your own sections and lessons
# 3. Push to GitHub, connect to Vercel
# 4. Live URL within 90 seconds of push
```

The whole recipe is documented at length in `FORK.md`. The realistic time is a weekend for a small site (eight to twelve lessons) if you've already half-decided the topic.

## What to teach

The instinct is to teach the thing you most recently learned. That's usually wrong. The right move is to teach the thing you *half-know* — the topic where you've absorbed enough to have something to say but not so much that the writing feels mechanical.

A few candidate topics that work for cohort graduates:

- The piece of the cohort that confused you most — explained in the way you wished it had been
- The Singapore-specific career-switcher path you just walked, written for the next person
- A small DSAI project you built, explained as a series of lessons rather than a README
- An opinion you've quietly developed about how the cohort could be better

The audience is "one specific person you could imagine reading this". Pick that person — a former colleague, a younger sibling, the version of you from six months ago — and write for them. Generic writing is bad writing.

## What "done" looks like for a fork

Realistic v1: four to eight lessons across two or three sections. A landing page that says what the site is. A working deploy on Vercel. A URL you can share with one specific person.

Not v1: every lesson you'll ever write. Comments. Search. Analytics. A custom domain. Those can come later. The first goal is *shipped and shareable*. Apply the "good enough to ship" judgement from lesson 14 — the rough edges of a small personal site are nearly always forgivable.

## What this lesson is asking of you

Two small things, in this order.

First: name the topic and the one specific person you'd write it for. Two sentences in a notebook somewhere. "I want to write about X for Y." If you can't finish those sentences, the project isn't ready yet — keep thinking.

Second: when both sentences feel honest, open [`FORK.md`](https://github.com/SwarupSG/learning-ux-design-dsai/blob/main/FORK.md) and start. You don't need permission. The repo is the template; the build diary is the manual; this lesson is the nudge.

## What's next

The final lesson — and the final lesson of the whole site — is about what comes after the cohort and after you ship your fork. The realistic next twelve months as a DSAI career-switcher: what to build, what to read, and what to politely ignore.
