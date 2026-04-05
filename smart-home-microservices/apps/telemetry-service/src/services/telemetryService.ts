import mongoose from 'mongoose';
import Telemetry from '../models/Telemetry';

class TelemetryService {
  async getAll() {
    return await Telemetry.find().sort({ createdAt: -1 });
  }

  async getById(id: string) {
    return await Telemetry.findById(id);
  }

  async getByDeviceId(deviceId: string) {
    return await Telemetry.find({ deviceId }).sort({ createdAt: -1 });
  }

  async getLatestByDeviceId(deviceId: string) {
    return await Telemetry.findOne({ deviceId }).sort({ createdAt: -1 });
  }

  async create(data: {
    deviceId: string;
    temperature: number;
    humidity: number;
    energyUsage: number;
    motionDetected: boolean;
  }) {
    return await Telemetry.create(data);
  }

  async replaceById(
    id: string,
    data: {
      deviceId: string;
      temperature: number;
      humidity: number;
      energyUsage: number;
      motionDetected: boolean;
    }
  ) {
    if (!mongoose.isValidObjectId(id)) {
      return 'invalid_id' as const;
    }

    const updated = await Telemetry.findByIdAndUpdate(
      id,
      {
        deviceId: data.deviceId,
        temperature: data.temperature,
        humidity: data.humidity,
        energyUsage: data.energyUsage,
        motionDetected: data.motionDetected
      },
      { new: true, runValidators: true }
    );

    if (!updated) {
      return 'not_found' as const;
    }

    return updated;
  }

  async deleteById(id: string) {
    if (!mongoose.isValidObjectId(id)) {
      return 'invalid' as const;
    }

    const deleted = await Telemetry.findByIdAndDelete(id);

    if (!deleted) {
      return 'not_found' as const;
    }

    return 'ok' as const;
  }
}

export default new TelemetryService();