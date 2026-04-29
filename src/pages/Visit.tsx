import { FaMapMarkerAlt, FaInstagram, FaWhatsapp, FaPhone } from 'react-icons/fa';
import { mapsLink, whatsappNumber } from '../data';

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
          <div className="space-y-6">
            <a href={mapsLink} target="_blank" rel="no-referrer" className="flex gap-4 items-center group cursor-pointer p-2 -ml-2 rounded-xl hover:bg-stone-50 transition-all duration-300">
              <div className="p-4 bg-[#4285F4]/10 rounded-xl text-[#4285F4] group-hover:scale-110 transition-transform duration-300">
                <FaMapMarkerAlt size={24} />
              </div>
              <div>
                <p className="text-[10px] uppercase font-bold tracking-widest text-[#4285F4] mb-1">Google Maps</p>
                <div className="text-sm font-bold group-hover:underline decoration-[#4285F4]">View Farm Directions</div>
              </div>
            </a>

            <a href="https://instagram.com/ammal_farm" target="_blank" rel="no-referrer" className="flex gap-4 items-center group cursor-pointer p-2 -ml-2 rounded-xl hover:bg-stone-50 transition-all duration-300">
              <div className="p-4 bg-[#E4405F]/10 rounded-xl text-[#E4405F] group-hover:scale-110 transition-transform duration-300">
                <FaInstagram size={24} />
              </div>
              <div>
                <p className="text-[10px] uppercase font-bold tracking-widest text-[#E4405F] mb-1">Official Instagram</p>
                <div className="text-sm font-bold text-primary group-hover:underline decoration-[#E4405F]">@ammal_farm</div>
              </div>
            </a>

            <a href={`https://wa.me/${whatsappNumber.replace(/\+/g, '')}`} target="_blank" rel="no-referrer" className="flex gap-4 items-center group cursor-pointer p-2 -ml-2 rounded-xl hover:bg-stone-50 transition-all duration-300">
              <div className="p-4 bg-[#25D366]/10 rounded-xl text-[#25D366] group-hover:scale-110 transition-transform duration-300">
                <FaWhatsapp size={24} />
              </div>
              <div>
                <p className="text-[10px] uppercase font-bold tracking-widest text-[#25D366] mb-1">Direct Chat</p>
                <div className="text-sm font-bold text-primary group-hover:underline decoration-[#25D366]">Support on WhatsApp</div>
              </div>
            </a>

            <a href={`tel:${whatsappNumber}`} className="flex gap-4 items-center group cursor-pointer p-2 -ml-2 rounded-xl hover:bg-stone-50 transition-all duration-300">
              <div className="p-4 bg-primary/10 rounded-xl text-primary group-hover:scale-110 transition-transform duration-300">
                <FaPhone size={24} />
              </div>
              <div>
                <p className="text-[10px] uppercase font-bold tracking-widest text-primary mb-1">Call Us Directly</p>
                <div className="text-sm font-bold text-primary group-hover:underline decoration-primary">{whatsappNumber}</div>
              </div>
            </a>
          </div>

          <div className="mt-12 h-[300px] w-full border border-border shadow-sm">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.337236971118!2d78.95594489999999!3d12.950259299999997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bad6b087827aa4b%3A0x251c06481adad7f8!2sAMMAL%20FARM!5e0!3m2!1sen!2sin!4v1777397210576!5m2!1sen!2sin" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
}
