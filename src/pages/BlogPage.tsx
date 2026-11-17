import React, { useState } from 'react';
import { useBookingCart } from '../context/BookingCartContext';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  image: string;
  date: string;
  content: string[];
}

const BLOG_POSTS: BlogPost[] = [
  {
    id: 'professional-hair-styling-nyc',
    title: 'Professional Hair Styling for Special Occasions in NYC',
    excerpt: 'In the bustling metropolis of New York City, professional hair styling turns special events into unforgettable moments...',
    image: '/images/blog-1.jpg',
    date: 'July 15, 2024',
    content: [
      'In the bustling metropolis of New York City, professional hair styling is not just an indulgence—it is an art form. From gala evenings and weddings to fashion galas and corporate summits on Manhattan’s Upper West Side, your hairstyle defines your presence.',
      'At Ardona Beauty Salon, our master stylists tailor every silhouette to complement your facial structure, gown neckline, and unique aesthetic. Using premium European styling serums and heat-protective formulas, we ensure your look maintains voluminous bounce and all-day hold.',
      'Whether you desire romantic undone textured waves, sleek architectural chignons, or cascading Hollywood glamour curls, our team delivers magazine-editorial excellence right here at 2578 Broadway.'
    ]
  },
  {
    id: 'trendy-and-classic-haircuts-nyc',
    title: 'Trendy and Classic Haircuts in NYC',
    excerpt: 'New York City is a vibrant epicenter for fashion and hairstyling innovation, merging timeless elegance with avant-garde trends...',
    image: '/images/blog-2.jpg',
    date: 'July 10, 2024',
    content: [
      'New York City is a vibrant epicenter for fashion and hairstyling innovation. From the iconic Parisian bobs and 90s-inspired layered butterfly cuts to precision French shears work, your haircut should express your individuality.',
      'Our precision cutting philosophy at Ardona Beauty Salon focuses on customized consultation. We assess hair growth patterns, texture, and everyday routine to craft cuts that look extraordinary both straight out of the salon and after styling at home.',
      'Book a signature wash, precision haircut, and blowout session to discover how subtle architectural layering can revitalize your natural volume and frame your features.'
    ]
  },
  {
    id: 'expert-hair-coloring-services-nyc',
    title: 'Expert Hair Coloring Services in NYC',
    excerpt: 'With the ever-evolving trends in the beauty industry, hair coloring has transcended traditional dye techniques into custom dimensional art...',
    image: '/images/blog-3.jpg',
    date: 'July 5, 2024',
    content: [
      'With the ever-evolving trends in the beauty industry, hair coloring has transformed into nuanced color chemistry. Modern clients seek dimensional softness, seamless root transitions, and healthy, luminous shine.',
      'At Ardona Beauty Salon, our color master artists specialize in customized glosses, rich single process tones, double process platinums, and multidimensional balayage highlights.',
      'We utilize bond-protecting Olaplex and Kérastase formulations to safeguard your hair integrity during every lifting process, leaving your hair remarkably soft, vibrant, and resilient.'
    ]
  },
  {
    id: 'advanced-scalp-treatments-healthy-hair-growth-nyc',
    title: 'Advanced Scalp Treatments for Healthy Hair Growth in NYC',
    excerpt: 'In recent years, the demand for advanced scalp treatments to promote healthy hair growth and combat urban environmental stress has surged...',
    image: '/images/blog-4.jpg',
    date: 'June 28, 2024',
    content: [
      'Healthy, radiant hair begins at the root. In New York City’s bustling climate, urban pollutants, hard water buildup, and styling residue can congest scalp follicles and inhibit optimal growth.',
      'Our targeted scalp detoxification and nourishment rituals deep-cleanse micro-impurities, stimulate micro-circulation, and rebalance your scalp barrier with therapeutic botanicals and peptide infusions.',
      'Experience our relaxing scalp therapy accompanied by soothing acupressure massage for revitalized follicle health and enhanced natural volume.'
    ]
  },
  {
    id: 'discover-the-best-balayage',
    title: 'Discover the Best Balayage in NYC: Leading Salons',
    excerpt: 'Balayage has become a sought-after hair coloring technique, known for its natural sun-kissed gradation and effortless maintenance...',
    image: '/images/blog-5.jpg',
    date: 'June 20, 2024',
    content: [
      'Balayage has become one of the most requested hair coloring techniques in Manhattan. Unlike traditional foil highlights that grow out with harsh demarcations, freehand hand-painted balayage creates soft, diffused ribbons of light.',
      'At Ardona Beauty Salon, we customize each stroke to accentuate your hair’s natural movement. Whether you want subtle caramel ribbons on dark brunette hair or sunlit honey-blonde strands, our technique ensures a seamless grow-out that lasts 3 to 5 months.',
      'Schedule a personalized color consultation to design a bespoke balayage palette tailored to your skin tone and lifestyle.'
    ]
  },
  {
    id: 'expert-tips-for-the-best-balayage',
    title: 'Expert Tips for the Best Balayage in NYC',
    excerpt: 'Balayage has become one of the most sought-after hair coloring arts in modern salons. Learn how our colorists preserve vibrant blonde tones...',
    image: '/images/blog-6.jpg',
    date: 'June 14, 2024',
    content: [
      'Maintaining luminous balayage between salon visits requires the right aftercare routine. NYC tap water and summer sun exposure can oxidize delicate toner pigments.',
      'Our top colorists recommend incorporating sulfate-free color-preserving cleansers, weekly deep hydrating moisture masks, and purple/violet toners to counteract brassiness.',
      'Regular 6-to-8-week gloss refreshes at Ardona Beauty Salon ensure your blonde stays crisp, conditioned, and mirror-shiny.'
    ]
  },
  {
    id: 'best-balayage-nyc',
    title: 'Best Balayage NYC: Top Techniques for Stunning Hair',
    excerpt: 'Balayage has become a highly sought-after hair coloring technique in New York salons, requiring precision artistry and tone mastery...',
    image: '/images/blog-7.jpg',
    date: 'June 8, 2024',
    content: [
      'From traditional French freehand painting to AirTouch diffusion and hybrid foilayage, modern balayage encompasses diverse methods.',
      'At Ardona Beauty Salon, we combine hairline money-piece highlights with soft root shadows, giving you high-impact brightness around your face while maintaining depth at the roots.',
      'Our stylists evaluate your natural base level, previous color treatments, and desired maintenance schedule to select the exact painting method for optimal results.'
    ]
  },
  {
    id: 'top-trends-salon',
    title: 'Top Trends at Our Hair Salon on the Upper West Side',
    excerpt: 'The world of hair styling and coloring constantly evolves, reflecting runway trends and Manhattan street fashion...',
    image: '/images/blog-8.jpg',
    date: 'May 30, 2024',
    content: [
      'The Upper West Side is renowned for its sophisticated, effortless chic. This season, our clients are embracing warm honey tones, glossy Italian bobs, and silky Brazilian Blowout smoothing treatments.',
      'Smoothing treatments reduce morning blow-dry time by over 50% while eliminating stubborn humidity frizz—ideal for busy Manhattan professionals and active lifestyles.',
      'Stop by our Broadway studio to consult with our master stylists on the latest seasonal cuts, dimensional colors, and smoothing treatments.'
    ]
  },
  {
    id: 'why-ardona-salon-nyc',
    title: 'Why Ardona Beauty Salon is the Best Hair Salon in NYC',
    excerpt: 'The hair salon industry in New York City is vibrant and competitive. Discover what sets our Upper West Side salon apart...',
    image: '/images/blog-9.jpg',
    date: 'May 22, 2024',
    content: [
      'Finding your go-to hair salon in New York City is a deeply personal journey. At Ardona Beauty Salon, we combine world-class technique with warm, attentive hospitality.',
      'Our clients consistently highlight our welcoming atmosphere, transparent pricing, immaculate hygiene, and genuine care for hair health.',
      'With over a decade of industry expertise, verified 5-star customer reviews, and convenient online booking, we invite you to experience the premier Upper West Side salon experience.'
    ]
  }
];

export const BlogPage: React.FC = () => {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const { openCart } = useBookingCart();

  return (
    <div className="blog-page-view">
      <div className="container full">
        <section
          className="section-banner page"
          style={{ backgroundImage: `url('/images/blog-banner.jpg')` }}
        >
          <h1>Blog</h1>
          <div className="appointment">
            <button
              type="button"
              className="appointment-btn red-btn"
              onClick={() => openCart()}
            >
              Book an Appointment
            </button>
          </div>
        </section>
      </div>

      <div className="container position-ab">
        <p id="breadcrumbs">
          <span>
            <span>
              <a href="#home">Home</a>
            </span>{' '}
            » <span className="breadcrumb_last" aria-current="page">Blog</span>
          </span>
        </p>
      </div>

      <section className="section-blog section">
        <div className="container">
          <div className="row">
            {BLOG_POSTS.map((post) => (
              <div key={post.id} className="col-lg-4 col-md-6 col-12">
                <div
                  className="item"
                  onClick={() => setSelectedPost(post)}
                  style={{ cursor: 'pointer' }}
                >
                  <div className="img-blog">
                    <img
                      src={post.image}
                      alt={post.title}
                      loading="lazy"
                    />
                  </div>
                  <h2>{post.title}</h2>
                  <p>{post.excerpt}</p>
                  <button
                    type="button"
                    className="read-more-btn red-btn"
                    style={{
                      padding: '10px 22px',
                      fontSize: '13px'
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedPost(post);
                    }}
                  >
                    Read more →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Single Post Modal / Reader */}
      {selectedPost && (
        <div
          className="blog-modal-backdrop"
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.85)',
            zIndex: 99999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px'
          }}
          onClick={() => setSelectedPost(null)}
        >
          <div
            className="blog-modal-content"
            style={{
              backgroundColor: '#111111',
              color: '#FFFFFF',
              maxWidth: '800px',
              width: '100%',
              maxHeight: '90vh',
              overflowY: 'auto',
              borderRadius: '8px',
              padding: '40px',
              border: '1px solid #333',
              position: 'relative'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setSelectedPost(null)}
              style={{
                position: 'absolute',
                top: '20px',
                right: '25px',
                background: 'none',
                border: 'none',
                color: '#FFF',
                fontSize: '32px',
                cursor: 'pointer'
              }}
              aria-label="Close"
            >
              &times;
            </button>

            <img
              src={selectedPost.image}
              alt={selectedPost.title}
              style={{ width: '100%', height: '360px', objectFit: 'cover', borderRadius: '4px', marginBottom: '25px' }}
            />

            <span style={{ color: '#C59D5F', fontFamily: 'Montserrat-Bold', fontSize: '14px', textTransform: 'uppercase' }}>
              {selectedPost.date} • Ardona Salon Blog
            </span>

            <h2 style={{ color: '#FFF', fontSize: '32px', fontFamily: 'Montserrat-Bold', margin: '15px 0 25px 0', lineHeight: 1.3 }}>
              {selectedPost.title}
            </h2>

            {selectedPost.content.map((p, i) => (
              <p key={i} style={{ color: '#E0E0E0', fontSize: '17px', lineHeight: 1.8, marginBottom: '20px' }}>
                {p}
              </p>
            ))}

            <div style={{ marginTop: '35px', paddingTop: '25px', borderTop: '1px solid #282828', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '15px' }}>
              <div className="appointment">
                <button
                  type="button"
                  className="appointment-btn red-btn"
                  onClick={() => openCart()}
                >
                  Book an Appointment
                </button>
              </div>
              <button
                type="button"
                onClick={() => setSelectedPost(null)}
                style={{
                  background: 'transparent',
                  border: '1px solid #C59D5F',
                  color: '#C59D5F',
                  padding: '12px 24px',
                  fontFamily: 'Montserrat-Bold',
                  fontSize: '14px',
                  textTransform: 'uppercase',
                  cursor: 'pointer'
                }}
              >
                Close Article
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
