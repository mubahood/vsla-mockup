// Base Widget Component - Following Laravel-admin patterns with minimalistic design
import React from 'react';

/**
 * Base Widget Component - Professional Flat Design
 * 
 * Design principles:
 * - Perfectly square corners (border-radius: 0)
 * - Ultra-flat design with subtle depth through borders
 * - Professional hospital-grade aesthetics
 * - Precise spacing and typography
 * - Clean geometric structure
 */
export default function Widget({ 
    children, 
    className = '', 
    style = {},
    elevated = false,
    ...props 
}) {
    const baseStyle = {
        // Professional flat design
        backgroundColor: '#fdfdfd',
        border: elevated ? '2px solid #e0e0e0' : '1px solid #eeeeee',
        borderRadius: '0', // Perfectly square corners
        padding: '12px',
        margin: '0',
        fontSize: '13px',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
        fontWeight: '400',
        lineHeight: '1.3',
        color: '#2c2c2c',
        // Absolutely no shadows or animations
        boxShadow: 'none',
        transition: 'none',
        position: 'relative',
        ...style
    };

    return (
        <div 
            className={`widget ${className}`}
            style={baseStyle}
            {...props}
        >
            {children}
        </div>
    );
}
