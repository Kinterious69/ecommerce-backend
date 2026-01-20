require("dotenv").config();
const express = require("express");
const path = require("path");
const app = require("./app");
const connectDB = require("./config/db");
const upload = require("./utils/multer"); // your multer setup

// Connect to DB
connectDB();


// Serve static files (for uploaded images)
app.use(
  "/images",
  express.static(path.join(__dirname, "../public/upload/images"))
);

// Access BACKEND_URL from environment (set on Render)
const BACKEND_URL = process.env.BACKEND_URL || `http://localhost:${process.env.PORT || 4000}`;

// Routes
app.use("/api/products", require("./routes/product.routes"));
app.use("/api/users", require("./routes/user.routes"));

// File upload route
// Expects form-data with a "file" field
app.post("/upload", upload.single("file"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }

  // Construct full URL to uploaded file
  const fileUrl = `${BACKEND_URL}/images/${req.file.filename}`;
  res.json({ fileUrl });
});

// Root test route
app.get("/", (req, res) => {
  res.send("Express App is running");
});

// Render sets the PORT environment variable
const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
