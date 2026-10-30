# scratch/audit_responsive_rules.py
import re
import sys

sys.stdout.reconfigure(encoding='utf-8')

def audit():
    with open("src/styles/index.css", "r", encoding="utf-8") as f:
        css = f.read()

    # Find all media queries
    media_queries = re.findall(r"@media\s*\([^\)]+\)", css)
    print(f"Total media queries found: {len(media_queries)}")
    unique_queries = sorted(set(media_queries))
    for q in unique_queries:
        print(f"  {q}")

    # Check for dangerous global overflow-x: hidden hacks
    body_overflow = re.findall(r"body\s*\{[^}]*overflow-x\s*:\s*hidden", css, re.IGNORECASE)
    html_overflow = re.findall(r"html\s*\{[^}]*overflow-x\s*:\s*hidden", css, re.IGNORECASE)
    print("\nGlobal overflow-x check:")
    print(f"  body overflow-x: hidden instances: {len(body_overflow)}")
    print(f"  html overflow-x: hidden instances: {len(html_overflow)}")

    # Check fixed pixel widths greater than 320px
    fixed_widths = re.findall(r"(?:width|min-width)\s*:\s*(\d{3,4})px", css)
    large_fixed = [int(w) for w in fixed_widths if int(w) > 300]
    print(f"\nFixed width rules > 300px: {len(large_fixed)} instances (Max: {max(large_fixed) if large_fixed else 0}px)")

if __name__ == "__main__":
    audit()

