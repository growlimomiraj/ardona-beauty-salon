import React from 'react';
import { SALON_INFO } from '../data/salonData';
import { useBookingCart } from '../context/BookingCartContext';

export const ContactSection: React.FC = () => {
  const { openCart } = useBookingCart();
  return (
    <section id="contact" className="section-contact-teaser">
      <div className="container">
        <div className="flex-contact">
          <div className="contact-item">
            <span className="sub">Ardona Beauty Salon</span>
            <h2>Come Visit Us</h2>

            <ul>
              <li>
                <img src="/icons/location-icon.svg" alt="" width="20" height="24" />
                <div>
                  <p style={{ fontWeight: 600 }}>{SALON_INFO.address.street}</p>
                  <p style={{ color: '#C59D5F', fontSize: '15px' }}>
                    {SALON_INFO.address.city}, {SALON_INFO.address.state} {SALON_INFO.address.zip} ({SALON_INFO.address.neighborhood})
                  </p>
                </div>
              </li>

              <li>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#C59D5F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                <p>
                  Call:{' '}
                  <a href={`tel:${SALON_INFO.phoneRaw}`} style={{ color: '#C59D5F', fontWeight: 700, marginLeft: '5px' }}>
                    {SALON_INFO.phone}
                  </a>
                </p>
              </li>

              <li>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#C59D5F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
                <p>
                  Email:{' '}
                  <a href={`mailto:${SALON_INFO.email}`} style={{ color: '#C59D5F', marginLeft: '5px' }}>
                    {SALON_INFO.email}
                  </a>
                </p>
              </li>

              <li>
                <img src="/icons/work-icon.svg" alt="" width="20" height="20" />
                <div className="contact-hours-list">
                  <span style={{ fontWeight: 700, color: '#FFFFFF', marginBottom: '4px', display: 'block' }}>
                    Opening Hours:
                  </span>
                  {SALON_INFO.hours.map((h, i) => (
                    <div key={i} style={{ display: 'flex', justifyContent: 'space-between', gap: '20px', width: '280px' }}>
                      <span>{h.day}:</span>
                      <span style={{ color: '#C59D5F', fontWeight: 600 }}>{h.hours}</span>
                    </div>
                  ))}
                </div>
              </li>
            </ul>

            <div style={{ marginTop: '35px' }}>
              <button
                type="button"
                className="accordion-service-book-btn red-btn"
                style={{ textAlign: 'center', width: '100%', maxWidth: '320px' }}
                onClick={() => openCart()}
              >
                Book An Appointment
              </button>
            </div>
          </div>

          {/* Interactive Google Map of 2578 Broadway, New York, NY 10025 */}
          <div className="maps">
            <iframe
              title="Ardona Beauty Salon Location Map"
              src="https://maps.google.com/maps?q=2578+Broadway,+New+York,+NY+10025&t=&z=15&ie=UTF8&iwloc=&output=embed"
              loading="lazy"
              allowFullScreen
            />
          </div>
        </div>
      </div>
    </section>
  );
};
