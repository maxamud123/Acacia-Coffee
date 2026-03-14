import React, { useState, useEffect } from 'react';
import { Menu, X, ShoppingBag } from 'lucide-react';
import { NAV_LINKS } from '../constants';
import { scrollToSection } from '../utils';
import { useCart } from '../context/CartContext';
import { CartSidebar } from './CartSidebar';

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeLink, setActiveLink] = useState('Home');
  const { itemCount, setIsOpen: setCartOpen } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      const sections = NAV_LINKS.map(link => link.href.substring(1));
      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const rect = element.getBoundingClientRect();
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
    scrollToSection(e, href.substring(1));
    setIsOpen(false);
  };

  return (
    <>
      {/* Always dark navy — Kivu Noir style */}
      <header className="w-full z-50 fixed top-0 bg-navy-800">
        {/* Small dot at top center — Kivu Noir signature */}
        <div className="flex justify-center pt-2 pb-0">
          <div className="w-2 h-2 rounded-full border border-white/40 flex items-center justify-center">
            <div className="w-1 h-1 rounded-full bg-white/60" />
          </div>
        </div>
        <div className="container mx-auto px-6 md:px-10 flex justify-between items-center">

          {/* Logo — "CA" box + name */}
          <a
            href="#home"
            onClick={(e) => handleNavClick(e, '#home')}
            className="flex items-center gap-3 group"
          >
            <div className="w-9 h-9 border border-white/60 flex items-center justify-center group-hover:border-gold-500 transition-colors">
              <span className="text-xs font-bold tracking-widest leading-none text-white group-hover:text-gold-500 transition-colors">CA</span>
            </div>
            <span className="text-sm font-medium tracking-[0.15em] text-white/80 group-hover:text-white transition-colors">
              cafe acacia
            </span>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-10">
            {NAV_LINKS.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={`text-[11px] font-medium uppercase tracking-[0.2em] transition-colors relative after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:h-px after:bg-gold-500 after:transition-all hover:after:w-full ${
                  activeLink === link.name
                    ? 'text-white after:w-full'
                    : 'text-white/60 hover:text-white after:w-0'
                }`}
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Right — cart + reserve */}
          <div className="flex items-center gap-5">
            <button
              type="button"
              aria-label="Open cart"
              onClick={() => setCartOpen(true)}
              className="relative text-white/70 hover:text-gold-500 transition-colors p-1"
            >
              <ShoppingBag size={20} />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-gold-500 text-white text-[9px] font-bold flex items-center justify-center rounded-full">
                  {itemCount}
                </span>
              )}
            </button>

            <a
              href="#reservation"
              onClick={(e) => handleNavClick(e, '#reservation')}
              className="hidden sm:inline-block px-5 py-2 text-[10px] font-semibold uppercase tracking-[0.25em] border border-white/30 text-white/80 hover:border-gold-500 hover:text-gold-500 transition-all duration-300"
            >
              Reserve Space
            </a>

            <button
              type="button"
              aria-label="Toggle menu"
              className="lg:hidden text-white"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        <div className={`fixed inset-0 bg-navy-800 z-40 lg:hidden flex flex-col items-center justify-center gap-8 transition-transform duration-300 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          <button
            type="button"
            aria-label="Close menu"
            className="absolute top-6 right-6 text-white"
            onClick={() => setIsOpen(false)}
          >
            <X size={28} />
          </button>
          {NAV_LINKS.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className={`text-xl font-serif tracking-widest uppercase transition-colors ${
                activeLink === link.name ? 'text-gold-500' : 'text-white/70 hover:text-white'
              }`}
              onClick={(e) => handleNavClick(e, link.href)}
            >
              {link.name}
            </a>
          ))}
          <a
            href="#reservation"
            onClick={(e) => handleNavClick(e, '#reservation')}
            className="mt-4 px-8 py-3 border border-gold-500 text-gold-500 font-semibold uppercase tracking-widest text-sm hover:bg-gold-500 hover:text-navy-800 transition-all"
          >
            Reserve Space
          </a>
        </div>
      </header>

      <CartSidebar />
    </>
  );
};
