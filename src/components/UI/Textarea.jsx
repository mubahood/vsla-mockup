// Textarea Component - Laravel-admin style textarea
import React from 'react';

/**
 * Textarea Component
 * 
 * Features:
 * - Multi-line text input
 * - Auto-resize option
 * - Character counting
 * - Validation states
 * - Minimalistic design
 */
export default function Textarea({ 
    label = '',
    id = '',
    name = '',
    value = '',
    placeholder = '',
    rows = 4,
    cols = '',
    maxLength = '',
    autoResize = false,
    showCharCount = false,
    required = false,
    disabled = false,
    error = '',
    helpText = '',
    className = '',
    style = {},
    onChange,
    ...props 
}) {
    const textareaRef = React.useRef(null);

    const formGroupStyle = {
        marginBottom: '8px'
    };

    const labelStyle = {
        display: 'block',
        fontSize: '12px',
        fontWeight: '500',
        color: '#333333',
        marginBottom: '3px'
    };

    const textareaStyle = {
        width: '100%',
        padding: '4px 6px',
        fontSize: '14px',
        lineHeight: '1.4',
        border: error ? '1px solid #dc3545' : '1px solid #d1d5db',
        borderRadius: '0',
        backgroundColor: disabled ? '#f8f9fa' : '#ffffff',
        color: '#333333',
        outline: 'none',
        boxShadow: 'none',
        resize: autoResize ? 'none' : 'vertical',
        fontFamily: 'inherit',
        ...style
    };

    const errorStyle = {
        fontSize: '11px',
        color: '#dc3545',
        marginTop: '2px'
    };

    const helpStyle = {
        fontSize: '11px',
        color: '#666666',
        marginTop: '2px'
    };

    const charCountStyle = {
        fontSize: '11px',
        color: '#666666',
        marginTop: '2px',
        textAlign: 'right'
    };

    const footerStyle = {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: '2px'
    };

    // Auto-resize functionality
    React.useEffect(() => {
        if (autoResize && textareaRef.current) {
            const textarea = textareaRef.current;
            textarea.style.height = 'auto';
            textarea.style.height = `${textarea.scrollHeight}px`;
        }
    }, [value, autoResize]);

    const handleChange = (e) => {
        if (onChange) {
            onChange(e);
        }
    };

    const currentLength = value ? value.length : 0;
    const isOverLimit = maxLength && currentLength > maxLength;

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
            
            <textarea
                ref={textareaRef}
                id={id || name}
                name={name}
                value={value}
                placeholder={placeholder}
                rows={rows}
                cols={cols}
                maxLength={maxLength}
                required={required}
                disabled={disabled}
                style={textareaStyle}
                onChange={handleChange}
                {...props}
            />
            
            <div style={footerStyle}>
                <div>
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
                
                {showCharCount && (
                    <div style={{
                        ...charCountStyle,
                        color: isOverLimit ? '#dc3545' : '#666666'
                    }}>
                        {currentLength}{maxLength && ` / ${maxLength}`}
                    </div>
                )}
            </div>
        </div>
    );
}
