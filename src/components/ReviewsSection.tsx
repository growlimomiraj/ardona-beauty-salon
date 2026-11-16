import React, { useState, useRef, useEffect, useCallback } from 'react';

interface Review {
  name: string;
  date: string;
  comment: string;
  service: string;
}

export const ReviewsSection: React.FC = () => {
  const reviews: Review[] = [
    {
      name: "Elena R.",
      date: "Nov 02, 2024",
      service: "Full Balayage & Cut",
      comment: "Ardona Beauty Salon is an absolute gem on Broadway! I came in for a full balayage and haircut. The attention to detail and color blending was perfection. The salon has such an upscale, welcoming atmosphere. I’ve found my forever salon in NYC!"
    },
    {
      name: "Jessica M.",
      date: "Oct 28, 2024",
      service: "Brazilian Blowout",
      comment: "The Brazilian Blowout here completely transformed my frizzy hair into silky, sleek perfection! It saves me 40 minutes every morning. The staff is so warm, talented, and professional. 10/10 recommended!"
    },
    {
      name: "David K.",
      date: "Oct 19, 2024",
      service: "Barber Cut & Wash",
      comment: "Top-notch men's haircut. Precise scissor work, great wash, and really friendly service. It's hard to find a salon in Manhattan that gets every detail right, but Ardona nails it every time."
    },
    {
      name: "Sophia T.",
      date: "Oct 12, 2024",
      service: "Single Process & Treatment",
      comment: "I had single process color and a deep conditioning treatment done. My hair has never felt so soft or looked so shiny. The online booking is super easy and the location right near 97th is so convenient."
    },
    {
      name: "Rachel B.",
      date: "Oct 05, 2024",
      service: "Signature Blowout",
      comment: "Best salon experience on the Upper West Side! Got a wash, cut, and signature blowout. My stylist listened carefully to what I wanted and gave my hair gorgeous volume and bounce that lasted for days!"
    },
    {
      name: "Amanda G.",
      date: "Sep 27, 2024",
      service: "Highlights & Glaze",
      comment: "I was so nervous to get highlights after a bad experience elsewhere, but Ardona restored my faith. The blonde is vibrant, natural, and without any brassiness. Outstanding master coloring experts!"
    },
    {
      name: "Michael P.",
      date: "Sep 18, 2024",
      service: "Men's Styling",
      comment: "Clean, modern, and very professional salon. Got a quick fade and beard trim before an event. Excellent service, punctual timing, and fair Manhattan pricing. Highly recommend!"
    },
    {
      name: "Olivia N.",
      date: "Sep 10, 2024",
      service: "Bridal Styling",
      comment: "Booked bridal hair styling and makeup for my sister's wedding party. They accommodated all four of us effortlessly. Everyone looked stunning in the photos. Thank you Ardona!"
    }
  ];

  const trackRef = useRef<HTMLDivElement>(null);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [maxPages, setMaxPages] = useState<number>(1);
  const [canScrollLeft, setCanScrollLeft] = useState<boolean>(false);
  const [canScrollRight, setCanScrollRight] = useState<boolean>(true);

  // Mouse drag-to-scroll state
  const isMouseDownRef = useRef(false);
  const startXRef = useRef(0);
  const scrollLeftRef = useRef(0);
  const [isDragging, setIsDragging] = useState(false);

  const updateScrollState = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;

    const scrollLeft = el.scrollLeft;
    const maxScroll = el.scrollWidth - el.clientWidth;

    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft < maxScroll - 10);

    // Calculate current page (each page = clientWidth)
    if (el.clientWidth > 0) {
      const pageCount = Math.max(1, Math.ceil(el.scrollWidth / el.clientWidth));
      setMaxPages(pageCount);
      const activeIdx = Math.min(pageCount - 1, Math.round(scrollLeft / el.clientWidth));
      setCurrentPage(activeIdx);
    }
  }, []);

  useEffect(() => {
    updateScrollState();
    const handleResize = () => updateScrollState();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [updateScrollState]);

  const handleScroll = () => {
    updateScrollState();
  };

  const scrollByDirection = (direction: 'left' | 'right') => {
    const el = trackRef.current;
    if (!el) return;
    const scrollAmount = el.clientWidth * 0.75;
    el.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth'
    });
  };

  const scrollToPageIndex = (index: number) => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollTo({
      left: index * el.clientWidth,
      behavior: 'smooth'
    });
  };

  // Drag-to-scroll mouse handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    const el = trackRef.current;
    if (!el) return;
    isMouseDownRef.current = true;
    setIsDragging(true);
    startXRef.current = e.pageX - el.offsetLeft;
    scrollLeftRef.current = el.scrollLeft;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isMouseDownRef.current || !trackRef.current) return;
    e.preventDefault();
    const x = e.pageX - trackRef.current.offsetLeft;
    const walk = (x - startXRef.current) * 1.5; // Drag sensitivity
    trackRef.current.scrollLeft = scrollLeftRef.current - walk;
  };

  const handleMouseUpOrLeave = () => {
    isMouseDownRef.current = false;
    setIsDragging(false);
  };

  return (
    <section className="section-reviews section">
      <div className="container">
        <div className="heading">
          <h2>What people think About Us</h2>
        </div>

        <div className="reviews-widget-container">
          {/* Top widget bar */}
          <div className="reviews-widget-topbar">
            <div style={{ color: '#FFF', fontSize: '20px', fontWeight: 600 }}>
              What our clients say about us
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '24px', fontWeight: 700, color: '#FFF' }}>5.00</span>
                <span style={{ color: '#ffbc00', fontSize: '18px' }}>★★★★★</span>
              </div>
              <a
                href="https://www.google.com/maps/search/?api=1&query=Ardona+Beauty+Salon+2578+Broadway+New+York"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  background: '#1a73e8',
                  color: '#FFF',
                  padding: '8px 18px',
                  borderRadius: '4px',
                  fontSize: '13px',
                  fontWeight: 600,
                  display: 'inline-block'
                }}
              >
                Write a review
              </a>
            </div>
          </div>

          {/* Horizontal Scrolling Carousel Track */}
          <div className="reviews-carousel-wrapper">
            <div
              ref={trackRef}
              className={`reviews-carousel-track ${isDragging ? 'is-dragging' : ''}`}
              onScroll={handleScroll}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUpOrLeave}
              onMouseLeave={handleMouseUpOrLeave}
            >
              {reviews.map((r, idx) => (
                <div key={idx} className="reviews-card">
                  <div>
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: '10px'
                      }}
                    >
                      <span style={{ color: '#ffbc00', fontSize: '15px', letterSpacing: '2px' }}>
                        ★★★★★
                      </span>
                      <span style={{ color: '#888', fontSize: '12px' }}>{r.date}</span>
                    </div>

                    <p
                      style={{
                        color: '#E0E0E0',
                        fontSize: '13px',
                        lineHeight: '1.55',
                        margin: '0 0 15px 0'
                      }}
                    >
                      "{r.comment}"
                    </p>
                  </div>

                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      paddingTop: '12px',
                      borderTop: '1px solid rgba(255, 255, 255, 0.08)'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <div
                        style={{
                          width: '28px',
                          height: '28px',
                          borderRadius: '50%',
                          background: '#C59D5F',
                          color: '#000',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontWeight: 700,
                          fontSize: '11px'
                        }}
                      >
                        {r.name.charAt(0)}
                      </div>
                      <span style={{ color: '#FFF', fontSize: '13px', fontWeight: 600 }}>
                        {r.name}
                      </span>
                    </div>
                    <img src="/icons/google-icon.svg" alt="Google" width="16" height="16" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Pagination & Horizontal Scroll Controls */}
          <div className="reviews-pagination-controls">
            <button
              type="button"
              className="reviews-arrow-btn"
              aria-label="Previous reviews"
              onClick={() => scrollByDirection('left')}
              disabled={!canScrollLeft}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3.443 9.062C3.158 8.777 3 8.402 3 8.002c0-.403.158-.78.443-1.062L10.276.293c.395-.39 1.033-.39 1.428 0s.395 1.024 0 1.413L5.228 8.002l6.476 6.294c.395.39.395 1.024 0 1.415-.395.39-1.033.39-1.428-.002L3.443 9.063z"
                  fillRule="evenodd"
                />
              </svg>
            </button>

            <div className="reviews-pagination-dots">
              {Array.from({ length: maxPages }).map((_, pIdx) => (
                <button
                  key={pIdx}
                  type="button"
                  aria-label={`Go to slide ${pIdx + 1}`}
                  className={`reviews-pagination-dot ${currentPage === pIdx ? 'active' : ''}`}
                  onClick={() => scrollToPageIndex(pIdx)}
                />
              ))}
            </div>

            <button
              type="button"
              className="reviews-arrow-btn"
              aria-label="Next reviews"
              onClick={() => scrollByDirection('right')}
              disabled={!canScrollRight}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12.557 9.062c.285-.284.443-.66.443-1.06 0-.403-.158-.78-.443-1.062L5.724.293c-.395-.39-1.033-.39-1.428 0s-.395 1.024 0 1.413l6.476 6.295-6.476 6.294c-.395.39-.395 1.024 0 1.415.395.39 1.033.39 1.428-.002l6.833-6.646z"
                  fillRule="evenodd"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
