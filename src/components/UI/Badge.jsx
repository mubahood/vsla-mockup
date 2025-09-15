// Badge Component - Laravel-admin style badges/labels
import React from 'react';

/**
 * Badge Component - Professional Hospital Status Labels
 * 
 * Features:
 * - Clinical status indicators
 * - Flat geometric design
 * - Professional color coding
 * - Hospital-grade typography
 */
export default function Badge({ 
    children,
    variant = 'default',
    size = 'default',
    icon = '',
    className = '',
    style = {},
    ...props 
}) {
    const variants = {
        default: { bg: '#f0f0f0', text: '#2c2c2c', border: '#d0d0d0' },
        primary: { bg: '#dbeafe', text: '#1e40af', border: '#93c5fd' },
        secondary: { bg: '#e2e8f0', text: '#475569', border: '#cbd5e0' },
        success: { bg: '#dcfce7', text: '#166534', border: '#86efac' },
        warning: { bg: '#fef3c7', text: '#92400e', border: '#fde047' },
        danger: { bg: '#fee2e2', text: '#991b1b', border: '#fca5a5' },
        info: { bg: '#e0f2fe', text: '#0c4a6e', border: '#7dd3fc' },
        light: { bg: '#f8f9fa', text: '#6c757d', border: '#e9ecef' },
        dark: { bg: '#374151', text: '#f9fafb', border: '#4b5563' }
    };

    const sizes = {
        xs: { 
            padding: '1px 4px', 
            fontSize: '9px', 
            height: '16px',
            iconSize: '8px'
        },
        sm: { 
            padding: '2px 6px', 
            fontSize: '10px', 
            height: '18px',
            iconSize: '10px'
        },
        default: { 
            padding: '3px 6px', 
            fontSize: '11px', 
            height: '20px',
            iconSize: '11px'
        },
        lg: { 
            padding: '4px 8px', 
            fontSize: '12px', 
            height: '24px',
            iconSize: '12px'
        }
    };

    const variantStyle = variants[variant] || variants.default;
    const sizeStyle = sizes[size] || sizes.default;

    const badgeStyle = {
        ...sizeStyle,
        backgroundColor: variantStyle.bg,
        color: variantStyle.text,
        border: `1px solid ${variantStyle.border}`,
        borderRadius: '0', // Perfectly square
        fontWeight: '600',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        letterSpacing: '0.01em',
        lineHeight: '1',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '3px',
        whiteSpace: 'nowrap',
        verticalAlign: 'baseline',
        textTransform: 'uppercase',
        ...style
    };

    const iconStyle = {
        fontSize: sizeStyle.iconSize,
        lineHeight: '1'
    };

    return (
        <span 
            className={`badge badge-${variant} badge-${size} ${className}`}
            style={badgeStyle}
            {...props}
        >
            {icon && (
                <i className={icon} style={iconStyle}></i>
            )}
            {children}
        </span>
    );
}
