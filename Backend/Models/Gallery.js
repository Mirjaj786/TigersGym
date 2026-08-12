import mongoose from "mongoose";

const gallerySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      required: true,
      default: "Gym Tour",
      enum: ["Strength Zone", "Cardio Area", "CrossFit Floor", "Weight Room", "Yoga Studio", "Group Session", "Functional Zone", "Gym Tour", "Other"],
    },
    imageUrl: {
      type: String,
      required: true,
    },
    publicId: {
      type: String,
      default: "",
    },
    description: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

export const GalleryModel = mongoose.model("Gallery", gallerySchema);
