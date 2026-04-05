import mongoose from 'mongoose';

export const connectDB = async (): Promise<void> => {
  const uri =
    process.env.MONGODB_URI || 'mongodb://mongodb:27017/authdb';

  try {
    await mongoose.connect(uri);
    console.log('Auth MongoDB connected');
  } catch (error) {
    console.error('Auth MongoDB connection error:', error);
    process.exit(1);
  }
};
