import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    let conRes = await mongoose.connect(process.env.MONGO_URI);
    console.log("Database Connection Successfull");
  } catch (err) {
    console.log(`Database Connection faild! and the error is : ${err.message}`);
  }
};
