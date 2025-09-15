import React, { useState, useEffect } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks';
import { useToast } from '../../contexts/ToastContext';

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

  // Redirect if already authenticated
  useEffect(() => {
    if (authenticated && !authLoading) {
      // Prevent redirect loop - check if we came from a protected route
      const from = location.state?.from?.pathname || '/admin/dashboard';
      
      console.log('🔐 Register: Redirecting authenticated user to:', from);
      
      // Add a small delay to prevent immediate redirects during auth initialization
      const timer = setTimeout(() => {
        navigate(from, { replace: true });
      }, 100);
      
      return () => clearTimeout(timer);
    }
  }, [authenticated, authLoading, navigate, location.state]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    setIsSubmitting(true);
    try {
      const result = await register(form);
      
      if (result.success) {
        success('Registration successful! Welcome to FOSTER Project.');
        // Navigation will be handled by the useEffect above when authenticated becomes true
      } else {
        showError(result.message || 'Registration failed. Please try again.');
      }
    } catch (error) {
      console.error('Registration failed:', error);
      showError('An unexpected error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    setForm(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="auth-form-container">
      <h1>Create Account</h1>
      <p>Join the FOSTER Project agricultural management system</p>

      <form onSubmit={handleSubmit} className="auth-form">
        <div className="auth-form-group">
          <label htmlFor="name">Full Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Enter your full name"
            required
          />
        </div>

        <div className="auth-form-group">
          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            id="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Enter your email address"
            required
          />
        </div>

        <div className="auth-form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Create a secure password"
            required
          />
        </div>

        <div className="auth-form-group">
          <label htmlFor="password_confirmation">Confirm Password</label>
          <input
            type="password"
            id="password_confirmation"
            name="password_confirmation"
            value={form.password_confirmation}
            onChange={handleChange}
            placeholder="Confirm your password"
            required
          />
        </div>

        <button 
          type="submit" 
          className="auth-form-submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Creating Account...' : 'Create Account'}
        </button>
      </form>

      <div className="auth-form-footer">
        Already have an account? <Link to="/auth/login">Sign in here</Link>
      </div>
    </div>
  );
}
