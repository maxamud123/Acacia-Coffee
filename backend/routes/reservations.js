const express = require('express');
const supabase = require('../utils/supabase');
const { protect, adminOnly } = require('../middleware/auth');
const { sendBookingConfirmation } = require('../services/emailService');

const router = express.Router();

// ─── GET /api/reservations (admin only) ──────────────────────
router.get('/', protect, adminOnly, async (req, res, next) => {
  try {
    let query = supabase.from('bookings').select('*').order('created_at', { ascending: false });
    if (req.query.status) query = query.eq('status', req.query.status);

    const { data, error } = await query;
    if (error) throw new Error(error.message);

    res.json({ success: true, count: data.length, data });
  } catch (err) {
    next(err);
  }
});

// ─── GET /api/reservations/:id ────────────────────────────────
router.get('/:id', async (req, res, next) => {
  try {
    const { data, error } = await supabase.from('bookings').select('*').eq('id', req.params.id).single();
    if (error || !data) {
      const err = new Error('Reservation not found');
      err.status = 404;
      return next(err);
    }
    res.json({ success: true, data });
  } catch (err) {
    next(err);
  }
});

// ─── POST /api/reservations ───────────────────────────────────
router.post('/', async (req, res, next) => {
  try {
    const { name, email, phone, persons, date, time, booking_type, bookingType, message, amount, paymentStatus } = req.body;

    if (!name || !phone || !date || !time) {
      const err = new Error('name, phone, date and time are required');
      err.status = 400;
      return next(err);
    }

    const bookingDate = new Date(date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (bookingDate < today) {
      const err = new Error('Booking date cannot be in the past');
      err.status = 400;
      return next(err);
    }

    const { data, error } = await supabase
      .from('bookings')
      .insert({
        name: name.trim(),
        email: email?.trim(),
        phone: phone.trim(),
        persons: persons || '1 Person',
        date,
        time,
        booking_type: booking_type || bookingType || 'buffet',
        message: message?.trim() || '',
        status: paymentStatus === 'paid' ? 'confirmed' : 'pending',
        amount: amount || 0,
        payment_status: paymentStatus || 'unpaid',
      })
      .select()
      .single();

    if (error) throw new Error(error.message);

    if (email) {
      sendBookingConfirmation({ ...data, bookingType: data.booking_type }).catch(e =>
        console.error('[Email] Failed:', e.message)
      );
    }

    res.status(201).json({ success: true, data });
  } catch (err) {
    next(err);
  }
});

// ─── PATCH /api/reservations/:id (admin only) ────────────────
router.patch('/:id', protect, adminOnly, async (req, res, next) => {
  try {
    const validStatuses = ['pending', 'confirmed', 'cancelled'];
    const updates = {};

    if (req.body.status) {
      if (!validStatuses.includes(req.body.status)) {
        const err = new Error(`status must be one of: ${validStatuses.join(', ')}`);
        err.status = 400;
        return next(err);
      }
      updates.status = req.body.status;
    }
    if (req.body.paymentStatus) updates.payment_status = req.body.paymentStatus;
    if (req.body.paymentId) updates.payment_id = req.body.paymentId;
    if (req.body.amount !== undefined) updates.amount = req.body.amount;

    if (Object.keys(updates).length === 0) {
      const err = new Error('No valid fields to update');
      err.status = 400;
      return next(err);
    }

    const { data, error } = await supabase
      .from('bookings')
      .update(updates)
      .eq('id', req.params.id)
      .select()
      .single();

    if (error || !data) {
      const err = new Error('Reservation not found');
      err.status = 404;
      return next(err);
    }

    res.json({ success: true, data });
  } catch (err) {
    next(err);
  }
});

// ─── DELETE /api/reservations/:id (admin only) ───────────────
router.delete('/:id', protect, adminOnly, async (req, res, next) => {
  try {
    const { error } = await supabase.from('bookings').delete().eq('id', req.params.id);
    if (error) {
      const err = new Error('Reservation not found');
      err.status = 404;
      return next(err);
    }
    res.json({ success: true, message: 'Reservation deleted' });
  } catch (err) {
    next(err);
  }
});

// ─── DELETE /api/reservations (clear all — admin only) ───────
router.delete('/', protect, adminOnly, async (req, res, next) => {
  try {
    await supabase.from('bookings').delete().neq('id', '00000000-0000-0000-0000-000000000000');
    res.json({ success: true, message: 'All reservations cleared' });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
