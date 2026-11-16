import React, { useState } from 'react';

const FAQS = [
  {
    q: 'What hair cutting services do you offer?',
    a: 'At Ardona Beauty Salon NYC, we provide a variety of cutting services to suit every style and preference, including women’s wash and cuts, cut and blowdry, barber and clipper cuts, girls and boys haircuts, and custom shaping tailored to your facial structure.'
  },
  {
    q: 'Can you explain the different coloring services you provide?',
    a: 'We specialize in several master coloring techniques: Single Process for grey coverage and rich root-to-end tone, Balayage and Ombre for a natural sun-kissed look, Highlights and Babylights to enhance dimensional texture, Double Process for blonde lifting, and Ammonia-Free INOA color. We also offer color corrections for fixing or changing previously colored hair.'
  },
  {
    q: 'What should I expect during my first visit for a color treatment?',
    a: 'During your first appointment, you’ll have a personalized consultation to discuss your desired shade, assess your hair’s texture and integrity, and establish a plan. Please note blowouts are not included in color services, so we kindly ask you to book a blowout or haircut to finish your visit.'
  },
  {
    q: 'How do I know which hair treatment is right for me?',
    a: 'Our stylists will evaluate your hair’s moisture, elasticity, and porosity. We offer bond-repair Deep Conditioning treatments for color-treated hair, nutrient Infusion therapy, and Japanese Milbon treatments for weightless silkiness.'
  },
  {
    q: 'What are the benefits of professional hair glossing?',
    a: 'Hair glossing revitalizes your hair by enhancing color vibrancy, imparting brilliant mirror shine, and sealing cuticle scales for improved manageability. It is perfect between color services to refresh blonde or brunette tones.'
  },
  {
    q: 'Do you offer hair extension services? What types are available?',
    a: 'Yes, we offer premium hair extensions including seamless Tape-In and micro-bead Tip extensions. Our specialists customize placement, length, and shade matching during an initial consultation.'
  },
  {
    q: 'How should I prepare my hair for styling or updo services?',
    a: 'For optimal results, please arrive with clean, dry hair. Avoid applying heavy oils or leave-in serums on the morning of your appointment so your style or updo holds maximum body and longevity.'
  },
  {
    q: 'What packages do you offer for weddings or special events?',
    a: 'We provide full bridal and red-carpet event styling, including trial consultations, glamorous updos, blowouts, and full-face professional makeup application.'
  },
  {
    q: 'Can I book a same-day appointment online?',
    a: 'Same-day appointments can be booked directly online based on stylist availability. We recommend booking in advance, but you can always check our 24/7 online booking portal for same-day openings or call us at (718) 433-9837.'
  },
  {
    q: 'What policies do you have in place for hair service corrections?',
    a: 'Your complete satisfaction is our priority. If you need any adjustments to your cut or color, please contact us within one week of your service and we will gladly provide a complimentary correction.'
  }
];

export const FAQSection: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section id="faq" className="section-asked">
      <div className="container">
        <div className="asked">
          <div className="heading">
            <h2>Frequently Asked Questions for Hair Salons NYC</h2>
          </div>

          <div className="accordion">
            {FAQS.map((faq, idx) => {
              const isActive = activeIndex === idx;

              return (
                <div key={idx} className="accordion__item">
                  <div
                    className={`accordion__title ${isActive ? 'active' : ''}`}
                    onClick={() => toggle(idx)}
                  >
                    <span className="accordion__title-text">{faq.q}</span>
                    <div className="toggle-button">
                      <img alt="" src="/icons/plus-icon.svg" />
                      <img alt="" src="/icons/minus-icon.svg" />
                    </div>
                  </div>

                  <div
                    className="accordion__content_faq"
                    style={{ display: isActive ? 'block' : 'none' }}
                  >
                    <p>
                      <span style={{ fontWeight: 400 }}>{faq.a}</span>
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
