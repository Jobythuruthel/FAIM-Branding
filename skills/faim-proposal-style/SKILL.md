---
name: faim-proposal-style
description: FAIM house style for client proposals, proposal summary decks and scope documents. Use whenever writing or designing a FAIM proposal, pitch summary, scope of work, timeline, investment page or any client facing document that should look clean, white, vector and human written. Covers layout grid, type hierarchy, colour rules, component catalogue, image placeholders, copy style and an anti AI look checklist. Templates live in /templates.
---

# FAIM Proposal Style

A white page, black ink, one green. In technology mode, a void black page, white ink, the same green, with a quiet holographic shimmer. Every page says one thing, says it in the headline, and proves it underneath. The look comes from restraint, not decoration.

This style is adapted from a strong consulting style proposal pack and rebuilt on the FAIM identity: the black FAIM wordmark, the green connector mark (the "Intelligence Loop"), and the seal.

## 1. Files

| File | Use |
|---|---|
| `tokens.css` | Colour, type, space and shape tokens. Copy into any new page. |
| `/templates/faim-proposal-summary.html` | Interactive 16:9 technology presentation, 15 slides, dark mode with motion. Built from `/templates/src/` by `tools/build-deck.py`. |
| `/templates/faim-proposal-document.html` | Long form A4 proposal, prints to PDF. |
| `/templates/faim-proposal-document.docx` | Same long form proposal for Word. |
| `/assets/` | Black logo, white logo, icon, seal. See `assets/README.md`. |

## 2. Logo and icon usage

These rules are fixed. They override anything else in this file.

| Surface | Use |
|---|---|
| White or light (paper, light grey, light photo) | `faim-logo-black.png`: black letters, green connector. |
| Black or dark (void, dark glass, dark photo) | `faim-logo-white.png`: white letters, green connector. |
| FAIM green panel | Black letters only. Never put the green connector on green. |

- Use the original FAIM logo files as supplied. Never redraw, retype, recolour the connector, stretch, squash, rotate, crop, outline, shadow or add effects to the logo.
- Set only one dimension (height or width) and let the other follow. Never set both unless the ratio matches the file exactly (564 : 209 for the logo).
- Clear space on every side: at least the height of the "F" crossbar. Nothing intrudes into it.
- Minimum size: 120px wide on screen, 30mm in print, so the tagline stays legible.
- Placement: deck covers top left, inner slides top right. Documents top left on every page.
- **The icon** (`faim-icon.svg`, the connector on its own) is a hero device, not a pattern. Use it case by case, at most once per document or deck, usually on the cover. Never as a bullet, a placeholder corner, a divider, a watermark or a background tile. Never next to the full logo at a similar size.
- **The seal** goes only on the acceptance or signature page.
- **Fonts** are set per case through `--font-display` and `--font-body`. Do not hardcode font names anywhere else.

## 3. Colour rules

| Token | Hex | Where it goes |
|---|---|---|
| `--paper` | #FFFFFF | Every page background. No off white, no texture. |
| `--ink` | #0A0A0A | Headlines, dark stat tiles, key numbers, active step circles. |
| `--ink-2` | #2B2E2A | Body copy. |
| `--muted` | #6B7068 | Sublines, captions, footer rail. |
| `--accent` | #6FBD44 | FAIM green, matched to the logo and icon files. Fills only on white: step circles, bars, diamonds. |
| `--accent-text` | #2F7A1E | Green text on white: eyebrows, small labels, page numbers. |
| `--accent-tint` | #EDFBE9 | Status strips ("Our recommendation", "Complete"). |
| `--surface` | #F4F5F3 | Soft cards. |
| `--line` | #E2E4E0 | Hairlines and card borders. |

Hard rules:
- FAIM green as text on white fails contrast (2.3:1). Use `--accent-text` (5.4:1) for any green word on white.
- FAIM green on void black passes (8:1), so green figures are fine in technology mode.
- Black text on FAIM green passes. White text on FAIM green does not.
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
- Placeholders are vector: `--surface` fill, 1px dashed `--line` border, and a label with ratio and purpose ("16:9 · Live game screen"). No icon in placeholders. Never a stock photo stand in.
- Never put text over photos. If a photo needs a label, the label goes below.

## 8. Technology mode (interactive HTML only)

Interactive presentations about FAIM technology use the dark tokens in `tokens.css` (the `.tech` block). Printed PDFs of documents and Word files stay white.

- Void black page, white logo, glass cards (4 to 8% ink fill, 1px edge, blur 14px), radius 16px.
- Type: Arial for text, Courier New for eyebrows, labels, numbers and data. Fonts can still change per case.
- **Holographic effect**, in three places only:
  1. Foil sweep on the cover title and on hero figures (price, stat tiles). Green to teal to green, about 7 seconds, then rest.
  2. A slow light sheen across hero cards (stat tiles, price card).
  3. The FAIM Motion background behind the deck: `aurora` on the cover and closing slide, `orbs` at low intensity elsewhere.
  Teal (`--holo-2`) lives only inside these effects. It is never a button, a label or a line.
- Motion: slides fade and lift 14px over 500ms with `cubic-bezier(.22,1,.36,1)`. Content inside each slide staggers 60ms. No bounce, no spin, no confetti.
- `prefers-reduced-motion` gets still frames with no foil sweep.
- Navigation: arrow keys, Page Up/Down, Home/End, swipe, on-screen buttons and a progress line. The slide number sits in the URL hash so a link opens on the right slide.
- One soft green glow per slide at most.
- The closing slide carries the credit line "Joby Thuruthel | FAIM · wa.me/97335577062".

## 9. Language

Write like a senior producer talking to a client across the table.

- Short declarative sentences. One idea each.
- Name the client. Name the date. Name the number. "Live on Thursday 3 December" beats "on event day".
- Say what the client leaves with, then how.
- Put caveats where they belong, in plain italic captions. Honesty reads as confidence.
- Use colons and middle dots as separators. Never the long dash. Use a comma, a colon or a new sentence.
- British spelling unless the client writes otherwise.

Banned words and phrases: seamless, cutting edge, leverage, unlock (as a verb for value), elevate, revolutionise, empower, synergy, game changer, next level, robust, holistic, delve, tapestry, in today's fast paced world, we are excited to, it's not just X it's Y.

Headline test: if the headline would fit any other company's deck, rewrite it.

## 10. Anti AI look checklist

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
- Does the FAIM icon appear more than once, or as decoration?
- Is the logo stretched, recoloured, or the wrong version for its background?
- Would a client have to scroll or squint to find the date, the price or the ask?

## 11. QA before sending

- Every page has eyebrow, headline, subline (cover and closing excepted).
- Page numbers run in order, footer rail is on every inner page.
- Every date has a weekday and the weekday is correct.
- Every price states VAT treatment.
- Prints to PDF one slide per page with nothing clipped.
- Green text on white uses `--accent-text` only.
