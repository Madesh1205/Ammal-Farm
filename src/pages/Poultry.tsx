import { POULTRY, EGGS, whatsappNumber } from '../data';

export default function Poultry() {
  return (
    <section className="py-24 bg-white animate-in slide-in-from-bottom duration-700">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-16">
          <div className="space-y-4">
            <h1 className="text-4xl font-bold mb-8">Premium Poultry & Eggs in Tamil Nadu</h1>
            <p className="text-text-muted mb-8 text-sm max-w-md leading-relaxed">
              Searching for a <span className="font-bold text-accent">country chicken farm near me</span>? Ammal Farm provides high-quality free-range poultry, raised naturally in Tamil Nadu.
            </p>
            <div className="flex flex-col border-t border-border">
                {POULTRY.map((item) => (
                  <div key={item.name} className="flex justify-between items-center py-5 border-b border-border group">
                    <div className="flex gap-4 items-center">
                      <div className="w-12 h-12 overflow-hidden border border-border">
                        <img src={item.image} alt={item.altText} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                      </div>
                      <div>
                        <h4 className="font-bold text-sm tracking-tight">{item.name}</h4>
                        <p className="text-[11px] text-text-muted uppercase tracking-wider">{item.type}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className={`hidden sm:inline-block text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-sm ${item.status ? 'bg-amber-50 text-amber-900 border border-amber-200' : 'bg-stone-50 text-stone-500'}`}>
                        {item.status ? 'Seasonal' : 'Year Round'}
                      </span>
                      <a 
                        href={`https://wa.me/${whatsappNumber.replace(/\+/g, '')}?text=${encodeURIComponent(`i am intested in buying ${item.name} what wil be the price?`)}`}
                        target="_blank"
                        rel="no-referrer"
                        className="text-[10px] uppercase font-bold text-accent border-b border-accent hover:text-primary hover:border-primary transition-all"
                      >
                        Inquire
                      </a>
                    </div>
                  </div>
                ))}
            </div>
          </div>

          <div className="bg-primary p-10 text-white flex flex-col justify-between shadow-2xl">
            <div>
              <h3 className="text-2xl font-bold mb-10 flex items-center gap-3">
                Daily Fresh Selection
              </h3>
              <div className="space-y-8">
                <p className="text-stone-300 text-[11px] uppercase tracking-[0.2em] font-medium opacity-80 border-b border-white/10 pb-4 mb-8">
                  Available for daily retail purchase
                </p>
                {EGGS.map(egg => (
                  <div key={egg.name} className="border-l-2 border-accent/40 pl-6">
                    <p className="font-bold text-lg">{egg.name}</p>
                    <p className="text-accent/60 text-[10px] mb-2 uppercase tracking-widest font-bold">{egg.type}</p>
                    <p className="text-xs text-stone-300 italic">{egg.price}</p>
                  </div>
                ))}
              </div>
            </div>
            <a 
              href={`https://wa.me/${whatsappNumber.replace(/\+/g, '')}?text=${encodeURIComponent('Hi Ammal Farm, i am interested in buying some farm products. could you please share the latest price list?')}`}
              target="_blank"
              rel="no-referrer"
              className="mt-12 bg-accent py-4 text-center text-xs font-bold uppercase tracking-widest hover:bg-white hover:text-primary transition-all"
            >
              Order Now
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
