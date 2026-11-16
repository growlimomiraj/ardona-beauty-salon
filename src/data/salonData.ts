export interface ServiceItem {
  id: string;
  name: string;
  description: string;
  duration: string;
  price: string;
  originalPrice?: string;
  note?: string;
  bookingUrl: string;
}

export interface ServiceCategory {
  id: string;
  name: string;
  icon: string; // icon name or path
  description?: string;
  services: ServiceItem[];
}

export interface SalonInfo {
  name: string;
  tagline: string;
  heroHeadline: string;
  heroSubheadline: string;
  phone: string;
  phoneRaw: string;
  email: string;
  address: {
    street: string;
    city: string;
    state: string;
    zip: string;
    neighborhood: string;
    full: string;
  };
  hours: {
    day: string;
    hours: string;
  }[];
  hoursSummary: string;
  instagramUrl: string;
  facebookUrl: string;
  bookingUrl: string;
  aboutText: string[];
}

export const SALON_INFO: SalonInfo = {
  name: "Ardona Beauty Salon",
  tagline: "Premier Hair Salon on Manhattan's Upper West Side",
  heroHeadline: "Ardona Beauty Salon - Premier Hair Salon in NYC",
  heroSubheadline: "Experience luxury styling, bespoke coloring, and expert hair care tailored to you.",
  phone: "(718) 433-9837",
  phoneRaw: "+17184339837",
  email: "ardonabeautysalon@gmail.com",
  address: {
    street: "2578 Broadway",
    city: "New York",
    state: "NY",
    zip: "10025",
    neighborhood: "Upper West Side (Broadway & 97th St)",
    full: "2578 Broadway, New York, NY 10025"
  },
  hours: [
    { day: "Monday", hours: "9:30 AM - 7:30 PM" },
    { day: "Tuesday", hours: "10:00 AM - 7:00 PM" },
    { day: "Wednesday", hours: "10:00 AM - 7:00 PM" },
    { day: "Thursday", hours: "10:00 AM - 7:00 PM" },
    { day: "Friday", hours: "10:00 AM - 7:00 PM" },
    { day: "Saturday", hours: "10:00 AM - 7:00 PM" },
    { day: "Sunday", hours: "10:00 AM - 6:00 PM" }
  ],
  hoursSummary: "Mon 9:30 AM - 7:30 PM | Tue-Sat 10:00 AM - 7:00 PM | Sun 10:00 AM - 6:00 PM",
  instagramUrl: "https://www.instagram.com/ardona11/",
  facebookUrl: "https://www.facebook.com/",
  bookingUrl: "https://www.ardonabeautysalon.com/book-online",
  aboutText: [
    "Welcome to Ardona Beauty Salon, where your hair meets the art of styling. Proudly providing high-quality products and services to the Upper West Side of New York City.",
    "What differentiates us is our ability to truly connect with our clients and deliver exceptional, compassionate care that exceeds expectations.",
    "Our commitment to premium products, artistic hair techniques, and personalized customer care keeps our community coming back time and again. Discover your next hair transformation with us today!"
  ]
};

export const SERVICE_CATEGORIES: ServiceCategory[] = [
  {
    id: "cut-and-style",
    name: "CUT & STYLE",
    icon: "/icons/scissors.png",
    description: "Precision cuts, blowouts, and artisan styling designed to elevate your personal style.",
    services: [
      {
        id: "women-wash-cut-blowdry",
        name: "Wash Cut Blow Dry Women",
        description: "Includes professional hair wash, customized haircut, and signature voluminous blow dry.",
        duration: "45 min",
        price: "$85.50",
        originalPrice: "$95",
        note: "Price depends on length and texture of hair (Start $95 & up).",
        bookingUrl: "https://www.ardonabeautysalon.com/booking-calendar/wash-cut-blow-dry-women-1"
      },
      {
        id: "women-wash-cut",
        name: "Women Wash & Cut",
        description: "Revitalizing shampoo, conditioning wash, and precision tailored haircut.",
        duration: "45 min",
        price: "$67.50",
        originalPrice: "$75",
        note: "Included wash (Start $65 & up).",
        bookingUrl: "https://www.ardonabeautysalon.com/booking-calendar/women-wash-cut"
      },
      {
        id: "mens-haircut",
        name: "Men's Haircut",
        description: "Classic or modern men's cut with clippers, scissor-over-comb, and refreshing wash.",
        duration: "20 min",
        price: "$40.50",
        originalPrice: "$45",
        note: "Includes a wash.",
        bookingUrl: "https://www.ardonabeautysalon.com/booking-calendar/men-s-haircut"
      },
      {
        id: "wash-cut-girls",
        name: "Wash & Cut Girls",
        description: "Gentle wash and tailored haircut for young ladies.",
        duration: "45 min",
        price: "$45.00",
        originalPrice: "$50",
        note: "Start $50 & up.",
        bookingUrl: "https://www.ardonabeautysalon.com/booking-calendar/wash-cut-girls"
      },
      {
        id: "wash-cut-boys",
        name: "Wash & Cut Boys",
        description: "Clean, styled children's haircut with wash.",
        duration: "30 min",
        price: "$31.50",
        originalPrice: "$35",
        note: "Start $30 & up.",
        bookingUrl: "https://www.ardonabeautysalon.com/booking-calendar/wash-cut-boys"
      },
      {
        id: "blow-out",
        name: "Blow Out",
        description: "Signature wash and blowout for bouncy, long-lasting silkiness and body.",
        duration: "25 min",
        price: "$40.50",
        originalPrice: "$45",
        note: "Includes a wash. Hot tools styling available as add-on.",
        bookingUrl: "https://www.ardonabeautysalon.com/booking-calendar/blow-out"
      },
      {
        id: "updos",
        name: "Updo's",
        description: "Glamorous updos, bridal hair, chignons, and red-carpet event styling.",
        duration: "1 hr",
        price: "$67.50",
        originalPrice: "$75",
        note: "Special occasion & event styling.",
        bookingUrl: "https://www.ardonabeautysalon.com/booking-calendar/updo-s"
      },
      {
        id: "hot-tools",
        name: "Hot Tools",
        description: "Curling iron curls, beach waves, or sleek flat iron finish add-on.",
        duration: "15 min",
        price: "$9.00",
        originalPrice: "$10",
        note: "Start $10 & up.",
        bookingUrl: "https://www.ardonabeautysalon.com/booking-calendar/hot-tools"
      }
    ]
  },
  {
    id: "color",
    name: "COLOR & HIGHLIGHTS",
    icon: "/icons/scissors.png",
    description: "Master color formulations, multi-dimensional balayage, foils, and rich single process tones.",
    services: [
      {
        id: "single-process-roots",
        name: "Single Process (Roots Only)",
        description: "Precision root application for seamless grey coverage and root smudging.",
        duration: "45 min",
        price: "$85.50",
        originalPrice: "$95",
        note: "Please book a haircut or blowout following your color service.",
        bookingUrl: "https://www.ardonabeautysalon.com/booking-calendar/single-process-roots-only"
      },
      {
        id: "single-process-full",
        name: "Single Process (Full Head)",
        description: "All-over single process hair color from roots to ends for rich, uniform vibrancy.",
        duration: "1 hr",
        price: "$130.50",
        originalPrice: "$145",
        note: "Full head coverage (Start $145 & up).",
        bookingUrl: "https://www.ardonabeautysalon.com/booking-calendar/single-process-full-head"
      },
      {
        id: "single-process-inoa",
        name: "Single Process INOA (Ammonia-Free)",
        description: "L'Oréal INOA luxury ammonia-free permanent color. Odorless, gentle on scalp, pristine shine.",
        duration: "1 hr",
        price: "$99.00",
        originalPrice: "$110",
        note: "New growth touch up. Start $95 & up.",
        bookingUrl: "https://www.ardonabeautysalon.com/booking-calendar/single-process-inoa"
      },
      {
        id: "double-process",
        name: "Double Process",
        description: "Complete lightening followed by custom toner deposit for platinum, pastel, or creative shades.",
        duration: "1 hr 25 min",
        price: "$184.50",
        originalPrice: "$205",
        note: "Color lifted and desired tone deposited. Start $205 & up.",
        bookingUrl: "https://www.ardonabeautysalon.com/booking-calendar/double-process"
      },
      {
        id: "highlights-half-head",
        name: "Highlights Half Head",
        description: "Dimensional foil placement focusing on the front framing sections and crown.",
        duration: "1 hr 30 min",
        price: "$211.50",
        originalPrice: "$235",
        note: "Two front panels and top of head. Start $195 & up.",
        bookingUrl: "https://www.ardonabeautysalon.com/booking-calendar/highlights-half-head"
      },
      {
        id: "highlights-full-head",
        name: "Highlights Full Head",
        description: "Comprehensive all-over foiling for maximum luminosity and seamless dimensional blend.",
        duration: "2 hr 30 min",
        price: "$247.50",
        originalPrice: "$275",
        note: "Full head application. Range $255 & up. Free touch-up adjustments within 1 week.",
        bookingUrl: "https://www.ardonabeautysalon.com/booking-calendar/highlights-full-head"
      },
      {
        id: "partial-highlights",
        name: "Partial Highlights",
        description: "Targeted foil highlights placed around the parting and hairline for natural brightness.",
        duration: "1 hr 30 min",
        price: "$148.50",
        originalPrice: "$165",
        note: "Start $165 & up.",
        bookingUrl: "https://www.ardonabeautysalon.com/booking-calendar/partial-highlights"
      },
      {
        id: "balayage-ombre",
        name: "Balayage / Ombre",
        description: "Hand-painted bespoke balayage technique creating graduated, effortless sun-kissed dimension.",
        duration: "2 hr 30 min",
        price: "$288.00",
        originalPrice: "$320",
        note: "Artistic freehand painting. Start $295 & up. Free adjustment within 1 week.",
        bookingUrl: "https://www.ardonabeautysalon.com/booking-calendar/balayage-ombre"
      },
      {
        id: "babylights",
        name: "Babylights",
        description: "Ultra-fine micro-weaving technique for delicate, natural brightness with subtle grow-out.",
        duration: "3 hr",
        price: "$265.50",
        originalPrice: "$295",
        note: "Finer sections than traditional highlights for seamless radiance.",
        bookingUrl: "https://www.ardonabeautysalon.com/booking-calendar/babylights"
      },
      {
        id: "low-lights",
        name: "Low Lights",
        description: "Half head deeper tones woven in to restore depth, shadow, and rich dimension.",
        duration: "1 hr",
        price: "$85.50",
        originalPrice: "$95",
        note: "Half head low lights technique.",
        bookingUrl: "https://www.ardonabeautysalon.com/booking-calendar/low-lights-1"
      },
      {
        id: "full-head-low-lights",
        name: "Full Head Low Lights",
        description: "All-over rich low lights creating deep contrast and gorgeous multi-tonal body.",
        duration: "1 hr 30 min",
        price: "$139.50",
        originalPrice: "$155",
        note: "Full head depth placement.",
        bookingUrl: "https://www.ardonabeautysalon.com/booking-calendar/full-head-low-lights-1"
      },
      {
        id: "color-gloss",
        name: "Color Gloss",
        description: "Gentle ammonia-free semi-permanent formula adding luminous high-gloss shine and tone refresh.",
        duration: "30 min",
        price: "$76.50",
        originalPrice: "$85",
        note: "Adds clear or tonal shine to treated hair. Please book a blowout or haircut separately.",
        bookingUrl: "https://www.ardonabeautysalon.com/booking-calendar/color-gloss"
      },
      {
        id: "color-correction",
        name: "Color Correction",
        description: "Expert restoration and correction for uneven tones, banding, brassiness, or color changes.",
        duration: "1 hr+",
        price: "$235 - $450",
        originalPrice: "$235 - $450",
        note: "Prices and detailed timing confirmed during preliminary in-salon consultation.",
        bookingUrl: "https://www.ardonabeautysalon.com/booking-calendar/color-correction"
      }
    ]
  },
  {
    id: "treatments",
    name: "TREATMENTS",
    icon: "/icons/scissors.png",
    description: "Deep restorative hair treatments that heal bonds, replenish hydration, and lock in brilliance.",
    services: [
      {
        id: "deep-conditioner",
        name: "Deep Conditioner (Bond Repair)",
        description: "Intensive treatment cross-linking disulphide bonds damaged by color, bleach, or heat styling.",
        duration: "30 min",
        price: "$36.00",
        originalPrice: "$40",
        note: "Leaves hair stronger, resilient, and silky. Start $40 & up.",
        bookingUrl: "https://www.ardonabeautysalon.com/booking-calendar/deep-condicioner"
      },
      {
        id: "clear-gloss",
        name: "Clear Gloss",
        description: "Non-pigmented high-shine glaze that conditions cuticle layers and seals in natural moisture.",
        duration: "1 hr",
        price: "$49.50",
        originalPrice: "$55",
        note: "Leaves high mirror shine coat. Start $55 & up.",
        bookingUrl: "https://www.ardonabeautysalon.com/booking-calendar/clear-gloss"
      },
      {
        id: "infusion-treatment",
        name: "Infusion Hair Treatment",
        description: "Deep nutrient infusion therapy penetrating the cortex for dry, brittle, or stressed strands.",
        duration: "1 hr",
        price: "$67.50",
        originalPrice: "$75",
        note: "Start $75 & up.",
        bookingUrl: "https://www.ardonabeautysalon.com/booking-calendar/infusion-hair-treatment-1"
      },
      {
        id: "milbon-treatment",
        name: "Milbon Japanese Treatment",
        description: "Japanese professional smoothing & moisture system repairing porous ends for weightless silkiness.",
        duration: "30 min",
        price: "$49.50",
        originalPrice: "$55",
        note: "Includes intensive home-care regimen recommendation.",
        bookingUrl: "https://www.ardonabeautysalon.com/booking-calendar/milbon-treatment-1"
      }
    ]
  },
  {
    id: "texturizing",
    name: "TEXTURIZING & SMOOTHING",
    icon: "/icons/scissors.png",
    description: "Transformative smoothing treatments eliminating frizz while preserving hair integrity.",
    services: [
      {
        id: "keratin-treatment",
        name: "Keratin Treatment",
        description: "Infuses natural keratin deep into the cuticle, eliminating 100% frizz and up to 90% curl for up to 4 months.",
        duration: "2 hr",
        price: "$288.00",
        originalPrice: "$320",
        note: "Start $290 & up. Leaves silky smooth glass-like finish.",
        bookingUrl: "https://www.ardonabeautysalon.com/booking-calendar/keratin-treatment"
      },
      {
        id: "brazilian-blowout",
        name: "Brazilian Blowout",
        description: "Customizable smoothing treatment bonding protective protein layers around the hair shaft. Lasts up to 12 weeks.",
        duration: "2 hr",
        price: "$315.00",
        originalPrice: "$350",
        note: "Start $320 & up. Improves hair health and dramatically reduces styling time.",
        bookingUrl: "https://www.ardonabeautysalon.com/booking-calendar/brazilian-blowout"
      }
    ]
  },
  {
    id: "makeup",
    name: "MAKE UP",
    icon: "/icons/scissors.png",
    description: "Flawless makeup application for galas, weddings, photography, and evening events.",
    services: [
      {
        id: "makeup-service",
        name: "Make Up Application",
        description: "Full-face professional makeup application including skin prep, custom contour, eyes, and lip design.",
        duration: "1 hr",
        price: "$85.50",
        originalPrice: "$95",
        note: "Lashes and premium prep included upon consultation.",
        bookingUrl: "https://www.ardonabeautysalon.com/booking-calendar/make-up"
      }
    ]
  },
  {
    id: "extensions",
    name: "EXTENSIONS",
    icon: "/icons/scissors.png",
    description: "Premium human hair extensions for luxurious length, volume, and undetectable movement.",
    services: [
      {
        id: "extensions-service",
        name: "Extensions (Tape-In & Micro-Bead / Tip)",
        description: "Micro-bead Tip extensions (small hair strands pulled through beads) and seamless Tape-In extensions.",
        duration: "3 hr",
        price: "Consultation",
        originalPrice: "Based on Consult",
        note: "Custom color matching, blend haircut, and styling discussed during initial consult.",
        bookingUrl: "https://www.ardonabeautysalon.com/booking-calendar/extensions"
      }
    ]
  }
];

export const SALON_FAQS = [
  {
    question: "Do color services include a blowout or haircut?",
    answer: "Please note that blowouts and haircuts are not automatically included with color services (such as Single Process, Balayage, Highlights, or Gloss). We kindly ask that you add a haircut or blowout when booking online so that our stylists can dedicate the appropriate time to finish your look."
  },
  {
    question: "What is the difference between Balayage and Traditional Highlights?",
    answer: "Traditional highlights use foils from root to tip for consistent, bright contrast. Balayage is an artistic freehand painting technique where color is swept onto individual sections, creating a soft, sun-kissed gradient that grows out seamlessly without harsh demarcation lines."
  },
  {
    question: "What is your adjustment and satisfaction policy?",
    answer: "At Ardona Beauty Salon, client satisfaction is our highest priority. For any questions or adjustments on your cut or color, you are welcome to contact us and return within one week of your service date for a complimentary consultation and adjustment."
  },
  {
    question: "What smoothing treatments do you offer?",
    answer: "We offer both Keratin Treatments (which remove 100% frizz and up to 90% curl for up to 4 months) and Brazilian Blowouts (which create a protective protein layer around each strand for up to 12 weeks of effortless, smooth shine)."
  },
  {
    question: "How do I book an appointment?",
    answer: "You can easily book online 24/7 through our Book Online menu. Simply select your desired service and preferred date/time. You may also call us directly at (718) 433-9837 during salon hours."
  }
];

export const SALON_REVIEWS = [
  {
    id: 1,
    name: "Elena R.",
    location: "Upper West Side, NYC",
    rating: 5,
    text: "Ardona Beauty Salon is an absolute gem on Broadway! I came in for a full balayage and haircut. The attention to detail and color blending was perfection. The salon has such an upscale, welcoming atmosphere. I’ve found my forever salon in NYC!"
  },
  {
    id: 2,
    name: "Jessica M.",
    location: "Manhattan, NY",
    rating: 5,
    text: "The Brazilian Blowout here completely transformed my frizzy hair into silky, sleek perfection! It saves me 40 minutes every morning. The staff is so warm, talented, and professional. 10/10 recommended!"
  },
  {
    id: 3,
    name: "David K.",
    location: "New York, NY",
    rating: 5,
    text: "Top-notch men's haircut. Precise scissor work, great wash, and really friendly service. It's hard to find a salon in Manhattan that gets every detail right, but Ardona nails it every time."
  },
  {
    id: 4,
    name: "Sophia T.",
    location: "Upper West Side, NYC",
    rating: 5,
    text: "I had single process color and a deep conditioning treatment done. My hair has never felt so soft or looked so shiny. The online booking is super easy and the location right near 97th is so convenient."
  }
];
