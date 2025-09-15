import React from 'react';
import { Link } from 'react-router-dom';

export default function Services() {
    const services = [
        {
            id: 'ffs-management',
            icon: '🌾',
            title: 'Farmer Field Schools',
            description: 'Digital management system for FFS groups with comprehensive member profiling, training session documentation, and progress tracking.',
            features: ['Group Registration', 'Member Profiles', 'Training Logs', 'Progress Tracking'],
            link: '/services/ffs'
        },
        {
            id: 'vsla-system',
            icon: '💰',
            title: 'VSLA Digital Ledger',
            description: 'Complete Village Savings & Loan Association management with transparent financial tracking and reporting.',
            features: ['Savings Tracking', 'Loan Management', 'Interest Calculation', 'Financial Reports'],
            link: '/services/vsla'
        },
        {
            id: 'e-marketplace',
            icon: '🏪',
            title: 'E-Marketplace',
            description: 'Digital platform connecting farmers with agri-input suppliers, equipment providers, and commodity markets.',
            features: ['Input Suppliers', 'Equipment Rental', 'Market Prices', 'Trade Connections'],
            link: '/services/marketplace'
        },
        {
            id: 'advisory-hub',
            icon: '📚',
            title: 'E-Advisory Hub',
            description: 'Seasonal agricultural content and localized information for farmer capacity building and knowledge sharing.',
            features: ['Seasonal Advice', 'Best Practices', 'Weather Info', 'Crop Calendars'],
            link: '/services/advisory'
        },
        {
            id: 'me-dashboard',
            icon: '�',
            title: 'M&E Dashboard',
            description: 'Real-time monitoring and evaluation with project indicators disaggregated by location, gender, and value chain.',
            features: ['Real-time Data', 'Gender Analytics', 'Location Mapping', 'Impact Tracking'],
            link: '/services/monitoring'
        },
        {
            id: 'training-system',
            icon: '🎓',
            title: 'Training & Capacity Building',
            description: 'Comprehensive Training of Trainers (ToT) programs for digital literacy, system use, and peer learning methodologies.',
            features: ['ToT Programs', 'Digital Literacy', 'User Training', 'Peer Learning'],
            link: '/services/training'
        }
    ];

    return (
        <div>
            {/* HERO SECTION */}
            <section className="hero">
                <div className="container">
                    <div className="hero-content">
                        <h1 className="hero-title">
                            Our Agricultural <span className="text-accent">Services</span>
                        </h1>
                        <p className="hero-subtitle">
                            Comprehensive digital solutions for rural development delivered through innovative technology 
                            with state-of-the-art technology and compassionate care.
                        </p>
                        <div className="hero-actions">
                            <Link to="/contact" className="btn btn-accent btn-lg">
                                Schedule Consultation
                            </Link>
                            <Link to="/doctors" className="btn btn-outline btn-lg">
                                Meet Our Doctors
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* SERVICES OVERVIEW */}
            <section className="section">
                <div className="container">
                    <div className="section-header">
                        <h2 className="section-title">Why Choose Our Digital MIS?</h2>
                        <p className="section-subtitle">
                            We provide innovative agricultural solutions with offline capabilities, mobile-first design, and farmer-centered approach
                        </p>
                    </div>

                    <div className="grid grid-cols-4 gap-6 mb-12">
                        <div className="text-center">
                            <div className="feature-icon bg-primary text-white mb-4">📱</div>
                            <h4 className="font-weight-bold text-primary mb-2">Mobile-First</h4>
                            <p className="text-gray text-sm">Optimized for Android tablets and smartphones</p>
                        </div>
                        <div className="text-center">
                            <div className="feature-icon bg-accent text-primary mb-4">🔄</div>
                            <h4 className="font-weight-bold text-primary mb-2">Offline-Capable</h4>
                            <p className="text-gray text-sm">Works in low-connectivity environments</p>
                        </div>
                        <div className="text-center">
                            <div className="feature-icon bg-success text-white mb-4">🔒</div>
                            <h4 className="font-weight-bold text-primary mb-2">Secure & Private</h4>
                            <p className="text-gray text-sm">Full compliance with data protection standards</p>
                        </div>
                        <div className="text-center">
                            <div className="feature-icon bg-info text-white mb-4">🌾</div>
                            <h4 className="font-weight-bold text-primary mb-2">Farmer-Centered</h4>
                            <p className="text-gray text-sm">Designed for rural communities and local contexts</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* SERVICES GRID */}
            <section className="section bg-gray-50">
                <div className="container">
                    <div className="section-header">
                        <h2 className="section-title">Our Digital Solutions</h2>
                        <p className="section-subtitle">
                            Comprehensive agricultural MIS modules for rural development
                        </p>
                    </div>

                    <div className="grid grid-cols-3 gap-6">
                        {services.map((service) => (
                            <div key={service.id} className="card hover:shadow-lg transition-all">
                                <div className="card-body">
                                    <div className="feature-icon bg-gray-100 text-primary mb-4">
                                        {service.icon}
                                    </div>
                                    <h3 className="text-xl font-weight-bold text-primary mb-3">
                                        {service.title}
                                    </h3>
                                    <p className="text-gray mb-4 text-sm leading-relaxed">
                                        {service.description}
                                    </p>
                                    
                                    <div className="mb-4">
                                        <h4 className="font-weight-bold text-primary text-sm mb-2">Key Features:</h4>
                                        <ul className="text-sm text-gray">
                                            {service.features.map((feature, index) => (
                                                <li key={index} className="mb-1">
                                                    ✓ {feature}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                                <div className="card-footer">
                                    <Link to={service.link} className="btn btn-outline btn-sm">
                                        Learn More
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* EMERGENCY SECTION */}
            <section className="section bg-primary text-white">
                <div className="container">
                    <div className="text-center">
                        <div className="text-6xl mb-4">🚨</div>
                        <h2 className="text-4xl font-weight-bold mb-4">24/7 Emergency Care</h2>
                        <p className="text-xl mb-6 opacity-90">
                            Our emergency department is always ready to provide immediate medical attention
                        </p>
                        <div className="grid grid-cols-3 gap-8 mb-8">
                            <div>
                                <div className="text-3xl font-weight-bold text-accent">24/7</div>
                                <div className="text-sm">Emergency Services</div>
                            </div>
                            <div>
                                <div className="text-3xl font-weight-bold text-accent">&lt;5min</div>
                                <div className="text-sm">Average Response Time</div>
                            </div>
                            <div>
                                <div className="text-3xl font-weight-bold text-accent">100%</div>
                                <div className="text-sm">Success Rate</div>
                            </div>
                        </div>
                        <div className="flex gap-4 justify-center">
                            <Link to="/contact" className="btn btn-accent btn-lg">
                                Emergency Contact
                            </Link>
                            <Link to="/services/emergency" className="btn btn-outline btn-lg" style={{borderColor: 'white', color: 'white'}}>
                                Learn More
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA SECTION */}
            <section className="cta">
                <div className="container">
                    <h2 className="cta-title">Ready to Experience Quality Healthcare?</h2>
                    <p className="cta-subtitle">
                        Schedule a consultation with our agricultural specialists or contact us for more information about our training programs.
                    </p>
                    <div className="cta-actions">
                        <Link to="/contact" className="btn btn-primary btn-xl">
                            Schedule Consultation
                        </Link>
                        <Link to="/doctors" className="btn btn-outline btn-xl">
                            Meet Our Team
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
