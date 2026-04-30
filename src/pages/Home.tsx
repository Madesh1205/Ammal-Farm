import { motion } from 'motion/react';
import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <section className="pt-12 pb-24 px-4 overflow-hidden">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-[1.5fr_1fr] gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-6xl lg:text-8xl font-bold leading-[0.9] mb-8 text-primary">
            Premium <br />
            <span className="italic font-normal">Livestock.</span>
          </h1>
          <p className="text-text-muted text-lg mb-10 max-w-lg leading-relaxed font-medium">
            Ammal Farm provides the gold standard in Nellore Judipi and Salem Black livestock. 
            Rooted in health, transparency, and quality care.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link to="/livestock" className="bg-accent text-white px-10 py-5 font-bold uppercase tracking-widest text-xs hover:shadow-xl transition-all">
              Livestock Catalog
            </Link>
            <Link to="/visit" className="border-2 border-primary text-primary px-10 py-5 font-bold uppercase tracking-widest text-xs hover:bg-stone-50 transition-all">
              Plan Farm Visit
            </Link>
          </div>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="bg-white border border-border p-4 shadow-sm"
        >
          <div className="aspect-[4/3] overflow-hidden">
            <img 
              src="/farm-herd.jpg" 
              alt="Ammal Farm Herd" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="mt-4 pt-4 border-t border-border flex justify-between items-center text-[11px] uppercase tracking-widest font-bold text-text-muted">
            <span>Est. Premium Quality</span>
            <span>Tamil Nadu, India</span>
          </div>
        </motion.div>
      </div>

      {/* Featured Quote */}
      <div className="max-w-7xl mx-auto mt-24">
        <div className="p-12 bg-primary text-white text-center italic text-2xl font-serif">
          "Healthy goats, trusted source, growing farm."
        </div>
      </div>
    </section>
  );
}
