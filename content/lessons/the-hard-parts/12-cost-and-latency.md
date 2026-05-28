---
title: "Cost, latency, and the trade you make"
section: "the-hard-parts"
order: 12
duration: "20 min"
difficulty: "intermediate"
prerequisites: ["11-system-around-the-model"]
analogy: "Same-day delivery vs cheapest postage"
tags: ["systems", "judgement", "trade-offs"]
summary: "Every AI system buys speed with money and money with speed; you don't get both for free. The four levers you have, the questions your stakeholders actually care about, and how to make the trade-off explicit instead of accidental."
---

The first time you deploy a working AI service and watch real users hit it, two numbers will quietly start to matter. The first is how much each request costs you. The second is how long each request makes the user wait. These two numbers fight each other. You don't get to make both small at the same time.

Every meaningful AI system makes a trade between how fast and how cheap. Pretending you've avoided the trade just means you've made it badly. This lesson is about the four levers you have, the trade each one buys, and the rule of thumb that prevents most teams from wasting months optimising the wrong dimension.

## The two numbers that quietly start to matter

When your service goes from "I'm testing it" to "real users are hitting it", you'll notice two numbers showing up in conversations.

**Cost per request.** How much you pay your model provider each time the API gets called. Could be a tenth of a cent (small open-source model running locally), a few cents (a frontier hosted model), or a dollar (something that runs for a minute and uses a lot of tokens).

**Latency per request.** How long the user waits between hitting the button and seeing the answer. Hundred milliseconds is invisible. One second is noticeable. Five seconds is annoying. Twenty seconds is "did it break?"

Both of these are real numbers your stakeholders will eventually ask about. The honest answer is rarely "as small as possible" — it's "as small as it needs to be for the use case, given the trade-off".

## The four levers

You have four reliable ways to move cost and latency. Each one buys you in one dimension at the cost of the other.

| Lever | What it does to cost | What it does to latency |
|---|---|---|
| **Smaller model** | Down | Down |
| **Shorter context** | Down | Down |
| **Batching** | Down (per request) | **Up** |
| **Caching** | Down (on cache hit) | Down (on cache hit) |

Three of those look like wins on both axes — *smaller model*, *shorter context*, and *caching*. The catch is what each one costs you in *quality*.

A smaller model is cheaper and faster — and worse at hard tasks. A shorter context is cheaper and faster — and the model has less to work with. Caching is free on the second request and zero help on the first, and only works for queries that genuinely repeat.

Batching is the odd one out. It's the only lever that explicitly trades latency for cost: you wait until you have several requests, then send them as one, paying less per request but making each user wait longer. Useful in some contexts (background jobs) and disastrous in others (live chat).

## The questions stakeholders actually ask

Your manager, your product lead, your client — when they care about your service's performance, they ask two questions in some form:

1. **How much does this cost per user?** (Either per month, per request, per query — the unit varies, the question doesn't)
2. **How long does the user wait?** (Median latency, 95th-percentile latency, worst-case latency — also varies, also the same underlying question)

If you can't answer those two questions in numbers, you don't know your service well enough. Most cohort students discover this when their first deploy goes up and someone asks. The fix is to *measure* — log every request's cost and latency from day one, even crudely, even just in a flat file.

```python
import time

@app.post("/predict")
def predict(req: PredictRequest):
    start = time.time()
    result, cost_cents = model.predict_with_cost(req.text)
    elapsed = time.time() - start
    logger.info(
        f"predict | latency={elapsed:.2f}s | cost_cents={cost_cents:.3f}"
    )
    return result
```

After a week of real traffic, you'll have the data to answer both questions. Without it you're guessing, and you'll be wrong.

## The rule of thumb most teams learn the hard way

Optimise for *either* cost *or* latency first. Never both at once.

The reason is simple. The levers conflict. If you try to push both numbers down simultaneously, you'll constantly undo your own work — the change you made to drop cost will push latency up, and vice versa. You'll spend weeks, get nowhere, and lose track of what each individual change actually did.

The disciplined version: pick the dimension that matters most for your use case, optimise it hard, hold the other constant, and only revisit the second one once the first is in a place you're happy with.

| Use case | What to optimise first |
|---|---|
| Live chat with end users | Latency. Cost grows with users; latency loses you users |
| Batch report generation overnight | Cost. Nobody is watching; latency doesn't matter |
| Internal tool for your own team | Cost. Your team will tolerate slowness; the company won't tolerate the bill |
| Public free-tier API with viral potential | Cost, ferociously. One bad day costs you a year of runway |

> 💡 **The under-rated move.** Before you optimise either, ask: am I sure this matters at the *current* scale? Most cohort projects optimise for traffic they don't yet have. Three users a day doesn't need batching. Ten users a day doesn't need a cache. Premature optimisation is the most common time-sink in early projects.

## What this lesson is asking of you

For whatever you're currently building, write down two numbers — even guesses — for your expected cost per request and expected latency per request at the scale you actually expect. Then ask: which one matters more? If they conflict in three weeks, you'll know which to favour.

That single decision, made deliberately and early, is worth more than all the clever optimisation you might do later.

## What's next

Cost and latency are the predictable hard parts. The unpredictable hard parts are the failure modes — the surprising ways production AI systems break. Lesson 13 maps the four genres of failure you'll meet and the early signals that distinguish each one.
