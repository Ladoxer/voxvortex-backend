import mongoose from 'mongoose';
import env from 'dotenv';
env.config();

const dbConnect = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGO as string);
    console.log("Database connected successfully...");
  } catch (error) {
    console.log("Database connection failed", error);
  }
}

export default dbConnect;