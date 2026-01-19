const router = require("express").Router();
const upload = require("../utils/multer");
const controller = require("../controllers/product.controller");
const Product = require("../models/product.model");

// Upload image
router.post("/upload", upload.single("product"), (req, res) => {
  res.json({
    success: 1,
    image: `/images/${req.file.filename}`,
  });
});


// Add product
router.post("/addproduct", controller.addProduct);

// Get all products
router.get("/allproducts", controller.getAllProducts);

router.get("/newcollections", async (req, res) => {
  try {
    const products = await Product.find({}).sort({ _id: -1 }); 
    const newcollection = products.slice(0, 8).reverse(); 

   
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
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});


// Delete product (ADMIN)
router.delete("/deleteproduct/:productId", controller.deleteProduct);

module.exports = router;

