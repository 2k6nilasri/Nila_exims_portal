import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import Logo from './Logo';
import { User, Shield, LogOut, Menu, X, FileCheck2, LayoutDashboard } from 'lucide-react';

export const Navbar = ({ onOpenAuth, activeView, setActiveView }) => {
  const { user, logout, isAdmin, isClient } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'About', href: '#about' },
    { label: 'Services', href: '#services' },
    { label: 'Why NILA EXIMS', href: '#why-us' },
    { label: 'Location', href: '#location' },
    { label: 'Contact', href: '#contact' },
  ];

  const handleNavClick = (href) => {
    setActiveView('home');
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white/90 backdrop-blur-md border-b border-slate-200/80 shadow-sm transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Logo */}
          <div onClick={() => setActiveView('home')}>
            <Logo />
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => handleNavClick(link.href)}
                className="text-sm font-semibold text-slate-700 hover:text-emerald-700 transition-colors"
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* User Auth / Dashboard Controls */}
          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <div className="flex items-center gap-3">
                {isClient && (
                  <button
                    onClick={() => setActiveView('client-dashboard')}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                      activeView === 'client-dashboard'
                        ? 'bg-emerald-800 text-white shadow-md'
                        : 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100 border border-emerald-200'
                    }`}
                  >
                    <FileCheck2 className="w-4 h-4" />
                    <span>My Requests</span>
                  </button>
                )}

                {isAdmin && (
                  <button
                    onClick={() => setActiveView('admin-portal')}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                      activeView === 'admin-portal'
                        ? 'bg-emerald-800 text-white shadow-md'
                        : 'bg-emerald-900 text-white hover:bg-emerald-800 shadow-sm'
                    }`}
                  >
                    <Shield className="w-4 h-4 text-emerald-400" />
                    <span>Admin Portal</span>
                  </button>
                )}

                {/* Profile Badge */}
                <div className="flex items-center gap-2 pl-2 border-l border-slate-200">
                  <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-xs">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="flex flex-col text-left">
                    <span className="text-xs font-bold text-slate-900 leading-tight line-clamp-1">{user.name}</span>
                    <span className="text-[10px] text-slate-500 capitalize">{user.role}</span>
                  </div>
                </div>

                {/* Logout Button */}
                <button
                  onClick={logout}
                  title="Logout"
                  className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <button
                  onClick={() => onOpenAuth('login')}
                  className="px-4 py-2 text-sm font-semibold text-slate-700 hover:text-emerald-800 transition-colors"
                >
                  Client Login
                </button>

                <button
                  onClick={() => onOpenAuth('admin')}
                  className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-emerald-900 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-xl transition-all"
                >
                  <Shield className="w-3.5 h-3.5 text-emerald-700" />
                  Admin
                </button>

                <button
                  onClick={() => {
                    setActiveView('home');
                    setTimeout(() => {
                      document.querySelector('#request-section')?.scrollIntoView({ behavior: 'smooth' });
                    }, 100);
                  }}
                  className="px-4 py-2 text-sm font-semibold text-white bg-gradient-to-r from-emerald-800 to-emerald-600 hover:from-emerald-700 hover:to-emerald-500 rounded-xl shadow-md shadow-emerald-900/10 transition-all"
                >
                  Submit Request
                </button>
              </div>
            )}
          </div>

          {/* Mobile Menu Trigger Button */}
          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-700 hover:bg-slate-100 rounded-xl"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-6 space-y-3 shadow-xl">
          <nav className="flex flex-col space-y-2">
            <button
              onClick={() => { setActiveView('home'); setMobileMenuOpen(false); }}
              className="text-left py-2 font-semibold text-slate-800 hover:text-emerald-700"
            >
              Home Page
            </button>
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => handleNavClick(link.href)}
                className="text-left py-2 text-slate-600 hover:text-emerald-700 font-medium"
              >
                {link.label}
              </button>
            ))}
          </nav>

          <div className="pt-4 border-t border-slate-100 space-y-2">
            {user ? (
              <>
                <div className="flex items-center gap-3 py-2">
                  <div className="w-9 h-9 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-sm">
                    {user.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-bold text-sm text-slate-900">{user.name}</div>
                    <div className="text-xs text-slate-500">{user.email} ({user.role})</div>
                  </div>
                </div>
                {isClient && (
                  <button
                    onClick={() => { setActiveView('client-dashboard'); setMobileMenuOpen(false); }}
                    className="w-full py-2.5 bg-emerald-50 text-emerald-800 font-semibold rounded-xl text-center"
                  >
                    My Request Dashboard
                  </button>
                )}
                {isAdmin && (
                  <button
                    onClick={() => { setActiveView('admin-portal'); setMobileMenuOpen(false); }}
                    className="w-full py-2.5 bg-emerald-900 text-white font-semibold rounded-xl text-center"
                  >
                    Admin Portal Dashboard
                  </button>
                )}
                <button
                  onClick={() => { logout(); setMobileMenuOpen(false); }}
                  className="w-full py-2 bg-rose-50 text-rose-700 font-semibold rounded-xl text-center"
                >
                  Logout
                </button>
              </>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => { onOpenAuth('login'); setMobileMenuOpen(false); }}
                  className="py-2.5 border border-slate-300 text-slate-700 font-semibold rounded-xl text-center"
                >
                  Client Login
                </button>
                <button
                  onClick={() => { onOpenAuth('admin'); setMobileMenuOpen(false); }}
                  className="py-2.5 bg-emerald-900 text-white font-semibold rounded-xl text-center"
                >
                  Admin Login
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
