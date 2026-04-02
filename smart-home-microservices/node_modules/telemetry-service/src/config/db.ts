import mongoose from 'mongoose';

export const connectDB = async (): Promise<void> => {
  try {
    await mongoose.connect('mongodb://mongodb:27017/telemetrydb');
    console.log('Telemetry MongoDB connected');
  } catch (error) {
    console.error('Telemetry MongoDB connection error:', error);
    process.exit(1);
  }
};