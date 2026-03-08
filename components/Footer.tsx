import React from 'react';
import { Facebook, Twitter, Instagram, Youtube, MapPin, Phone, Mail, Lock, Send } from 'lucide-react';
import { scrollToSection } from '../utils';
import { Logo } from './Logo';

interface FooterProps {
  onOpenAdmin?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenAdmin }) => {
  const handleContactSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = {
        name: formData.get('name'),
        email: formData.get('email'),
        subject: formData.get('subject'),
        message: formData.get('message')
    };
    console.log('Contact Form Data:', data);
    alert('Thank you for your message! We have logged it to the console.');
    e.currentTarget.reset();
  };

  return (
    <footer id="footer" className="bg-dark-900 pt-24 border-t border-gray-800 relative overflow-hidden">
      
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/cubes.png')" }}></div>

      <div className="container mx-auto px-4 relative z-10">
        
        {/* Contact & Newsletter Section */}
        <div className="grid lg:grid-cols-3 gap-8 mb-20">
            
            {/* Contact Form */}
            <div className="lg:col-span-2 bg-dark-800 rounded-sm p-8 md:p-10 border border-white/5 shadow-2xl">
                 <h3 className="text-2xl md:text-3xl font-serif text-white mb-2">Get in Touch</h3>
                 <p className="text-gray-400 mb-8 text-sm">Have a question or want to work together? Drop us a line!</p>
                 
                 <form onSubmit={handleContactSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <input 
                            name="name"
                            type="text" 
                            placeholder="Your Name" 
                            required
                            className="w-full bg-dark-900 border border-gray-700 text-white px-5 py-3 focus:border-gold-500 focus:outline-none rounded-sm transition-colors"
                        />
                    </div>
                    <div className="space-y-2">
                        <input 
                            name="email"
                            type="email" 
                            placeholder="Your Email" 
                            required
                            className="w-full bg-dark-900 border border-gray-700 text-white px-5 py-3 focus:border-gold-500 focus:outline-none rounded-sm transition-colors"
                        />
                    </div>
                    <div className="md:col-span-2 space-y-2">
                        <input 
                            name="subject"
                            type="text" 
                            placeholder="Subject" 
                            required
                            className="w-full bg-dark-900 border border-gray-700 text-white px-5 py-3 focus:border-gold-500 focus:outline-none rounded-sm transition-colors"
                        />
                    </div>
                    <div className="md:col-span-2 space-y-2">
                        <textarea 
                            name="message"
                            rows={3}
                            placeholder="Message" 
                            required
                            className="w-full bg-dark-900 border border-gray-700 text-white px-5 py-3 focus:border-gold-500 focus:outline-none rounded-sm transition-colors resize-none"
                        ></textarea>
                    </div>
                    <div className="md:col-span-2">
                        <button type="submit" className="px-8 py-3 bg-gold-500 text-dark-900 font-bold uppercase tracking-widest hover:bg-white transition-colors rounded-sm flex items-center gap-2">
                            Send Message <Send size={16} />
                        </button>
                    </div>
                 </form>
            </div>

            {/* Newsletter */}
            <div className="bg-dark-800 rounded-sm p-8 border border-white/5 shadow-2xl flex flex-col justify-center">
                <h3 className="text-2xl font-serif text-white mb-2">Newsletter</h3>
                <p className="text-gray-400 mb-6 text-sm leading-relaxed">Subscribe to our newsletter to get the latest news and special offers.</p>
                <form className="flex flex-col gap-4">
                    <input 
                        type="email" 
                        placeholder="Email Address" 
                        className="bg-dark-900 border border-gray-700 text-white px-5 py-3 focus:border-gold-500 focus:outline-none rounded-sm w-full"
                    />
                    <button className="px-8 py-3 bg-transparent border border-gold-500 text-gold-500 font-bold uppercase tracking-widest hover:bg-gold-500 hover:text-dark-900 transition-colors rounded-sm w-full">
                        Subscribe
                    </button>
                </form>
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            
            {/* Brand */}
            <div className="flex flex-col items-center md:items-start text-center md:text-left">
                <a href="#" onClick={(e) => scrollToSection(e, 'home')} className="flex items-center gap-3 mb-6 group">
                    <div className="text-gold-500 group-hover:text-white transition-colors">
                        <Logo className="w-14 h-14" />
                    </div>
                    <div className="flex flex-col text-left">
                        <span className="text-white font-serif text-3xl tracking-widest font-bold">CAFE ACACIA</span>
                        <span className="text-gold-500 text-xs tracking-[0.3em] uppercase">KIGALI</span>
                    </div>
                </a>
                <p className="text-gray-400 mb-6 leading-relaxed">
                    Restaurant authentic and tasty food, taste perception to last a lifetime. We create delicious memories.
                </p>
                <div className="flex gap-4">
                    <a href="#" className="w-10 h-10 rounded-full bg-dark-800 flex items-center justify-center text-gray-400 hover:bg-gold-500 hover:text-dark-900 transition-all border border-gray-700 hover:border-gold-500">
                        <Facebook size={18} />
                    </a>
                    <a href="#" className="w-10 h-10 rounded-full bg-dark-800 flex items-center justify-center text-gray-400 hover:bg-gold-500 hover:text-dark-900 transition-all border border-gray-700 hover:border-gold-500">
                        <Twitter size={18} />
                    </a>
                    <a 
                        href="https://www.instagram.com/cafeacacia.rw?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="w-10 h-10 rounded-full bg-dark-800 flex items-center justify-center text-gray-400 hover:bg-gold-500 hover:text-dark-900 transition-all border border-gray-700 hover:border-gold-500"
                    >
                        <Instagram size={18} />
                    </a>
                    <a href="#" className="w-10 h-10 rounded-full bg-dark-800 flex items-center justify-center text-gray-400 hover:bg-gold-500 hover:text-dark-900 transition-all border border-gray-700 hover:border-gold-500">
                        <Youtube size={18} />
                    </a>
                </div>
            </div>

            {/* Links */}
            <div className="text-center md:text-left">
                <h4 className="text-white font-serif text-xl mb-6">Quick Links</h4>
                <ul className="space-y-4">
                    <li><a href="#home" onClick={(e) => scrollToSection(e, 'home')} className="text-gray-400 hover:text-gold-500 transition-colors flex items-center justify-center md:justify-start gap-2 group"><span className="w-0 overflow-hidden group-hover:w-3 transition-all duration-300 text-gold-500">›</span> Home</a></li>
                    <li><a href="#menu" onClick={(e) => scrollToSection(e, 'menu')} className="text-gray-400 hover:text-gold-500 transition-colors flex items-center justify-center md:justify-start gap-2 group"><span className="w-0 overflow-hidden group-hover:w-3 transition-all duration-300 text-gold-500">›</span> Menus</a></li>
                    <li><a href="#about" onClick={(e) => scrollToSection(e, 'about')} className="text-gray-400 hover:text-gold-500 transition-colors flex items-center justify-center md:justify-start gap-2 group"><span className="w-0 overflow-hidden group-hover:w-3 transition-all duration-300 text-gold-500">›</span> About Us</a></li>
                    <li><a href="#reservation" onClick={(e) => scrollToSection(e, 'reservation')} className="text-gray-400 hover:text-gold-500 transition-colors flex items-center justify-center md:justify-start gap-2 group"><span className="w-0 overflow-hidden group-hover:w-3 transition-all duration-300 text-gold-500">›</span> Book Table</a></li>
                </ul>
            </div>

             {/* Contact */}
             <div className="text-center md:text-left">
                <h4 className="text-white font-serif text-xl mb-6">Contact Us</h4>
                <ul className="space-y-6">
                    <li className="flex items-start justify-center md:justify-start gap-3 text-gray-400">
                        <MapPin className="text-gold-500 shrink-0 mt-1" size={18} />
                        <span>Kisiment kg 201 Rukiri 2 <br/> house no. 10A, Kigali, Rwanda</span>
                    </li>
                    <li className="flex items-center justify-center md:justify-start gap-3 text-gray-400">
                        <Phone className="text-gold-500 shrink-0" size={18} />
                        <span>+250 787 217 72</span>
                    </li>
                    <li className="flex items-center justify-center md:justify-start gap-3 text-gray-400">
                        <Mail className="text-gold-500 shrink-0" size={18} />
                        <span>info@cafeacacia.com</span>
                    </li>
                </ul>
            </div>

            {/* Hours */}
            <div className="text-center md:text-left">
                <h4 className="text-white font-serif text-xl mb-6">Opening Hours</h4>
                <ul className="space-y-3 text-gray-400">
                    <li className="flex justify-between border-b border-gray-800 pb-2">
                        <span>Monday - Friday</span>
                        <span className="text-gold-500">09:00 - 22:00</span>
                    </li>
                    <li className="flex justify-between border-b border-gray-800 pb-2">
                        <span>Saturday</span>
                        <span className="text-gold-500">10:00 - 23:00</span>
                    </li>
                    <li className="flex justify-between pb-2">
                        <span>Sunday</span>
                        <span className="text-gold-500">10:00 - 23:00</span>
                    </li>
                </ul>
            </div>
        </div>

        <div className="border-t border-gray-800 py-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 text-sm">
                &copy; 2024 <span className="text-gold-500">Cafe Acacia</span>. All Rights Reserved.
            </p>
            {onOpenAdmin && (
                <button 
                    onClick={onOpenAdmin}
                    className="text-gray-700 hover:text-gold-500 text-xs flex items-center gap-1 transition-colors"
                >
                    <Lock size={12} />
                    Staff Access
                </button>
            )}
        </div>
      </div>
    </footer>
  );
};