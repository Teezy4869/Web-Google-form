# scratch/clean_qa_stale.py
import sys

def run():
    # 1. NotFoundPage.jsx
    with open("src/pages/NotFoundPage.jsx", "r", encoding="utf-8") as f:
        not_found = f.read()
    not_found = not_found.replace(
        "trang sự kiện GALA NIGHT 2026.",
        'trang sự kiện Gala Night D-DAY 2026: “SOLFERA”.'
    )
    with open("src/pages/NotFoundPage.jsx", "w", encoding="utf-8") as f:
        f.write(not_found)
    print("Fixed NotFoundPage.jsx")

    # 2. registrationConfig.js
    with open("src/data/registrationConfig.js", "r", encoding="utf-8") as f:
        config = f.read()
    config = config.replace(
        'helperText: "Số điện thoại có Zalo để Ban Tổ Chức tiện liên lạc.",',
        'helperText: "Số điện thoại chính thức để Ban Tổ Chức tiện liên lạc.",'
    )
    with open("src/data/registrationConfig.js", "w", encoding="utf-8") as f:
        f.write(config)
    print("Fixed registrationConfig.js phone helperText")

    # 3. index.css dead CSS cleanup
    with open("src/styles/index.css", "r", encoding="utf-8") as f:
        css = f.read()

    dead_css = """.mission-spotlight-card {
  padding: clamp(2.25rem, 4.5vw, 3.25rem);
  border: 1px solid var(--border-gold);
  background: linear-gradient(135deg, rgba(129, 34, 64, 0.18) 0%, rgba(30, 9, 15, 0.92) 100%);
  text-align: center;
  max-width: 900px;
  margin: 0 auto;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5), var(--shadow-glow);
  border-radius: var(--radius-xl);
}

.mission-title {
  font-size: clamp(1.4rem, 2.5vw, 1.85rem);
  margin-bottom: 0.85rem;
  color: #ffffff;
}

.mission-text {
  font-size: 1.02rem;
  line-height: 1.75;
  color: var(--text-main);
  max-width: 780px;
  margin: 0 auto;
}

.pillar-card {
  display: flex;
  gap: 1.25rem;
  align-items: flex-start;
  padding: 2rem;
}

.pillar-icon-box {
  width: 52px;
  height: 52px;
  border-radius: var(--radius-md);
  background: rgba(198, 65, 122, 0.16);
  color: var(--champagne);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  border: 1px solid var(--border-gold);
}"""

    if dead_css in css:
        css = css.replace(dead_css, "/* Purged obsolete mission & pillar styles in Phase 8 QA */")
    else:
        # Normalize CRLF
        css_norm = css.replace("\r\n", "\n")
        dead_norm = dead_css.replace("\r\n", "\n")
        if dead_norm in css_norm:
            css = css_norm.replace(dead_norm, "/* Purged obsolete mission & pillar styles in Phase 8 QA */")
        else:
            print("Warning: dead_css block not found exactly in index.css")

    with open("src/styles/index.css", "w", encoding="utf-8") as f:
        f.write(css)
    print("Purged dead CSS in index.css")

if __name__ == "__main__":
    run()

