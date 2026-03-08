import React from 'react';
import { Phone, CheckCircle } from 'lucide-react';
import { scrollToSection } from '../utils';

const CHEF_QUOTE = "Cooking is an art, but all art requires knowing something about the techniques and materials.";

export const About: React.FC = () => {
  return (
    <section id="about" className="py-24 bg-dark-900 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          
          {/* Text Content */}
          <div className="lg:w-1/2 text-center lg:text-left">
            <p className="text-gold-500 font-serif italic text-xl mb-2">Our Story</p>
            <h2 className="text-4xl md:text-5xl font-serif text-white mb-8">
              Every Flavor Tells a Story
            </h2>
            <p className="text-gray-400 text-lg leading-relaxed mb-8">
              Founded in 1995, Cafe Acacia started as a humble family kitchen. Today, it stands as a monument to fine dining, where traditional recipes meet modern innovation. We believe that food is not just sustenance, but an experience that binds us together.
            </p>

            <div className="grid grid-cols-2 gap-4 mb-8">
                {['Fresh Ingredients', 'Expert Chefs', 'Daily Specials', 'Events & Parties'].map((feature) => (
                    <div key={feature} className="flex items-center gap-2 text-gray-300">
                        <CheckCircle size={18} className="text-gold-500" />
                        <span>{feature}</span>
                    </div>
                ))}
            </div>

            <div className="mb-8 p-6 bg-dark-800 border-l-4 border-gold-500 rounded-r-sm shadow-xl">
                <p className="text-white font-serif italic text-xl">
                    "{CHEF_QUOTE}"
                </p>
                <p className="text-gold-500 mt-4 text-xs uppercase tracking-widest font-bold">— Head Chef, Marco V.</p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-8">
                <div className="text-center sm:text-left">
                     <p className="text-gray-400 text-xs uppercase tracking-widest mb-1">Book Through Call</p>
                     <a href="tel:+25078721772" className="text-gold-500 text-2xl font-serif font-bold hover:text-white transition-colors flex items-center gap-2 justify-center sm:justify-start">
                        <Phone size={24} />
                        +250 787 217 72
                     </a>
                </div>
                <a 
                  href="#menu" 
                  onClick={(e) => scrollToSection(e, 'menu')}
                  className="px-8 py-3 bg-white text-dark-900 font-bold uppercase tracking-widest hover:bg-gold-500 transition-colors rounded-sm"
                >
                    Read More
                </a>
            </div>
          </div>

          {/* Image Content */}
          <div className="lg:w-1/2 relative w-full">
             <div className="relative z-10 grid grid-cols-2 gap-4">
                <img 
                    src="https://picsum.photos/id/225/300/400" 
                    alt="Interior of Cafe Acacia" 
                    className="w-full h-full object-cover rounded-sm shadow-2xl mt-12"
                />
                 <img 
                    src="https://picsum.photos/id/429/300/400" 
                    alt="Food at Cafe Acacia" 
                    className="w-full h-full object-cover rounded-sm shadow-2xl mb-12"
                />
             </div>
             
             {/* Decorative Elements */}
             <div className="absolute top-0 right-0 w-32 h-32 bg-gold-500/10 rounded-full blur-2xl"></div>
             <div className="absolute bottom-0 left-0 w-32 h-32 bg-gold-500/10 rounded-full blur-2xl"></div>
             
             <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-dark-900 p-4 rounded-full border-2 border-gold-500 z-20 shadow-xl">
                 <div className="w-24 h-24 bg-gold-500 rounded-full flex items-center justify-center flex-col text-dark-900">
                     <span className="block text-3xl font-serif font-bold">25+</span>
                     <span className="block text-[10px] uppercase font-bold tracking-wider">Years</span>
                 </div>
             </div>
          </div>

        </div>
      </div>
    </section>
  );
};