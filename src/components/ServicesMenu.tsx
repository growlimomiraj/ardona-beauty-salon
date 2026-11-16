import React, { useState } from 'react';

interface SubService {
  name: string;
  price: string;
  originalPrice?: string;
  cust: string;
  note: string;
}

interface ServiceCategory {
  id: string;
  title: string;
  icon: string;
  bookingUrl: string;
  services: SubService[];
}

export const CATEGORIES: ServiceCategory[] = [
  {
    id: 'cuts',
    title: 'CUTS',
    icon: '/icons/cat-cuts.png',
    bookingUrl: 'https://www.ardonabeautysalon.com/booking-calendar/wash-cut-blow-dry-women-1',
    services: [
      {
        name: 'SHORT CUTS',
        price: '$67.50',
        originalPrice: '$75',
        cust: 'For cuts above your chin',
        note: 'no blowout | If you’d like a bob or longer, please refer to the “Cut and Blowdry” option'
      },
      {
        name: 'BARBER CUTS',
        price: '$40.50',
        originalPrice: '$45',
        cust: 'For fades or clipper work',
        note: 'Includes a wash'
      },
      {
        name: 'CUT AND BLOWDRY',
        price: '$85.50',
        originalPrice: '$95',
        cust: 'For any cuts longer than a pixie',
        note: 'The price depends on type of hair | Included the wash $95 and up'
      },
      {
        name: 'WASH & CUT GIRLS',
        price: '$45.00',
        originalPrice: '$50',
        cust: 'Gentle wash & precision haircut for girls',
        note: 'Start $50 & up'
      },
      {
        name: 'WASH & CUT BOYS',
        price: '$31.50',
        originalPrice: '$35',
        cust: 'Clean, styled haircut with wash for boys',
        note: 'Start $30 & up'
      }
    ]
  },
  {
    id: 'balayage-highlights',
    title: 'Balayage/Highlights',
    icon: '/icons/cat-cuts.png',
    bookingUrl: 'https://www.ardonabeautysalon.com/booking-calendar/balayage-ombre',
    services: [
      {
        name: 'HAIRLINE HIGHLIGHTS',
        price: '$148.50',
        originalPrice: '$165',
        cust: 'Already have highlights or balayage and just need a refresh? We will apply foils around your hairline.',
        note: 'For best results, make sure you’ve had a refresh within the last 3 months.'
      },
      {
        name: 'HALF HEAD OF BALAYAGE/HIGHLIGHTS',
        price: '$211.50',
        originalPrice: '$235',
        cust: 'Includes hairline highlights from ear to ear, your part line, and the crown.',
        note: 'For best results, make sure you’ve had a refresh within the last 3-5 months.'
      },
      {
        name: 'FULL HEAD OF BALAYAGE/HIGHLIGHTS',
        price: '$247.50',
        originalPrice: '$275',
        cust: 'Balayage/Highlights applied throughout the hair to create brightness or dimension.',
        note: 'Appointments booked after 3PM for these services will most likely be rescheduled.'
      },
      {
        name: 'BALAYAGE / OMBRE',
        price: '$288.00',
        originalPrice: '$320',
        cust: 'Freehand painted color to create graduated, natural looking effect.',
        note: 'Start $295 & up | Free return within one week of service provided free of charge.'
      },
      {
        name: 'BABYLIGHTS',
        price: '$265.50',
        originalPrice: '$295',
        cust: 'Finer sections than traditional highlights for delicate micro-blended radiance.',
        note: 'Takes longer to do for an ultra-natural sun-kissed finish.'
      }
    ]
  },
  {
    id: 'glossing',
    title: 'Glossing',
    icon: '/icons/cat-glossing.png',
    bookingUrl: 'https://www.ardonabeautysalon.com/booking-calendar/color-gloss',
    services: [
      {
        name: 'COLOR GLOSS',
        price: '$76.50',
        originalPrice: '$85',
        cust: 'Gentle, ammonia free semi-permanent formula that adds luminous shine to color treated hair.',
        note: 'Please note blowouts are NOT included in color services. Please book a blowout separately.'
      },
      {
        name: 'CLEAR GLOSS',
        price: '$49.50',
        originalPrice: '$55',
        cust: 'Leaves brilliant mirror shine coat on hair and conditions cuticle layers.',
        note: 'Start $55 & up'
      }
    ]
  },
  {
    id: 'double-process',
    title: 'Double Process',
    icon: '/icons/cat-double-process.png',
    bookingUrl: 'https://www.ardonabeautysalon.com/booking-calendar/double-process',
    services: [
      {
        name: 'DOUBLE PROCESS',
        price: '$184.50',
        originalPrice: '$205',
        cust: 'In this service color is lifted from your hair and your desired tone is deposited.',
        note: 'Start $205 & up'
      },
      {
        name: 'LOW LIGHTS (HALF HEAD)',
        price: '$85.50',
        originalPrice: '$95',
        cust: 'Half head low lights adding richness and deeper dimension.',
        note: 'Start $95 & up'
      },
      {
        name: 'FULL HEAD LOW LIGHTS',
        price: '$139.50',
        originalPrice: '$155',
        cust: 'Full head low lights creating deep contrast and gorgeous multi-tonal body.',
        note: 'Start $155 & up'
      }
    ]
  },
  {
    id: 'treatments',
    title: 'Treatments',
    icon: '/icons/cat-treatments.png',
    bookingUrl: 'https://www.ardonabeautysalon.com/booking-calendar/deep-condicioner',
    services: [
      {
        name: 'DEEP CONDITIONER (BOND REPAIR)',
        price: '$36.00',
        originalPrice: '$40',
        cust: 'Cross-links disulphide bonds in hair broken down by straightening, bleaching, or coloring.',
        note: 'Your hair is left resilient, stronger, and not fragile.'
      },
      {
        name: 'INFUSION HAIR TREATMENT',
        price: '$67.50',
        originalPrice: '$75',
        cust: 'Deep penetrating restorative therapy for dry, stressed hair.',
        note: 'Start $75 & up'
      },
      {
        name: 'MILBON JAPANESE TREATMENT',
        price: '$49.50',
        originalPrice: '$55',
        cust: 'Japanese professional smoothing & intensive moisture repairing system.',
        note: 'Restores weightless silkiness and healthy cuticle alignment.'
      }
    ]
  },
  {
    id: 'corrections',
    title: 'Corrections',
    icon: '/icons/cat-corrections.png',
    bookingUrl: 'https://www.ardonabeautysalon.com/booking-calendar/color-correction',
    services: [
      {
        name: 'COLOR CORRECTION',
        price: '$235 - $450',
        originalPrice: '$235 - $450',
        cust: 'Fixing or transforming previously colored, banded, or uneven hair.',
        note: 'Prices & details confirmed during preliminary in-salon consultation.'
      }
    ]
  },
  {
    id: 'styling',
    title: 'Styling',
    icon: '/icons/cat-styling.png',
    bookingUrl: 'https://www.ardonabeautysalon.com/booking-calendar/blow-out',
    services: [
      {
        name: 'BLOW OUT',
        price: '$40.50',
        originalPrice: '$45',
        cust: 'Includes refreshing wash and polished, voluminous signature blowout.',
        note: 'Start $40 & up | Hot tools available as add-on'
      },
      {
        name: 'UPDO’S',
        price: '$67.50',
        originalPrice: '$75',
        cust: 'Artisan styling for events, galas, red-carpet, and special occasions.',
        note: 'Special event styling'
      },
      {
        name: 'HOT TOOLS ADD-ON',
        price: '$9.00',
        originalPrice: '$10',
        cust: 'Curling iron waves or flat iron sleek finish add-on.',
        note: 'Start $10 & up'
      }
    ]
  },
  {
    id: 'packages',
    title: 'Packages',
    icon: '/icons/cat-packages.png',
    bookingUrl: 'https://www.ardonabeautysalon.com/booking-calendar/keratin-treatment',
    services: [
      {
        name: 'KERATIN TREATMENT PACKAGE',
        price: '$288.00',
        originalPrice: '$320',
        cust: 'Removes 100% frizz and 90% curl for up to 4 months.',
        note: 'Start $290 & up | Silky smooth finish'
      },
      {
        name: 'BRAZILIAN BLOWOUT PACKAGE',
        price: '$315.00',
        originalPrice: '$350',
        cust: 'Creates protective protein layer eliminating frizz for 12 weeks.',
        note: 'Start $320 & up | Improves overall condition of hair'
      }
    ]
  },
  {
    id: 'extensions',
    title: 'Extensions',
    icon: '/icons/cat-extensions.png',
    bookingUrl: 'https://www.ardonabeautysalon.com/booking-calendar/extensions',
    services: [
      {
        name: 'EXTENSIONS (TAPE-IN & MICRO-BEAD)',
        price: 'Consultation',
        originalPrice: 'Based on Consult',
        cust: 'Small sections of hair pulled through micro-bead (Tip) and seamless Tape-In extensions.',
        note: 'Custom color matching, blend haircut, and styling discussed at consult.'
      }
    ]
  },
  {
    id: 'housecalls',
    title: 'House Calls/HOTELS',
    icon: '/icons/cat-housecalls.png',
    bookingUrl: 'https://www.ardonabeautysalon.com/book-online',
    services: [
      {
        name: 'IN-HOTEL & PRIVATE RESIDENCE HAIR STYLING',
        price: 'Upon Request',
        originalPrice: 'Upon Request',
        cust: 'Private on-location styling across Manhattan and Upper West Side.',
        note: 'Please contact the salon directly to schedule private location visits.'
      }
    ]
  },
  {
    id: 'single-color',
    title: 'Single color',
    icon: '/icons/cat-single-color.png',
    bookingUrl: 'https://www.ardonabeautysalon.com/booking-calendar/single-process-roots-only',
    services: [
      {
        name: 'SINGLE PROCESS (ROOTS ONLY)',
        price: '$85.50',
        originalPrice: '$95',
        cust: 'For grey coverage and/or smudging of roots.',
        note: 'Please book a haircut or blowout separately following color.'
      },
      {
        name: 'SINGLE PROCESS (FULL HEAD)',
        price: '$130.50',
        originalPrice: '$145',
        cust: 'Full head root-to-end one process color application.',
        note: 'Start $145 & up'
      },
      {
        name: 'SINGLE PROCESS INOA (NO AMMONIA)',
        price: '$99.00',
        originalPrice: '$110',
        cust: 'Ammonia free permanent color new growth touch-up. Great for grey coverage.',
        note: 'Start $95 & up | Odorless, gentle on scalp'
      }
    ]
  },
  {
    id: 'makeup-bridal',
    title: 'Makeup / Bridal',
    icon: '/icons/cat-packages.png',
    bookingUrl: 'https://www.ardonabeautysalon.com/booking-calendar/make-up',
    services: [
      {
        name: 'MAKE UP APPLICATION',
        price: '$85.50',
        originalPrice: '$95',
        cust: 'Full-face professional makeup application for galas, events, and photos.',
        note: 'Custom beauty design'
      },
      {
        name: 'BRIDAL & SPECIAL EVENT HAIR',
        price: '$67.50 - $95.00',
        originalPrice: '$75 - $110',
        cust: 'Consultations, trials, and day-of styling for bridal parties.',
        note: 'Group inquiries welcome'
      }
    ]
  }
];

export const ServicesMenu: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const toggleCategory = (id: string) => {
    setActiveCategory(activeCategory === id ? null : id);
  };

  return (
    <section id="services" className="section-services">
      <div className="container">
        <div className="heading">
          <h2>Our Services</h2>
        </div>

        <div className="services-flex" id="fullTeam">
          {CATEGORIES.map((cat) => {
            const isOpen = activeCategory === cat.id;

            return (
              <div key={cat.id} className="item">
                <div
                  className={`according ${isOpen ? 'active' : ''}`}
                  onClick={() => toggleCategory(cat.id)}
                >
                  <h3>
                    <img
                      alt=""
                      className="attachment-post-thumbnail size-post-thumbnail wp-post-image"
                      decoding="async"
                      height="30"
                      src={cat.icon}
                      width="30"
                    />
                    {cat.title}
                  </h3>
                  <div className="toggle-button">
                    <img alt="plus" src="/icons/plus-icon.svg" />
                    <img alt="minus" src="/icons/minus-icon.svg" />
                  </div>
                </div>

                <div
                  className="accordion__content"
                  style={{ display: isOpen ? 'block' : 'none' }}
                >
                  {cat.services.map((s, idx) => (
                    <div key={idx}>
                      <div className="flex-sub-post">
                        <span>{s.name}</span>
                        <span className="prices">
                          {s.originalPrice && s.originalPrice !== s.price && (
                            <span className="prices line">{s.originalPrice}</span>
                          )}
                          {s.price}
                        </span>
                      </div>
                      <span className="cust">{s.cust}</span>
                      {s.note && <p>*{s.note}</p>}
                    </div>
                  ))}

                  <a href={cat.bookingUrl} target="_blank" rel="noopener noreferrer">
                    Book now
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
