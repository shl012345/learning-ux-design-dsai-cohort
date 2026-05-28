---
title: "Prompting that gets useful output"
section: "working-with-ai"
order: 5
duration: "20 min"
difficulty: "beginner"
prerequisites: ["04-reading-docs"]
analogy: "Briefing a smart intern"
tags: ["ai-craft", "prompting", "fundamentals"]
summary: "Why short prompts disappoint, the five parts of a prompt that consistently produces useful output, and the single biggest leverage you have on AI quality — context."
---

Most cohort students prompt the way they'd type a Google search. They type a phrase. They hit enter. They get back something generic, shrug, and blame the model.

The model isn't the problem. The model is, by the standards of any reasonable employee, a brilliant new hire who started yesterday and knows nothing about your project, your data, your team, your past attempts, or what "good" looks like for you. When you give that employee a phrase and hit enter, what should you expect?

Useful prompting is *briefing*. You hand a task to a smart intern who has no context. The more of the context they need to do the job well, the more you have to give them up front.

## The five parts of a useful prompt

A prompt that consistently produces useful output has five parts. Not every prompt needs all five — but the prompts that disappoint are almost always missing several.

1. **Goal.** What do you want the output to *be*? A function, a paragraph, a SQL query, a critique of an idea?
2. **Audience.** Who is the output for? You, a colleague, an end user, an instructor?
3. **Constraints.** What must the output respect — length, language, library, file path, existing code style?
4. **Examples.** One or two short examples of what good looks like — even hand-waved ones. These move accuracy more than any other lever.
5. **Output format.** How should the answer come back — markdown, json, a single code block, prose, a numbered list?

A prompt that includes all five takes about ninety seconds longer to write than the keyword version and produces output that's five times more usable. The ratio is consistently in your favour.

## The biggest lever: context

Of the five parts, *constraints* and *examples* are where most prompts fall down — and the underlying gap is the same. The model can't see what's on your screen. It can't see your repo. It can't see the data you're working with. It can't see what you tried yesterday. It can't see your team's coding style.

Every bit of that context that you give the model, the output improves. The phrase to internalise: **give the model the context it can't infer.**

Here's a side-by-side. The same goal, the same model, two prompts.

**The keyword version:**

```
write a function to validate user emails
```

The output is a generic regex. It might work. It probably doesn't match the constraints you actually have.

**The briefed version:**

```
Write a Python function that validates user emails for our sign-up endpoint.

Context: we're using FastAPI with Pydantic v2 — the function should be usable
as a Pydantic validator. We already use the `email-validator` package elsewhere
in the codebase. We need to reject role-based addresses (postmaster@, admin@)
because of past abuse from automated sign-ups.

Example of code style in this repo:

    def normalise_phone(raw: str) -> str:
        ...

Return: just the function, with a one-line docstring. No explanation.
```

The output is a function you can drop into your code, in your style, that respects your team's existing dependency choices and your one weird business rule. The prompt is six times longer. The output is twenty times more useful.

> 💡 **A short rule that goes a long way.** Before you hit enter on a prompt, re-read it as if you were the smart-intern model. If you'd be confused about what to do, the model will be too. Fix the confusion in the prompt, not in the follow-up.

## Iterate, don't rewrite

The other reliable upgrade is iteration. A first prompt rarely produces the final output, and that's fine. The mistake is to scrap the prompt and start again. The fix is to *add* to the same conversation: "good, but tighten the docstring", or "good, but use the existing logger pattern instead of print".

Each follow-up rides on top of the context you've already given. Rewriting from scratch throws away that context and starts the briefing over.

## What this looks like in your week

Most of your prompts will still be quick — "what does this error mean?" — and that's fine. The briefed-prompt discipline is for the prompts where the output is going to land in your codebase, your README, or your cohort submission.

Pick one prompt a day where the stakes are slightly higher than usual. Spend the extra ninety seconds. Notice the difference. After a week, the discipline starts to apply itself.

## What's next

A more uncomfortable question than "how do I prompt well": *when should I be prompting at all?* The next lesson is about the modes where AI assistance compounds your learning and the modes where it quietly destroys it.
