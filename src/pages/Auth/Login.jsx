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

  // Redirect logic when authenticated
  useEffect(() => {
    if (authenticated && !authLoading && !hasRedirected) {
      setHasRedirected(true);
      const intendedPath = location.state?.from?.pathname;
      const redirectPath = intendedPath && intendedPath !== '/auth/login' 
        ? intendedPath 
        : '/admin/dashboard';
      
      setTimeout(() => {
        navigate(redirectPath, { replace: true });
      }, 100);
    }
  }, [authenticated, authLoading, navigate, location.state, hasRedirected]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    }
    
    if (!formData.password.trim()) {
      newErrors.password = 'Password is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setLoading(true);
    setErrors({});

    try {
      const result = await login(formData.email, formData.password);
      
      if (result.success) {
        success('Welcome back!');
      } else {
        showError(result.message || 'Invalid credentials');
        if (result.errors) {
          setErrors(result.errors);
        }
      }
    } catch (err) {
      showError('Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-form-side">
      {/* Success message when authenticated */}
      {authenticated && !authLoading && (
        <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded text-center text-green-600">
          ✅ Login successful! Redirecting...
        </div>
      )}
      
      <div className="auth-form-header">
        <h1 className="auth-form-title">Sign In</h1>
        <p className="auth-form-subtitle">Access your FOSTER account</p>
        
        {/* Demo notice - compact */}
        <div className="mt-3 p-2 bg-blue-50 border border-blue-200 rounded text-xs text-blue-600">
          Demo: Use any email and password
        </div>
      </div>
      
      <form onSubmit={handleSubmit} className="auth-form">
        <div className="auth-form-group">
          <label htmlFor="email" className="auth-form-label">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className={`auth-form-input ${errors.email ? 'auth-form-input-error' : ''}`}
            placeholder="your@email.com"
            disabled={loading}
            autoComplete="email"
          />
          {errors.email && (
            <div className="auth-form-error">{errors.email}</div>
          )}
        </div>
        
        <div className="auth-form-group">
          <label htmlFor="password" className="auth-form-label">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            className={`auth-form-input ${errors.password ? 'auth-form-input-error' : ''}`}
            placeholder="Enter password"
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
        New to FOSTER?{' '}
        <Link to="/auth/register" className="auth-link">
          Create account
        </Link>
      </div>
    </div>
  );
}
