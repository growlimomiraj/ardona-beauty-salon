import React, { useState } from 'react';
import { SALON_INFO } from '../data/salonData';

export const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && (formData.email || formData.phone)) {
      setSubmitted(true);
      setTimeout(() => {
        setFormData({ name: '', email: '', phone: '', message: '' });
      }, 4000);
    }
  };

  return (
    <div className="contact-page-view">
      <div className="container full">
        <section
          className="section-banner page"
          style={{ backgroundImage: `url('/images/contact-banner.jpg')` }}
        >
          <h1>Contact us</h1>
          <div className="appointment">
            <a href={SALON_INFO.bookingUrl} target="_blank" rel="noopener noreferrer">
              Book an Appointment
            </a>
          </div>
        </section>
      </div>

      <div className="container position-ab">
        <p id="breadcrumbs">
          <span>
            <span>
              <a href="#home">Home</a>
            </span>{' '}
            » <span className="breadcrumb_last" aria-current="page">Contact us</span>
          </span>
        </p>
      </div>

      <section className="section-contact section">
        <div className="container">
          <div className="flex-contact">
            <div className="contact-item">
              <span>Contact</span>
              <h2>QUESTIONS? CONCERNS?</h2>
              <ul>
                <li>
                  <img src="/images/location-contact.png" alt="Location" width="36" height="36" />
                  <p>{SALON_INFO.address.full}</p>
                </li>
                <li>
                  <img src="/images/gmail-contact.png" alt="Email" width="36" height="36" />
                  <a href={`mailto:${SALON_INFO.email}`}>{SALON_INFO.email}</a>
                </li>
                <li>
                  <img src="/images/phone-icon.png" alt="Phone" width="36" height="36" />
                  <a href={`tel:${SALON_INFO.phoneRaw}`}>{SALON_INFO.phone}</a>
                </li>
                <li>
                  <img src="/images/every-day.png" alt="Hours" width="36" height="36" />
                  <p>
                    Every Day <span>10AM&nbsp;-&nbsp;8PM</span>
                  </p>
                </li>
              </ul>
            </div>

            <div className="maps" style={{ position: 'relative', overflow: 'hidden', borderRadius: '4px', background: '#1c1c1c' }}>
              <iframe
                title="Ardona Beauty Salon Location 2578 Broadway New York NY 10025"
                src="https://maps.google.com/maps?q=2578+Broadway,+New+York,+NY+10025&t=&z=15&ie=UTF8&iwloc=&output=embed"
                style={{ border: 0, width: '100%', height: '100%', display: 'block' }}
                allowFullScreen
                loading="eager"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

          {/* Direct Message Form Section */}
          <div
            className="contact-inquiry-container"
            style={{
              marginTop: '80px',
              maxWidth: '850px',
              marginRight: 'auto',
              marginLeft: 'auto',
              background: '#0D0D0D',
              border: '1px solid #222222',
              borderRadius: '8px',
              padding: '45px 50px'
            }}
          >
            <div style={{ textAlign: 'center', marginBottom: '35px' }}>
              <span style={{ color: '#C59D5F', fontFamily: 'Montserrat-Bold', fontSize: '15px', letterSpacing: '1px', textTransform: 'uppercase' }}>
                Online Inquiry
              </span>
              <h3 style={{ color: '#FFF', fontSize: '32px', fontFamily: 'Montserrat-Bold', marginTop: '10px' }}>
                Send Us a Message
              </h3>
              <p style={{ color: '#999', fontSize: '16px', marginTop: '8px' }}>
                Have a question about a service, color correction, or custom styling? Fill out the form below.
              </p>
            </div>

            {submitted ? (
              <div
                style={{
                  background: 'rgba(197, 157, 95, 0.15)',
                  border: '1px solid #C59D5F',
                  color: '#C59D5F',
                  padding: '25px',
                  borderRadius: '6px',
                  fontSize: '17px',
                  textAlign: 'center',
                  lineHeight: 1.6
                }}
              >
                ✓ Thank you! Your message has been sent to Ardona Beauty Salon management. We will respond within 24 hours.
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div style={{ display: 'flex', gap: '20px', marginBottom: '20px', flexWrap: 'wrap' }}>
                  <div style={{ flex: '1 1 280px' }}>
                    <label style={{ display: 'block', color: '#BBB', fontSize: '14px', marginBottom: '8px', fontFamily: 'Montserrat-Bold' }}>
                      FULL NAME *
                    </label>
                    <input
                      type="text"
                      placeholder="Jane Doe"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '14px 18px',
                        background: '#161616',
                        border: '1px solid #333',
                        color: '#FFF',
                        fontSize: '15px',
                        borderRadius: '4px'
                      }}
                    />
                  </div>

                  <div style={{ flex: '1 1 280px' }}>
                    <label style={{ display: 'block', color: '#BBB', fontSize: '14px', marginBottom: '8px', fontFamily: 'Montserrat-Bold' }}>
                      EMAIL ADDRESS *
                    </label>
                    <input
                      type="email"
                      placeholder="jane@example.com"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '14px 18px',
                        background: '#161616',
                        border: '1px solid #333',
                        color: '#FFF',
                        fontSize: '15px',
                        borderRadius: '4px'
                      }}
                    />
                  </div>
                </div>

                <div style={{ marginBottom: '20px' }}>
                  <label style={{ display: 'block', color: '#BBB', fontSize: '14px', marginBottom: '8px', fontFamily: 'Montserrat-Bold' }}>
                    PHONE NUMBER
                  </label>
                  <input
                    type="tel"
                    placeholder="(212) 555-0199"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '14px 18px',
                      background: '#161616',
                      border: '1px solid #333',
                      color: '#FFF',
                      fontSize: '15px',
                      borderRadius: '4px'
                    }}
                  />
                </div>

                <div style={{ marginBottom: '25px' }}>
                  <label style={{ display: 'block', color: '#BBB', fontSize: '14px', marginBottom: '8px', fontFamily: 'Montserrat-Bold' }}>
                    YOUR MESSAGE
                  </label>
                  <textarea
                    placeholder="Tell us about the hairstyle or service you're interested in..."
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '14px 18px',
                      background: '#161616',
                      border: '1px solid #333',
                      color: '#FFF',
                      fontSize: '15px',
                      borderRadius: '4px',
                      resize: 'vertical'
                    }}
                  />
                </div>

                <button
                  type="submit"
                  style={{
                    width: '100%',
                    padding: '16px',
                    background: '#C59D5F',
                    border: 'none',
                    color: '#000',
                    fontFamily: 'Montserrat-Bold',
                    fontSize: '15px',
                    textTransform: 'uppercase',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontWeight: 700,
                    letterSpacing: '1px',
                    transition: 'opacity 0.2s'
                  }}
                >
                  Submit Inquiry
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};
