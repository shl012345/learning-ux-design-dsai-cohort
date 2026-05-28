# Module 4 — Shipping it

**Time:** ~30 min · **Requires:** Modules 1–3 complete. You already have GitHub and Vercel accounts from earlier in the cohort.

## What you'll learn

You'll move the site from your laptop to a public URL. Two learning moments most cohort students under-appreciate:

1. **Build time vs runtime.** The site you're about to deploy doesn't run code on every request. Every page's HTML is generated once, when `next build` finishes. Vercel serves the resulting HTML to visitors. That's why it's fast on a free tier. It's also why a content change needs a redeploy to show up.
2. **Static generation and the Vercel free tier.** You'll see what "Hobby tier" gives you, what would push you off it, and why "push to git" is the entire deploy mechanism.

By the end you'll have a public URL and a working push-to-deploy loop.

## Class flow

### Step 1 — Commit everything you've built (5 min)

In your terminal at the repo root:

```bash
git status            # confirm what's changed across Modules 2 and 3
git add .
git commit -m "Module 4: scaffolded site, applied Stitch design, generated images"
```

If you don't yet have a GitHub repo connected, create one and push:

```bash
gh repo create your-name/learning-ux-design-dsai --private --source=. --remote=origin --push
```

(You can also do this through the GitHub website.)

### Step 2 — Connect Vercel to the repo (10 min)

1. Sign in at [vercel.com](https://vercel.com) using your GitHub account. The first sign-in installs the Vercel GitHub app.
2. Click **Add New Project** on the Vercel dashboard.
3. Pick your repo from the list. For a private repo, you may need to authorise Vercel for that specific repo.
4. Vercel auto-detects the Next.js framework. The build command (`next build`), output directory (`.next`), and install command (`npm install`) are pre-filled.
5. Click **Deploy**. Vercel clones the repo, runs `npm install` and `next build`, and serves the resulting static files from a global CDN.

About 90 seconds end-to-end on the first build.

### Step 3 — Open the live URL (2 min)

Vercel gives you a URL like `learning-ux-design-dsai-abc123.vercel.app`. Open it. Confirm:

- Landing page lists your five sections
- Each lesson page renders with images, your Stitch design language, and syntax-highlighted code
- Dark mode toggle works
- A `/build/01-designing-with-stitch` URL renders the first build-diary entry

If something's broken in production but worked locally, the build log on Vercel will tell you why. Common causes: a broken `prerequisites` slug, or a missing image referenced in a way that fails the build (the validator is set to warn-not-fail, but check the log).

### Step 4 — Push a tiny change and watch it deploy (5 min)

Edit any lesson — fix a typo, change a word. Then:

```bash
git add .
git commit -m "fix typo in lesson 7"
git push
```

About 90 seconds later, the change is live. This is the deploy loop. No deploy commands. No manual upload. No FTP. Push to git is how you deploy.

### Step 5 — Notice what's not happening (5 min)

This is the build-time-vs-runtime moment. While Vercel was building, this is what it actually did:

1. Cloned the repo.
2. Ran `npm install`.
3. Ran `next build`. This is where the markdown files were read, the frontmatter parsed, the body compiled, and the HTML written.
4. Uploaded the HTML to Vercel's global CDN.
5. Pointed your URL at the new HTML.

When a visitor opens your URL, none of those steps run again. The visitor just receives the HTML file that step 4 produced. The markdown files, the JSON config, the React components — none of them exist at runtime in any meaningful sense. They were used during step 3 and then flattened into HTML.

That's why:

- A content change requires a redeploy. The HTML was already produced. The new markdown won't be read until the next build.
- The site is fast even on the free tier. There's no server-side work. Vercel just hands out files.
- You don't need a database. There's no runtime data to fetch.
- You could move to any other static host (Netlify, Cloudflare Pages, GitHub Pages) without changing a line of code.

## (Optional) Step 6 — Custom domain (~15 min, including DNS propagation)

If you want a domain like `ux-dsai.yourdomain.com`:

1. Buy a domain at any registrar (Namecheap, Cloudflare Registrar, Porkbun).
2. In the Vercel dashboard, go to your project's Domains tab and add the custom domain.
3. Vercel shows you the DNS records to add at your registrar.
4. Add the records. Wait 5–60 minutes for propagation.
5. Vercel automatically issues an SSL certificate via Let's Encrypt.

Total cost: the domain registration (around $10–20 per year). The SSL is free. The DNS is free. The hosting is free.

## Defend-It questions

1. Why does a typo fix require a `git push` and a 90-second rebuild? Walk through what would have to change for the site to update without a rebuild. Why don't we do that?

2. The Vercel Hobby tier gives you 100 GB of bandwidth per month. With each page averaging around 50 KB compressed, how many page views does that buy you? When would you actually hit the limit?

3. If Vercel announced tomorrow that the free tier was ending, what would you need to do to move the site to Netlify or Cloudflare Pages? Estimate the work in minutes.

## You're done

That's the whole build path. From planning files in Module 1 to a live URL now.

What you walk away with:

- A working public site you built end-to-end
- A reusable workflow you can apply to any future content-driven site
- Four transferable craft skills: prompt-driven scaffolding, Stitch design discipline, image management via a manifest, push-to-deploy

## What's next

You've finished the build path. If you want to fork this whole template for a subject of your own, see [`FORK.md`](../../FORK.md) at the repo root. Eight steps. You can be live with your own learning site by the end of a weekend.

To revisit any of the modules:

- [Module 1 — Planning files](../module_01_planning_files/README.md)
- [Module 2 — Scaffolding from the brief](../module_02_scaffolding/README.md)
- [Module 3 — The visual layer](../module_03_visual_layer/README.md)
- Module 4 — Shipping it (you are here)

## See also

- [Build-diary entry 04](../../content/build-diary/04-deploying-to-vercel.md) — full reflection on the deployment, free-tier numbers, why-not-Netlify reasoning
- [Build-diary entry 05](../../content/build-diary/05-content-config-code-separation.md) — the architectural argument, including the build-time-vs-runtime callout
