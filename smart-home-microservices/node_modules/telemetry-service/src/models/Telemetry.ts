import mongoose from 'mongoose';

const telemetrySchema = new mongoose.Schema(
  {
    deviceId: { type: String, required: true },
    temperature: { type: Number, required: true },
    humidity: { type: Number, required: true },
    energyUsage: { type: Number, required: true },
    motionDetected: { type: Boolean, required: true }
  },
  {
    timestamps: true
  }
);

export default mongoose.model('Telemetry', telemetrySchema);