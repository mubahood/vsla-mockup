import React, { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';

export default function PublicLayout() {
    const location = useLocation();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const isActive = (path) => {
        return location.pathname === path;
    };

    return (
        <div className="saas-layout">
            {/* THIN FIXED HEADER */}
            <header className="saas-header">
                <nav className="saas-nav">
                    {/* BRAND */}
                    <Link to="/" className="saas-brand">
                        <div className="saas-logo">F</div>
                        <span>FOSTER Project</span>
                    </Link>

                    {/* NAVIGATION */}
                    <div className="saas-nav-right">
                        <ul className="saas-menu">
                            <li>
                                <Link to="/foster-project" className={isActive('/foster-project') ? 'active' : ''}>
                                    Project Overview
                                </Link>
                            </li>
                            <li>
                                <Link to="/services" className={isActive('/services') ? 'active' : ''}>
                                    MIS Modules
                                </Link>
                            </li>
                            <li>
                                <Link to="/about" className={isActive('/about') ? 'active' : ''}>
                                    About
                                </Link>
                            </li>
                            <li>
                                <Link to="/contact" className={isActive('/contact') ? 'active' : ''}>
                                    Contact
                                </Link>
                            </li>
                        </ul>

                        {/* SINGLE CTA BUTTON */}
                        <Link to="/auth/login" className="saas-signup-btn">
                            Access System
                        </Link>

                        {/* Mobile Toggle */}
                        <button 
                            className="saas-mobile-toggle"
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        >
                            ☰
                        </button>
                    </div>
                </nav>

                {/* Mobile Menu */}
                {mobileMenuOpen && (
                    <div className="saas-mobile-menu">
                        <Link to="/foster-project">Project Overview</Link>
                        <Link to="/services">MIS Modules</Link>
                        <Link to="/about">About</Link>
                        <Link to="/contact">Contact</Link>
                        <Link to="/auth/login" className="mobile-signup">Access System</Link>
                    </div>
                )}
            </header>

            {/* MAIN CONTENT */}
            <main className="saas-main">
                <Outlet />
            </main>

            {/* PERFECT FOOTER */}
            <footer className="saas-footer">
                <div className="saas-container">
                    <div className="footer-content">
                        {/* COMPANY SECTION */}
                        <div className="footer-section">
                            <div className="footer-brand">
                                <div className="saas-logo">🌾</div>
                                <div>
                                    <h4>FOSTER Project</h4>
                                    <p>Digital Agricultural MIS</p>
                                </div>
                            </div>
                            <p className="footer-desc">
                                Empowering rural communities in Karamoja with offline-capable digital tools for Farmer Field Schools, VSLA management, and agricultural advisory services.
                            </p>
                        </div>

                        {/* PRODUCT */}
                        <div className="footer-section">
                            <h5>MIS Modules</h5>
                            <ul>
                                <li><Link to="/services">FFS Management</Link></li>
                                <li><Link to="/services">VSLA Ledger</Link></li>
                                <li><Link to="/services">E-Marketplace</Link></li>
                                <li><Link to="/services">M&E Dashboard</Link></li>
                            </ul>
                        </div>

                        {/* PROJECT */}
                        <div className="footer-section">
                            <h5>FOSTER Project</h5>
                            <ul>
                                <li><Link to="/foster-project">Project Overview</Link></li>
                                <li><Link to="/about">About FAO</Link></li>
                                <li><Link to="/contact">Contact Team</Link></li>
                                <li><a href="https://www.fao.org" target="_blank" rel="noopener noreferrer">FAO Global</a></li>
                            </ul>
                        </div>

                        {/* RESOURCES */}
                        <div className="footer-section">
                            <h5>Resources</h5>
                            <ul>
                                <li><Link to="/services">Training Materials</Link></li>
                                <li><Link to="/foster-project">Documentation</Link></li>
                                <li><Link to="/about">Technical Specs</Link></li>
                                <li><Link to="/contact">Support</Link></li>
                            </ul>
                        </div>
                    </div>

                    <div className="footer-bottom">
                        <p>© 2025 FAO FOSTER Project. Supported by the European Union.</p>
                        <div className="footer-links">
                            <Link to="/privacy">Privacy</Link>
                            <Link to="/terms">Terms</Link>
                            <Link to="/contact">Support</Link>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}
