// Button Component - Laravel-admin style buttons with various types
import React from 'react';

/**
 * Button Component - Professional Hospital UI
 * 
 * Features:
 * - Consistent primary color theming
 * - Professional design with proper contrast
 * - Hospital-grade interaction states
 */
export default function Button({ 
    children,
    type = 'button',
    variant = 'default',
    size = 'default',
    icon = '',
    loading = false,
    disabled = false,
    className = '',
    style = {},
    onClick,
    ...props 
}) {
    const variants = {
        default: { 
            bg: '#f8fafc', 
            border: '#e5e7eb', 
            text: '#374151',
            hover: { bg: '#f3f4f6', border: '#d1d5db' }
        },
        primary: { 
            bg: '#0A1E34', 
            border: '#0A1E34', 
            text: '#ffffff',
            hover: { bg: '#081729', border: '#081729' }
        },
        secondary: { 
            bg: '#6b7280', 
            border: '#6b7280', 
            text: '#ffffff',
            hover: { bg: '#4b5563', border: '#4b5563' }
        },
        success: { 
            bg: '#22c55e', 
            border: '#22c55e', 
            text: '#ffffff',
            hover: { bg: '#16a34a', border: '#16a34a' }
        },
        warning: { 
            bg: '#d97706', 
            border: '#b45309', 
            text: '#ffffff',
            hover: { bg: '#b45309', border: '#92400e' }
        },
        danger: { 
            bg: '#dc2626', 
            border: '#b91c1c', 
            text: '#ffffff',
            hover: { bg: '#b91c1c', border: '#991b1b' }
        },
        ghost: { 
            bg: 'transparent', 
            border: '#d0d0d0', 
            text: '#2c2c2c',
            hover: { bg: '#f8f8f8', border: '#c0c0c0' }
        }
    };

    const sizes = {
        xs: { 
            padding: '4px 8px', 
            fontSize: '11px', 
            height: '24px',
            iconSize: '12px'
        },
        sm: { 
            padding: '6px 10px', 
            fontSize: '12px', 
            height: '28px',
            iconSize: '14px'
        },
        default: { 
            padding: '8px 14px', 
            fontSize: '13px', 
            height: '32px',
            iconSize: '16px'
        },
        lg: { 
            padding: '10px 18px', 
            fontSize: '14px', 
            height: '38px',
            iconSize: '18px'
        }
    };

    const variantStyle = variants[variant] || variants.default;
    const sizeStyle = sizes[size] || sizes.default;

    const buttonStyle = {
        ...sizeStyle,
        backgroundColor: disabled || loading ? '#f0f0f0' : variantStyle.bg,
        border: `1px solid ${disabled || loading ? '#e0e0e0' : variantStyle.border}`,
        color: disabled || loading ? '#999999' : variantStyle.text,
        borderRadius: '0', // Perfectly square
        fontWeight: '500',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        letterSpacing: '-0.01em',
        lineHeight: '1',
        textAlign: 'center',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '6px',
        cursor: disabled || loading ? 'not-allowed' : 'pointer',
        textDecoration: 'none',
        outline: 'none',
        boxShadow: 'none',
        transition: 'none',
        userSelect: 'none',
        verticalAlign: 'middle',
        ...style
    };

    const iconStyle = {
        fontSize: sizeStyle.iconSize,
        lineHeight: '1'
    };

    const handleClick = (e) => {
        if (disabled || loading) {
            e.preventDefault();
            return;
        }
        if (onClick) {
            onClick(e);
        }
    };

    const handleMouseEnter = (e) => {
        if (disabled || loading || variant === 'link') return;
        
        const hover = variantStyle.hover;
        Object.assign(e.target.style, {
            backgroundColor: hover.bg,
            borderColor: hover.border,
            color: hover.text || variantStyle.text
        });
    };

    const handleMouseLeave = (e) => {
        if (disabled || loading) return;
        
        Object.assign(e.target.style, {
            backgroundColor: variantStyle.bg,
            borderColor: variantStyle.border,
            color: variantStyle.text
        });
    };

    return (
        <button
            type={type}
            className={`btn btn-${variant} btn-${size} ${className}`}
            style={buttonStyle}
            disabled={disabled || loading}
            onClick={handleClick}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            {...props}
        >
            {loading && (
                <span style={iconStyle}>⟳</span>
            )}
            {!loading && icon && (
                <i className={icon} style={iconStyle}></i>
            )}
            {children}
        </button>
    );
}
