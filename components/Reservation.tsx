import React, { useState, useEffect } from 'react';
import { Calendar, Clock, User, ChevronDown, Coffee, Utensils, Info } from 'lucide-react';
import { db } from '../services/db';
import { scrollToSection } from '../utils';

export const Reservation: React.FC = () => {
    const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');
    const [bookingType, setBookingType] = useState('buffet');
    const [persons, setPersons] = useState('1 Person');
    const [message, setMessage] = useState('');

    useEffect(() => {
        const handleBookingEvent = (e: Event) => {
            const customEvent = e as CustomEvent;
            if (customEvent.detail) {
                const { type, quantity, package: packageName } = customEvent.detail;
                setBookingType(type);
                setPersons(`${quantity} Person${quantity > 1 ? 's' : ''}`);
                setMessage(`Selected Package: ${packageName}\nTotal Quantity: ${quantity}\nPrice: ${100000 * quantity} RWF`);
            }
        };

        window.addEventListener('initiateBooking', handleBookingEvent);
        return () => window.removeEventListener('initiateBooking', handleBookingEvent);
    }, []);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setStatus('submitting');
        
        const form = e.currentTarget;
        const formData = new FormData(form);
        
        try {
            await db.create({
                name: formData.get('name') as string,
                phone: formData.get('phone') as string,
                persons: formData.get('persons') as string,
                date: formData.get('date') as string,
                time: formData.get('time') as string,
                bookingType: bookingType as 'buffet' | 'tour',
                message: formData.get('message') as string,
            });

            setStatus('success');
            form.reset();
            setMessage('');
            setBookingType('buffet');
            
            // Reset button after 3 seconds
            setTimeout(() => setStatus('idle'), 3000);
        } catch (error) {
            console.error("Booking failed", error);
            setStatus('idle');
            alert("Something went wrong. Please try again.");
        }
    };

  return (
    <section id="reservation" className="py-24 bg-dark-800 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute right-0 top-0 w-1/3 h-full bg-dark-700/30 -skew-x-12 transform translate-x-20 hidden lg:block pointer-events-none"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
            
            <div className="lg:w-1/3 text-center lg:text-left">
                <p className="text-gold-500 font-serif italic text-xl mb-2">Online Reservation</p>
                <div className="separator lg:justify-start"><div className="separator-icon"></div></div>
                <h2 className="text-4xl md:text-5xl font-serif text-white mb-6">
                    Book Experience
                </h2>
                <p className="text-gray-400 mb-8 leading-relaxed">
                    Secure your spot at Cafe Acacia. Whether you are joining us for our legendary buffet or a guided coffee tour, we look forward to hosting you.
                </p>
            </div>

            <div className="lg:w-2/3 bg-dark-900/80 backdrop-blur-sm p-8 md:p-12 rounded-sm shadow-2xl border border-white/5 w-full">
                <form onSubmit={handleSubmit} className="space-y-6">
                    
                    {/* Booking Type Selector - Visual Cards */}
                    <div className="grid grid-cols-2 gap-4">
                        <button
                            type="button"
                            onClick={() => setBookingType('buffet')}
                            className={`p-4 rounded-sm border-2 text-center transition-all duration-300 flex flex-col items-center gap-2 group ${
                                bookingType === 'buffet' 
                                ? 'border-gold-500 bg-gold-500/10 text-white shadow-[0_0_15px_rgba(209,160,84,0.3)]' 
                                : 'border-gray-700 bg-dark-900/50 text-gray-500 hover:border-gray-500 hover:bg-dark-800'
                            }`}
                        >
                            <Utensils size={24} className={`transition-colors ${bookingType === 'buffet' ? 'text-gold-500' : 'text-gray-500 group-hover:text-white'}`} />
                            <span className="font-bold uppercase tracking-widest text-xs">Dining Reservation</span>
                        </button>
                        
                        <button
                            type="button"
                            onClick={() => setBookingType('tour')}
                            className={`p-4 rounded-sm border-2 text-center transition-all duration-300 flex flex-col items-center gap-2 group ${
                                bookingType === 'tour' 
                                ? 'border-gold-500 bg-gold-500/10 text-white shadow-[0_0_15px_rgba(209,160,84,0.3)]' 
                                : 'border-gray-700 bg-dark-900/50 text-gray-500 hover:border-gray-500 hover:bg-dark-800'
                            }`}
                        >
                            <Coffee size={24} className={`transition-colors ${bookingType === 'tour' ? 'text-gold-500' : 'text-gray-500 group-hover:text-white'}`} />
                            <span className="font-bold uppercase tracking-widest text-xs">Coffee Tour</span>
                        </button>
                    </div>

                    <input type="hidden" name="bookingType" value={bookingType} />

                    {/* Contextual Info for Tour */}
                    {bookingType === 'tour' && (
                        <div className="bg-dark-800/50 p-4 rounded-sm border border-gold-500/20 text-center animate-fade-in">
                            <p className="text-gray-300 text-sm mb-2">Join our immersive coffee tasting journey.</p>
                            <a 
                                href="#experience" 
                                onClick={(e) => scrollToSection(e, 'experience')} 
                                className="text-gold-500 text-xs font-bold uppercase tracking-widest hover:underline flex items-center justify-center gap-1"
                            >
                                <Info size={14} /> View Tour Details & Pricing
                            </a>
                        </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="relative group">
                            <User className="absolute top-3 left-0 text-gold-500 group-hover:text-white transition-colors" size={18} />
                            <input 
                                type="text"
                                name="name" 
                                placeholder="Your Name" 
                                required
                                className="w-full bg-transparent text-white pl-8 pr-4 py-3 border-b border-gray-700 focus:border-gold-500 focus:outline-none transition-colors placeholder-gray-500" 
                            />
                        </div>
                        <div className="relative group">
                            <span className="absolute top-3 left-0 text-gold-500 group-hover:text-white transition-colors font-bold text-sm">+250</span>
                            <input 
                                type="tel"
                                name="phone" 
                                placeholder="Phone Number" 
                                required
                                className="w-full bg-transparent text-white pl-12 pr-4 py-3 border-b border-gray-700 focus:border-gold-500 focus:outline-none transition-colors placeholder-gray-500" 
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="relative group">
                            <div className="absolute top-3 left-0 text-gold-500 group-hover:text-white transition-colors pointer-events-none">
                                <User size={18} />
                            </div>
                             <select 
                                name="persons" 
                                value={persons}
                                onChange={(e) => setPersons(e.target.value)}
                                className="w-full bg-transparent text-white pl-8 pr-4 py-3 border-b border-gray-700 focus:border-gold-500 focus:outline-none appearance-none cursor-pointer text-gray-400"
                            >
                                <option>1 Person</option>
                                <option>2 Persons</option>
                                <option>3 Persons</option>
                                <option>4 Persons</option>
                                <option>5+ Persons</option>
                            </select>
                            <ChevronDown size={14} className="absolute top-4 right-0 text-gray-600 pointer-events-none" />
                        </div>
                        <div className="relative group">
                            <div className="absolute top-3 left-0 text-gold-500 group-hover:text-white transition-colors pointer-events-none">
                                <Calendar size={18} />
                            </div>
                            <input 
                                type="date"
                                name="date" 
                                required
                                className="w-full bg-transparent text-white pl-8 pr-4 py-3 border-b border-gray-700 focus:border-gold-500 focus:outline-none text-gray-400" 
                            />
                        </div>
                        <div className="relative group">
                            <div className="absolute top-3 left-0 text-gold-500 group-hover:text-white transition-colors pointer-events-none">
                                <Clock size={18} />
                            </div>
                            <select name="time" className="w-full bg-transparent text-white pl-8 pr-4 py-3 border-b border-gray-700 focus:border-gold-500 focus:outline-none appearance-none cursor-pointer text-gray-400">
                                <option>08:00 AM</option>
                                <option>09:00 AM</option>
                                <option>10:00 AM</option>
                                <option>11:00 AM</option>
                                <option>12:00 PM</option>
                                <option>01:00 PM</option>
                                <option>05:00 PM</option>
                                <option>06:00 PM</option>
                                <option>07:00 PM</option>
                                <option>08:00 PM</option>
                                <option>09:00 PM</option>
                            </select>
                            <ChevronDown size={14} className="absolute top-4 right-0 text-gray-600 pointer-events-none" />
                        </div>
                    </div>

                    <div className="relative">
                        <textarea 
                            name="message"
                            rows={3} 
                            placeholder="Message (Optional)"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            className="w-full bg-transparent text-white px-0 py-3 border-b border-gray-700 focus:border-gold-500 focus:outline-none placeholder-gray-500 resize-none"
                        ></textarea>
                    </div>

                    <button 
                        type="submit" 
                        disabled={status === 'submitting'}
                        className="w-full py-4 bg-gold-500 text-dark-900 font-bold uppercase tracking-widest hover:bg-white transition-all duration-300 shadow-lg hover:shadow-gold-500/20 disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                        {status === 'submitting' ? 'Processing...' : status === 'success' ? 'Booking Confirmed!' : 'Confirm Booking'}
                    </button>
                </form>
            </div>
        </div>
      </div>
    </section>
  );
};