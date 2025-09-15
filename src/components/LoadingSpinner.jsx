import React from 'react';

/**
 * Loading Spinner Component
 * @param {Object} props - Component props
 * @param {string} props.size - Size of spinner (sm, md, lg)
 * @param {string} props.message - Loading message
 * @param {boolean} props.fullScreen - Whether to show full screen
 * @returns {React.Component} Loading spinner component
 */
const LoadingSpinner = ({ 
  size = 'md', 
  message = 'Loading...', 
  fullScreen = false 
}) => {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-8 w-8',
    lg: 'h-12 w-12'
  };

  const spinnerClass = `animate-spin rounded-full border-b-2 border-primary ${sizeClasses[size]}`;

  const content = (
    <div className="text-center">
      <div className={`${spinnerClass} mx-auto mb-4`}></div>
      {message && <p className="text-muted-foreground">{message}</p>}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        {content}
      </div>
    );
  }

  return content;
};

export default LoadingSpinner;
