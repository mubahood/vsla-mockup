import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks';
import { StatefulButton } from '../../components';

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
    } finally {
      setIsLoading(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="auth-form-side">
        <div className="auth-form-header">
          <h1 className="auth-form-title">Check Your Email</h1>
          <p className="auth-form-subtitle">Reset link sent to {email}</p>
        </div>

        <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded text-green-700">
          Check your email inbox and click the reset link to create a new password.
        </div>

        <div className="auth-form-footer">
          <button 
            type="button" 
            onClick={() => setIsSubmitted(false)} 
            className="auth-link"
          >
            Try again
          </button>
        </div>

        <div className="auth-form-footer">
          <Link to="/auth/login" className="auth-link">
            Return to Sign In
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="auth-form-side">
      <div className="auth-form-header">
        <h1 className="auth-form-title">Reset Password</h1>
        <p className="auth-form-subtitle">Enter your email to reset password</p>
      </div>

      <form onSubmit={handleSubmit} className="auth-form">
        <div className="auth-form-group">
          <label htmlFor="email" className="auth-form-label">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="auth-form-input"
            placeholder="your@email.com"
            required
            disabled={isLoading}
          />
        </div>

        {error && (
          <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded text-red-700 text-sm">
            {error}
          </div>
        )}

        <div className="auth-form-actions">
          <StatefulButton
            type="submit"
            variant="accent"
            size="lg"
            loading={isLoading}
            loadingText="Sending..."
            className="auth-btn auth-btn-accent"
            style={{ width: '100%' }}
          >
            Send Reset Link
          </StatefulButton>
        </div>
      </form>

      <div className="auth-form-footer">
        <Link to="/auth/login" className="auth-link">
          Back to Sign In
        </Link>
      </div>
    </div>
  );
}
