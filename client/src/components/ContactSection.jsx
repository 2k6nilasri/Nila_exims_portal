import React from 'react';
import { Phone, Mail, User, MessageSquare, ArrowRight, ShieldCheck, MapPin } from 'lucide-react';

export const ContactSection = () => {
  const phoneNum = "9443735942";
  const displayPhone = "94437 35942";
  const emailAddr = "nilaexims@gmail.com";
  const whatsappUrl = `https://wa.me/91${phoneNum}?text=${encodeURIComponent("Hello NILA EXIMS, I would like to inquire about import-export consultancy services.")}`;

  return (
    <section id="contact" className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider">
            <User className="w-4 h-4 text-emerald-700" />
            <span>Direct Consultant Contact</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Get in Touch with T.S. Shankar Kumar
          </h2>
          <p className="text-slate-600 text-base sm:text-lg">
            Have questions about your export claims or DGFT licensing? Contact our principal consultant directly.
          </p>
        </div>

        {/* Contact Cards Grid */}
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          
          {/* Phone Card */}
          <div className="p-8 rounded-3xl bg-slate-50 border border-slate-200/80 hover:border-emerald-500 shadow-sm hover:shadow-xl transition-all duration-300 text-center space-y-4 group">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-800 to-green-600 text-white mx-auto flex items-center justify-center shadow-md shadow-emerald-900/10 group-hover:scale-110 transition-transform">
              <Phone className="w-8 h-8" />
            </div>
            <div>
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Call Directly</span>
              <h3 className="text-xl font-extrabold text-slate-900 mt-1">{displayPhone}</h3>
              <p className="text-xs text-slate-500 mt-1">T.S. Shankar Kumar, BBM</p>
            </div>
            <a
              href={`tel:${phoneNum}`}
              className="inline-flex items-center justify-center gap-2 w-full py-3 bg-emerald-800 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-md transition-all"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Click to Call Now</span>
            </a>
          </div>

          {/* Email Card */}
          <div className="p-8 rounded-3xl bg-slate-50 border border-slate-200/80 hover:border-emerald-500 shadow-sm hover:shadow-xl transition-all duration-300 text-center space-y-4 group">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-800 to-green-600 text-white mx-auto flex items-center justify-center shadow-md shadow-emerald-900/10 group-hover:scale-110 transition-transform">
              <Mail className="w-8 h-8" />
            </div>
            <div>
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Send Email</span>
              <h3 className="text-lg font-extrabold text-slate-900 mt-1 break-all">{emailAddr}</h3>
              <p className="text-xs text-slate-500 mt-1">Official Consultancy Inbox</p>
            </div>
            <a
              href={`mailto:${emailAddr}`}
              className="inline-flex items-center justify-center gap-2 w-full py-3 bg-emerald-800 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-md transition-all"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>Click to Email Us</span>
            </a>
          </div>

          {/* WhatsApp Card */}
          <div className="p-8 rounded-3xl bg-slate-50 border border-slate-200/80 hover:border-emerald-500 shadow-sm hover:shadow-xl transition-all duration-300 text-center space-y-4 group">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-600 to-green-500 text-white mx-auto flex items-center justify-center shadow-md shadow-emerald-900/10 group-hover:scale-110 transition-transform">
              <MessageSquare className="w-8 h-8" />
            </div>
            <div>
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Instant Chat</span>
              <h3 className="text-xl font-extrabold text-slate-900 mt-1">WhatsApp Chat</h3>
              <p className="text-xs text-slate-500 mt-1">Quick Trade Inquiry</p>
            </div>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow-md transition-all"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Chat on WhatsApp</span>
            </a>
          </div>

        </div>

      </div>
    </section>
  );
};

export default ContactSection;
