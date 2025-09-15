// Form Component - Laravel-admin style form container
import React from 'react';

/**
 * Form Component
 * 
 * Features:
 * - Form layout management
 * - Field grouping
 * - Validation display
 * - Action buttons
 * - Minimalistic design
 */
export default function Form({ 
    title = '',
    children,
    onSubmit,
    actions = [],
    layout = 'vertical', // vertical, horizontal, inline
    className = '',
    style = {},
    ...props 
}) {
    const formStyle = {
        backgroundColor: '#ffffff',
        border: '1px solid #e5e5e5',
        borderRadius: '0',
        padding: '12px',
        margin: '6px 0',
        ...style
    };

    const titleStyle = {
        margin: '0 0 12px 0',
        fontSize: '16px',
        fontWeight: '500',
        color: '#333333',
        borderBottom: '1px solid #e5e5e5',
        paddingBottom: '8px'
    };

    const contentStyle = {
        display: layout === 'inline' ? 'flex' : 'block',
        gap: layout === 'inline' ? '8px' : '0',
        flexWrap: layout === 'inline' ? 'wrap' : 'nowrap',
        alignItems: layout === 'inline' ? 'flex-end' : 'stretch'
    };

    const actionsStyle = {
        marginTop: '12px',
        paddingTop: '8px',
        borderTop: '1px solid #e5e5e5',
        display: 'flex',
        gap: '6px',
        justifyContent: 'flex-end'
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (onSubmit) {
            onSubmit(e);
        }
    };

    return (
        <form 
            className={`form form-${layout} ${className}`}
            style={formStyle}
            onSubmit={handleSubmit}
            {...props}
        >
            {title && (
                <h2 style={titleStyle}>{title}</h2>
            )}
            
            <div style={contentStyle}>
                {children}
            </div>
            
            {actions.length > 0 && (
                <div style={actionsStyle}>
                    {actions.map((action, index) => (
                        <span key={index}>{action}</span>
                    ))}
                </div>
            )}
        </form>
    );
}

// Form Row Component for horizontal layouts
export function FormRow({ children, className = '', style = {} }) {
    const rowStyle = {
        display: 'flex',
        gap: '8px',
        marginBottom: '8px',
        flexWrap: 'wrap',
        ...style
    };

    return (
        <div 
            className={`form-row ${className}`}
            style={rowStyle}
        >
            {children}
        </div>
    );
}

// Form Column Component for horizontal layouts
export function FormCol({ 
    children, 
    span = 1, 
    className = '', 
    style = {} 
}) {
    const colStyle = {
        flex: `${span} 1 0%`,
        minWidth: '0',
        ...style
    };

    return (
        <div 
            className={`form-col ${className}`}
            style={colStyle}
        >
            {children}
        </div>
    );
}
