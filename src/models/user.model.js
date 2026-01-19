
const mongoose = require("mongoose");

// Each item in cart has a product ID and quantity
const cartItemSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
  quantity: { type: Number, default: 1 },
});

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  cart: [cartItemSchema], 
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Users", userSchema);

