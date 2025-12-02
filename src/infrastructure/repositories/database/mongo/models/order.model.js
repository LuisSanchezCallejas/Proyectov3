const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    product: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    quantity: { type: Number, required: true, min: 1 },
    price: { type: Number, required: true, min: 0 },
    discount: { type: Number, default: 0, min: 0, max: 100 },
    total: { type: Number, required: true, min: 0 },
    status: { type: String, enum: ['pending', 'processing', 'completed', 'cancelled'],default: 'pending'},
    orderDate: { type: Date, default: Date.now },
    customerName: { type: String, trim: true },
    customerEmail: { type: String, trim: true }
}, { 
    timestamps: true 
});

orderSchema.pre('save', function(next) {
    const subtotal = this.quantity * this.price;
    const discountAmount = subtotal * (this.discount / 100);
    this.total = subtotal - discountAmount;
    next();
});

module.exports = mongoose.model('Order', orderSchema);