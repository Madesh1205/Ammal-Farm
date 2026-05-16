import React, { useState } from 'react';
import { FaMapMarkerAlt, FaInstagram, FaWhatsapp, FaPhone, FaCheckCircle } from 'react-icons/fa';
import { mapsLink, whatsappNumber } from '../data';
import { db, handleFirestoreError, OperationType } from '../lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export default function Visit() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    date: '',
    type: ''
  });

  const [phoneError, setPhoneError] = useState('');

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 10);
    setFormData({ ...formData, phone: value });
    if (value.length > 0 && value.length < 10) {
      setPhoneError('Must be 10 digits');
    } else {
      setPhoneError('');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.phone.length !== 10) {
      setPhoneError('Please enter a valid 10-digit number');
      return;
    }
    setLoading(true);
    
    try {
      const path = 'visitRequests';
      await addDoc(collection(db, path), {
        ...formData,
        fullPhone: `+91${formData.phone}`,
        createdAt: serverTimestamp()
      });
      setSubmitted(true);
      setFormData({ name: '', phone: '', date: '', type: '' });
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, 'visitRequests');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-24 bg-farm-cream animate-in zoom-in duration-700">
      <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-12 items-start">
        <div className="p-12 border border-border bg-white shadow-xl min-h-[500px] flex flex-col">
          {submitted ? (
            <div className="flex-1 flex flex-col items-center justify-center text-center animate-in fade-in zoom-in duration-500">
              <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center text-green-500 mb-6">
                <FaCheckCircle size={40} />
              </div>
              <h2 className="text-3xl font-serif font-bold mb-4">Request Received</h2>
              <p className="text-text-muted text-sm leading-relaxed max-w-xs mx-auto mb-8">
                Thank you for your interest. We will review your application and get back to you shortly via phone for confirmation.
              </p>

              <div className="flex flex-col gap-3 w-full">
                <a 
                  href={`https://wa.me/${whatsappNumber.replace(/\+/g, '')}?text=${encodeURIComponent(`Hi Ammal Farm, I just submitted a visit request on your website. Name: ${formData.name}, Date: ${formData.date}.`)}`}
                  target="_blank"
                  rel="no-referrer"
                  className="w-full py-4 bg-[#25D366] text-white text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 hover:opacity-90 transition-all rounded-sm shadow-lg shadow-[#25D366]/20"
                >
                  <FaWhatsapp size={16} /> Notify via WhatsApp
                </a>
                
                <button 
                  onClick={() => setSubmitted(false)}
                  className="mt-4 text-[10px] uppercase font-bold tracking-widest text-stone-400 hover:text-primary transition-all"
                >
                  Send another request
                </button>
              </div>
            </div>
          ) : (
            <>
              <h2 className="text-3xl font-serif font-bold mb-6">Schedule Application</h2>
              <p className="text-[13px] text-text-muted mb-8 italic">
                *Please wait for our confirmation callback before planning your arrival.
              </p>
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-bold tracking-widest text-text-muted">Full Name</label>
                    <input 
                      required 
                      type="text" 
                      className="w-full p-4 border border-border focus:border-primary outline-none transition-all text-sm" 
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-bold tracking-widest text-text-muted">Phone Number</label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm font-bold text-text-muted">+91</span>
                      <input 
                        required 
                        type="tel" 
                        pattern="[0-9]{10}"
                        className={`w-full p-4 pl-12 border ${phoneError ? 'border-red-500' : 'border-border'} focus:border-primary outline-none transition-all text-sm`}
                        placeholder="9876543210" 
                        value={formData.phone}
                        onChange={handlePhoneChange}
                      />
                    </div>
                    {phoneError && <p className="text-[10px] text-red-500 mt-1 font-bold uppercase tracking-wider">{phoneError}</p>}
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-bold tracking-widest text-text-muted">Preferred Date</label>
                  <input 
                    required 
                    type="date" 
                    className="w-full p-4 border border-border focus:border-primary outline-none transition-all text-sm"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-bold tracking-widest text-text-muted">Inquiry Type</label>
                  <select 
                    required 
                    className="w-full p-4 border border-border focus:border-primary outline-none transition-all text-sm appearance-none bg-stone-50"
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  >
                    <option value="">Select an option</option>
                    <option>Interested in buying Goats</option>
                    <option>Poultry Inquiry</option>
                    <option>Farm Visit Request</option>
                  </select>
                </div>
                <button 
                  disabled={loading}
                  className="w-full bg-primary text-white py-5 font-bold text-xs uppercase tracking-widest hover:bg-accent transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                >
                  {loading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      Processing...
                    </>
                  ) : 'Submit Request'}
                </button>
              </form>
            </>
          )}
        </div>
        
        <div className="lg:pl-12">
          <h2 className="text-4xl font-bold mb-8 uppercase tracking-tight">Visit Ammal Farm</h2>
          <p className="text-text-muted mb-12 text-sm leading-relaxed max-w-xl">
            Experience the best <span className="font-bold text-accent">goat farm in Tamil Nadu</span> firsthand. We welcome serious buyers, fellow farmers, and families looking for a <span className="font-bold text-accent">goat farm near me</span> for weekend visits. Our facility in Vellore district follows natural rearing practices that define our quality.
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

            <a href={`https://wa.me/${whatsappNumber.replace(/\+/g, '')}?text=${encodeURIComponent('Hi Ammal Farm, i would like to schedule a visit or have a query about your livestock.')}`} target="_blank" rel="no-referrer" className="flex gap-4 items-center group cursor-pointer p-2 -ml-2 rounded-xl hover:bg-stone-50 transition-all duration-300">
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
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.337236971118!2d78.95594489999999!3d12.950259299999997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bad6b087827aa4b%3A0x251c06481adad7f8!2sAMMAL%20FARM!5e0!3m2!1sen!2sin!4v1777537594540!5m2!1sen!2sin" 
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
