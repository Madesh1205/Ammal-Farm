import { motion } from 'motion/react';
import { GOATS, whatsappNumber } from '../data';

export default function Livestock() {
  return (
    <section className="py-24 animate-in fade-in duration-700">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid lg:grid-cols-[1fr_2fr] gap-16">
          <div className="lg:sticky lg:top-32 h-fit">
            <h2 className="text-4xl font-bold mb-6">Specialty <br/>Breeds</h2>
            <p className="text-text-muted mb-8 text-sm leading-relaxed">
              Inquiry-based pricing ensures you get the best current market value for elite, healthy livestock.
            </p>
            <div className="p-6 bg-primary text-white border-l-4 border-accent">
              <p className="text-[10px] uppercase tracking-widest font-bold mb-4 opacity-70">Our Strategy</p>
              <p className="text-sm italic">Superior genetics and natural rearing practices for robustness.</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {GOATS.map((goat) => (
              <motion.div 
                key={goat.id} 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-white border border-border p-6 flex flex-col group"
              >
                <span className="text-[10px] uppercase font-bold text-accent tracking-widest mb-4">Featured Breed</span>
                <div className="aspect-square overflow-hidden mb-6 bg-stone-50">
                  <img src={goat.image} alt={goat.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" referrerPolicy="no-referrer" />
                </div>
                <h3 className="text-2xl font-bold mb-2">{goat.name}</h3>
                <p className="text-[13px] text-text-muted leading-relaxed mb-8 flex-grow">
                  {goat.description}
                </p>
                <a 
                  href={`https://wa.me/${whatsappNumber}?text=Hi, I am interested in ${goat.name} goats.`}
                  target="_blank"
                  rel="no-referrer"
                  className="block w-full py-4 bg-primary text-white text-center text-xs font-bold uppercase tracking-widest hover:bg-accent transition-colors"
                >
                  Contact for Pricing
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
