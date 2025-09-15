import React from 'react';
import { Link } from 'react-router-dom';

export default function Pricing() {
    return (
        <div className="saas-pricing">
            {/* HERO SECTION */}
            <section className="hero-section">
                <div className="saas-container">
                    <div className="hero-content">
                        <h1>Project Implementation Support</h1>
                        <p>The FOSTER Project Digital MIS is a development initiative supported by FAO and the European Union. Access and support are provided to implementing partners and rural communities at no cost.</p>
                    </div>
                </div>
            </section>

            {/* IMPLEMENTATION SECTION */}
            <section className="pricing-section">
                <div className="saas-container">
                    <div className="pricing-grid">
                        <div className="pricing-card">
                            <div className="pricing-header">
                                <h3>Community Access</h3>
                                <p>For farmer groups and VSLAs</p>
                                <div className="price">
                                    <span className="currency">Free</span>
                                    <span className="amount"></span>
                                    <span className="period">Always</span>
                                </div>
                            </div>
                            <div className="pricing-features">
                                <ul>
                                    <li>FFS group registration</li>
                                    <li>VSLA digital ledger</li>
                                    <li>Basic training logs</li>
                                    <li>Offline functionality</li>
                                    <li>Community support</li>
                                </ul>
                            </div>
                            <Link to="/auth/login" className="pricing-btn">Access System</Link>
                        </div>

                        <div className="pricing-card featured">
                            <div className="pricing-badge">Most Common</div>
                            <div className="pricing-header">
                                <h3>Implementing Partners</h3>
                                <p>For NGOs and development organizations</p>
                                <div className="price">
                                    <span className="currency">Free</span>
                                    <span className="amount"></span>
                                    <span className="period">With training</span>
                                </div>
                            </div>
                            <div className="pricing-features">
                                <ul>
                                    <li>Multi-group management</li>
                                    <li>Advanced M&E dashboard</li>
                                    <li>E-marketplace access</li>
                                    <li>Training & capacity building</li>
                                    <li>Technical support</li>
                                    <li>Data export & reporting</li>
                                    <li>API integration</li>
                                </ul>
                            </div>
                            <Link to="/auth/login" className="pricing-btn featured">Access System</Link>
                        </div>

                        <div className="pricing-card">
                            <div className="pricing-header">
                                <h3>Government & FAO</h3>
                                <p>For national and regional implementation</p>
                                <div className="price">
                                    <span className="currency">Free</span>
                                    <span className="amount"></span>
                                    <span className="period">Full support</span>
                                </div>
                            </div>
                            <div className="pricing-features">
                                <ul>
                                    <li>National-scale deployment</li>
                                    <li>Multi-district coordination</li>
                                    <li>Advanced analytics</li>
                                    <li>Custom integrations</li>
                                    <li>Dedicated support team</li>
                                    <li>On-site training</li>
                                    <li>Policy integration</li>
                                </ul>
                            </div>
                            <Link to="/contact" className="pricing-btn">Contact FAO Team</Link>
                        </div>
                    </div>

                    <div className="pricing-note">
                        <p>All access is provided free of charge as part of the FAO FOSTER Project development initiative.</p>
                    </div>
                </div>
            </section>

            {/* FAQ SECTION */}
            <section className="faq-section">
                <div className="saas-container">
                    <div className="section-header">
                        <h2>Frequently asked questions</h2>
                        <p>Everything you need to know about accessing and using the Digital MIS</p>
                    </div>
                    
                    <div className="faq-grid">
                        <div className="faq-item">
                            <h4>Is the system really free?</h4>
                            <p>Yes, the Digital MIS is provided free as part of the FAO FOSTER Project supported by the European Union.</p>
                        </div>
                        
                        <div className="faq-item">
                            <h4>Do I need internet to use it?</h4>
                            <p>No, the system works offline and syncs data automatically when internet connection is available.</p>
                        </div>
                        
                        <div className="faq-item">
                            <h4>What about data privacy?</h4>
                            <p>All data is protected according to Uganda's Data Protection Act and FAO's data governance protocols.</p>
                        </div>
                        
                        <div className="faq-item">
                            <h4>Can we get training?</h4>
                            <p>Yes, we provide comprehensive Training of Trainers (ToT) programs for digital literacy and system use.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA SECTION */}
            <section className="cta-section">
                <div className="saas-container">
                    <div className="cta-content">
                        <h2>Ready to join the digital transformation?</h2>
                        <p>Join thousands of farmers and development organizations using the FOSTER Project Digital MIS across Karamoja.</p>
                        <div className="cta-actions">
                            <Link to="/auth/login" className="cta-primary">Access System</Link>
                            <Link to="/contact" className="cta-secondary">Request Training</Link>
                        </div>
                        <p className="cta-note">FAO FOSTER Project • Offline-capable • Mobile-first design</p>
                    </div>
                </div>
            </section>
        </div>
    );
}
