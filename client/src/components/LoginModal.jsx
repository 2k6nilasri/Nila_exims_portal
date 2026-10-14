import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { X, Lock, Mail, User, Phone, Building2, Shield, ArrowRight } from 'lucide-react';
import Logo from './Logo';

export const LoginModal = ({ isOpen, onClose, initialMode = 'login', onSuccessfulLogin }) => {
  const { login, register } = useAuth();
  const [activeTab, setActiveTab] = useState(initialMode); // 'login' | 'register' | 'admin'
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company_name: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrorMsg('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    try {
      if (activeTab === 'register') {
        await register(formData);
      } else if (activeTab === 'admin') {
        await login(formData.email, formData.password);
      } else {
        await login(formData.email, formData.password);
      }
      setLoading(false);
      onClose();
      if (onSuccessfulLogin) onSuccessfulLogin();
    } catch (err) {
      setErrorMsg(err.message);
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-lg overflow-hidden bg-white rounded-3xl shadow-2xl border border-slate-100">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 flex items-center justify-center w-9 h-9 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Top Header Banner */}
        <div className="px-8 pt-8 pb-6 bg-gradient-to-br from-emerald-900 via-emerald-800 to-green-700 text-white text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 -mr-16 -mt-16 w-48 h-48 rounded-full bg-white/5 blur-2xl pointer-events-none" />
          <div className="flex justify-center mb-3">
            <Logo showText={false} />
          </div>
          <h3 className="text-2xl font-bold font-sans tracking-tight">NILA EXIMS Portal</h3>
          <p className="text-xs text-emerald-100/90 mt-1">
            {activeTab === 'admin'
              ? 'Secure Portal for Admin Management'
              : activeTab === 'register'
              ? 'Create a Client Account to Track Requests'
              : 'Sign in to access your Client Dashboard'}
          </p>

          {/* Role / Mode Switcher Tabs */}
          <div className="flex p-1 mt-6 bg-emerald-950/50 rounded-xl border border-emerald-500/20">
            <button
              onClick={() => { setActiveTab('login'); setErrorMsg(''); }}
              className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all ${
                activeTab === 'login' ? 'bg-white text-emerald-900 shadow-md' : 'text-emerald-100 hover:text-white'
              }`}
            >
              Client Login
            </button>
            <button
              onClick={() => { setActiveTab('register'); setErrorMsg(''); }}
              className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all ${
                activeTab === 'register' ? 'bg-white text-emerald-900 shadow-md' : 'text-emerald-100 hover:text-white'
              }`}
            >
              New Registration
            </button>
            <button
              onClick={() => { setActiveTab('admin'); setErrorMsg(''); }}
              className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all flex items-center justify-center gap-1 ${
                activeTab === 'admin' ? 'bg-emerald-500 text-white shadow-md' : 'text-emerald-100 hover:text-white'
              }`}
            >
              <Shield className="w-3.5 h-3.5" />
              Admin
            </button>
          </div>
        </div>

        {/* Form Body */}
        <div className="p-8">
          {errorMsg && (
            <div className="p-3 mb-4 text-xs font-medium text-rose-700 bg-rose-50 border border-rose-200 rounded-xl">
              {errorMsg}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {activeTab === 'register' && (
              <>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
                    <input
                      type="text"
                      name="name"
                      required
                      placeholder="e.g. Rajesh Kumar"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:bg-white transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Company / Organization</label>
                  <div className="relative">
                    <Building2 className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
                    <input
                      type="text"
                      name="company_name"
                      placeholder="e.g. Apex Garments Pvt Ltd"
                      value={formData.company_name}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:bg-white transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Phone Number</label>
                  <div className="relative">
                    <Phone className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
                    <input
                      type="tel"
                      name="phone"
                      required
                      placeholder="e.g. 9876543210"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:bg-white transition-all"
                    />
                  </div>
                </div>
              </>
            )}

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">
                {activeTab === 'admin' ? 'Admin Email' : 'Email Address'}
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
                <input
                  type="email"
                  name="email"
                  required
                  placeholder={activeTab === 'admin' ? 'nilaexims@gmail.com' : 'you@example.com'}
                  value={formData.email}
                  onChange={handleChange}
                  autoComplete="username"
                  className="w-full pl-10 pr-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:bg-white transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Password</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
                <input
                  type="password"
                  name="password"
                  required
                  minLength={activeTab === 'register' ? 8 : undefined}
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  autoComplete={activeTab === 'register' ? 'new-password' : 'current-password'}
                  className="w-full pl-10 pr-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:bg-white transition-all"
                />
              </div>
              {activeTab === 'register' && (
                <p className="mt-1 text-xs text-slate-500">Use a password with at least 8 characters.</p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 mt-2 text-sm font-bold text-white bg-gradient-to-r from-emerald-800 to-emerald-600 hover:from-emerald-700 hover:to-emerald-500 rounded-xl shadow-lg shadow-emerald-900/20 flex items-center justify-center gap-2 group transition-all"
            >
              {loading ? (
                <span>Authenticating...</span>
              ) : (
                <>
                  <span>
                    {activeTab === 'register'
                      ? 'Create Client Account'
                      : activeTab === 'admin'
                      ? 'Sign In to Admin Portal'
                      : 'Sign In to Client Portal'}
                  </span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

        </div>
      </div>
    </div>
  );
};

export default LoginModal;
