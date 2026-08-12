import express from "express";
import {
  createChampion,
  getAllChampion,
} from "../Controllers/ChampionController.js";
import multer from "multer";
// const upload = multer({ dest: "/uploads" });

const router = express.Router();

router.route("/add-champion").post(createChampion);
router.route("/get-champion").get(getAllChampion);

export default router;
