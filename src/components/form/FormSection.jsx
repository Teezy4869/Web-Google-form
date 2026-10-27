// src/components/form/FormSection.jsx
import React from 'react';

export const FormSection = ({ icon: Icon, title, description, children }) => {
  return (
    <div className="form-section-container">
      <div className="form-section-header">
        <h3 className="form-section-title">
          {Icon && <Icon size={22} className="text-primary" />}
          <span>{title}</span>
        </h3>
        {description && <p className="form-section-desc">{description}</p>}
      </div>
      <div className="form-section-body">{children}</div>
    </div>
  );
};
