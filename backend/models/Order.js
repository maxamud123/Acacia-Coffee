const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
  id:          String,
  name:        String,
  price:       String,
  quantity:    Number,
  category:    String,
  image:       String,
}, { _id: false });

const orderSchema = new mongoose.Schema({
  user:          { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
  items:         { type: [orderItemSchema], required: true },
  total:         { type: Number, required: true },
  customerName:  { type: String, default: 'Guest' },
  customerEmail: { type: String, default: '' },
  paymentMethod: { type: String, enum: ['cash', 'card', 'momo'], default: 'cash' },
  paymentStatus: { type: String, enum: ['unpaid', 'paid'], default: 'unpaid' },
  paymentId:     { type: String, default: '' },
  status:        { type: String, enum: ['preparing', 'ready', 'delivered', 'cancelled'], default: 'preparing' },
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);
