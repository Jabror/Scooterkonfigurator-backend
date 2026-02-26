const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  paypalOrderId: { type: String, required: true },
  produkte: [{ type: Number }], // Preise oder später Produkt-IDs
  Produkte: [{ type: Object }], 
  KonfigurationenArray: [{ type: String }],
  InputValue: { type: String },
  total: { type: Number, required: true },
  status: { type: String, default: "PAID" },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Order", orderSchema);

