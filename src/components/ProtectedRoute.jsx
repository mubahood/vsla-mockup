import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks';

/**
 * Protected Route Component - BULLETPROOF VERSION
 * NO MORE REDIRECT LOOPS!
 */
const ProtectedRoute = ({ 
  children, 
  roles = [], 
  permissions = [], 
  redirectTo = '/auth/login' 
}) => {
  const { authenticated, loading } = useAuth();
  const location = useLocation();

 

  // CRITICAL: Show loading while authentication is being determined
  // This prevents premature redirects during initialization
  if (loading) { 
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Checking authentication...</p>
        </div>
      </div>
    );
  }

  // ONLY redirect if we're absolutely sure the user is not authenticated
  // AND we're not currently loading
  if (!authenticated) { 
    
    // Redirect to login with current location as state
    return (
      <Navigate 
        to={redirectTo} 
        state={{ from: location }} 
        replace 
      />
    );
  }
 
  // User is authenticated, render the protected content
  return children;
};

export default ProtectedRoute;
