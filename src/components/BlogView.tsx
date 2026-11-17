import React from 'react';
import { useBookingCart } from '../context/BookingCartContext';

export const BlogView: React.FC = () => {
  const { openCart } = useBookingCart();
  const articles = [
    {
      id: 1,
      title: "Balayage vs. Highlights: What’s the Difference?",
      excerpt: "Discover which technique best complements your hair texture, lifestyle, and maintenance goals on Manhattan's Upper West Side.",
      date: "November 2024",
      readTime: "4 min read"
    },
    {
      id: 2,
      title: "Why Ammonia-Free INOA Color Is Better for Your Hair & Scalp",
      excerpt: "Learn how oil delivery system technology delivers rich, long-lasting grey coverage without odors or harsh scalp irritation.",
      date: "October 2024",
      readTime: "5 min read"
    },
    {
      id: 3,
      title: "Keratin Treatment vs. Brazilian Blowout: Which Is Right For You?",
      excerpt: "Everything you need to know about eliminating frizz, fighting NYC humidity, and restoring silky glass hair.",
      date: "September 2024",
      readTime: "6 min read"
    }
  ];

  return (
    <div className="blog-page-wrapper">
      <section className="section-banner page" style={{ backgroundImage: `url('/images/hero-banner.jpg')` }}>
        <div className="container">
          <h1 style={{ color: '#FFF', fontSize: '55px', fontWeight: 700, textTransform: 'uppercase', marginBottom: '20px' }}>
            Ardona Beauty Journal
          </h1>
          <p style={{ color: '#C59D5F', fontSize: '18px', letterSpacing: '1px', textTransform: 'uppercase' }}>
            Expert Hair Tips, Trend Guides & Salon Insights
          </p>
        </div>
      </section>

      <section style={{ padding: '80px 0 120px' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '30px' }}>
            {articles.map((post) => (
              <div
                key={post.id}
                style={{
                  background: 'linear-gradient(232deg, #2E2E2E 0%, #151515 106.7%)',
                  padding: '35px 30px',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between'
                }}
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', color: '#C59D5F', fontSize: '12px', fontWeight: 600, textTransform: 'uppercase', marginBottom: '16px' }}>
                    <span>{post.date}</span>
                    <span>{post.readTime}</span>
                  </div>
                  <h3 style={{ color: '#FFF', fontSize: '22px', fontWeight: 700, lineHeight: 1.3, marginBottom: '16px' }}>
                    {post.title}
                  </h3>
                  <p style={{ color: '#D2D2D2', fontSize: '15px', lineHeight: 1.6, marginBottom: '25px' }}>
                    {post.excerpt}
                  </p>
                </div>
                <button
                  type="button"
                  className="red-btn"
                  style={{
                    padding: '10px 18px',
                    fontSize: '12px',
                    borderRadius: '3px'
                  }}
                  onClick={() => openCart({
                    id: `blog-consult-${post.id}`,
                    name: `Consultation: ${post.title}`,
                    category: 'Consultation',
                    price: 0,
                    priceFormatted: 'Free',
                    duration: '20 min'
                  })}
                >
                  Book A Consultation →
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
