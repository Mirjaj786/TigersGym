import express from "express";
import {
  getAllChampion,
  createChampion,
  deleteChampion,
} from "../Controllers/ChampionController.js";
import { protectAdmin } from "../Middlewares/authMiddleware.js";
import { upload } from "../Config/Coludinary.js";

const router = express.Router();

router.get("/", getAllChampion);
router.post("/", protectAdmin, upload.single("image"), createChampion);
router.delete("/:id", protectAdmin, deleteChampion);

export default router;
