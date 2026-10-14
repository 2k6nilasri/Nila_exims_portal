import React from 'react';
import { X, CheckCircle2, FileText, ArrowRight, ShieldCheck, HelpCircle } from 'lucide-react';

export const ServiceDetailModal = ({ service, isOpen, onClose, onRequestService }) => {
  if (!isOpen || !service) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white rounded-3xl shadow-2xl border border-slate-100 p-6 sm:p-8">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 z-10 w-9 h-9 bg-slate-100 hover:bg-slate-200 text-slate-500 rounded-full flex items-center justify-center transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="space-y-2 pr-8">
          <span className="inline-block px-3 py-1 bg-emerald-100 text-emerald-800 text-xs font-bold rounded-full uppercase tracking-wider">
            {service.category}
          </span>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            {service.title}
          </h3>
          <p className="text-sm text-slate-600 font-medium">
            {service.shortDesc}
          </p>
        </div>

        {/* Modal Body */}
        <div className="mt-6 space-y-6 text-slate-700 text-sm leading-relaxed border-t border-slate-100 pt-6">
          
          {/* Full Description */}
          <div>
            <h4 className="font-bold text-slate-900 text-base mb-2">Overview & Description</h4>
            <p className="bg-slate-50 p-4 rounded-2xl border border-slate-200/60 text-slate-700">
              {service.fullDesc}
              {service.exchangeRateUrl && (
                <>
                  {' '}
                  <a
                    href={service.exchangeRateUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block font-semibold text-emerald-700 underline underline-offset-4 hover:text-emerald-900"
                  >
                    Link for exchange rate
                  </a>
                </>
              )}
            </p>
          </div>

          {/* Benefits */}
          <div>
            <h4 className="font-bold text-slate-900 text-base mb-3 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-600" />
              <span>Key Client Benefits</span>
            </h4>
            <div className="grid sm:grid-cols-2 gap-3">
              {service.benefits.map((benefit, idx) => (
                <div key={idx} className="flex items-start gap-2.5 p-3 rounded-xl bg-emerald-50/60 border border-emerald-100">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span className="text-xs font-semibold text-slate-800">{benefit}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Required Documents */}
          <div>
            <h4 className="font-bold text-slate-900 text-base mb-3 flex items-center gap-2">
              <FileText className="w-5 h-5 text-emerald-600" />
              <span>Required Documents Checklist</span>
            </h4>
            <ul className="space-y-2">
              {service.documentsRequired.map((doc, idx) => (
                <li key={idx} className="flex items-center gap-2 text-xs text-slate-600 bg-slate-50 px-3 py-2 rounded-lg border border-slate-200/50">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
                  <span>{doc}</span>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Modal Footer Actions */}
        <div className="mt-8 pt-4 border-t border-slate-100 flex flex-col sm:flex-row gap-3 items-center justify-between">
          <div className="text-xs text-slate-500 flex items-center gap-1.5">
            <HelpCircle className="w-4 h-4 text-emerald-600" />
            <span>Consultant Support Included</span>
          </div>

          <div className="flex gap-3 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="flex-1 sm:flex-none px-5 py-2.5 text-xs font-bold text-slate-600 hover:bg-slate-100 border border-slate-200 rounded-xl transition-colors"
            >
              Close
            </button>
            <button
              onClick={() => {
                onClose();
                onRequestService(service.title);
              }}
              className="flex-1 sm:flex-none px-6 py-2.5 text-xs font-bold text-white bg-gradient-to-r from-emerald-800 to-emerald-600 hover:from-emerald-700 hover:to-emerald-500 rounded-xl shadow-lg shadow-emerald-900/20 flex items-center justify-center gap-2 transition-all"
            >
              <span>Request This Service</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ServiceDetailModal;
