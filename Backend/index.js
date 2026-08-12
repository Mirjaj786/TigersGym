import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";

import { connectDB } from "./Config/connectDb.js";

import UserRoute from "./Routes/UserRoute.js";
import ChampionRoute from "./Routes/ChampionRoute.js";
import GalleryRoute from "./Routes/GalleryRoute.js";
import ContactRoute from "./Routes/ContactRoute.js";

const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const startServer = async (PORT) => {
  try {
    app.listen(PORT, () => {
      console.log("Server start at Port : ", PORT);
    });

    connectDB();
  } catch (error) {
    console.log(`Error while starting server: ${error.message}`);
  }
};

app.use("/user", UserRoute);
app.use("/champion", ChampionRoute);
app.use("/gallery", GalleryRoute);
app.use("/contact", ContactRoute);

startServer(PORT);
