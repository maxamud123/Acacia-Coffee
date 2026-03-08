const express = require('express');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const { protect } = require('../middleware/auth');

const router = express.Router();

// ─── POST /api/payment/create-intent ─────────────────────────────────────────
// Create a Stripe PaymentIntent for card payments
router.post('/create-intent', async (req, res, next) => {
  try {
    const { amount, currency = 'usd', metadata = {} } = req.body;

    if (!amount || typeof amount !== 'number' || amount < 1) {
      const err = new Error('amount must be a positive number (in cents)');
      err.status = 400;
      return next(err);
    }

    if (!process.env.STRIPE_SECRET_KEY || process.env.STRIPE_SECRET_KEY === 'sk_test_your_stripe_secret_key') {
      const err = new Error('Stripe is not configured. Add STRIPE_SECRET_KEY to .env');
      err.status = 503;
      return next(err);
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
      metadata,
      automatic_payment_methods: { enabled: true },
    });

    res.json({
      success: true,
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
    });
  } catch (err) {
    next(err);
  }
});

// ─── POST /api/payment/webhook ────────────────────────────────────────────────
// Stripe webhook — update order/booking status on payment success
router.post('/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
  const sig = req.headers['stripe-signature'];
  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    console.error('[Stripe] Webhook signature error:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === 'payment_intent.succeeded') {
    const intent = event.data.object;
    console.log(`[Stripe] Payment succeeded: ${intent.id} — $${(intent.amount / 100).toFixed(2)}`);
    // TODO: update booking/order paymentStatus to 'paid' using intent.metadata
  }

  res.json({ received: true });
});

// ─── POST /api/payment/momo ───────────────────────────────────────────────────
// MTN Mobile Money — record intent (actual MoMo API integration pending)
router.post('/momo', async (req, res, next) => {
  try {
    const { phone, amount, currency = 'RWF', reference } = req.body;

    if (!phone || !amount) {
      const err = new Error('phone and amount are required');
      err.status = 400;
      return next(err);
    }

    // Placeholder: In production, call MTN MoMo API here
    // For now, return a simulated pending transaction
    const transactionId = `MOMO-${Date.now()}-${Math.random().toString(36).substr(2, 6).toUpperCase()}`;

    console.log(`[MoMo] Initiated: ***${String(phone).slice(-4)} — ${amount} ${currency}`);

    res.json({
      success: true,
      transactionId,
      status: 'pending',
      message: 'MoMo payment initiated. Customer will receive a prompt on their phone.',
      note: 'Full MTN MoMo API integration requires MTN MoMo API credentials.',
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
