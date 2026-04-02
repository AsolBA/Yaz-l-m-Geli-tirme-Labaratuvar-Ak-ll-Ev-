import mongoose from 'mongoose';

export const connectDB = async (): Promise<void> => {
  try {
    await mongoose.connect('mongodb://mongodb:27017/devicecontroldb');
    console.log('DeviceControl MongoDB connected');
  } catch (error) {
    console.error('DeviceControl MongoDB connection error:', error);
    process.exit(1);
  }
};