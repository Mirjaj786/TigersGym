import mongoose from "mongoose";

const championSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    prize: {
      type: String,
      required: true,
      trim: true,
    },

    image: {
      url: {
        type: String,
        required: true,
      },
      fileName: {
        type: String,
        required: true,
      },
    },
  },
  {
    timestamps: true,
  },
);

export const ChampionModel = mongoose.model("Champion", championSchema);
