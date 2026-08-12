import express from "express";
import {
  getAllRecords,
  addRecord,
  deleteRecord,
} from "../Controllers/RecordController.js";
import { protectAdmin } from "../Middlewares/authMiddleware.js";
import { upload } from "../Config/Coludinary.js";

const router = express.Router();

router.get("/", getAllRecords);
router.post("/", protectAdmin, upload.single("image"), addRecord);
router.delete("/:id", protectAdmin, deleteRecord);

export default router;
