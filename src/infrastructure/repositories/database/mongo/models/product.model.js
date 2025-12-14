const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  description: { type: String, required: true },
  price: { type: Number, required: true, min: 0 },
  stock: { type: Number, required: true, min: 0 },
  category: { type: String, required: true },
  imageUrl: { type: String, default: 'no-image.jpg' },
   //AQUI SE AGREGA EL CAMPO DEL EJERCICIO 1
  brand: { type: String, required: true, trim:true}, // Campo marca agregado.
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);