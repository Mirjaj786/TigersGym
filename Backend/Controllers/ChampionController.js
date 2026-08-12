import multer from "multer";
import { ChampionModel } from "../Models/Champions.js";
const upload = multer({ dest: "uploads/" });

export const createChampion = async (req, res) => {
  try {
    const { name, title, prize, image } = req.body;

    if (!name || !title || !prize || !image) {
      return res.status(400).json({ message: "Please fill all field" });
    }

    const newChampion = new ChampionModel({
      name: name,
      title: title,
      prize: prize,
      image: image,
    });

    await newChampion.save();

    return res
      .status(201)
      .json({ success: true, message: "New Champion Created." });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Faild To Create New Champion!" });
  }
};

export const getAllChampion = async (req, res) => {
  try {
    const allChampion = await ChampionModel.find();
    if (allChampion.length == 0) {
      return res.status(404).json({ message: "Not Found" });
    }

    return res
      .status(201)
      .json({ success: true, message: "All Champion!", data: allChampion });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Faild To Get All Champion!" });
  }
};

export const editChampion = async (req, res) => {};

export const deleteChampion = async (req, res) => {};
