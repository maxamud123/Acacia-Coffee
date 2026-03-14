import { Booking, BookingStatus } from '../types';

const STORAGE_KEY = 'cafe_acacia_bookings';

function getBookings(): Booking[] {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
  } catch {
    return [];
  }
}

function saveBookings(bookings: Booking[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(bookings));
}

export const db = {
  async getAll(): Promise<Booking[]> {
    return getBookings();
  },

  async create(booking: Omit<Booking, '_id' | 'createdAt' | 'status'>): Promise<Booking> {
    const bookings = getBookings();
    const newBooking: Booking = {
      ...booking,
      _id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      status: 'pending',
    };
    bookings.push(newBooking);
    saveBookings(bookings);
    return newBooking;
  },

  async updateStatus(id: string, status: BookingStatus): Promise<void> {
    const bookings = getBookings();
    const idx = bookings.findIndex(b => b._id === id);
    if (idx !== -1) {
      bookings[idx].status = status;
      saveBookings(bookings);
    }
  },

  async clear(): Promise<void> {
    localStorage.removeItem(STORAGE_KEY);
  },
};
