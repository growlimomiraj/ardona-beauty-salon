import React from 'react';
import { SALON_INFO } from '../data/salonData';
import { ReviewsSection } from '../components/ReviewsSection';

export const PromotionsPage: React.FC = () => {
  return (
    <div className="promotions-page-view">
      <div className="container full">
        <section
          className="section-banner page"
          style={{ backgroundImage: `url('/images/promotions-banner.jpg')` }}
        >
          <h1>Our Promotions</h1>
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
            » <span className="breadcrumb_last" aria-current="page">Promotions</span>
          </span>
        </p>
      </div>

      <section className="section-about promotions-page">
        <div className="container">
          {/* Promo 1: Blow Dry Special */}
          <div className="flex-item">
            <div className="images-about">
              <img
                src="/images/promo-blowdry.png"
                alt="Blow Dry Special at Ardona Beauty Salon NYC"
              />
            </div>
            <div className="description-about">
              <h2>Mon-Thurs $50 Fri-Sun $55 Blow Dry</h2>
              <h3>
                Ardona Beauty Salon – Blow Dry Special
                <br />
                Located in Upper West Side, New York, NY
              </h3>
              <p>
                Brighten up your week with our $50 Blow Dry Special! Available Monday through Thursday at Ardona Beauty Salon. Treat yourself to a salon-fresh look at an unbeatable price right here in the heart of Upper West Side, New York. Perfect your style with us and make every day a good hair day!
              </p>
              <div className="appointment" style={{ marginTop: '25px' }}>
                <a href={SALON_INFO.bookingUrl} target="_blank" rel="noopener noreferrer">
                  Book Blow Dry Special
                </a>
              </div>
            </div>
          </div>

          {/* Promo 2: 20% Off Color */}
          <div className="flex-item">
            <div className="description-about">
              <h2>20% Off Color</h2>
              <h3>
                Ardona Beauty Salon – Expert Color Services
                <br />
                Located in Upper West Side, New York, NY
              </h3>
              <p>
                Welcome to Ardona Beauty Salon! We’re excited to offer new clients 20% off on all color services. Whether you’re looking to enhance your natural color or try something bold and new, our expert stylists are here to bring your vision to life. Take advantage of this special offer and transform your look with us! Book your appointment today.
              </p>
              <div className="appointment" style={{ marginTop: '25px' }}>
                <a href={SALON_INFO.bookingUrl} target="_blank" rel="noopener noreferrer">
                  Claim 20% Off Color
                </a>
              </div>
            </div>
            <div className="images-about">
              <img
                src="/images/promo-color.png"
                alt="20% Off Color Services at Ardona Beauty Salon NYC"
              />
            </div>
          </div>
        </div>
      </section>

      <ReviewsSection />
    </div>
  );
};
