const multer = require("multer");
const fs = require("fs");
const path = require("path");

// This points from src/utils -> src -> backend root -> public/upload/images
const uploadDir = path.join(__dirname, "..", "..", "public", "upload", "images");

// Make sure folder exists
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) =>
    cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`),
});

module.exports = multer({ storage });

