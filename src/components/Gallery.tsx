import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ChevronLeft, ChevronRight, Play, Maximize2 } from 'lucide-react';

interface MediaItem {
  id: string;
  url: string;
  type: 'image' | 'video';
  description: string;
}

interface GalleryProps {
  items: MediaItem[];
  title?: string;
  subtitle?: string;
}

export default function Gallery({ items, title, subtitle }: GalleryProps) {
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedIdx === null) return;
    setSelectedIdx((selectedIdx + 1) % items.length);
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedIdx === null) return;
    setSelectedIdx((selectedIdx - 1 + items.length) % items.length);
  };

  return (
    <section className="py-24 bg-stone-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="mb-16">
          {subtitle && (
            <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-accent block mb-4">
              {subtitle}
            </span>
          )}
          {title && (
            <h2 className="text-4xl md:text-5xl font-bold tracking-tighter uppercase">
              {title}
            </h2>
          )}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {items.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              onClick={() => setSelectedIdx(idx)}
              className="group relative aspect-square bg-stone-100 overflow-hidden cursor-pointer border border-border"
            >
              {item.type === 'video' ? (
                <div className="w-full h-full relative">
                  <video 
                    src={item.url} 
                    muted 
                    playsInline
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700" 
                  />
                  <div className="absolute top-2 right-2 z-10">
                    <div className="bg-black/40 backdrop-blur-sm px-2 py-1 flex items-center gap-1.5 rounded">
                      <Play size={10} className="text-white" fill="currentColor" />
                      <span className="text-[8px] font-bold text-white uppercase tracking-widest">Video</span>
                    </div>
                  </div>
                </div>
              ) : (
                <img 
                  src={item.url} 
                  alt={item.description}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700"
                />
              )}
              
              <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
                <div className="w-12 h-12 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center text-primary transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 shadow-2xl">
                  {item.type === 'video' ? <Play size={20} fill="currentColor" /> : <Maximize2 size={20} />}
                </div>
              </div>
              <div className="absolute bottom-4 left-4 right-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                <p className="text-[10px] font-bold text-white uppercase tracking-widest drop-shadow-md">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedIdx !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedIdx(null)}
            className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4 md:p-12"
          >
            <button 
              className="absolute top-8 right-8 text-white/50 hover:text-white transition-colors z-[110]"
              onClick={() => setSelectedIdx(null)}
            >
              <X size={32} strokeWidth={1.5} />
            </button>

            <div className="absolute top-1/2 left-4 md:left-8 -translate-y-1/2 z-[110]">
              <button 
                onClick={handlePrev}
                className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white/50 hover:text-white hover:border-white transition-all bg-black/20 backdrop-blur-sm"
              >
                <ChevronLeft size={24} />
              </button>
            </div>

            <div className="absolute top-1/2 right-4 md:right-8 -translate-y-1/2 z-[110]">
              <button 
                onClick={handleNext}
                className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white/50 hover:text-white hover:border-white transition-all bg-black/20 backdrop-blur-sm"
              >
                <ChevronRight size={24} />
              </button>
            </div>

            <div className="relative w-full h-full flex flex-col items-center justify-center max-w-5xl">
              <motion.div
                key={selectedIdx}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                className="w-full h-full flex flex-col items-center justify-center"
              >
                {items[selectedIdx] ? (
                  <>
                    {items[selectedIdx].type === 'video' ? (
                      <video 
                        src={items[selectedIdx].url} 
                        controls 
                        autoPlay 
                        className="max-w-full max-h-[80vh] object-contain shadow-2xl"
                      />
                    ) : (
                      <img 
                        src={items[selectedIdx].url} 
                        alt={items[selectedIdx].description}
                        className="max-w-full max-h-[80vh] object-contain shadow-2xl"
                      />
                    )}
                    <div className="mt-8 text-center">
                      <p className="text-white text-sm font-medium tracking-wide uppercase italic">
                        {items[selectedIdx].description}
                      </p>
                      <p className="text-white/40 text-[10px] uppercase font-mono tracking-[0.3em] mt-2">
                        {selectedIdx + 1} / {items.length}
                      </p>
                    </div>
                  </>
                ) : (
                  <div className="text-white italic opacity-50">Item unavailable</div>
                )}
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
