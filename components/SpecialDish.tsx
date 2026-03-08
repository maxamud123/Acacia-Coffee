import React from 'react';
import { scrollToSection } from '../utils';

export const SpecialDish: React.FC = () => {
  return (
    <section id="special" className="py-24 bg-dark-800 flex items-center relative overflow-hidden">
      {/* Background Texture */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-[#1a1d23] -skew-x-12 translate-x-32 hidden lg:block"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
            
            {/* Image Side */}
            <div className="lg:w-1/2 relative group">
                <div className="relative z-10 w-full aspect-square max-w-[500px] mx-auto">
                    <img 
                        src="https://picsum.photos/id/292/800/800" 
                        alt="Lake Kivu Tilapia" 
                        className="w-full h-full object-cover rounded-full shadow-[0_0_50px_rgba(0,0,0,0.5)] border-4 border-dark-900 group-hover:scale-105 transition-transform duration-700"
                    />
                    
                    {/* Badge */}
                    <div className="absolute top-0 left-0 bg-gold-500 text-dark-900 rounded-full w-24 h-24 flex flex-col items-center justify-center shadow-lg border-4 border-dark-800 animate-bounce">
                        <span className="text-2xl font-bold font-serif leading-none">30%</span>
                        <span className="text-[10px] font-bold uppercase tracking-wider">Off</span>
                    </div>
                </div>
                
                {/* Decorative circle behind */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] border border-gold-500/10 rounded-full -z-0"></div>
            </div>

            {/* Content Side */}
            <div className="lg:w-1/2 text-center lg:text-left">
                <img src="https://picsum.photos/id/102/100/100" alt="badge" className="w-16 h-16 rounded-full mb-6 mx-auto lg:mx-0 opacity-80 border border-gold-500/30 p-1" />
                
                <p className="text-gold-500 font-serif italic text-xl mb-2">Chef's Recommendation</p>
                <h2 className="text-4xl md:text-6xl font-serif text-white mb-6 leading-tight">
                  Lake Kivu <br /> <span className="text-gold-500">Whole Tilapia</span>
                </h2>
                
                <p className="text-gray-400 text-lg leading-relaxed mb-8 font-light">
                    Fresh whole Tilapia straight from Lake Kivu, marinated in our secret blend of Rwandan herbs and spices, then charcoal-grilled to perfection. Served with golden fried plantains, Kachumbari salad, and lemon butter sauce.
                </p>
                
                <div className="flex items-center justify-center lg:justify-start gap-6 mb-10">
                    <span className="text-gold-500 text-4xl font-bold font-serif">$25.00</span>
                    <span className="text-gray-600 text-xl line-through font-serif decoration-red-500">$35.00</span>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                    <a 
                        href="#reservation" 
                        onClick={(e) => scrollToSection(e, 'reservation')}
                        className="px-10 py-4 bg-gold-500 text-dark-900 font-bold uppercase tracking-widest hover:bg-white transition-colors shadow-lg"
                    >
                        Order Now
                    </a>
                    <a 
                        href="#menu" 
                        onClick={(e) => scrollToSection(e, 'menu')}
                        className="px-10 py-4 border border-white/20 text-white font-bold uppercase tracking-widest hover:bg-white/10 transition-colors"
                    >
                        View Menu
                    </a>
                </div>
            </div>

        </div>
      </div>
    </section>
  );
};