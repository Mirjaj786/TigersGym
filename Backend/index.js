import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";

import { connectDB } from "./Config/connectDb.js";

import UserRoute from "./Routes/adminRoute.js";
import ChampionRoute from "./Routes/ChampionRoute.js";
import GalleryRoute from "./Routes/GalleryRoute.js";
import ContactRoute from "./Routes/ContactRoute.js";
import RecordRoute from "./Routes/RecordRoute.js";

const app = express();
const PORT = process.env.PORT || 8000;

// Enable CORS for frontend requests
app.use(
  cors({
    origin: true, // Allows requests from local dev and production Netlify deployment
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "token"],
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB
connectDB();

// Root route for Vercel health check
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Tigers Gym Backend API is running smoothly!",
  });
});

// API Routes
app.use("/user", UserRoute);
app.use("/champion", ChampionRoute);
app.use("/gallery", GalleryRoute);
app.use("/contact", ContactRoute);
app.use("/record", RecordRoute);

if (process.env.NODE_ENV !== "production") {
  app.listen(PORT, () => {
    console.log(`Server started at Port: ${PORT}`);
  });
}

export default app;
