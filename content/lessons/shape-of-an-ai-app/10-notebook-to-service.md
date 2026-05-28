---
title: "From notebook to service — why notebooks don't deploy"
section: "shape-of-an-ai-app"
order: 10
duration: "22 min"
difficulty: "beginner"
prerequisites: ["09-shape-of-a-modern-ai-app"]
analogy: "Your script is not a play until it's staged"
tags: ["systems", "deployment", "fastapi"]
summary: "Why the notebook is the wrong unit for a deployed thing, what an API actually is in plain language, and the smallest possible transformation that turns 'I have a working model' into 'someone else can use my model'."
---

You finished week three and you have a working model in a Jupyter notebook. You run the cell, you get a prediction, life is good. Then your instructor says "now expose it as an API so a colleague can call it from their app", and you don't know where to start.

The honest answer: the notebook is the wrong unit for the job. Not because it's bad — it's brilliant at what it does — but because the job is now different. This lesson is about *why* the notebook isn't deployable, *what* an API actually is in plain language, and the smallest possible move from one to the other.

## Why a notebook isn't deployable

Three reasons, in order of how often they bite people.

**1. It's stateful in ways nobody else can reproduce.** A notebook is a sequence of cells you ran in some order. The result depends on which cells ran in which order, what variables are in memory, and which library versions were installed when you ran them. Six months from now, even *you* won't reproduce the result reliably.

**2. It has exactly one user — you.** A notebook assumes a human is sitting in front of it, choosing which cells to run. A deployed thing assumes nobody is sitting in front of it; requests come in by themselves, at any time, and the system handles them without supervision.

**3. It has no contract.** A notebook is "whatever I happen to have computed today". A deployed service is "if you send me input shaped *this* way, I promise to return output shaped *that* way, and here's what happens when something goes wrong". The contract is what other systems rely on. Notebooks don't have one.

The fix is not "make the notebook bigger" or "tidy up the notebook". The fix is to rip the model code out of the notebook and put it behind an API.

## What an API actually is

The word "API" gets used to mean six things. The one we care about here is the simplest: a *contract*.

An API is a promise: *if you send me a request shaped like this, I'll send you back a response shaped like that*. Three parts to the promise:

| Part | What it means |
|---|---|
| **Inputs** | The shape of request you accept. "A JSON body with one field, `text`, which is a string" |
| **Outputs** | The shape of response you return on success. "A JSON body with one field, `prediction`, which is a number" |
| **Errors** | What you do when something goes wrong. "If `text` is missing, return HTTP 422 with a clear message" |

The contract is what makes the service callable by anyone — a frontend, a colleague's script, an automated test, a future you who's forgotten how the thing works. Without the contract you don't have an API; you have a notebook with extra steps.

## The smallest move from notebook to service

Here's the actual code. You start with this in your notebook:

```python
# Cell 4 in your notebook
model = load_my_model("model.pkl")
prediction = model.predict("the input text")
print(prediction)
```

The minimum FastAPI version that turns this into a callable service:

```python
# main.py
from fastapi import FastAPI
from pydantic import BaseModel
import joblib

app = FastAPI()
model = joblib.load("model.pkl")

class PredictRequest(BaseModel):
    text: str

class PredictResponse(BaseModel):
    prediction: float

@app.post("/predict", response_model=PredictResponse)
def predict(req: PredictRequest):
    result = model.predict(req.text)
    return PredictResponse(prediction=result)
```

About fifteen lines. Run it with `uvicorn main:app`. Visit `http://localhost:8000/docs` and you'll see a clickable form where you can test it. That's an API.

## What changed, and what didn't

The interesting question: what's *different* between the notebook version and the service version?

**The model code itself didn't change.** `model.predict(req.text)` is the same call as before.

**What changed:**

- **Input validation.** Pydantic's `PredictRequest` rejects malformed input automatically before your code sees it. If someone sends `{"text": 42}` instead of a string, they get a clear error back. The notebook would have crashed somewhere weirder.
- **A contract, written down.** `PredictRequest` and `PredictResponse` are the contract — they're literally code that describes the API shape. Anyone reading `main.py` knows what the service accepts and returns.
- **It's callable from anywhere.** Once running, anything that can make an HTTP request can use this — a frontend, your colleague's Python script, a curl command, a load test.
- **Auto-generated docs.** That `/docs` page is free; FastAPI generates it from the Pydantic models. Your colleague doesn't need to read your code to know how to call you.

The cost of the upgrade is about an hour the first time, twenty minutes the second time, five minutes the tenth time. The benefit is that the thing is now actually usable by people who aren't you.

## What this lesson is asking of you

Take any small model you've built in a notebook this term and put it behind a FastAPI service. Just one endpoint. Just the minimum. Get to the point where you can hit `/docs` in a browser and call your own model through the form.

Once that's working you've made the conceptual move that most cohort students take six weeks to make. The mechanical move — the actual code — is small. The mental move is the rest of it.

## What's next

The service you just built is the second box. Around it sit the other five we'll need to make it work in production. Lesson 11 takes the three you'll meet most often — vector store, queue, observability — and explains what each is for and when you actually need one.
