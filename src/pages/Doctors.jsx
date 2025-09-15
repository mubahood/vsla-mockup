import React from 'react';

export default function Team() {
    const teamMembers = [
        {
            id: 1,
            name: "Dr. Agnes Nakakande",
            specialty: "Project Coordinator",
            description: "Leading the FOSTER Project implementation across Karamoja with over 15 years of experience in agricultural development and rural programming.",
            education: "Makerere University, Agricultural Sciences",
            experience: "15+ years",
            emoji: "�‍🌾"
        },
        {
            id: 2,
            name: "James Lomuria",
            specialty: "FFS Technical Specialist",
            description: "Expert in Farmer Field School methodologies and AESA (Agro-Ecosystem Analysis) training with deep knowledge of Karamoja farming systems.",
            education: "Gulu University, Agriculture",
            experience: "12+ years",
            emoji: "�‍🌾"
        },
        {
            id: 3,
            name: "Mary Akello",
            specialty: "VSLA Coordinator",
            description: "Specializing in Village Savings and Loan Association development with focus on women's financial inclusion and group dynamics.",
            education: "Uganda Management Institute",
            experience: "10+ years",
            emoji: "�‍💼"
        },
        {
            id: 4,
            name: "Peter Lokomol",
            specialty: "Digital Systems Specialist",
            description: "Mobile technology expert ensuring offline-first design and system usability in low-connectivity rural environments.",
            education: "Makerere University, Computer Science",
            experience: "8+ years",
            emoji: "�‍💻"
        },
        {
            id: 5,
            name: "Grace Atyang",
            specialty: "M&E Officer",
            description: "Monitoring and evaluation specialist with expertise in gender-sensitive indicators and impact measurement in agricultural programs.",
            education: "Uganda Martyrs University",
            experience: "7+ years",
            emoji: "�‍📊"
        },
        {
            id: 6,
            name: "Samuel Lokiru",
            specialty: "Community Mobilizer",
            description: "Grassroots organizer specializing in community engagement and traditional knowledge integration with modern agricultural practices.",
            education: "Local Community Leadership",
            experience: "20+ years",
            emoji: "�‍🤝‍👨"
        }
    ];

    return (
        <>
            {/* Hero Section */}
            <div className="hero-section">
                <div className="hero-container">
                    <div className="hero-content">
                        <h1 className="hero-title">Meet Our FOSTER Project Team</h1>
                        <p className="hero-subtitle">
                            Dedicated professionals working to transform rural livelihoods in Karamoja through digital innovation and agricultural development
                        </p>
                    </div>
                </div>
            </div>

            {/* Team Grid Section */}
            <section className="doctors-section">
                <div className="section-container">
                    <div className="doctors-grid">
                        {teamMembers.map((member) => (
                            <div key={member.id} className="doctor-card">
                                <div className="doctor-avatar">
                                    <span className="doctor-emoji">{member.emoji}</span>
                                </div>
                                <div className="doctor-info">
                                    <h3 className="doctor-name">{member.name}</h3>
                                    <p className="doctor-specialty">{member.specialty}</p>
                                    <p className="doctor-description">{member.description}</p>
                                    <div className="doctor-details">
                                        <div className="detail-item">
                                            <span className="detail-label">Education:</span>
                                            <span className="detail-value">{member.education}</span>
                                        </div>
                                        <div className="detail-item">
                                            <span className="detail-label">Experience:</span>
                                            <span className="detail-value">{member.experience}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Call to Action Section */}
            <section className="cta-section">
                <div className="section-container">
                    <div className="cta-content">
                        <h2>Ready to Join the Digital Transformation?</h2>
                        <p>Connect with our team to learn more about implementing the Digital MIS in your community or organization.</p>
                        <a href="/contact" className="cta-button large">Contact Our Team</a>
                    </div>
                </div>
            </section>
        </>
    );
}
