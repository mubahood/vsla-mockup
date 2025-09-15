import React from 'react';
import { Link } from 'react-router-dom';

export default function FosterProject() {
    return (
        <div className="foster-project">
            {/* HERO SECTION */}
            <section className="hero-section">
                <div className="saas-container">
                    <div className="hero-content">
                        <h1>FOSTER Project<br />Digital MIS for Karamoja</h1>
                        <p>Improving food security and resilience of food production systems through digital innovation in Farmer Field Schools, Farmer Business Schools, and Village Savings & Loan Associations.</p>
                        <div className="project-details-grid">
                            <div className="project-detail">
                                <strong>Project Code:</strong> UNJP/UGA/068/EC
                            </div>
                            <div className="project-detail">
                                <strong>Location:</strong> Karamoja Subregion, Uganda
                            </div>
                            <div className="project-detail">
                                <strong>Implementing Agency:</strong> FAO Uganda
                            </div>
                            <div className="project-detail">
                                <strong>Supported By:</strong> European Union
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* PROJECT SCOPE */}
            <section className="section">
                <div className="saas-container">
                    <h2 className="section-title">Project Scope & Objectives</h2>
                    <div className="scope-grid">
                        <div className="scope-item">
                            <h3>🎯 Main Purpose</h3>
                            <p>Design, develop, and deploy a fully functional prototype of the FFS Digital MIS to digitize management of Agro-Pastoral Field Schools and associated business initiatives.</p>
                        </div>
                        <div className="scope-item">
                            <h3>📱 Mobile-First Design</h3>
                            <p>System designed to be mobile-first and offline-capable, reflecting the digital realities of Karamoja's low-connectivity environment.</p>
                        </div>
                        <div className="scope-item">
                            <h3>📊 Real-Time Data</h3>
                            <p>Support real-time data collection, provide localized advisory content, and enhance monitoring, evaluation, and learning efforts.</p>
                        </div>
                        <div className="scope-item">
                            <h3>🎓 Capacity Building</h3>
                            <p>Build digital capacity of implementing partners, community facilitators, and extension workers through Training of Trainers model.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CORE MODULES */}
            <section className="features-section bg-gray-50">
                <div className="saas-container">
                    <h2 className="section-title">Core MIS Modules</h2>
                    <div className="features-grid">
                        <div className="feature-card">
                            <div className="feature-icon">📋</div>
                            <h3>Digital Registry</h3>
                            <p>Comprehensive registry for FFS, FBS, and VSLA groups with member profiling and group management.</p>
                            <ul>
                                <li>Group registration and profiles</li>
                                <li>Member management</li>
                                <li>Activity tracking</li>
                                <li>Progress monitoring</li>
                            </ul>
                        </div>
                        
                        <div className="feature-card">
                            <div className="feature-icon">🌱</div>
                            <h3>Training Documentation</h3>
                            <p>Mobile-compatible tools for documenting Agro Ecosystem Analysis (AESA) and Good Agronomic Practices (GAP) training sessions.</p>
                            <ul>
                                <li>AESA documentation</li>
                                <li>GAP training logs</li>
                                <li>Session attendance</li>
                                <li>Learning outcomes</li>
                            </ul>
                        </div>
                        
                        <div className="feature-card">
                            <div className="feature-icon">📚</div>
                            <h3>E-Advisory Hub</h3>
                            <p>Seasonal agricultural content and localized information hub for farmer knowledge sharing and capacity building.</p>
                            <ul>
                                <li>Seasonal advice</li>
                                <li>Best practices</li>
                                <li>Weather information</li>
                                <li>Crop calendars</li>
                            </ul>
                        </div>
                        
                        <div className="feature-card">
                            <div className="feature-icon">🏪</div>
                            <h3>E-Marketplace</h3>
                            <p>Digital platform to foster market linkages for agri-inputs, equipment service providers, and commodity markets.</p>
                            <ul>
                                <li>Input suppliers directory</li>
                                <li>Equipment services</li>
                                <li>Market price information</li>
                                <li>Trade connections</li>
                            </ul>
                        </div>
                        
                        <div className="feature-card">
                            <div className="feature-icon">💰</div>
                            <h3>VSLA Digital Ledger</h3>
                            <p>Comprehensive financial tracking system for Village Savings & Loan Associations with transparent record keeping.</p>
                            <ul>
                                <li>Savings tracking</li>
                                <li>Loan management</li>
                                <li>Interest calculations</li>
                                <li>Financial reports</li>
                            </ul>
                        </div>
                        
                        <div className="feature-card">
                            <div className="feature-icon">📊</div>
                            <h3>M&E Dashboard</h3>
                            <p>Centralized monitoring and evaluation dashboard with real-time visualization of project indicators.</p>
                            <ul>
                                <li>Real-time indicators</li>
                                <li>Gender disaggregation</li>
                                <li>Location mapping</li>
                                <li>Value chain analysis</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* IMPLEMENTATION TIMELINE */}
            <section className="section">
                <div className="saas-container">
                    <h2 className="section-title">Implementation Timeline</h2>
                    <div className="timeline">
                        <div className="timeline-item">
                            <div className="timeline-marker">1</div>
                            <div className="timeline-content">
                                <h4>Month 1: Inception & Planning</h4>
                                <ul>
                                    <li>Kickoff meeting with FAO and Implementing partners</li>
                                    <li>Develop technical specifications and risk plan</li>
                                    <li>Inception Report with roadmap and system specs</li>
                                </ul>
                            </div>
                        </div>
                        
                        <div className="timeline-item">
                            <div className="timeline-marker">2</div>
                            <div className="timeline-content">
                                <h4>Month 2: System Design & Development</h4>
                                <ul>
                                    <li>Develop core MIS modules (registry, training logs, VSLA ledger)</li>
                                    <li>Build advisory and M&E dashboards</li>
                                    <li>Integrate offline functionality</li>
                                </ul>
                            </div>
                        </div>
                        
                        <div className="timeline-item">
                            <div className="timeline-marker">3</div>
                            <div className="timeline-content">
                                <h4>Month 3: Testing & Capacity Building</h4>
                                <ul>
                                    <li>User testing with implementing partners</li>
                                    <li>Finalize training materials</li>
                                    <li>Implement Training of Trainers (ToT) program</li>
                                </ul>
                            </div>
                        </div>
                        
                        <div className="timeline-item">
                            <div className="timeline-marker">4</div>
                            <div className="timeline-content">
                                <h4>Month 4-6: Deployment & Finalization</h4>
                                <ul>
                                    <li>Configure and distribute tablets/phones</li>
                                    <li>Field deployment and user onboarding</li>
                                    <li>Final review, documentation, and system handover</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* TARGET BENEFICIARIES */}
            <section className="stats-section">
                <div className="saas-container">
                    <h2 className="section-title">Target Coverage</h2>
                    <div className="stats-grid">
                        <div className="stat-item">
                            <div className="stat-number">9</div>
                            <div className="stat-label">Districts in Karamoja</div>
                        </div>
                        <div className="stat-item">
                            <div className="stat-number">5</div>
                            <div className="stat-label">Implementing Partners</div>
                        </div>
                        <div className="stat-item">
                            <div className="stat-number">200+</div>
                            <div className="stat-label">FFS Groups</div>
                        </div>
                        <div className="stat-item">
                            <div className="stat-number">5,000+</div>
                            <div className="stat-label">Farmers</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* TECHNICAL REQUIREMENTS */}
            <section className="section bg-gray-50">
                <div className="saas-container">
                    <h2 className="section-title">Technical Requirements</h2>
                    <div className="requirements-grid">
                        <div className="requirement-item">
                            <h4>🔒 Data Privacy & Security</h4>
                            <p>Full compliance with Uganda's Data Protection and Privacy Act (2019) and FAO's corporate data governance protocols.</p>
                        </div>
                        <div className="requirement-item">
                            <h4>📱 Mobile-First Architecture</h4>
                            <p>Optimized for Android tablets and smartphones with intuitive user interfaces for low-literacy contexts.</p>
                        </div>
                        <div className="requirement-item">
                            <h4>🔄 Offline Functionality</h4>
                            <p>Offline-first design with automatic data synchronization when connectivity is available.</p>
                        </div>
                        <div className="requirement-item">
                            <h4>🌐 Multi-language Support</h4>
                            <p>Support for English and local languages with visual aids for accessibility.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA SECTION */}
            <section className="cta-section">
                <div className="saas-container">
                    <div className="cta-content">
                        <h2>Be Part of the Digital Transformation</h2>
                        <p>Join the FOSTER Project in empowering rural communities through innovative digital solutions.</p>
                        <div className="cta-actions">
                            <Link to="/auth/login" className="cta-primary">Access System</Link>
                            <Link to="/contact" className="cta-secondary">Learn More</Link>
                        </div>
                        <p className="cta-note">Supported by FAO • Funded by European Union • Serving Karamoja Communities</p>
                    </div>
                </div>
            </section>
        </div>
    );
}
