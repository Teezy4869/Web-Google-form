# scratch/update_css_phase7.py
import sys

def update():
    file_path = "src/styles/index.css"
    with open(file_path, "r", encoding="utf-8") as f:
        content = f.read()

    # Target the submit button section around line 1975
    old_submit_css = """.submit-btn-luxury {
  padding: 0.95rem 2rem;
  font-size: 1rem;
  font-weight: 700;
  letter-spacing: 0.02em;
  border-radius: var(--radius-md);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.65rem;
  max-width: 100%;
  box-sizing: border-box;
  text-align: center;
  line-height: 1.35;
}

.submit-btn-icon {
  flex-shrink: 0;
}

.submit-btn-sparkle {
  flex-shrink: 0;
}

.submit-btn-text {
  display: inline-block;
  max-width: 100%;
  text-align: center;
}

@media (max-width: 640px) {
  .form-submit-row {
    flex-direction: column;
    align-items: stretch;
    gap: 1.15rem;
  }

  .form-security-badge {
    text-align: center;
    justify-content: center;
    font-size: 0.78rem;
  }

  .form-submit-actions {
    width: 100%;
    margin-left: 0;
    flex-direction: column;
    align-items: stretch;
    gap: 0.75rem;
  }

  .submit-btn-luxury {
    width: 100%;
    padding: 0.85rem 1.15rem;
    font-size: 0.95rem;
    white-space: normal;
  }
}

@media (max-width: 380px) {
  .submit-btn-luxury {
    padding: 0.75rem 0.85rem;
    font-size: 0.88rem;
    gap: 0.45rem;
  }

  .submit-btn-sparkle {
    display: none;
  }
}"""

    new_submit_css = """/* Official Registration Notice Banner */
.registration-notice-banner {
  padding: 1.25rem 1.5rem;
  border-radius: var(--radius-md);
  background: linear-gradient(135deg, rgba(198, 65, 122, 0.12) 0%, rgba(38, 12, 18, 0.85) 100%);
  border: 1px solid var(--border-gold);
  border-left: 4px solid var(--champagne);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.25);
  box-sizing: border-box;
  max-width: 100%;
}

.notice-banner-header {
  display: flex;
  align-items: center;
  gap: 0.65rem;
  margin-bottom: 0.65rem;
}

.notice-banner-icon {
  flex-shrink: 0;
  color: var(--champagne);
}

.notice-banner-title {
  font-size: 1.05rem;
  font-weight: 700;
  color: #ffffff;
  margin: 0;
  letter-spacing: 0.02em;
}

.notice-banner-list {
  margin: 0;
  padding-left: 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 0.45rem;
  font-size: 0.92rem;
  line-height: 1.6;
  color: var(--text-light);
}

.notice-banner-list li {
  position: relative;
}

/* Submit Button & Responsive Safeguards */
.submit-btn-luxury {
  min-height: 48px;
  padding: 0.95rem 2rem;
  font-size: 1rem;
  font-weight: 700;
  letter-spacing: 0.02em;
  border-radius: var(--radius-md);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.65rem;
  max-width: 100%;
  box-sizing: border-box;
  text-align: center;
  line-height: 1.35;
  white-space: normal;
  word-break: break-word;
  overflow-wrap: break-word;
}

.submit-btn-icon {
  flex-shrink: 0;
}

.submit-btn-sparkle {
  flex-shrink: 0;
}

.submit-btn-text {
  display: inline-block;
  max-width: 100%;
  text-align: center;
  word-break: break-word;
  overflow-wrap: break-word;
}

@media (max-width: 640px) {
  .registration-notice-banner {
    padding: 1rem 1.15rem;
  }

  .notice-banner-title {
    font-size: 0.98rem;
  }

  .notice-banner-list {
    padding-left: 1.1rem;
    font-size: 0.88rem;
    gap: 0.4rem;
  }

  .form-submit-row {
    flex-direction: column;
    align-items: stretch;
    gap: 1.15rem;
  }

  .form-security-badge {
    text-align: center;
    justify-content: center;
    font-size: 0.78rem;
  }

  .form-submit-actions {
    width: 100%;
    margin-left: 0;
    flex-direction: column;
    align-items: stretch;
    gap: 0.75rem;
  }

  .submit-btn-luxury {
    width: 100%;
    min-height: 48px;
    padding: 0.85rem 1rem;
    font-size: 0.95rem;
    white-space: normal;
    word-break: break-word;
  }
}

@media (max-width: 380px) {
  .submit-btn-luxury {
    padding: 0.75rem 0.75rem;
    font-size: 0.88rem;
    gap: 0.45rem;
    min-height: 48px;
  }

  .submit-btn-sparkle {
    display: none;
  }
}

@media (max-width: 360px) {
  .registration-notice-banner {
    padding: 0.85rem 0.95rem;
  }

  .notice-banner-list {
    padding-left: 1rem;
    font-size: 0.84rem;
  }

  .submit-btn-luxury {
    font-size: 0.85rem;
    padding: 0.75rem 0.5rem;
  }
}"""

    if old_submit_css in content:
        content = content.replace(old_submit_css, new_submit_css)
    else:
        # Normalize CRLF and test
        content_norm = content.replace("\r\n", "\n")
        old_norm = old_submit_css.replace("\r\n", "\n")
        new_norm = new_submit_css.replace("\r\n", "\n")
        if old_norm in content_norm:
            content = content_norm.replace(old_norm, new_norm)
        else:
            print("ERROR: old_submit_css block not found!")
            sys.exit(1)

    with open(file_path, "w", encoding="utf-8") as f:
        f.write(content)

    print("Updated index.css successfully.")

if __name__ == "__main__":
    update()
