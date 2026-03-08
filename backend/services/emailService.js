const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.EMAIL_PORT) || 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// ─── Booking Confirmation Email ───────────────────────────────
async function sendBookingConfirmation(booking) {
  if (!process.env.EMAIL_USER || process.env.EMAIL_USER === 'your_gmail@gmail.com') {
    console.log('[Email] Skipped — email not configured in .env');
    return;
  }

  const html = `
    <!DOCTYPE html>
    <html>
    <head><style>
      body { font-family: 'Georgia', serif; background: #0e1013; color: #d1d5db; margin: 0; padding: 0; }
      .container { max-width: 560px; margin: 40px auto; background: #16191d; border: 1px solid rgba(209,160,84,0.2); }
      .header { background: #0e1013; padding: 32px; text-align: center; border-bottom: 2px solid #d1a054; }
      .header h1 { font-size: 28px; color: #d1a054; margin: 0; letter-spacing: 4px; }
      .body { padding: 32px; }
      .body h2 { color: #ffffff; font-size: 20px; margin-bottom: 20px; }
      .detail-row { display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,0.06); }
      .detail-label { color: #9ca3af; font-size: 13px; text-transform: uppercase; letter-spacing: 1px; }
      .detail-value { color: #ffffff; font-weight: bold; }
      .badge { display: inline-block; background: rgba(209,160,84,0.15); color: #d1a054; padding: 4px 14px; border-radius: 20px; font-size: 12px; font-weight: bold; text-transform: uppercase; letter-spacing: 1px; margin-top: 20px; }
      .footer { padding: 24px 32px; background: #0e1013; text-align: center; font-size: 12px; color: #6b7280; }
    </style></head>
    <body>
      <div class="container">
        <div class="header">
          <h1>CAFE ACACIA</h1>
          <p style="color:#9ca3af;margin:8px 0 0;font-size:13px;letter-spacing:2px;">RESERVATION CONFIRMED</p>
        </div>
        <div class="body">
          <h2>Hello, ${booking.name}!</h2>
          <p style="color:#9ca3af;line-height:1.7;">Your reservation has been received. We look forward to welcoming you at Cafe Acacia.</p>

          <div class="detail-row"><span class="detail-label">Date</span><span class="detail-value">${booking.date}</span></div>
          <div class="detail-row"><span class="detail-label">Time</span><span class="detail-value">${booking.time}</span></div>
          <div class="detail-row"><span class="detail-label">Guests</span><span class="detail-value">${booking.persons}</span></div>
          <div class="detail-row"><span class="detail-label">Type</span><span class="detail-value">${booking.bookingType}</span></div>
          <div class="detail-row"><span class="detail-label">Phone</span><span class="detail-value">${booking.phone}</span></div>

          <div><span class="badge">Status: ${booking.status}</span></div>
          <p style="margin-top:28px;color:#9ca3af;font-size:13px;">If you need to change or cancel your reservation, please call us at <strong style="color:#d1a054;">+250 787 217 72</strong></p>
        </div>
        <div class="footer">
          Kisiment kg 201 Rukiri 2, Kigali, Rwanda &nbsp;|&nbsp; info@cafeacacia.com<br/>
          &copy; ${new Date().getFullYear()} Cafe Acacia. All Rights Reserved.
        </div>
      </div>
    </body>
    </html>
  `;

  await transporter.sendMail({
    from: process.env.EMAIL_FROM || 'Cafe Acacia <noreply@cafeacacia.com>',
    to: booking.email,
    subject: `Reservation Confirmed — ${booking.date} at ${booking.time}`,
    html,
  });

  console.log(`[Email] Booking confirmation sent to ${booking.email}`);
}

// ─── Order Confirmation Email ─────────────────────────────────
async function sendOrderConfirmation(order) {
  if (!process.env.EMAIL_USER || process.env.EMAIL_USER === 'your_gmail@gmail.com') {
    console.log('[Email] Skipped — email not configured in .env');
    return;
  }
  if (!order.customerEmail) return;

  const itemRows = order.items.map(i =>
    `<div class="detail-row"><span class="detail-label">${i.name} x${i.quantity}</span><span class="detail-value">${i.price}</span></div>`
  ).join('');

  const html = `
    <!DOCTYPE html><html><head><style>
      body{font-family:'Georgia',serif;background:#0e1013;color:#d1d5db;margin:0;padding:0;}
      .container{max-width:560px;margin:40px auto;background:#16191d;border:1px solid rgba(209,160,84,0.2);}
      .header{background:#0e1013;padding:32px;text-align:center;border-bottom:2px solid #d1a054;}
      .header h1{font-size:28px;color:#d1a054;margin:0;letter-spacing:4px;}
      .body{padding:32px;}
      .detail-row{display:flex;justify-content:space-between;padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.06);}
      .detail-label{color:#9ca3af;font-size:13px;}
      .detail-value{color:#fff;font-weight:bold;}
      .total{font-size:20px;color:#d1a054;}
      .footer{padding:24px 32px;background:#0e1013;text-align:center;font-size:12px;color:#6b7280;}
    </style></head>
    <body>
      <div class="container">
        <div class="header">
          <h1>CAFE ACACIA</h1>
          <p style="color:#9ca3af;margin:8px 0 0;font-size:13px;letter-spacing:2px;">ORDER RECEIVED</p>
        </div>
        <div class="body">
          <h2 style="color:#fff;">Thank you, ${order.customerName}!</h2>
          <p style="color:#9ca3af;">Your order is being prepared by our kitchen team.</p>
          ${itemRows}
          <div class="detail-row"><span class="detail-label total">Total</span><span class="detail-value total">$${order.total.toFixed(2)}</span></div>
        </div>
        <div class="footer">Cafe Acacia &mdash; Kigali, Rwanda</div>
      </div>
    </body></html>
  `;

  await transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to: order.customerEmail,
    subject: `Order Confirmed — Cafe Acacia`,
    html,
  });

  console.log(`[Email] Order confirmation sent to ${order.customerEmail}`);
}

module.exports = { sendBookingConfirmation, sendOrderConfirmation };
