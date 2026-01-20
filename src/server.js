

require("dotenv").config();
const express = require("express");
const path = require("path");
const app = require("./app");
const connectDB = require("./config/db");

// Connect DB
connectDB();

// Static images
app.use(
  "/images",
  express.static(path.join(__dirname, "../public/upload/images"))
);
// File upload route
/*// Expects form-data with a "file" field
app.post("/upload", upload.single("file"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }

  // Construct full URL to uploaded file
  const fileUrl = `${BACKEND_URL}/images/${req.file.filename}`;
  res.json({ fileUrl });
});*/

// API routes
app.use("/api/products", require("./routes/product.routes"));
app.use("/api/users", require("./routes/user.routes"));

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

