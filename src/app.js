/*const express = require("express");
const cors = require("cors");
const upload = require("./utils/multer");
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
*/
const express = require("express");
const cors = require("cors");
const productRoutes = require("./routes/product.routes");
const userRoutes = require("./routes/user.routes");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: "*" }));

// Remove or comment out this duplicate upload route
// app.post("/upload", upload.single("file"), (req, res) => { ... });

// API routes
app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);

module.exports = app;