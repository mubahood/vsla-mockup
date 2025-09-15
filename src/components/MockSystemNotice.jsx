/**
 * FOSTER PROJECT DEMO SYSTEM NOTICE
 * This component displays information about the mock/demo mode
 */

import React, { useState, useEffect } from 'react';

const MockSystemNotice = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    // Check if notice was previously dismissed
    const dismissed = localStorage.getItem('foster_demo_notice_dismissed');
    if (dismissed === 'true') {
      setIsVisible(false);
      setIsDismissed(true);
    }
  }, []);

  const handleDismiss = () => {
    localStorage.setItem('foster_demo_notice_dismissed', 'true');
    setIsVisible(false);
    setIsDismissed(true);
  };

  const handleShow = () => {
    setIsVisible(true);
  };

  if (isDismissed && !isVisible) {
    return (
      <div 
        onClick={handleShow}
        className="fixed bottom-4 right-4 bg-blue-500 text-white p-2 rounded-full cursor-pointer shadow-lg hover:bg-blue-600 transition-colors z-50"
        title="Show Demo Information"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
    );
  }

  if (!isVisible) return null;

  return (
    <div className="fixed top-0 left-0 right-0 bg-gradient-to-r from-green-600 to-blue-600 text-white p-4 shadow-lg z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
            <span className="font-bold">FOSTER PROJECT DEMO</span>
          </div>
          <div className="hidden md:block text-sm">
            <span className="font-medium">Agricultural MIS Prototype - No backend connections.</span>
            <span className="ml-2 opacity-90">Login: Any email + password123</span>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <div className="hidden lg:flex items-center space-x-4 text-xs">
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <span>200+ FFS Groups</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
              <span>5K+ Farmers</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
              <span>9 Districts</span>
            </div>
          </div>
          
          <button
            onClick={handleDismiss}
            className="ml-4 p-1 hover:bg-white hover:bg-opacity-20 rounded transition-colors"
            title="Dismiss notice"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
      
      {/* Mobile version */}
      <div className="md:hidden mt-2 text-sm">
        <div>Complete mockup with no backend connections</div>
        <div className="text-xs opacity-90">Login: Any email + password123</div>
      </div>
    </div>
  );
};

export default MockSystemNotice;
