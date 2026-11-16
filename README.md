# Ardona Beauty Salon — Website

A responsive, modern website for **Ardona Beauty Salon** (Upper West Side, NYC), built with React, TypeScript, and Vite, styled with custom luxury aesthetic matching NYC high-end salon standards.

---

## Features

- **Header & Navigation:**
  - Business hours (`10AM - 8PM`), salon address (`2578 Broadway, New York, NY 10025`), social links.
  - Responsive mobile drawer navigation with animated burger toggle.
  - Bordered "Book now" action button.
- **Hero Banner & Virtual Consultation:**
  - High-resolution storefront banner with bold typography and direct appointment booking CTA.
  - Dedicated virtual consultation strip.
- **About Section:**
  - Asymmetric luxury layout with reception interior imagery and brand styling.
- **Expandable Services Menu:**
  - 12 comprehensive categories (`CUTS`, `Balayage/Highlights`, `Glossing`, `Double Process`, `Treatments`, `Corrections`, `Styling`, `Packages`, `Extensions`, `House Calls/HOTELS`, `Single color`, `Makeup / Bridal`).
  - Expandable accordions with pricing, fall specials, durations, and direct booking links for every service.
- **Horizontal Reviews Carousel:**
  - Drag-to-scroll and touch-swipe horizontal carousel.
  - Next and previous navigation arrows with dynamic pagination indicator pills.
  - 5-star Google rating summary with direct Google review link.
- **Frequently Asked Questions (FAQ):**
  - Interactive accordion for hair care, preparation, and salon policy questions.
- **Footer & Mobile Sticky Bar:**
  - 3-column footer with salon information, copyright, and location.
  - Sticky mobile call/booking bar on small screens (`<= 776px`).

---

## Tech Stack

- **Framework:** React 18
- **Language:** TypeScript
- **Bundler:** Vite
- **Styling:** Custom CSS with Montserrat typography

---

## Getting Started

### Prerequisites

- Node.js (v18+)
- npm

### Installation

```bash
# Clone the repository
git clone https://github.com/growlimomiraj/ardona-beauty-salon.git

# Navigate to project directory
cd ardona-beauty-salon

# Install dependencies
npm install
```

### Development

```bash
npm run dev
```

### Production Build

```bash
npm run build
npm run preview
```

### Automated Tests

```bash
node scripts/test_links.js
node scripts/test_reviews_carousel.js
```

---

## License

All rights reserved © 2024 Ardona Beauty Salon.
