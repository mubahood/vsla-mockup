// Checkbox Component - Laravel-admin style checkbox
import React from 'react';

/**
 * Checkbox Component
 * 
 * Features:
 * - Single and group checkboxes
 * - Custom styling
 * - Label support
 * - Validation states
 * - Minimalistic design
 */
export default function Checkbox({ 
    label = '',
    id = '',
    name = '',
    value = '',
    checked = false,
    disabled = false,
    required = false,
    error = '',
    helpText = '',
    className = '',
    style = {},
    onChange,
    ...props 
}) {
    const wrapperStyle = {
        marginBottom: '8px'
    };

    const checkboxGroupStyle = {
        display: 'flex',
        alignItems: 'flex-start',
        gap: '6px'
    };

    const checkboxStyle = {
        width: '16px',
        height: '16px',
        marginTop: '1px',
        accentColor: '#007bff'
    };

    const labelStyle = {
        fontSize: '14px',
        color: disabled ? '#999999' : '#333333',
        cursor: disabled ? 'not-allowed' : 'pointer',
        lineHeight: '1.4',
        userSelect: 'none'
    };

    const errorStyle = {
        fontSize: '11px',
        color: '#dc3545',
        marginTop: '2px',
        marginLeft: '22px'
    };

    const helpStyle = {
        fontSize: '11px',
        color: '#666666',
        marginTop: '2px',
        marginLeft: '22px'
    };

    const handleChange = (e) => {
        if (onChange) {
            onChange(e);
        }
    };

    const checkboxId = id || `checkbox-${name}-${value}`;

    return (
        <div 
            className={`checkbox-wrapper ${className}`}
            style={{ ...wrapperStyle, ...style }}
        >
            <div style={checkboxGroupStyle}>
                <input
                    type="checkbox"
                    id={checkboxId}
                    name={name}
                    value={value}
                    checked={checked}
                    disabled={disabled}
                    required={required}
                    style={checkboxStyle}
                    onChange={handleChange}
                    {...props}
                />
                
                {label && (
                    <label 
                        htmlFor={checkboxId}
                        style={labelStyle}
                    >
                        {label}
                        {required && <span style={{ color: '#dc3545' }}>*</span>}
                    </label>
                )}
            </div>
            
            {error && (
                <div style={errorStyle}>
                    {error}
                </div>
            )}
            
            {helpText && !error && (
                <div style={helpStyle}>
                    {helpText}
                </div>
            )}
        </div>
    );
}

// CheckboxGroup component for multiple checkboxes
export function CheckboxGroup({ 
    label = '',
    name = '',
    options = [],
    value = [],
    disabled = false,
    required = false,
    error = '',
    helpText = '',
    layout = 'vertical', // vertical, horizontal
    className = '',
    style = {},
    onChange,
    ...props 
}) {
    const groupStyle = {
        marginBottom: '8px'
    };

    const groupLabelStyle = {
        display: 'block',
        fontSize: '12px',
        fontWeight: '500',
        color: '#333333',
        marginBottom: '6px'
    };

    const optionsContainerStyle = {
        display: layout === 'horizontal' ? 'flex' : 'block',
        gap: layout === 'horizontal' ? '12px' : '0',
        flexWrap: 'wrap'
    };

    const errorStyle = {
        fontSize: '11px',
        color: '#dc3545',
        marginTop: '4px'
    };

    const helpStyle = {
        fontSize: '11px',
        color: '#666666',
        marginTop: '4px'
    };

    const handleOptionChange = (optionValue, checked) => {
        if (onChange) {
            let newValue;
            if (checked) {
                newValue = [...value, optionValue];
            } else {
                newValue = value.filter(v => v !== optionValue);
            }
            onChange({ target: { name, value: newValue } });
        }
    };

    return (
        <div 
            className={`checkbox-group ${className}`}
            style={{ ...groupStyle, ...style }}
            {...props}
        >
            {label && (
                <label style={groupLabelStyle}>
                    {label}
                    {required && <span style={{ color: '#dc3545' }}>*</span>}
                </label>
            )}
            
            <div style={optionsContainerStyle}>
                {options.map((option, index) => {
                    const optionValue = typeof option === 'object' ? option.value : option;
                    const optionLabel = typeof option === 'object' ? option.label : option;
                    const isChecked = value.includes(optionValue);
                    
                    return (
                        <Checkbox
                            key={index}
                            id={`${name}-${optionValue}`}
                            name={name}
                            value={optionValue}
                            label={optionLabel}
                            checked={isChecked}
                            disabled={disabled}
                            onChange={(e) => handleOptionChange(optionValue, e.target.checked)}
                            style={{ marginBottom: layout === 'horizontal' ? '0' : '4px' }}
                        />
                    );
                })}
            </div>
            
            {error && (
                <div style={errorStyle}>
                    {error}
                </div>
            )}
            
            {helpText && !error && (
                <div style={helpStyle}>
                    {helpText}
                </div>
            )}
        </div>
    );
}
