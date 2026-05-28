---
title: "Deploying to Vercel"
section: "build-diary"
order: 4
duration: "10 min"
difficulty: "beginner"
prerequisites: ["03-the-markdown-pipeline"]
analogy: "Pushing the manuscript to the printer"
tags: ["build-diary", "vercel", "deployment", "ci-cd"]
summary: "From local development to a live URL on Vercel's free tier — and the reasoning behind the free tier choice."
---

> 📝 **Note:** This entry will be revised once the actual deployment has been completed, with the real screenshots of the Vercel dashboard, build logs, and live URL.

The last step. We have a working application running locally. We have a private GitHub repo. We need a public URL that anyone with a link can visit.

This entry documents how the site moved from local development to live deployment on Vercel's free Hobby tier. It also makes the case for *why* the free tier is enough for a project like this — not because it's cheap, but because it's the right size of hosting for the size of the problem.

## Pushing the manuscript to the printer

When a manuscript is ready, the author hands it to the printer. The printer takes care of the physical production — paper, ink, binding, distribution. The author doesn't have to know how an offset press works to publish a book; they just have to deliver a manuscript in the right format.

Vercel is the printer. Push your code to GitHub in the right format (a Next.js app); Vercel handles the rest — building, hosting, distributing across a global CDN, issuing SSL certificates, providing the URL. You don't have to know how their infrastructure works. You just push.

This is the value of "managed hosting" — the operational complexity disappears. For most learning sites, you should never see a server, configure a load balancer, or renew an SSL certificate manually. Vercel does all of it.

## The GitHub repo as single source of truth

Before connecting Vercel, the GitHub repo needs to be the canonical version of the project. All the content lives there. All the code lives there. Anything not in the repo doesn't exist as far as the production site is concerned.

This is a deliberate constraint. It means:

- **No "live editing in production"** — every change is a commit
- **Full version history** — every word of every lesson, every line of every component, traceable through git log
- **Easy rollback** — revert a commit, push, the site is back to the previous state
- **Multiple authors possible** — pull requests, code review, approval flow, all standard
- **Easy to fork** — `git clone` and you have the entire project, ready to build

For a learning site that students will fork (see `FORK.md`), this matters. The repo is the artifact.

## Connecting Vercel to the repo

The actual click-by-click flow:

1. **Sign in to Vercel** at `vercel.com` using your GitHub account. The first sign-in installs the Vercel GitHub app, which gives Vercel read access to whichever repos you authorise.
2. **Click "Add New Project"** on the Vercel dashboard.
3. **Pick the repo** from the list. For a private repo, you may need to authorise Vercel for that specific repo.
4. **Vercel auto-detects** the Next.js framework and pre-fills the build command (`next build`), output directory (`.next`), and install command (`npm install`).
5. **Click "Deploy"**. Vercel clones the repo, runs `npm install` and `next build`, and serves the resulting static files from a global CDN. About 90 seconds end-to-end on the first build.

Done. Vercel gives you a URL like `learning-ux-design-dsai-abc123.vercel.app`. That's the live site.

## What happens on every push

Once Vercel is connected, the workflow is:

1. **You push to a branch.** If it's `main`, Vercel produces a *production* deploy that goes to the canonical URL. If it's any other branch, Vercel produces a *preview* deploy with its own unique URL.
2. **Build runs in 60–90 seconds.** Vercel installs dependencies, runs `next build`, runs your validation scripts (we have a frontmatter checker that fails the build if any `.md` file is malformed), and stores the result.
3. **The new version goes live.** Production URL points at the new version; preview URLs are shareable.

The preview URLs are genuinely useful — share one with a friend before merging, get feedback, iterate. Each pull request gets its own preview URL automatically. Beats explaining "what the changes are" in chat by orders of magnitude.

## Vercel free tier (Hobby) — what you get

The Hobby tier is generous for a learning site:

- **100 GB bandwidth per month.** A typical lesson page is ~50 KB compressed. That's 2 million page views per month before you'd hit the cap.
- **6,000 build minutes per month.** Each build is 60–90 seconds. You'd need to build 4,000 times in a month to run out.
- **360 GB-hours of provisioned memory, 4 CPU-hours of active CPU, and 1 million function invocations per month.** Static sites use almost none of this — these matter only if you add API routes or server-rendered pages.
- **Unlimited preview deploys.** Every push to every branch gets one.
- **Custom domains** with automatic SSL. You can connect `ux-dsai.swarup.com` (or whatever) for free.
- **Global CDN** — content served from data centres close to the user, automatically.

For comparison, equivalent self-hosted infrastructure would cost about $15–30/month on a small VPS, plus your time managing it. The Hobby tier is the right size for a project of this scope.

## When the free tier wouldn't be enough

To be honest: a few cases push you off Hobby:

- **Heavy traffic** — sustained daily traffic of 10,000+ visitors might push past the bandwidth cap (depending on page sizes). Then the Pro tier ($20/month) is the next step.
- **Commercial use** — Vercel's terms restrict Hobby to non-commercial projects. If the learning site starts charging or running ads, Pro is required.
- **Long-running build steps** — if your build takes 10+ minutes (large repos, expensive image processing), you might run out of build minutes on a busy month.
- **Team collaboration** — Hobby is for individual accounts. Multiple authors with separate access need a Team plan.

For this project — a private learning site, no ads, low traffic, short builds, single author — none of those apply. Hobby is right.

## Why Vercel and not Netlify or Cloudflare Pages

A fair question. The honest answer: **all three would work; Vercel was the cleanest choice for Next.js specifically.**

- **Netlify** is excellent. The free tier is similar. The Next.js support is good but not first-party.
- **Cloudflare Pages** has the best free-tier limits. Next.js support has improved but historically lagged.
- **Vercel** built Next.js. Their integration is by definition first-party. Edge cases are handled correctly because the same team built both pieces.

Because this codebase is intentionally portable (no Vercel-locked features), switching from Vercel to Netlify or Cloudflare Pages is a 10-minute change if it ever becomes desirable. Vercel was picked for convenience, not commitment.

## Adding a custom domain

Optional, but easy. To connect, say, `ux-dsai.swarup.com`:

1. **Buy the domain** from any registrar (Namecheap, Cloudflare Registrar, Porkbun — pick one)
2. **In the Vercel dashboard**, go to the project's Domains tab and add the custom domain
3. **Vercel shows you the DNS records** to add at your registrar
4. **Add the records, wait 5–60 minutes** for DNS propagation
5. **Vercel automatically issues an SSL certificate**

Total cost: the domain registration itself (~$10–20/year). The SSL is free, the DNS is free, the hosting is free.

## What this enables

With deployment in place, the development loop is:

1. Edit a `.md` file in your editor
2. `git push`
3. 90 seconds later, the change is live

That's it. No deploy commands, no manual uploads, no FTP. Push to git is the deploy mechanism. This is what "modern web hosting" means in 2026 — and it's worth pausing to appreciate how much complexity has been absorbed by tools like Vercel and how recently this experience was unavailable to anyone but professionals.

## What's next

You've now seen the four mechanical steps: Stitch designed it, Antigravity scaffolded it, the markdown pipeline rendered it, Vercel deployed it. Entry 5 closes the loop by asking *why this architecture* — why the site keeps content, configuration, and code in three different file types, and what Next.js actually does with each at build time.
