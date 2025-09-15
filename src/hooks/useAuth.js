import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthService } from '../services';

/**
 * Hook for managing authentication state
 * @returns {Object} Auth state and methods
 */
export const useAuth = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const initializationRef = useRef(false);

  // Initialize auth state ONLY ONCE
  useEffect(() => {
    if (!initializationRef.current) {
      initializationRef.current = true;
      initializeAuth();
    }
  }, []);

  const initializeAuth = async () => {
    try {
      
      // Check basic authentication data
      const isAuth = AuthService.isAuthenticated();
      
      if (isAuth && !AuthService.isTokenLikelyExpired()) {
        // Get current user without making unnecessary API calls
        try {
          const currentUser = await AuthService.getCurrentUser();
          
          if (currentUser) {
            setUser(currentUser);
            setAuthenticated(true);
          } else {
            setAuthenticated(false);
            setUser(null);
          }
        } catch (userError) {
          setAuthenticated(false);
          setUser(null);
        }
      } else {
        setAuthenticated(false);
        setUser(null);
      }
      
    } catch (error) {
      setAuthenticated(false);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      setLoading(true);
      const result = await AuthService.login(email, password);
      
      if (result.success) {
        const currentUser = await AuthService.getCurrentUser();
        setUser(currentUser);
        setAuthenticated(true);
      } else {
        return result;
      }
      
      return result;
    } catch (error) {
      return {
        success: false,
        message: 'An error occurred during login'
      };
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData) => {
    try {
      setLoading(true);
      const result = await AuthService.register(userData);
      
      if (result.success) {
        const currentUser = await AuthService.getCurrentUser();
        setUser(currentUser);
        setAuthenticated(true);
      } else {
      }
      
      return result;
    } catch (error) {
      return {
        success: false,
        message: 'An error occurred during registration'
      };
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      setLoading(true);
      await AuthService.logout();
      setUser(null);
      setAuthenticated(false);
      
      // Redirect to login page
      navigate('/auth/login');
      
      return { success: true };
    } catch (error) {
      // Even if logout fails, clear local state and redirect
      setUser(null);
      setAuthenticated(false);
      navigate('/auth/login');
      return { success: true };
    } finally {
      setLoading(false);
    }
  };

  const refreshUser = async () => {
    try {
      const currentUser = await AuthService.refreshUserProfile();
      if (currentUser) {
        setUser(currentUser);
        return currentUser;
      }
      return null;
    } catch (error) {
      return null;
    }
  };

  const updateProfile = async (profileData) => {
    try {
      const result = await AuthService.updateProfile(profileData);
      
      if (result.success) {
        await refreshUser();
      }
      
      return result;
    } catch (error) {
      return {
        success: false,
        message: 'Failed to update profile'
      };
    }
  };

  const changePassword = async (passwordData) => {
    try {
      return await AuthService.changePassword(passwordData);
    } catch (error) {
      return {
        success: false,
        message: 'An error occurred while changing password'
      };
    }
  };

  const hasRole = (role) => {
    if (!user) return false;
    
    // Check if user has the hasRole method, if not treat as having role in development
    if (typeof user.hasRole === 'function') {
      return user.hasRole(role);
    }
    
    // Fallback for development when ProfileModel methods aren't available
    if (process.env.NODE_ENV === 'development') {
      return true;
    }
    
    return false;
  };

  const hasAnyRole = (roles) => {
    if (!user) return false;
    
    // Check if user has the hasAnyRole method, if not treat as having roles in development
    if (typeof user.hasAnyRole === 'function') {
      return user.hasAnyRole(roles);
    }
    
    // Fallback for development when ProfileModel methods aren't available
    if (process.env.NODE_ENV === 'development') {
      return true;
    }
    
    return false;
  };

  const hasPermission = (permission) => {
    if (!user) return false;
    
    // Check if user has the hasPermission method, if not treat as having permission in development  
    if (typeof user.hasPermission === 'function') {
      return user.hasPermission(permission);
    }
    
    // Fallback for development when ProfileModel methods aren't available
    if (process.env.NODE_ENV === 'development') {
      return true;
    }
    
    return false;
  };

  // Clear auth state
  const clearAuth = async () => {
    await AuthService.logout();
    setAuthenticated(false);
    setUser(null);
    setLoading(false);
    
    // Redirect to login page
    navigate('/auth/login');
  };

  return {
    authenticated,
    isAuthenticated: authenticated, // Alias for backward compatibility
    user,
    loading,
    login,
    register,
    logout,
    clearAuth,
    refreshUser,
    updateProfile,
    changePassword,
    hasRole,
    hasAnyRole,
    hasPermission,
  };
};
