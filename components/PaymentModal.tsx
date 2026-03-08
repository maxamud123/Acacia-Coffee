import React, { useState } from 'react';
import { X, CreditCard, Smartphone, Lock, CheckCircle, Loader2, Mail, User, MapPin, Globe, ShieldCheck, ArrowLeft, ChevronRight, Edit2 } from 'lucide-react';
import { db } from '../services/db';
import { useNavigate } from 'react-router-dom';
import { CartItem, useCart } from '../context/CartContext';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  productName: string;
  quantity: number;
  pricePerUnit: number;
  cartItems?: CartItem[];
  currency?: string;
}

type CheckoutStep = 'details' | 'review';

export const PaymentModal: React.FC<PaymentModalProps> = ({ 
  isOpen, 
  onClose, 
  productName, 
  quantity, 
  pricePerUnit,
  cartItems,
  currency = 'RWF'
}) => {
  const [step, setStep] = useState<CheckoutStep>('details');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'momo'>('momo');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { clearCart } = useCart();

  // Form State
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  
  // Card State
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvc, setCvc] = useState('');

  if (!isOpen) return null;

  // If cartItems exist, calculate total from them (pricePerUnit here acts as total if cartItems present)
  const isCartOrder = cartItems && cartItems.length > 0;
  const totalAmount = isCartOrder ? pricePerUnit : pricePerUnit * quantity;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (step === 'details') {
      setStep('review');
      return;
    }

    if (step === 'review') {
      handlePayment();
    }
  };

  const handlePayment = async () => {
    setLoading(true);

    // Simulate Payment Gateway processing time
    await new Promise(resolve => setTimeout(resolve, 3000));

    try {
      let orderMessage = `[PAID ${isCartOrder ? 'CART ORDER' : 'ORDER'}] `;
      
      if (isCartOrder) {
          const itemsList = cartItems?.map(i => `${i.name} (x${i.quantity})`).join(', ');
          orderMessage += `${itemsList} | Total: ${currency} ${totalAmount}`;
      } else {
          orderMessage += `${productName} x ${quantity} | Total: ${currency} ${totalAmount}`;
      }
      
      orderMessage += ` | Email: ${email} | Address: ${address}`;

      // Create the order in the database
      const newOrder = await db.create({
        name: name,
        phone: phone,
        persons: isCartOrder ? `${cartItems?.length} Item Types` : `${quantity} Package(s)`,
        date: new Date().toLocaleDateString(),
        time: new Date().toLocaleTimeString(),
        bookingType: isCartOrder ? 'buffet' : 'tour', // Reusing buffet for food orders
        message: orderMessage,
        amount: totalAmount,
        paymentStatus: 'paid'
      });

      if (isCartOrder) {
        clearCart();
      }

      setLoading(false);
      
      // Prepare order data for receipt
      const orderData = {
        id: newOrder._id,
        name,
        email,
        phone,
        address,
        productName: isCartOrder ? 'Mixed Order' : productName,
        quantity: isCartOrder ? cartItems?.reduce((acc, item) => acc + item.quantity, 0) : quantity,
        pricePerUnit: isCartOrder ? 0 : pricePerUnit,
        amount: totalAmount,
        date: new Date().toLocaleDateString(),
        time: new Date().toLocaleTimeString(),
        paymentMethod,
        cartItems: isCartOrder ? cartItems : null,
        currency
      };

      // Navigate to order confirmation
      navigate('/order-confirmation', { state: orderData });
      
    } catch (error) {
      console.error("Payment failed", error);
      setLoading(false);
      alert("Payment failed. Please try again.");
    }
  };

  const handleClose = () => {
    setStep('details');
    onClose();
    // Reset form after animation clears
    setTimeout(() => {
        setName('');
        setPhone('');
        setEmail('');
        setAddress('');
        setCardNumber('');
        setExpiry('');
        setCvc('');
    }, 500);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/95 backdrop-blur-md" onClick={handleClose}></div>

      {/* Modal Content */}
      <div className="relative bg-[#0e1013] w-full max-w-4xl rounded-xl shadow-2xl border border-gold-500/20 overflow-hidden flex flex-col md:flex-row max-h-[95vh] animate-slide-up">
        
        {/* Close Button */}
        <button 
            onClick={handleClose} 
            className="absolute top-4 right-4 z-20 text-gray-400 hover:text-white transition-colors p-2 hover:bg-gray-800 rounded-full"
        >
            <X size={20} />
        </button>

        {/* Left Panel: Steps & Content */}
        <div className="flex-1 flex flex-col h-full overflow-hidden relative">
             
             {/* Header */}
             <div className="p-6 border-b border-gray-800 bg-[#0e1013] z-10">
                <div className="flex items-center gap-2 mb-2">
                    <ShieldCheck className="text-gold-500" size={20} />
                    <h3 className="text-white font-serif text-xl tracking-wide">Secure Checkout</h3>
                </div>
                
                {/* Stepper */}
                <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest">
                    <span className={`px-2 py-1 rounded ${step === 'details' ? 'bg-gold-500 text-dark-900' : 'bg-gray-800 text-gray-500'}`}>1. Details</span>
                    <ChevronRight size={12} className="text-gray-700" />
                    <span className={`px-2 py-1 rounded ${step === 'review' ? 'bg-gold-500 text-dark-900' : 'bg-gray-800 text-gray-500'}`}>2. Review</span>
                </div>
             </div>

             {/* Loading Overlay */}
             {loading && (
                <div className="absolute inset-0 z-50 bg-dark-900/90 backdrop-blur-sm flex flex-col items-center justify-center">
                    <div className="relative">
                        <div className="absolute inset-0 bg-gold-500 blur-xl opacity-20 rounded-full animate-pulse"></div>
                        <Loader2 className="w-16 h-16 text-gold-500 animate-spin mb-6 relative z-10" />
                    </div>
                    <p className="text-white font-serif text-2xl tracking-wider animate-pulse mb-2">Processing Payment</p>
                    <p className="text-gray-400 text-xs uppercase tracking-widest">Please wait, do not close this window</p>
                </div>
             )}

             {/* Form Content */}
             <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 md:p-8 space-y-8 custom-scrollbar bg-gradient-to-br from-dark-900 to-[#16191d]">
                
                {step === 'details' ? (
                    <div className="space-y-10 animate-slide-up">
                         {/* Contact Info */}
                        <section>
                            <h4 className="text-white font-bold uppercase tracking-widest text-xs mb-6 flex items-center gap-3">
                                <span className="w-6 h-6 rounded-full bg-dark-800 border border-gray-700 text-gold-500 flex items-center justify-center text-xs font-bold">1</span>
                                Billing Details
                            </h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="relative group md:col-span-2">
                                    <User className="absolute top-3.5 left-3.5 text-gray-500 group-focus-within:text-gold-500 transition-colors" size={18} />
                                    <input 
                                        type="text" 
                                        required 
                                        value={name}
                                        onChange={e => setName(e.target.value)}
                                        className="w-full bg-dark-800 border border-gray-700 rounded-lg pl-12 pr-4 py-3 text-white text-sm focus:border-gold-500 focus:outline-none focus:ring-1 focus:ring-gold-500 transition-all shadow-inner"
                                        placeholder="Full Name"
                                    />
                                </div>
                                <div className="relative group">
                                    <Mail className="absolute top-3.5 left-3.5 text-gray-500 group-focus-within:text-gold-500 transition-colors" size={18} />
                                    <input 
                                        type="email" 
                                        required 
                                        value={email}
                                        onChange={e => setEmail(e.target.value)}
                                        className="w-full bg-dark-800 border border-gray-700 rounded-lg pl-12 pr-4 py-3 text-white text-sm focus:border-gold-500 focus:outline-none focus:ring-1 focus:ring-gold-500 transition-all shadow-inner"
                                        placeholder="Email Address"
                                    />
                                </div>
                                <div className="relative group">
                                    <MapPin className="absolute top-3.5 left-3.5 text-gray-500 group-focus-within:text-gold-500 transition-colors" size={18} />
                                    <input 
                                        type="text" 
                                        required 
                                        value={address}
                                        onChange={e => setAddress(e.target.value)}
                                        className="w-full bg-dark-800 border border-gray-700 rounded-lg pl-12 pr-4 py-3 text-white text-sm focus:border-gold-500 focus:outline-none focus:ring-1 focus:ring-gold-500 transition-all shadow-inner"
                                        placeholder="City, Country"
                                    />
                                </div>
                            </div>
                        </section>

                        {/* Payment Method */}
                        <section>
                            <h4 className="text-white font-bold uppercase tracking-widest text-xs mb-6 flex items-center gap-3">
                                <span className="w-6 h-6 rounded-full bg-dark-800 border border-gray-700 text-gold-500 flex items-center justify-center text-xs font-bold">2</span>
                                Select Payment Method
                            </h4>
                            
                            <div className="grid grid-cols-2 gap-4 mb-8">
                                <button
                                    type="button"
                                    onClick={() => setPaymentMethod('momo')}
                                    className={`group relative flex flex-col items-center justify-center p-6 h-40 rounded-xl border-2 transition-all duration-300 gap-3 ${
                                        paymentMethod === 'momo' 
                                        ? 'bg-gold-500/10 border-gold-500 shadow-[0_0_20px_rgba(209,160,84,0.2)]' 
                                        : 'bg-dark-800 border-gray-700 hover:border-gray-500 hover:bg-dark-700'
                                    }`}
                                >
                                    <div className={`w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300 ${
                                        paymentMethod === 'momo' ? 'bg-gold-500 text-dark-900 scale-110' : 'bg-dark-900 text-gray-500 group-hover:bg-dark-800'
                                    }`}>
                                        <Smartphone size={32} />
                                    </div>
                                    <div className="text-center">
                                        <span className={`block font-bold uppercase text-sm tracking-widest mb-1 ${
                                            paymentMethod === 'momo' ? 'text-white' : 'text-gray-400'
                                        }`}>Mobile Money</span>
                                        <span className="text-[10px] text-gray-500 font-bold bg-dark-900 px-2 py-1 rounded-full border border-gray-700 inline-block">MTN / Airtel</span>
                                    </div>
                                    {paymentMethod === 'momo' && (
                                        <div className="absolute top-3 right-3 animate-zoom-in">
                                            <CheckCircle size={24} className="text-gold-500 fill-dark-900" />
                                        </div>
                                    )}
                                </button>
                                
                                <button
                                    type="button"
                                    onClick={() => setPaymentMethod('card')}
                                    className={`group relative flex flex-col items-center justify-center p-6 h-40 rounded-xl border-2 transition-all duration-300 gap-3 ${
                                        paymentMethod === 'card' 
                                        ? 'bg-gold-500/10 border-gold-500 shadow-[0_0_20px_rgba(209,160,84,0.2)]' 
                                        : 'bg-dark-800 border-gray-700 hover:border-gray-500 hover:bg-dark-700'
                                    }`}
                                >
                                    <div className={`w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300 ${
                                        paymentMethod === 'card' ? 'bg-gold-500 text-dark-900 scale-110' : 'bg-dark-900 text-gray-500 group-hover:bg-dark-800'
                                    }`}>
                                        <CreditCard size={32} />
                                    </div>
                                    <div className="text-center">
                                        <span className={`block font-bold uppercase text-sm tracking-widest mb-1 ${
                                            paymentMethod === 'card' ? 'text-white' : 'text-gray-400'
                                        }`}>Card Payment</span>
                                        <span className="text-[10px] text-gray-500 font-bold bg-dark-900 px-2 py-1 rounded-full border border-gray-700 inline-block">Visa / Master</span>
                                    </div>
                                    {paymentMethod === 'card' && (
                                        <div className="absolute top-3 right-3 animate-zoom-in">
                                            <CheckCircle size={24} className="text-gold-500 fill-dark-900" />
                                        </div>
                                    )}
                                </button>
                            </div>

                            {paymentMethod === 'momo' ? (
                                <div className="bg-dark-800 p-6 rounded-xl border border-gray-700 animate-slide-down">
                                    <label className="block text-xs text-gray-400 mb-2 font-bold uppercase tracking-wider">Enter Mobile Number</label>
                                    <div className="flex group focus-within:ring-1 focus-within:ring-gold-500 rounded-lg transition-all">
                                        <div className="bg-dark-900 border border-gray-700 border-r-0 rounded-l-lg px-4 py-3 text-gold-500 font-bold text-sm flex items-center">
                                            +250
                                        </div>
                                        <input 
                                            type="tel" 
                                            required 
                                            value={phone}
                                            onChange={e => setPhone(e.target.value)}
                                            className="flex-1 bg-dark-900 border border-gray-700 rounded-r-lg px-4 py-3 text-white text-lg font-mono focus:outline-none transition-colors"
                                            placeholder="788 000 000"
                                        />
                                    </div>
                                    <p className="text-[10px] text-gray-500 mt-3 flex items-center gap-2">
                                        <Lock size={12} className="text-green-500" />
                                        You will receive a secure prompt on your phone to complete the transaction.
                                    </p>
                                </div>
                            ) : (
                                <div className="bg-dark-800 p-6 rounded-xl border border-gray-700 space-y-5 animate-slide-down">
                                    <div>
                                        <label className="block text-xs text-gray-400 mb-2 font-bold uppercase tracking-wider">Card Number</label>
                                        <div className="relative group">
                                            <input 
                                                type="text" 
                                                required 
                                                value={cardNumber}
                                                onChange={e => setCardNumber(e.target.value)}
                                                className="w-full bg-dark-900 border border-gray-700 rounded-lg px-4 py-3 pl-12 text-white font-mono text-sm focus:border-gold-500 focus:outline-none focus:ring-1 focus:ring-gold-500 transition-colors"
                                                placeholder="0000 0000 0000 0000"
                                            />
                                            <CreditCard className="absolute left-4 top-3.5 text-gray-500 group-focus-within:text-gold-500" size={18} />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-5">
                                        <div>
                                            <label className="block text-xs text-gray-400 mb-2 font-bold uppercase tracking-wider">Expiry Date</label>
                                            <input 
                                                type="text" 
                                                required 
                                                value={expiry}
                                                onChange={e => setExpiry(e.target.value)}
                                                className="w-full bg-dark-900 border border-gray-700 rounded-lg px-4 py-3 text-white font-mono text-sm focus:border-gold-500 focus:outline-none focus:ring-1 focus:ring-gold-500 transition-colors"
                                                placeholder="MM / YY"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs text-gray-400 mb-2 font-bold uppercase tracking-wider">CVC</label>
                                            <div className="relative group">
                                                <input 
                                                    type="text" 
                                                    required 
                                                    value={cvc}
                                                    onChange={e => setCvc(e.target.value)}
                                                    className="w-full bg-dark-900 border border-gray-700 rounded-lg px-4 py-3 text-white font-mono text-sm focus:border-gold-500 focus:outline-none focus:ring-1 focus:ring-gold-500 transition-colors"
                                                    placeholder="123"
                                                />
                                                <Lock className="absolute right-4 top-3.5 text-gray-500 group-focus-within:text-gold-500" size={16} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </section>
                    </div>
                ) : (
                    <div className="space-y-8 animate-slide-up">
                        <div className="flex items-center justify-between border-b border-gray-800 pb-4">
                            <h4 className="text-white font-bold uppercase tracking-widest text-sm">Review & Confirm</h4>
                            <button type="button" onClick={() => setStep('details')} className="text-gold-500 text-xs flex items-center gap-1 hover:underline font-bold uppercase tracking-wider">
                                <Edit2 size={12} /> Edit Details
                            </button>
                        </div>

                        <div className="bg-dark-800 rounded-xl border border-gray-700 overflow-hidden">
                            <div className="p-6 border-b border-gray-700">
                                <p className="text-gray-500 text-xs uppercase tracking-wider mb-2">Billed To</p>
                                <p className="text-white font-bold text-lg">{name}</p>
                                <p className="text-gray-400 text-sm">{email}</p>
                                <p className="text-gray-400 text-sm">{address}</p>
                            </div>
                            <div className="p-6 bg-dark-900/50">
                                <p className="text-gray-500 text-xs uppercase tracking-wider mb-2">Payment Method</p>
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-dark-800 flex items-center justify-center border border-gray-700 text-gold-500">
                                        {paymentMethod === 'momo' ? <Smartphone size={18} /> : <CreditCard size={18} />}
                                    </div>
                                    <div>
                                        <p className="text-white font-bold text-sm capitalize">{paymentMethod === 'momo' ? 'Mobile Money' : 'Credit Card'}</p>
                                        <p className="text-gray-500 text-xs">
                                            {paymentMethod === 'momo' ? `+250 ${phone}` : `Ends in ${cardNumber.slice(-4)}`}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="p-6 bg-gradient-to-r from-gold-600/20 to-gold-500/10 border border-gold-500/30 rounded-xl text-center relative overflow-hidden">
                            <div className="absolute top-0 left-0 w-full h-1 bg-gold-500/50"></div>
                            <p className="text-gold-500 text-xs uppercase tracking-widest font-bold mb-2">Total Amount to be charged</p>
                            <p className="text-4xl font-serif text-white font-bold">{totalAmount.toLocaleString()} <span className="text-lg font-sans text-gray-400 font-normal">{currency}</span></p>
                        </div>
                    </div>
                )}

                <div className="mt-8 pt-6 border-t border-gray-800 flex gap-4">
                     {step === 'review' && (
                        <button 
                            type="button" 
                            onClick={() => setStep('details')}
                            className="w-1/3 py-4 bg-dark-800 text-gray-400 font-bold uppercase tracking-widest hover:bg-dark-700 hover:text-white transition-all duration-300 rounded-lg border border-gray-700 flex items-center justify-center gap-2 text-sm"
                        >
                            <ArrowLeft size={16} /> Back
                        </button>
                     )}
                     
                    <button 
                        type="submit" 
                        disabled={loading}
                        className="flex-1 py-4 bg-gold-500 text-dark-900 font-bold uppercase tracking-widest hover:bg-white transition-all duration-300 rounded-lg shadow-lg hover:shadow-gold-500/20 flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed text-sm group"
                    >
                        {step === 'details' ? (
                            <>Next Step <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" /></>
                        ) : (
                            <>
                                <Lock size={16} />
                                Confirm & Pay {totalAmount.toLocaleString()}
                            </>
                        )}
                    </button>
                </div>

             </form>

        </div>

        {/* Right Panel: Order Summary (Desktop only) */}
        <div className="hidden md:flex bg-[#0b0c0f] border-l border-gray-800 w-80 p-8 flex-col">
            <h4 className="text-white font-bold uppercase tracking-widest text-xs mb-8 flex items-center gap-2">
                <ShieldCheck size={14} className="text-gold-500" /> Order Summary
            </h4>
            
            <div className="flex-1 overflow-y-auto custom-scrollbar">
                {isCartOrder ? (
                    <div className="space-y-4">
                        {cartItems?.map(item => (
                            <div key={item.id} className="flex gap-3 mb-4">
                                <div className="w-12 h-12 bg-dark-800 rounded border border-gray-700 overflow-hidden shrink-0">
                                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                </div>
                                <div>
                                    <p className="text-white font-bold text-sm leading-tight line-clamp-1">{item.name}</p>
                                    <p className="text-gray-500 text-xs">x{item.quantity} • {item.price}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <>
                    <div className="relative mb-6 group">
                        <div className="absolute inset-0 bg-gold-500 blur opacity-20 group-hover:opacity-30 transition-opacity"></div>
                        <div className="relative w-full aspect-square bg-dark-800 rounded-lg border border-gray-700 overflow-hidden">
                                <img src="https://picsum.photos/id/425/400/400" className="w-full h-full object-cover" alt="Product" />
                        </div>
                    </div>
                    
                    <div className="mb-6">
                        <p className="text-white font-serif text-xl font-bold leading-tight mb-2">{productName}</p>
                        <div className="flex items-center gap-2 text-gray-500 text-xs uppercase tracking-wider">
                            <span className="bg-dark-800 px-2 py-1 rounded border border-gray-700">Qty: {quantity}</span>
                            <span>x {pricePerUnit.toLocaleString()}</span>
                        </div>
                    </div>
                    </>
                )}
                
                <div className="space-y-4 border-t border-gray-800 pt-6 text-sm mt-4">
                        <div className="flex justify-between text-gray-400">
                            <span>Subtotal</span>
                            <span>{totalAmount.toLocaleString()} {currency}</span>
                        </div>
                        <div className="flex justify-between text-gray-400">
                            <span>Service Fee</span>
                            <span className="text-green-500">0 {currency}</span>
                        </div>
                        <div className="flex justify-between text-gray-400">
                            <span>Taxes</span>
                            <span className="text-xs bg-gray-800 px-1.5 py-0.5 rounded">Incl.</span>
                        </div>
                </div>
            </div>

            <div className="border-t border-dashed border-gray-700 pt-6 mt-6">
                    <div className="flex justify-between items-end mb-2">
                        <span className="text-gray-300 font-bold text-sm uppercase tracking-wider">Total Due</span>
                        <span className="text-gold-500 font-serif text-2xl font-bold">{totalAmount.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center justify-center gap-3 mt-8 opacity-40 grayscale hover:grayscale-0 transition-all duration-500">
                        <CreditCard size={24} />
                        <Globe size={24} />
                        <ShieldCheck size={24} />
                    </div>
            </div>
        </div>

      </div>
    </div>
  );
};