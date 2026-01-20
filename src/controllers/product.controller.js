const mongoose = require("mongoose");
const Product = require("../models/product.model");
const Users = require("../models/user.model"); 

//  ADD PRODUCT 
exports.addProduct = async (req, res) => {
   console.log("Request body:", req.body); 
  try {
    const {
      name,
      image,
      old_price,
      new_price,
      category,
    } = req.body;

    if (!name || !image || !new_price) {
      return res.status(400).json({
        success: false,
        errors: "Missing required fields",
      });
    }

    // 🚫 Safety check: block localhost URLs
    if (image.includes("localhost")) {
      return res.status(400).json({
        success: false,
        errors: "Invalid image path",
      });
    }

    const product = await Product.create({
      name,
      image, // "/images/xxx.png"
      old_price,
      new_price,
      category,
    });

    res.status(201).json({
      success: true,
      product,
    });

  } catch (err) {
    console.error("Add product error:", err);
    res.status(500).json({
      success: false,
      errors: "Server error",
    });
  }
};


//  GET ALL PRODUCTS 
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json(products);
  } catch (err) {
    console.error("Get products error:", err);
    res.status(500).json({ success: false, errors: "Server error" });
  }
};

//  DELETE PRODUCT (ADMIN) 
exports.deleteProduct = async (req, res) => {
  try {
    const { productId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({
        success: false,
        errors: "Invalid product ID",
      });
    }

    // Delete product
    const deletedProduct = await Product.findByIdAndDelete(productId);
    if (!deletedProduct) {
      return res.status(404).json({
        success: false,
        errors: "Product not found",
      });
    }

    //  Remove product from all user carts
    await Users.updateMany(
      {},
      { $pull: { cart: { productId: productId } } }
    );

    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
      product: deletedProduct,
    });

  } catch (error) {
    console.error("Delete product error:", error);
    res.status(500).json({
      success: false,
      errors: "Server error",
    });
  }
};
