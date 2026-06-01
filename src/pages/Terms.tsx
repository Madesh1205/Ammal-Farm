import React from 'react';
import { FileCheck, BookOpen, AlertCircle, Sparkles, MapPin } from 'lucide-react';
import { whatsappNumber, mapsLink } from '../data';

export default function Terms() {
  return (
    <section className="py-24 bg-farm-cream min-h-screen animate-in fade-in duration-500">
      <div className="max-w-4xl mx-auto px-4">
        {/* Banner Section */}
        <div className="text-center mb-16">
          <div className="inline-flex p-3 bg-primary/5 rounded-full text-accent mb-4 border border-border">
            <FileCheck size={28} />
          </div>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-4 tracking-tight">
            Terms of Service
          </h1>
          <p className="text-xs uppercase font-bold tracking-[0.3em] text-accent">
            Last Updated: June 1, 2026 | Ammal Farm
          </p>
        </div>

        {/* Content Box */}
        <div className="p-8 md:p-12 border border-border bg-white shadow-xl space-y-10 text-sm text-text-main leading-relaxed">
          
          <div className="border-b border-border pb-8">
            <h2 className="flex items-center gap-3 text-lg font-serif font-bold text-primary mb-4">
              <span className="text-accent"><BookOpen size={18} /></span>
              1. Acceptance of Terms
            </h2>
            <p className="text-text-muted mb-4">
              By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement. Any participation in this site and our physical farm operations will constitute acceptance of this agreement.
            </p>
            <p className="text-text-muted">
              If you do not agree to abide by the above, please do not use this services, submit visit scheduling requests, or finalize transactions based on online pricing indicators.
            </p>
          </div>

          <div className="border-b border-border pb-8">
            <h2 className="flex items-center gap-3 text-lg font-serif font-bold text-primary mb-4">
              <span className="text-accent"><MapPin size={18} /></span>
              2. Mandatory Prior Appointments for Visits
            </h2>
            <p className="text-text-muted mb-4">
              Ammal Farm is a bio-secure, natural breeding and rearing facility dedicated to elite livestock linebreeding. To ensure herd biosecurity and optimal staff deployment:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-text-muted">
              <li>
                <strong>No Walk-Ins:</strong> Physical farm visits are strictly restricted to serious buyers, peer breeders, and agricultural operators with confirmed pre-scheduled appointments.
              </li>
              <li>
                <strong>Appointment Approval:</strong> Submit your request via our physical scheduling system on our visit section. All appointments are considered tentative until a farm officer contacts you back via phone or WhatsApp to finalize your slot.
              </li>
              <li>
                <strong>Bio-Security Protocols:</strong> Visitors are required to follow all sanitation directions, vehicle wash instructions, and designated paths upon arriving at our facility in Vellore, Tamil Nadu.
              </li>
            </ul>
          </div>

          <div className="border-b border-border pb-8">
            <h2 className="flex items-center gap-3 text-lg font-serif font-bold text-primary mb-4">
              <span className="text-accent"><AlertCircle size={18} /></span>
              3. Pricing and Inquire-Based Sales
            </h2>
            <p className="text-text-muted mb-4">
              Due to natural biological variances, age progress, genetics line pedigree, and changing seasonal dynamics, all livestock (such as Nellore Jodipi and Salem Black goats) and poultry products are sold on an <strong>inquire-based custom quote model</strong>.
            </p>
            <ul className="list-disc pl-5 space-y-2 text-text-muted">
              <li>
                Any pricing range indicated verbally or digitally constitutes a situational estimate. Final quotations are fixed upon formal physical inspection or explicit booking agreements on direct communications channels (WhatsApp/Phone call).
              </li>
              <li>
                Booking deposits are required for securing elite stock lines. Details on refund eligibility of booking fees vary strictly on customized agreements and will be transparently discussed prior to payment.
              </li>
            </ul>
          </div>

          <div className="border-b border-border pb-8">
            <h2 className="flex items-center gap-3 text-lg font-serif font-bold text-primary mb-4">
              <span className="text-accent"><Sparkles size={18} /></span>
              4. Animal Health, Pedigree & Care
            </h2>
            <p className="text-text-muted mb-4">
              At Ammal Farm, we maintain top-tier animal welfare standards. Each goat is organically reared under free-grazing structures, dewormed regularly, and protected under verified vaccines (PPR, ET).
            </p>
            <ul className="list-disc pl-5 space-y-2 text-text-muted">
              <li>
                <strong>At-Sale Representation:</strong> All livestock are transferred to buyers in a healthy state, validated by physical inspection. Buyers must physically inspect animals on-site or request comprehensive video assessments before dispatch.
              </li>
              <li>
                <strong>Post-Transfer Clause:</strong> As we have no influence over husbandry methods, bio-security, or stress management once animals leave our custody, post-sale acclimatization and survival rates remain solely the buyer's liability.
              </li>
            </ul>
          </div>

          <div className="pb-4">
            <h2 className="text-lg font-serif font-bold text-primary mb-4">
              5. Contact Us
            </h2>
            <p className="text-text-muted mb-4">
              For any clarifications, operational queries, or detailed contract templates regarding pedigree booking schemes, feel free to reach out directly to our dedicated management team:
            </p>
            <div className="bg-stone-50 p-6 rounded-lg space-y-2 border border-border">
              <p className="font-bold text-primary">Ammal Farm Support</p>
              <p className="text-text-muted">Phone / WhatsApp: <a href={`tel:${whatsappNumber}`} className="text-accent hover:underline">{whatsappNumber}</a></p>
              <p className="text-text-muted">Site Location: <a href={mapsLink} target="_blank" rel="no-referrer" className="text-accent hover:underline">Vellore District, Tamil Nadu, India</a></p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
