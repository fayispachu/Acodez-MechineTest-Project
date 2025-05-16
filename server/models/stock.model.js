const mongoose = require("mongoose");

const stockSchema = new mongoose.Schema({
  // productId: { type: Number, Unique: true, require: true },
  productName: { type: String, require: true },
  quantity: { type: Number, require: true },
  date: { type: Date, require: true },
  status: { type: String },
});

const Stock = mongoose.model("Stock", stockSchema);
module.exports = { Stock };
