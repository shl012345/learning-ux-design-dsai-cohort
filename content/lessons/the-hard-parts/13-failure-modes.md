---
title: "Failure modes and how to spot them"
section: "the-hard-parts"
order: 13
duration: "22 min"
difficulty: "intermediate"
prerequisites: ["12-cost-and-latency"]
analogy: "How a kitchen fails versus how a factory fails"
tags: ["systems", "judgement", "ops"]
summary: "Production AI systems fail in genres — silent degradation, distribution drift, partial outage, cost runaway. The taxonomy of failures you'll meet, the early signals that distinguish each, and the rule that catches most of them before users do."
---

When a traditional web app breaks, it usually breaks loudly. A 500 error appears. A stack trace gets logged. A user complains. The fix flow is well-understood: read the trace, find the bug, ship the patch, breathe.

AI systems break in a wider range of ways, and several of those ways are quiet. The model returns a plausible-looking answer that's actually worse than yesterday's. The input shape shifts and your system handles it without complaining, but the predictions decay. The vector store falls over and your service keeps responding with confident-sounding nonsense. A bug in your retry logic calls the model a thousand times in an hour and you only notice when the bill arrives.

This lesson maps the four genres of failure you'll meet, the early signal each one leaves, and the cheap alarm that catches it.

## The four genres

| Genre | What it looks like | Why it's dangerous |
|---|---|---|
| **Silent quality degradation** | Model outputs become plausible-but-worse over weeks | No traceback, no error log — only a slow drift in user satisfaction |
| **Distribution drift** | Inputs in production look different from inputs at training time | Model wasn't trained for the new shape; predictions get unreliable |
| **Partial outage** | One component (vector store, queue) is down but the API is up | System "works" but returns garbage; HTTP 200 with bad content |
| **Cost runaway** | Something calls the model in a loop; you find out from the bill | Often a six-hour window between the bug and your noticing |

## 1. Silent quality degradation

The model provider deploys a quiet update to their service. Your prompts haven't changed. Your code hasn't changed. But the outputs are subtly different — perhaps slightly more verbose, perhaps slightly less specific, perhaps just *worse* in a way your users can't quite articulate. You won't see anything in the logs. The first signal is usually a drip of complaints two weeks after the change.

**Early signal.** A quality metric you track over time — a satisfaction score, a "did this answer your question?" thumbs-up rate, an internal eval suite. The drop shows up there before users start complaining.

**Cheap alarm.** A "golden examples" suite — a small set of "this is what a good answer looks like for this input" pairs that you re-run weekly and compare to baseline. Catches drift the first week it starts, not the month it becomes a problem.

## 2. Distribution drift

Your model was trained on inputs from January. Six months in, the inputs in production look meaningfully different. New product launched, new user demographic arrived, news cycle shifted. The model isn't broken — it's just being asked questions outside the distribution it was trained for, and it's quietly less good at them.

**Early signal.** Track summary statistics of incoming inputs — length, language mix, topic clusters. When the distribution shifts, the stats move first; the quality moves second.

**Cheap alarm.** A weekly report that shows "inputs this week" versus "inputs at training time" along three or four dimensions. When something drifts more than a threshold, page someone to look.

## 3. Partial outage

The vector store is down. The model is up. The API receives the request, asks the vector store for context, gets nothing back, sends the empty context to the model, and the model returns a confident answer based on no relevant data. From the user's point of view: the system responded with garbage. From the monitoring's point of view: HTTP 200, all green.

**Early signal.** Per-component health: not just "is the API up", but "is each component the API depends on returning sensible results".

**Cheap alarm.** Per-component health checks the API runs every minute, separately from the user-traffic monitoring. If the vector store fails the health check, alert and degrade gracefully — return an error to the user rather than a confident wrong answer.

```python
@app.get("/health")
def health():
    components = {
        "model": model_is_responding(),
        "vector_store": vector_store_is_responding(),
        "queue": queue_is_processing(),
    }
    overall = all(components.values())
    return {"ok": overall, "components": components}
```

## 4. Cost runaway

Somewhere in your code, there's a retry loop. Yesterday it retried twice on failure, as designed. Today, a small change means it retries indefinitely. Or your test suite kicks off ten thousand model calls because of a typo. Or a malicious user finds an endpoint that doesn't rate-limit and starts hitting it. Whatever the cause, your bill triples between Sunday and Monday.

**Early signal.** A real-time cost-per-hour metric, plotted against the previous week as a baseline.

**Cheap alarm.** A hard cost ceiling per hour — if you exceed it, alert immediately. Most model providers will let you set this; if yours doesn't, write your own check against your usage logs.

> Cost runaway is the failure mode that scales fastest from "annoying" to "career-affecting". The other three give you days. This one gives you hours. If you build only one alarm, build this one.

## The rule that catches most of them

Every production AI system needs a small "this is what good output looks like" sample suite that you re-run automatically, on a schedule, and compare to baseline. Twenty examples. Five minutes to run. Catches silent quality degradation, distribution drift indirectly, and any partial outage that changes the outputs.

The suite is not the same as your unit tests. Your unit tests prove the code does what it was written to do. The golden suite proves the *outputs* are still what users would consider good — a question your unit tests can't answer because the model is non-deterministic and the right answer is a judgement call.

The suite costs about a day to set up the first time. After that, it pays for itself in the first incident it catches early. Most teams discover this after the first incident it would have caught and didn't.

## What this lesson is asking of you

Pick one of the four genres and write down, for your current project, the cheap alarm you'd add for it. Don't add the alarm — just write down what it would look like. The act of specifying it forces you to imagine what the failure would look like, which is half the work.

You can build the alarm later. The hard part is naming the failure you're defending against.

## What's next

The last lesson in this section covers the judgement call every project eventually hits: *is this good enough to ship?* The two ditches projects fall into, the three questions that move you off the fence, and the practice that makes the decision calm.
