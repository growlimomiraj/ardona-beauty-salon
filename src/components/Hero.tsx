import React from 'react';
import { SALON_INFO } from '../data/salonData';

export const Hero: React.FC = () => {
  return (
    <>
      <div className="container full">
        <section id="home" className="section-banner">
          <div className="mobile-hero-media">
            <img
              src="/images/hero-banner-mobile.jpg"
              alt="Ardona Beauty Salon Storefront 2578 Broadway NYC"
              className="mobile-storefront-img"
            />
          </div>

          <div className="heading-banner">
            <h1>
              <span>Ardona Salon</span> - Expert <br />
              Hair Salon in NYC
            </h1>
            <div className="appointment">
              <a href={SALON_INFO.bookingUrl} target="_blank" rel="noopener noreferrer">
                Book an Appointment
              </a>
            </div>
          </div>
        </section>
      </div>

      <div className="virtualconsultation" style={{ background: 'black', padding: '40px 40px 40px 40px' }}>
        <h1 style={{ color: 'white', textAlign: 'center' }}>
          New clients get your <span style={{ color: '#C59D5F' }}>virtual consultation</span> here
        </h1>
        <h5 className="consultation" style={{ textAlign: 'center' }}>
          <a
            className="virtualconsultbutton"
            href={SALON_INFO.bookingUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            VIRTUAL CONSULTATION
          </a>
        </h5>
      </div>
    </>
  );
};
