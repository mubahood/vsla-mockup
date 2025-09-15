// Alert Component - Laravel-admin style alert/notification
import React from 'react';

/**
 * Alert Component - Professional Hospital Notification System
 * 
 * Features:
 * - Clinical notification design
 * - Flat geometric styling
 * - Professional color schemes
 * - Hospital-grade typography
 */
export default function Alert({ 
    type = 'info',
    title = '',
    message = '',
    children,
    dismissible = false,
    icon = '',
    className = '',
    style = {},
    onDismiss,
    ...props 
}) {
    const [visible, setVisible] = React.useState(true);

    const types = {
        success: { 
            bg: '#f0fdf4', 
            border: '#22c55e', 
            text: '#15803d',
            iconBg: '#dcfce7',
            defaultIcon: 'bi-check-circle'
        },
        warning: { 
            bg: '#fffbeb', 
            border: '#f59e0b', 
            text: '#d97706',
            iconBg: '#fef3c7',
            defaultIcon: 'bi-exclamation-triangle'
        },
        danger: { 
            bg: '#fef2f2', 
            border: '#ef4444', 
            text: '#dc2626',
            iconBg: '#fee2e2',
            defaultIcon: 'bi-exclamation-circle'
        },
        info: { 
            bg: '#f0f9ff', 
            border: '#3b82f6', 
            text: '#2563eb',
            iconBg: '#dbeafe',
            defaultIcon: 'bi-info-circle'
        }
    };

    const typeStyle = types[type] || types.info;

    const alertStyle = {
        backgroundColor: typeStyle.bg,
        border: `1px solid ${typeStyle.border}`,
        borderRadius: '0', // Perfectly square
        padding: '12px',
        margin: '0 0 12px 0',
        color: typeStyle.text,
        fontSize: '13px',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        lineHeight: '1.4',
        display: visible ? 'flex' : 'none',
        alignItems: 'flex-start',
        gap: '10px',
        position: 'relative',
        ...style
    };

    const iconContainerStyle = {
        width: '24px',
        height: '24px',
        backgroundColor: typeStyle.iconBg,
        border: `1px solid ${typeStyle.border}`,
        borderRadius: '0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0
    };

    const iconStyle = {
        fontSize: '14px',
        color: typeStyle.text,
        lineHeight: '1'
    };

    const contentStyle = {
        flex: 1,
        minWidth: 0
    };

    const titleStyle = {
        fontWeight: '600',
        margin: '0 0 4px 0',
        fontSize: '13px',
        letterSpacing: '-0.01em'
    };

    const messageStyle = {
        margin: '0',
        fontSize: '13px',
        fontWeight: '400'
    };

    const dismissButtonStyle = {
        position: 'absolute',
        top: '8px',
        right: '8px',
        background: 'none',
        border: 'none',
        color: typeStyle.text,
        cursor: 'pointer',
        fontSize: '16px',
        padding: '4px',
        lineHeight: '1',
        fontWeight: '400'
    };

    const handleDismiss = () => {
        setVisible(false);
        if (onDismiss) {
            onDismiss();
        }
    };

    if (!visible) {
        return null;
    }

    const displayIcon = icon || typeStyle.defaultIcon;

    return (
        <div 
            className={`alert alert-${type} ${className}`}
            style={alertStyle}
            role="alert"
            {...props}
        >
            <div style={iconContainerStyle}>
                <i className={displayIcon} style={iconStyle}></i>
            </div>
            
            <div style={contentStyle}>
                {title && (
                    <div style={titleStyle}>
                        {title}
                    </div>
                )}
                
                {message && (
                    <div style={messageStyle}>
                        {message}
                    </div>
                )}
                
                {children && (
                    <div>
                        {children}
                    </div>
                )}
            </div>
            
            {dismissible && (
                <button
                    type="button"
                    style={dismissButtonStyle}
                    onClick={handleDismiss}
                    onMouseEnter={(e) => {
                        e.target.style.opacity = '0.7';
                    }}
                    onMouseLeave={(e) => {
                        e.target.style.opacity = '1';
                    }}
                >
                    ×
                </button>
            )}
        </div>
    );
}
