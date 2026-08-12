import express from "express";
import {
  getAllGallery,
  addGalleryItem,
  deleteGalleryItem,
} from "../Controllers/GalleryController.js";
import { protectAdmin } from "../Middlewares/authMiddleware.js";
import { upload } from "../Config/Coludinary.js";

const router = express.Router();

// Public GET gallery
router.get("/", getAllGallery);

// Protected POST gallery with Cloudinary file upload
router.post("/", protectAdmin, upload.single("image"), addGalleryItem);

// Protected DELETE gallery photo
router.delete("/:id", protectAdmin, deleteGalleryItem);

export default router;
