import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config();

const DBConnection = async () => {
  const MONGO_URI = process.env.MONGO_URI;
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000 // Timeout after 5s instead of 30s
    });
    console.log('Database connected successfully');
  } catch (error) {
    console.log('Error while connecting with the database:', error.message);
    process.exit(1); // Exit the process with failure
  }
};

export default DBConnection;