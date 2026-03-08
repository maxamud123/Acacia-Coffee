import { Booking, BookingStatus } from '../types';

const API_URL = 'http://localhost:5000/api';

export const db = {
  async getAll(): Promise<Booking[]> {
    const res = await fetch(`${API_URL}/reservations`);
    if (!res.ok) throw new Error('Failed to fetch reservations');
    return res.json();
  },

  async create(booking: Omit<Booking, '_id' | 'createdAt' | 'status'>): Promise<Booking> {
    const res = await fetch(`${API_URL}/reservations`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(booking),
    });
    if (!res.ok) throw new Error('Failed to create reservation');
    return res.json();
  },

  async updateStatus(id: string, status: BookingStatus): Promise<void> {
    const res = await fetch(`${API_URL}/reservations/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    });
    if (!res.ok) throw new Error('Failed to update reservation');
  },

  async clear(): Promise<void> {
    const res = await fetch(`${API_URL}/reservations`, { method: 'DELETE' });
    if (!res.ok) throw new Error('Failed to clear reservations');
  },
};
