import React, { useState, useEffect } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks';
import { useToast } from '../../contexts/ToastContext';
import { StatefulButton } from '../../components';

export default function Register() {
  const navigate = useNavigate();
  const location = useLocation();
  const { register, authenticated, loading: authLoading } = useAuth();
  const { success, error: showError } = useToast();
  
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    password_confirmation: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  // Redirect if already authenticated
  useEffect(() => {
    if (authenticated && !authLoading) {
      const from = location.state?.from?.pathname || '/admin/dashboard';
      
      const timer = setTimeout(() => {
        navigate(from, { replace: true });
      }, 100);
      
      return () => clearTimeout(timer);
    }
  }, [authenticated, authLoading, navigate, location.state]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Basic validation
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = 'Name is required';
    if (!form.email.trim()) newErrors.email = 'Email is required';
    if (!form.password.trim()) newErrors.password = 'Password is required';
    if (form.password !== form.password_confirmation) {
      newErrors.password_confirmation = 'Passwords do not match';
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    setIsSubmitting(true);
    setErrors({});
    
    try {
      const result = await register(form);
      
      if (result.success) {
        success('Account created successfully! Welcome to FOSTER.');
      } else {
        showError(result.message || 'Registration failed. Please try again.');
        if (result.errors) {
          setErrors(result.errors);
        }
      }
    } catch (error) {
      showError('Registration failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  return (
    <div className="auth-form-side">
      <div className="auth-form-header">
        <h1 className="auth-form-title">Create Account</h1>
        <p className="auth-form-subtitle">Join the FOSTER project</p>
        
        {/* Demo notice */}
        <div className="mt-3 p-2 bg-blue-50 border border-blue-200 rounded text-xs text-blue-600">
          Demo: Use any details to create account
        </div>
      </div>

      <form onSubmit={handleSubmit} className="auth-form">
        <div className="auth-form-group">
          <label htmlFor="name" className="auth-form-label">Full Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={form.name}
            onChange={handleChange}
            className={`auth-form-input ${errors.name ? 'auth-form-input-error' : ''}`}
            placeholder="John Doe"
            disabled={isSubmitting}
          />
          {errors.name && (
            <div className="auth-form-error">{errors.name}</div>
          )}
        </div>

        <div className="auth-form-group">
          <label htmlFor="email" className="auth-form-label">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className={`auth-form-input ${errors.email ? 'auth-form-input-error' : ''}`}
            placeholder="john@example.com"
            disabled={isSubmitting}
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
            value={form.password}
            onChange={handleChange}
            className={`auth-form-input ${errors.password ? 'auth-form-input-error' : ''}`}
            placeholder="Create password"
            disabled={isSubmitting}
          />
          {errors.password && (
            <div className="auth-form-error">{errors.password}</div>
          )}
        </div>

        <div className="auth-form-group">
          <label htmlFor="password_confirmation" className="auth-form-label">Confirm Password</label>
          <input
            type="password"
            id="password_confirmation"
            name="password_confirmation"
            value={form.password_confirmation}
            onChange={handleChange}
            className={`auth-form-input ${errors.password_confirmation ? 'auth-form-input-error' : ''}`}
            placeholder="Confirm password"
            disabled={isSubmitting}
          />
          {errors.password_confirmation && (
            <div className="auth-form-error">{errors.password_confirmation}</div>
          )}
        </div>

        <div className="auth-form-actions">
          <StatefulButton
            type="submit"
            variant="accent"
            size="lg"
            loading={isSubmitting}
            loadingText="Creating..."
            className="auth-btn auth-btn-accent"
            style={{ width: '100%' }}
          >
            Create Account
          </StatefulButton>
        </div>
      </form>

      <div className="auth-form-footer">
        Already have an account?{' '}
        <Link to="/auth/login" className="auth-link">
          Sign in
        </Link>
      </div>
    </div>
  );
}
