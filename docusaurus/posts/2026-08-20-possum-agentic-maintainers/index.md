---
slug: possum-agentic-maintainers
title: "POSSUM: Agentic Maintainers for the World's Most Critical Software"
description: "A proposal to fork the world's most economically valuable open source packages and maintain them with agents, so a critical vulnerability gets a patched package in hours instead of months."
authors: [ryscheng]
tags: [projects, security, open-source, popular]
draft: true
---

**POSSUM** (Parallel Open Source Software Universe Maintainer) is a proposal to fork the open source packages the world's economy actually runs on, maintain them with agents, and serve them through a drop-in registry mirror. When a critical vulnerability lands, a patched package should exist in hours, not whenever an unpaid volunteer gets to it after work. This post covers how we would pick which packages to fork, what an agent is allowed to ship on its own, and why this has to be a public commons rather than another security product. Nothing is built yet. We are looking for people to build it with us.

<!--truncate-->

## The registries never got a distro layer

Daniel Stenberg has maintained curl for nearly three decades. Before AI, the project received [roughly one security report per week](https://cybernews.com/security/curl-bug-bounty-ai-security-reports-daniel-stenberg/). In 2025 that became one every 48 hours. By June 2026 it was one every 18 hours, and unlike the slop wave of early 2025, most of them are now technically accurate.

Finding bugs got cheap. Fixing them did not. Stenberg puts the asymmetry plainly: it is cheap to run a scan and turn up thousands of issues, and complicated to get an engineering team to work through them. His warning to the rest of us is that everyone will have to upgrade faster, release faster, and patch more.

That work lands on volunteers. [Census III](https://www.linuxfoundation.org/research/census-iii), the Linux Foundation and Harvard study of what companies actually depend on, found that many of the most widely deployed libraries are maintained by only a handful of contributors.

We have solved this before, for a different ecosystem. Debian, Red Hat, and every other Linux distribution run a downstream maintenance layer: people who are not upstream, who carry patches, who backport the minimal security fix into the exact version they shipped, and who publish on their own schedule. Debian's [security FAQ](https://www.debian.org/security/faq) has a dedicated entry for users who look at their version number and think they are still vulnerable, because the fix went in without the version bump.

npm, PyPI, and crates.io never got that layer. Code goes from the author's laptop to your production build with nobody in between. No downstream maintainer, no security team, no backport policy. Not because nobody noticed, but because a distro layer is paid humans reading diffs, and paid humans do not scale to a million packages.

Agents do.

## Bunny: ranking packages by the economy they carry

"Fork everything" is not a plan. "Fork what matters" needs a definition of matters, and the honest state of the art is that we do not have a good one.

Download counts are the usual proxy and they are close to noise: CI runs, mirrors, bots. Census III is the most careful attempt so far, built on 12 million observations of libraries running in production at more than ten thousand companies, and its authors say directly that the report cannot claim which packages are most critical, only which are most widely used.

**Bunny**, a project we are building at [OSO](https://www.opensource.observer/), comes at the gap from the other end. It scrapes the web for JavaScript bundles, decompiles them, and extracts which packages are present in code that is actually shipped to users. Once you can attribute a package to the products running it, you can attribute it to the businesses behind those products, and rank by their market cap.

That answers a different question than how many machines downloaded this. It asks how much of the economy would notice if it broke.

POSSUM's selection function falls out of it: fork where economic value is high and maintenance capacity is low. Our measurement study is still running, so we have no numbers to publish yet. For now the method is the claim.

## How POSSUM works

POSSUM maintains a fork of every package the ranking selects, with agents doing the maintenance. Not a curated catalog of a few thousand. A universe. This is the [super-powered maintainer](/posts/open-source-in-the-ai-age) argument taken to its literal conclusion.

[image: architecture diagram, AutoDapp style. developer -> POSSUM mirror -> agent maintainer fleet -> forked package universe, with a side arrow for upstream PRs. Needs to be drawn and committed to the post directory.]

You consume it by pointing your package manager at our mirror:

```
npm config set registry https://registry.possum.dev
```

That one line is the whole integration, and the mirror is why it works. Most of your real exposure is transitive: the vulnerable copy three levels down, pulled in by something you never chose. Publishing renamed packages like `@possum/lodash` would leave all of that untouched, and would look a great deal like typosquatting while doing it. A mirror resolves the entire tree, including the parts you cannot see.

Same names, same versions, different bits. That is the uncomfortable property, and it is also precisely what Debian does. It only works if you can check: every POSSUM build is reproducible, the diff against upstream is published before the package is installable, and every artifact carries a signed attestation. Builds are tagged so you always know what you are running (`4.17.21+possum.1`).

Fixes go upstream too. They just do not sit on the critical path. A patch offered to a maintainer who is on holiday, burnt out, or gone is not a security response, it is a hope. We do both: ship to the mirror now, open the pull request anyway.

One limit, stated plainly. The mandate today is security backports, not general maintenance. Dependency bumps, releases, and issue triage come later, as the track record earns them.

## What an agent is allowed to ship by itself

The objection to all of this is a good one. An autonomous agent shipping patches under names that every downstream build resolves through is the highest blast radius write operation in software. A wrong fix at machine speed is worse than a right fix on Tuesday. And Stenberg, who has now seen more AI security output than almost anyone alive, says the models are good at finding flaws and not good at judging how serious they are, and that their suggested patches are rarely exactly right.

He is describing judgment, and he is right that agents do not have it. So POSSUM does not ask them to exercise any. Security backports are the rare software task with a machine-checkable definition of done, because a vulnerability comes with a reproducer and a feature does not.

The gate:

1. The agent produces a failing test that reproduces the vulnerability against the unpatched package. No reproducer, no autonomous ship: it goes to a human queue.
2. The patch makes that test pass, and the full upstream test suite stays green.
3. The build is reproducible and the diff against upstream is published before anyone can install it.

Stenberg's own bar for contributions is that he does not care how the code was written, he cares that it is quality and passes all the test cases. That is the bar we want to automate against.

Blast radius is bounded operationally. Patched versions land on an opt-in channel with a staged rollout, one command rolls back, and pinning to upstream is always available.

POSSUM is autonomous for vulnerabilities that come with reproducers and human-gated for everything else. That is a smaller claim than "fully autonomous" and it is one we can defend.

## This sounds familiar

### How is this different from Chainguard and Assured OSS?

Most of this exists, and it is well funded. [Chainguard Libraries](https://www.chainguard.dev/libraries) rebuilds packages from source, backports critical and high severity CVE fixes, tests every remediation, and ships signed provenance and SBOMs. In March 2026 they launched [Chainguard Repository](https://thenewstack.io/chainguard-repository-ai-agents/), a policy-enforced library endpoint aimed at AI coding agents. [Google's Assured OSS](https://cloud.google.com/blog/products/identity-security/google-cloud-assured-open-source-software-service-now-ga) is free, covers more than a thousand Java and Python packages, and pointedly does not fork: it keeps packages current and sends fixes upstream. [HeroDevs](https://www.herodevs.com/) sells drop-in patched replacements for end-of-life packages on an SLA.

That is evidence for the proposal, not against it. The mechanism works and enterprises are paying for it.

Four things are different. Their catalogs cover what someone with a procurement budget asked for, which is not the same set as the packages the world runs on, and everything below the enterprise demand line stays unprotected. Their coverage grows from customer requests, where Bunny's grows from what is demonstrably shipping in production. They mostly carry fixes that upstream already wrote, where our hard case is the abandoned package that has no upstream left to carry from. And a curated catalog is what a funded human team can sustain. A universe is not.

### How is this different from a supply chain attack?

It resembles one. An unaffiliated party publishing parallel builds of critical packages at scale is, structurally, what an attacker does.

The difference is not intent, which every attacker also claims. It is verifiability. Reproducible builds, published diffs, signed attestations, and a named foundation holding the keys mean you can check what we shipped without trusting us. An attacker's defining property is that you cannot check.

Run the comparison the other way. The [xz backdoor](https://www.techtarget.com/cybersecurity/news/366616699/FOSS-security-concerns-increase-amid-widespread-adoption) worked because an authorized maintainer account inserted malicious code into liblzma and no downstream layer was looking. A distro layer with reproducible builds and published diffs is a defense against that failure mode, not an instance of it.

## Who owns this, and who gets paid

POSSUM is owned by the Public Goods Foundation, not a company. That is what makes "commons rather than product" a structural fact instead of a promise. On liability, the default is signed attestations and no warranty, the same bargain open source has always offered. Enterprises that need more can pay for a contract with real SLAs. This is the proposed model, not an executed one.

There is an obvious objection here and it is mine to answer. I have spent two posts arguing that the fix for under-maintained open source is [getting money to the people who maintain it](/posts/prosperous-software) and [funding them retroactively for impact](/posts/auto-retro-funding). Forking their work and handing it to agents looks like giving up on that. Worse, it looks like undermining it: if downstream consumers resolve through POSSUM, upstream loses the visible dependency that gives it any leverage at all.

Two answers. Bunny makes that leverage stronger rather than weaker, because knowing which businesses, at what market cap, ship which package is exactly the evidence retroactive funding has always lacked. You cannot route money to a dependency nobody can see.

The second answer is more direct. We want to hire open source maintainers to build this. The enterprise tier pays for it, and the money goes to people who already know the code. The fork gets staffed by upstream rather than aimed at it.

Two concessions while I am here. Funding is still the right long-run answer and it has not scaled fast enough, which is why we are proposing to route around the wait. And I run OSO, which makes OSO's data load-bearing for this whole proposal. Judge it accordingly.

## Open challenges

We do not have answers to these.

- **Trust bootstrapping.** Debian earned its position over thirty years with named humans. A new foundation shipping agent-authored builds starts at zero. What earns the first thousand users?
- **The human queue.** The reproducer gate leaves the subtlest vulnerabilities to people. Who staffs that queue, and does it scale with the rest?
- **Divergence.** Every carried patch widens the gap from upstream. Distros live with this and it genuinely hurts. What is the merge and retirement policy, and who answers for the trademark question of serving a name we did not author?
- **Other ecosystems.** Bunny sees JavaScript bundles. PyPI, Maven, and crates.io have different build and native extension problems, and nothing equivalent yet for visibility.
- **We become the target.** A widely adopted mirror is the highest value target in the supply chain. Key management and build integrity are existential.
- **Upstream says no.** What happens when a maintainer asks us to stop?

## We need your help

Nothing here is built. That is the reason to publish now: we would rather find collaborators before the architecture calcifies than after.

Three ways to help:

1. If you maintain something in the critical set and want to be paid to work on this, talk to us first. [add link]
2. If you know a package holding up far more than its maintainers can carry, tell us and we will put it on the list. [add link]
3. If you want to build it, we need people on reproducible builds, agent harnesses, registry infrastructure, and the human review queue. [add link]

Linux got a maintenance layer because a generation of people decided to do the unglamorous work of carrying patches for software they did not write. The registries deserve the same thing. We think agents finally make it affordable.
