const express = require("express");
const cors = require("cors");
const productRoutes = require("./routes/product.routes");
const userRoutes = require("./routes/user.routes");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: "*" }));


// API routes
app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);

module.exports = app;