import React, { useState } from 'react';
import { MENU_ITEMS } from '../constants';
import { scrollToSection } from '../utils';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const Menu: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'breakfast' | 'lunch' | 'dinner' | 'drinks'>('all');
  const { addToCart } = useCart();

  const filteredItems = activeCategory === 'all' 
    ? MENU_ITEMS 
    : MENU_ITEMS.filter(item => item.category === activeCategory);

  return (
    <section id="menu" className="py-24 bg-dark-900 relative">
      <div className="container mx-auto px-4 relative z-10">
        
        <div className="text-center mb-16">
            <p className="text-gold-500 font-serif italic text-xl mb-2">Special Selection</p>
            <div className="separator"><div className="separator-icon"></div></div>
            <h2 className="text-4xl md:text-5xl font-serif text-white">Delicious Menu</h2>
        </div>

        {/* Filter Links */}
        <div className="flex flex-wrap justify-center gap-8 md:gap-12 mb-16">
            {['all', 'breakfast', 'lunch', 'dinner', 'drinks'].map((cat) => (
                <button
                    key={cat}
                    onClick={() => setActiveCategory(cat as any)}
                    className={`relative pb-2 uppercase tracking-widest text-sm font-bold transition-all duration-300 ${
                        activeCategory === cat 
                        ? 'text-gold-500' 
                        : 'text-gray-500 hover:text-white'
                    }`}
                >
                    {cat}
                    {activeCategory === cat && (
                        <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1/2 h-[2px] bg-gold-500"></span>
                    )}
                </button>
            ))}
        </div>

        {/* Menu List Layout */}
        <div className="grid md:grid-cols-2 gap-x-20 gap-y-12 max-w-6xl mx-auto">
            {filteredItems.map((item) => (
                <div key={item.id} className="flex items-center gap-6 group hover:-translate-y-1 transition-transform duration-300">
                    <div className="w-20 h-20 shrink-0 rounded-full overflow-hidden border-2 border-gold-500/20 group-hover:border-gold-500 transition-colors relative">
                         <img 
                            src={item.image} 
                            alt={item.name} 
                            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                        />
                    </div>
                    
                    <div className="flex-1">
                        <div className="flex justify-between items-baseline mb-2">
                            <h3 className="text-lg md:text-xl font-serif text-white font-bold group-hover:text-gold-500 transition-colors cursor-pointer" onClick={() => addToCart(item)}>
                                {item.name}
                            </h3>
                            <span className="menu-leader"></span>
                            <span className="text-gold-500 font-bold text-lg">{item.price}</span>
                        </div>
                        <p className="text-gray-400 text-sm leading-relaxed font-sans mb-3">{item.description}</p>
                        
                        <div className="flex justify-between items-center">
                             {item.seasonal ? (
                                <span className="inline-block text-[10px] uppercase tracking-widest text-green-500 font-bold">
                                    ★ Seasonal
                                </span>
                             ) : <span></span>}
                             
                             <button 
                                onClick={() => addToCart(item)}
                                className="flex items-center gap-1 text-[10px] uppercase tracking-widest font-bold text-gray-500 hover:text-gold-500 transition-colors border border-gray-700 hover:border-gold-500 px-3 py-1 rounded-sm"
                             >
                                <ShoppingCart size={12} /> Add
                             </button>
                        </div>
                    </div>
                </div>
            ))}
        </div>

        <div className="text-center mt-20">
            <p className="text-gray-400 mb-6 italic font-serif">Open daily from <span className="text-gold-500">09:00 AM</span> to <span className="text-gold-500">10:00 PM</span></p>
            <a 
                href="#reservation" 
                onClick={(e) => scrollToSection(e, 'reservation')}
                className="inline-block px-10 py-4 border border-gold-500 text-gold-500 font-bold uppercase tracking-widest hover:bg-gold-500 hover:text-dark-900 transition-all duration-300"
            >
                Book A Table
            </a>
        </div>

      </div>
    </section>
  );
};