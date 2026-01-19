const Users = require("../models/user.model");
const mongoose = require("mongoose");

// GET CART
exports.getCart = async (req, res) => {
  try {
    const user = await Users.findById(req.user.id).populate("cart.productId");
    if (!user) return res.status(404).json({ success: false, errors: "User not found" });

    res.json(user.cart);
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, errors: "Server error" });
  }
};

// ADD TO CART
exports.addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    if (!productId || !quantity || quantity <= 0) {
      return res.status(400).json({ success: false, errors: "Invalid product or quantity" });
    }

    const user = await Users.findById(req.user.id);
    if (!user) return res.status(404).json({ success: false, errors: "User not found" });

    const prodId = mongoose.Types.ObjectId(productId);
    const existingItem = user.cart.find(item => item.productId.equals(prodId));
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      user.cart.push({ productId: prodId, quantity });
    }

    await user.save();
    res.json({ success: true, cart: user.cart });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, errors: "Server error" });
  }
};

// REMOVE FROM CART
exports.removeFromCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    if (!productId || !quantity || quantity <= 0) {
      return res.status(400).json({ success: false, errors: "Invalid product or quantity" });
    }

    const user = await Users.findById(req.user.id);
    if (!user) return res.status(404).json({ success: false, errors: "User not found" });

    const prodId = mongoose.Types.ObjectId(productId);
    const itemIndex = user.cart.findIndex(item => item.productId.equals(prodId));
    if (itemIndex >= 0) {
      user.cart[itemIndex].quantity -= quantity;
      if (user.cart[itemIndex].quantity <= 0) user.cart.splice(itemIndex, 1);
    }

    await user.save();
    res.json({ success: true, cart: user.cart });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, errors: "Server error" });
  }
};
