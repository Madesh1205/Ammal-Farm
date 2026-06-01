import { motion } from 'motion/react';
import { GOATS, whatsappNumber } from '../data';

export default function Livestock() {
  return (
    <section className="py-24 animate-in fade-in duration-700">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid lg:grid-cols-[1fr_2fr] gap-16">
          <div className="lg:sticky lg:top-32 h-fit">
            <h2 className="text-4xl font-bold mb-6">Specialty <br/>Selection</h2>
            <p className="text-text-muted mb-8 text-sm leading-relaxed">
              As a premier livestock producer, we ensure you get the best market value for elite, healthy breeds through inquire-based pricing.
            </p>
            <div className="p-6 bg-primary text-white border-l-4 border-accent">
              <p className="text-[10px] uppercase tracking-widest font-bold mb-4 opacity-70">Our Strategy</p>
              <p className="text-sm italic">Superior genetics and natural rearing practices for robustness.</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {GOATS.filter(g => g.status === 'available').map((goat) => (
              <motion.div 
                key={goat.id} 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-white border border-border p-6 flex flex-col group"
              >
                <div className="flex justify-between items-center mb-4">
                  <span className="text-[10px] uppercase font-bold text-accent tracking-widest">Featured Selection</span>
                  <div className="flex gap-1">
                    {goat.tags.map((tag) => (
                      <span key={tag} className="text-[8px] bg-stone-100 text-stone-550 border border-stone-200 px-1.5 py-0.5 uppercase font-bold font-mono tracking-tight">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="aspect-square overflow-hidden mb-6 bg-stone-50 block">
                  <img 
                    src={goat.image} 
                    alt={goat.altText} 
                    width={500}
                    height={500}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500" 
                    referrerPolicy="no-referrer" 
                  />
                </div>
                <h3 className="text-2xl font-bold mb-2">{goat.name}</h3>
                <p className="text-[13px] text-text-muted leading-relaxed mb-8 flex-grow">
                  {goat.description}
                </p>
                
                <div className="flex flex-col gap-2.5">
                  <a 
                    href={`https://wa.me/${whatsappNumber.replace(/\+/g, '')}?text=${encodeURIComponent(`i am intested in buying ${goat.name} what wil be the price?`)}`}
                    target="_blank"
                    rel="no-referrer"
                    className="block w-full py-3.5 bg-primary text-white text-center text-xs font-bold uppercase tracking-widest hover:bg-accent transition-colors"
                  >
                    Contact for Pricing
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
