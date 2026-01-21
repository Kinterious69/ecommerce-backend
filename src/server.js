require("dotenv").config();
const express = require("express"); // <- MUST import express
const path = require("path");
const fs = require("fs");
const app = require("./app");
const connectDB = require("./config/db");

// Connect to MongoDB
connectDB();

// Ensure the upload folder exists
/*const uploadDir = path.join(__dirname, "../public/upload/images");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
  console.log("Created upload directory:", uploadDir);
}*/

// Serve uploaded images statically
//app.use("/images", express.static(uploadDir));

// Start server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
