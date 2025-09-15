import React, { useState, useEffect } from 'react';

/**
 * App Loader Component
 * Full-screen loader with logo, app name, and progress bar
 * Shows for minimum 2 seconds regardless of actual loading time
 * @returns {React.Component} App loader component
 */
const AppLoader = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Progress animation
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + Math.random() * 8 + 2;
        return Math.min(newProgress, 95); // Stop at 95% to prevent completion before 3 seconds
      });
    }, 100);

    // Ensure minimum 2 seconds display time
    const minTimeTimeout = setTimeout(() => {
      // Complete the progress bar
      setProgress(100);
    }, 2000);

    return () => {
      clearInterval(progressInterval);
      clearTimeout(minTimeTimeout);
    };
  }, []);

  return (
    <div className="app-loader">
      <div className="app-loader-content">
        {/* Logo */}
        <div className="app-loader-logo">H</div>
        
        {/* App Name */}
        <h1 className="app-loader-title">Hospital Manager</h1>
        <p className="app-loader-subtitle">Healthcare System</p>
        
        {/* Progress Bar */}
        <div className="app-loader-progress-container">
          <div 
            className="app-loader-progress-bar"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        
        {/* Loading Text */}
        <p className="app-loader-text">
          {progress < 100 ? 'Loading system...' : 'Ready!'}
        </p>
      </div>
    </div>
  );
};

export default AppLoader;
