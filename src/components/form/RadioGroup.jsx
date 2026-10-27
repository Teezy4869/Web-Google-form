// src/components/form/RadioGroup.jsx
import React from 'react';
import { ValidationMessage } from './ValidationMessage';

export const RadioGroup = ({
  name,
  label,
  options = [],
  value,
  onChange,
  onBlur,
  error,
  required = false,
  helperText = ''
}) => {
  return (
    <fieldset className="form-group" id={`group-${name}`} style={{ border: 'none', padding: 0, margin: '0 0 1.75rem 0' }}>
      <legend className="form-label" style={{ display: 'table', float: 'none', width: '100%', marginBottom: '0.5rem' }}>
        {label}
        {required && <span className="required-star">*</span>}
      </legend>
      {helperText && <div id={`${name}-helper`} className="form-helper" style={{ marginBottom: '0.6rem' }}>{helperText}</div>}
      <div
        className="choice-grid"
        role="radiogroup"
        aria-required={required}
        aria-describedby={error ? `${name}-error` : helperText ? `${name}-helper` : undefined}
      >
        {options.map((option) => {
          const optionValue = typeof option === 'string' ? option : option.value;
          const optionLabel = typeof option === 'string' ? option : option.label;
          const isSelected = value === optionValue;

          return (
            <label
              key={optionValue}
              className={`choice-card ${isSelected ? 'selected' : ''}`}
            >
              <input
                type="radio"
                name={name}
                value={optionValue}
                checked={isSelected}
                onChange={() => onChange({ target: { name, value: optionValue } })}
                onBlur={onBlur}
              />
              <span className="choice-text">{optionLabel}</span>
            </label>
          );
        })}
      </div>
      <ValidationMessage id={`${name}-error`} message={error} />
    </fieldset>
  );
};
