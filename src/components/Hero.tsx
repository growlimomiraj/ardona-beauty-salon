import React from 'react';
import { useBookingCart } from '../context/BookingCartContext';

export const Hero: React.FC = () => {
  const { openCart } = useBookingCart();

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
            <div className="hero-eyebrow">Expert Hair Salon in NYC</div>
            <h1>
              <span>Your Dream Look</span> <br />
              Starts at Ardona Salon
            </h1>
            <div className="appointment">
              <button
                type="button"
                className="appointment-btn"
                onClick={() => openCart()}
              >
                Book an Appointment
              </button>
            </div>
          </div>
        </section>
      </div>

      <div className="virtualconsultation" style={{ background: 'black', padding: '40px 40px 40px 40px' }}>
        <h1 style={{ color: 'white', textAlign: 'center' }}>
          New clients get your <span style={{ color: '#C59D5F' }}>virtual consultation</span> here
        </h1>
        <h5 className="consultation" style={{ textAlign: 'center' }}>
          <button
            type="button"
            className="virtualconsultbutton"
            onClick={() => openCart({
              id: 'virtual-consult',
              name: 'Virtual Hair Consultation',
              category: 'Consultation',
              price: 0,
              priceFormatted: 'Free',
              duration: '20 min',
              note: 'Personalized video/phone hair consultation'
            })}
          >
            VIRTUAL CONSULTATION
          </button>
        </h5>
      </div>
    </>
  );
};
