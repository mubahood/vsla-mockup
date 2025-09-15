import React, { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import Button from './Button';

/**
 * LogoutButton Component
 * A reusable logout button that handles authentication logout and redirects
 */
export const LogoutButton = ({ 
  variant = 'primary', 
  size = 'medium',
  className = '',
  children = 'Logout',
  confirmLogout = true,
  showLoading = true
}) => {
  const { logout, loading } = useAuth();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    if (confirmLogout) {
      const confirmAction = window.confirm('Are you sure you want to logout?');
      if (!confirmAction) return;
    }

    try {
      setIsLoggingOut(true);
      await logout();
      // Navigation is handled in the logout function
    } catch (error) {
      console.error('Logout failed:', error);
      // Even if there's an error, logout function should handle redirect
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <Button
      variant={variant}
      size={size}
      className={className}
      onClick={handleLogout}
      disabled={loading || isLoggingOut}
      loading={showLoading && (loading || isLoggingOut)}
    >
      {children}
    </Button>
  );
};

export default LogoutButton;
