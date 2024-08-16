import mongoose from "mongoose";
import Name from '@/models/nameModel';
const MONGODB_URI=process.env.MONGODB_URI

if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable inside .env.local");
}

export const connect = async () => {
  try {

    await mongoose.connect(MONGODB_URI);
    const newName=Name.create({name:"Uday"});
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
  }
};
