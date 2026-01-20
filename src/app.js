/*const express = require("express");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

module.exports = app;
*/
const express = require("express");
const cors = require("cors");

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Enable CORS (allow all origins by default, can restrict with FRONTEND_URL)
app.use(cors({
  origin: process.env.FRONTEND_URL || "*"
}));

module.exports = app;
