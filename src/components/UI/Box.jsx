// Box Component - Laravel-admin style container with header, body, footer
import React from 'react';
import Widget from './Widget';

/**
 * Box Component - Professional Hospital-Grade Container
 * 
 * Features:
 * - Geometric header/body/footer sections
 * - Professional typography hierarchy
 * - Flat design with precise borders
 * - Hospital system aesthetics
 */
export default function Box({ 
    title = '', 
    content = '', 
    footer = '', 
    tools = [],
    children,
    className = '',
    style = {},
    variant = 'default', // default, accent, muted
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

    const boxStyle = {
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
        padding: '10px 14px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        minHeight: '38px'
    };

    const bodyStyle = {
        padding: '14px',
        fontSize: '13px',
        lineHeight: '1.4',
        color: '#2c2c2c'
    };

    const footerStyle = {
        backgroundColor: variantStyle.headerBg,
        borderTop: `1px solid ${variantStyle.headerBorder}`,
        padding: '8px 14px',
        fontSize: '12px',
        color: '#666666'
    };

    const toolsStyle = {
        display: 'flex',
        gap: '6px',
        alignItems: 'center'
    };

    const titleStyle = {
        margin: '0',
        fontSize: '14px',
        fontWeight: '600',
        color: '#1a1a1a',
        letterSpacing: '-0.01em'
    };

    return (
        <div 
            className={`box ${className}`}
            style={boxStyle}
            {...props}
        >
            {(title || tools.length > 0) && (
                <div style={headerStyle}>
                    <h3 style={titleStyle}>{title}</h3>
                    {tools.length > 0 && (
                        <div style={toolsStyle}>
                            {tools.map((tool, index) => (
                                <span key={index}>{tool}</span>
                            ))}
                        </div>
                    )}
                </div>
            )}
            
            <div style={bodyStyle}>
                {content || children}
            </div>
            
            {footer && (
                <div style={footerStyle}>
                    {footer}
                </div>
            )}
        </div>
    );
}
