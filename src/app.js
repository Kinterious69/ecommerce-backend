const express = require("express");
const cors = require("cors");
const upload = require("./utils/multer"); 

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Enable CORS
app.use(cors({
  origin: process.env.FRONTEND_URL || "*"
}));
app.post("/__test-upload", upload.single("image"), (req, res) => {
  return res.json({
    success: true,
    file: req.file,
  });
});


// Upload a single file
app.post("/upload", upload.single("file"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ success: false, message: "No file uploaded" });
  }

  const BACKEND_URL =
    process.env.BACKEND_URL || `http://localhost:${process.env.PORT || 4000}`;

  // Return the URL that can be used to access the uploaded image
  res.status(200).json({
    success: true,
    imageUrl: `${BACKEND_URL}/images/${req.file.filename}`,
  });
});



module.exports = app;
