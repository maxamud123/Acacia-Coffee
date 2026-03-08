import React from 'react';
import { SERVICES } from '../constants';

export const Service: React.FC = () => {
  return (
    <section id="services" className="py-24 bg-dark-800 relative">
      <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-dark-900 to-transparent pointer-events-none"></div>
      
      <div className="container mx-auto px-4 text-center">
        <p className="text-gold-500 font-serif italic text-xl mb-2">Flavors of Rwanda</p>
        
        {/* Decorative Separator */}
        <div className="separator">
            <div className="separator-icon"></div>
        </div>

        <h2 className="text-4xl md:text-5xl font-serif text-white mb-16">
          We Offer Top Notch
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {SERVICES.map((service, index) => (
            <div 
              key={service.id} 
              className="group relative bg-dark-700 h-full p-8 pt-16 pb-12 rounded-sm overflow-hidden border border-white/5 hover:border-gold-500/30 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl"
            >
               {/* Background Image Effect on Hover */}
               <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 bg-cover bg-center"
                style={{ backgroundImage: `url(${service.image})` }}
               />

              <div className="relative z-10 flex flex-col h-full items-center">
                <h3 className="text-2xl font-serif text-white mb-4 group-hover:text-gold-500 transition-colors">
                  {service.title}
                </h3>
                <p className="text-gray-400 leading-relaxed mb-8 group-hover:text-gray-200 flex-grow">
                  {service.description}
                </p>
                <a href="#menu" className="inline-block text-gold-600 font-bold uppercase text-xs tracking-widest hover:text-gold-400 transition-colors border-b border-gold-600/30 pb-1 hover:border-gold-400">
                  View Menu
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};