import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { MobileBottomBar } from './components/MobileBottomBar';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { ServicesPage } from './pages/ServicesPage';
import { PromotionsPage } from './pages/PromotionsPage';
import { BlogPage } from './pages/BlogPage';
import { ContactPage } from './pages/ContactPage';

export const App: React.FC = () => {
  const [activePage, setActivePage] = useState<string>('home');

  const resolvePageFromUrl = (): string => {
    const hash = window.location.hash.replace('#', '').toLowerCase();
    const path = window.location.pathname.replace(/^\/|\/$/g, '').toLowerCase();

    const target = hash || path;

    if (target === 'about' || target === 'about-us') return 'about';
    if (target === 'services' || target === 'our-services') return 'services';
    if (target === 'promotions' || target === 'promos-offers') return 'promotions';
    if (target === 'blog') return 'blog';
    if (target === 'contact' || target === 'contact-us') return 'contact';
    return 'home';
  };

  useEffect(() => {
    const handleUrlChange = () => {
      const page = resolvePageFromUrl();
      setActivePage(page);
    };

    handleUrlChange();

    window.addEventListener('hashchange', handleUrlChange);
    window.addEventListener('popstate', handleUrlChange);
    return () => {
      window.removeEventListener('hashchange', handleUrlChange);
      window.removeEventListener('popstate', handleUrlChange);
    };
  }, []);

  const handleNavClick = (pageId: string) => {
    let cleanId = pageId.toLowerCase().replace('#', '');
    if (cleanId === 'about-us') cleanId = 'about';
    if (cleanId === 'our-services') cleanId = 'services';
    if (cleanId === 'promos-offers') cleanId = 'promotions';
    if (cleanId === 'contact-us') cleanId = 'contact';

    setActivePage(cleanId);
    window.location.hash = cleanId === 'home' ? 'home' : cleanId;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <Header activePage={activePage} setActivePage={handleNavClick} />

      <main id="primary" className="site-main">
        {activePage === 'about' && <AboutPage />}
        {activePage === 'services' && <ServicesPage />}
        {activePage === 'promotions' && <PromotionsPage />}
        {activePage === 'blog' && <BlogPage />}
        {activePage === 'contact' && <ContactPage />}
        {activePage === 'home' && <HomePage />}
      </main>

      <Footer onNavClick={handleNavClick} />
      <MobileBottomBar />
    </>
  );
};

export default App;
