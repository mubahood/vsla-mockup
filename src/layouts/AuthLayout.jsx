import React from 'react';
import { Outlet, Link } from 'react-router-dom';

export default function AuthLayout({ title }) {
    return (
        <div className="auth-wrapper">
            {title && <title>{title}</title>}
            
            {/* Clean Auth Container */}
            <div className="auth-container">
                {/* Left Side - Branding */}
                <div className="auth-brand-side">
                    <div className="auth-brand-content">
                        <Link to="/" className="auth-brand-link">
                            <div className="auth-brand-logo">M</div>
                            <h1 className="auth-brand-title">FOSTER</h1>
                            <p className="auth-brand-subtitle">Professional</p>
                        </Link>
                        <div className="auth-brand-description">
                            <h2>Complete Hospital Management System</h2>
                            <p>Streamline your healthcare operations with our comprehensive platform. Secure, reliable, and trusted by 500+ healthcare facilities worldwide.</p>
                        </div>
                    </div>
                </div>
                
                {/* Right Side - Auth Form */}
                <div className="auth-form-side">
                    <Outlet />
                </div>
            </div>
        </div>
    );
}
