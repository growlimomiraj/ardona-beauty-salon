import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { AboutSection } from './components/AboutSection';
import { ServicesMenu } from './components/ServicesMenu';
import { ReviewsSection } from './components/ReviewsSection';
import { FAQSection } from './components/FAQSection';
import { Footer } from './components/Footer';
import { MobileBottomBar } from './components/MobileBottomBar';
import { PromotionsView } from './components/PromotionsView';
import { BlogView } from './components/BlogView';

export const App: React.FC = () => {
  const [activePage, setActivePage] = useState<string>('home');

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (['home', 'about', 'services', 'promotions', 'blog', 'contact'].includes(hash)) {
        setActivePage(hash);
      }
    };

    if (window.location.hash) {
      handleHashChange();
    }

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleNavClick = (pageId: string) => {
    setActivePage(pageId);
    window.location.hash = pageId;

    if (pageId === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (['about', 'services', 'faq'].includes(pageId)) {
      setTimeout(() => {
        const el = document.getElementById(pageId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 50);
    } else if (pageId === 'contact') {
      setTimeout(() => {
        const el = document.getElementById('faq');
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 50);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <>
      <Header activePage={activePage} setActivePage={handleNavClick} />

      <main>
        {activePage === 'promotions' ? (
          <PromotionsView />
        ) : activePage === 'blog' ? (
          <BlogView />
        ) : (
          <>
            <Hero />
            <AboutSection />
            <ServicesMenu />
            <ReviewsSection />
            <FAQSection />
          </>
        )}
      </main>

      <Footer onNavClick={handleNavClick} />
      <MobileBottomBar />
    </>
  );
};

export default App;
