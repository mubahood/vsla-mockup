import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
    return (
        <div className="saas-home">
            {/* HERO SECTION */}
            <section className="hero-section">
                <div className="saas-container">
                    <div className="hero-content">
                        <h1>Digital Agriculture MIS<br />for Farmer Field Schools</h1>
                        <p>Empowering rural communities in Karamoja with offline-capable digital tools for Farmer Field Schools, VSLA management, and agricultural advisory services - trusted by FAO and implementing partners.</p>
                        <div className="hero-actions">
                            <Link to="/auth/login" className="cta-primary">Access System</Link>
                            <Link to="/about" className="cta-secondary">Learn More</Link>
                        </div>
                        <div className="hero-proof">
                            <span>Offline-capable</span>
                            <span>•</span>
                            <span>Mobile-first design</span>
                            <span>•</span>
                            <span>FAO FOSTER Project</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* SOCIAL PROOF */}
            <section className="proof-section">
                <div className="saas-container">
                    <div className="proof-content">
                        <p>Supporting agricultural development across Karamoja</p>
                        <div className="proof-stats">
                            <div className="stat">
                                <div className="stat-number">9</div>
                                <div className="stat-label">Districts</div>
                            </div>
                            <div className="stat">
                                <div className="stat-number">200+</div>
                                <div className="stat-label">FFS Groups</div>
                            </div>
                            <div className="stat">
                                <div className="stat-number">5K+</div>
                                <div className="stat-label">Farmers</div>
                            </div>
                            <div className="stat">
                                <div className="stat-number">100%</div>
                                <div className="stat-label">Offline Ready</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* FEATURES SECTION */}
            <section className="features-section">
                <div className="saas-container">
                    <div className="section-header">
                        <h2>Comprehensive Agricultural MIS Solution</h2>
                        <p>Digital tools designed for rural development and farmer empowerment</p>
                    </div>
                    
                    <div className="features-grid">
                        <div className="feature-item">
                            <div className="feature-icon">🌾</div>
                            <h3>Farmer Field Schools</h3>
                            <p>Digital registry and management for FFS groups with training session documentation and progress tracking.</p>
                        </div>
                        
                        <div className="feature-item">
                            <div className="feature-icon">�</div>
                            <h3>VSLA Management</h3>
                            <p>Complete Village Savings & Loan Association ledger with savings, loans, and financial tracking.</p>
                        </div>
                        
                        <div className="feature-item">
                            <div className="feature-icon">🏪</div>
                            <h3>E-Marketplace</h3>
                            <p>Connect farmers with agri-input suppliers, equipment providers, and commodity markets.</p>
                        </div>
                        
                        <div className="feature-item">
                            <div className="feature-icon">�</div>
                            <h3>Mobile-First & Offline</h3>
                            <p>Designed for low-connectivity environments with offline data collection and sync capabilities.</p>
                        </div>
                        
                        <div className="feature-item">
                            <div className="feature-icon">📊</div>
                            <h3>M&E Dashboard</h3>
                            <p>Real-time monitoring and evaluation with indicators disaggregated by gender, location, and value chain.</p>
                        </div>
                        
                        <div className="feature-item">
                            <div className="feature-icon">🎓</div>
                            <h3>E-Learning Hub</h3>
                            <p>Interactive agricultural advisory content and training modules for farmer capacity building.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* TESTIMONIALS SECTION */}
            <section className="testimonials-section">
                <div className="saas-container">
                    <div className="section-header">
                        <h2>Impact Stories from Karamoja</h2>
                        <p>See how the Digital MIS transforms agricultural communities</p>
                    </div>
                    
                    <div className="testimonials-grid">
                        <div className="testimonial-item">
                            <p>"The digital VSLA ledger has revolutionized our savings group. We can now track every transaction and our financial growth transparently."</p>
                            <div className="testimonial-author">
                                <strong>Mary Akello</strong>
                                <span>VSLA Chairperson, Kotido District</span>
                            </div>
                        </div>
                        
                        <div className="testimonial-item">
                            <p>"The offline capability means we can document training sessions even without internet. Data syncs automatically when connection returns."</p>
                            <div className="testimonial-author">
                                <strong>James Lomuria</strong>
                                <span>FFS Facilitator, Napak District</span>
                            </div>
                        </div>
                        
                        <div className="testimonial-item">
                            <p>"Our farmers can now access seasonal agricultural advice and connect with input suppliers directly through the platform."</p>
                            <div className="testimonial-author">
                                <strong>Agnes Nyakwara</strong>
                                <span>Extension Officer, Moroto District</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA SECTION */}
            <section className="cta-section">
                <div className="saas-container">
                    <div className="cta-content">
                        <h2>Ready to digitize your agricultural programs?</h2>
                        <p>Join the FOSTER Project in transforming rural livelihoods through digital innovation.</p>
                        <div className="cta-actions">
                            <Link to="/auth/login" className="cta-primary">Access System</Link>
                            <Link to="/contact" className="cta-secondary">Request Demo</Link>
                        </div>
                        <p className="cta-note">FAO FOSTER Project • Offline-capable • Mobile-first design</p>
                    </div>
                </div>
            </section>
        </div>
    );
}
