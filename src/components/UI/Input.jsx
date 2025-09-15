// Input Component - Modern Hospital Design System
import React from 'react';

/**
 * Input Component - Professional Hospital Form Input
 * 
 * Features:
 * - Consistent design system theming
 * - Professional typography using Inter font
 * - Clean geometric styling
 * - Proper validation states
 */
export default function Input({ 
    label = '',
    type = 'text',
    id = '',
    name = '',
    value = '',
    placeholder = '',
    prepend = '',
    append = '',
    error = '',
    helpText = '',
    required = false,
    disabled = false,
    size = 'default',
    className = '',
    style = {},
    onChange,
    ...props 
}) {
    const sizes = {
        sm: { height: '32px', padding: '6px 10px', fontSize: '0.8125rem' },
        default: { height: '36px', padding: '8px 12px', fontSize: '0.875rem' },
        lg: { height: '40px', padding: '10px 14px', fontSize: '0.9375rem' }
    };

    const sizeStyle = sizes[size] || sizes.default;

    const formGroupStyle = {
        marginBottom: '1rem'
    };

    const labelStyle = {
        display: 'block',
        fontSize: '0.8125rem',
        fontWeight: '500',
        fontFamily: 'var(--font-family)',
        color: 'var(--text-primary)',
        marginBottom: '0.375rem',
        letterSpacing: '-0.01em'
    };

    const inputGroupStyle = {
        display: 'flex',
        alignItems: 'stretch',
        position: 'relative'
    };

    const inputStyle = {
        flex: 1,
        ...sizeStyle,
        fontFamily: 'var(--font-family)',
        fontWeight: '400',
        border: error ? '1px solid var(--danger-color)' : (disabled ? '1px solid #e5e7eb' : '1px solid var(--border-color)'),
        borderRadius: '0',
        backgroundColor: disabled ? '#f9fafb' : 'var(--card-background)',
        color: disabled ? 'var(--muted-color)' : 'var(--text-primary)',
        outline: 'none',
        boxShadow: 'none',
        transition: 'border-color 0.15s ease, box-shadow 0.15s ease',
        ...style
    };

    // Focus styles
    const inputFocusStyle = {
        borderColor: 'var(--primary-color)',
        boxShadow: '0 0 0 3px rgba(10, 30, 52, 0.1)'
    };

    const addonStyle = {
        display: 'flex',
        alignItems: 'center',
        padding: '0 12px',
        fontSize: sizeStyle.fontSize,
        backgroundColor: '#f8fafc',
        border: '1px solid var(--border-color)',
        color: 'var(--text-secondary)',
        fontFamily: 'var(--font-family)',
        fontWeight: '500'
    };

    const prependStyle = {
        ...addonStyle,
        borderRight: 'none',
        borderTopRightRadius: '0',
        borderBottomRightRadius: '0',
        borderTopLeftRadius: '6px',
        borderBottomLeftRadius: '6px'
    };

    const appendStyle = {
        ...addonStyle,
        borderLeft: 'none',
        borderTopLeftRadius: '0',
        borderBottomLeftRadius: '0',
        borderTopRightRadius: '6px',
        borderBottomRightRadius: '6px'
    };

    const errorStyle = {
        fontSize: '0.75rem',
        color: 'var(--danger-color)',
        marginTop: '0.25rem',
        fontWeight: '500'
    };

    const helpStyle = {
        fontSize: '0.75rem',
        color: 'var(--text-secondary)',
        marginTop: '0.25rem',
        fontFamily: 'var(--font-family)'
    };

    // Adjust input border based on prepend/append
    const adjustedInputStyle = {
        ...inputStyle,
        borderLeft: prepend ? 'none' : inputStyle.border,
        borderRight: append ? 'none' : inputStyle.border
    };

    return (
        <div className={`form-group ${className}`} style={formGroupStyle}>
            {label && (
                <label 
                    htmlFor={id || name}
                    style={labelStyle}
                >
                    {label}
                    {required && <span style={{ color: '#dc3545' }}>*</span>}
                </label>
            )}
            
            <div style={inputGroupStyle}>
                {prepend && (
                    <span style={prependStyle}>
                        {prepend}
                    </span>
                )}
                
                <input
                    type={type}
                    id={id || name}
                    name={name}
                    value={value}
                    placeholder={placeholder}
                    required={required}
                    disabled={disabled}
                    style={adjustedInputStyle}
                    onChange={onChange}
                    {...props}
                />
                
                {append && (
                    <span style={appendStyle}>
                        {append}
                    </span>
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
