// Radio Component - Laravel-admin style radio buttons
import React from 'react';

/**
 * Radio Component
 * 
 * Features:
 * - Single radio button
 * - Radio button groups
 * - Custom styling
 * - Validation states
 * - Minimalistic design
 */
export default function Radio({ 
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

    const radioGroupStyle = {
        display: 'flex',
        alignItems: 'flex-start',
        gap: '6px'
    };

    const radioStyle = {
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

    const radioId = id || `radio-${name}-${value}`;

    return (
        <div 
            className={`radio-wrapper ${className}`}
            style={{ ...wrapperStyle, ...style }}
        >
            <div style={radioGroupStyle}>
                <input
                    type="radio"
                    id={radioId}
                    name={name}
                    value={value}
                    checked={checked}
                    disabled={disabled}
                    required={required}
                    style={radioStyle}
                    onChange={handleChange}
                    {...props}
                />
                
                {label && (
                    <label 
                        htmlFor={radioId}
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

// RadioGroup component for multiple radio options
export function RadioGroup({ 
    label = '',
    name = '',
    options = [],
    value = '',
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

    const handleOptionChange = (optionValue) => {
        if (onChange) {
            onChange({ target: { name, value: optionValue } });
        }
    };

    return (
        <div 
            className={`radio-group ${className}`}
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
                    const isChecked = value === optionValue;
                    
                    return (
                        <Radio
                            key={index}
                            id={`${name}-${optionValue}`}
                            name={name}
                            value={optionValue}
                            label={optionLabel}
                            checked={isChecked}
                            disabled={disabled}
                            onChange={() => handleOptionChange(optionValue)}
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
