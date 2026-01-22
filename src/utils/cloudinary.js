const cloudinary = require("cloudinary").v2;
const multer = require("multer");

console.log("🔧 Configuring Cloudinary...");
console.log("Cloud Name:", process.env.CLOUDINARY_CLOUD_NAME ? "✅ Set" : "❌ Missing");
console.log("API Key:", process.env.CLOUDINARY_API_KEY ? "✅ Set" : "❌ Missing");
console.log("API Secret:", process.env.CLOUDINARY_API_SECRET ? "✅ Set" : "❌ Missing");

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Use memory storage instead of CloudinaryStorage
const storage = multer.memoryStorage();
const upload = multer({ storage });

console.log(" Multer memory storage configured");

module.exports = { upload, cloudinary };