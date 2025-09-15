// InfoBox Component - Laravel-admin style info/stat display box
import React from 'react';

/**
 * InfoBox Component - Professional Hospital Metrics Display
 * 
 * Features:
 * - Clinical dashboard styling
 * - Flat geometric design
 * - Professional color schemes
 * - Hospital-grade typography
 */
export default function InfoBox({ 
    name = '',
    value = '',
    icon = '',
    link = '',
    color = 'default',
    size = 'default',
    className = '',
    style = {},
    onClick,
    ...props 
}) {
    const colorSchemes = {
        default: { 
            bg: '#fdfdfd', 
            border: '#e0e0e0', 
            text: '#1a1a1a',
            accent: '#f0f0f0',
            value: '#2c2c2c'
        },
        primary: { 
            bg: '#f0f4f8', 
            border: '#cbd5e0', 
            text: '#2b6cb0',
            accent: '#e2e8f0',
            value: '#1a365d'
        },
        success: { 
            bg: '#f0fdf4', 
            border: '#bbf7d0', 
            text: '#059669',
            accent: '#dcfce7',
            value: '#064e3b'
        },
        warning: { 
            bg: '#fffbeb', 
            border: '#fde68a', 
            text: '#d97706',
            accent: '#fef3c7',
            value: '#92400e'
        },
        danger: { 
            bg: '#fef2f2', 
            border: '#fecaca', 
            text: '#dc2626',
            accent: '#fee2e2',
            value: '#991b1b'
        },
        info: { 
            bg: '#f0f9ff', 
            border: '#bae6fd', 
            text: '#0284c7',
            accent: '#e0f2fe',
            value: '#0c4a6e'
        }
    };

    const sizes = {
        sm: { 
            padding: '12px', 
            iconSize: '18px', 
            valueSize: '18px',
            nameSize: '11px'
        },
        default: { 
            padding: '16px', 
            iconSize: '22px', 
            valueSize: '22px',
            nameSize: '12px'
        },
        lg: { 
            padding: '20px', 
            iconSize: '26px', 
            valueSize: '26px',
            nameSize: '13px'
        }
    };

    const scheme = colorSchemes[color] || colorSchemes.default;
    const sizeStyle = sizes[size] || sizes.default;

    const boxStyle = {
        backgroundColor: scheme.bg,
        border: `1px solid ${scheme.border}`,
        borderRadius: '0', // Perfectly square
        padding: sizeStyle.padding,
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        cursor: link || onClick ? 'pointer' : 'default',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        transition: 'none',
        position: 'relative',
        overflow: 'hidden',
        ...style
    };

    const iconContainerStyle = {
        width: '44px',
        height: '44px',
        backgroundColor: scheme.accent,
        border: `1px solid ${scheme.border}`,
        borderRadius: '0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0
    };

    const iconStyle = {
        fontSize: sizeStyle.iconSize,
        color: scheme.text,
        lineHeight: '1'
    };

    const contentStyle = {
        flex: 1,
        minWidth: 0
    };

    const nameStyle = {
        fontSize: sizeStyle.nameSize,
        color: scheme.text,
        margin: '0 0 4px 0',
        fontWeight: '600',
        letterSpacing: '-0.01em',
        textTransform: 'uppercase'
    };

    const valueStyle = {
        fontSize: sizeStyle.valueSize,
        fontWeight: '700',
        color: scheme.value,
        margin: '0',
        lineHeight: '1.2',
        letterSpacing: '-0.02em'
    };

    const handleClick = () => {
        if (onClick) {
            onClick();
        } else if (link) {
            window.location.href = link;
        }
    };

    const Element = link || onClick ? 'a' : 'div';
    const elementProps = link ? { href: link } : onClick ? { onClick: handleClick } : {};

    return (
        <Element 
            className={`info-box ${className}`}
            style={boxStyle}
            {...elementProps}
            {...props}
        >
            {icon && (
                <div style={iconStyle}>
                    <i className={icon}></i>
                </div>
            )}
            <div style={contentStyle}>
                <div style={nameStyle}>{name}</div>
                <div style={valueStyle}>{value}</div>
            </div>
        </Element>
    );
}
