import React, { useState } from 'react';
import { X, Minus, Plus, ShoppingBag, Trash2 } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { PaymentModal } from './PaymentModal';

export const CartSidebar: React.FC = () => {
  const { items, isOpen, setIsOpen, removeFromCart, updateQuantity, cartTotal } = useCart();
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  if (!isOpen) return null;

  const handleCheckout = () => {
    setIsCheckoutOpen(true);
    // Keep sidebar open behind modal or close it? Let's close it for cleaner UI
    setIsOpen(false); 
  };

  return (
    <>
      <div className="fixed inset-0 z-[60] overflow-hidden">
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity" onClick={() => setIsOpen(false)} />
        
        <div className="absolute inset-y-0 right-0 max-w-full flex">
          <div className="w-screen max-w-md bg-dark-900 border-l border-gold-500/20 shadow-2xl flex flex-col h-full animate-slide-down md:animate-slide-up">
            
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-800">
              <h2 className="text-xl font-serif text-white flex items-center gap-2">
                <ShoppingBag className="text-gold-500" size={20} />
                Your Order
              </h2>
              <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white transition-colors">
                <X size={24} />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center text-gray-500 space-y-4">
                  <ShoppingBag size={48} className="opacity-20" />
                  <p>Your cart is empty.</p>
                  <button onClick={() => setIsOpen(false)} className="text-gold-500 font-bold uppercase text-xs tracking-widest hover:underline">
                    Browse Menu
                  </button>
                </div>
              ) : (
                items.map((item) => (
                  <div key={item.id} className="flex gap-4 group">
                    <div className="w-20 h-20 rounded-sm overflow-hidden border border-gray-800 shrink-0">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-1">
                        <h3 className="font-serif text-white group-hover:text-gold-500 transition-colors line-clamp-1">{item.name}</h3>
                        <p className="text-gold-500 font-bold text-sm">${(item.numericPrice * item.quantity).toFixed(2)}</p>
                      </div>
                      <p className="text-xs text-gray-500 mb-3 line-clamp-1">{item.category}</p>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center border border-gray-700 rounded-sm">
                          <button onClick={() => updateQuantity(item.id, -1)} className="p-1 text-gray-400 hover:text-white hover:bg-gray-800"><Minus size={12} /></button>
                          <span className="px-3 text-xs font-bold text-white">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.id, 1)} className="p-1 text-gray-400 hover:text-white hover:bg-gray-800"><Plus size={12} /></button>
                        </div>
                        <button onClick={() => removeFromCart(item.id)} className="text-gray-600 hover:text-red-500 transition-colors">
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="p-6 border-t border-gray-800 bg-dark-800">
                <div className="flex justify-between items-center mb-6">
                  <span className="text-gray-400 font-bold text-sm uppercase tracking-wider">Subtotal</span>
                  <span className="text-2xl font-serif text-white">${cartTotal.toFixed(2)}</span>
                </div>
                <button 
                  onClick={handleCheckout}
                  className="w-full py-4 bg-gold-500 text-dark-900 font-bold uppercase tracking-widest hover:bg-white transition-all duration-300 shadow-lg"
                >
                  Checkout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <PaymentModal 
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        productName="Online Order"
        pricePerUnit={cartTotal}
        quantity={1}
        cartItems={items}
        currency="USD"
      />
    </>
  );
};