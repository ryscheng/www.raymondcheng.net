---
slug: open-source-in-the-ai-age
title: Open Source will win in the AI Age
description: "Open source in the AI age: an opinionated answer to what open source becomes once AI writes the code, and how it caches society's progress and gives rise to super-powered maintainers."
authors: [ryscheng]
tags: [popular, thoughts, open-source]
draft: false
---

_An opinionated answer to what open source becomes once the AI writes the code:
how it will grow in importance as the caching layer for technological
breakthroughs, and why a sea of solo open source developers with superior taste
will out-innovate their closed counterparts._

<!-- truncate -->

## What is open source once AI writes the code?

What does **open source in the AI age** look like once the machines write most of
the code? AI agents already write a growing fraction of the code in production
codebases, and that share only climbs. So the question sounds almost rhetorical:
if a model can generate any library you need on demand, why do we even need open
source libraries anymore?

_I think that intuition is exactly backwards._

Writing code was the expensive part. When it gets cheap, the bottleneck moves. The
hard question is no longer _can we build it_ but _what is worth building, and how
do we avoid everyone rebuilding the same thing_. That is what open source is for,
and it matters more in the AI age, not less.

My answer has two parts. They are different arguments, but they reach the same
conclusion: open source out-innovates closed.

**Depth.** A single developer with great taste, armed with AI, will out-build
entire teams. In the medium term, taste is the scarce input, and the people who
have it will produce more and better software than everyone else.

**Breadth.** Open source is how society caches its progress. Every published
library is a solved subproblem nobody has to solve again. In the long run, as
software teams go autonomous, that shared cache is the only thing that lets
exploration compound instead of being repeated in isolation.

(I've made [the parallel argument for data](/posts/network-intelligence)
elsewhere; here I'll focus on software.)

![Timeline: in the medium term, depth (the super-powered maintainer); in the long term, breadth (caching the search for what works); either way, open ecosystems out-innovate closed ones](./breadth-depth-timeline.svg)

## Depth: the super-powered maintainer

Give everyone the same coding agents, and taste becomes the only thing that
separates them. **A single developer with great taste will build a hundred great
libraries. A hundred developers with average taste will build a hundred mediocre
ones.** Same tools, wildly different output.

Here is why. When generating code is cheap, code is no longer the scarce input.
Judgment is. Knowing what to build, what good looks like, and which of a thousand
generated variations is worth publishing is the constraint. That judgment is
taste, and no agent supplies it.

This is not a bet on future models. It is already visible. Sindre Sorhus, one
developer, [maintains over 1,000 npm packages](https://sindresorhus.com/about)
that millions of projects depend on, and he did it before agents could carry the
plumbing. Automate the boilerplate, the tests, the release chores, and the triage,
and the ceiling for one person with taste rises sharply.

Picture a small number of developers with exceptional taste, each running an army
of agents, trading ideas and setting the direction of whole ecosystems. Fewer
hands, far more leverage, better libraries.

Who pays these people is a real question, and I've [written
separately](/posts/prosperous-software) about funding the maintainers everything
depends on. The point here is simpler: **the super-powered maintainer is coming,
and taste is the superpower.**

## Breadth: how society caches its search for what works

Open source is a **cache**. Publishing a working library caches a solved
subproblem so nobody, anywhere, has to solve it again. The global commons of open
source is society's stored answer to _what works_.

Without that cache, every developer re-solves the same problems alone: the same
bugs, the same incompatibilities, the same edge cases. Open source lets the whole
world explore in parallel and keep the wins. Taste, the depth argument, is what
keeps that search from being a blind, wasteful crawl.

Caching wins for a durable economic reason, and it holds even as AI gets cheap.
The cost of producing software is falling fast, but it never reaches zero, because
model inference has a real, recurring cost. **As long as storing a result is
cheaper than recomputing it, caching pays.**

This is already happening. Coding agents do what any good engineer does: they
install an existing dependency instead of re-deriving or vendoring the code. The
prompt is the easy part. The hard part is knowing which package is battle-tested,
which one holds up across real use cases and deployments. That is what the cache
stores: not raw code, which is now cheap, but proven code. The result is a surge
in open-source library installs.

![Combined monthly npm downloads for ten ubiquitous packages, rising from about 2.6 billion in mid-2024 to 5.9 billion by mid-2026, with the steepest climb in 2026](./npm-downloads.svg)
_Combined monthly npm downloads for ten ubiquitous packages (react, typescript, express, axios, and others). [Source: npm registry download API](https://api.npmjs.org/downloads/)_

Install volume for a basket of ten ubiquitous packages is up **69% year over
year**, steepest in 2026. One caveat: raw download counts include CI and
automation, so this is install activity, not distinct developers, and attributing
the rise to agents is my read, not proof. The direction is not in doubt.

Now extrapolate. When software teams go fully autonomous, the volume of
exploration explodes, and an open cache of what works is the only way those
discoveries compound across the world instead of staying locked behind closed
doors. Depth and breadth are different arguments. They point at the same outcome:
**open source out-innovates closed.**

## As software gets cheaper, open becomes the default

A second force pushes the same way, and it comes from the market rather than the
technology.

As software gets cheap to produce, people are predicting the **death of SaaS**, a
"SaaSpocalypse." The logic is simple. When a coding agent can rebuild your tool in
a weekend, buyers stop paying rent for it. a16z ran [an
episode](https://a16z.com/podcast/anish-acharya-is-saas-dead-in-a-world-of-ai/)
asking whether SaaS is dead in a world of AI, noting that "SaaS switching costs
are actually going down thanks to coding agents," and the
[headlines](https://www.forbes.com/sites/donmuir/2026/02/04/300-billion-evaporated-the-saaspocalypse-has-begun/)
are already declaring the collapse.

Follow the price. When software is cheap to produce and easy to substitute, its
price falls toward its cost, and tolerance for lock-in drops with it. Rent-seeking
gets harder.

That changes the release decision. **If software is hard to monetize anyway,
keeping it closed buys you almost nothing.** A proprietary license just guards a
shrinking rent. The rational move is to release in the open and capture
reputation, distribution, and contributions instead.

Falling production cost does not threaten open source. It feeds it. The same force
that ends easy SaaS rents pushes more code into the commons.

This is a directional prediction, not a law. Monetization does not vanish. Support,
hosting, proprietary data, and real value-added services still command a price. But
for the vast middle of software, the default tilts open.

## Why open ecosystems out-innovate closed ones

Combine the two mechanisms, super-powered maintainers and a shared cache, and the
conclusion is hard to avoid. **No closed organization out-innovates the entire
world working in parallel and keeping every result.**

Modern AI is the proof. The technology now writing our code was built in the open.
The Transformer, the architecture under every frontier model, was published in
2017 as "[Attention Is All You Need](https://arxiv.org/abs/1706.03762)." The labs
now racing to build closed models grew out of a culture that shared its core ideas
freely, on arXiv and at conferences.

The result is recursive. **AI is both a product of open out-innovating closed, and
the tool that accelerates the next round.** Open ideas built the thing now
supercharging open source, and that opening has only started.

## The bet: the best models stay universally available

One assumption holds up everything above.

**It works only if the best models stay universally available, not locked away.**
Open source out-innovates closed only while the most capable models stay within
reach of the people and agents building on them. Wall them off, and the open
ecosystem loses its engine.

So far the frontier has stayed reachable. Closed labs expose their best models
through APIs, and open-weight models track close behind, partly through
distillation: training a smaller model on a larger one's outputs. OpenAI has
[accused
DeepSeek](https://www.bloomberg.com/news/articles/2026-02-12/openai-accuses-deepseek-of-distilling-us-models-to-gain-an-edge)
of doing exactly this to catch up. That is an allegation, not a finding, but its
plausibility shows how hard the frontier is to seal. And AI is its own precedent:
the field moved fastest when research flowed freely.

What breaks the bet: frontier capability concentrating in a few hands and staying
locked. Then open stalls, and closed wins.

## An invitation

**Open source will win in the AI age.** It is how the world caches and compounds
its search for better software: driven in the medium term by developers with
superior taste, and in the long term by the need to share what autonomous systems
discover. If the best models stay open, no closed ecosystem keeps up.

That is a conviction, but still a bet on a future that has not arrived.

Tell me where I'm wrong. Publishing an idea so better ones can build on it is the
most open-source thing I can do.
