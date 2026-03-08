import React, { useState, useEffect } from 'react';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import { scrollToSection } from '../utils';

interface HeroProps {
  welcomeMessage: string;
}

const HERO_SLIDES = [
    {
        id: 1,
        image: "https://picsum.photos/id/431/1920/1080",
        subtitle: "Traditional & Hygiene",
        title: "For the Love of Delicious Food",
        text: "Come with family & feel the joy of mouthwatering food"
    },
    {
        id: 2,
        image: "https://picsum.photos/id/292/1920/1080",
        subtitle: "Delightful Experience",
        title: "Flavors Inspired by the Seasons",
        text: "Experience the art of culinary excellence in every bite"
    },
    {
        id: 3,
        image: "https://picsum.photos/id/225/1920/1080",
        subtitle: "Amazing & Delicious",
        title: "Where Every Flavor Tells a Story",
        text: "Crafted with passion, served with elegance"
    }
];

export const Hero: React.FC<HeroProps> = ({ welcomeMessage }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
        nextSlide();
    }, 7000);
    return () => clearInterval(interval);
  }, [currentSlide]);

  const nextSlide = () => {
    if(isAnimating) return;
    setIsAnimating(true);
    setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    setTimeout(() => setIsAnimating(false), 800);
  };

  const prevSlide = () => {
    if(isAnimating) return;
    setIsAnimating(true);
    setCurrentSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
    setTimeout(() => setIsAnimating(false), 800);
  };

  const slide = HERO_SLIDES[currentSlide];

  return (
    <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
      
      {/* Background Slider */}
      {HERO_SLIDES.map((item, index) => (
         <div 
            key={item.id}
            className={`absolute inset-0 z-0 overflow-hidden transition-opacity duration-1000 ${index === currentSlide ? 'opacity-100' : 'opacity-0'}`}
         >
            <div 
                className={`w-full h-full bg-cover bg-center ${index === currentSlide ? 'animate-zoom-in' : ''}`}
                style={{ backgroundImage: `url('${item.image}')` }}
            ></div>
            <div className="absolute inset-0 bg-gradient-to-b from-dark-900/70 via-dark-900/50 to-dark-900/90" />
         </div>
      ))}

      {/* Content */}
      <div className="container mx-auto px-4 z-10 text-center flex flex-col items-center">
        
        <div key={currentSlide} className="animate-slide-up">
            <p className="text-gold-500 text-lg sm:text-xl font-serif italic mb-4 tracking-wider flex items-center justify-center gap-3">
               <span className="w-8 h-[2px] bg-gold-500 inline-block"></span>
               {welcomeMessage || slide.subtitle}
               <span className="w-8 h-[2px] bg-gold-500 inline-block"></span>
            </p>
            
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif text-white font-bold mb-8 leading-tight drop-shadow-2xl max-w-4xl mx-auto">
              {slide.title}
            </h1>

            <p className="text-gray-200 max-w-2xl mx-auto text-lg mb-10 leading-relaxed font-light tracking-wide">
              {slide.text}
            </p>

            <a 
              href="#menu" 
              onClick={(e) => scrollToSection(e, 'menu')}
              className="inline-flex items-center gap-2 px-10 py-4 bg-gold-500 text-dark-900 font-bold uppercase tracking-widest hover:bg-white transition-all duration-300 rounded-sm"
            >
                View Our Menu
                <ChevronRight size={18} />
            </a>
        </div>

      </div>
      
      {/* Navigation Buttons */}
      <button 
        onClick={prevSlide}
        className="absolute left-4 md:left-8 top-1/2 transform -translate-y-1/2 text-white/50 hover:text-gold-500 transition-colors z-20 hidden md:block"
      >
        <ChevronLeft size={48} />
      </button>
      <button 
        onClick={nextSlide}
        className="absolute right-4 md:right-8 top-1/2 transform -translate-y-1/2 text-white/50 hover:text-gold-500 transition-colors z-20 hidden md:block"
      >
        <ChevronRight size={48} />
      </button>

      {/* Decorative scroll indicator */}
      <a href="#about" onClick={(e) => scrollToSection(e, 'about')} className="absolute bottom-12 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2 group cursor-pointer z-20">
         <span className="text-[10px] uppercase tracking-widest text-gold-500 group-hover:text-white transition-colors">Scroll Down</span>
         <div className="w-[1px] h-12 bg-gray-700 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1/2 bg-gold-500 animate-slide-down"></div>
         </div>
      </a>
    </section>
  );
};