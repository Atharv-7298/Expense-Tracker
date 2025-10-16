// middleware/upload.js
const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Ensure upload directory exists
const uploadDir = path.join(__dirname, "..", "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
  console.log("📁 Upload directory created:", uploadDir);
}

// Storage config
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname).toLowerCase();
    const basename = file.fieldname + "-" + Date.now();
    cb(null, basename + ext);
  },
});

// ✅ Allow jpeg, jpg, png, webp
const fileFilter = (req, file, cb) => {
  console.log("🧩 File received:", {
    originalname: file.originalname,
    mimetype: file.mimetype,
  });

  const allowedMimeTypes = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/webp", // ✅ Added support
    "image/pjpeg",
    "image/jfif",
  ];

  const allowedExtensions = [".jpeg", ".jpg", ".png", ".webp"]; // ✅ Added webp

  const ext = path.extname(file.originalname).toLowerCase();
  const isMimeOk = allowedMimeTypes.includes(file.mimetype.toLowerCase());
  const isExtOk = allowedExtensions.includes(ext);

  if (isMimeOk && isExtOk) {
    cb(null, true);
  } else {
    cb(
      new Error(
        `Only image files allowed! (jpeg, jpg, png, webp). Got: ${file.mimetype}`
      )
    );
  }
};

// Multer instance
const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 2 * 1024 * 1024 }, // 2MB
});

module.exports = upload;
