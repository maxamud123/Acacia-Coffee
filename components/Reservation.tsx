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
      setTimeout(() => setStatus('idle'), 3000);
    } catch (error) {
      console.error("Booking failed", error);
      setStatus('idle');
      alert("Something went wrong. Please try again.");
    }
  };

  const inputClass = "w-full bg-white border border-gray-200 text-gray-900 px-4 py-3 focus:border-gold-500 focus:outline-none rounded-sm transition-colors text-sm placeholder-gray-400";
  const selectClass = "w-full bg-white border border-gray-200 text-gray-600 px-4 py-3 focus:border-gold-500 focus:outline-none appearance-none cursor-pointer rounded-sm text-sm";

  return (
    <section id="reservation" className="py-24 bg-white border-t border-gray-100">
      <div className="container mx-auto px-6 md:px-10">

        <div className="flex flex-col lg:flex-row gap-16 items-start max-w-5xl mx-auto">

          {/* Left info */}
          <div className="lg:w-2/5">
            <p className="text-gold-500 text-[10px] tracking-[0.5em] uppercase mb-3 font-medium">Online Reservation</p>
            <h2 className="text-3xl md:text-4xl font-serif text-gray-900 font-bold tracking-wide mb-4">
              Book an Experience
            </h2>
            <div className="w-10 h-px bg-gold-500/50 mb-6" />
            <p className="text-gray-500 leading-relaxed text-sm">
              Secure your spot at Cafe Acacia. Whether you are joining us for our legendary buffet or a guided coffee tour, we look forward to hosting you.
            </p>

            <div className="mt-10 space-y-4">
              <div className="flex items-center gap-3 text-gray-600 text-sm">
                <Clock size={16} className="text-gold-500 shrink-0" />
                <span>Mon – Fri: 09:00 – 22:00</span>
              </div>
              <div className="flex items-center gap-3 text-gray-600 text-sm">
                <Clock size={16} className="text-gold-500 shrink-0" />
                <span>Sat – Sun: 10:00 – 23:00</span>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="lg:w-3/5 bg-white p-8 md:p-10 shadow-sm border border-gray-100 rounded-sm w-full">
            <form onSubmit={handleSubmit} className="space-y-5">

              {/* Booking type */}
              <div className="grid grid-cols-2 gap-3">
                <button type="button" onClick={() => setBookingType('buffet')}
                  className={`p-4 rounded-sm border text-center transition-all flex flex-col items-center gap-2 text-sm font-medium ${
                    bookingType === 'buffet'
                      ? 'border-gold-500 bg-gold-500/5 text-gray-900'
                      : 'border-gray-200 text-gray-400 hover:border-gray-300'
                  }`}>
                  <Utensils size={20} className={bookingType === 'buffet' ? 'text-gold-500' : 'text-gray-400'} />
                  <span className="text-xs uppercase tracking-widest">Dining</span>
                </button>
                <button type="button" onClick={() => setBookingType('tour')}
                  className={`p-4 rounded-sm border text-center transition-all flex flex-col items-center gap-2 text-sm font-medium ${
                    bookingType === 'tour'
                      ? 'border-gold-500 bg-gold-500/5 text-gray-900'
                      : 'border-gray-200 text-gray-400 hover:border-gray-300'
                  }`}>
                  <Coffee size={20} className={bookingType === 'tour' ? 'text-gold-500' : 'text-gray-400'} />
                  <span className="text-xs uppercase tracking-widest">Coffee Tour</span>
                </button>
              </div>

              {bookingType === 'tour' && (
                <div className="bg-amber-50 p-4 rounded-sm border border-gold-500/20 text-center">
                  <p className="text-gray-600 text-sm mb-1">Join our immersive coffee tasting journey.</p>
                  <a href="#experience" onClick={(e) => scrollToSection(e, 'experience')}
                    className="text-gold-500 text-xs font-semibold uppercase tracking-widest hover:underline flex items-center justify-center gap-1">
                    <Info size={12} /> View Tour Details
                  </a>
                </div>
              )}

              <input type="hidden" name="bookingType" value={bookingType} />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input type="text" name="name" placeholder="Your Name" required className={inputClass} />
                <div className="relative">
                  <span className="absolute top-3 left-4 text-gray-400 text-sm font-medium">+250</span>
                  <input type="tel" name="phone" placeholder="Phone Number" required
                    className={inputClass + " pl-14"} />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="relative">
                  <select name="persons" value={persons} onChange={e => setPersons(e.target.value)} className={selectClass}>
                    <option>1 Person</option><option>2 Persons</option><option>3 Persons</option>
                    <option>4 Persons</option><option>5+ Persons</option>
                  </select>
                  <ChevronDown size={14} className="absolute top-4 right-3 text-gray-400 pointer-events-none" />
                </div>
                <input type="date" name="date" required className={selectClass} />
                <div className="relative">
                  <select name="time" className={selectClass}>
                    {["08:00 AM","09:00 AM","10:00 AM","11:00 AM","12:00 PM","01:00 PM","05:00 PM","06:00 PM","07:00 PM","08:00 PM","09:00 PM"].map(t => (
                      <option key={t}>{t}</option>
                    ))}
                  </select>
                  <ChevronDown size={14} className="absolute top-4 right-3 text-gray-400 pointer-events-none" />
                </div>
              </div>

              <textarea name="message" rows={3} placeholder="Message (Optional)" value={message}
                onChange={(e) => setMessage(e.target.value)}
                className={inputClass + " resize-none"}></textarea>

              <button type="submit" disabled={status === 'submitting'}
                className="w-full py-4 bg-gray-900 text-white font-semibold uppercase tracking-widest text-xs hover:bg-gold-500 transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed rounded-sm">
                {status === 'submitting' ? 'Processing...' : status === 'success' ? '✓ Booking Confirmed!' : 'Confirm Booking'}
              </button>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
};
