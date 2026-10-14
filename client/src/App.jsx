import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';
import HeroBanner from './components/HeroBanner';
import AboutSection from './components/AboutSection';
import ServicesSection from './components/ServicesSection';
import WhyUsSection from './components/WhyUsSection';
import LocationSection from './components/LocationSection';
import ContactSection from './components/ContactSection';
import RequestFormSection from './components/RequestFormSection';
import ClientDashboard from './components/ClientDashboard';
import AdminPortal from './components/AdminPortal';
import LoginModal from './components/LoginModal';
import NotificationToast from './components/NotificationToast';
import Footer from './components/Footer';

function MainApp() {
  const { user, isAdmin, isClient } = useAuth();
  const [activeView, setActiveView] = useState('home'); // 'home' | 'client-dashboard' | 'admin-portal'
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState('login');
  const [selectedServiceTitle, setSelectedServiceTitle] = useState('');

  // Handle opening auth modal
  const handleOpenAuth = (mode = 'login') => {
    setAuthModalMode(mode);
    setAuthModalOpen(true);
  };

  // Handle service request trigger from Service cards/modals
  const handleRequestServiceFromCard = (serviceTitle) => {
    setSelectedServiceTitle(serviceTitle);
    setActiveView('home');
    setTimeout(() => {
      document.querySelector('#request-section')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  // Handle section navigation
  const handleNavigateSection = (selector) => {
    if (activeView !== 'home') {
      setActiveView('home');
      setTimeout(() => {
        document.querySelector(selector)?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      document.querySelector(selector)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans">
      
      {/* Navigation Header */}
      <Navbar
        onOpenAuth={handleOpenAuth}
        activeView={activeView}
        setActiveView={setActiveView}
      />

      {/* Main Content Router View */}
      <main className="flex-grow">
        {activeView === 'home' && (
          <>
            <HeroBanner
              onOpenAuth={handleOpenAuth}
              onNavigateSection={handleNavigateSection}
            />
            <AboutSection />
            <ServicesSection
              onRequestService={handleRequestServiceFromCard}
            />
            <WhyUsSection />
            <LocationSection />
            <ContactSection />
            <RequestFormSection
              initialService={selectedServiceTitle}
              onSubmitSuccess={(req) => {
                // If client logged in or submitted, open dashboard or toast
                setActiveView('client-dashboard');
              }}
            />
          </>
        )}

        {activeView === 'client-dashboard' && (
          <ClientDashboard
            onNavigateHome={() => setActiveView('home')}
            onOpenNewRequest={() => {
              setActiveView('home');
              setTimeout(() => {
                document.querySelector('#request-section')?.scrollIntoView({ behavior: 'smooth' });
              }, 100);
            }}
          />
        )}

        {activeView === 'admin-portal' && (
          <AdminPortal
            onNavigateHome={() => setActiveView('home')}
          />
        )}
      </main>

      {/* Footer */}
      <Footer
        onNavigateSection={handleNavigateSection}
        onOpenAuth={handleOpenAuth}
      />

      {/* Login & Auth Modal */}
      <LoginModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        initialMode={authModalMode}
        onSuccessfulLogin={() => {
          // Auto redirect based on role
          if (authModalMode === 'admin') {
            setActiveView('admin-portal');
          } else {
            setActiveView('client-dashboard');
          }
        }}
      />

      {/* Toast Notification Container */}
      <NotificationToast />

    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <MainApp />
    </AuthProvider>
  );
}
