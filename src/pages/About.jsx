import React from 'react';

export default function About() {
    return (
        <>
            {/* Hero Section */}
            <div className="hero-section">
                <div className="hero-container">
                    <div className="hero-content">
                        <h1 className="hero-title">Digital Agricultural MIS for FOSTER Project</h1>
                        <p className="hero-subtitle">
                            Empowering rural communities in Karamoja through innovative digital solutions for agriculture and rural development
                        </p>
                    </div>
                </div>
            </div>

            {/* Mission Section */}
            <section className="mission-section">
                <div className="section-container">
                    <div className="section-grid">
                        <div className="content-area">
                            <h2 className="section-title">Our Mission</h2>
                            <p className="section-text">
                                Under the FAO FOSTER Project, we're dedicated to digitalizing Farmer Field Schools, Farmer Business Schools, and Village Savings & Loan Associations across Karamoja. Our comprehensive MIS empowers rural communities with offline-capable tools that enhance agricultural learning, financial inclusion, and sustainable development.
                            </p>
                            <p className="section-text">
                                The system reflects the digital realities of rural Uganda, providing mobile-first, offline-capable solutions that work in low-connectivity environments while maintaining the highest standards of data privacy and security.
                            </p>
                        </div>
                        <div className="cta-sidebar">
                            <div className="cta-card">
                                <h4>Ready to Get Started?</h4>
                                <p>Join the digital transformation of rural agriculture in Karamoja.</p>
                                <a href="/auth/login" className="cta-button">Access System</a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="features-section">
                <div className="section-container">
                    <h2 className="section-title">Why Choose Our Agricultural MIS?</h2>
                    <div className="features-grid">
                        <div className="feature-card">
                            <div className="feature-icon">�</div>
                            <h3>Complete FFS Management</h3>
                            <p>End-to-end solution for Farmer Field Schools with group profiling, training logs, and progress tracking.</p>
                        </div>
                        <div className="feature-card">
                            <div className="feature-icon">📱</div>
                            <h3>Offline-First Design</h3>
                            <p>Work seamlessly in low-connectivity areas with automatic data synchronization when connection returns.</p>
                        </div>
                        <div className="feature-card">
                            <div className="feature-icon">🔒</div>
                            <h3>Privacy Compliant</h3>
                            <p>Full compliance with Uganda's Data Protection Act and FAO's data governance protocols.</p>
                        </div>
                        <div className="feature-card">
                            <div className="feature-icon">📊</div>
                            <h3>Advanced M&E Dashboard</h3>
                            <p>Real-time monitoring with indicators disaggregated by gender, location, and value chain.</p>
                        </div>
                        <div className="feature-card">
                            <div className="feature-icon">⚡</div>
                            <h3>Mobile-First</h3>
                            <p>Optimized for Android tablets and smartphones with intuitive, user-friendly interfaces.</p>
                        </div>
                        <div className="feature-card">
                            <div className="feature-icon">🎯</div>
                            <h3>Modular Integration</h3>
                            <p>Seamlessly integrate FFS, FBS, VSLA, and e-marketplace functionalities in one platform.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="stats-section">
                <div className="section-container">
                    <h2 className="section-title">Supporting Agricultural Development Across Karamoja</h2>
                    <div className="stats-grid">
                        <div className="stat-item">
                            <div className="stat-number">9</div>
                            <div className="stat-label">Districts</div>
                        </div>
                        <div className="stat-item">
                            <div className="stat-number">200+</div>
                            <div className="stat-label">FFS Groups</div>
                        </div>
                        <div className="stat-item">
                            <div className="stat-number">5K+</div>
                            <div className="stat-label">Farmers</div>
                        </div>
                        <div className="stat-item">
                            <div className="stat-number">100%</div>
                            <div className="stat-label">Offline Ready</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Project Background Section */}
            <section className="team-section">
                <div className="section-container">
                    <h2 className="section-title">FOSTER Project Background</h2>
                    <p className="section-text center">
                        The FOSTER Project, implemented by FAO with support from the European Union, aims to improve food security and resilience of food production systems in Karamoja. Our Digital MIS is built by agricultural development experts, software engineers, and rural technology specialists who understand the unique challenges of low-connectivity environments and rural development programming.
                    </p>
                    
                    <div className="project-details">
                        <div className="detail-item">
                            <h4>Project Code</h4>
                            <p>UNJP/UGA/068/EC</p>
                        </div>
                        <div className="detail-item">
                            <h4>Location</h4>
                            <p>Karamoja Subregion, Uganda</p>
                        </div>
                        <div className="detail-item">
                            <h4>Implementing Agency</h4>
                            <p>Food and Agriculture Organization (FAO), Uganda</p>
                        </div>
                        <div className="detail-item">
                            <h4>Supported By</h4>
                            <p>European Union</p>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}