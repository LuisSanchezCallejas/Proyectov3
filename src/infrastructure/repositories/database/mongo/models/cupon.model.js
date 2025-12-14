const mongoose = require('mongoose');

const cuponSchema = new mongoose.Schema({
  code: { type: Number, required: true, min: 0 },
  description: { type: String, required: true, min: 0 },
  discountPercentage: { type: Number, required: true, trim: true  },
  validFrom: { type: String, required: true, trim: true  },
  validUntil: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Cupon', cuponSchema);