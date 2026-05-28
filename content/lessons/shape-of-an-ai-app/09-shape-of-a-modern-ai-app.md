---
title: "The shape of a modern AI-powered app"
section: "shape-of-an-ai-app"
order: 9
duration: "25 min"
difficulty: "beginner"
prerequisites: ["08-what-production-means"]
analogy: "A theatre — what's onstage, backstage, in the box office"
tags: ["systems", "architecture", "fundamentals"]
summary: "The seven boxes that make up almost every AI-powered app in 2026 — frontend, API, model, vector store, queue, logs, deploy — and how they talk to each other. A reading-tour, not a build-tour."
---

By week six of your cohort you've built each piece. A small FastAPI service. A Postgres or SQLite database. A call out to Ollama or OpenAI. Maybe a quick frontend. Each one made sense on its own.

What didn't make sense — and won't, until somebody draws it for you — is how the pieces add up into the whole thing that gets deployed and used by other people. This lesson is that drawing. The seven boxes that almost every AI-powered app in 2026 is built from, and the arrows between them.

This is a reading-tour, not a build-tour. The goal isn't for you to construct this — you'll do that in your cohort lessons. The goal is for you to *see* it the next time you open someone else's repo.

![A diagram showing seven labelled boxes — Frontend, API, Model, Vector Store, Queue, Logs, Deploy — connected by arrows showing the request flow.](/images/lesson-09-seven-boxes.png)

## The seven boxes

A working modern app is almost always a stage with these seven boxes on it. Some apps have more. Almost no production app has fewer.

**1. Frontend.** The thing the user sees and clicks. A web page, a mobile screen, a chat window inside another app. Its job is to take the user's intent (a question, a click, a form submission) and turn it into a request the API can understand.

**2. API.** The contract layer. Receives requests from the frontend, validates them, decides what to do, calls out to the model and other components, takes the results, and returns a response in a shape the frontend expects. In your cohort this is usually FastAPI.

**3. Model.** The thing that does the inference. Could be a hosted LLM (OpenAI, Anthropic), a local model (Ollama), a small classifier you trained yourself, or some combination. To the API, the model is "a function I can call with some text, that returns some text".

**4. Vector store.** Where "semantic memory" lives. The API can ask: *give me the documents most similar to this query*. The vector store returns them; the API stuffs them into the prompt; the model uses them as context. Postgres with `pgvector`, or dedicated stores like Chroma or Pinecone.

**5. Queue.** For work that takes longer than a user wants to wait. Instead of the API doing the slow thing while the user stares at a loading spinner, the API puts the job on a queue and tells the user "we'll let you know". A separate worker picks the job up, does it, writes the result somewhere.

**6. Logs.** Where the app writes down what it just did, so a human can debug it later. Every box writes to the logs. The logs are the *only* way you can answer "what happened at 3 AM" once the moment is gone.

**7. Deploy.** The box that brings the other six into existence. The configuration, the deploy pipeline, the place the code runs. Vercel for the frontend; Render or Fly or Railway for the API; the model and vector store usually live on a hosted service.

## Tracing one request

A user opens the app and types "what was the third bullet in last week's meeting notes?". Here's what happens:

```
User → Frontend → API → Vector store → Model → API → Frontend → User
```

1. **Frontend.** Takes the question. Wraps it in an HTTP request. Sends it to the API.
2. **API.** Receives the request. Validates the question is a string and not empty.
3. **Vector store.** API asks: "give me the most relevant chunks of last week's meeting notes." Vector store returns three chunks of text.
4. **Model.** API asks: "given these three chunks as context, answer the question." Model returns an answer.
5. **API → Frontend.** API wraps the answer in a response. Sends it back.
6. **Frontend → User.** Displays the answer.

Every hop is a place something can go wrong. The frontend could send a malformed request. The vector store could return nothing relevant. The model could hallucinate. The API could time out on the slow model call. The user could close the tab mid-request.

> A useful diagnostic when something breaks in someone else's repo: which box is failing? Once you can name the box, the fix is almost always localised. "It's broken" is unactionable. "The vector store is returning empty results for valid queries" is debuggable.

## What you should expect to see in a real repo

When you open a small-to-medium production repo, you should expect to find — in roughly this layout:

- A `frontend/` or `app/` folder for the UI
- An `api/` folder with route handlers and validation schemas
- A `core/` or `services/` folder with the model-calling logic
- A `db/` or `data/` folder with migrations and vector-store setup
- A `workers/` or `jobs/` folder if there's a queue
- A `deploy/` or `infra/` folder with configuration
- Logs going somewhere — to stdout, to a file, to a hosted service

Each folder maps to one or two of the seven boxes. When you read a new repo, identifying which folder is which box is the *shape pass* from lesson 3.

## What this lesson is asking of you

Two small things.

First: next time you open a cohort project, pause and identify which of the seven boxes each folder corresponds to. If a folder doesn't map to a box, ask what role it's playing. There's almost always one.

Second: when you build your own small project this term, *draw the seven-box diagram for it first*. Even if your project only uses four of them. The drawing forces you to make decisions you'd otherwise discover halfway through coding.

## What's next

Lesson 10 takes the second box — the API — and explains in plain language why a Jupyter notebook can't be one, and what the smallest possible move is from "I have a model that works" to "someone else can call my model".
