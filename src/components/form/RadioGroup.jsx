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
    <fieldset
      className={`form-group ${error ? 'has-field-error' : ''}`}
      id={`group-${name}`}
      style={{ border: 'none', padding: 0, margin: '0 0 1.75rem 0' }}
    >
      <legend
        className="form-label"
        style={{ display: 'table', float: 'none', width: '100%', marginBottom: '0.65rem' }}
      >
        <span className="form-label-text">{label}</span>
        {required && <span className="required-star" aria-hidden="true">*</span>}
      </legend>
      {helperText && !error && (
        <div id={`${name}-helper`} className="form-helper" style={{ marginBottom: '0.75rem' }}>
          {helperText}
        </div>
      )}
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
                className="choice-radio-input"
              />
              <span className="choice-radio-indicator" aria-hidden="true">
                <span className="choice-radio-dot" />
              </span>
              <span className="choice-text">{optionLabel}</span>
            </label>
          );
        })}
      </div>
      <ValidationMessage id={`${name}-error`} message={error} />
    </fieldset>
  );
};

export default RadioGroup;
