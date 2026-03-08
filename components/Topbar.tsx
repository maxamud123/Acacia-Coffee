import React from 'react';
import { MapPin, Clock, Phone, Mail } from 'lucide-react';

export const Topbar: React.FC = () => {
  return (
    <div className="hidden lg:flex justify-between items-center bg-[#0e1013] border-b border-white/10 px-8 py-3 absolute top-0 left-0 w-full z-[51] text-xs font-sans tracking-wide text-gray-400">
      
      <div className="flex items-center gap-8">
        <div className="flex items-center gap-2 group cursor-default">
          <MapPin size={14} className="text-gold-500" />
          <span className="group-hover:text-white transition-colors">Kisiment kg 201 Rukiri 2 house no. 10A, Kigali, Rwanda</span>
        </div>
        
        <div className="flex items-center gap-2 group cursor-default">
          <Clock size={14} className="text-gold-500" />
          <span className="group-hover:text-white transition-colors">Mon - Fri: 09:00 - 22:00</span>
        </div>
      </div>

      <div className="flex items-center gap-8">
        <a href="tel:+25078721772" className="flex items-center gap-2 group">
          <Phone size={14} className="text-gold-500" />
          <span className="group-hover:text-white transition-colors">+250 787 217 72</span>
        </a>
        
        <a href="mailto:info@cafeacacia.com" className="flex items-center gap-2 group">
          <Mail size={14} className="text-gold-500" />
          <span className="group-hover:text-white transition-colors">info@cafeacacia.com</span>
        </a>
      </div>

    </div>
  );
};