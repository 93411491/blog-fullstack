import mongoose from "mongoose";

const MONGODB_URI = "mongodb://localhost:27017/MyBlog";

const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log(`mongodb connect success`);
  } catch (err) {
    console.error(`mongodb connect failed :`, err);
    process.exit(1);
  }
};

export default connectDB;