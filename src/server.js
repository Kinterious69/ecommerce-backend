require("dotenv").config();
const express = require("express");
const path = require("path");
const app = require("./app");
const connectDB = require("./config/db");

// Connect DB
connectDB();

// Serve uploaded images correctly
// Assumes public folder is at the **root of your project**, not inside src
app.use(
  "/images",
  express.static(path.join(__dirname, "public/upload/images"))
);

// Routes
app.use("/api/products", require("./routes/product.routes"));
app.use("/api/users", require("./routes/user.routes"));

// Root test
app.get("/", (req, res) => {
  res.send("Express App is running");
});

// Start server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
