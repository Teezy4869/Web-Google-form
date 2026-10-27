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
  maxLength
}) => {
  return (
    <div className="form-group" id={`group-${name}`}>
      <label htmlFor={id || name} className="form-label">
        {label}
        {required && <span className="required-star">*</span>}
      </label>
      <input
        id={id || name}
        name={name}
        type={type}
        value={value ?? ''}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
        maxLength={maxLength}
        className={`form-control ${error ? 'has-error' : ''}`}
        aria-invalid={!!error}
        aria-required={required}
        aria-describedby={
          [error ? `${name}-error` : null, helperText ? `${name}-helper` : null]
            .filter(Boolean)
            .join(' ') || undefined
        }
      />
      {helperText && !error && <div id={`${name}-helper`} className="form-helper">{helperText}</div>}
      <ValidationMessage id={`${name}-error`} message={error} />
    </div>
  );
};
