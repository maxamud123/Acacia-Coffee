import React, { useEffect, useState } from 'react';
import { Topbar } from './Topbar';
import { Navbar } from './Navbar';
import { Hero } from './Hero';
import { About } from './About';
import { Menu } from './Menu';
import { Reservation } from './Reservation';
import { Footer } from './Footer';
import { AdminDashboard } from './AdminDashboard';
import { Experience } from './Experience';
import { Gallery } from './Gallery';
import { ArrowUp } from 'lucide-react';
import { Logo } from './Logo';

export const Home: React.FC = () => {
  const [welcomeMessage] = useState<string>("Where every flavor tells a story.");
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showAdmin, setShowAdmin] = useState(false);

  useEffect(() => {
    // Simulate initial asset loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading) {
    return (
      <div className="fixed inset-0 z-[60] bg-white flex flex-col items-center justify-center transition-opacity duration-700">
        <div className="relative mb-6">
          <div className="absolute inset-0 bg-gold-500 blur-xl opacity-20 rounded-full animate-pulse"></div>
          <div className="bg-cream-100 p-4 rounded-full border border-gold-500/30 relative z-10 text-gold-500">
             <Logo className="w-16 h-16 animate-pulse" />
          </div>
        </div>
        <div className="text-center">
          <h1 className="text-3xl font-serif text-gray-900 tracking-widest font-bold mb-2">CAFE ACACIA</h1>
          <p className="text-gold-500 text-xs tracking-[0.4em] uppercase">Kigali • Rwanda</p>
        </div>
        <div className="mt-8 w-48 h-[1px] bg-dark-700 relative overflow-hidden">
             <div className="absolute inset-y-0 left-0 bg-gold-500 w-1/2 h-full animate-shimmer"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen flex flex-col font-sans animate-slide-up">
      <Navbar />
      
      <main className="flex-grow">
        <Hero welcomeMessage={welcomeMessage} />
        <About />
        <Menu />
        <Experience />
        <Gallery />
        <Reservation />
      </main>

      <Footer onOpenAdmin={() => setShowAdmin(true)} />
      
      <AdminDashboard isOpen={showAdmin} onClose={() => setShowAdmin(false)} />

      {/* Kivu Noir style "New Items" floating pill */}
      <a
        href="#menu"
        onClick={(e) => { e.preventDefault(); document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' }); }}
        className="fixed bottom-8 right-8 z-50 flex items-center gap-2 px-5 py-3 bg-gold-500 text-white rounded-full shadow-xl hover:bg-gold-600 transition-all duration-300 hover:-translate-y-1 text-sm font-medium tracking-wide"
        style={{ boxShadow: '0 8px 32px rgba(201,168,124,0.4)' }}
      >
        <span>🔔</span>
        New Items
      </a>

      {/* Scroll to top button */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-8 left-8 z-50 p-3 bg-navy-800 text-white rounded-full shadow-lg transition-all duration-300 hover:bg-navy-900 hover:-translate-y-1 ${
          showScrollTop ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
        aria-label="Scroll to top"
      >
        <ArrowUp size={24} />
      </button>
    </div>
  );
};