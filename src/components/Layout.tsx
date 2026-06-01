import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X } from 'lucide-react';
import { FaWhatsapp, FaInstagram, FaMapMarkerAlt, FaPhone } from 'react-icons/fa';
import { mapsLink, whatsappNumber } from '../data';

export default function Layout({ children }: { children: React.ReactNode }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col font-sans antialiased text-text-main bg-farm-cream">
      {/* Navigation */}
      <nav className="fixed w-full z-50 bg-white/95 border-b-2 border-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            <Link to="/" className="flex items-center gap-4">
              <div className="w-12 h-12 overflow-hidden bg-primary/5 rounded-full flex items-center justify-center border border-border">
                <img 
                  src="https://dlugisbcds8fnzdn.public.blob.vercel-storage.com/images/logo.jpeg" 
                  alt="Ammal Farm Logo" 
                  decoding="async"
                  className="w-full h-full object-cover" 
                />
              </div>
              <span className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-primary">Ammal Farm</span>
            </Link>
            
            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-8 font-semibold text-[13px] uppercase tracking-widest text-text-muted">
              <NavLink to="/" className={({ isActive }) => isActive ? "text-primary border-b-2 border-primary" : "hover:text-primary transition-colors"}>Home</NavLink>
              <NavLink to="/livestock" className={({ isActive }) => isActive ? "text-primary border-b-2 border-primary" : "hover:text-primary transition-colors"}>Livestock</NavLink>
              <NavLink to="/poultry" className={({ isActive }) => isActive ? "text-primary border-b-2 border-primary" : "hover:text-primary transition-colors"}>Poultry & Eggs</NavLink>
              <NavLink to="/gallery" className={({ isActive }) => isActive ? "text-primary border-b-2 border-primary" : "hover:text-primary transition-colors"}>Gallery</NavLink>
              <NavLink to="/visit" className={({ isActive }) => isActive ? "text-primary border-b-2 border-primary" : "hover:text-primary transition-colors"}>Farm Visit</NavLink>
              <div className="flex items-center gap-4 ml-4 pl-4 border-l border-border">
                <a href={`https://wa.me/${whatsappNumber.replace(/\+/g, '')}?text=${encodeURIComponent('Hi Ammal Farm, i have an inquire regarding your products.')}`} target="_blank" rel="no-referrer" className="text-[#25D366] hover:opacity-80 transition-opacity" title="WhatsApp">
                  <FaWhatsapp size={22} />
                </a>
                <a href="https://instagram.com/ammal_farm" target="_blank" rel="no-referrer" className="text-[#E4405F] hover:opacity-80 transition-opacity" title="Instagram">
                  <FaInstagram size={22} />
                </a>
                <a href={mapsLink} target="_blank" rel="no-referrer" className="text-[#4285F4] hover:opacity-80 transition-opacity" title="Google Maps">
                  <FaMapMarkerAlt size={20} />
                </a>
              </div>
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
              <Link to="/gallery" onClick={() => setIsMenuOpen(false)}>Gallery</Link>
              <Link to="/visit" onClick={() => setIsMenuOpen(false)}>Farm Visit</Link>
              <div className="flex justify-center gap-8 py-4 border-t border-border mt-2">
                <a href={`https://wa.me/${whatsappNumber.replace(/\+/g, '')}?text=${encodeURIComponent('Hi Ammal Farm, i have an inquire regarding your products.')}`} className="text-[#25D366] flex items-center gap-2">
                   <FaWhatsapp size={24} />
                </a>
                <a href="https://instagram.com/ammal_farm" className="text-[#E4405F] flex items-center gap-2">
                   <FaInstagram size={24} />
                </a>
                <a href={mapsLink} className="text-[#4285F4] flex items-center gap-2">
                   <FaMapMarkerAlt size={22} />
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <main className="flex-grow pt-20">
        {children}
      </main>

      {/* Floating Action Buttons */}
      <div className="fixed bottom-6 right-6 z-[60] flex flex-col gap-4">
        <a 
          href={`tel:${whatsappNumber}`}
          className="w-14 h-14 bg-accent text-white rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform duration-300"
          title="Call Now"
        >
          <FaPhone size={20} />
        </a>
        <a 
          href={`https://wa.me/${whatsappNumber.replace(/\+/g, '')}?text=${encodeURIComponent('Hi Ammal Farm, i have an inquire regarding your products.')}`}
          target="_blank"
          rel="no-referrer"
          className="w-14 h-14 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform duration-300"
          title="Chat on WhatsApp"
        >
          <FaWhatsapp size={26} />
        </a>
      </div>

      <footer className="bg-stone-50 pt-24 pb-12 border-t border-border">
        <div className="max-w-7xl mx-auto px-4 text-center mb-12 sm:text-left">
          <p className="text-[10px] uppercase font-bold tracking-[0.4em] text-accent mb-4">Ammal Farm: Tamil Nadu's Premier Livestock & Poultry Producer</p>
        </div>
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 pb-16 border-b border-border mb-12">
            {/* Brand Section */}
            <div className="lg:col-span-1">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 overflow-hidden bg-white rounded-full flex items-center justify-center shadow-sm border border-border">
                  <img 
                    src="https://dlugisbcds8fnzdn.public.blob.vercel-storage.com/images/logo.jpeg" 
                    alt="Ammal Farm Logo in Tamil Nadu" 
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover" 
                  />
                </div>
                <div className="font-serif text-3xl text-primary leading-none">Ammal <br />Farm</div>
              </div>
              <p className="text-xs uppercase tracking-[0.2em] font-bold text-text-muted leading-relaxed">
                Growing Trust. <br />
                Tamil Nadu, India.
              </p>
            </div>

            {/* Contact Details */}
            <div>
              <h4 className="text-[10px] uppercase font-bold tracking-[0.3em] text-primary mb-6">Reach Out</h4>
              <ul className="space-y-6">
                <li>
                  <a href={`https://wa.me/${whatsappNumber.replace(/\+/g, '')}?text=${encodeURIComponent('Hi Ammal Farm, i have an inquire regarding your products.')}`} target="_blank" rel="no-referrer" className="flex gap-3 group cursor-pointer">
                    <div className="text-[#25D366] shrink-0 group-hover:scale-110 transition-transform duration-300">
                      <FaWhatsapp size={20} />
                    </div>
                    <div className="text-sm">
                      <p className="font-bold text-primary group-hover:text-[#25D366] transition-colors">WhatsApp Chat</p>
                      <p className="text-text-muted">Direct Message</p>
                    </div>
                  </a>
                </li>
                <li>
                  <a href={`tel:${whatsappNumber}`} className="flex gap-3 group cursor-pointer">
                    <div className="text-primary shrink-0 group-hover:scale-110 transition-transform duration-300">
                      <FaPhone size={18} />
                    </div>
                    <div className="text-sm">
                      <p className="font-bold text-primary group-hover:text-accent transition-colors">Call Support</p>
                      <p className="text-text-muted">{whatsappNumber}</p>
                    </div>
                  </a>
                </li>
                <li>
                  <a href="https://instagram.com/ammal_farm" target="_blank" rel="no-referrer" className="flex gap-3 group cursor-pointer">
                    <div className="text-[#E4405F] shrink-0 group-hover:scale-110 transition-transform duration-300">
                      <FaInstagram size={20} />
                    </div>
                    <div className="text-sm">
                      <p className="font-bold text-primary group-hover:text-[#E4405F] transition-colors">Instagram</p>
                      <p className="text-text-muted">@ammal_farm</p>
                    </div>
                  </a>
                </li>
              </ul>
            </div>

            {/* Address Details */}
            <div>
              <h4 className="text-[10px] uppercase font-bold tracking-[0.3em] text-primary mb-6">Location</h4>
              <a href={mapsLink} target="_blank" rel="no-referrer" className="flex gap-3 group cursor-pointer">
                <div className="text-[#4285F4] shrink-0 group-hover:scale-110 transition-transform duration-300">
                  <FaMapMarkerAlt size={20} />
                </div>
                <div className="text-sm">
                  <p className="font-bold text-primary group-hover:text-[#4285F4] transition-colors">Farm Site</p>
                  <p className="text-text-muted leading-relaxed mb-2">
                    Ammal Farm, Rusha post - 632209, <br />
                    Taluka, K V kuppam, Kollimedu, <br />
                    Chennangkuppam, VELLORE, <br />
                    Tamil Nadu 632209
                  </p>
                  <span className="text-xs font-bold text-accent uppercase tracking-widest border-b border-accent group-hover:text-[#4285F4] group-hover:border-[#4285F4] transition-all">Get Directions</span>
                </div>
              </a>
            </div>

            {/* Quick Policy */}
            <div>
              <h4 className="text-[10px] uppercase font-bold tracking-[0.3em] text-primary mb-6">Operations</h4>
              <div className="text-sm text-text-muted leading-relaxed">
                 <p className="mb-2"><strong>Visit Hours:</strong> 10:00 AM - 5:00 PM</p>
                 <p className="mb-4">*Prior Appointment Mandatory</p>
                 <Link to="/visit" className="text-xs font-bold text-primary uppercase tracking-widest border-b border-primary pb-0.5 hover:text-accent hover:border-accent transition-all">Book Now</Link>
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center text-[10px] uppercase font-bold tracking-[0.3em] text-stone-400 gap-6 border-t border-border pt-8">
            <div className="flex gap-8">
              <p>© 2026 Ammal Farm</p>
              <p className="hidden sm:block">Quality Livestock Producer & Seller</p>
            </div>
            <div className="flex gap-8">
              <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
