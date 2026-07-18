---
name: style-review
description: >-
  Review and revise a blog-post draft so it reads in Raymond Cheng's authentic
  voice (the raymondcheng.net blog). Use this whenever editing, reviewing, or
  polishing a draft for this blog, doing a "style pass" or "voice check," or
  making AI-generated prose sound like Raymond — even when the user only says
  "clean this up," "make it sound like me," or "tighten this post." Always run it
  before a post is considered done.
---

# Style Review: write in Raymond's voice

This skill turns an AI-generated or rough draft into something that reads like
Raymond wrote it. It is derived from every published post on the blog
(2015–2026). Use it to **review** a draft (flag what breaks voice) and to
**revise** it (apply the fixes).

The single most common failure is prose that is *competent but generic* — hedged,
padded, and dashed-up in the way LLMs default to. Raymond's voice is the
opposite: **direct, opinionated, and dense.** He states a strong claim plainly,
then defends it with reasoning. Your job is to strip the generic tics and restore
that directness.

## The voice in one paragraph

First person, confident, and concrete. He states a thesis as a conviction (often
in one bold sentence), asks a rhetorical question and answers it, and moves
through an argument in short clipped clauses with the occasional one-line
paragraph as a punch. He does not hedge, does not throat-clear, and does not
decorate. He writes the way a technically fluent person talks when they actually
believe what they are saying.

## Hard rules (these are what he reacts to most strongly)

1. **No em dashes.** This is close to absolute. His real posts almost never use
   them (zero in 18 of 22 posts). Replace every `—` with a period, a colon, a
   comma, or a parenthetical. Rewrite the sentence if needed. Do not use en
   dashes as a substitute; write number ranges with "to" or a hyphen ("20-30%").
2. **Cut the fluff. No hedging, no throat-clearing.** Delete phrases like
   "I'll be honest," "it's worth noting," "it's important to note," "arguably,"
   "in some sense," "that said." State the point. If a disclaimer is genuinely
   needed, give it once, plainly, and move on.
3. **Be direct, not conversational-verbose.** No "Let's dive in," "Buckle up,"
   "In today's world," "In conclusion." No warming up before the point. The first
   sentence of a section should carry weight.
4. **Don't restate the question before answering it.** Answer it.
5. **Every sentence earns its place.** If a sentence only restates the one before
   it, cut it. Density is the goal, not length.
6. **State claims plainly and own them.** Prefer "Open source will win" over
   "Open source may, in certain respects, have advantages." Assert, then argue.

If you change nothing else, fix these. They account for most of what makes a
draft feel un-Raymond.

## Voice rules by dimension

**Point of view.** First-person singular "I" for personal/opinion essays ("my
conviction in one core thesis has only strengthened"). First-person plural "we"
only for company/movement posts (OSO, Prosperous Software) or genuinely
co-authored pieces. Guides use direct imperative / "you."

**Stance.** Highly assertive. Strong claims are asserted and then defended, never
buried under qualifier stacks. He allows exactly one up-front "take this with a
grain of salt" disclaimer, then argues at full confidence. He never re-hedges
mid-argument.

**Rhythm.** Vary sentence length. Long explanatory sentences interleaved with
short blunt ones. Use a **one-sentence paragraph as a pivot or punch**, but
sparingly — at most one per section, reserved for the click moment.
Real examples: *"Then came Bitcoin."* / *"That is increasingly not the case."* /
*"Life is what you make it."*

**Rhetorical questions.** A signature transition. Open or pivot a section with a
question the reader is already asking, then answer it directly. Real headings:
*"Why aren't there more Dapp users?"*, *"Data today: who can build the tallest
data silo?"*

**Structure.**
- Essays cold-open with a compressed claim or a shared-premise scene. No "what
  this post covers" intro.
- Personal posts open with a relatable anecdote or question.
- Guides open with a one-line promise, then straight into steps.
- Essays close on a short, forward-looking **vision** line (no hard CTA).
  Company/project posts close with a **"join us" list** of links (email, Discord,
  socials). Guides close with "Next steps" + resource links and a named
  **acknowledgments** line ("Thanks to X, Y, Z for feedback").
- Long essays often answer objections in an explicit **FAQ section** at the end
  rather than pre-hedging in the body.

**Headings.** Mostly sentence case, often rhetorical or a direct claim. Natural
and spoken, not keyword-stuffed. Examples: *"Cloud vs. Blockchain: What's the
Real Difference?"*, *"This sounds familiar…"*

**Formatting.**
- **Bold** the coinage or the one-line thesis, not whole paragraphs. Bold a new
  term on first mention ("**Prosperous Software Movement**"), then use it plainly.
- Bullet lists only for a genuine enumerable set (goals, pros/cons, factors).
  Numbered lists for steps or ranked reasons. Never bullets as scannability
  filler.
- Use a **small table** to compare 3+ options instead of prose.
- Block quotes are rare: an epigraph, a verbatim quote from a named source, or a
  mission statement. Not for your own emphasis (use a bold line for that).
- Italics for asides, "Note:" callouts, and image captions.

**Punctuation.** Em dashes: essentially never (see hard rule 1). Colons: often,
to set up a claim then deliver the punch. Parentheticals: frequent, for asides
and quick clarifications ("(aka OSO)", "(e.g. GPL, AGPL)"). Commas: generous for
serial clauses, but clip clauses rather than let a sentence sprawl. Ellipses:
rare.

**Citations & links.** Inline `[text](url)` is the default, embedded in the
sentence. For stacking multiple sources behind one factual claim in a thesis
essay, the numeric style `\[[1](url),[2](url)\]` is acceptable. Image attribution
goes on its own line under the image: an italic caption, or `([Source](url))` /
`[Source: Name](url)`. Cite a number once with its source, then move on — don't
re-qualify it.

**Vocabulary he reaches for** (use where natural, don't force): *thesis,
conviction, inevitable, positive-sum, out-innovate / out-compete / out-grow,
public goods, movement, by definition, at its core, "Let's ..."*. Systems
vocabulary from his background surfaces even in non-technical essays (consensus,
fault-tolerant, threat model, primitive).

## The review process

1. **Read the whole draft first** for the argument, then reread for voice. Note
   the genre (thesis essay / personal / guide / project post) — it sets the POV
   and closing convention.
2. **Run the mechanical checks** (fast, objective):
   - `grep -n '—' <file>` — every hit is a fix. Also scan for `–` (en dash) and
     ` -- `.
   - Search for hedge/filler phrases: "I'll be honest", "it's worth noting",
     "it's important to note", "arguably", "that said", "in conclusion", "dive
     in", "in today's", "needless to say".
   - Flag any section that restates its own heading, or a paragraph whose
     sentences repeat each other.
3. **Check against the dimension rules** above: POV correct for the genre, claims
   asserted not hedged, rhythm varied with at most one punch-paragraph per
   section, headings direct, bold used on coinages/thesis only, links in his
   format, closing matches the genre.
4. **Report findings** grouped as:
   - **Mechanical** (em dashes, filler phrases, wrong link format, missing
     acknowledgments) — fix in place.
   - **Voice / judgment** (a hedged thesis, a flabby section that should be cut or
     merged, a conversational passage, a wrong closing) — propose the rewrite.
5. **Revise.** Apply the fixes. Prefer cutting to adding. When a passage is too
   conversational, rewrite it as the shortest direct version that keeps the
   point. Preserve his actual argument and any real citations — never invent
   facts to tighten prose.
6. **Verify.** Re-run the em-dash and filler greps and confirm zero hits before
   calling it done.

## Before / after

These are the kinds of edits that move a draft toward his voice.

**Kill the hedge.**
- Before: *"I'll be honest about what the graph does and doesn't show: raw
  download counts include CI and automation..."*
- After: *"One caveat: raw download counts include CI and automation..."*

**Remove the em dash.**
- Before: *"Depth is the medium-term face of this — breadth is the long-term
  one."*
- After: *"Depth is the medium-term face of this. Breadth is the long-term one."*

**Assert, don't soften.**
- Before: *"Open source may end up being quite important in the AI age."*
- After: *"Open source will win in the AI age."*

**Cut the conversational warm-up.**
- Before: *"If you doubt it, look at how we got here. Modern AI is itself the
  strongest case study for the argument."*
- After: *"Modern AI is the proof."*

**Merge and compress instead of padding.** If two sections make overlapping
points, merge them into one punchier section rather than restating.

## Anti-patterns (generic-AI tics to strip on sight)

- Em-dash chains used for rhythm.
- "It's worth noting" / "it's important to note" / "that said" / "arguably."
- "In today's fast-paced world" / "In conclusion" / "Let's dive in" / "Buckle up."
- Restating the prompt or the section heading before answering.
- Listicle padding — bullets with no real enumerable set behind them.
- Stacked qualifiers on an already-strong claim ("some might argue, though it's
  complicated, that...").
- Emoji as decoration (he uses them only rarely and deliberately; default to
  none).
- Re-qualifying a statistic every time it appears ("approximately," "it seems").

## Scope note

This guide describes his authentic published voice. It was built from the blog's
posts, deliberately **excluding** any in-progress AI-drafted post, since those do
not yet represent his voice. If posts are added over time, re-read a recent
sample and update the rules that have drifted.
