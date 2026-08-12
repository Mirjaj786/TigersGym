import mongoose from "mongoose";

const recordSchema = new mongoose.Schema(
  {
    member: {
      type: String,
      required: true,
      trim: true,
    },
    recordType: {
      type: String,
      required: true,
      trim: true,
    },
    recordValue: {
      type: String,
      required: true,
      trim: true,
    },
    date: {
      type: String,
      default: () => new Date().toLocaleDateString("en-IN"),
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

export const RecordModel = mongoose.model("Record", recordSchema);
