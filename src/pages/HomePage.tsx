import React from 'react';
import { Hero } from '../components/Hero';
import { AboutSection } from '../components/AboutSection';
import { ServicesMenu } from '../components/ServicesMenu';
import { ReviewsSection } from '../components/ReviewsSection';
import { FAQSection } from '../components/FAQSection';

export const HomePage: React.FC = () => {
  return (
    <>
      <Hero />
      <AboutSection />
      <ServicesMenu />
      <ReviewsSection />
      <FAQSection />
    </>
  );
};
