import React, { useEffect, useState } from 'react';
import { X, Trash2, RefreshCcw, Download, Search, CheckCircle, XCircle, Database, Filter, DollarSign, Printer } from 'lucide-react';
import { db } from '../services/db';
import { Booking, BookingStatus } from '../types';
import { useNavigate } from 'react-router-dom';

interface AdminDashboardProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ isOpen, onClose }) => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<BookingStatus | 'all'>('all');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const loadBookings = async () => {
    setLoading(true);
    const data = await db.getAll();
    setBookings(data);
    setLoading(false);
  };

  useEffect(() => {
    if (isOpen) {
      loadBookings();
    }
  }, [isOpen]);

  const handleStatusChange = async (id: string, newStatus: BookingStatus) => {
      await db.updateStatus(id, newStatus);
      await loadBookings(); // Refresh data
  };

  const clearBookings = async () => {
    if (confirm('Are you sure you want to delete all booking history? This cannot be undone.')) {
      await db.clear();
      setBookings([]);
    }
  };

  const downloadData = () => {
      const dataStr = JSON.stringify(bookings, null, 2);
      const blob = new Blob([dataStr], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = "cafe_acacia_bookings.json";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
  };

  const handlePrintReceipt = (booking: Booking) => {
      // Parse email and address from message if available (format: " | Email: ... | Address: ...")
      let email = '';
      let address = '';
      
      if (booking.message) {
          const emailMatch = booking.message.match(/Email:\s*([^|]+)/);
          if (emailMatch) email = emailMatch[1].trim();
          
          const addressMatch = booking.message.match(/Address:\s*([^|]+)/);
          if (addressMatch) address = addressMatch[1].trim();
      }

      const receiptData = {
          id: booking._id,
          name: booking.name,
          phone: booking.phone,
          email: email || 'N/A',
          address: address || 'N/A',
          productName: booking.bookingType === 'tour' ? 'Coffee Tour Experience' : 'Dining Reservation',
          quantity: parseInt(booking.persons) || 1,
          amount: booking.amount || 0,
          date: booking.date,
          time: booking.time,
          paymentMethod: 'N/A',
          currency: 'RWF'
      };

      onClose();
      navigate('/order-confirmation', { state: receiptData });
  };

  // Filter logic
  const filteredBookings = bookings.filter(booking => {
    const matchesSearch = booking.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          booking.phone.includes(searchTerm);
    const matchesStatus = filterStatus === 'all' || booking.status === filterStatus;
    
    return matchesSearch && matchesStatus;
  });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4 backdrop-blur-sm">
      <div className="bg-dark-800 w-full max-w-6xl rounded-lg border border-gold-500/30 shadow-2xl flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="p-6 border-b border-gray-700 flex flex-col md:flex-row justify-between items-center gap-4 bg-dark-900 rounded-t-lg">
          <div className="flex items-center gap-3">
             <div className="p-2 bg-green-900/30 rounded-full">
                <Database size={24} className="text-green-500" />
             </div>
             <div>
                <h2 className="text-2xl font-serif text-white">Booking Database</h2>
                <p className="text-green-500 text-xs flex items-center gap-1">
                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                    System Online • Local Connection
                </p>
             </div>
          </div>

          <div className="flex items-center gap-2 w-full md:w-auto flex-wrap justify-end">
             {/* Search */}
             <div className="relative flex-grow md:flex-grow-0">
                 <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={16} />
                 <input 
                    type="text" 
                    placeholder="Search name or phone..." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full md:w-56 bg-dark-700 text-white pl-10 pr-4 py-2 rounded-sm text-sm border border-gray-600 focus:border-gold-500 focus:outline-none"
                 />
             </div>

             {/* Status Filter */}
             <div className="relative">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={16} />
                <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value as BookingStatus | 'all')}
                    className="bg-dark-700 text-white pl-10 pr-8 py-2 rounded-sm text-sm border border-gray-600 focus:border-gold-500 focus:outline-none appearance-none cursor-pointer"
                >
                    <option value="all">All Status</option>
                    <option value="pending">Pending</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="cancelled">Cancelled</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                </div>
             </div>

             <button 
                onClick={loadBookings} 
                className={`p-2 text-gray-400 hover:text-white transition-all ${loading ? 'animate-spin' : ''}`}
                title="Refresh"
            >
                <RefreshCcw size={20} />
            </button>
            <button 
                onClick={onClose} 
                className="p-2 text-gray-400 hover:text-white transition-colors"
                title="Close"
            >
                <X size={24} />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto p-6 bg-dark-800">
          {filteredBookings.length === 0 ? (
            <div className="text-center py-20 text-gray-500 border border-dashed border-gray-700 rounded-lg">
              <p className="text-lg">No bookings found matching your criteria.</p>
              <p className="text-sm mt-2">{bookings.length === 0 ? "Database is empty." : "Try different filters."}</p>
            </div>
          ) : (
            <div className="overflow-x-auto rounded-lg border border-gray-700">
                <table className="w-full text-left border-collapse">
                <thead>
                    <tr className="bg-dark-900 text-gold-500 text-xs uppercase tracking-wider">
                    <th className="p-4">Status</th>
                    <th className="p-4">Payment</th>
                    <th className="p-4">Date & Time</th>
                    <th className="p-4">Type</th>
                    <th className="p-4">Customer</th>
                    <th className="p-4">Contact</th>
                    <th className="p-4">Message</th>
                    <th className="p-4 text-right">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-700 bg-dark-800">
                    {filteredBookings.map((booking) => (
                    <tr key={booking._id} className="text-gray-300 hover:bg-dark-700 transition-colors text-sm">
                        <td className="p-4">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize
                                ${booking.status === 'confirmed' ? 'bg-green-900/30 text-green-400 border border-green-900/50' : 
                                  booking.status === 'cancelled' ? 'bg-red-900/30 text-red-400 border border-red-900/50' : 
                                  'bg-yellow-900/30 text-yellow-400 border border-yellow-900/50'}`}>
                                {booking.status}
                            </span>
                        </td>
                        <td className="p-4">
                            {booking.paymentStatus === 'paid' ? (
                                <div className="flex flex-col">
                                    <span className="inline-flex items-center gap-1 text-green-500 font-bold text-xs uppercase">
                                        <CheckCircle size={10} /> PAID
                                    </span>
                                    {booking.amount && <span className="text-xs text-white">{booking.amount.toLocaleString()} RWF</span>}
                                </div>
                            ) : (
                                <span className="text-gray-600 text-xs uppercase">Unpaid</span>
                            )}
                        </td>
                        <td className="p-4 font-bold">
                            <div className="text-white">{booking.date}</div>
                            <div className="text-gold-500 text-xs">{booking.time}</div>
                        </td>
                         <td className="p-4">
                            <span className={`inline-block px-2 py-1 rounded text-[10px] uppercase font-bold tracking-wider ${booking.bookingType === 'tour' ? 'bg-blue-900/30 text-blue-400' : 'bg-gray-700/50 text-gray-400'}`}>
                                {booking.bookingType || 'buffet'}
                            </span>
                        </td>
                        <td className="p-4 font-medium text-white">
                            {booking.name}
                            <div className="text-xs text-gray-500">{booking.persons}</div>
                        </td>
                        <td className="p-4 font-mono text-xs text-gray-400">{booking.phone}</td>
                        <td className="p-4 italic text-gray-500 max-w-xs truncate">{booking.message || "-"}</td>
                        <td className="p-4 text-right">
                             <div className="flex justify-end gap-2">
                                <button
                                    onClick={() => handlePrintReceipt(booking)}
                                    className="p-1.5 bg-gray-700 text-gray-300 hover:bg-gold-500 hover:text-dark-900 rounded transition-colors"
                                    title="Print Receipt"
                                >
                                    <Printer size={16} />
                                </button>
                                {booking.status !== 'confirmed' && (
                                    <button 
                                        onClick={() => handleStatusChange(booking._id, 'confirmed')}
                                        className="p-1.5 bg-green-900/20 text-green-500 hover:bg-green-500 hover:text-dark-900 rounded transition-colors"
                                        title="Confirm Booking"
                                    >
                                        <CheckCircle size={16} />
                                    </button>
                                )}
                                {booking.status !== 'cancelled' && (
                                    <button 
                                        onClick={() => handleStatusChange(booking._id, 'cancelled')}
                                        className="p-1.5 bg-red-900/20 text-red-500 hover:bg-red-500 hover:text-dark-900 rounded transition-colors"
                                        title="Cancel Booking"
                                    >
                                        <XCircle size={16} />
                                    </button>
                                )}
                             </div>
                        </td>
                    </tr>
                    ))}
                </tbody>
                </table>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-700 bg-dark-900 rounded-b-lg flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex gap-4 text-xs text-gray-500">
                <span>Total: {bookings.length}</span>
                <span>•</span>
                <span>Pending: {bookings.filter(b => b.status === 'pending').length}</span>
                <span>•</span>
                <span>Confirmed: {bookings.filter(b => b.status === 'confirmed').length}</span>
                <span>•</span>
                <span className="text-green-500">Revenue: {bookings.reduce((sum, b) => sum + (b.amount || 0), 0).toLocaleString()} RWF</span>
            </div>
            
            <div className="flex gap-3">
                <button 
                    onClick={downloadData} 
                    className="flex items-center gap-2 px-4 py-2 bg-dark-700 text-white hover:bg-gold-500 hover:text-dark-900 transition-colors rounded-sm text-xs uppercase font-bold tracking-wider"
                >
                    <Download size={14} />
                    Export Data
                </button>
                {bookings.length > 0 && (
                    <button 
                        onClick={clearBookings}
                        className="flex items-center gap-2 px-4 py-2 bg-red-900/20 text-red-500 hover:bg-red-900/40 rounded-sm text-xs uppercase font-bold tracking-wider transition-colors border border-red-900/30"
                    >
                        <Trash2 size={14} />
                        Clear DB
                    </button>
                )}
            </div>
        </div>
      </div>
    </div>
  );
};