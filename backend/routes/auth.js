const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const supabase = require('../utils/supabase');
const { protect } = require('../middleware/auth');

const router = express.Router();

const signToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN || '7d' });

// ─── POST /api/auth/register ──────────────────────────────────
router.post('/register', async (req, res, next) => {
  try {
    const { name, email, password, phone } = req.body;
    if (!name || !email || !password) {
      const err = new Error('name, email and password are required');
      err.status = 400;
      return next(err);
    }

    const { data: existing } = await supabase.from('users').select('id').eq('email', email).single();
    if (existing) {
      const err = new Error('An account with this email already exists');
      err.status = 409;
      return next(err);
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const { data: user, error } = await supabase
      .from('users')
      .insert({ name, email, password: hashedPassword, phone, role: 'customer' })
      .select('id, name, email, phone, role, created_at')
      .single();

    if (error) throw new Error(error.message);

    const token = signToken(user.id);
    res.status(201).json({ success: true, token, data: user });
  } catch (err) {
    next(err);
  }
});

// ─── POST /api/auth/login ─────────────────────────────────────
router.post('/login', async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      const err = new Error('email and password are required');
      err.status = 400;
      return next(err);
    }

    const { data: user } = await supabase.from('users').select('*').eq('email', email).single();
    if (!user || !(await bcrypt.compare(password, user.password))) {
      const err = new Error('Invalid email or password');
      err.status = 401;
      return next(err);
    }

    const { password: _, ...safeUser } = user;
    const token = signToken(user.id);
    res.json({ success: true, token, data: safeUser });
  } catch (err) {
    next(err);
  }
});

// ─── GET /api/auth/me ─────────────────────────────────────────
router.get('/me', protect, (req, res) => {
  res.json({ success: true, data: req.user });
});

// ─── POST /api/auth/admin-login ───────────────────────────────
router.post('/admin-login', async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (email !== process.env.ADMIN_EMAIL || password !== process.env.ADMIN_PASSWORD) {
      const err = new Error('Invalid admin credentials');
      err.status = 401;
      return next(err);
    }

    let { data: admin } = await supabase.from('users').select('*').eq('email', email).single();
    if (!admin) {
      const hashedPassword = await bcrypt.hash(password, 12);
      const { data: newAdmin, error } = await supabase
        .from('users')
        .insert({ name: 'Admin', email, password: hashedPassword, role: 'admin' })
        .select('*')
        .single();
      if (error) throw new Error(error.message);
      admin = newAdmin;
    }

    const { password: _, ...safeAdmin } = admin;
    const token = signToken(admin.id);
    res.json({ success: true, token, data: safeAdmin });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
