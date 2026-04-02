import mongoose from 'mongoose';

const deviceSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    type: {
      type: String,
      enum: ['light', 'thermostat', 'camera', 'lock'],
      required: true
    },
    status: {
      type: String,
      enum: ['on', 'off'],
      required: true
    },
    brightness: { type: Number },
    targetTemperature: { type: Number },
    locked: { type: Boolean }
  },
  {
    timestamps: true
  }
);

export default mongoose.model('Device', deviceSchema);