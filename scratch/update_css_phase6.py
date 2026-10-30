import sys

with open('src/styles/index.css', 'r', encoding='utf-8') as f:
    content = f.read()

target = """.footer-link:hover {
  color: var(--champagne);
}"""

replacement = """.footer-link:hover {
  color: var(--champagne);
}

.footer-contact-link {
  color: var(--text-muted);
  text-decoration: none;
  transition: color var(--transition-fast);
  word-break: break-word;
}

.footer-contact-link:hover {
  color: var(--champagne);
  text-decoration: underline;
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
    print("Added .footer-contact-link to src/styles/index.css")
else:
    print("ERROR: target not found in index.css")
    sys.exit(1)

