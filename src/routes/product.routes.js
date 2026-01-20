const router = require("express").Router();
const upload = require("../utils/multer");
const controller = require("../controllers/product.controller");
const Product = require("../models/product.model");

// Upload image

router.post("/upload", upload.single("product"), (req, res) => {
  const BASE_URL = process.env.BACKEND_URL;

  if (!BASE_URL) {
    return res.status(500).json({
      success: 0,
      error: "BACKEND_URL is not defined",
    });
  }

  res.json({
    success: 1,
    image_url: `${BASE_URL}/images/${req.file.filename}`,
  });
});

router.post("/update-images", async (req, res) => {
  try {
    const backendURL = process.env.BACKEND_URL;
    const products = await Product.find({});

    for (let product of products) {
      if (product.image.includes("http://localhost:4000")) {
        product.image = product.image.replace(
          "http://localhost:4000",
          backendURL
        );
        await product.save();
      }
    }

    res.json({ success: true, message: "All product images updated" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: "Server error" });
  }
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

