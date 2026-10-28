// src/components/form/FormSection.jsx
import React from 'react';

/**
 * Accessible Form Section Landmark — Solfera D-DAY 2026
 * Uses <h2> for clean heading hierarchy under page <h1>
 */
export const FormSection = ({ icon: Icon, title, description, children }) => {
  const sectionId = `section-${title.replace(/[^a-zA-Z0-9]/g, '-').toLowerCase()}`;

  return (
    <section className="form-section-container" aria-labelledby={sectionId}>
      <div className="form-section-header">
        <div className="form-section-title-wrap">
          {Icon && (
            <div className="form-section-icon-badge" aria-hidden="true">
              <Icon size={20} />
            </div>
          )}
          <div className="form-section-headings">
            <h2 id={sectionId} className="form-section-title font-display">
              {title}
            </h2>
            {description && <p className="form-section-desc">{description}</p>}
          </div>
        </div>
      </div>
      <div className="form-section-body">{children}</div>
      <div className="form-section-divider" aria-hidden="true" />
    </section>
  );
};

export default FormSection;
