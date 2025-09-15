import React, { useState, useEffect } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks';
import { useToast } from '../../contexts/ToastContext';
import { StatefulButton } from '../../components';

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, authenticated, loading: authLoading } = useAuth();
  const { success, error: showError } = useToast();
  
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [hasRedirected, setHasRedirected] = useState(false);

  // BULLETPROOF redirect logic - only redirect ONCE when fully authenticated
  useEffect(() => {
    console.log('🔐 Login: Auth state changed:', { authenticated, authLoading, hasRedirected });
    
    if (authenticated && !authLoading && !hasRedirected) {
      setHasRedirected(true);
      
      // Determine where to redirect
      const intendedPath = location.state?.from?.pathname;
      const redirectPath = intendedPath && intendedPath !== '/auth/login' 
        ? intendedPath 
        : '/admin/dashboard';
      
      console.log('🔐 Login: Redirecting authenticated user to:', redirectPath);
      
      // Redirect automatically
      setTimeout(() => {
        navigate(redirectPath, { replace: true });
      }, 100);
    }
  }, [authenticated, authLoading, navigate, location.state, hasRedirected]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email or username is required';
    }
    
    if (!formData.password.trim()) {
      newErrors.password = 'Password is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      showError('Please correct the errors in the form');
      return;
    }

    setLoading(true);
    setErrors({});

    try {
      console.log('🔐 Login: Attempting login...');
      const result = await login(formData.email, formData.password);
      
      if (result.success) {
        console.log('✅ Login: Login successful');
        success('Login successful! Welcome back.');
        // Note: Redirect will be handled by useEffect when authenticated becomes true
      } else {
        console.log('❌ Login: Login failed:', result.message);
        showError(result.message || 'Login failed. Please check your credentials.');
        
        if (result.errors) {
          setErrors(result.errors);
        }
      }
    } catch (err) {
      console.error('❌ Login: Unexpected error:', err);
      showError('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-form-side">
      {/* Show redirecting message when authenticated */}
      {authenticated && !authLoading && (
        <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded text-center">
          <div className="text-green-600">
            ✅ Login successful! Redirecting to dashboard...
          </div>
        </div>
      )}
      
      <div className="auth-form-header">
        <h1 className="auth-form-title">FOSTER Project Login</h1>
        <p className="auth-form-subtitle">Access the Digital Agricultural MIS for Karamoja</p>
        
        {/* Demo Instructions */}
        <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded text-sm">
          <div className="text-blue-800 font-medium">🌾 Demo Mode</div>
          <div className="text-blue-600 mt-1">
            Use any email/username and any password to access the system
          </div>
        </div>
      </div>
      
      <form onSubmit={handleSubmit} className="auth-form">
        <div className="auth-form-group">
          <label htmlFor="email" className="auth-form-label">
            Email / Username
          </label>
          <input
            type="text"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className={`auth-form-input ${errors.email ? 'auth-form-input-error' : ''}`}
            placeholder="Enter any email or username"
            disabled={loading}
            autoComplete="email"
          />
          {errors.email && (
            <div className="auth-form-error">{errors.email}</div>
          )}
        </div>
        
        <div className="auth-form-group">
          <label htmlFor="password" className="auth-form-label">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            className={`auth-form-input ${errors.password ? 'auth-form-input-error' : ''}`}
            placeholder="Enter any password"
            disabled={loading}
            autoComplete="current-password"
          />
          {errors.password && (
            <div className="auth-form-error">{errors.password}</div>
          )}
        </div>
        
        <div className="auth-form-actions">
          <StatefulButton
            type="submit"
            variant="accent"
            size="lg"
            loading={loading}
            loadingText="Signing in..."
            className="auth-btn auth-btn-accent"
            style={{ width: '100%' }}
          >
            Sign In
          </StatefulButton>
        </div>
      </form>
      
      <div className="auth-form-footer">
        <Link to="/auth/forgot-password" className="auth-link">
          Forgot password?
        </Link>
      </div>
      
      <div className="auth-form-footer">
        Don't have an account?{' '}
        <Link to="/auth/register" className="auth-link">
          Create account
        </Link>
      </div>
    </div>
  );
}
