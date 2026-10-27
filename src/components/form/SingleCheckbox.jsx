// src/components/form/SingleCheckbox.jsx
import React from 'react';
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
  return (
    <div className="form-group" id={`group-${name}`}>
      <label className="single-checkbox-card" htmlFor={id || name}>
        <input
          id={id || name}
          name={name}
          type="checkbox"
          checked={!!checked}
          onChange={(e) => onChange({ target: { name, value: e.target.checked } })}
          onBlur={onBlur}
          required={required}
          aria-required={required}
          aria-invalid={!!error}
          aria-describedby={error ? `${name}-error` : undefined}
        />
        <span className="single-checkbox-text">
          {label}
          {required && <span className="required-star">*</span>}
        </span>
      </label>
      <ValidationMessage id={`${name}-error`} message={error} />
    </div>
  );
};
