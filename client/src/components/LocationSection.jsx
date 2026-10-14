import React from 'react';
import { MapPin, Navigation, ExternalLink, Building, Clock, PhoneCall } from 'lucide-react';

export const LocationSection = () => {
  const addressString = "52, Ram Nagar, 4th Street, P.N. Road, Tiruppur - 641607, Tamil Nadu, India";
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(addressString)}`;

  return (
    <section id="location" className="py-24 bg-slate-900 text-white relative overflow-hidden">
      {/* Background Decorative Radial */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Office Address Details */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase tracking-wider">
              <MapPin className="w-4 h-4" />
              <span>Head Office Location</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Visit Our Consultancy Office in Tiruppur
            </h2>

            <p className="text-slate-300 text-base leading-relaxed">
              We are conveniently situated in the heart of Tiruppur's industrial belt for easy access by exporters, and logistics partners.
            </p>

            {/* Address Box */}
            <div className="p-6 rounded-3xl bg-slate-800/80 border border-slate-700 backdrop-blur-md space-y-4 shadow-xl">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-lg shadow-emerald-900/30">
                  <Building className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-white">NILA EXIMS Office</h4>
                  <p className="text-sm text-slate-300 mt-1 leading-relaxed">
                    52, Ram Nagar, 4th Street, <br />
                    P.N. Road, Tiruppur - 641607, <br />
                    Tamil Nadu, India.
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-700/80 grid sm:grid-cols-2 gap-4 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-emerald-400" />
                  <span>Mon - Fri: 9:30 AM - 4:00 PM</span>
                </div>
                <div className="flex items-center gap-2">
                  <PhoneCall className="w-4 h-4 text-emerald-400" />
                  <span>Call: +91 94437 35942</span>
                </div>
              </div>
            </div>

            {/* Google Maps Button */}
            <div>
              <a
                href={googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-400 hover:to-green-400 text-slate-950 font-bold text-sm rounded-2xl shadow-xl shadow-emerald-500/20 transition-all transform hover:-translate-y-0.5"
              >
                <Navigation className="w-5 h-5" />
                <span>Open Location in Google Maps</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Right Column: Interactive Map Graphic Card */}
          <div className="lg:col-span-6">
            <div className="relative p-3 bg-slate-800/90 border border-slate-700 rounded-3xl shadow-2xl overflow-hidden group">
              
              {/* Map Preview Mockup Card */}
              <div className="relative h-96 w-full rounded-2xl overflow-hidden bg-slate-950 border border-slate-700/80 flex items-center justify-center">
                {/* Embedded Stylized Map Graphic */}
                <div className="absolute inset-0 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:16px_16px] opacity-20" />

                <div className="text-center p-8 z-10 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 mx-auto flex items-center justify-center animate-bounce">
                    <MapPin className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">NILA EXIMS</h3>
                    <p className="text-xs text-slate-400 mt-1">52, Ram Nagar, 4th Street, P.N. Road, Tiruppur - 7</p>
                  </div>

                  <a
                    href={googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl transition-all shadow-md"
                  >
                    <span>Launch GPS Directions</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default LocationSection;
