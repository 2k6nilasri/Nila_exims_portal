import React from 'react';
import Logo from './Logo';
import { Phone, Mail, MapPin, ExternalLink, ArrowUp } from 'lucide-react';

export const Footer = ({ onNavigateSection, onOpenAuth }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 text-slate-400 text-xs border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          
          {/* Brand Col */}
          <div className="space-y-4">
            <Logo textColor="text-white" />
            <p className="text-slate-400 leading-relaxed">
              Your Trusted Trade Partner in India. Providing professional import-export consultancy, DGFT scheme approvals, and customs clearance services.
            </p>
            <div className="pt-2 text-emerald-400 font-bold text-xs uppercase tracking-wider">
              EXPORT | IMPORT | CONSULT | DELIVER
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Quick Navigation</h4>
            <ul className="space-y-2">
              <li>
                <button onClick={() => onNavigateSection('#about')} className="hover:text-emerald-400 transition-colors">
                  About NILA EXIMS
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateSection('#services')} className="hover:text-emerald-400 transition-colors">
                  Services Portfolio
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateSection('#why-us')} className="hover:text-emerald-400 transition-colors">
                  Why NILA EXIMS
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateSection('#location')} className="hover:text-emerald-400 transition-colors">
                  Office Location Map
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateSection('#contact')} className="hover:text-emerald-400 transition-colors">
                  Contact Us
                </button>
              </li>
            </ul>
          </div>

          {/* Portals & Login */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Portals & Login</h4>
            <ul className="space-y-2">
              <li>
                <button onClick={() => onOpenAuth('login')} className="hover:text-emerald-400 transition-colors">
                  Client Portal Login
                </button>
              </li>
              <li>
                <button onClick={() => onOpenAuth('register')} className="hover:text-emerald-400 transition-colors">
                  Client Registration
                </button>
              </li>
              <li>
                <button onClick={() => onOpenAuth('admin')} className="hover:text-emerald-400 transition-colors">
                  Admin Portal Login
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateSection('#request-section')} className="hover:text-emerald-400 transition-colors">
                  Submit Service Request
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Contact & Address</h4>
            <div className="space-y-2 text-slate-300">
              <p className="font-bold text-white">T.S. Shankar Kumar (BBM)</p>
              <p className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>52, Ram Nagar, 4th Street, P.N. Road, Tiruppur - 641607</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <a href="tel:9443735942" className="hover:underline text-emerald-400 font-bold">+91 94437 35942</a>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <a href="mailto:nilaexims@gmail.com" className="hover:underline text-emerald-400">nilaexims@gmail.com</a>
              </p>
            </div>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="mt-12 pt-8 border-t border-slate-800 flex flex-col sm:flex-row justify-between items-center gap-4 text-[11px] text-slate-500">
          <p>© {new Date().getFullYear()} NILA EXIMS – Import Export Consultant. All Rights Reserved.</p>
          <div className="flex items-center gap-4">
            <button
              onClick={scrollToTop}
              className="p-2 bg-slate-900 hover:bg-slate-800 text-slate-300 rounded-lg flex items-center gap-1 transition-colors"
            >
              <span>Back to top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
