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

      {/* Local SEO Section */}
      <div className="max-w-7xl mx-auto mt-24">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="order-2 lg:order-1">
            <h2 className="text-4xl font-bold tracking-tight mb-8 text-primary uppercase">
              Best Goat Farm in Tamil Nadu – Ammal Farm
            </h2>
            <div className="space-y-6 text-stone-600 leading-relaxed text-sm">
              <p>
                If you are searching for a <strong>goat farm near me</strong>, Ammal Farm is a trusted choice in <strong>Tamil Nadu</strong>. 
                Our farm is strategically located in the heart of the region, serving districts like <strong>Vellore, Chennai, and nearby villages</strong> with premium livestock. 
                We specialize in rearing healthy, high-yield goats including the majestic <strong>Nellore Judipi</strong> and the resilient <strong>Salem Black</strong> goats.
              </p>
              <p>
                At Ammal Farm, we understand the local climate and farming needs of <strong>Tamil Nadu</strong>. 
                Whether you need goats for breeding, commercial farming, or the religious <strong>Bakrid festivals</strong>, 
                our animals are raised with scientific care and natural fodder to ensure they are the best available in <strong>Tamil Nadu</strong>.
              </p>
              <p>
                Beyond livestock, we are proud to offer high-quality <strong>country chicken, ducks, and turkey</strong>. 
                Our poultry farming practices ensure stress-free birds, making us a top-rated poultry source for those looking for 
                <strong>country chicken farm near me</strong> in the southern districts.
              </p>
              <div className="pt-6">
                 <Link to="/visit" className="text-accent font-bold uppercase tracking-widest text-xs border-b-2 border-accent pb-1 hover:text-primary hover:border-primary transition-all">
                   Visit our farm in Tamil Nadu
                 </Link>
              </div>
            </div>
          </div>
          <div className="order-1 lg:order-2">
            <div className="bg-white p-4 border border-border shadow-lg">
               <div className="aspect-square bg-stone-100 flex items-center justify-center overflow-hidden">
                 {/* Google Maps Embed */}
                 <iframe 
                   src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.337236971118!2d78.95594489999999!3d12.950259299999997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bad6b087827aa4b%3A0x251c06481adad7f8!2sAMMAL%20FARM!5e0!3m2!1sen!2sin!4v1777537594540!5m2!1sen!2sin" 
                   className="w-full h-full border-0" 
                   allowFullScreen={true}
                   loading="lazy" 
                   referrerPolicy="no-referrer-when-downgrade"
                   title="Ammal Farm Location Map"
                 ></iframe>
               </div>
               <div className="mt-4 flex items-center justify-between text-[10px] uppercase font-bold tracking-widest text-stone-400">
                  <span>Vellore District</span>
                  <span>Tamil Nadu, India</span>
               </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
