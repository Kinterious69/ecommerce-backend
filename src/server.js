require("dotenv").config();
const express = require("express");
const path = require("path");
const app = require("./app");
const connectDB = require("./config/db");

// connect DB
connectDB();

// STATIC FILES 
app.use(
  "/images",
  express.static(path.join(__dirname, "../public/upload/images"))
);

// ROUTES 
app.use("/api/products", require("./routes/product.routes"));
app.use("/api/users", require("./routes/user.routes"));

// root test
app.get("/", (req, res) => {
  res.send("Express App is running");
});

// start server
app.listen(process.env.PORT, () => {
  console.log("Server running on " + process.env.PORT);
});
