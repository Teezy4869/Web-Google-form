import sys

with open('src/styles/index.css', 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Add timeline CSS after .meaning-value-text
target_meaning_text = """.meaning-value-text {
  font-size: 0.87rem;
  color: var(--text-muted);
  line-height: 1.55;
}"""

replacement_meaning_text = """.meaning-value-text {
  font-size: 0.87rem;
  color: var(--text-muted);
  line-height: 1.55;
}

.timeline-value-item {
  align-items: center;
}

.timeline-value-title {
  font-size: 0.96rem;
  font-weight: 700;
  color: #ffffff;
  margin-bottom: 0.25rem;
  letter-spacing: 0.02em;
}

.timeline-date-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  font-size: 0.88rem;
  font-weight: 600;
  color: var(--champagne);
  letter-spacing: 0.02em;
}"""

content_norm = content.replace('\r\n', '\n')
target_meaning_norm = target_meaning_text.replace('\r\n', '\n')
replacement_meaning_norm = replacement_meaning_text.replace('\r\n', '\n')

if target_meaning_norm in content_norm:
    content_norm = content_norm.replace(target_meaning_norm, replacement_meaning_norm)
    print("Added timeline CSS to src/styles/index.css")
else:
    print("ERROR: target_meaning_text not found in index.css")
    sys.exit(1)

# 2. Add responsive rules for stats-grid and timeline to index.css
target_stat_label = """.stat-label {
  font-size: 0.9rem;
  color: var(--text-muted);
}"""

replacement_stat_label = """.stat-label {
  font-size: 0.9rem;
  color: var(--text-muted);
}

@media (max-width: 520px) {
  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 0.75rem;
  }
  .stat-card {
    padding: 1.25rem 0.65rem;
  }
  .stat-value {
    font-size: clamp(1.8rem, 5.5vw, 2.2rem);
  }
  .stat-label {
    font-size: 0.82rem;
  }
  .timeline-value-title {
    font-size: 0.88rem;
  }
  .timeline-date-badge {
    font-size: 0.82rem;
  }
}

@media (max-width: 340px) {
  .stats-grid {
    grid-template-columns: 1fr;
  }
}"""

target_stat_norm = target_stat_label.replace('\r\n', '\n')
replacement_stat_norm = replacement_stat_label.replace('\r\n', '\n')

if target_stat_norm in content_norm:
    content_norm = content_norm.replace(target_stat_norm, replacement_stat_norm)
    print("Added stats-grid responsive CSS to src/styles/index.css")
else:
    print("ERROR: target_stat_label not found in index.css")
    sys.exit(1)

if '\r\n' in content:
    content = content_norm.replace('\n', '\r\n')
else:
    content = content_norm

with open('src/styles/index.css', 'w', encoding='utf-8') as f:
    f.write(content)

print("Successfully updated src/styles/index.css")
