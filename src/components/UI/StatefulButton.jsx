import React from 'react';

/**
 * Stateful Button Component
 * Shows loading state and handles disabled states
 * @param {Object} props - Component props
 * @param {boolean} props.loading - Loading state
 * @param {boolean} props.disabled - Disabled state
 * @param {string} props.loadingText - Text to show when loading
 * @param {string} props.variant - Button variant (primary, secondary, accent)
 * @param {string} props.size - Button size (sm, md, lg)
 * @param {string} props.type - Button type
 * @param {function} props.onClick - Click handler
 * @param {React.Node} props.children - Button content
 * @returns {React.Component} Stateful button component
 */
const StatefulButton = ({
  loading = false,
  disabled = false,
  loadingText = 'Loading...',
  variant = 'primary',
  size = 'md',
  type = 'button',
  onClick,
  children,
  className = '',
  ...props
}) => {
  const isDisabled = loading || disabled;
  
  const baseClasses = 'stateful-btn';
  const variantClass = `stateful-btn-${variant}`;
  const sizeClass = `stateful-btn-${size}`;
  const stateClass = loading ? 'stateful-btn-loading' : '';
  
  const buttonClasses = [
    baseClasses,
    variantClass,
    sizeClass,
    stateClass,
    className
  ].filter(Boolean).join(' ');

  return (
    <button
      type={type}
      className={buttonClasses}
      disabled={isDisabled}
      onClick={onClick}
      {...props}
    >
      {loading && (
        <span className="stateful-btn-spinner">
          <svg
            className="stateful-btn-spinner-icon"
            viewBox="0 0 24 24"
          >
            <circle
              className="stateful-btn-spinner-path"
              cx="12"
              cy="12"
              r="10"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeDasharray="31.416"
              strokeDashoffset="31.416"
            />
          </svg>
        </span>
      )}
      <span className={loading ? 'stateful-btn-text-loading' : 'stateful-btn-text'}>
        {loading ? loadingText : children}
      </span>
    </button>
  );
};

export default StatefulButton;
