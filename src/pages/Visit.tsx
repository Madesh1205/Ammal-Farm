import { MapPin, Instagram } from 'lucide-react';
import { mapsLink } from '../data';

export default function Visit() {
  return (
    <section className="py-24 bg-farm-cream animate-in zoom-in duration-700">
      <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-12 items-start">
        <div className="p-12 border border-border bg-white shadow-xl">
          <h2 className="text-3xl font-serif font-bold mb-6">Schedule Application</h2>
          <p className="text-[13px] text-text-muted mb-8 italic">
            *Please wait for our confirmation callback before planning your arrival.
          </p>
          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[10px] uppercase font-bold tracking-widest text-text-muted">Full Name</label>
                <input type="text" className="w-full p-4 border border-border focus:border-primary outline-none transition-all text-sm" placeholder="John Doe" />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] uppercase font-bold tracking-widest text-text-muted">Phone Number</label>
                <input type="tel" className="w-full p-4 border border-border focus:border-primary outline-none transition-all text-sm" placeholder="+91..." />
              </div>
            </div>
            <div className="space-y-1">
              <label className="text-[10px] uppercase font-bold tracking-widest text-text-muted">Preferred Date</label>
              <input type="date" className="w-full p-4 border border-border focus:border-primary outline-none transition-all text-sm" />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] uppercase font-bold tracking-widest text-text-muted">Inquiry Type</label>
              <select className="w-full p-4 border border-border focus:border-primary outline-none transition-all text-sm appearance-none bg-stone-50">
                <option>Interested in buying Goats</option>
                <option>Bulk Poultry Inquiry</option>
                <option>Farm Visit Request</option>
              </select>
            </div>
            <button className="w-full bg-primary text-white py-5 font-bold text-xs uppercase tracking-widest hover:bg-accent transition-all shadow-lg">
              Submit Request
            </button>
          </form>
        </div>
        
        <div className="lg:pl-12">
          <h2 className="text-4xl font-bold mb-8">Visit The Farm</h2>
          <p className="text-text-muted mb-12 text-sm leading-relaxed max-w-md">
            Experience our sustainable practices firsthand. We welcome serious buyers and farming enthusiasts for scheduled tours. Our facility is maintained to the highest hygiene standards.
          </p>
          <div className="space-y-8">
            <div className="flex gap-4">
              <div className="p-3 bg-accent/10 rounded-lg">
                <MapPin className="text-accent" />
              </div>
              <div>
                <p className="text-[10px] uppercase font-bold text-text-muted mb-1 tracking-widest">Location</p>
                <a href={mapsLink} target="_blank" rel="no-referrer" className="text-sm font-bold hover:text-accent underline decoration-accent transition-all">Google Maps Guide</a>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="p-3 bg-accent/10 rounded-lg">
                <Instagram className="text-accent" />
              </div>
              <div>
                <p className="text-[10px] uppercase font-bold text-text-muted mb-1 tracking-widest">Social Updates</p>
                <a href="https://instagram.com/ammal_farm" target="_blank" rel="no-referrer" className="text-sm font-bold text-primary hover:text-accent transition-colors">@ammal_farm</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
