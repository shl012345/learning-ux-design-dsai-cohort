---
title: "The 'good enough to ship' judgement"
section: "the-hard-parts"
order: 14
duration: "18 min"
difficulty: "intermediate"
prerequisites: ["13-failure-modes"]
analogy: "The newspaper deadline"
tags: ["judgement", "shipping", "trade-offs"]
summary: "The hardest single skill in working software is knowing when to stop. The two failure modes (shipping too early, shipping never), the three questions that move you off the fence, and the practice that converts 'should we ship?' into a calm conversation rather than a fight."
---

Most cohort projects fall into one of two ditches.

Ditch one: shipped before it should have been. Demoed to the cohort, fell over in front of everyone, the person who built it goes quiet for a week. Ditch two: polished forever. Never demoed. Never used. By week thirteen it's still being "almost ready" and no one's ever pressed the button.

The judgement that keeps you out of both ditches is the hardest single skill in working software, and it doesn't come from any tutorial. It comes from making the call wrong a few times, noticing why, and developing a small set of questions that move the decision from "vibes" to "checklist".

![A simple two-axis chart with 'too early' on the left, 'too late' on the right, and a narrow 'ship here' zone in the middle.](/images/lesson-14-ship-zone.png)

## Why the call is hard

The reason "is this good enough to ship?" is genuinely hard is that the answer is *almost always*: it depends. It depends on who the user is, what the rough edges are, how reversible the decision is, what the cost of getting it wrong is, whether you'll get fast feedback or slow feedback.

The trap is to either over-weight or under-weight any of those. Over-weight "what could go wrong" and you never ship. Over-weight "let's just ship it" and you fall over publicly. The good engineers I've worked with don't have a faster instinct for the call; they have a more reliable *process* for making it.

## The three questions that move you off the fence

When you're stuck between "this needs more work" and "this is ready", these three questions will usually point at the answer.

**1. What's the worst that happens if a user hits the rough edge?**

If the worst is "they see a confusing error message and try again", you're probably fine to ship. If the worst is "we lose their data", you're not. If the worst is "the model says something embarrassing in front of a paying customer", it depends entirely on who the customer is and how forgiving they'll be.

The question forces you to be specific about the failure rather than vague. "It might break" is unactionable. "If they upload a file larger than 10MB, the request times out and they lose their work" is debuggable. You can either fix it, accept it, or build around it.

**2. Can we fix the rough edge within an hour of someone telling us?**

A bug you can fix in an hour is a different beast from a bug that takes a week. The fix-time determines the size of the risk. If you can hotfix fast, you can ship earlier — the cost of being wrong is small. If a fix requires a database migration that takes three days, the bar for shipping is much higher.

This question is what changes between "MVP that we'll iterate on" and "release we have to get right the first time". Fast fix → low bar. Slow fix → high bar.

**3. Is anyone actually waiting for this?**

If a real person is blocked on you shipping — a teammate who needs the endpoint to build their part, a stakeholder who's been promised the demo, a customer with a deadline — that pulls the decision toward ship. Their blocked time is a real cost; your perfectionism doesn't outweigh it.

If nobody is waiting, you can take an extra day. But notice when "nobody is waiting" becomes a permanent state — that's the *polished forever* ditch.

## The two failure modes named

> 💡 **Ship too early** when: the rough edge is severe, the fix is slow, and nobody specific is waiting. You're shipping because you're tired or anxious, not because the time is right.
>
> 💡 **Ship never** when: the rough edge is mild, the fix is fast, and someone is waiting — but you keep finding "one more thing" to polish. You're not shipping because you're afraid, not because the work isn't ready.

Both ditches feel like virtue from the inside. Ship-too-early feels like courage. Ship-never feels like craftsmanship. The questions above are how you tell the feeling apart from the reality.

## The under-rated practice: a written ship checklist

The single thing that converts "should we ship?" from a fight into a calm conversation is a written checklist your team agreed on *before* the moment of decision. Not in the moment. In a calm meeting two weeks earlier.

A minimum checklist might look like:

- [ ] Core happy-path tested end-to-end with real data
- [ ] All known error cases produce a user-friendly message, not a stack trace
- [ ] Logs are in place for every meaningful action
- [ ] The "good output" sample suite from lesson 13 is set up
- [ ] The cost-per-request hard limit is set
- [ ] At least one person other than the author has used it without coaching

Eight items. Each one is binary. The list takes ten minutes to walk through at decision time.

The checklist isn't a magic formula. It's a way to convert the decision from "do I feel ready?" to "is each of these items true?" The first version is rough. After three or four shipping cycles, the list will be tuned to your team's actual failure patterns.

![A simple checklist mock-up with five items ticked off and one unticked, highlighting the item that's blocking the decision.](/images/lesson-14-ship-checklist.png)

## What this lesson is asking of you

Two things.

First: when you next face a "should we ship?" decision, walk through the three questions out loud, with whoever's making the decision with you. Even if you only walk through them in your own head, do it out loud. Saying them changes them.

Second: draft a four-item shipping checklist for your current cohort project. Not for everything you might ever ship — just for this one project. Four items you'd want to be true before pressing the button. Stick it in the README. Update it after each shipping cycle based on what you learn.

The checklist won't make the hard calls for you. It will make them calmer.

## What's next

Section 5. The cohort is over (or will be soon). The next lesson is about turning what you've learned into a teaching artifact — partly to consolidate, partly because the most reliable way to know whether you've learned something is to teach it.
