import React from 'react';
import { SALON_INFO } from '../data/salonData';
import { ReviewsSection } from '../components/ReviewsSection';

export const AboutPage: React.FC = () => {
  return (
    <div className="about-page-view">
      <div className="container full">
        <section
          className="section-banner page"
          style={{ backgroundImage: `url('/images/about-banner.jpg')` }}
        >
          <h1>About Us</h1>
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
            » <span className="breadcrumb_last" aria-current="page">About Us</span>
          </span>
        </p>
      </div>

      <section className="section-about page">
        <div className="container">
          <div className="flex-item">
            <div className="images-about">
              <img
                src="/images/about-group.png"
                alt="Ardona Beauty Salon Upper West Side NYC"
              />
            </div>
            <div className="description-about">
              <p>
                Established in 2022 <br />
                Welcome to Ardona Beauty Salon! Located at 2578 Broadway on Manhattan&apos;s prestigious Upper West Side, we are a creative hub born from a decade of mastery in custom color formulations, balayage, and precision hair styling. Our master stylists have built an exceptional reputation and a loyal clientele who have become our cherished regulars.
              </p>
              <p>
                Driven by a passion for delivering exceptional haircuts, vibrant dimensional color, and luxurious restorative treatments, our vision was to create a space where clients feel completely at home with their hair. This vision came to life with the creation of Ardona Beauty Salon, an elegant, spacious, and welcoming studio. Located in the heart of Upper West Side New York, we take immense pride in offering top-notch services provided by our team of highly skilled stylists, dedicated to making you look and feel your absolute best.
              </p>
            </div>
          </div>
        </div>
      </section>

      <ReviewsSection />
    </div>
  );
};
