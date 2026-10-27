// src/components/form/CheckboxGroup.jsx
import React from 'react';
import { ValidationMessage } from './ValidationMessage';

export const CheckboxGroup = ({
  name,
  label,
  options = [],
  values = [],
  onChange,
  onBlur,
  error,
  required = false,
  helperText = '',
  maxChoices = 3
}) => {
  const handleToggle = (optionValue) => {
    let nextValues;
    if (values.includes(optionValue)) {
      nextValues = values.filter((v) => v !== optionValue);
    } else {
      if (maxChoices && values.length >= maxChoices) {
        return; // limit exceeded
      }
      nextValues = [...values, optionValue];
    }
    onChange({ target: { name, value: nextValues } });
  };

  return (
    <fieldset className="form-group" id={`group-${name}`} style={{ border: 'none', padding: 0, margin: '0 0 1.75rem 0' }}>
      <legend className="form-label" style={{ display: 'table', float: 'none', width: '100%', marginBottom: '0.5rem' }}>
        {label}
        {required && <span className="required-star">*</span>}
      </legend>
      {helperText && <div id={`${name}-helper`} className="form-helper" style={{ marginBottom: '0.6rem' }}>{helperText}</div>}
      <div
        className="choice-grid"
        role="group"
        aria-describedby={error ? `${name}-error` : helperText ? `${name}-helper` : undefined}
      >
        {options.map((option) => {
          const optionValue = typeof option === 'string' ? option : option.value;
          const optionLabel = typeof option === 'string' ? option : option.label;
          const isChecked = values.includes(optionValue);

          return (
            <label
              key={optionValue}
              className={`choice-card ${isChecked ? 'selected' : ''}`}
            >
              <input
                type="checkbox"
                name={name}
                value={optionValue}
                checked={isChecked}
                onChange={() => handleToggle(optionValue)}
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
