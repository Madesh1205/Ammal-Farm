import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const SLIDES = [
  {
    image: 'https://dlugisbcds8fnzdn.public.blob.vercel-storage.com/images/nellore-judipi.jpg',
    title: 'Precision Rearing',
    subtitle: 'The Gold Standard of Tamil Nadu',
    description: 'Premier livestock producer specializing in elite Nellore Judipi and Salem Black goats with scientific rearing practices.',
    cta: 'View Catalog',
    link: '/livestock'
  },
  {
    image: 'https://dlugisbcds8fnzdn.public.blob.vercel-storage.com/images/salem%20black1.jpg',
    title: 'Majestic Pedigree',
    subtitle: 'Salem Black Excellence',
    description: 'Leading livestock seller sourcing the finest breeding lines to ensure superior growth rates and resilient breeds.',
    cta: 'Book a Visit',
    link: '/visit'
  },
  {
    image: 'https://dlugisbcds8fnzdn.public.blob.vercel-storage.com/images/country-chicken.jpg',
    title: 'Sustainable Poultry',
    subtitle: 'Natural Nattu Kozhi',
    description: 'Livestock producer of free-range country chickens and ducks raised naturally in stress-free environments.',
    cta: 'Explore Poultry',
    link: '/poultry'
  }
];

export default function HeroCarousel() {
  const [current, setCurrent] = useState(0);

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % SLIDES.length);
  }, []);

  const prev = useCallback(() => {
    setCurrent((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(next, 8000);
    return () => clearInterval(timer);
  }, [next]);

  return (
    <section className="relative h-[80vh] min-h-[600px] w-full bg-stone-900 overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.6}
          onDragEnd={(_event, info) => {
            if (info.offset.x < -50) {
              next();
            } else if (info.offset.x > 50) {
              prev();
            }
          }}
          className="absolute inset-0 cursor-grab active:cursor-grabbing touch-pan-y"
        >
          {/* Background Image */}
          <div className="absolute inset-0">
            <img 
              src={SLIDES[current].image} 
              alt={`${SLIDES[current].title} - ${SLIDES[current].subtitle} at Ammal Farm`} 
              decoding="async"
              className="w-full h-full object-cover opacity-60 scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-stone-900/80 via-stone-900/40 to-transparent" />
          </div>

          {/* Content */}
          <div className="relative h-full max-w-7xl mx-auto px-4 flex flex-col justify-center">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="max-w-2xl"
            >
              <span className="text-accent text-xs font-bold uppercase tracking-[0.4em] mb-4 block">
                {SLIDES[current].subtitle}
              </span>
              <h1 className="text-6xl md:text-8xl font-bold text-white tracking-tighter uppercase leading-[0.9] mb-6">
                {SLIDES[current].title.split(' ')[0]} <br />
                <span className="italic font-normal text-stone-300">{SLIDES[current].title.split(' ').slice(1).join(' ')}</span>
              </h1>
              <p className="text-stone-300 text-lg mb-10 leading-relaxed max-w-lg">
                {SLIDES[current].description}
              </p>
              <div className="flex gap-4">
                <Link 
                  to={SLIDES[current].link}
                  className="bg-accent text-white px-10 py-5 font-bold uppercase tracking-widest text-xs hover:bg-white hover:text-primary transition-all shadow-xl"
                >
                  {SLIDES[current].cta}
                </Link>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Controls */}
      <div className="absolute bottom-12 right-12 flex gap-4 z-20">
        <button 
          onClick={prev}
          className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-primary transition-all backdrop-blur-sm"
        >
          <ChevronLeft size={20} />
        </button>
        <button 
          onClick={next}
          className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-primary transition-all backdrop-blur-sm"
        >
          <ChevronRight size={20} />
        </button>
      </div>

      {/* Progress Bars */}
      <div className="absolute bottom-0 left-0 right-0 flex h-1 gap-1 z-20">
        {SLIDES.map((_, idx) => (
          <div key={idx} className="flex-1 bg-white/10 overflow-hidden">
            {current === idx && (
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ duration: 8, ease: 'linear' }}
                className="h-full bg-accent"
              />
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
