---
name: faim-proposal-style
description: FAIM house style for client proposals, proposal summary decks and scope documents. Use whenever writing or designing a FAIM proposal, pitch summary, scope of work, timeline, investment page or any client facing document that should look clean, white, vector and human written. Covers layout grid, type hierarchy, colour rules, component catalogue, image placeholders, copy style and an anti AI look checklist. Templates live in /templates.
---

# FAIM Proposal Style

A white page, black ink, one green. Every page says one thing, says it in the headline, and proves it underneath. The look comes from restraint, not decoration.

This style is adapted from a strong consulting style proposal pack and rebuilt on the FAIM identity: the black FAIM wordmark, the green connector mark (the "Intelligence Loop"), and the seal.

## 1. Files

| File | Use |
|---|---|
| `tokens.css` | Colour, type, space and shape tokens. Copy into any new page. |
| `faim-mark.svg` | Vector connector mark for small uses (bullets, joints, placeholders). |
| `/templates/faim-proposal-summary.html` | Interactive 16:9 summary deck, 15 slides, prints to PDF. |
| `/templates/faim-proposal-document.html` | Long form A4 proposal, prints to PDF. |
| `/templates/faim-proposal-document.docx` | Same long form proposal for Word. |
| `/assets/` | Logo, mark, seal. See `assets/README.md`. |

## 2. Brand basics

- **Wordmark**: black on white is the default. White wordmark only on black panels. Never recolour the letters.
- **Mark**: the green connector. It means "things joined up". Use it as the one signature device: a joint on timelines, the dot on feature lists, the corner of an image placeholder. Never as a background pattern.
- **Seal**: only on the acceptance or signature page, at 70 to 80% opacity, never behind body text.
- **Fonts**: set per case through `--font-display` and `--font-body`. The identity file uses Plus Jakarta Sans for text and Montserrat for the tagline. Do not hardcode font names anywhere else.

## 3. Colour rules

| Token | Hex | Where it goes |
|---|---|---|
| `--paper` | #FFFFFF | Every page background. No off white, no texture. |
| `--ink` | #0A0A0A | Headlines, dark stat tiles, key numbers, active step circles. |
| `--ink-2` | #2B2E2A | Body copy. |
| `--muted` | #6B7068 | Sublines, captions, footer rail. |
| `--accent` | #54DF38 | FAIM green. Fills only: step circles, bars, diamonds, numbers on black. |
| `--accent-text` | #2F7A1E | Green text on white: eyebrows, small labels, page numbers. |
| `--accent-tint` | #EDFBE9 | Status strips ("Our recommendation", "Complete"). |
| `--surface` | #F4F5F3 | Soft cards. |
| `--line` | #E2E4E0 | Hairlines and card borders. |

Hard rules:
- Bright green as text on white fails contrast (1.7:1). Use `--accent-text` (5.4:1) for any green word on white.
- Bright green on black passes (12:1). Big green figures belong on black tiles.
- Black text on bright green passes. White text on bright green does not.
- One accent per page does the talking. If three things are green, none of them are.
- No gradients, no glow, no drop shadows heavier than a 1px hairline, no glass, no neon edges.

## 4. Grid and placement

Deck (16:9, designed at 1334 x 750):
- 56px outer margin on all sides. 12 columns, 20px gutter.
- Top band: eyebrow at 48px from top, headline under it, one line subline under that. Content starts at about 190px.
- Bottom band: footer rail at 40px from bottom. Left: document title. Right: "Prepared for [Client] by FAIM" and the page number in `--accent-text`.
- Common splits: 12 (full), 7 + 5 (image + features), 6 + 6 (two screens, two payments), 4 x 3 (phase cards), 5 equal (stepper, phone screens).
- Content never touches the footer rail. Leave at least 24px.

Document (A4):
- 25mm side margins, logo top left, page number top right.
- H1 with a hairline rule under it, then body. Tables run full measure.
- Footer: company name left, "Confidential" centre, date right.
- Body measure 70 to 85 characters. Justified text only if hyphenation is on; otherwise ragged right.

## 5. Type hierarchy

Every slide uses the same four steps, in this order:

1. **Eyebrow**: `02 · THE EXPERIENCE · SCREENS`. Caps, 13px, tracking 0.12em, `--accent-text`, weight 700. Section number, then section, then sub section, joined with a middle dot.
2. **Headline**: 44 to 48px, weight 800, `--ink`, tight leading (1.05), letter spacing -0.01em. One line. States the point, not the topic ("Two screens draw the crowd", not "Screens").
3. **Subline**: 18px, `--muted`, one sentence, ends with a full stop.
4. **Body**: 15 to 16px, `--ink-2`, leading 1.45.

Card titles 18 to 20px weight 700. Captions 13px italic `--muted`. Labels above groups ("KEY FEATURES") are 12px caps tracked, `--muted`.

## 6. Component catalogue

Use the smallest component that carries the idea.

| Component | When | Notes |
|---|---|---|
| Agenda rows | Contents slide | Number in `--accent-text` 30px, title bold, one liner muted. Soft card per row. |
| Numbered circle steps | A sequence of 3 to 6 actions | 36px circle. Accent fill for normal, ink fill for the final or key step. |
| Stat tiles | 2 to 4 hard facts | Black tile, green figure 40px, white caption. Use once per deck, twice at most. |
| Benefit cards | 3 outcomes | Soft card, number circle on the left, title + one sentence. |
| Image + feature list | Concept or option pages | Image 7 cols, list 5 cols with green dots, callout box under the list. |
| Phase card grid | Scope in phases | 4 x 2 cards, phase number circle, title, two lines. Status tag sits on the top edge. |
| Gantt timeline | Dates that matter | Header band split by stage, week columns with hairlines, diamonds for milestones, bars for work. Bold the rows that are client sign offs. |
| Segmented bar | Proportions: edit structure, payment split | Full width bar, segments sized to the real value, legend below with time or amount. |
| Price hero + payment rows | Investment | Black card left with the big number, payment rows right, terms box under. |
| Stepper + checklist | Next steps | Horizontal circles on a hairline, then a two column checklist of what the client must provide, each with a date. |
| Label / value table | Facts in the long document | Bold label column 25%, value column 75%, hairlines only. |

## 7. Images and placeholders

- Ratios: 16:9 for screens and renders, 9:19.5 for phones, 4:3 for venue or stand shots, 1:1 for portraits.
- Radius 10px on every image. No borders, no shadows.
- Caption sits under the image, centred, 14px bold ink. Disclaimers sit under that in 12px italic muted ("AI generated image, for illustration only").
- Placeholders are vector: `--surface` fill, 1px dashed `--line` border, the connector mark small in one corner, and a label with ratio and purpose ("16:9 · Live game screen"). Never a stock photo stand in.
- Never put text over photos. If a photo needs a label, the label goes below.

## 8. Language

Write like a senior producer talking to a client across the table.

- Short declarative sentences. One idea each.
- Name the client. Name the date. Name the number. "Live on Thursday 3 December" beats "on event day".
- Say what the client leaves with, then how.
- Put caveats where they belong, in plain italic captions. Honesty reads as confidence.
- Use colons and middle dots as separators. Never the long dash. Use a comma, a colon or a new sentence.
- British spelling unless the client writes otherwise.

Banned words and phrases: seamless, cutting edge, leverage, unlock (as a verb for value), elevate, revolutionise, empower, synergy, game changer, next level, robust, holistic, delve, tapestry, in today's fast paced world, we are excited to, it's not just X it's Y.

Headline test: if the headline would fit any other company's deck, rewrite it.

## 9. Anti AI look checklist

Run before shipping. Every "yes" is a fix.

- Is there a gradient, glow, glass blur or neon edge anywhere?
- Is any icon decorative rather than explaining something?
- Are all list items the same length and shape? Real lists are uneven.
- Does any slide use more than one green element as the hero?
- Are there emoji, sparkles, rocket or brain icons?
- Is any headline a topic word instead of a claim?
- Is there a long dash anywhere in the copy?
- Does any number look round and unsourced (10x, 100%)?
- Is any image a generic stock or AI render without a disclaimer?
- Would a client have to scroll or squint to find the date, the price or the ask?

## 10. QA before sending

- Every page has eyebrow, headline, subline (cover and closing excepted).
- Page numbers run in order, footer rail is on every inner page.
- Every date has a weekday and the weekday is correct.
- Every price states VAT treatment.
- Prints to PDF one slide per page with nothing clipped.
- Green text on white uses `--accent-text` only.
