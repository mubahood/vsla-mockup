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
                            <div className="auth-brand-logo">🌾</div>
                            <h1 className="auth-brand-title">FOSTER</h1>
                            <p className="auth-brand-subtitle">Karamoja</p>
                        </Link>
                        <div className="auth-brand-description">
                            <h2>Digital Agricultural Management System</h2>
                            <p>Empowering Karamoja farmers with modern technology for sustainable agriculture. Secure, reliable, and designed for rural communities.</p>
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
