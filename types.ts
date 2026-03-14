
export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: string;
  category: 'hot-drinks' | 'iced-drinks' | 'tea-drinks' | 'soft-drinks' | 'extras';
  image: string;
  seasonal?: boolean;
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  image: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  comment: string;
  avatar: string;
}

export type BookingStatus = 'pending' | 'confirmed' | 'cancelled';

export interface Booking {
  _id: string; // MongoDB style ID
  name: string;
  phone: string;
  persons: string;
  date: string;
  time: string;
  bookingType: 'buffet' | 'tour';
  message: string;
  status: BookingStatus;
  createdAt: string;
  amount?: number; // New field for payment amount
  paymentStatus?: 'unpaid' | 'paid'; // New field for payment status
}
