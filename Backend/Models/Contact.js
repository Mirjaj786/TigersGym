import mongoose from "mongoose";

const contactSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
    },
    phone: {
      type: String,
      default: "",
      trim: true,
    },
    subject: {
      type: String,
      default: "General Inquiry",
      trim: true,
    },
    message: {
      type: String,
      required: true,
      trim: true,
    },
    status: {
      type: String,
      enum: ["Pending", "Replied", "Archived"],
      default: "Pending",
    },
    replyMessage: {
      type: String,
      default: "",
    },
    repliedAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

export const ContactModel = mongoose.model("Contact", contactSchema);
