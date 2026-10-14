import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { apiRequest } from '../utils/api';
import { servicesList } from '../data/servicesData';
import { Send, User, Mail, Phone, FileText, MessageSquare, CheckCircle2, Sparkles, ArrowRight } from 'lucide-react';

export const RequestFormSection = ({ initialService = '', onSubmitSuccess }) => {
  const { user, showToast } = useAuth();
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    service_type: initialService || servicesList[0].title,
    message: '',
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload = {
        ...formData,
        user_id: user?.id || null
      };

      const res = await apiRequest('/requests', 'POST', payload);
      setLoading(false);
      showToast(`Request #${res.request.request_code} submitted successfully!`, 'success');
      
      // Reset form
      setFormData({
        name: user?.name || '',
        email: user?.email || '',
        phone: user?.phone || '',
        service_type: servicesList[0].title,
        message: '',
      });

      if (onSubmitSuccess) {
        onSubmitSuccess(res.request);
      }
    } catch (err) {
      setLoading(false);
      showToast(err.message, 'error');
    }
  };

  return (
    <section id="request-section" className="py-24 bg-gradient-to-b from-slate-50 to-emerald-50/50 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Card Container */}
        <div className="bg-white rounded-3xl shadow-2xl border border-slate-200/80 overflow-hidden">
          
          {/* Form Header Banner */}
          <div className="bg-gradient-to-r from-emerald-900 via-emerald-800 to-green-700 p-8 sm:p-10 text-white text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 -mr-16 -mt-16 w-48 h-48 rounded-full bg-white/5 blur-2xl pointer-events-none" />
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold uppercase tracking-wider mb-3 border border-emerald-500/30">
              <Sparkles className="w-4 h-4 text-emerald-300" />
              <span>Instant Service Inquiry</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Submit a Consulting Service Request
            </h2>
            <p className="text-sm sm:text-base text-emerald-100/90 mt-2 max-w-xl mx-auto font-normal">
              Fill out the form below to request DGFT licenses, ROSCTL/RODTEP rebates, or customs clearances. Your request will be instantly logged in your portal.
            </p>
          </div>

          {/* Form Body */}
          <form onSubmit={handleSubmit} className="p-8 sm:p-10 space-y-6">
            
            <div className="grid md:grid-cols-2 gap-6">
              {/* Client Name */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Your Name / Contact Person *
                </label>
                <div className="relative">
                  <User className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    name="name"
                    required
                    placeholder="e.g. Rajesh Kumar"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:bg-white transition-all"
                  />
                </div>
              </div>

              {/* Phone Number */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Phone Number *
                </label>
                <div className="relative">
                  <Phone className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400" />
                  <input
                    type="tel"
                    name="phone"
                    required
                    placeholder="e.g. 9876543210"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:bg-white transition-all"
                  />
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Email Address */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Email Address *
                </label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400" />
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="e.g. client@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:bg-white transition-all"
                  />
                </div>
              </div>

              {/* Service Type Dropdown */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Service Type Required *
                </label>
                <div className="relative">
                  <FileText className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400" />
                  <select
                    name="service_type"
                    required
                    value={formData.service_type}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:bg-white transition-all appearance-none cursor-pointer"
                  >
                    {servicesList.map((service) => (
                      <option key={service.id} value={service.title}>
                        {service.title}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Message / Details */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Specific Message / Requirements (Optional)
              </label>
              <div className="relative">
                <MessageSquare className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400" />
                <textarea
                  name="message"
                  rows={4}
                  placeholder="Describe your query, IEC details, or export shipment timeline..."
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:bg-white transition-all"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 text-base font-bold text-white bg-gradient-to-r from-emerald-800 via-emerald-700 to-green-600 hover:from-emerald-700 hover:to-green-500 rounded-2xl shadow-xl shadow-emerald-900/20 flex items-center justify-center gap-3 transition-all transform hover:-translate-y-0.5"
            >
              {loading ? (
                <span>Submitting Request...</span>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  <span>Submit Request & View Live Status</span>
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>

            <div className="flex items-center justify-center gap-2 text-xs text-slate-500 text-center pt-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>After submitting, your request will appear in your Client Request Dashboard.</span>
            </div>

          </form>

        </div>

      </div>
    </section>
  );
};

export default RequestFormSection;
