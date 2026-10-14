import React, { useState } from 'react';
import { ArrowRight, Globe, ShieldCheck, Award, Phone, Mail, FileText, CheckCircle2, Eye, Sparkles } from 'lucide-react';
import Logo from './Logo';

export const HeroBanner = ({ onOpenAuth, onNavigateSection }) => {
  const [showImageModal, setShowImageModal] = useState(false);

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-900 via-emerald-950 to-slate-900 text-white pt-12 pb-24 md:pt-16 md:pb-32">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-10 w-96 h-96 bg-green-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Brand Headline & CTA */}
          <div className="lg:col-span-7 space-y-6 text-left">
            
            {/* Top Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 backdrop-blur-md">
              <Sparkles className="w-4 h-4 text-emerald-400 animate-pulse" />
              <span className="text-xs font-bold text-emerald-300 tracking-wide uppercase">
                Licensed Import & Export Consultancy Firm
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.15]">
              NILA EXIMS <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 via-green-300 to-emerald-200">
                Import Export Consultant
              </span>
            </h1>

            {/* Tagline & Pillars */}
            <div className="space-y-3">
              <p className="text-lg sm:text-xl font-bold tracking-widest text-emerald-400 uppercase">
                YOUR TRUSTED TRADE PARTNER
              </p>
              
              {/* Core Pillars Pills */}
              <div className="flex flex-wrap gap-2 pt-1">
                {['EXPORT', 'IMPORT', 'CONSULT', 'DELIVER'].map((item) => (
                  <span key={item} className="px-3 py-1 bg-white/10 border border-white/15 text-slate-200 text-xs font-bold rounded-lg tracking-wider">
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <p className="text-base sm:text-lg text-slate-300 max-w-2xl font-normal leading-relaxed">
              Simplifying global trade for manufacturers and merchants. Specialized DGFT licensing, 
              customs clearances, ROSCTL/RODTEP rebates, EPCG schemes, and ICEGATE registration.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button
                onClick={() => onNavigateSection('#request-section')}
                className="px-7 py-4 text-base font-bold text-slate-950 bg-gradient-to-r from-emerald-400 via-green-400 to-emerald-300 hover:from-emerald-300 hover:to-green-300 rounded-2xl shadow-xl shadow-emerald-500/20 flex items-center justify-center gap-2 group transition-all transform hover:-translate-y-0.5"
              >
                <span>Submit Service Request</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => onNavigateSection('#services')}
                className="px-7 py-4 text-base font-bold text-white bg-white/10 hover:bg-white/20 border border-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center gap-2 transition-all"
              >
                <span>Explore Services</span>
              </button>
            </div>

            {/* Contact Quick Info Bar */}
            <div className="pt-6 border-t border-white/10 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-slate-300">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-semibold text-white">T.S. Shankar Kumar (BBM)</div>
                  <a href="tel:9443735942" className="text-emerald-400 hover:underline font-bold">+91 94437 35942</a>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-semibold text-white">Email Us Directly</div>
                  <a href="mailto:nilaexims@gmail.com" className="text-emerald-400 hover:underline font-bold">nilaexims@gmail.com</a>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Professional Banner Card featuring Visiting Card & Globe Logo */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none group">
              
              {/* Glow backdrop */}
              <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-emerald-500 to-green-400 opacity-30 group-hover:opacity-50 blur-xl transition-all duration-500" />

              {/* Main Card Container */}
              <div className="relative bg-slate-900/90 border border-emerald-500/30 backdrop-blur-xl rounded-3xl p-4 shadow-2xl overflow-hidden">
                
                {/* Official Visiting Card Image Banner */}
                <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-lg group/img">
                  <img
                    src="/images/nilaexims_visiting_card.png"
                    alt="NILA EXIMS Official Visiting Card"
                    className="w-full h-auto object-cover transform group-hover/img:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-0 group-hover/img:opacity-100 transition-opacity flex items-end justify-center p-4">
                    <button
                      onClick={() => setShowImageModal(true)}
                      className="px-4 py-2 bg-emerald-600/90 hover:bg-emerald-600 text-white font-bold text-xs rounded-xl backdrop-blur-md flex items-center gap-2 shadow-lg transition-all"
                    >
                      <Eye className="w-4 h-4" />
                      <span>View Full Visiting Card Banner</span>
                    </button>
                  </div>
                </div>

                {/* Info Card Sub-header */}
                <div className="mt-4 p-3 bg-white/5 rounded-xl border border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Globe className="w-5 h-5 text-emerald-400" />
                    <span className="text-xs font-bold text-slate-200">Tiruppur Export Hub Office</span>
                  </div>
                  <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/20 px-2 py-0.5 rounded-full border border-emerald-500/30">
                    VERIFIED
                  </span>
                </div>

                {/* Quick Trust Highlights */}
                <div className="mt-3 grid grid-cols-2 gap-2 text-[11px] text-slate-300">
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>Fast DGFT & Customs Approval</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>Expert Consultancy</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>End-to-End Documentation</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>Incentives Monetization</span>
                  </div>
                </div>

              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Image Modal for Viewing Visiting Card Full Screen */}
      {showImageModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md">
          <div className="relative max-w-4xl w-full bg-slate-900 border border-slate-800 rounded-3xl p-4 overflow-hidden shadow-2xl">
            <button
              onClick={() => setShowImageModal(false)}
              className="absolute top-4 right-4 z-10 w-9 h-9 bg-slate-800 text-white hover:bg-rose-600 rounded-full flex items-center justify-center transition-colors"
            >
              ✕
            </button>
            <div className="p-2">
              <img
                src="/images/nilaexims_visiting_card.png"
                alt="NILA EXIMS Visiting Card Full View"
                className="w-full h-auto rounded-xl object-contain"
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default HeroBanner;
