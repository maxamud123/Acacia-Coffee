const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  user:         { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
  name:         { type: String, required: true, trim: true },
  email:        { type: String, trim: true, default: '' },
  phone:        { type: String, required: true, trim: true },
  persons:      { type: String, default: '1 Person' },
  date:         { type: String, required: true },
  time:         { type: String, required: true },
  bookingType:  { type: String, enum: ['buffet', 'tour'], default: 'buffet' },
  message:      { type: String, default: '' },
  status:       { type: String, enum: ['pending', 'confirmed', 'cancelled'], default: 'pending' },
  amount:       { type: Number, default: 0 },
  paymentStatus:{ type: String, enum: ['unpaid', 'paid'], default: 'unpaid' },
  paymentId:    { type: String, default: '' },
}, { timestamps: true });

module.exports = mongoose.model('Booking', bookingSchema);
