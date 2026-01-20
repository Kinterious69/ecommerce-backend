require("dotenv").config();
const express = require("express");  // <<< ADD THIS
const path = require("path");
const app = require("./app");
const connectDB = require("./config/db");

// Connect to MongoDB
connectDB();

// Serve uploaded images
app.use(
  "/images",
  express.static(path.join(__dirname, "../public/upload/images"))
);

// Routes
app.use("/api/products", require("./routes/product.routes"));
app.use("/api/users", require("./routes/user.routes"));

// Root route
app.get("/", (req, res) => res.send("Express App is running"));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
  console.log(`Backend URL: ${process.env.BACKEND_URL}`);
});
