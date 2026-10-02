"""Inline the FAIM Motion engine into the deck so it runs offline as one file.
Run: python3 tools/build-deck.py"""
from pathlib import Path
root = Path(__file__).resolve().parent.parent
src = (root / "templates/src/faim-proposal-summary.src.html").read_text()
js = (root / "tools/vendor/faim-motion.js").read_text()
(root / "templates/faim-proposal-summary.html").write_text(src.replace("/*FAIM_MOTION_JS*/", js))
print("built templates/faim-proposal-summary.html")
