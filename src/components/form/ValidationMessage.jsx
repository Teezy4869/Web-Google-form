// src/components/form/ValidationMessage.jsx
import React from 'react';
import { AlertCircle } from 'lucide-react';

/**
 * Accessible Validation Message Component — Solfera D-DAY 2026
 * Keeps live region container in the DOM so assistive tech (screen readers)
 * can register the live region prior to dynamic message updates.
 */
export const ValidationMessage = ({ id, message }) => {
  return (
    <div
      id={id}
      className={`error-message ${message ? 'visible' : ''}`}
      role="alert"
      aria-live="polite"
      style={!message ? { display: 'none' } : undefined}
    >
      {message && (
        <>
          <span className="error-icon-box" aria-hidden="true">
            <AlertCircle size={14} />
          </span>
          <span className="error-text">{message}</span>
        </>
      )}
    </div>
  );
};

export default ValidationMessage;
