import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import HeroCarousel from '../components/HeroCarousel';
import GalleryCarousel from '../components/GalleryCarousel';

export default function Home() {
  return (
    <div className="overflow-hidden">
      {/* Hero Carousel Segment */}
      <HeroCarousel />

      <section className="pt-24 pb-12 px-4 shadow-inner bg-stone-50/50">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-sm font-bold uppercase tracking-[0.3em] text-accent mb-6">Our Heritage</h2>
            <h3 className="text-5xl font-bold leading-[0.9] mb-8 text-primary uppercase tracking-tighter">
              Legacy of <br />
              <span className="italic font-normal">Authenticity.</span>
            </h3>
            <p className="text-text-muted text-base mb-10 max-w-lg mx-auto leading-relaxed font-medium">
              Since our inception, Ammal Farm has been a dedicated livestock producer bridging the gap between quality breeds and demanding farmers. Our commitment to animal welfare and transparent practices makes us the preferred choice in Tamil Nadu.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/visit" className="border-2 border-primary text-primary px-10 py-5 font-bold uppercase tracking-widest text-xs hover:bg-white transition-all">
                Schedule a Visit
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Gallery Carousel */}
      <GalleryCarousel />

      {/* Gallery Call to Action */}
      <section className="py-24 bg-stone-900 overflow-hidden relative">
        <div className="absolute inset-0 opacity-20">
          <img 
            src="https://dlugisbcds8fnzdn.public.blob.vercel-storage.com/images/nellore-judipi.jpg" 
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover" 
          />
        </div>
        <div className="max-w-7xl mx-auto px-4 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-sm font-bold uppercase tracking-[0.5em] text-accent mb-6">Our Visual Journey</h2>
            <h3 className="text-4xl md:text-6xl font-bold text-white tracking-tighter uppercase mb-10">
              Explore Life at <br />
              <span className="italic font-normal text-stone-400">Ammal Farm</span>
            </h3>
            <Link 
              to="/gallery" 
              className="inline-block bg-white text-primary px-12 py-5 font-bold uppercase tracking-widest text-xs hover:bg-accent hover:text-white transition-all shadow-2xl"
            >
              View Full Gallery
            </Link>
          </motion.div>
        </div>
      </section>

      <section className="py-24 px-4 bg-white">
        {/* Local SEO Section */}
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1">
              <h2 className="text-4xl font-bold tracking-tight mb-8 text-primary uppercase">
                Premier Livestock Producer in Tamil Nadu – Ammal Farm
              </h2>
              <div className="space-y-6 text-stone-600 leading-relaxed text-sm">
                <p>
                  If you are searching for a <strong>trusted livestock producer</strong>, Ammal Farm is a premier choice in <strong>Tamil Nadu</strong>. 
                  Our farm is strategically located in the heart of the region, serving livestock buyers in <strong>Vellore, Chennai, and nearby districts</strong>. 
                  We specialize in breeding and selling healthy, high-yield livestock including the majestic <strong>Nellore Judipi</strong> and the resilient <strong>Salem Black</strong> goats.
                </p>
                <div className="pt-6">
                   <Link to="/visit" className="text-accent font-bold uppercase tracking-widest text-xs border-b-2 border-accent pb-1 hover:text-primary hover:border-primary transition-all">
                     Visit our farm in Tamil Nadu
                   </Link>
                </div>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <div className="bg-stone-50 p-4 border border-border shadow-lg">
                 <div className="aspect-video bg-stone-100 flex items-center justify-center overflow-hidden">
                   <iframe 
                     src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.337236971118!2d78.95594489999999!3d12.950259299999997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bad6b087827aa4b%3A0x251c06481adad7f8!2sAMMAL%20FARM!5e0!3m2!1sen!2sin!4v1777537594540!5m2!1sen!2sin" 
                     className="w-full h-full border-0" 
                     allowFullScreen={true}
                     loading="lazy" 
                     referrerPolicy="no-referrer-when-downgrade"
                     title="Ammal Farm Location Map"
                   ></iframe>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

