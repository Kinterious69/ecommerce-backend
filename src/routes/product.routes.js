const router = require("express").Router();
const upload = require("../utils/multer");
const controller = require("../controllers/product.controller");
const Product = require("../models/product.model");

// -------------------------
// Upload product image
// -------------------------
router.post("/upload", upload.single("product"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ success: 0, message: "No file uploaded" });
  }

  res.json({
    success: 1,
    image_url: `${process.env.BACKEND_URL}/images/${req.file.filename}`,
  });
});

// -------------------------
// Add new product
// -------------------------
router.post("/addproduct", controller.addProduct);

// -------------------------
// Get all products
// -------------------------
router.get("/allproducts", controller.getAllProducts);

// -------------------------
// Get latest 8 products
// -------------------------
router.get("/newcollections", async (req, res) => {
  try {
    const products = await Product.find({}).sort({ _id: -1 });
    const newcollection = products.slice(0, 8).reverse(); // last 8 added, in ascending order

    const safeCollection = newcollection.map((p) => ({
      id: p.id,
      name: p.name || "No name",
      image: p.image || "",
      old_price: p.old_price || 0,
      new_price: p.new_price || 0,
      category: p.category || "Uncategorized",
    }));

    res.json(safeCollection);
  } catch (error) {
    console.error("Error fetching new collections:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// -------------------------
// Delete product (ADMIN)
// -------------------------
router.delete("/deleteproduct/:productId", controller.deleteProduct);

module.exports = router;
