import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Phone, MessageSquare, MapPin, Instagram, Menu, X, ChevronRight } from 'lucide-react';

const whatsappNumber = "+916380898358";
const mapsLink = "https://share.google/feecOkWvoipQI7edM";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col font-sans antialiased text-text-main bg-farm-cream">
      {/* Navigation */}
      <nav className="fixed w-full z-50 bg-white/95 border-b-2 border-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            <Link to="/" className="flex items-center gap-2">
              <span className="font-serif text-3xl font-bold tracking-tight text-primary">Ammal Farm</span>
            </Link>
            
            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-8 font-semibold text-[13px] uppercase tracking-widest text-text-muted">
              <NavLink to="/" className={({ isActive }) => isActive ? "text-primary border-b-2 border-primary" : "hover:text-primary transition-colors"}>Home</NavLink>
              <NavLink to="/livestock" className={({ isActive }) => isActive ? "text-primary border-b-2 border-primary" : "hover:text-primary transition-colors"}>Livestock</NavLink>
              <NavLink to="/poultry" className={({ isActive }) => isActive ? "text-primary border-b-2 border-primary" : "hover:text-primary transition-colors"}>Poultry & Eggs</NavLink>
              <NavLink to="/visit" className={({ isActive }) => isActive ? "text-primary border-b-2 border-primary" : "hover:text-primary transition-colors"}>Farm Visit</NavLink>
              <a 
                href={`https://wa.me/${whatsappNumber}`} 
                target="_blank"
                rel="no-referrer"
                className="bg-accent text-white px-6 py-2 text-xs font-bold tracking-widest uppercase hover:opacity-90 transition-opacity"
              >
                Inquire
              </a>
            </div>

            {/* Mobile Toggle */}
            <button className="md:hidden text-primary" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white border-b border-border overflow-hidden p-6 flex flex-col gap-6 text-sm font-bold uppercase tracking-widest"
            >
              <Link to="/" onClick={() => setIsMenuOpen(false)}>Home</Link>
              <Link to="/livestock" onClick={() => setIsMenuOpen(false)}>Livestock</Link>
              <Link to="/poultry" onClick={() => setIsMenuOpen(false)}>Poultry</Link>
              <Link to="/visit" onClick={() => setIsMenuOpen(false)}>Farm Visit</Link>
              <a 
                href={`https://wa.me/${whatsappNumber}`}
                className="bg-primary text-white p-4 text-center"
              >
                Contact Us
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <main className="flex-grow pt-20">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-stone-50 pt-24 pb-12 border-t border-border">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-end pb-12 border-b border-border mb-12">
            <div>
              <div className="font-serif text-4xl mb-6 text-primary">Ammal Farm</div>
              <p className="text-xs uppercase tracking-[0.2em] font-bold text-text-muted">
                Growing Trust • Breeding Excellence
              </p>
            </div>
            <div className="flex gap-12 mt-8 md:mt-0">
               <a href={mapsLink} target="_blank" rel="no-referrer" className="text-[11px] font-bold uppercase tracking-widest text-primary border-b border-primary">Location</a>
               <a href={`https://wa.me/${whatsappNumber}`} target="_blank" rel="no-referrer" className="text-[11px] font-bold uppercase tracking-widest text-primary border-b border-primary">WhatsApp</a>
               <a href="https://instagram.com/ammal_farm" target="_blank" rel="no-referrer" className="text-[11px] font-bold uppercase tracking-widest text-primary border-b border-primary">Instagram</a>
            </div>
          </div>
          <div className="flex justify-between items-center text-[10px] uppercase font-bold tracking-[0.3em] text-stone-400">
            <p>© 2026 Ammal Farm</p>
            <p className="hidden sm:block">Sustainable Livestock Rearing</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
