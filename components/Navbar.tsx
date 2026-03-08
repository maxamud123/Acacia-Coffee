import React, { useState, useEffect } from 'react';
import { Menu, X, ShoppingBag } from 'lucide-react';
import { NAV_LINKS } from '../constants';
import { scrollToSection } from '../utils';
import { Logo } from './Logo';
import { useCart } from '../context/CartContext';
import { CartSidebar } from './CartSidebar';

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeLink, setActiveLink] = useState('Home');
  const { itemCount, setIsOpen: setCartOpen } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      // Threshold set to 50 to match approximate Topbar height
      setScrolled(window.scrollY > 50);

      // Active link logic
      const sections = NAV_LINKS.map(link => link.href.substring(1)); // remove #
      
      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
            const rect = element.getBoundingClientRect();
            // If the section top is near the top of the viewport (accounting for header height)
            if (rect.top <= 150 && rect.bottom >= 150) {
                const navLink = NAV_LINKS.find(link => link.href === `#${sectionId}`);
                if (navLink) setActiveLink(navLink.name);
            }
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    const targetId = href.substring(1);
    scrollToSection(e, targetId);
    setIsOpen(false);
  };

  return (
    <>
    <header 
      className={`w-full z-50 transition-all duration-300 
      ${scrolled 
        ? 'fixed top-0 bg-dark-900 shadow-lg py-3 animate-slide-down' 
        : 'absolute top-0 lg:top-[45px] bg-transparent py-6'
      }`}
    >
      <div className="container mx-auto px-4 md:px-8 flex justify-between items-center">
        {/* Logo */}
        <a href="#home" onClick={(e) => handleNavClick(e, '#home')} className="flex items-center gap-3 group">
            <div className="text-gold-500 transition-transform group-hover:scale-110 duration-300">
                 <Logo className="w-12 h-12" />
            </div>
          <div className="flex flex-col">
            <span className="text-white font-serif text-2xl tracking-widest font-bold group-hover:text-gold-500 transition-colors">CAFE ACACIA</span>
            <span className="text-gold-500 text-xs tracking-[0.3em] uppercase">KIGALI</span>
          </div>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              onClick={(e) => handleNavClick(e, link.href)}
              className={`text-sm font-bold uppercase tracking-widest transition-colors relative after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:bg-gold-500 after:transition-all hover:after:w-full ${
                  activeLink === link.name 
                  ? 'text-gold-500 after:w-full' 
                  : 'text-white hover:text-gold-500 after:w-0'
              }`}
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* CTA & Mobile Toggle */}
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setCartOpen(true)}
            className="relative text-white hover:text-gold-500 transition-colors p-2"
          >
            <ShoppingBag size={24} />
            {itemCount > 0 && (
              <span className="absolute top-0 right-0 w-5 h-5 bg-gold-500 text-dark-900 text-[10px] font-bold flex items-center justify-center rounded-full animate-zoom-in">
                {itemCount}
              </span>
            )}
          </button>

          <a 
            href="#reservation" 
            onClick={(e) => handleNavClick(e, '#reservation')}
            className="hidden sm:inline-block px-6 py-3 bg-gold-500 text-dark-900 font-bold uppercase text-xs tracking-widest hover:bg-white transition-all duration-300"
          >
            Find A Table
          </a>
          
          <button 
            className="lg:hidden text-white hover:text-gold-500 transition-colors"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={32} /> : <Menu size={32} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav Overlay */}
      <div className={`fixed inset-0 bg-dark-900/95 z-40 lg:hidden flex flex-col items-center justify-center gap-8 transition-transform duration-300 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        {NAV_LINKS.map((link) => (
          <a 
            key={link.name} 
            href={link.href} 
            className={`text-2xl font-serif transition-colors ${activeLink === link.name ? 'text-gold-500' : 'text-white hover:text-gold-500'}`}
            onClick={(e) => handleNavClick(e, link.href)}
          >
            {link.name}
          </a>
        ))}
        <a 
            href="#reservation" 
            onClick={(e) => handleNavClick(e, '#reservation')}
            className="mt-4 px-8 py-3 bg-gold-500 text-dark-900 font-bold uppercase tracking-widest"
        >
            Find A Table
        </a>
      </div>
    </header>
    <CartSidebar />
    </>
  );
};