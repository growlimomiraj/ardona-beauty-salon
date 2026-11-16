import React from 'react';

interface FooterProps {
  onNavClick: (page: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavClick }) => {
  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About Us' },
    { id: 'services', label: 'Services' },
    { id: 'promotions', label: 'Promotions' },
    { id: 'blog', label: 'Blog' },
    { id: 'contact', label: 'Contact us' }
  ];

  return (
    <footer>
      <section className="section-footer">
        <div className="container">
          <div className="menu">
            <ul className="menu" id="menu-menu-2">
              {navItems.map((item) => (
                <li key={item.id} className="menu-item">
                  <a
                    href={`#${item.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      onNavClick(item.id);
                    }}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="footer-bottom">
        <div className="container">
          <div className="flex-footer">
            <div className="logo-footer">
              <a
                href="#home"
                onClick={(e) => {
                  e.preventDefault();
                  onNavClick('home');
                }}
              >
                <img
                  alt="Ardona Beauty Salon"
                  src="/icons/ardona-footer-logo.svg"
                  height="38"
                  width="200"
                />
              </a>
              <p>© Copyright 2024 Ardona Beauty Salon | All Rights Reserved.</p>
            </div>

            <div className="text-center">
              <p>
                At Ardona Beauty Salon, an upscale New York City hair salon, we all have a passion for great hair. Our professionals make this one of the most premier hair salons in NYC.
              </p>
            </div>

            <div className="rgm-logo">
              <a href="tel:+17184339837">
                <img
                  alt=""
                  src="/icons/location-icon.svg"
                  width="14"
                  height="18"
                  style={{ marginRight: '10px' }}
                />
                <p>
                  2578 Broadway, New York, NY 10025
                  <br />
                  Upper West Side | <span>(718) 433-9837</span>
                </p>
              </a>
            </div>
          </div>
        </div>
      </section>
    </footer>
  );
};
