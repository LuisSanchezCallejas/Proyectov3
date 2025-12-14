const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  orderNumber: { type: Number, required: true, min: 0 },
  userId: { type: Number, required: true, min: 0 },
  creationDate: { type: String, required: true, trim: true  },
  updateDate: { type: String, required: true, trim: true  },
  status: { type: String, required: true },
  totalAmount: { type: Number, required: true, min: 0 },
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);