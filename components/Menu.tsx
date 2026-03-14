import React, { useState } from 'react';
import { MENU_ITEMS } from '../constants';
import { scrollToSection } from '../utils';
import { useCart } from '../context/CartContext';

const CATEGORIES = [
  { key: 'breakfast', label: 'Breakfast' },
  { key: 'lunch',     label: 'Lunch' },
  { key: 'dinner',    label: 'Dinner' },
  { key: 'drinks',    label: 'Drinks' },
] as const;

type Category = typeof CATEGORIES[number]['key'];

export const Menu: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<Category>('breakfast');
  const { addToCart } = useCart();

  const filteredItems = MENU_ITEMS.filter(item => item.category === activeCategory);

  return (
    <section id="menu" className="bg-white">

      {/* Category tabs bar — Kivu Noir style full-width gray strip */}
      <div className="sticky top-0 z-40 bg-white border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-6 md:px-10">
          <div className="flex items-center justify-center gap-8 md:gap-14 overflow-x-auto">
            {CATEGORIES.map(({ key, label }) => (
              <button
                key={key}
                onClick={() => setActiveCategory(key)}
                className={`py-4 text-sm font-medium tracking-wider whitespace-nowrap transition-all duration-200 border-b-2 -mb-px ${
                  activeCategory === key
                    ? 'border-gold-500 text-gray-900'
                    : 'border-transparent text-gray-400 hover:text-gray-700'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Menu content */}
      <div className="container mx-auto px-6 md:px-10 py-16 max-w-5xl">

        {/* Section heading — Kivu Noir dotted separator style */}
        <div className="text-center mb-12">
          <h2 className="text-gray-900 text-lg font-serif mb-3 tracking-wider">
            {CATEGORIES.find(c => c.key === activeCategory)?.label}
          </h2>
          {/* Kivu Noir dots separator */}
          <div className="flex items-center justify-center gap-1">
            {[...Array(7)].map((_, i) => (
              <div key={i} className="w-1 h-1 rounded-full bg-gray-300" />
            ))}
          </div>
        </div>

        {/* 2-column menu grid — exact Kivu Noir layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-0">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="group flex items-center gap-4 py-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 -mx-3 px-3 transition-colors"
              onClick={() => addToCart(item)}
            >
              {/* Square image — Kivu Noir style */}
              <div className="w-14 h-14 shrink-0 rounded-lg overflow-hidden bg-gray-100">
                <img
                  src={item.image}
                  alt={item.name}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Name + dotted line + price */}
              <div className="flex items-baseline flex-1 gap-0 min-w-0">
                <span className="text-gray-900 font-medium text-sm shrink-0 group-hover:text-gold-600 transition-colors">
                  {item.name}
                </span>
                {item.seasonal && (
                  <span className="ml-2 text-[9px] text-green-600 font-semibold uppercase tracking-wider shrink-0">·seasonal</span>
                )}
                {/* Dotted leader — Kivu Noir style */}
                <span className="menu-leader-light" />
                <span className="text-gray-700 font-medium text-sm shrink-0">
                  {item.price}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Book a table CTA */}
        <div className="text-center mt-16 pt-10 border-t border-gray-100">
          <p className="text-gray-400 text-xs uppercase tracking-[0.3em] mb-6 font-medium">
            Open daily &nbsp;·&nbsp; 09:00 AM – 10:00 PM
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
    </section>
  );
};
