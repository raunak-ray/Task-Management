import mongoose from "mongoose";
import "dotenv/config";

const MONGO_URI: string = process.env.MONGO_URI!;

export const connectToDb = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("Connected to db successfully");
  } catch (error: any) {
    console.log(`Error in connecting to db: ${error.message}`);
    process.exit(1);
  }
};
