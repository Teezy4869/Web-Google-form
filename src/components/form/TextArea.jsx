// src/components/form/TextArea.jsx
import React from 'react';
import { ValidationMessage } from './ValidationMessage';

export const TextArea = ({
  id,
  name,
  label,
  value,
  onChange,
  onBlur,
  error,
  required = false,
  placeholder = '',
  rows = 4,
  minLength,
  maxLength = 1000,
  helperText = ''
}) => {
  const currentLength = (value || '').length;
  const inputId = id || name;
  const isNearLimit = maxLength && currentLength > maxLength * 0.85;

  return (
    <div className={`form-group ${error ? 'has-field-error' : ''}`} id={`group-${name}`}>
      <label htmlFor={inputId} className="form-label">
        <span className="form-label-text">{label}</span>
        {required && <span className="required-star" aria-hidden="true">*</span>}
      </label>
      <div className="input-wrapper">
        <textarea
          id={inputId}
          name={name}
          rows={rows}
          value={value ?? ''}
          onChange={onChange}
          onBlur={onBlur}
          placeholder={placeholder}
          maxLength={maxLength}
          className={`form-control ${error ? 'has-error' : ''}`}
          aria-invalid={!!error}
          aria-required={required}
          aria-describedby={
            [error ? `${name}-error` : null, `${name}-helper`]
              .filter(Boolean)
              .join(' ') || undefined
          }
        />
      </div>
      <div id={`${name}-helper`} className="form-helper">
        <span className="helper-text">
          {helperText || (minLength ? `Tối thiểu ${minLength} ký tự` : '')}
        </span>
        <span
          className={`char-counter ${isNearLimit ? 'near-limit' : ''}`}
          aria-live="polite"
        >
          {currentLength} / {maxLength}
        </span>
      </div>
      <ValidationMessage id={`${name}-error`} message={error} />
    </div>
  );
};

export default TextArea;
