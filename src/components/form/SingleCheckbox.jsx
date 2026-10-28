// src/components/form/SingleCheckbox.jsx
import React from 'react';
import { Check } from 'lucide-react';
import { ValidationMessage } from './ValidationMessage';

export const SingleCheckbox = ({
  id,
  name,
  label,
  checked = false,
  onChange,
  onBlur,
  error,
  required = false
}) => {
  const inputId = id || name;

  return (
    <div className={`form-group ${error ? 'has-field-error' : ''}`} id={`group-${name}`}>
      <label
        className={`single-checkbox-card ${checked ? 'checked' : ''} ${error ? 'has-error' : ''}`}
        htmlFor={inputId}
      >
        <div className="checkbox-input-box">
          <input
            id={inputId}
            name={name}
            type="checkbox"
            checked={!!checked}
            onChange={(e) => onChange({ target: { name, value: e.target.checked } })}
            onBlur={onBlur}
            required={required}
            aria-required={required}
            aria-invalid={!!error}
            aria-describedby={error ? `${name}-error` : undefined}
            className="single-checkbox-input"
          />
          <span className="custom-checkbox-box" aria-hidden="true">
            <Check size={14} className="custom-checkbox-icon" />
          </span>
        </div>
        <span className="single-checkbox-text">
          {label}
          {required && <span className="required-star" aria-hidden="true">*</span>}
        </span>
      </label>
      <ValidationMessage id={`${name}-error`} message={error} />
    </div>
  );
};

export default SingleCheckbox;
