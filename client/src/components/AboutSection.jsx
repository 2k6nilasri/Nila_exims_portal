import React from 'react';
import { Shield, Building2, UserCheck, TrendingUp, Compass, Award } from 'lucide-react';

export const AboutSection = () => {
  return (
    <section id="about" className="py-20 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider">
            <Building2 className="w-3.5 h-3.5" />
            <span>About NILA EXIMS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Your Dedicated Partner in Global Import & Export Success
          </h2>
          <p className="text-base sm:text-lg text-slate-600 font-normal">
            Navigating cross-border trade regulations, customs compliance, and DGFT licensing with decades of domain expertise.
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Story & Details */}
          <div className="lg:col-span-7 space-y-6 text-slate-700 leading-relaxed">
            <h3 className="text-2xl font-bold text-slate-900 tracking-tight">
              Empowering Businesses to Trade Globally with Confidence
            </h3>

            <p>
              <strong>NILA EXIMS</strong> is a premier foreign trade consulting firm headquartered in Tiruppur — India’s world-renowned textile and garment export capital. Led by senior consultant <strong>T.S. Shankar Kumar (BBM)</strong>, NILA EXIMS provides specialized, turnkey solutions for manufacturers, merchant exporters, and importers across India.
            </p>

            <p>
              Foreign trade involves complex compliance requirements across Indian Customs (ICEGATE), the Directorate General of Foreign Trade (DGFT), Textile Commissionerate (TXC), Export Promotion Councils (AEPC, FIEO), and international accreditation bodies. NILA EXIMS bridges this gap by managing all documentation, license approvals, export incentive realization (ROSCTL, RODTEP), and customs registrations.
            </p>

            <div className="grid sm:grid-cols-2 gap-4 pt-4">
              <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-100 space-y-2">
                <div className="w-9 h-9 rounded-xl bg-emerald-800 text-white flex items-center justify-center font-bold">
                  <UserCheck className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-slate-900 text-base">Expert Leadership</h4>
                <p className="text-xs text-slate-600">
                  Direct guidance by T.S. Shankar Kumar (BBM) ensuring individualized care and accurate regulatory compliance.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-100 space-y-2">
                <div className="w-9 h-9 rounded-xl bg-emerald-800 text-white flex items-center justify-center font-bold">
                  <TrendingUp className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-slate-900 text-base">Maximized Export Rebates</h4>
                <p className="text-xs text-slate-600">
                  Unlocking full eligible financial returns under ROSCTL, RODTEP, duty drawbacks, and EPCG capital schemes.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Key Metrics & Credibility Box */}
          <div className="lg:col-span-5">
            <div className="p-8 rounded-3xl bg-slate-900 text-white shadow-2xl relative overflow-hidden space-y-8">
              <div className="absolute top-0 right-0 -mr-10 -mt-10 w-40 h-40 rounded-full bg-emerald-500/10 blur-2xl pointer-events-none" />

              <div className="space-y-2">
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest">Company Snapshot</span>
                <h4 className="text-2xl font-bold">NILA EXIMS</h4>
                <p className="text-xs text-slate-400">Import Export Consultant • Tiruppur - 641607</p>
              </div>

              <div className="space-y-4 divide-y divide-slate-800 text-sm">
                <div className="pt-2 flex justify-between items-center">
                  <span className="text-slate-400">Founded & Headed By:</span>
                  <span className="font-bold text-emerald-300">T.S. Shankar Kumar, BBM</span>
                </div>
                <div className="pt-3 flex justify-between items-center">
                  <span className="text-slate-400">Primary Services:</span>
                  <span className="font-bold text-white">14+ Foreign Trade Schemes</span>
                </div>
                <div className="pt-3 flex justify-between items-center">
                  <span className="text-slate-400">Core Industry Specialization:</span>
                  <span className="font-bold text-white">Apparel, Textiles & Multi-Sector</span>
                </div>
                <div className="pt-3 flex justify-between items-center">
                  <span className="text-slate-400">Turnaround Guarantee:</span>
                  <span className="font-bold text-emerald-400">Fast Track Customs Processing</span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-emerald-950/80 border border-emerald-500/30 text-xs text-emerald-200 leading-relaxed">
                "We handle the complexities of import-export documentation and DGFT schemes so you can focus 100% on growing your global business."
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default AboutSection;
