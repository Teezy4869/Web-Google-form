// src/components/form/TextInput.jsx
import React from 'react';
import { ValidationMessage } from './ValidationMessage';

export const TextInput = ({
  id,
  name,
  label,
  value,
  onChange,
  onBlur,
  error,
  required = false,
  placeholder = '',
  type = 'text',
  helperText = '',
  maxLength,
  autoComplete
}) => {
  const inputId = id || name;

  return (
    <div className={`form-group ${error ? 'has-field-error' : ''}`} id={`group-${name}`}>
      <label htmlFor={inputId} className="form-label">
        <span className="form-label-text">{label}</span>
        {required && <span className="required-star" aria-hidden="true">*</span>}
      </label>
      <div className="input-wrapper">
        <input
          id={inputId}
          name={name}
          type={type}
          value={value ?? ''}
          onChange={onChange}
          onBlur={onBlur}
          placeholder={placeholder}
          maxLength={maxLength}
          autoComplete={autoComplete}
          className={`form-control ${error ? 'has-error' : ''}`}
          aria-invalid={!!error}
          aria-required={required}
          aria-describedby={
            [error ? `${name}-error` : null, helperText ? `${name}-helper` : null]
              .filter(Boolean)
              .join(' ') || undefined
          }
        />
      </div>
      {helperText && !error && (
        <div id={`${name}-helper`} className="form-helper">
          {helperText}
        </div>
      )}
      <ValidationMessage id={`${name}-error`} message={error} />
    </div>
  );
};

export default TextInput;
