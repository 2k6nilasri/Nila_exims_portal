import React from 'react';
import { Handshake, Zap, Award, FileCheck, CheckCircle2, Shield } from 'lucide-react';

export const WhyUsSection = () => {
  const benefits = [
    {
      title: 'Trusted Trade Partner',
      description: 'Over years of proven integrity serving textile exporters, garment units, and multinational traders with transparent guidance.',
      icon: Handshake,
      badge: 'Core Value'
    },
    {
      title: 'Fast & Hassle-Free Processing',
      description: 'Rapid 24-48 hour turnaround on DGFT applications, ICEGATE registrations, and RODTEP/ROSCTL scrip generation.',
      icon: Zap,
      badge: 'Speed'
    },
    {
      title: 'Expert Consultancy',
      description: 'Direct consultation by T.S. Shankar Kumar (BBM), offering tailored strategies for duty optimization and regulatory compliance.',
      icon: Award,
      badge: 'Expertise'
    },
    {
      title: 'Reliable Documentation',
      description: 'Zero-error filing of shipping bills, advance licenses, EPCG clearances, and certificates of origin to eliminate customs holds.',
      icon: FileCheck,
      badge: 'Accuracy'
    }
  ];

  return (
    <section id="why-us" className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider">
            <Shield className="w-4 h-4 text-emerald-700" />
            <span>Why Choose Us</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Why Exporters & Importers Choose NILA EXIMS
          </h2>
          <p className="text-slate-600 text-base sm:text-lg">
            We simplify global trade logistics and maximize your export incentives with precision and speed.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="p-8 rounded-3xl bg-slate-50 hover:bg-gradient-to-b hover:from-emerald-50 hover:to-emerald-100/50 border border-slate-200/80 hover:border-emerald-300 shadow-sm hover:shadow-xl transition-all duration-300 group flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-800 to-green-600 text-white flex items-center justify-center shadow-md shadow-emerald-900/10 group-hover:scale-110 transition-transform">
                      <Icon className="w-7 h-7" />
                    </div>
                    <span className="text-[10px] font-bold px-2.5 py-1 bg-white text-emerald-800 rounded-full border border-slate-200 uppercase tracking-wide">
                      {item.badge}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 group-hover:text-emerald-800 transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-slate-200/60 flex items-center gap-1.5 text-xs font-bold text-emerald-700">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Guaranteed Excellence</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default WhyUsSection;
