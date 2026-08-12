import dotenv from "dotenv";
dotenv.config();
import { v2 as cloudinary } from "cloudinary";
import { cloudinaryStorage } from "multer-storage-cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new cloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "TIGERS GYM APP",
    allowed_format: ["png", "jpg", "jpeg", "webp"],
  },
});

export { cloudinary, storage };
