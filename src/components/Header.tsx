import React, { useState } from 'react';
import { SALON_INFO } from '../data/salonData';
import { useBookingCart } from '../context/BookingCartContext';

interface HeaderProps {
  activePage: string;
  setActivePage: (page: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ activePage, setActivePage }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { openCart, cartItems } = useBookingCart();

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About Us' },
    { id: 'services', label: 'Services' },
    { id: 'promotions', label: 'Promotions' },
    { id: 'blog', label: 'Blog' },
    { id: 'contact', label: 'Contact us' }
  ];

  const handleNavClick = (id: string) => {
    setActivePage(id);
    setMobileMenuOpen(false);

    if (id === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  return (
    <header>
      <section className="section-header-top">
        <div className="container full">
          <div className="flex-header">
            <div className="work-time">
              <img src="/icons/work-icon.svg" alt="" />
              <p>
                Every Day <span>10AM - 8PM</span>
              </p>
            </div>
            <div className="addres">
              <img src="/icons/location-icon.svg" alt="" />
              <p>{SALON_INFO.address.full}</p>
            </div>
            <div className="social-network">
              <ul>
                <li>
                  <a href={SALON_INFO.instagramUrl} target="_blank" rel="noopener noreferrer">
                    <img src="/icons/instagram.svg" alt="" />
                  </a>
                </li>
                <li>
                  <a href={SALON_INFO.facebookUrl} target="_blank" rel="noopener noreferrer">
                    <img src="/icons/facebook.svg" alt="" />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="section-header">
        <div className="container full">
          <div className="flex-header">
            <div className="logo">
              <a
                href="#home"
                className="custom-logo-link"
                rel="home"
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick('home');
                }}
              >
                <img
                  src="/icons/ardona-header-logo.svg"
                  className="custom-logo"
                  width="226"
                  height="60"
                  alt="Ardona Beauty Salon"
                />
              </a>
            </div>

            <div className={`menu ${mobileMenuOpen ? 'active' : ''}`}>
              <ul className="menu-nav-list" id="menu-menu-1">
                {navItems.map((item) => (
                  <li
                    key={item.id}
                    className={`menu-item ${activePage === item.id ? 'current-menu-item' : ''}`}
                  >
                    <a
                      href={`#${item.id}`}
                      onClick={(e) => {
                        e.preventDefault();
                        handleNavClick(item.id);
                      }}
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
                <li className="menu-item menu-item-book-mobile">
                  <button
                    type="button"
                    className="mobile-drawer-book-btn"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      openCart();
                    }}
                  >
                    Book now {cartItems.length > 0 && `(${cartItems.length})`}
                  </button>
                </li>
              </ul>
            </div>

            <div className="mobile-burger">
              <div
                className={`owerlay ${mobileMenuOpen ? 'active' : ''}`}
                onClick={() => setMobileMenuOpen(false)}
              />
              <button
                type="button"
                aria-label="menu button"
                className={`toggle-nav ${mobileMenuOpen ? 'active' : ''}`}
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                <span></span>
                <span></span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </header>
  );
};
