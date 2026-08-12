import express from "express";
import {
  getAllGallery,
  addGalleryItem,
  updateGalleryItem,
  deleteGalleryItem,
} from "../Controllers/GalleryController.js";
import { protectAdmin } from "../Middlewares/authMiddleware.js";

const router = express.Router();

// Public route to view gallery
router.get("/", getAllGallery);

// Protected admin routes
router.post("/", protectAdmin, addGalleryItem);
router.put("/:id", protectAdmin, updateGalleryItem);
router.delete("/:id", protectAdmin, deleteGalleryItem);

export default router;
