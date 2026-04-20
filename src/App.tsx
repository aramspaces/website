import { AnimatePresence, motion } from 'motion/react';
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Facebook,
  Instagram,
  Key,
  MapPin,
  Maximize2,
  Menu,
  ShieldCheck,
  Star,
  X,
  Clock,
} from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import {
  BrowserRouter,
  Link,
  Route,
  Routes,
  useLocation,
  useNavigate,
  useParams,
} from 'react-router-dom';
import { type Listing, useListings } from './lib/listings';
import { type ReviewItem, useReviews } from './lib/reviews';

const WHATSAPP_NUMBER = '923342777559';
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}`;
const INSTAGRAM_URL = 'https://www.instagram.com/aramspaces/?utm_source=ig_web_button_share_sheet';
const EMAIL_ADDRESS = 'aramspaces@gmail.com';
const PHONE_DISPLAY = '+92 334 2777559';
const PHONE_LINK = 'tel:+923342777559';
const LOCATION_TEXT = 'Gulberg Greens, Islamabad';
const GLASS_BUTTON_BASE =
  'rounded-full border shadow-[0_16px_40px_rgba(26,26,26,0.12)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-0.5 active:scale-[0.98]';
const GLASS_BUTTON_DARK = `${GLASS_BUTTON_BASE} border-white/20 bg-white/12 text-white hover:bg-white/18`;
const GLASS_BUTTON_LIGHT = `${GLASS_BUTTON_BASE} border-black/8 bg-white/58 text-brand-sage-dark hover:bg-white/72`;
const GLASS_BUTTON_ACCENT = `${GLASS_BUTTON_BASE} border-white/20 bg-brand-accent/86 text-white hover:bg-brand-accent/95`;

const WhatsAppIcon = ({ className = '' }: { className?: string }) => (
  <svg aria-hidden="true" viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M19.11 4.89A9.83 9.83 0 0 0 12.12 2C6.64 2 2.18 6.46 2.18 11.94c0 1.76.46 3.47 1.34 4.98L2 22l5.24-1.37a9.92 9.92 0 0 0 4.87 1.25h.01c5.48 0 9.94-4.46 9.94-9.94a9.84 9.84 0 0 0-2.95-7.05Zm-6.99 15.31h-.01a8.2 8.2 0 0 1-4.18-1.14l-.3-.18-3.11.81.83-3.03-.2-.31a8.18 8.18 0 0 1-1.27-4.41c0-4.5 3.66-8.16 8.17-8.16 2.18 0 4.22.85 5.76 2.39a8.1 8.1 0 0 1 2.39 5.77c0 4.5-3.66 8.16-8.08 8.16Zm4.47-6.11c-.24-.12-1.41-.7-1.63-.79-.22-.08-.38-.12-.54.12-.16.23-.62.79-.76.95-.14.16-.28.18-.52.06a6.63 6.63 0 0 1-1.95-1.2 7.27 7.27 0 0 1-1.35-1.68c-.14-.24-.02-.37.1-.49.11-.11.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.54-1.3-.74-1.78-.2-.47-.4-.41-.54-.42h-.46c-.16 0-.42.06-.64.3-.22.24-.84.82-.84 2s.86 2.31.98 2.47c.12.16 1.69 2.58 4.09 3.62.57.25 1.02.4 1.36.51.57.18 1.08.15 1.49.09.46-.07 1.41-.58 1.61-1.13.2-.56.2-1.03.14-1.13-.06-.1-.22-.16-.46-.28Z" />
  </svg>
);

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <nav className="fixed top-3 sm:top-4 md:top-6 w-full z-50 px-3 sm:px-4 md:px-6">
      <div className={`max-w-7xl mx-auto rounded-full border transition-all duration-500 ${isScrolled || !isHome ? 'border-white/45 bg-brand-beige/65 text-brand-sage-dark shadow-[0_14px_40px_rgba(26,26,26,0.12)] backdrop-blur-xl' : 'border-white/25 bg-white/10 text-white shadow-[0_18px_50px_rgba(0,0,0,0.22)] backdrop-blur-xl'}`}>
        <div className="px-4 sm:px-5 md:px-6 py-3 md:py-4 flex justify-between items-center gap-4">
          <Link to="/" className="flex items-center min-w-0">
          <span className="text-lg sm:text-xl md:text-2xl font-serif font-bold tracking-tight inline-flex items-center shrink min-w-0">
            ARAM <span className="font-calligraphy font-semibold text-brand-accent ml-1 text-xl sm:text-2xl md:text-3xl leading-none">Spaces</span>
          </span>
          </Link>

          <div className="hidden md:flex items-center gap-2 lg:gap-3">
            {isHome ? (
              ['Stays', 'Why Us', 'How it works', 'Contact'].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase().replace(/ /g, '-')}`}
                  className={`rounded-full px-4 py-2 text-sm font-medium transition-all duration-300 hover:text-brand-accent hover:bg-white/20 ${isScrolled || !isHome ? 'text-brand-sage-dark' : 'text-white'}`}
                >
                  {item}
                </a>
              ))
            ) : (
              <>
                <Link to="/" className={`rounded-full px-4 py-2 text-sm font-medium transition-all duration-300 hover:text-brand-accent hover:bg-white/20 ${isScrolled || !isHome ? 'text-brand-sage-dark' : 'text-white'}`}>Home</Link>
                <Link to="/listings" className={`rounded-full px-4 py-2 text-sm font-medium transition-all duration-300 hover:text-brand-accent hover:bg-white/20 ${isScrolled || !isHome ? 'text-brand-sage-dark' : 'text-white'}`}>All Listings</Link>
              </>
            )}
          </div>

          <button className={`md:hidden p-2.5 shrink-0 rounded-full border transition-all duration-300 ${isScrolled || !isHome ? 'border-black/10 bg-white/55 text-brand-sage-dark' : 'border-white/15 bg-white/10 text-white'}`} onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="max-w-7xl mx-auto mt-3 rounded-[28px] border border-white/30 bg-brand-beige/85 text-brand-sage-dark py-6 px-5 sm:px-6 md:hidden flex flex-col gap-3 shadow-[0_18px_50px_rgba(0,0,0,0.18)] backdrop-blur-xl"
          >
            {isHome ? (
              ['Stays', 'Why Us', 'How it works', 'Contact'].map((item) => (
                <a key={item} href={`#${item.toLowerCase().replace(/ /g, '-')}`} className="rounded-2xl px-4 py-3 text-lg font-serif hover:bg-white/60 transition-colors" onClick={() => setIsMobileMenuOpen(false)}>
                  {item}
                </a>
              ))
            ) : (
              <>
                <Link to="/" className="rounded-2xl px-4 py-3 text-lg font-serif hover:bg-white/60 transition-colors" onClick={() => setIsMobileMenuOpen(false)}>Home</Link>
                <Link to="/listings" className="rounded-2xl px-4 py-3 text-lg font-serif hover:bg-white/60 transition-colors" onClick={() => setIsMobileMenuOpen(false)}>All Listings</Link>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const navigate = useNavigate();
  const images = [
    'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=1920',
    'https://images.unsplash.com/photo-1560448204-61dc36dc98c8?auto=format&fit=crop&q=80&w=1920',
    'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&q=80&w=1920',
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [images.length]);

  return (
    <section className="relative min-h-[calc(100svh-84px)] sm:min-h-[82svh] md:min-h-[100svh] flex flex-col items-center justify-center overflow-hidden px-4 sm:px-0">
      <div className="absolute inset-0 z-0 bg-black">
        <AnimatePresence mode="wait">
          <motion.img
            key={currentImage}
            src={images[currentImage]}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1.05 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: 'easeInOut' }}
            alt="Cozy Room Interior"
            className="absolute inset-0 w-full h-full object-cover brightness-[0.7]"
            referrerPolicy="no-referrer"
          />
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-brand-beige/30" />
      </div>

      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 pt-22 sm:pt-28 md:pt-24 pb-12 sm:pb-20 md:pb-16 text-center text-white">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <span className="text-[10px] sm:text-xs uppercase tracking-[0.35em] sm:tracking-[0.5em] font-bold text-white mb-3 md:mb-6 block drop-shadow-sm">A NEW WAY TO STAY</span>
          <h1 className="text-[2rem] sm:text-5xl md:text-7xl lg:text-8xl mb-3 md:mb-8 leading-[0.95] drop-shadow-md text-white text-balance">
            Find your <span className="italic font-light text-white">perfect</span> stay.
          </h1>
          <p className="text-sm sm:text-base md:text-xl lg:text-2xl text-white mb-5 md:mb-12 max-w-3xl mx-auto font-sans font-light leading-relaxed drop-shadow-sm opacity-90 text-pretty">
            Premium family suites in the heart of Islamabad. Comfort, style, and convenience with modern amenities and 24/7 support.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6">
            <button
              onClick={() => navigate('/listings')}
            className={`${GLASS_BUTTON_ACCENT} w-full sm:w-auto px-8 sm:px-10 md:px-12 py-3 md:py-5 text-white font-bold uppercase tracking-[0.2em] md:tracking-widest text-xs sm:text-sm`}
            >
              Browse Apartments
            </button>
          </div>
        </motion.div>

        <div className="absolute bottom-3 sm:bottom-6 md:-bottom-24 left-1/2 -translate-x-1/2 flex gap-3">
          {images.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentImage(idx)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${currentImage === idx ? 'bg-white w-8' : 'bg-white/30'}`}
            />
          ))}
        </div>
      </div>

      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-4 text-white/60">
        <span className="text-[10px] uppercase tracking-[0.4em] font-bold">SCROLL</span>
        <div className="w-px h-12 bg-white/20" />
      </div>
    </section>
  );
};

const TrustBar = () => {
  const partners = [
    { name: 'Airbnb', logo: 'https://upload.wikimedia.org/wikipedia/commons/6/69/Airbnb_Logo_B%C3%A9lo.svg' },
    { name: 'Booking.com', logo: 'https://upload.wikimedia.org/wikipedia/commons/b/be/Booking.com_logo.svg' },
  ];

  return (
    <div className="bg-brand-beige py-5 md:py-12 border-b border-black/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-3 sm:gap-6 md:gap-24 text-center">
          <span className="text-[8px] md:text-[10px] uppercase tracking-[0.35em] md:tracking-[0.4em] font-bold text-brand-accent block">Find us on</span>
          <div className="flex items-center justify-center gap-6 sm:gap-10 md:gap-24">
            {partners.map((partner) => (
              <img
                key={partner.name}
                src={partner.logo}
                alt={partner.name}
                className="h-4 sm:h-5 md:h-8 max-w-[110px] object-contain"
                referrerPolicy="no-referrer"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const FeaturedStays = ({ listings }: { listings: Listing[] }) => {
  const navigate = useNavigate();
  const featuredListings = (listings.some((item) => item.featured) ? listings.filter((item) => item.featured) : listings).slice(0, 6);
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: direction === 'left' ? -350 : 350, behavior: 'smooth' });
    }
  };

  return (
    <section id="stays" className="pt-16 md:pt-24 pb-10 md:pb-8 bg-brand-beige">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="mb-8 md:mb-20">
          <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-brand-accent mb-3 md:mb-6 block">FEATURED STAYS</span>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 md:gap-8">
            <h2 className="text-2xl sm:text-4xl md:text-6xl lg:text-7xl leading-tight max-w-3xl">Quietly <span className="italic font-light">extraordinary</span> homes.</h2>
            <div className="flex items-center gap-4 self-end sm:self-auto sm:ml-auto">
              <button onClick={() => scroll('left')} className={`${GLASS_BUTTON_LIGHT} w-10 h-10 flex items-center justify-center`}>
                <ChevronLeft size={18} />
              </button>
              <button onClick={() => scroll('right')} className={`${GLASS_BUTTON_LIGHT} w-10 h-10 flex items-center justify-center`}>
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>

        <div ref={scrollRef} className="flex gap-4 md:gap-8 lg:gap-12 mb-10 md:mb-20 overflow-x-auto snap-x scrollbar-hide pb-6 md:pb-8">
          {featuredListings.map((item, idx) => (
            <Link to={`/listing/${item.id}`} key={idx} className="group cursor-pointer flex-none w-[280px] sm:w-[320px] md:w-[360px] lg:w-[380px] xl:w-[400px] snap-start">
              <div className="relative aspect-[16/10] rounded-sm md:rounded-xl overflow-hidden mb-2 md:mb-6 bg-gray-100/50">
                {item.image ? (
                  <img src={item.image} alt={item.title} className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 opacity-90 group-hover:opacity-100" referrerPolicy="no-referrer" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">No image</div>
                )}
              </div>
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-1 sm:gap-3 mb-1 px-1">
                <h3 className="text-sm sm:text-base md:text-2xl font-serif text-brand-sage-dark line-clamp-1">{item.title}</h3>
                <span className="text-[10px] md:text-sm font-bold text-brand-sage-dark shrink-0">★ {item.rating}</span>
              </div>
              <p className="text-gray-400 text-xs md:text-sm mb-1 md:mb-4 px-1 line-clamp-1">{item.location}</p>
              <div className="text-sm md:text-xl font-bold text-brand-sage-dark px-1">
                PKR {item.price}<span className="text-xs md:text-sm font-normal text-gray-400">/n</span>
              </div>
            </Link>
          ))}
        </div>

        {featuredListings.length === 0 && (
          <div className="py-10 text-center text-gray-500">Listings will appear here once they are available in Supabase.</div>
        )}

        <div className="flex justify-center">
          <button onClick={() => navigate('/listings')} className={`${GLASS_BUTTON_LIGHT} w-full sm:w-auto px-8 sm:px-12 py-4 text-xs sm:text-sm font-bold uppercase tracking-[0.2em] md:tracking-widest`}>
            View All Listings
          </button>
        </div>
      </div>
    </section>
  );
};

const WhyUs = () => {
  const steps = [
    { icon: ShieldCheck, title: 'Verified apartments', desc: 'Every home is personally inspected and photographed by our team. No surprises on arrival.' },
    { icon: MapPin, title: 'Prime locations', desc: 'Hand-picked neighborhoods, walkable streets, and views worth waking up to.' },
    { icon: Clock, title: 'Honest pricing', desc: 'Transparent rates, no hidden fees. The price you see is the price you pay.' },
    { icon: Key, title: 'Effortless booking', desc: 'Book in under two minutes with instant confirmation and a real human on call 24/7.' },
  ];

  return (
    <section id="why-us" className="pt-6 pb-16 md:pb-24 bg-brand-beige border-t border-black/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="mb-8 md:mb-20">
          <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-brand-accent mb-3 md:mb-6 block uppercase">WHY ARAM SPACES</span>
          <h2 className="text-2xl sm:text-4xl md:text-6xl lg:text-7xl leading-tight max-w-5xl">Stays that feel like a <span className="italic font-light">welcome</span>, not a transaction.</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5 lg:gap-6">
          {steps.map((step, idx) => (
            <div
              key={idx}
              className="p-6 sm:p-8 md:p-10 lg:p-10 rounded-[28px] border border-white/55 bg-white/45 backdrop-blur-xl shadow-[0_18px_45px_rgba(26,26,26,0.08)] flex flex-col items-start gap-4 md:gap-8 transition-all duration-300 hover:-translate-y-1 hover:bg-white/60 hover:shadow-[0_22px_55px_rgba(26,26,26,0.12)]"
            >
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-white/50 bg-brand-sage-dark/88 backdrop-blur-xl flex items-center justify-center text-white shadow-[0_12px_28px_rgba(45,58,48,0.22)]">
                <step.icon size={18} />
              </div>
              <div>
                <h3 className="text-base md:text-xl font-bold mb-2 md:mb-4 text-brand-sage-dark">{step.title}</h3>
                <p className="text-sm font-light leading-relaxed text-gray-500">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const HowItWorks = () => {
  const steps = [
    { num: '01', title: 'Search', desc: 'Tell us where and when. Filter by neighborhood, vibe, or view.' },
    { num: '02', title: 'Choose', desc: 'Browse curated apartments with honest photos and transparent pricing.' },
    { num: '03', title: 'Book', desc: 'Confirm in two minutes. Check in, unwind, feel at home.' },
  ];

  return (
    <section id="how-it-works" className="py-16 md:py-24 lg:py-32 bg-brand-sage-dark text-white overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="mb-12 md:mb-20">
          <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-brand-accent mb-4 block">HOW IT WORKS</span>
          <h2 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl max-w-3xl text-white leading-tight">Three calm steps to your next stay.</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12 lg:gap-16 relative">
          {steps.map((step, idx) => (
            <div key={idx} className="relative group">
              <div className="flex items-center gap-4 md:gap-8 mb-6 md:mb-10">
                <span className="text-4xl md:text-7xl lg:text-8xl font-serif text-brand-accent opacity-80 group-hover:opacity-100 transition-opacity">{step.num}</span>
                {idx !== 2 && <div className="hidden md:block flex-1 h-px bg-white/10 mt-6 lg:mt-10" />}
              </div>
              <h3 className="text-lg md:text-2xl lg:text-3xl font-bold mb-3 md:mb-4">{step.title}</h3>
              <p className="text-white/60 text-sm md:text-lg font-light leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const ClientReviews = ({ reviews }: { reviews: ReviewItem[] }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (reviews.length <= 1 || !scrollRef.current) {
      return;
    }

    const container = scrollRef.current;
    let frameId = 0;
    let lastTime = 0;
    const pixelsPerSecond = 28;

    const step = (time: number) => {
      if (!lastTime) {
        lastTime = time;
      }

      const delta = time - lastTime;
      lastTime = time;
      const halfwayPoint = container.scrollWidth / 2;
      container.scrollLeft += (pixelsPerSecond * delta) / 1000;

      if (container.scrollLeft >= halfwayPoint) {
        container.scrollLeft = 0;
      }

      frameId = window.requestAnimationFrame(step);
    };

    frameId = window.requestAnimationFrame(step);
    return () => window.cancelAnimationFrame(frameId);
  }, [reviews]);

  if (reviews.length === 0) {
    return null;
  }

  const carouselReviews = reviews.length > 1 ? [...reviews, ...reviews] : reviews;

  return (
    <section className="py-16 md:py-24 bg-brand-beige overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-10 md:mb-12">
        <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-brand-accent mb-4 md:mb-6 block">GUESTS</span>
        <h2 className="text-2xl sm:text-4xl md:text-6xl leading-tight">Loved by travelers <span className="hidden md:inline"><br /></span>who notice details.</h2>
      </div>

      <div ref={scrollRef} className="relative w-full overflow-x-auto overflow-y-hidden scrollbar-hide cursor-grab active:cursor-grabbing [scrollbar-width:none] [-ms-overflow-style:none]">
        <div className="flex gap-4 md:gap-6 px-4 sm:px-6 w-max">
          {carouselReviews.map((review, idx) => (
            <div
              key={`${review.id}-${idx}`}
              className="flex-none w-[280px] sm:w-[340px] md:w-[420px] lg:w-[450px] rounded-[28px] border border-white/55 bg-white/42 p-6 sm:p-8 md:p-12 shadow-none backdrop-blur-xl flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:bg-white/56 hover:shadow-[0_14px_32px_rgba(26,26,26,0.06)]"
            >
              <div>
                <div className="inline-flex items-center gap-2 mb-8 md:mb-10 rounded-full border border-white/60 bg-white/50 px-3 py-2 text-brand-accent shadow-[0_10px_28px_rgba(26,26,26,0.06)]">
                  <span className="text-sm md:text-base font-semibold">{review.rating}</span>
                  <Star size={14} className="fill-brand-accent" />
                </div>
                <p className="text-sm sm:text-base md:text-xl font-light text-brand-sage-dark leading-relaxed mb-8 md:mb-16 italic font-serif">"{review.review}"</p>
              </div>
              <div className="pt-4 md:pt-8 border-t border-white/50">
                <h4 className="text-sm md:text-base font-bold text-brand-sage-dark">{review.guestName}</h4>
                <p className="text-[10px] text-brand-sage/70 uppercase tracking-widest mt-1">{review.stay}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer id="contact" className="bg-brand-sage-dark text-white py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col items-center text-center">
          <div className="mb-8 md:mb-10">
            <span className="text-2xl sm:text-3xl font-serif font-bold tracking-tight inline-flex items-center">
              ARAM <span className="font-calligraphy font-semibold text-brand-accent ml-1 text-3xl sm:text-4xl mb-1 leading-none">Spaces</span>
            </span>
          </div>

          <p className="max-w-md text-sm sm:text-base text-white/50 font-light mb-10 md:mb-12 leading-relaxed italic">
            "Premium family suites in the heart of Islamabad. Comfort, style, and convenience with modern amenities and 24/7 support."
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-16 mb-14 md:mb-20 w-full max-w-5xl">
            <div className="flex flex-col items-center gap-3">
              <span className="text-[10px] text-brand-accent font-bold tracking-[0.3em] uppercase">Email</span>
              <a href={`mailto:${EMAIL_ADDRESS}`} className="text-base sm:text-lg md:text-xl font-light hover:text-brand-accent transition-colors break-all sm:break-normal">{EMAIL_ADDRESS}</a>
            </div>
            <div className="flex flex-col items-center gap-3">
              <span className="text-[10px] text-brand-accent font-bold tracking-[0.3em] uppercase">Phone</span>
              <a href={PHONE_LINK} className="text-base sm:text-lg md:text-xl font-light hover:text-brand-accent transition-colors">{PHONE_DISPLAY}</a>
            </div>
            <div className="flex flex-col items-center gap-3 sm:col-span-2 lg:col-span-1">
              <span className="text-[10px] text-brand-accent font-bold tracking-[0.3em] uppercase">Location</span>
              <span className="text-base sm:text-lg md:text-xl font-light">{LOCATION_TEXT}</span>
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-4 sm:gap-6 mb-12 md:mb-16">
            <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className={`${GLASS_BUTTON_DARK} w-12 h-12 flex items-center justify-center text-white/70 hover:text-brand-accent hover:border-brand-accent`}>
              <Instagram size={20} />
            </a>
            <button className={`${GLASS_BUTTON_DARK} w-12 h-12 flex items-center justify-center text-white/70 hover:text-brand-accent hover:border-brand-accent`}>
              <Facebook size={20} />
            </button>
          </div>

          <div className="w-full pt-10 md:pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-[10px] text-white/30 uppercase tracking-[0.2em] font-bold text-center">© 2024 ARAM SPACES. ALL RIGHTS RESERVED.</p>
            <div className="flex flex-wrap justify-center gap-4 sm:gap-8">
              <a href="#" className="text-[10px] text-white/30 uppercase tracking-[0.2em] font-bold hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="text-[10px] text-white/30 uppercase tracking-[0.2em] font-bold hover:text-white transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

const HomePage = ({ listings, reviews }: { listings: Listing[]; reviews: ReviewItem[] }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Hero />
      <TrustBar />
      <FeaturedStays listings={listings} />
      <WhyUs />
      <HowItWorks />
      <ClientReviews reviews={reviews} />
    </>
  );
};

const ListingsPage = ({
  listings,
  loading,
  error,
  usingFallback,
}: {
  listings: Listing[];
  loading: boolean;
  error: string | null;
  usingFallback: boolean;
}) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="pt-24 sm:pt-28 md:pt-32 pb-16 md:pb-24 bg-brand-beige min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="mb-12 md:mb-20">
          <Link to="/" className="inline-flex items-center gap-2 text-brand-accent font-bold text-[10px] md:text-xs uppercase tracking-widest mb-6 md:mb-8 hover:translate-x-[-4px] transition-transform">
            <ArrowLeft size={14} /> Back to Home
          </Link>
          <h1 className="text-3xl sm:text-4xl md:text-7xl mb-4 md:mb-6 leading-tight">Our <span className="italic font-light">curated</span> collection.</h1>
          <p className="max-w-2xl text-gray-500 text-sm md:text-base font-light leading-relaxed text-pretty">
            Beautifully designed homes in the best neighborhoods. Each property is personally vetted, ensuring zero compromises on comfort, style, and location.
          </p>
        </div>

        {loading && <div className="py-16 text-center text-gray-500">Loading listings...</div>}
        {!loading && error && <div className="mb-8 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">Supabase could not be reached, so the page is showing fallback listings for now.</div>}
        {!loading && usingFallback && !error && <div className="mb-8 rounded-xl border border-brand-sage/10 bg-white/60 px-4 py-3 text-sm text-brand-sage-dark">Supabase is connected, but the `listings` table is currently empty, so fallback listings are being shown until your database has rows.</div>}

        {!loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6 md:gap-x-10 md:gap-y-16">
            {listings.map((item) => (
              <motion.div key={item.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
                <Link to={`/listing/${item.id}`} className="group cursor-pointer block">
                  <div className="relative aspect-[16/10] rounded-sm md:rounded-xl overflow-hidden mb-2 md:mb-6 bg-gray-100/50 shadow-sm transition-shadow group-hover:shadow-xl">
                    {item.image ? (
                      <img src={item.image} alt={item.title} className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 opacity-90 group-hover:opacity-100" referrerPolicy="no-referrer" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">No image</div>
                    )}
                  </div>
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-1 sm:gap-3 mb-1 px-1 text-left">
                    <h3 className="text-sm sm:text-base md:text-2xl font-serif text-brand-sage-dark group-hover:text-brand-accent transition-colors line-clamp-1">{item.title}</h3>
                    <span className="text-[10px] md:text-sm font-bold text-brand-sage-dark shrink-0">★ {item.rating}</span>
                  </div>
                  <p className="text-gray-400 text-xs md:text-sm mb-1 md:mb-4 px-1 line-clamp-1">{item.location}</p>
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center px-1 gap-1">
                    <div className="text-sm md:text-xl font-bold text-brand-sage-dark">PKR {item.price}<span className="text-xs md:text-sm font-normal text-gray-400">/n</span></div>
                    <button className={`${GLASS_BUTTON_LIGHT} hidden md:flex items-center gap-2 px-4 py-2 text-xs font-bold uppercase tracking-widest text-brand-accent group-hover:gap-4`}>
                      View Details <ChevronRight size={14} />
                    </button>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const ListingDetailsPage = ({ listings, loading }: { listings: Listing[]; loading: boolean }) => {
  const { id } = useParams();
  const listing = listings.find((item) => String(item.id) === String(id));
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const gallery = listing ? (listing.gallery.length > 0 ? listing.gallery : listing.image ? [listing.image] : []) : [];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (gallery.length <= 1) {
      return;
    }

    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % gallery.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [gallery.length]);

  useEffect(() => {
    setActiveIndex(0);
  }, [id]);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center bg-brand-beige px-4 text-center text-gray-500">Loading listing details...</div>;
  }

  if (!listing) {
    return (
      <div className="h-screen flex items-center justify-center bg-brand-beige">
        <div className="text-center">
          <h2 className="text-2xl font-serif mb-4">Listing not found.</h2>
          <Link to="/listings" className="text-brand-accent font-bold uppercase tracking-widest text-xs">Back to all stays</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 sm:pt-28 md:pt-32 pb-12 bg-brand-beige min-h-screen">
      <AnimatePresence>
        {selectedImage && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] bg-brand-sage-dark/95 flex items-center justify-center p-4 md:p-12 cursor-zoom-out" onClick={() => setSelectedImage(null)}>
            <motion.img initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} src={selectedImage} className="max-w-full max-h-full rounded-lg object-contain shadow-2xl" referrerPolicy="no-referrer" />
            <button className={`${GLASS_BUTTON_DARK} absolute top-8 right-8 p-2.5`}>
              <X size={32} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="mb-8 md:mb-12">
          <Link to="/listings" className="inline-flex items-center gap-2 text-brand-accent font-bold text-[10px] md:text-xs uppercase tracking-widest mb-6 md:mb-8 hover:translate-x-[-4px] transition-transform">
            <ArrowLeft size={14} /> All STAYS
          </Link>
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6">
            <div>
              <h1 className="text-3xl sm:text-4xl md:text-7xl mb-2 md:mb-4 font-serif text-brand-sage-dark leading-tight">{listing.title}</h1>
              <p className="flex items-center gap-2 text-gray-400 text-sm md:text-base font-light tracking-wide italic">
                <MapPin size={16} /> {listing.location}
              </p>
            </div>
            <div className="text-left lg:text-right">
              <div className="text-2xl md:text-4xl font-bold text-brand-sage-dark mb-1">PKR {listing.price}</div>
              <div className="text-[10px] md:text-sm text-gray-400 uppercase tracking-widest">per night</div>
            </div>
          </div>
        </div>

        <div className="mb-14 md:mb-20">
          {gallery.length > 0 ? (
            <>
              <div className="relative aspect-[4/3] sm:aspect-[16/10] md:aspect-[21/9] rounded-xl md:rounded-2xl overflow-hidden mb-4 md:mb-6 bg-gray-100 shadow-sm cursor-zoom-in group" onClick={() => setSelectedImage(gallery[activeIndex])}>
                <AnimatePresence mode="wait">
                  <motion.img key={activeIndex} src={gallery[activeIndex]} initial={{ opacity: 0, scale: 1.05 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 0.8, ease: 'easeInOut' }} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </AnimatePresence>
                <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors" />
                <div className="absolute bottom-4 right-4 inline-flex items-center gap-2 rounded-full border border-white/25 bg-black/25 px-3 py-2 text-white shadow-[0_12px_28px_rgba(0,0,0,0.18)] backdrop-blur-xl transition-all duration-300 group-hover:bg-black/35">
                  <Maximize2 size={16} />
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em]">Open</span>
                </div>
              </div>

              {gallery.length > 1 && (
                <div className="flex gap-3 md:gap-4 overflow-x-auto pb-4 scrollbar-hide snap-x">
                  {gallery.map((img, i) => (
                    <button key={i} onClick={() => setActiveIndex(i)} className={`flex-shrink-0 w-24 sm:w-32 md:w-40 lg:w-48 aspect-[16/10] rounded-lg md:rounded-xl overflow-hidden transition-all duration-300 snap-center border-2 ${activeIndex === i ? 'border-brand-accent ring-4 ring-brand-accent/10 opacity-100' : 'border-transparent opacity-50 hover:opacity-100'}`}>
                      <img src={img} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    </button>
                  ))}
                </div>
              )}
            </>
          ) : (
            <div className="aspect-[4/3] sm:aspect-[16/10] md:aspect-[21/9] rounded-xl md:rounded-2xl mb-4 md:mb-6 bg-gray-100 shadow-sm flex items-center justify-center text-gray-400 text-sm">No images available for this listing.</div>
          )}
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="py-6 md:py-8 border-y border-brand-sage/10 text-xs sm:text-sm font-medium text-brand-sage-dark uppercase tracking-[0.24em] sm:tracking-[0.3em] flex flex-col gap-4 sm:grid sm:grid-cols-3 sm:gap-8 md:gap-16 mb-10 md:mb-12">
            <div className="flex items-baseline gap-3 sm:flex-col sm:gap-1">
              <span className="text-brand-accent text-[10px]">CAPACITY</span>
              <span>{listing.details?.guests} Guests</span>
            </div>
            <div className="flex items-baseline gap-3 sm:flex-col sm:gap-1">
              <span className="text-brand-accent text-[10px]">SLEEPING</span>
              <span>{listing.details?.bedrooms} Bedroom</span>
            </div>
            <div className="flex items-baseline gap-3 sm:flex-col sm:gap-1">
              <span className="text-brand-accent text-[10px]">FACILITIES</span>
              <span>{listing.details?.baths} Bath</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 md:gap-16 lg:gap-24">
            <div className="lg:col-span-2">
              <h2 className="text-2xl md:text-4xl font-serif mb-6 md:mb-10 text-brand-sage-dark">About this stay</h2>
              <p className="text-gray-500 font-light leading-relaxed mb-8 text-base md:text-xl whitespace-pre-wrap italic opacity-85 text-pretty">
                "{listing.description}"
              </p>
            </div>
            <div className="bg-white/50 p-6 sm:p-8 md:p-10 rounded-xl md:rounded-2xl border border-brand-sage/5">
              <h2 className="text-xs font-bold mb-6 md:mb-8 text-brand-sage-dark uppercase tracking-[0.3em]">AMENITIES</h2>
              <div className="flex flex-col gap-4 md:gap-6">
                {listing.amenities?.map((amenity, i) => (
                  <div key={i} className="flex items-center gap-4 text-gray-600 text-sm md:text-base font-light border-b border-brand-sage/5 pb-4 last:border-0">
                    <div className="w-1.5 h-1.5 rounded-full bg-brand-accent flex-shrink-0" />
                    {amenity}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-brand-sage/10 text-center">
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className={`${GLASS_BUTTON_LIGHT} inline-flex items-center justify-center w-full sm:w-auto px-8 sm:px-12 py-4 sm:py-5 font-bold uppercase tracking-[0.2em] md:tracking-widest text-xs sm:text-sm`}>
              Inquire about dates
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function App() {
  const { listings, loading, error, usingFallback } = useListings();
  const { reviews } = useReviews();

  return (
    <BrowserRouter>
      <div className="relative min-h-screen bg-brand-beige">
        <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 md:bottom-8 md:right-8 z-[60] w-12 h-12 sm:w-14 sm:h-14 rounded-full border border-white/20 bg-[#25D366]/78 text-white flex items-center justify-center shadow-[0_18px_45px_rgba(0,0,0,0.22)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#25D366]/88 group">
          <WhatsAppIcon className="w-6 h-6 sm:w-[30px] sm:h-[30px] group-hover:rotate-12 transition-transform" />
          <span className="absolute right-full mr-4 px-4 py-2 border border-white/30 bg-white/75 text-brand-sage-dark text-xs font-bold rounded-full opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-sm backdrop-blur-xl pointer-events-none hidden md:block">
            Chat with us
          </span>
        </a>

        <Navbar />

        <Routes>
          <Route path="/" element={<HomePage listings={listings} reviews={reviews} />} />
          <Route path="/listings" element={<ListingsPage listings={listings} loading={loading} error={error} usingFallback={usingFallback} />} />
          <Route path="/listing/:id" element={<ListingDetailsPage listings={listings} loading={loading} />} />
        </Routes>

        <Footer />
      </div>
    </BrowserRouter>
  );
}
