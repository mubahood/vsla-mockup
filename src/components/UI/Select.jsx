// Select Component - Modern Hospital Design System
import React from 'react';

/**
 * Select Component - Professional Hospital Form Select
 * 
 * Features:
 * - Consistent design system theming
 * - Professional typography using Inter font
 * - Clean geometric styling
 * - Proper validation states
 */
export default function Select({ 
    label = '',
    id = '',
    name = '',
    value = '',
    children,
    placeholder = 'Select...',
    disabled = false,
    required = false,
    error = '',
    helpText = '',
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

    const selectStyle = {
        width: '100%',
        ...sizeStyle,
        fontFamily: 'var(--font-family)',
        fontWeight: '400',
        border: error ? '1px solid var(--danger-color)' : (disabled ? '1px solid #e5e7eb' : '1px solid var(--border-color)'),
        borderRadius: '0',
        backgroundColor: disabled ? '#f9fafb' : 'var(--card-background)',
        color: disabled ? 'var(--muted-color)' : 'var(--text-primary)',
        outline: 'none',
        cursor: disabled ? 'not-allowed' : 'pointer',
        transition: 'border-color 0.15s ease, box-shadow 0.15s ease',
        appearance: 'none',
        backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e")`,
        backgroundPosition: 'right 0.75rem center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: '1rem 1rem',
        paddingRight: '2.5rem',
        ...style
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

    return (
        <div className={`form-group ${className}`} style={formGroupStyle}>
            {label && (
                <label 
                    htmlFor={id || name}
                    style={labelStyle}
                >
                    {label}
                    {required && <span style={{ color: 'var(--danger-color)' }}>*</span>}
                </label>
            )}
            
            <select
                id={id || name}
                name={name}
                value={value}
                required={required}
                disabled={disabled}
                style={selectStyle}
                onChange={onChange}
                {...props}
            >
                {placeholder && (
                    <option value="" disabled>
                        {placeholder}
                    </option>
                )}
                {children}
            </select>
            
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
