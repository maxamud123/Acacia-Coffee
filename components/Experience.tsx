import React, { useState } from 'react';
import { Package, Coffee, Info, Minus, Plus, ShoppingCart, ArrowRight } from 'lucide-react';
import { PaymentModal } from './PaymentModal';

const RELATED_ITEMS = [
  {
      id: 1,
      name: 'Premium Bourbon Beans',
      image: 'https://picsum.photos/id/1060/400/300',
      price: '15,000 RWF',
      type: 'Product'
  },
  {
      id: 2,
      name: 'Barista Masterclass',
      image: 'https://picsum.photos/id/425/400/300',
      price: '50,000 RWF',
      type: 'Workshop'
  },
  {
      id: 3,
      name: 'Coffee Blossom Honey',
      image: 'https://picsum.photos/id/312/400/300',
      price: '8,000 RWF',
      type: 'Product'
  }
];

export const Experience: React.FC = () => {
  const [quantity, setQuantity] = useState(1);
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  const PRICE_PER_UNIT = 100000;

  const handleDecrease = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const handleIncrease = () => {
    setQuantity(quantity + 1);
  };

  const handleAddToCart = () => {
    setIsPaymentOpen(true);
  };

  return (
    <section id="experience" className="py-24 bg-dark-900 relative">
      <div className="container mx-auto px-4">
        
        {/* Header */}
        <div className="text-center mb-16">
            <p className="text-gold-500 font-serif italic text-xl mb-2">Discover True Specialty</p>
            <div className="separator"><div className="separator-icon"></div></div>
            <h2 className="text-4xl md:text-5xl font-serif text-white">Tasting Experience</h2>
        </div>

        {/* Product Layout */}
        <div className="flex flex-col lg:flex-row gap-16 mb-24">
            
            {/* Left: Image */}
            <div className="lg:w-1/2">
                <div className="relative rounded-sm overflow-hidden border border-gold-500/20 shadow-2xl group h-full max-h-[600px]">
                    <img 
                        src="https://picsum.photos/id/425/800/800" 
                        alt="Coffee Cupping Experience" 
                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-dark-900/40 to-transparent pointer-events-none"></div>
                </div>
            </div>
            
            {/* Right: Product Details */}
            <div className="lg:w-1/2 flex flex-col justify-center">
                <h3 className="text-4xl font-serif text-white mb-2">TASTING EXPERIENCE</h3>
                
                <div className="mb-6 border-b border-gray-800 pb-6">
                    <p className="text-gold-500 text-2xl font-bold font-serif mb-1">{PRICE_PER_UNIT.toLocaleString()} RWF</p>
                    <p className="text-gray-500 text-xs uppercase tracking-wider">Tax included.</p>
                </div>

                <div className="space-y-6 text-gray-300 mb-8">
                    <p className="leading-relaxed">
                        Producing true specialty coffee means teaching and inspiring coffee enthusiasts and enlightening them on every step of producing their favorite coffee.
                    </p>
                    <p className="leading-relaxed">
                        At Cafe Acacia coffee cupping session you will taste coffee like a professional and compare at each coffee per estate. These will vary by profile, and process type (natural, fully washed, honey, and funky).
                    </p>
                    <p className="italic text-gold-500">
                        Experience this and become a coffee connoisseur within one sitting!
                    </p>
                </div>

                {/* Controls */}
                <div className="bg-dark-800 p-6 rounded-sm border border-white/5 space-y-6">
                    
                    {/* Package Selector */}
                    <div className="space-y-2">
                        <label className="text-xs uppercase tracking-widest text-gray-400 font-bold">Package</label>
                        <div className="relative">
                            <select className="w-full bg-dark-900 text-white border border-gray-700 rounded-sm px-4 py-3 appearance-none focus:border-gold-500 focus:outline-none cursor-pointer">
                                <option>EXPERIMENTAL TASTING</option>
                            </select>
                            <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none text-gold-500">
                                <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" /></svg>
                            </div>
                        </div>
                    </div>

                    {/* Quantity */}
                    <div className="space-y-2">
                        <label className="text-xs uppercase tracking-widest text-gray-400 font-bold">Quantity</label>
                        <div className="flex items-center w-32 bg-dark-900 border border-gray-700 rounded-sm">
                            <button 
                                onClick={handleDecrease}
                                className="w-10 h-10 flex items-center justify-center text-gray-400 hover:text-white transition-colors"
                            >
                                <Minus size={14} />
                            </button>
                            <div className="flex-1 text-center text-white font-bold">{quantity}</div>
                            <button 
                                onClick={handleIncrease}
                                className="w-10 h-10 flex items-center justify-center text-gray-400 hover:text-white transition-colors"
                            >
                                <Plus size={14} />
                            </button>
                        </div>
                    </div>

                    {/* Add to Cart Button */}
                    <button 
                        onClick={handleAddToCart}
                        className="w-full py-4 bg-gold-500 text-dark-900 font-bold uppercase tracking-widest hover:bg-white transition-all duration-300 shadow-lg flex items-center justify-center gap-2"
                    >
                        <ShoppingCart size={18} />
                        Add to cart
                    </button>
                    
                    <p className="text-center text-xs text-gray-500">
                        Secure checkout powered by local payment partners.
                    </p>
                </div>
            </div>
        </div>

        {/* Shop Information Grid */}
        <div className="bg-dark-800 p-8 md:p-12 rounded-sm border border-white/5 mb-24">
            <h3 className="text-2xl font-serif text-white mb-8 text-center border-b border-gray-700 pb-4">Additional Information</h3>
            
            <div className="grid md:grid-cols-2 gap-8">
                
                {/* Dimensions */}
                <div className="space-y-4">
                     <div className="flex items-center gap-3 text-gold-500 mb-2">
                        <Package size={24} />
                        <h4 className="text-white font-bold uppercase tracking-wider text-sm">Package Dimensions</h4>
                    </div>
                    <ul className="text-sm text-gray-400 space-y-3">
                        <li className="border-l-2 border-gray-700 pl-3">
                            <strong className="text-white block mb-1">CA 1lb/453 gr</strong>
                            23 cm length (unfolded), 12 cm length (folded), 13cm front view width, 8cm side view width.
                        </li>
                        <li className="border-l-2 border-gray-700 pl-3">
                            <strong className="text-white block mb-1">CA 2.2lb/1kg</strong>
                            30cm length (unfolded), 20 cm length (folded), 15cm front view width, 10cm side view width.
                        </li>
                        <li className="border-l-2 border-gray-700 pl-3">
                            <strong className="text-white block mb-1">CA Limited Edition Cylinders</strong>
                            9 cm diameter and 10 cm length.
                        </li>
                    </ul>
                </div>

                {/* Care */}
                <div className="space-y-4">
                     <div className="flex items-center gap-3 text-gold-500 mb-2">
                        <Coffee size={24} />
                        <h4 className="text-white font-bold uppercase tracking-wider text-sm">Care Instructions</h4>
                    </div>
                    <p className="text-sm text-gray-400 leading-relaxed">
                        Keep your Cafe Acacia coffee in an airtight container away from heat, moisture, and direct sunlight to maintain optimal taste.
                    </p>
                    <div className="bg-dark-900 p-4 rounded border border-gray-700/50 flex items-start gap-3">
                        <Info size={16} className="text-gold-500 shrink-0 mt-0.5" />
                        <span className="text-xs text-gray-300 italic">Store in a cool dry place for best preservation of flavor notes.</span>
                    </div>
                </div>

            </div>
        </div>

        {/* You Might Also Like */}
        <div className="border-t border-gray-800 pt-16">
            <div className="flex justify-between items-end mb-12">
                <div>
                    <p className="text-gold-500 font-serif italic text-lg mb-2">Curated for You</p>
                    <h3 className="text-3xl font-serif text-white">You Might Also Like</h3>
                </div>
                <button className="hidden sm:flex items-center gap-2 text-gold-500 font-bold uppercase text-xs tracking-widest hover:text-white transition-colors group">
                    View All Products <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </button>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
                {RELATED_ITEMS.map(item => (
                    <div key={item.id} className="group cursor-pointer">
                        <div className="relative overflow-hidden rounded-sm mb-6 aspect-[4/3] border border-gray-800 group-hover:border-gold-500/50 transition-colors">
                             <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors z-10"></div>
                             <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                             <div className="absolute top-4 left-4 z-20 bg-dark-900/90 backdrop-blur-sm px-3 py-1.5 text-[10px] uppercase font-bold text-gold-500 rounded-sm border border-gold-500/20">{item.type}</div>
                             
                             <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-dark-900 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-500 z-20 flex justify-between items-center">
                                <span className="text-white text-xs font-bold uppercase tracking-wider">Quick View</span>
                                <div className="bg-gold-500 p-2 rounded-full text-dark-900">
                                    <ShoppingCart size={14} />
                                </div>
                             </div>
                        </div>
                        <h4 className="text-white font-serif text-xl mb-2 group-hover:text-gold-500 transition-colors">{item.name}</h4>
                        <p className="text-gray-400 font-bold text-sm">{item.price}</p>
                    </div>
                ))}
            </div>
        </div>

      </div>

      <PaymentModal 
        isOpen={isPaymentOpen} 
        onClose={() => setIsPaymentOpen(false)} 
        productName="EXPERIMENTAL TASTING"
        quantity={quantity}
        pricePerUnit={PRICE_PER_UNIT}
      />
    </section>
  );
};