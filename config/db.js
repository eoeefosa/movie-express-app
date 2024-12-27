import { connect } from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async () => {
  try {
    await connect(process.env.MONGO_URI);
    console.log("MongoDB connected...");
  } catch (error) {
    console.error("Failed to connect to MongoDB...");
    console.error(error.message);
    process.exit(1); // Exit process with failure
  }
};

export default connectDB;
