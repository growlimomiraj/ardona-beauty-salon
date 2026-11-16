import React, { useState } from 'react';
import { CATEGORIES } from '../components/ServicesMenu';
import { SALON_INFO } from '../data/salonData';

export const ServicesPage: React.FC = () => {
  const [openCategory, setOpenCategory] = useState<string | null>(null);
  const [selectedFilter, setSelectedFilter] = useState<string>('all');

  const toggleCategory = (id: string) => {
    setOpenCategory((prev) => (prev === id ? null : id));
  };

  const filteredCategories =
    selectedFilter === 'all'
      ? CATEGORIES
      : CATEGORIES.filter((c) => c.id === selectedFilter);

  return (
    <div className="services-page-view">
      <div className="container full">
        <section
          className="section-banner page"
          style={{ backgroundImage: `url('/images/services-banner.jpg')` }}
        >
          <h1>Our Services</h1>
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
            » <span className="breadcrumb_last" aria-current="page">Services</span>
          </span>
        </p>
      </div>

      <section className="section-services page">
        <div className="container">
          <div className="flex-item">
            <div className="select-item">
              <select
                value={selectedFilter}
                onChange={(e) => setSelectedFilter(e.target.value)}
                aria-label="Filter Services by Category"
              >
                <option value="all">All Services</option>
                {CATEGORIES.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.title}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div id="fullTeam" className="services-flex">
            {filteredCategories.map((cat) => {
              const isOpen = openCategory === cat.id;

              return (
                <div key={cat.id} className="item">
                  <div
                    className="according"
                    onClick={() => toggleCategory(cat.id)}
                    role="button"
                    tabIndex={0}
                    aria-expanded={isOpen}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        toggleCategory(cat.id);
                      }
                    }}
                  >
                    <h3>
                      <img
                        width="30"
                        height="30"
                        src={cat.icon}
                        alt=""
                        className="attachment-post-thumbnail size-post-thumbnail wp-post-image"
                        loading="lazy"
                      />
                      {cat.title}
                    </h3>
                    <div className="toggle-button">
                      <img
                        src="/icons/plus-icon.svg"
                        alt="plus"
                        style={{ display: isOpen ? 'none' : 'block' }}
                      />
                      <img
                        src="/icons/minus-icon.svg"
                        alt="minus"
                        style={{ display: isOpen ? 'block' : 'none' }}
                      />
                    </div>
                  </div>

                  {isOpen && (
                    <div className="accordion__content" style={{ display: 'block' }}>
                      {cat.services.map((sub, idx) => (
                        <div key={idx}>
                          <div className="flex-sub-post">
                            <span>{sub.name}</span>
                            <span className="prices">
                              <span className="prices line"></span>
                              {sub.price}
                            </span>
                          </div>
                          {sub.cust && <span className="cust">{sub.cust}</span>}
                          {sub.note && <p>{sub.note}</p>}
                        </div>
                      ))}

                      <a
                        href={cat.bookingUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="accordion-service-book-btn"
                      >
                        Book now
                      </a>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Salon Policies Section (matching One Salon NYC 1:1) */}
      <section className="section-services after">
        <div className="container">
          <div className="heading">
            <h2>SALON POLICIES</h2>
          </div>

          <div style={{ maxWidth: '960px', margin: '0 auto', textAlign: 'center' }}>
            <h3 style={{ color: '#FFF', fontSize: '28px', marginBottom: '20px', fontFamily: 'Montserrat-Bold' }}>
              Cancelation / No Show Policy
            </h3>
            <p style={{ color: '#D9D9D9', fontSize: '17px', lineHeight: 1.8, marginBottom: '50px' }}>
              We kindly ask that any changes and cancellations are made 24 hours before your scheduled appointment. Any guests who no-show, cancel or attempt to reschedule within 24-hours of their scheduled appointment are subject to a $75 per hour booked fee as we are not provided enough time to fill that space at that late of a notice. Out of respect for our guests, services for clients arriving more than 15 minutes late will be honored at Ardona Salon&apos;s discretion.
            </p>

            <div className="brd" style={{ marginBottom: '50px' }}></div>

            <h3 style={{ color: '#FFF', fontSize: '28px', marginBottom: '20px', fontFamily: 'Montserrat-Bold' }}>
              Deposits
            </h3>
            <p style={{ color: '#D9D9D9', fontSize: '17px', lineHeight: 1.8, marginBottom: '30px' }}>
              Thank you for choosing Ardona Beauty Salon! For all services over $100 we require a 25% deposit to secure your appointment. We accept deposits via Venmo, Zelle, Cash, Debit/Credit Cards. If you booked your appointment online, we will use the card you provided to collect the deposit. We look forward to servicing you!
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
