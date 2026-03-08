require('dotenv').config();

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');

const reservationsRouter = require('./routes/reservations');
const ordersRouter = require('./routes/orders');
const authRouter = require('./routes/auth');
const paymentRouter = require('./routes/payment');
const { errorHandler, notFound } = require('./middleware/errorHandler');

const app = express();
const PORT = process.env.PORT || 5000;
const NODE_ENV = process.env.NODE_ENV || 'development';

// ─── Security Headers ─────────────────────────────────────────
app.use(helmet());

// ─── CORS ─────────────────────────────────────────────────────
app.use(cors({
  origin: process.env.ALLOWED_ORIGIN || '*',
  methods: ['GET', 'POST', 'PATCH', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// ─── Rate Limiting ────────────────────────────────────────────
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, error: 'Too many requests, please try again later.' },
});
app.use('/api', limiter);

// ─── Body Parsing ─────────────────────────────────────────────
app.use('/api/payment/webhook', express.raw({ type: 'application/json' }));
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: false }));

// ─── Logging ──────────────────────────────────────────────────
app.use(morgan(NODE_ENV === 'production' ? 'combined' : 'dev'));

// ─── Root ─────────────────────────────────────────────────────
app.get('/', (req, res) => {
  res.json({
    name: 'Cafe Acacia API',
    version: '2.0.0',
    database: 'Supabase (PostgreSQL)',
    status: 'running',
    environment: NODE_ENV,
  });
});

// ─── Health Check ─────────────────────────────────────────────
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    status: 'ok',
    uptime: `${Math.floor(process.uptime())}s`,
    timestamp: new Date().toISOString(),
  });
});

// ─── Routes ───────────────────────────────────────────────────
app.use('/api/reservations', reservationsRouter);
app.use('/api/orders', ordersRouter);
app.use('/api/auth', authRouter);
app.use('/api/payment', paymentRouter);

// ─── Error Handling ───────────────────────────────────────────
app.use(notFound);
app.use(errorHandler);

// ─── Start ────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log('');
  console.log('  ╔═══════════════════════════════════════╗');
  console.log('  ║       CAFE ACACIA API SERVER          ║');
  console.log('  ╠═══════════════════════════════════════╣');
  console.log(`  ║  ENV  : ${NODE_ENV.padEnd(29)}║`);
  console.log(`  ║  PORT : http://localhost:${PORT}         ║`);
  console.log('  ╠═══════════════════════════════════════╣');
  console.log('  ║  DB   : Supabase (PostgreSQL)         ║');
  console.log('  ║  /api/health                          ║');
  console.log('  ║  /api/reservations                    ║');
  console.log('  ║  /api/orders                          ║');
  console.log('  ║  /api/auth                            ║');
  console.log('  ║  /api/payment                         ║');
  console.log('  ╚═══════════════════════════════════════╝');
  console.log('');
});
