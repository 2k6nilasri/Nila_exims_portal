import React, { useState } from 'react';
import { servicesList } from '../data/servicesData';
import ServiceDetailModal from './ServiceDetailModal';
import { 
  FileText, Percent, Coins, ShieldCheck, Network, Globe, Award, BadgeCheck, 
  CheckCircle2, Shirt, Briefcase, Layers, Zap, FileCheck, ArrowRight, Search, Sparkles 
} from 'lucide-react';

const iconMap = {
  FileText: FileText,
  Percent: Percent,
  Coins: Coins,
  ShieldCheck: ShieldCheck,
  Network: Network,
  Globe: Globe,
  Award: Award,
  BadgeCheck: BadgeCheck,
  CheckCircle2: CheckCircle2,
  Shirt: Shirt,
  Briefcase: Briefcase,
  Layers: Layers,
  Zap: Zap,
  FileCheck: FileCheck,
};

export const ServicesSection = ({ onRequestService }) => {
  const [selectedService, setSelectedService] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', 'Trade Documentation', 'Government Incentive', 'Licensing & Incentives', 'Port & Customs', 'Customs Certification', 'Council Registration', 'Core DGFT License'];

  const filteredServices = servicesList.filter((service) => {
    const matchesSearch = service.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          service.shortDesc.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === 'All' || service.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <section id="services" className="py-24 bg-slate-50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-4 h-4 text-emerald-600" />
            <span>Comprehensive Consulting Portfolio</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Our Import & Export Consultancy Services
          </h2>
          <p className="text-slate-600 text-base sm:text-lg">
            Complete DGFT licensing, customs authorization, export rebate claims, and compliance management under one roof. Click any service card for complete details.
          </p>

          {/* Search & Filter Controls */}
          <div className="pt-4 flex flex-col sm:flex-row gap-3 items-center justify-between">
            <div className="relative w-full sm:w-80">
              <Search className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search services (e.g. ROSCTL, IEC, EPCG)..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 text-xs bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-600 shadow-sm"
              />
            </div>

            {/* Category Filter Chips */}
            <div className="flex flex-wrap gap-1.5 justify-center">
              {['All', 'Government Incentive', 'Licensing & Incentives', 'Port & Customs'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                    activeCategory === cat
                      ? 'bg-emerald-800 text-white shadow-sm'
                      : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((service) => {
            const IconComponent = iconMap[service.iconName] || FileText;

            return (
              <div
                key={service.id}
                onClick={() => setSelectedService(service)}
                className="group relative bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm hover:shadow-xl hover:border-emerald-500/50 transition-all duration-300 cursor-pointer flex flex-col justify-between"
              >
                <div>
                  {/* Top Bar: Icon + Category Badge */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-800 to-green-600 text-white flex items-center justify-center shadow-md shadow-emerald-900/10 group-hover:scale-110 transition-transform">
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <span className="px-2.5 py-1 bg-emerald-50 text-emerald-800 text-[10px] font-bold rounded-lg border border-emerald-100 uppercase tracking-wider">
                      {service.category}
                    </span>
                  </div>

                  {/* Title & Short Description */}
                  <h3 className="text-xl font-bold text-slate-900 group-hover:text-emerald-700 transition-colors mb-2">
                    {service.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed line-clamp-3 mb-4">
                    {service.shortDesc}
                  </p>
                </div>

                {/* Card Action Link */}
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-emerald-700">
                  <span>View Service Details</span>
                  <div className="w-7 h-7 rounded-full bg-emerald-50 flex items-center justify-center group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* Detail Modal */}
      <ServiceDetailModal
        service={selectedService}
        isOpen={!!selectedService}
        onClose={() => setSelectedService(null)}
        onRequestService={(serviceTitle) => {
          if (onRequestService) onRequestService(serviceTitle);
        }}
      />
    </section>
  );
};

export default ServicesSection;
