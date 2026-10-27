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
  maxLength = 2000,
  helperText = ''
}) => {
  const currentLength = (value || '').length;

  return (
    <div className="form-group" id={`group-${name}`}>
      <label htmlFor={id || name} className="form-label">
        {label}
        {required && <span className="required-star">*</span>}
      </label>
      <textarea
        id={id || name}
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
      <div id={`${name}-helper`} className="form-helper">
        <span>{helperText || (minLength ? `Tối thiểu ${minLength} ký tự` : '')}</span>
        <span>
          {currentLength} / {maxLength}
        </span>
      </div>
      <ValidationMessage id={`${name}-error`} message={error} />
    </div>
  );
};
