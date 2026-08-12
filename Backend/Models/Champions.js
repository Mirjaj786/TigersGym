import mongoose from "mongoose";

const championSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    month: {
      type: String,
      default: "January",
      trim: true,
    },
    year: {
      type: String,
      default: "2025",
      trim: true,
    },
    attendance: {
      type: String,
      default: "30 / 30 Days",
      trim: true,
    },
    title: {
      type: String,
      default: "Monthly Champion",
      trim: true,
    },
    prize: {
      type: String,
      default: "Gold Medal",
      trim: true,
    },
    image: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const ChampionModel = mongoose.model("Champion", championSchema);
