import express from "express";
import {
  submitContact,
  getAllContacts,
  replyContact,
  deleteContact,
} from "../Controllers/ContactController.js";
import { protectAdmin } from "../Middlewares/authMiddleware.js";

const router = express.Router();

// Public route to submit contact form
router.post("/submit", submitContact);

// Protected admin routes
router.get("/", protectAdmin, getAllContacts);
router.post("/:id/reply", protectAdmin, replyContact);
router.delete("/:id", protectAdmin, deleteContact);

export default router;
