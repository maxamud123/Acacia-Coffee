import React from 'react';
import { Phone, CheckCircle } from 'lucide-react';
import { scrollToSection } from '../utils';

const CHEF_QUOTE = "Cooking is an art, but all art requires knowing something about the techniques and materials.";

export const About: React.FC = () => {
  return (
    <section id="about" className="py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-6 md:px-10">
        <div className="flex flex-col lg:flex-row gap-16 items-center">

          {/* Text Content */}
          <div className="lg:w-1/2 text-center lg:text-left">
            <p className="text-gold-500 text-[10px] tracking-[0.5em] uppercase mb-3 font-medium">Our Story</p>
            <h2 className="text-3xl md:text-4xl font-serif text-gray-900 font-bold mb-4 tracking-wide">
              Every Flavor Tells a Story
            </h2>
            <div className="w-10 h-px bg-gold-500/60 mb-8 lg:mx-0 mx-auto" />

            <p className="text-gray-500 text-base leading-relaxed mb-8">
              Founded in 1995, Cafe Acacia started as a humble family kitchen. Today, it stands as a monument to fine dining, where traditional recipes meet modern innovation. We believe that food is not just sustenance, but an experience that binds us together.
            </p>

            <div className="grid grid-cols-2 gap-4 mb-8">
              {['Fresh Ingredients', 'Expert Chefs', 'Daily Specials', 'Events & Parties'].map((feature) => (
                <div key={feature} className="flex items-center gap-2 text-gray-600">
                  <CheckCircle size={16} className="text-gold-500 shrink-0" />
                  <span className="text-sm">{feature}</span>
                </div>
              ))}
            </div>

            <div className="mb-8 p-6 bg-white border-l-2 border-gold-500/60 shadow-sm">
              <p className="text-gray-700 font-serif italic text-lg leading-relaxed">
                "{CHEF_QUOTE}"
              </p>
              <p className="text-gold-500 mt-3 text-xs uppercase tracking-widest font-semibold">— Head Chef, Marco V.</p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-8">
              <div className="text-center sm:text-left">
                <p className="text-gray-400 text-xs uppercase tracking-widest mb-1">Book Through Call</p>
                <a href="tel:+25078721772" className="text-gold-500 text-xl font-serif font-bold hover:text-gold-600 transition-colors flex items-center gap-2 justify-center sm:justify-start">
                  <Phone size={20} />
                  +250 787 217 72
                </a>
              </div>
              <a
                href="#menu"
                onClick={(e) => scrollToSection(e, 'menu')}
                className="px-8 py-3 bg-gray-900 text-white font-semibold uppercase text-xs tracking-widest hover:bg-gold-500 transition-colors"
              >
                Our Menu
              </a>
            </div>
          </div>

          {/* Image Content */}
          <div className="lg:w-1/2 relative w-full">
            <div className="relative z-10 grid grid-cols-2 gap-4">
              <img
                src="https://picsum.photos/id/225/300/400"
                alt="Interior of Cafe Acacia"
                className="w-full h-full object-cover shadow-md mt-12 rounded-sm"
              />
              <img
                src="https://picsum.photos/id/429/300/400"
                alt="Food at Cafe Acacia"
                className="w-full h-full object-cover shadow-md mb-12 rounded-sm"
              />
            </div>

            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-3 rounded-full border border-gold-500/40 z-20 shadow-lg">
              <div className="w-20 h-20 bg-gold-500 rounded-full flex items-center justify-center flex-col text-white">
                <span className="block text-2xl font-serif font-bold">25+</span>
                <span className="block text-[9px] uppercase font-semibold tracking-wider">Years</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
