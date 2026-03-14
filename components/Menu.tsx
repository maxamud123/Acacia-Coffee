import React, { useState, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { MENU_ITEMS } from '../constants';
import { scrollToSection } from '../utils';
import { useCart } from '../context/CartContext';

const CATEGORIES = [
  { key: 'hot-drinks',   label: 'Hot Drinks' },
  { key: 'iced-drinks',  label: 'Iced Drinks' },
  { key: 'tea-drinks',   label: 'Tea & Other Drinks' },
  { key: 'soft-drinks',  label: 'Soft Drinks' },
  { key: 'extras',       label: 'Extras' },
] as const;

type Category = typeof CATEGORIES[number]['key'];

export const Menu: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<Category>('hot-drinks');
  const { addToCart } = useCart();
  const tabsRef = useRef<HTMLDivElement>(null);

  const filteredItems = MENU_ITEMS.filter(item => item.category === activeCategory);

  const scrollTabs = (dir: 'left' | 'right') => {
    if (tabsRef.current) {
      tabsRef.current.scrollBy({ left: dir === 'left' ? -200 : 200, behavior: 'smooth' });
    }
  };

  return (
    <section id="menu" className="bg-white">

      {/* Category tabs bar — Kivu Noir style */}
      <div className="sticky top-[65px] z-40 bg-white border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-4 flex items-center gap-2">
          <button onClick={() => scrollTabs('left')} className="text-gray-400 hover:text-gray-700 p-1 shrink-0">
            <ChevronLeft size={18} />
          </button>
          <div ref={tabsRef} className="flex items-center gap-8 md:gap-12 overflow-x-auto scrollbar-hide flex-1">
            {CATEGORIES.map(({ key, label }) => (
              <button
                key={key}
                onClick={() => setActiveCategory(key)}
                className={`py-4 text-sm font-medium tracking-wide whitespace-nowrap transition-all duration-200 border-b-2 -mb-px shrink-0 ${
                  activeCategory === key
                    ? 'border-gray-900 text-gray-900'
                    : 'border-transparent text-gray-500 hover:text-gray-800'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
          <button onClick={() => scrollTabs('right')} className="text-gray-400 hover:text-gray-700 p-1 shrink-0">
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      {/* Menu content — light gray background like Kivu Noir */}
      <div style={{ backgroundColor: '#f2f2f2' }} className="py-16">
        <div className="container mx-auto px-6 md:px-10 max-w-5xl">

          {/* Section heading — Kivu Noir dotted separator style */}
          <div className="text-center mb-12">
            <h2 className="text-gray-900 text-lg font-serif mb-3 tracking-wider">
              {CATEGORIES.find(c => c.key === activeCategory)?.label}
            </h2>
            <div className="flex items-center justify-center gap-1">
              {[...Array(7)].map((_, i) => (
                <div key={i} className="w-1 h-1 rounded-full bg-gray-400" />
              ))}
            </div>
          </div>

          {/* 2-column menu grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-0">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className="group flex items-center gap-4 py-4 border-b border-gray-200 cursor-pointer hover:bg-white/60 -mx-3 px-3 transition-colors rounded"
                onClick={() => addToCart(item)}
              >
                {/* Square image */}
                <div className="w-14 h-14 shrink-0 rounded-lg overflow-hidden bg-gray-800">
                  <img
                    src={item.image}
                    alt={item.name}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                {/* Name + dotted line + price */}
                <div className="flex items-baseline flex-1 gap-0 min-w-0">
                  <span className="text-gray-900 font-medium text-sm shrink-0 group-hover:text-gray-600 transition-colors">
                    {item.name}
                  </span>
                  {/* Dotted leader */}
                  <span className="menu-leader-light" />
                  <span className="text-gray-800 font-medium text-sm shrink-0">
                    {item.price}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="text-center mt-16 pt-10 border-t border-gray-200">
            <p className="text-gray-400 text-xs uppercase tracking-[0.3em] mb-6 font-medium">
              Open daily &nbsp;·&nbsp; 07:00 AM – 10:00 PM
            </p>
            <a
              href="#reservation"
              onClick={(e) => scrollToSection(e, 'reservation')}
              className="inline-block px-10 py-3 border border-gray-800 text-gray-800 font-semibold uppercase text-[10px] tracking-[0.3em] hover:bg-gray-800 hover:text-white transition-all duration-300"
            >
              Reserve a Table
            </a>
          </div>

        </div>
      </div>
    </section>
  );
};
