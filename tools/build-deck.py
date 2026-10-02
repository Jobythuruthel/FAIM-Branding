"""Build self-contained HTML files.
1. Inline the FAIM Motion engine into the deck template.
2. Write dist/ copies of both templates with every ../assets file embedded as a data URI,
   so they open correctly on their own, with no folder next to them.
Run: python3 tools/build-deck.py"""
import base64, json, mimetypes, re
from pathlib import Path
root = Path(__file__).resolve().parent.parent
src = (root / "templates/src/faim-proposal-summary.src.html").read_text()
js = (root / "tools/vendor/faim-motion.js").read_text()
(root / "templates/faim-proposal-summary.html").write_text(src.replace("/*FAIM_MOTION_JS*/", js))

def embed(html):
    """Each asset is stored once in a lookup table; images point at it by name."""
    names = sorted(set(re.findall(r"\.\./assets/([\w.-]+)", html)))
    table = {}
    for name in names:
        f = root / "assets" / name
        mime = "image/svg+xml" if f.suffix == ".svg" else (mimetypes.guess_type(f.name)[0] or "application/octet-stream")
        table[name] = f"data:{mime};base64," + base64.b64encode(f.read_bytes()).decode()
    html = re.sub(r'src="\.\./assets/([\w.-]+)"', r'data-asset="\1"', html)
    js = "<script>(function(){var A=" + json.dumps(table) + ";document.querySelectorAll('[data-asset]').forEach(function(i){i.src=A[i.dataset.asset]})})()</script>"
    return html.replace("</body>", js + "\n</body>")

dist = root / "dist"; dist.mkdir(exist_ok=True)
for n in ["faim-proposal-summary.html", "faim-proposal-document.html"]:
    out = embed((root / "templates" / n).read_text())
    assert "../assets/" not in out
    (dist / n).write_text(out)
    print("built dist/" + n, len(out) // 1024, "KB")
