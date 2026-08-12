import dotenv from "dotenv";
dotenv.config();
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import multer from "multer";

const apiSecret = process.env.CLOUDINARY_API_SECRET || process.env.CLOUDINARY_API_SRCRET;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: apiSecret,
});

// Configure Cloudinary Storage with strict parameters
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "TIGERS_GYM_UPLOADS",
    allowed_formats: ["jpg", "jpeg", "png", "webp"],
    resource_type: "image", // Enforce image only (prevents executable binaries/malware)
  },
});

// Strict File Filter for security validation
const fileFilter = (req, file, cb) => {
  const allowedMimeTypes = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/webp",
  ];

  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(
      new Error(
        "Invalid file type. Only JPEG, JPG, PNG, and WEBP image formats are allowed!"
      ),
      false
    );
  }
};

// Multer upload middleware with 5MB file size limit & type validation
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
  fileFilter: fileFilter,
});

export { cloudinary, storage, upload };
