import React from 'react';
import { SALON_INFO } from '../data/salonData';

export const PromotionsView: React.FC = () => {
  return (
    <div className="promotions-page-wrapper">
      {/* Banner */}
      <section className="section-banner page" style={{ backgroundImage: `url('/images/hero-banner.jpg')` }}>
        <div className="container">
          <h1 style={{ color: '#FFF', fontSize: '55px', fontWeight: 700, textTransform: 'uppercase', marginBottom: '20px' }}>
            Promotions & Specials
          </h1>
          <p style={{ color: '#C59D5F', fontSize: '18px', letterSpacing: '1px', textTransform: 'uppercase' }}>
            Exclusive Season Offers at Ardona Beauty Salon
          </p>
        </div>
      </section>

      {/* Promo Offer 1: Fall Discount */}
      <section className="section-about promotions-page" style={{ padding: '80px 0' }}>
        <div className="container">
          <div className="flex-item">
            <div className="images-about" style={{ width: '560px', height: '380px' }}>
              <img src="/images/about-group.png" alt="Special Offers" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <div className="description-about" style={{ width: '520px' }}>
              <span className="section-label">Limited Time Offer</span>
              <h2 style={{ fontSize: '38px', color: '#FFF', textTransform: 'uppercase', marginBottom: '15px' }}>
                Fall Color & Styling Specials
              </h2>
              <h3 style={{ color: '#C59D5F', fontSize: '24px', marginBottom: '20px', fontWeight: 600 }}>
                10% Off All Online Bookings
              </h3>
              <p style={{ color: '#FFF', fontSize: '16px', lineHeight: 1.6, marginBottom: '20px' }}>
                Enjoy special seasonal savings on our most popular services including Single Process color, Highlights, Balayage, Keratin Treatments, and precision haircuts when you book online.
              </p>
              <ul style={{ marginBottom: '30px', color: '#D9D9D9', lineHeight: '2' }}>
                <li>✓ Single Process (roots): <span style={{ color: '#C59D5F', fontWeight: 700 }}>$85.50</span> (Regular $95)</li>
                <li>✓ Highlights Half Head: <span style={{ color: '#C59D5F', fontWeight: 700 }}>$211.50</span> (Regular $235)</li>
                <li>✓ Keratin Smoothing Treatment: <span style={{ color: '#C59D5F', fontWeight: 700 }}>$288.00</span> (Regular $320)</li>
                <li>✓ Women Wash Cut & Blow Dry: <span style={{ color: '#C59D5F', fontWeight: 700 }}>$85.50</span> (Regular $95)</li>
              </ul>
              <div>
                <a
                  href={SALON_INFO.bookingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="accordion-service-book-btn"
                  style={{ display: 'inline-block', padding: '14px 40px', width: 'auto' }}
                >
                  Book with Fall Discount Now
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
