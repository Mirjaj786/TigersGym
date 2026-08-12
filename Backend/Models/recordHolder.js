import mongoose from "mongoose";

const recordSchema = new mongoose.Schema(
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

    weight: {
      type: Number,
      required: true,
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

    date: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  },
);

export const RecordModel = mongoose.model("Record", recordSchema);
