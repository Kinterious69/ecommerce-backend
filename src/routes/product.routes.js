/*const router = require("express").Router();
const upload = require("../utils/multer");
const controller = require("../controllers/product.controller");
const Product = require("../models/product.model");

// Upload image
router.post("/upload", upload.single("product"), (req, res) => {
  console.log("📸 Upload request received");
  console.log("📁 File:", req.file);
  
  if (!req.file) {
    return res.status(400).json({ success: 0, message: "No file uploaded" });
  }

  // Dynamically build URL based on environment
  const BACKEND_URL = process.env.BACKEND_URL || `${req.protocol}://${req.get("host")}`;
  const imageUrl = `${BACKEND_URL}/images/${req.file.filename}`;

  console.log("✅ Image URL:", imageUrl);

  res.json({
    success: 1,
    image_url: imageUrl,
  });
});

/*
// Upload image
router.post("/upload", upload.single("product"), (req, res) => {
  console.log("📸 Upload request received");
  console.log("📁 File:", req.file);
  
  if (!req.file) {
    return res.status(400).json({ success: 0, message: "No file uploaded" });
  }

  // ✅ ALWAYS use HTTPS on Render
  const BACKEND_URL = process.env.BACKEND_URL || "https://ecommerce-backend-vs0f.onrender.com";
  const imageUrl = `${BACKEND_URL}/images/${req.file.filename}`;

  console.log("✅ Image URL:", imageUrl);

  res.json({
    success: 1,
    image_url: imageUrl,
  });
});

// Add product
router.post("/addproduct", controller.addProduct);

// Get all products
router.get("/allproducts", controller.getAllProducts);

// Get new collections
router.get("/newcollections", async (req, res) => {
  try {
    const products = await Product.find({}).sort({ _id: -1 });
    const newcollection = products.slice(0, 8).reverse();

    const safeCollection = newcollection.map((p) => ({
      id: p._id,
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
const router = require("express").Router();
const upload = require("../utils/cloudinary"); // Changed from multer
const controller = require("../controllers/product.controller");
const Product = require("../models/product.model");

// Upload image to Cloudinary
router.post("/upload", upload.single("product"), (req, res) => {
  console.log("📸 Upload request received");
  console.log("📁 File:", req.file);
  
  if (!req.file) {
    return res.status(400).json({ success: 0, message: "No file uploaded" });
  }

  // Cloudinary returns the URL directly
  const imageUrl = req.file.path; // Cloudinary URL

  console.log("✅ Image URL:", imageUrl);

  res.json({
    success: 1,
    image_url: imageUrl,
  });
});

// Add product
router.post("/addproduct", controller.addProduct);

// Get all products
router.get("/allproducts", controller.getAllProducts);

// Get new collections
router.get("/newcollections", async (req, res) => {
  try {
    const products = await Product.find({}).sort({ _id: -1 });
    const newcollection = products.slice(0, 8).reverse();

    const safeCollection = newcollection.map((p) => ({
      id: p._id,
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

module.exports = router;*/ 
/*
const router = require("express").Router();
const upload = require("../utils/cloudinary");
const controller = require("../controllers/product.controller");
const Product = require("../models/product.model");

// Upload image to Cloudinary
router.post("/upload", upload.single("product"), (req, res) => {
  try {
    console.log("📸 Upload request received");
    console.log("📁 File info:", JSON.stringify(req.file, null, 2));
    
    if (!req.file) {
      console.error("❌ No file in request");
      return res.status(400).json({ success: 0, message: "No file uploaded" });
    }

    // Cloudinary returns the URL directly
    const imageUrl = req.file.path;

    console.log("✅ Image URL:", imageUrl);

    res.json({
      success: 1,
      image_url: imageUrl,
    });
  } catch (error) {
    console.error("❌ Upload error:", error.message);
    console.error("❌ Full error:", error);
    res.status(500).json({ 
      success: 0, 
      message: "Upload failed",
      error: error.message 
    });
  }
});
router.get("/test", (req, res) => {
  res.json({ 
    success: true, 
    message: "Product routes working",
    cloudinary: {
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME ? "Set" : "Missing",
      api_key: process.env.CLOUDINARY_API_KEY ? "Set" : "Missing",
    }
  });
});


// Add product
router.post("/addproduct", controller.addProduct);

// Get all products
router.get("/allproducts", controller.getAllProducts);

// Get new collections
router.get("/newcollections", async (req, res) => {
  try {
    const products = await Product.find({}).sort({ _id: -1 });
    const newcollection = products.slice(0, 8).reverse();

    const safeCollection = newcollection.map((p) => ({
      id: p._id,
      name: p.name || "No name",
      image: p.image || "",
      old_price: p.old_price || 0,
      new_price: p.new_price || 0,
      category: p.category || "Uncategorized",
    }));

    res.json(safeCollection);
  } catch (error) {
    console.error("❌ Newcollections error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Delete product (ADMIN)
router.delete("/deleteproduct/:productId", controller.deleteProduct);

module.exports = router;*/

const router = require("express").Router();
const { upload, cloudinary } = require("../utils/cloudinary"); // Changed import
const controller = require("../controllers/product.controller");
const Product = require("../models/product.model");
const streamifier = require('streamifier');

// Upload image to Cloudinary
router.post("/upload", upload.single("product"), async (req, res) => {
  try {
    console.log("📸 Upload request received");
    
    if (!req.file) {
      console.error("❌ No file in request");
      return res.status(400).json({ success: 0, message: "No file uploaded" });
    }

    console.log("📁 File received, size:", req.file.size);

    // Upload to Cloudinary from buffer
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: "ecommerce-products",
        resource_type: "image",
      },
      (error, result) => {
        if (error) {
          console.error("❌ Cloudinary error:", error);
          return res.status(500).json({ 
            success: 0, 
            message: "Cloudinary upload failed",
            error: error.message 
          });
        }

        console.log("✅ Upload successful:", result.secure_url);
        res.json({
          success: 1,
          image_url: result.secure_url,
        });
      }
    );

    // Pipe the buffer to Cloudinary
    streamifier.createReadStream(req.file.buffer).pipe(uploadStream);

  } catch (error) {
    console.error("❌ Upload error:", error.message);
    res.status(500).json({ 
      success: 0, 
      message: "Upload failed",
      error: error.message 
    });
  }
});

// Add product
router.post("/addproduct", controller.addProduct);

// Get all products
router.get("/allproducts", controller.getAllProducts);

// Get new collections
router.get("/newcollections", async (req, res) => {
  try {
    const products = await Product.find({}).sort({ _id: -1 });
    const newcollection = products.slice(0, 8).reverse();

    const safeCollection = newcollection.map((p) => ({
      id: p._id,
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