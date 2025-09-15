import React, { createContext, useContext, useState, useEffect } from 'react';
import { authAPI } from '../services/api';
import tokenManager from '../utils/TokenManager';

const AuthContext = createContext({});

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check if user is logged in on app start
  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const token = tokenManager.getToken();
      console.log('AuthContext: Checking auth with token:', token ? `${token.substring(0, 20)}...` : 'NO TOKEN');
      
      if (token && token.startsWith('mock_token_')) {
        console.log('AuthContext: Found mock token, verifying user...');
        const response = await authAPI.user();
        console.log('AuthContext: User verification successful:', response.data.user.name);
        setUser(response.data.user);
        setIsAuthenticated(true);
      } else {
        console.log('AuthContext: No valid token found');
        setUser(null);
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.error('AuthContext: Auth check failed:', error);
      tokenManager.removeToken();
      setUser(null);
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  const login = async (credentials) => {
    try {
      console.log('AuthContext: Attempting login with:', credentials.email);
      const response = await authAPI.login(credentials);
      const { user, token } = response.data;
      
      console.log('AuthContext: Login successful for:', user.name);
      console.log('AuthContext: Token received:', token.substring(0, 20) + '...');
      
      tokenManager.setToken(token);
      setUser(user);
      setIsAuthenticated(true);
      
      return { success: true, user };
    } catch (error) {
      console.error('AuthContext: Login failed:', error);
      return { 
        success: false, 
        message: error.message || 'Login failed. Please use password123 for any user.'
      };
    }
  };

  const register = async (userData) => {
    try {
      console.log('AuthContext: Attempting registration for:', userData.email);
      const response = await authAPI.register(userData);
      const { user, token } = response.data;
      
      console.log('AuthContext: Registration successful for:', user.name);
      
      tokenManager.setToken(token);
      setUser(user);
      setIsAuthenticated(true);
      
      return { success: true, user };
    } catch (error) {
      console.error('AuthContext: Registration failed:', error);
      return { 
        success: false, 
        message: error.message || 'Registration failed'
      };
    }
  };

  const logout = async () => {
    try {
      console.log('AuthContext: Logging out user');
      await authAPI.logout();
    } catch (error) {
      console.error('AuthContext: Logout API call failed:', error);
    } finally {
      tokenManager.removeToken();
      setUser(null);
      setIsAuthenticated(false);
      
      console.log('AuthContext: Logout complete, redirecting to login');
      // Use window.location for redirect since we can't use useNavigate here
      window.location.href = '/auth/login';
    }
  };

  const forgotPassword = async (email) => {
    try {
      console.log('AuthContext: Sending password reset for:', email);
      await authAPI.forgotPassword(email);
      return { 
        success: true, 
        message: 'Password reset instructions sent to your email (Mock)' 
      };
    } catch (error) {
      console.error('AuthContext: Forgot password failed:', error);
      return { 
        success: false, 
        message: error.message || 'Failed to send reset email'
      };
    }
  };

  const value = {
    user,
    isAuthenticated,
    loading,
    login,
    register,
    logout,
    forgotPassword,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
