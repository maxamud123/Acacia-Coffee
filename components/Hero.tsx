import React from 'react';
import { scrollToSection } from '../utils';

interface HeroProps {
  welcomeMessage: string;
}

export const Hero: React.FC<HeroProps> = ({ welcomeMessage }) => {
  return (
    <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden pt-16">

      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <div
          className="w-full h-full bg-cover bg-center animate-zoom-in"
          style={{ backgroundImage: "url('https://picsum.photos/id/431/1920/1080')" }}
        />
        {/* Dark overlay — explicit black so it's not affected by theme */}
        <div className="absolute inset-0" style={{ backgroundColor: 'rgba(10,8,6,0.72)' }} />
        {/* Gradient fade into white body below */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 z-10 text-center animate-fade-in">

        <p className="text-gold-500 text-[10px] tracking-[0.5em] uppercase mb-10 font-medium">
          Kigali &nbsp;·&nbsp; Rwanda
        </p>

        <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-serif text-white font-bold tracking-[0.12em] leading-none mb-8">
          CAFE<br />ACACIA
        </h1>

        <div className="flex items-center justify-center gap-5 mb-8">
          <div className="w-14 h-px" style={{ backgroundColor: 'rgba(193,155,118,0.6)' }} />
          <span className="text-gold-500 text-[9px] tracking-[0.5em] uppercase font-medium">Est. 1995</span>
          <div className="w-14 h-px" style={{ backgroundColor: 'rgba(193,155,118,0.6)' }} />
        </div>

        <p className="text-white/60 text-sm max-w-xs mx-auto mb-12 leading-relaxed tracking-wide font-light">
          {welcomeMessage}
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#menu"
            onClick={(e) => scrollToSection(e, 'menu')}
            className="px-10 py-4 bg-gold-500 text-white font-semibold uppercase text-[10px] tracking-[0.3em] hover:bg-white hover:text-gray-900 transition-all duration-300 min-w-[160px]"
          >
            View Menu
          </a>
          <a
            href="#reservation"
            onClick={(e) => scrollToSection(e, 'reservation')}
            className="px-10 py-4 border font-semibold uppercase text-[10px] tracking-[0.3em] transition-all duration-300 min-w-[160px]"
            style={{ borderColor: 'rgba(255,255,255,0.3)', color: 'rgba(255,255,255,0.8)' }}
            onMouseEnter={e => { (e.target as HTMLElement).style.borderColor = '#c19b76'; (e.target as HTMLElement).style.color = '#c19b76'; }}
            onMouseLeave={e => { (e.target as HTMLElement).style.borderColor = 'rgba(255,255,255,0.3)'; (e.target as HTMLElement).style.color = 'rgba(255,255,255,0.8)'; }}
          >
            Reserve a Table
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <a
        href="#about"
        onClick={(e) => scrollToSection(e, 'about')}
        className="absolute bottom-14 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 group cursor-pointer z-20"
      >
        <span className="text-[9px] uppercase tracking-[0.4em] text-white/40 group-hover:text-gold-500 transition-colors font-medium">Scroll</span>
        <div className="w-px h-10 overflow-hidden" style={{ backgroundColor: 'rgba(255,255,255,0.15)' }}>
          <div className="w-full h-1/2 bg-gold-500 animate-slide-down" />
        </div>
      </a>
    </section>
  );
};
