import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks';

export default function ForgotPassword() {
  const { forgotPassword } = useAuth();
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      await forgotPassword(email);
      setIsSubmitted(true);
    } catch (error) {
      setError('Failed to send reset link. Please try again.');
      console.error('Password reset failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isSubmitted) {
    return (
      <div>
        <div className="auth-form-header">
          <h1 className="auth-form-title">Check Your Email</h1>
          <p className="auth-form-subtitle">We've sent a password reset link to {email}</p>
        </div>

        <div className="auth-form-body">
          <div className="alert alert-success">
            <p>
              Please check your email inbox and click the reset link to create a new password.
              The link will expire in 60 minutes for security purposes.
            </p>
          </div>
        </div>

        <div className="auth-form-footer">
          <p>
            Didn't receive the email? Check your spam folder or{' '}
            <button 
              type="button" 
              onClick={() => setIsSubmitted(false)} 
              className="auth-link-button"
            >
              try again
            </button>
          </p>
          <p>
            <Link to="/auth/login" className="auth-link">Return to Login</Link>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="auth-form-header">
        <h1 className="auth-form-title">Reset Password</h1>
        <p className="auth-form-subtitle">Enter your email address and we'll send you a link to reset your password</p>
      </div>

      <form onSubmit={handleSubmit} className="auth-form">
        <div className="auth-form-group">
          <label htmlFor="email" className="auth-form-label">Email Address</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="auth-form-input"
            placeholder="Enter your email address"
            required
            disabled={isLoading}
          />
        </div>

        {error && (
          <div className="alert alert-danger">
            {error}
          </div>
        )}

        <div className="auth-form-actions">
          <button 
            type="submit" 
            className="auth-btn auth-btn-primary"
            disabled={isLoading}
          >
            {isLoading ? 'Sending...' : 'Send Reset Link'}
          </button>
        </div>
      </form>

      <div className="auth-form-footer">
        <p>
          Remember your password? <Link to="/auth/login" className="auth-link">Sign in here</Link>
        </p>
        <p>
          Don't have an account? <Link to="/auth/register" className="auth-link">Create account</Link>
        </p>
      </div>
    </div>
  );
}
