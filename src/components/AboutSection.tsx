import React from 'react';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="section-about">
      <div className="container">
        <div className="flex-item">
          <div className="images-about">
            <img alt="hair salon nyc" src="/images/about-group.png" />
          </div>
          <div className="description-about">
            <p>
              Welcome to Ardona Beauty Salon, where your hair meets the art of styling. Our expert team specializes in a range of high-quality beauty services from classic cuts to advanced coloring techniques. Hair Salon in NYC, we are committed to providing you with a unique, personalized salon experience. Discover your next hair transformation with us!
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
