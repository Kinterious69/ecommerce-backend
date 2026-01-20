const mongoose = require("mongoose");
const Product = require("../models/product.model");
const Users = require("../models/user.model");
const fs = require("fs");
const path = require("path");

// ------------------------
// ADD PRODUCT
// ------------------------
exports.addProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json({ success: true, product });
  } catch (err) {
    console.error("Add product error:", err);
    res.status(500).json({ success: false, errors: "Server error" });
  }
};

// ------------------------
// GET ALL PRODUCTS
// ------------------------
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json(products);
  } catch (err) {
    console.error("Get products error:", err);
    res.status(500).json({ success: false, errors: "Server error" });
  }
};

// ------------------------
// DELETE PRODUCT (ADMIN)
// ------------------------
exports.deleteProduct = async (req, res) => {
  try {
    const { productId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({ success: false, errors: "Invalid product ID" });
    }

    const deletedProduct = await Product.findByIdAndDelete(productId);
    if (!deletedProduct) {
      return res.status(404).json({ success: false, errors: "Product not found" });
    }

    // Remove product from all user carts
    await Users.updateMany({}, { $pull: { cart: { productId } } });

    // Delete local image file (optional, good for local testing)
    if (deletedProduct.image) {
      const filename = path.basename(deletedProduct.image);
      const filePath = path.join(__dirname, "../public/upload/images", filename);
      fs.unlink(filePath, (err) => {
        if (err) console.warn("Failed to delete image:", err);
      });
    }

    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
      product: deletedProduct,
    });
  } catch (error) {
    console.error("Delete product error:", error);
    res.status(500).json({ success: false, errors: "Server error" });
  }
};
