import sys

with open('src/styles/index.css', 'r', encoding='utf-8') as f:
    content = f.read()

target = """.section-desc {
  font-size: clamp(1rem, 1.8vw, 1.15rem);
  color: var(--text-muted);
  line-height: 1.7;
}"""

replacement = """.section-desc {
  font-size: clamp(1rem, 1.8vw, 1.15rem);
  color: var(--text-muted);
  line-height: 1.7;
}

.about-slogan {
  font-family: var(--font-heading);
  font-size: clamp(1.2rem, 2.2vw, 1.45rem);
  font-weight: 700;
  font-style: italic;
  color: var(--champagne);
  margin-top: 0.25rem;
  margin-bottom: 0.85rem;
  letter-spacing: 0.02em;
}"""

content_norm = content.replace('\r\n', '\n')
target_norm = target.replace('\r\n', '\n')
replacement_norm = replacement.replace('\r\n', '\n')

if target_norm in content_norm:
    content_norm = content_norm.replace(target_norm, replacement_norm)
    if '\r\n' in content:
        content = content_norm.replace('\n', '\r\n')
    else:
        content = content_norm
    with open('src/styles/index.css', 'w', encoding='utf-8') as f:
        f.write(content)
    print("Successfully added .about-slogan to src/styles/index.css")
else:
    print("ERROR: target not found in index.css")
    sys.exit(1)

