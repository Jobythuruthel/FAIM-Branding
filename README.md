# FAIM Branding

House style and templates for FAIM client proposals.

## What's here

- `skills/faim-proposal-style/SKILL.md`: the style skill. It covers the grid, type, colour rules, components, image placeholders, copy style and the anti AI look checklist.
- `skills/faim-proposal-style/tokens.css`: the design tokens, used as the source of truth.
- `templates/faim-proposal-summary.html`: an interactive 16:9 summary deck with 15 slides. Use the arrow keys, swipe, or the buttons to move between slides. Print to PDF and you get one slide per page.
- `templates/faim-proposal-document.html`: the long form A4 proposal. It prints to PDF.
- `templates/faim-proposal-document.docx`: the same long form proposal for Word. Rebuild it with `NODE_PATH=$(npm root -g) node tools/build-docx.js`.
- `assets/`: the logo, mark and seal. See `assets/README.md`.

## Using a template

1. Copy the template next to `assets/` and rename it for the client.
2. Replace every `[Bracketed]` placeholder. Search for `[` to make sure you haven't missed one.
3. Set the fonts for the job in `--font-display` and `--font-body`.
4. On the deck, the phases, timeline and checklist are edited through the arrays in the script at the bottom of the file, not in the markup.
5. Run the QA list in section 10 of the skill before you send anything.

## Colour in one line

White page, black ink, FAIM green `#54DF38` for fills, `#2F7A1E` whenever green text sits on white.
