---
title: "What sits around the model — vector DBs, queues, observability"
section: "shape-of-an-ai-app"
order: 11
duration: "25 min"
difficulty: "beginner"
prerequisites: ["10-notebook-to-service"]
analogy: "The orchestra around the soloist"
tags: ["systems", "vector-db", "queues", "observability"]
summary: "The model is the soloist; the supporting cast is what makes the performance reliable. A prose tour of vector databases, job queues, and observability — what each is for, when you actually need one, and the trap of adding all three before you need any of them."
---

The first weeks of your cohort give you the impression that the model is the whole app. By week ten you've discovered the model is roughly a tenth of the app, and that the *other nine-tenths* is what separates a demo from something a colleague can rely on.

This lesson takes the three most common supporting components — the ones you'll meet every time you read a real repo — and explains what each is for, when you actually need it, and the trap of adding all three on day one because the tutorial did.

![Diagram showing a central 'Model' box, with three supporting boxes — Vector Store, Queue, Observability — connected to it by labelled arrows.](/images/lesson-11-model-and-supporting-cast.png)

## Vector store — "give me things like this thing"

A vector store does one job: given a piece of text, find the most similar pieces of text in a collection. "Similar" here is semantic — *what it means*, not *which words appear*. A query for "complaint about delivery" should find documents that say "the package never arrived", even though no exact word matches.

You use a vector store when you want the model to answer questions about *your* data — your company's docs, your meeting notes, your support tickets. The classic flow:

```python
# 1. Ask the vector store for relevant chunks
chunks = vector_store.search(user_question, top_k=3)

# 2. Stuff them into the prompt as context
prompt = f"Using these notes: {chunks}, answer: {user_question}"

# 3. Call the model
answer = model.complete(prompt)
```

This pattern has a name — *retrieval-augmented generation*, or RAG — and it's the most common reason any production app reaches for a vector store.

**When you actually need one.** When the model needs to answer questions about specific content it wasn't trained on. If you're just doing general Q&A, you don't need one. If you're answering questions about your company's specific data, you do.

| Use case | Need a vector store? |
|---|---|
| "Translate this English to French" | No — model already knows French |
| "What's the weather like?" | No — needs a tool, not a vector store |
| "Summarise our team's standup notes from this week" | Yes — model needs to be given the notes |
| "What did the customer complain about in ticket #4521?" | Yes — model needs to be given the ticket |

## Queue — "this is going to take a while"

A queue exists so that slow work doesn't block fast work. The pattern: instead of the API doing the slow thing while the user stares at a loading spinner, the API puts the job on a queue, tells the user "we got your request, we'll let you know", and a separate worker picks up the job and processes it.

You meet a queue the first time a user-facing request takes more than two or three seconds. "Generate a 2000-word report" is a queue job. "What's the capital of France" is not.

```python
# Without a queue — user waits while it runs
@app.post("/generate-report")
def generate_report(req):
    report = slow_model.generate(req.topic)   # 90 seconds
    return {"report": report}

# With a queue — user gets an immediate response
@app.post("/generate-report")
def generate_report(req):
    job_id = queue.enqueue(slow_model.generate, req.topic)
    return {"job_id": job_id, "status": "processing"}
```

The user polls a separate endpoint, or gets emailed, or sees a notification, when the job is done.

**When you actually need one.** When at least one of your endpoints takes longer than the user is willing to wait — empirically, somewhere between two and five seconds. Add a queue when you notice it, not before.

## Observability — "what happened at 3 AM?"

Observability is the umbrella term for logs (what the service wrote down about itself), metrics (numeric measurements over time — request count, latency, error rate), and traces (the path a single request took through your system). You need at least the first one, ideally all three.

The reason isn't paranoia. The reason is that things will go wrong when you're not watching, and the difference between "service was broken for ten minutes" and "service was broken for ten hours" is whether somebody noticed.

A bare-minimum log setup looks like this:

```python
import logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

@app.post("/predict")
def predict(req: PredictRequest):
    logger.info(f"predict called, input length: {len(req.text)}")
    try:
        result = model.predict(req.text)
        logger.info(f"predict succeeded, returned: {result}")
        return result
    except Exception as e:
        logger.error(f"predict failed: {e}", exc_info=True)
        raise
```

Twenty extra lines across a small service. Worth a hundred times that the first time something breaks.

**When you actually need it.** From day one of any service that's deployed anywhere other people can reach. Logs are not premature optimisation.

## The trap of adding all three on day one

Here's the failure mode I see most often. Cohort student finishes a tutorial that uses RAG, a queue, and full observability. They start their own project. They install all three on the first day. They spend two weeks plumbing the infrastructure before they have any working feature to put on top of it.

The plumbing is hard. None of it is the actual product. After two weeks they're exhausted and the project is no further along than it would have been with none of the supporting cast and one working endpoint.

> The right order is the opposite. Start with the simplest possible service that does the thing — one endpoint, the model, no supporting cast. Get it working end-to-end. *Then* add the first supporting component the moment you can name a specific problem it solves. Need RAG? Only when "the model doesn't know about our docs" becomes a real complaint. Need a queue? Only when "the request takes 90 seconds" starts annoying real users. Need observability? Actually, that one you do add on day one.

The components are not virtuous in themselves. They are answers to specific problems. Add them when the problem arrives, not before.

## What this lesson is asking of you

Look at your current cohort project. For each of the three components — vector store, queue, observability — ask:

1. Is this component in my project?
2. If yes — can I name the specific problem it's solving?
3. If no — would adding it solve a specific problem I currently have?

If you have a component you can't justify, you have a clean-up opportunity. If you have a problem a component would solve, you have a sensible upgrade. Either is more useful than copying the architecture diagram from a blog post.

## What's next

You now have a picture of the shape. Section 4 covers what *catches you out* once the shape is in place: cost and latency, failure modes, and the judgement of when something is good enough to ship.
