// Card Component - Simple card container
import React from 'react';

/**
 * Card Component - Professional Hospital Container
 * 
 * Features:
 * - Clinical interface design
 * - Geometric flat styling
 * - Professional typography
 * - Hospital-grade layout structure
 */
export default function Card({ 
    title = '',
    subtitle = '',
    children,
    header = null,
    footer = null,
    actions = [],
    variant = 'default',
    className = '',
    style = {},
    ...props 
}) {
    const variants = {
        default: { 
            bg: '#fdfdfd', 
            headerBg: '#f8f8f8', 
            border: '#e0e0e0',
            headerBorder: '#d8d8d8'
        },
        accent: { 
            bg: '#fafbfc', 
            headerBg: '#f0f4f7', 
            border: '#c8d4e0',
            headerBorder: '#b8c8d8'
        },
        muted: { 
            bg: '#f9f9f9', 
            headerBg: '#f0f0f0', 
            border: '#dcdcdc',
            headerBorder: '#d0d0d0'
        }
    };

    const variantStyle = variants[variant] || variants.default;

    const cardStyle = {
        backgroundColor: variantStyle.bg,
        border: `1px solid ${variantStyle.border}`,
        borderRadius: '0', // Perfectly square
        overflow: 'hidden',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        ...style
    };

    const headerStyle = {
        backgroundColor: variantStyle.headerBg,
        borderBottom: `1px solid ${variantStyle.headerBorder}`,
        padding: '12px 16px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        minHeight: '48px'
    };

    const titleAreaStyle = {
        flex: 1,
        minWidth: 0
    };

    const titleStyle = {
        margin: '0',
        fontSize: '15px',
        fontWeight: '600',
        color: '#1a1a1a',
        lineHeight: '1.3',
        letterSpacing: '-0.01em'
    };

    const subtitleStyle = {
        margin: '2px 0 0 0',
        fontSize: '12px',
        color: '#666666',
        lineHeight: '1.3',
        fontWeight: '400'
    };

    const actionsStyle = {
        display: 'flex',
        gap: '6px',
        alignItems: 'center',
        marginLeft: '12px'
    };

    const bodyStyle = {
        padding: '16px'
    };

    const footerStyle = {
        backgroundColor: variantStyle.headerBg,
        borderTop: `1px solid ${variantStyle.headerBorder}`,
        padding: '10px 16px',
        fontSize: '12px',
        color: '#666666'
    };

    const hasHeader = header || title || subtitle || actions.length > 0;

    return (
        <div 
            className={`card ${className}`}
            style={cardStyle}
            {...props}
        >
            {hasHeader && (
                <div style={headerStyle}>
                    {header || (
                        <>
                            <div style={titleAreaStyle}>
                                {title && (
                                    <h3 style={titleStyle}>{title}</h3>
                                )}
                                {subtitle && (
                                    <p style={subtitleStyle}>{subtitle}</p>
                                )}
                            </div>
                            
                            {actions.length > 0 && (
                                <div style={actionsStyle}>
                                    {actions.map((action, index) => (
                                        <span key={index}>{action}</span>
                                    ))}
                                </div>
                            )}
                        </>
                    )}
                </div>
            )}
            
            <div style={bodyStyle}>
                {children}
            </div>
            
            {footer && (
                <div style={footerStyle}>
                    {footer}
                </div>
            )}
        </div>
    );
}
