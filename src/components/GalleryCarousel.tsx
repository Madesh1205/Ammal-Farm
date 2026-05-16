import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, Play } from 'lucide-react';
import { db } from '../lib/firebase';
import { collection, query, orderBy, limit, onSnapshot } from 'firebase/firestore';

interface MediaItem {
  id: string;
  url: string;
  type: 'image' | 'video';
  description: string;
}

const STATIC_GALLERY: MediaItem[] = [
  { id: 's1', url: 'https://dlugisbcds8fnzdn.public.blob.vercel-storage.com/images/nellore-judipi.jpg', type: 'image', description: 'Our healthy farm herd' },
  { id: 's2', url: 'https://dlugisbcds8fnzdn.public.blob.vercel-storage.com/images/nellore-judipi.jpg', type: 'image', description: 'Nellore Judipi Buck' },
  { id: 's3', url: 'https://dlugisbcds8fnzdn.public.blob.vercel-storage.com/images/salem%20black1.jpg', type: 'image', description: 'Salem Black livestock' },
  { id: 's4', url: 'https://dlugisbcds8fnzdn.public.blob.vercel-storage.com/images/country-chicken.jpg', type: 'image', description: 'Free-range country chicken' },
  { id: 's5', url: 'https://dlugisbcds8fnzdn.public.blob.vercel-storage.com/images/ducks.jpg', type: 'image', description: 'Farm ducks in habitat' },
  { id: 's6', url: 'https://dlugisbcds8fnzdn.public.blob.vercel-storage.com/images/black-chicken.jpg', type: 'image', description: 'Kadaknath poultry' },
  { id: 's7', url: 'https://dlugisbcds8fnzdn.public.blob.vercel-storage.com/images/turkey.jpg', type: 'image', description: 'Seasonal Turkeys' },
  { id: 's8', url: 'https://dlugisbcds8fnzdn.public.blob.vercel-storage.com/images/turkey%20eating.jpg', type: 'image', description: 'Fresh farm feeding' },
];

export default function GalleryCarousel() {
  const [items, setItems] = useState<MediaItem[]>(STATIC_GALLERY);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const q = query(collection(db, 'media'), orderBy('createdAt', 'desc'), limit(12));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as MediaItem[];
      if (data.length > 0) {
        setItems(data);
      } else {
        setItems(STATIC_GALLERY);
      }
    }, (error) => {
      console.warn("Firestore error, using defaults:", error);
      setItems(STATIC_GALLERY);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (currentIndex >= items.length && items.length > 0) {
      setCurrentIndex(0);
    }
  }, [items.length, currentIndex]);

  const slideNext = () => {
    if (items.length === 0) return;
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % items.length);
  };

  const slidePrev = () => {
    if (items.length === 0) return;
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
  };

  useEffect(() => {
    if (items.length > 0) {
      timerRef.current = setInterval(slideNext, 5000);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [items.length]);

  const galleryItems = items;
  const currentItem = items[currentIndex] || items[0] || ({} as MediaItem);

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  };

  return (
    <section className="py-24 bg-stone-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-accent block mb-4">
              Farm Gallery
            </span>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tighter uppercase leading-none">
              Life at <span className="text-primary italic">Ammal Farm</span>
            </h2>
          </div>
          
          <div className="flex gap-2">
            <button 
              onClick={() => { if(timerRef.current) clearInterval(timerRef.current); slidePrev(); }}
              className="w-12 h-12 rounded-full border border-border flex items-center justify-center text-stone-400 hover:text-primary hover:border-primary transition-all bg-white"
            >
              <ChevronLeft size={20} />
            </button>
            <button 
              onClick={() => { if(timerRef.current) clearInterval(timerRef.current); slideNext(); }}
              className="w-12 h-12 rounded-full border border-border flex items-center justify-center text-stone-400 hover:text-primary hover:border-primary transition-all bg-white"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        <div className="relative h-[500px] w-full overflow-hidden">
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 }
              }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <div className="relative w-full h-full max-w-4xl mx-auto bg-white border border-border p-4 shadow-2xl group">
                <div className="w-full h-full overflow-hidden relative">
                  {currentItem.type === 'video' ? (
                    <video 
                      src={currentItem.url} 
                      className="w-full h-full object-cover"
                      muted
                      autoPlay
                      loop
                      preload="auto"
                    />
                  ) : (
                    <img 
                      src={currentItem.url} 
                      alt={currentItem.description}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover transition-all duration-1000"
                    />
                  )}
                  
                  <div className="absolute inset-0 bg-stone-900/5 transition-colors duration-500" />
                  
                  {currentItem.type === 'video' && (
                    <div className="absolute top-6 right-6">
                      <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white">
                        <Play size={16} fill="white" />
                      </div>
                    </div>
                  )}
                  
                  <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-stone-900/80 to-transparent">
                    <p className="text-white text-xs font-bold uppercase tracking-[0.3em] mb-2">
                       Ammal Farm Highlights
                    </p>
                    <p className="text-white/80 text-sm font-medium italic">
                      {currentItem.description}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
        
        {/* Indicators */}
        <div className="flex justify-center gap-3 mt-12">
          {items.map((_, idx) => (
            <button
              key={idx}
              onClick={() => {
                if(timerRef.current) clearInterval(timerRef.current);
                setDirection(idx > currentIndex ? 1 : -1);
                setCurrentIndex(idx);
              }}
              className={`h-1 transition-all duration-500 ${currentIndex === idx ? 'w-12 bg-accent' : 'w-4 bg-stone-200 hover:bg-stone-300'}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
