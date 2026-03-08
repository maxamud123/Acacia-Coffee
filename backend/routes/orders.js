const express = require('express');
const supabase = require('../utils/supabase');
const { protect, adminOnly } = require('../middleware/auth');
const { sendOrderConfirmation } = require('../services/emailService');

const router = express.Router();
const VALID_STATUSES = ['preparing', 'ready', 'delivered', 'cancelled'];

// ─── GET /api/orders (admin only) ────────────────────────────
router.get('/', protect, adminOnly, async (req, res, next) => {
  try {
    let query = supabase.from('orders').select('*').order('created_at', { ascending: false });
    if (req.query.status) query = query.eq('status', req.query.status);

    const { data, error } = await query;
    if (error) throw new Error(error.message);

    res.json({ success: true, count: data.length, data });
  } catch (err) {
    next(err);
  }
});

// ─── GET /api/orders/:id ──────────────────────────────────────
router.get('/:id', async (req, res, next) => {
  try {
    const { data, error } = await supabase.from('orders').select('*').eq('id', req.params.id).single();
    if (error || !data) {
      const err = new Error('Order not found');
      err.status = 404;
      return next(err);
    }
    res.json({ success: true, data });
  } catch (err) {
    next(err);
  }
});

// ─── POST /api/orders ─────────────────────────────────────────
router.post('/', async (req, res, next) => {
  try {
    const { items, total, customerName, customerEmail, paymentMethod } = req.body;

    if (!items || !Array.isArray(items) || items.length === 0) {
      const err = new Error('items must be a non-empty array');
      err.status = 400;
      return next(err);
    }
    if (typeof total !== 'number' || total < 0) {
      const err = new Error('total must be a non-negative number');
      err.status = 400;
      return next(err);
    }

    const { data, error } = await supabase
      .from('orders')
      .insert({
        items,
        total,
        customer_name: customerName?.trim() || 'Guest',
        customer_email: customerEmail?.trim(),
        payment_method: paymentMethod || 'cash',
        status: 'preparing',
      })
      .select()
      .single();

    if (error) throw new Error(error.message);

    if (customerEmail) {
      sendOrderConfirmation({
        customerName: data.customer_name,
        customerEmail: data.customer_email,
        items: data.items,
        total: data.total,
      }).catch(e => console.error('[Email] Failed:', e.message));
    }

    res.status(201).json({ success: true, data });
  } catch (err) {
    next(err);
  }
});

// ─── PATCH /api/orders/:id (admin only) ──────────────────────
router.patch('/:id', protect, adminOnly, async (req, res, next) => {
  try {
    const updates = {};
    if (req.body.status) {
      if (!VALID_STATUSES.includes(req.body.status)) {
        const err = new Error(`status must be one of: ${VALID_STATUSES.join(', ')}`);
        err.status = 400;
        return next(err);
      }
      updates.status = req.body.status;
    }
    if (req.body.paymentStatus) updates.payment_status = req.body.paymentStatus;
    if (req.body.paymentId) updates.payment_id = req.body.paymentId;

    if (Object.keys(updates).length === 0) {
      const err = new Error('No valid fields to update');
      err.status = 400;
      return next(err);
    }

    const { data, error } = await supabase
      .from('orders')
      .update(updates)
      .eq('id', req.params.id)
      .select()
      .single();

    if (error || !data) {
      const err = new Error('Order not found');
      err.status = 404;
      return next(err);
    }

    res.json({ success: true, data });
  } catch (err) {
    next(err);
  }
});

// ─── DELETE /api/orders/:id (admin only) ─────────────────────
router.delete('/:id', protect, adminOnly, async (req, res, next) => {
  try {
    const { error } = await supabase.from('orders').delete().eq('id', req.params.id);
    if (error) {
      const err = new Error('Order not found');
      err.status = 404;
      return next(err);
    }
    res.json({ success: true, message: 'Order deleted' });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
