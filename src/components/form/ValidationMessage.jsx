// src/components/form/ValidationMessage.jsx
import React from 'react';
import { AlertCircle } from 'lucide-react';

export const ValidationMessage = ({ id, message }) => {
  if (!message) return null;

  return (
    <div id={id} className="error-message" role="alert" aria-live="polite">
      <AlertCircle size={14} aria-hidden="true" />
      <span>{message}</span>
    </div>
  );
};
