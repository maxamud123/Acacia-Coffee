import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CheckCircle, Printer, ArrowLeft, Download, ShoppingBag, MapPin, Calendar, CreditCard, Mail, Phone } from 'lucide-react';
import { Logo } from './Logo';

export const OrderReceipt: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const order = location.state;

  if (!order) {
    return (
      <div className="min-h-screen bg-dark-900 flex items-center justify-center p-4">
        <div className="text-center">
          <p className="text-gray-400 mb-4">No order details found.</p>
          <button 
            onClick={() => navigate('/')}
            className="px-6 py-2 bg-gold-500 text-dark-900 font-bold uppercase rounded-sm hover:bg-white transition-colors"
          >
            Return Home
          </button>
        </div>
      </div>
    );
  }

  const handlePrint = () => {
    window.print();
  };

  const isCartOrder = order.cartItems && order.cartItems.length > 0;
  const currency = order.currency || 'RWF';

  return (
    <div className="min-h-screen bg-dark-900 print:bg-white py-12 px-4 flex flex-col items-center justify-center relative print:p-0">
      <div className="absolute inset-0 overflow-hidden pointer-events-none print:hidden">
          <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-gold-500/5 rounded-full blur-[100px]"></div>
          <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-gold-500/5 rounded-full blur-[100px]"></div>
      </div>

      <div className="w-full max-w-2xl animate-slide-up relative z-10 print:max-w-full print:w-full">
        
        {/* Actions */}
        <div className="flex justify-between items-center mb-6 print:hidden">
            <button 
                onClick={() => navigate('/')}
                className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm font-bold uppercase tracking-wider"
            >
                <ArrowLeft size={16} /> Back to Home
            </button>
            <button 
                onClick={handlePrint}
                className="flex items-center gap-2 px-4 py-2 bg-dark-800 text-gold-500 border border-gold-500/30 rounded-sm hover:bg-gold-500 hover:text-dark-900 transition-all text-sm font-bold uppercase tracking-wider"
            >
                <Printer size={16} /> Print Receipt
            </button>
        </div>

        {/* Receipt Card */}
        <div className="bg-white text-dark-900 rounded-sm overflow-hidden shadow-2xl relative print:shadow-none print:border print:border-gray-200">
            {/* Top Pattern */}
            <div className="h-2 bg-gold-500 w-full pattern-zigzag print:bg-black"></div>
            
            <div className="p-8 md:p-12 print:p-8">
                {/* Header */}
                <div className="text-center border-b-2 border-dashed border-gray-200 pb-8 mb-8">
                    <div className="flex justify-center mb-4 text-dark-900">
                        <Logo className="w-16 h-16" />
                    </div>
                    <h1 className="font-serif text-3xl font-bold mb-2">CAFE ACACIA</h1>
                    <p className="text-xs uppercase tracking-[0.3em] text-gray-500 mb-6">Premium Dining Experience</p>
                    
                    <div className="inline-flex items-center gap-2 px-4 py-1 bg-green-100 text-green-800 rounded-full text-xs font-bold uppercase tracking-wide print:border print:border-gray-300">
                        <CheckCircle size={14} /> Payment Successful
                    </div>
                </div>

                {/* Order Info Grid */}
                <div className="grid md:grid-cols-2 gap-8 mb-8">
                    <div>
                        <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">Customer Details</h3>
                        <div className="space-y-3 text-sm">
                            <div className="flex items-start gap-3">
                                <span className="font-bold min-w-[80px]">Name:</span>
                                <span className="text-gray-600">{order.name}</span>
                            </div>
                            <div className="flex items-start gap-3">
                                <span className="font-bold min-w-[80px]">Email:</span>
                                <span className="text-gray-600">{order.email}</span>
                            </div>
                            <div className="flex items-start gap-3">
                                <span className="font-bold min-w-[80px]">Phone:</span>
                                <span className="text-gray-600">{order.phone}</span>
                            </div>
                            <div className="flex items-start gap-3">
                                <span className="font-bold min-w-[80px]">Address:</span>
                                <span className="text-gray-600">{order.address}</span>
                            </div>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">Order Info</h3>
                        <div className="space-y-3 text-sm">
                            <div className="flex items-center gap-3">
                                <Calendar size={14} className="text-gold-500 print:text-black" />
                                <span className="text-gray-600">{order.date} • {order.time}</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <CreditCard size={14} className="text-gold-500 print:text-black" />
                                <span className="text-gray-600 capitalize">{order.paymentMethod === 'momo' ? 'Mobile Money' : 'Credit Card'}</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <ShoppingBag size={14} className="text-gold-500 print:text-black" />
                                <span className="text-gray-600 font-mono">ID: {order.id?.slice(0, 8).toUpperCase() || 'ORD-8X92'}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Items Table */}
                <div className="bg-gray-50 p-6 rounded-sm mb-8 print:bg-white print:border print:border-gray-200">
                    <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">Order Summary</h3>
                    
                    {isCartOrder ? (
                         <div className="space-y-4 mb-4 pb-4 border-b border-gray-200">
                            {order.cartItems.map((item: any) => (
                                <div key={item.id} className="flex items-center gap-4">
                                     <div className="w-12 h-12 bg-gray-200 rounded overflow-hidden shrink-0 print:border print:border-gray-300">
                                         <img src={item.image} className="w-full h-full object-cover" alt="Product" />
                                     </div>
                                     <div className="flex-1">
                                         <h4 className="font-bold text-dark-900 text-sm">{item.name}</h4>
                                     </div>
                                     <div className="text-right">
                                         <p className="text-xs text-gray-500">x{item.quantity}</p>
                                         <p className="font-bold text-sm">{(item.numericPrice * item.quantity).toFixed(2)}</p>
                                     </div>
                                </div>
                            ))}
                         </div>
                    ) : (
                        <div className="flex items-center gap-4 mb-4 pb-4 border-b border-gray-200">
                            <div className="w-16 h-16 bg-gray-200 rounded overflow-hidden print:border print:border-gray-300">
                                <img src="https://picsum.photos/id/425/100/100" className="w-full h-full object-cover" alt="Product" />
                            </div>
                            <div className="flex-1">
                                <h4 className="font-bold text-dark-900">{order.productName}</h4>
                                <p className="text-xs text-gray-500">Premium Tasting Experience</p>
                            </div>
                            <div className="text-right">
                                <p className="text-sm text-gray-500">x{order.quantity}</p>
                                <p className="font-bold">{order.pricePerUnit?.toLocaleString()} {currency}</p>
                            </div>
                        </div>
                    )}

                    <div className="space-y-2 pt-2">
                        <div className="flex justify-between text-sm text-gray-500">
                            <span>Subtotal</span>
                            <span>{order.amount?.toLocaleString()} {currency}</span>
                        </div>
                        <div className="flex justify-between text-sm text-gray-500">
                            <span>Tax (Included)</span>
                            <span>0 {currency}</span>
                        </div>
                        <div className="flex justify-between items-center text-lg font-bold text-dark-900 border-t border-gray-200 pt-4 mt-2">
                            <span>Total Paid</span>
                            <span className="text-gold-500 print:text-black">{order.amount?.toLocaleString()} {currency}</span>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="text-center text-xs text-gray-400 leading-relaxed">
                    <p className="mb-2">Thank you for choosing Cafe Acacia.</p>
                    <p>For any queries, please contact <span className="text-gold-500 print:text-black">info@cafeacacia.com</span> or call <span className="text-gold-500 print:text-black">+250 787 217 72</span></p>
                    <div className="mt-6 flex justify-center">
                         <div className="w-32 h-8 bg-gray-800 rounded flex items-center justify-center text-white font-mono tracking-widest opacity-80 print:bg-black print:text-white">
                             BARCODE
                         </div>
                    </div>
                </div>
            </div>

            {/* Bottom Pattern */}
             <div className="h-2 bg-dark-900 w-full pattern-zigzag print:bg-black"></div>
        </div>
      </div>
    </div>
  );
};