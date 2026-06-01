import React from 'react';
import { Shield, Eye, Lock, FileText, Globe } from 'lucide-react';

export default function Privacy() {
  return (
    <section className="py-24 bg-farm-cream min-h-screen animate-in fade-in duration-500">
      <div className="max-w-4xl mx-auto px-4">
        {/* Banner Section */}
        <div className="text-center mb-16">
          <div className="inline-flex p-3 bg-primary/5 rounded-full text-accent mb-4 border border-border">
            <Shield size={28} />
          </div>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-4 tracking-tight">
            Privacy Policy
          </h1>
          <p className="text-xs uppercase font-bold tracking-[0.3em] text-accent">
            Effective Date: June 1, 2026 | Ammal Farm
          </p>
        </div>

        {/* Content Box */}
        <div className="p-8 md:p-12 border border-border bg-white shadow-xl space-y-10 text-sm text-text-main leading-relaxed">
          
          <div className="border-b border-border pb-8">
            <h2 className="flex items-center gap-3 text-lg font-serif font-bold text-primary mb-4">
              <span className="text-accent"><Globe size={18} /></span>
              1. Introduction
            </h2>
            <p className="text-text-muted mb-4">
              At Ammal Farm, accessible from our official website, one of our main priorities is the privacy of our visitors. This Privacy Policy document contains types of information that is collected and recorded by Ammal Farm and how we use it.
            </p>
            <p className="text-text-muted">
              We operate a premier pedigree farm and high-quality livestock breeding facility located in Vellore, Tamil Nadu, India. If you have any additional questions or require more information about our Privacy Policy, do not hesitate to contact us.
            </p>
          </div>

          <div className="border-b border-border pb-8">
            <h2 className="flex items-center gap-3 text-lg font-serif font-bold text-primary mb-4">
              <span className="text-accent"><Eye size={18} /></span>
              2. Information We Collect
            </h2>
            <p className="text-text-muted mb-4">
              The personal information that you are asked to provide, and the reasons why you are asked to provide it, will be made clear to you at the point we ask you to provide your personal information.
            </p>
            <ul className="list-disc pl-5 space-y-2 text-text-muted">
              <li>
                <strong>Visit Appointment Form:</strong> When you register or schedule an appointment to visit our farm, we collect your name, phone number, designated date of arrival, and purpose of visit. This enables us to confirm access parameters ahead of time.
              </li>
              <li>
                <strong>Inquires:</strong> If you contact us directly via our customer support channels (such as WhatsApp, direct calls, or Instagram), we may receive additional information about you such as your contact information, the contents of your message, and any attachments you may send us.
              </li>
              <li>
                <strong>Device Information:</strong> We use standard privacy-respecting analytics tools to log basic device metadata, browser type, and navigation flow to optimize web layout performance and local page-load times.
              </li>
            </ul>
          </div>

          <div className="border-b border-border pb-8">
            <h2 className="flex items-center gap-3 text-lg font-serif font-bold text-primary mb-4">
              <span className="text-accent"><Lock size={18} /></span>
              3. How We Use Your Information
            </h2>
            <p className="text-text-muted mb-4">
              We use the collected information to operate, provide, maintain, and secure our online presence and farm onboarding systems, including to:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-text-muted">
              <li>Manage and confirm your pre-scheduled visits to Vellore Farm.</li>
              <li>Communicate directly with you regarding pricing, livestock health genetics, certificates, transport logs, and purchase receipts.</li>
              <li>Process your purchase inquires and guide safe, compliant live livestock transportation.</li>
              <li>Optimize user interface speed and design based on browser telemetry.</li>
              <li>Prevent unauthorized access to the admin site and protect database integrity.</li>
            </ul>
          </div>

          <div className="border-b border-border pb-8">
            <h2 className="flex items-center gap-3 text-lg font-serif font-bold text-primary mb-4">
              <span className="text-accent"><FileText size={18} /></span>
              4. Data Retention & Animal Regulations
            </h2>
            <p className="text-text-muted mb-4">
              As a professional livestock producer under Tamil Nadu agricultural directives, we archive transport records, pedigree history logs, trade bills, and vaccine records in accordance with India's animal welfare rules and local business compliance guidelines.
            </p>
            <p className="text-text-muted">
              Personal inquire data not linked to finalized transactions is cleared or anonymized unless required to prevent spam or handle ongoing scheduling issues.
            </p>
          </div>

          <div className="pb-4">
            <h2 className="text-lg font-serif font-bold text-primary mb-4">
              5. Consent
            </h2>
            <p className="text-text-muted">
              By using our website, you hereby consent to our Privacy Policy and agree to its terms. If you do not agree, please do not provide personal details through any embedded forms.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
