import React, { useState } from 'react';

export default function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        organization: '',
        subject: '',
        message: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission here
        console.log('Form submitted:', formData);
        alert('Thank you for your message! We\'ll get back to you soon.');
        setFormData({
            name: '',
            email: '',
            organization: '',
            subject: '',
            message: ''
        });
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    return (
        <>
            {/* Hero Section */}
            <div className="hero-section">
                <div className="hero-container">
                    <div className="hero-content">
                        <h1 className="hero-title">Contact the FOSTER Project Team</h1>
                        <p className="hero-subtitle">
                            Get in touch with our team for system access, training, or partnership inquiries
                        </p>
                    </div>
                </div>
            </div>

            {/* Contact Section */}
            <section className="contact-section">
                <div className="section-container">
                    <div className="contact-grid">
                        {/* Contact Form */}
                        <div className="contact-form-area">
                            <h2 className="section-title">Send us a Message</h2>
                            <form onSubmit={handleSubmit} className="contact-form">
                                <div className="form-row">
                                    <div className="form-group">
                                        <label htmlFor="name">Full Name *</label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            required
                                            className="form-input"
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="email">Email Address *</label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                            className="form-input"
                                        />
                                    </div>
                                </div>
                                
                                <div className="form-group">
                                    <label htmlFor="organization">Organization</label>
                                    <input
                                        type="text"
                                        id="organization"
                                        name="organization"
                                        value={formData.organization}
                                        onChange={handleChange}
                                        className="form-input"
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="subject">Subject *</label>
                                    <select
                                        id="subject"
                                        name="subject"
                                        value={formData.subject}
                                        onChange={handleChange}
                                        required
                                        className="form-select"
                                    >
                                        <option value="">Select a subject</option>
                                        <option value="sales">Sales Inquiry</option>
                                        <option value="support">Technical Support</option>
                                        <option value="partnership">Partnership</option>
                                        <option value="demo">Request Demo</option>
                                        <option value="other">Other</option>
                                    </select>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="message">Message *</label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        required
                                        rows="5"
                                        className="form-textarea"
                                        placeholder="Tell us how we can help you..."
                                    ></textarea>
                                </div>

                                <button type="submit" className="form-submit-btn">
                                    Send Message
                                </button>
                            </form>
                        </div>

                        {/* Contact Information */}
                        <div className="contact-info-area">
                            <h2 className="section-title">Get in Touch</h2>
                            
                            <div className="contact-info-card">
                                <div className="contact-info-item">
                                    <div className="contact-icon">📧</div>
                                    <div className="contact-details">
                                        <h3>Email Support</h3>
                                        <p>support@fao-foster.org</p>
                                        <span className="contact-note">Available 24/7 for technical support</span>
                                    </div>
                                </div>

                                <div className="contact-info-item">
                                    <div className="contact-icon">💼</div>
                                    <div className="contact-details">
                                        <h3>Project Inquiries</h3>
                                        <p>foster.project@fao.org</p>
                                        <span className="contact-note">Monday - Friday, 8 AM - 5 PM EAT</span>
                                    </div>
                                </div>

                                <div className="contact-info-item">
                                    <div className="contact-icon">📞</div>
                                    <div className="contact-details">
                                        <h3>Phone Support</h3>
                                        <p>+256 (0) 414 123 456</p>
                                        <span className="contact-note">Technical support available</span>
                                    </div>
                                </div>

                                <div className="contact-info-item">
                                    <div className="contact-icon">🏢</div>
                                    <div className="contact-details">
                                        <h3>FAO Uganda Office</h3>
                                        <p>Plot 2, Nakasero Road<br />FAO Representation<br />Kampala, Uganda</p>
                                        <span className="contact-note">Visit by consultation only</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="faq-section">
                <div className="section-container">
                    <h2 className="section-title">Frequently Asked Questions</h2>
                    <div className="faq-grid">
                        <div className="faq-item">
                            <h3>How can my community access the system?</h3>
                            <p>The Digital MIS is available free of charge to farming communities in Karamoja. Contact our team to schedule training and system setup.</p>
                        </div>
                        <div className="faq-item">
                            <h3>Do you provide training for users?</h3>
                            <p>Yes, we provide comprehensive Training of Trainers (ToT) programs for FFS facilitators, VSLA leaders, and community mobilizers.</p>
                        </div>
                        <div className="faq-item">
                            <h3>Is our data secure and private?</h3>
                            <p>Absolutely. We comply with Uganda's Data Protection Act and FAO's data governance protocols to protect community information.</p>
                        </div>
                        <div className="faq-item">
                            <h3>What kind of support do you provide?</h3>
                            <p>We offer technical support, regular system updates, ongoing training, and field support to ensure successful implementation.</p>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
